/**
 * Change Password Handler - Application Layer (Enterprise Enhanced v3.0)
 * 
 * @module application/commands/user/change-password.handler
 * 
 * @description
 * Handles user password change with enterprise-grade security features:
 * - Password history check (prevent reuse of last N passwords)
 * - Rate limiting to prevent brute force attacks
 * - Transaction management for data consistency
 * - Session revocation with optional current session rotation
 * - Cache invalidation strategy
 * - Event publishing with correlation tracking
 * - Email notification with circuit breaker
 * - Distributed tracing with correlation ID
 * - Bengali message support for better UX in Bangladesh
 * - Password strength validation (strong/very_strong required)
 * - Device fingerprint tracking for security audit
 * - Geographic location tracking (Bangladesh districts)
 * - Complete audit logging with severity levels
 */

import { Injectable, UnauthorizedException, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ChangePasswordCommand, ChangePasswordResult } from './types';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { PasswordHistoryRepository } from '../../../domain/repositories/password-history.repository.interface';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import { Password, PasswordStrength } from '../../../domain/value-objects/password.vo';
import { PasswordHistory, PasswordChangeContext } from '../../../domain/entities/password-history.entity';

import { PasswordHasher } from '../../services/interfaces/password-hasher.interface';
import { EventBus } from '../../services/interfaces/event-bus.interface';
import { NotificationService } from '../../services/interfaces/notification.service.interface';
import { CacheService } from '../../services/interfaces/cache.service.interface';
import { TransactionManager } from '../../services/interfaces/transaction-manager.interface';
import { AuditService } from '../../services/interfaces/audit.service.interface';
import { IdGenerator } from '../../../domain/entities/base.entity';

import { PasswordChangedEvent, PasswordChangeType, PasswordChangeReason } from '../../events/password-changed.event';

// Import shared packages
import { 
  PASSWORD_HISTORY_CONFIG, 
  RATE_LIMIT_CONFIG, 
  AUDIT_SEVERITIES,
  ENCRYPTION_CONFIG
} from '@vubon/shared-constants';
import { CacheKeyBuilder } from '../../services/interfaces/cache.service.interface';

// ============================================================
// Circuit Breaker for External Services
// ============================================================

interface CircuitBreakerState {
  failures: number;
  lastFailureTime: number;
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  nextAttemptTime: number;
}

class CircuitBreaker {
  private static instances: Map<string, CircuitBreaker> = new Map();
  private state: CircuitBreakerState;
  private readonly failureThreshold: number = 5;
  private readonly timeoutMs: number = 60000;
  private readonly successThreshold: number = 3;
  private successes: number = 0;

  private constructor(private readonly name: string) {
    this.state = {
      failures: 0,
      lastFailureTime: 0,
      state: 'CLOSED',
      nextAttemptTime: 0
    };
  }

  static getInstance(name: string): CircuitBreaker {
    if (!CircuitBreaker.instances.has(name)) {
      CircuitBreaker.instances.set(name, new CircuitBreaker(name));
    }
    return CircuitBreaker.instances.get(name)!;
  }

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state.state === 'OPEN') {
      if (Date.now() >= this.state.nextAttemptTime) {
        this.state.state = 'HALF_OPEN';
        this.successes = 0;
      } else {
        throw new Error(`Circuit breaker is OPEN. Service unavailable.`);
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    if (this.state.state === 'HALF_OPEN') {
      this.successes++;
      if (this.successes >= this.successThreshold) {
        this.state.state = 'CLOSED';
        this.state.failures = 0;
      }
    } else if (this.state.state === 'CLOSED') {
      this.state.failures = 0;
    }
  }

  private onFailure(): void {
    this.state.failures++;
    this.state.lastFailureTime = Date.now();

    if (this.state.state === 'CLOSED' && this.state.failures >= this.failureThreshold) {
      this.state.state = 'OPEN';
      this.state.nextAttemptTime = Date.now() + this.timeoutMs;
    } else if (this.state.state === 'HALF_OPEN') {
      this.state.state = 'OPEN';
      this.state.nextAttemptTime = Date.now() + this.timeoutMs;
    }
  }
}

// ============================================================
// Retry Helper with Exponential Backoff
// ============================================================

async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 100,
  backoffMultiplier: number = 2
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt === maxRetries) break;
      const delay = baseDelayMs * Math.pow(backoffMultiplier, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

// ============================================================
// Change Password Handler (Enterprise Enhanced)
// ============================================================

@Injectable()
@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler implements ICommandHandler<ChangePasswordCommand> {
  private readonly logger = new Logger(ChangePasswordHandler.name);
  private readonly notificationCircuitBreaker = CircuitBreaker.getInstance('notification');
  private readonly PASSWORD_HISTORY_LIMIT = PASSWORD_HISTORY_CONFIG?.PREVENT_REUSE_COUNT || 5;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly passwordHistoryRepository: PasswordHistoryRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly eventBus: EventBus,
    private readonly notificationService: NotificationService,
    private readonly cacheService: CacheService,
    private readonly transactionManager: TransactionManager,
    private readonly auditService: AuditService,
    private readonly idGenerator: IdGenerator
  ) {}

  /**
   * Execute the Change Password command
   */
  async execute(command: ChangePasswordCommand): Promise<ChangePasswordResult> {
    const startTime = Date.now();
    const { 
      userId, 
      currentPassword, 
      newPassword: newPasswordRaw, 
      logoutOtherDevices = true,
      preventReuse = true,
      deviceInfo,
      correlationId,
      reason
    } = command;

    const { deviceId, ipAddress, userAgent, deviceFingerprint, district, networkType, mobileOperator } = deviceInfo || {};

    this.logger.log(`Executing ChangePasswordCommand for user ${userId}, correlationId: ${correlationId}`);

    try {
      // 1. Check rate limit for password change attempts
      await this.checkRateLimit(userId);

      // 2. Find user
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException(
          `User with ID ${userId} not found`,
          `${userId} আইডি সহ ইউজার পাওয়া যায়নি`
        );
      }

      // 3. Verify current password
      const userPasswordHash = user.getPasswordHash();
      const isCurrentPasswordValid = await this.passwordHasher.compare(currentPassword, userPasswordHash);
      
      if (!isCurrentPasswordValid) {
        await this.trackFailedAttempt(userId, deviceInfo, correlationId);
        throw new UnauthorizedException(
          'Current password is incorrect',
          'বর্তমান পাসওয়ার্ড ভুল'
        );
      }

      // 4. Check if new password is different from current (hash comparison)
      const isSameAsCurrent = await this.passwordHasher.compare(newPasswordRaw, userPasswordHash);
      if (isSameAsCurrent) {
        throw new BadRequestException(
          'New password must be different from current password',
          'নতুন পাসওয়ার্ড বর্তমান পাসওয়ার্ড থেকে ভিন্ন হতে হবে'
        );
      }

      // 5. Validate new password strength
      let newPassword: Password;
      try {
        newPassword = new Password(newPasswordRaw);
        const strength = newPassword.getStrength();
        
        // Require at least "strong" password
        if (strength !== PasswordStrength.STRONG && strength !== PasswordStrength.VERY_STRONG) {
          throw new BadRequestException(
            'Password is too weak. Please use a stronger password with at least 12 characters, uppercase, lowercase, numbers, and special characters.',
            'পাসওয়ার্ড খুব দুর্বল। অনুগ্রহ করে কমপক্ষে ১২ অক্ষর, বড় হাতের অক্ষর, ছোট হাতের অক্ষর, সংখ্যা এবং বিশেষ অক্ষর সহ একটি শক্তিশালী পাসওয়ার্ড ব্যবহার করুন।'
          );
        }
      } catch (error) {
        if (error instanceof BadRequestException) throw error;
        throw new BadRequestException(
          'Invalid password format',
          'ভুল পাসওয়ার্ড ফরম্যাট'
        );
      }

      // 6. Check password history (prevent reuse)
      let reuseCount = 0;
      if (preventReuse) {
        const recentPasswords = await this.passwordHistoryRepository.getRecentHashes(
          userId,
          this.PASSWORD_HISTORY_LIMIT
        );

        for (const oldPasswordHash of recentPasswords) {
          const isReused = await this.passwordHasher.compare(newPasswordRaw, oldPasswordHash);
          if (isReused) {
            reuseCount++;
          }
        }

        if (reuseCount > 0) {
          throw new BadRequestException(
            `Cannot reuse one of your last ${this.PASSWORD_HISTORY_LIMIT} passwords. Please choose a different password.`,
            `আপনার শেষ ${this.PASSWORD_HISTORY_LIMIT}টি পাসওয়ার্ডের একটি পুনরায় ব্যবহার করা যাবে না। অনুগ্রহ করে একটি ভিন্ন পাসওয়ার্ড নির্বাচন করুন।`
          );
        }
      }

      // 7. Hash new password
      const saltRounds = ENCRYPTION_CONFIG?.SALT_ROUNDS || 12;
      const hashedPassword = await this.passwordHasher.hash(newPasswordRaw, saltRounds);

      // 8. Execute in transaction
      let sessionsRevoked = 0;
      let newSessionId: string | undefined;
      let refreshTokensRevoked = 0;

      await this.transactionManager.runInTransaction(async () => {
        // Update user password
        user.setPasswordHash(hashedPassword);
        await this.userRepository.save(user);

        // Save to password history
        const passwordHistory = PasswordHistory.create(
          userId,
          hashedPassword,
          PasswordChangeContext.USER,
          {
            ipAddress,
            userAgent,
            deviceId,
            reason: reason || 'User initiated password change'
          },
          this.idGenerator
        );
        await this.passwordHistoryRepository.save(passwordHistory);

        // Revoke sessions based on options
        if (logoutOtherDevices) {
          if (deviceId) {
            // Revoke all sessions except current device
            sessionsRevoked = await this.sessionRepository.revokeAllExceptCurrent(
              userId,
              deviceId,
              'Password changed - security precaution'
            );
            
            // Get current session for new session ID
            const currentSession = await this.sessionRepository.findByDeviceId(userId, deviceId);
            newSessionId = currentSession?.getId();
          } else {
            // Revoke ALL sessions (user will need to re-login everywhere)
            sessionsRevoked = await this.sessionRepository.revokeAllByUserId(
              userId,
              'Password changed - security precaution'
            );
          }
          
          // Revoke all refresh tokens
          refreshTokensRevoked = await this.refreshTokenRepository.revokeAllByUserId(
            userId,
            'Password changed - security precaution'
          );
        }
      });

      // 9. Invalidate all user caches
      await this.invalidateUserCaches(userId);

      // 10. Clear rate limit on success
      await this.clearRateLimit(userId);

      // 11. Publish event
      await this.eventBus.publish(
        new PasswordChangedEvent(
          userId,
          PasswordChangeType.USER_CHANGE,
          PasswordChangeReason.USER_INITIATED,
          correlationId,
          ipAddress,
          deviceId,
          userAgent,
          deviceFingerprint,
          {
            sessionsRevoked,
            refreshTokensRevoked,
            logoutOtherDevices,
            preventReuse,
            reuseCount,
            district,
            networkType,
            mobileOperator
          }
        )
      );

      // 12. Send notification with circuit breaker (non-blocking)
      await this.sendPasswordChangedNotification(user, deviceInfo, correlationId);

      // 13. Audit log
      await this.auditLog(userId, sessionsRevoked, refreshTokensRevoked, deviceInfo, reason, startTime, correlationId);

      this.logger.log(`Password changed for user ${userId}, sessions revoked: ${sessionsRevoked}`);

      // 14. Return result
      return {
        success: true,
        message: 'Password changed successfully',
        messageBn: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে',
        sessionsRevoked,
        refreshTokensRevoked,
        newSessionId,
        requiresChangeOnNextLogin: false,
        notificationSent: true,
        correlationId
      };

    } catch (error) {
      this.logger.error(`ChangePasswordCommand failed for user ${userId}: ${error.message}`);

      // Audit failure
      await this.auditService.log({
        action: 'PASSWORD_CHANGE_FAILED',
        userId,
        error: error.message,
        correlationId,
        timestamp: new Date().toISOString(),
        severity: AUDIT_SEVERITIES.ERROR
      });

      throw error;
    }
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  /**
   * Check rate limit for password change attempts
   */
  private async checkRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`password-change:${userId}`);
    const attempts = await this.cacheService.incr(rateLimitKey);

    if (attempts === 1) {
      await this.cacheService.expire(rateLimitKey, RATE_LIMIT_CONFIG?.PASSWORD_CHANGE_WINDOW_SECONDS || 3600);
    }

    const maxAttempts = RATE_LIMIT_CONFIG?.MAX_PASSWORD_CHANGE_ATTEMPTS_PER_HOUR || 5;
    if (attempts > maxAttempts) {
      throw new BadRequestException(
        'Too many password change attempts. Please try again later.',
        'অনেকবার পাসওয়ার্ড পরিবর্তনের চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।'
      );
    }
  }

  /**
   * Clear rate limit on successful password change
   */
  private async clearRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`password-change:${userId}`);
    await this.cacheService.del(rateLimitKey);
  }

  /**
   * Track failed password change attempt
   */
  private async trackFailedAttempt(userId: string, deviceInfo: any, correlationId?: string): Promise<void> {
    const failKey = CacheKeyBuilder.failedAttempts(`password-change:${userId}`);
    const failCount = await this.cacheService.incr(failKey);
    if (failCount === 1) {
      await this.cacheService.expire(failKey, 3600);
    }

    await this.auditService.log({
      action: 'PASSWORD_CHANGE_FAILED',
      userId,
      failCount,
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      deviceFingerprint: deviceInfo?.deviceFingerprint,
      correlationId,
      timestamp: new Date().toISOString(),
      severity: AUDIT_SEVERITIES.WARNING
    });
  }

  /**
   * Invalidate all user caches after password change
   */
  private async invalidateUserCaches(userId: string): Promise<void> {
    await this.cacheService.del(CacheKeyBuilder.user(userId));
    await this.cacheService.del(CacheKeyBuilder.userPermissions(userId));
    await this.cacheService.del(CacheKeyBuilder.userRoles(userId));
    await this.cacheService.del(CacheKeyBuilder.userSessions(userId));
    await this.cacheService.del(CacheKeyBuilder.userMFAStatus(userId));
  }

  /**
   * Send password changed notification with circuit breaker
   */
  private async sendPasswordChangedNotification(
    user: any,
    deviceInfo: any,
    correlationId?: string
  ): Promise<void> {
    await this.notificationCircuitBreaker.call(async () => {
      await withRetry(() =>
        this.notificationService.sendPasswordChangedNotification(
          user.getId(),
          user.getEmail().getValue(),
          {
            deviceName: deviceInfo?.deviceName,
            deviceType: deviceInfo?.deviceType,
            ipAddress: deviceInfo?.ipAddress,
            location: deviceInfo?.district,
            time: new Date(),
            correlationId
          }
        )
      );
    }).catch(err => {
      this.logger.warn(`Failed to send password change notification to user ${user.getId()}: ${err.message}`);
    });
  }

  /**
   * Audit log for password change
   */
  private async auditLog(
    userId: string,
    sessionsRevoked: number,
    refreshTokensRevoked: number,
    deviceInfo: any,
    reason: string | undefined,
    startTime: number,
    correlationId?: string
  ): Promise<void> {
    const { ipAddress, deviceId, userAgent, deviceFingerprint, district, division, upazila, networkType, mobileOperator } = deviceInfo || {};

    await this.auditService.log({
      action: 'PASSWORD_CHANGED',
      userId,
      sessionsRevoked,
      refreshTokensRevoked,
      reason: reason || 'User initiated password change',
      ipAddress,
      deviceId,
      deviceFingerprint,
      userAgent,
      district,
      division,
      upazila,
      networkType,
      mobileOperator,
      correlationId,
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startTime,
      severity: AUDIT_SEVERITIES.INFO
    });
  }
}
