/**
 * Disable MFA Command Handler - Application Layer (Enterprise Enhanced)
 * 
 * @module application/commands/mfa/disable-mfa.handler
 * 
 * @description
 * Handles MFA disable use case with enterprise-grade security features:
 * - Multi-factor verification (MFA code, password, backup code, admin override)
 * - Rate limiting to prevent brute force attacks
 * - Transaction management for data consistency
 * - Session revocation on MFA disable
 * - Comprehensive audit logging with severity levels
 * - Email/WhatsApp notifications
 * - Distributed tracing with correlation ID
 * - Bengali error messages for better UX in Bangladesh
 * - Circuit breaker pattern for external service calls
 * - Retry mechanism with exponential backoff
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only MFA disable
 * ✅ Repository coordination with transaction support
 * ✅ Security verification with proper error messages
 * ✅ Event publishing with correlation tracking
 * ✅ Audit logging with severity levels
 * ✅ Rate limiting for disable attempts
 * ✅ Cache invalidation after MFA disable
 */

import { Injectable, BadRequestException, UnauthorizedException, Logger, Inject, forwardRef } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { DisableMfaCommand, DisableMfaVerificationType, isDisableMfaCommand } from './disable-mfa.command';
import { MFARepository } from '../../../domain/repositories/mfa.repository.interface';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import { AuditRepository } from '../../../domain/repositories/audit.repository.interface';
import { MFAMethod, MFAType, MFAStatus } from '../../../domain/entities/mfa.entity';
import { User, UserStatus } from '../../../domain/entities/user.entity';

// Import events
import { MfaDisabledEvent, MFADisableReason } from '../../events/mfa-disabled.event';
import { SessionRevokedEvent } from '../../events/session-revoked.event';

// Import shared packages
import { MFA_CONFIG, RATE_LIMIT_CONFIG, AUDIT_SEVERITIES } from '@vubon/shared-constants';
import type { MFAType as SharedMFAType } from '@vubon/shared-types';
import { maskEmail, maskPhone } from '@vubon/shared-utils';

// Import infrastructure interfaces
import { 
  EventBus, 
  AuditService, 
  TransactionManager, 
  NotificationService, 
  PasswordHasher,
  CacheService,
  MfaVerificationService
} from './infrastructure.interface';
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
        throw new Error(`Circuit breaker ${this.name} is OPEN. Service unavailable.`);
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

  getStatus(): { state: string; failures: number; nextAttemptAt?: Date } {
    return {
      state: this.state.state,
      failures: this.state.failures,
      nextAttemptAt: this.state.nextAttemptTime ? new Date(this.state.nextAttemptTime) : undefined
    };
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
// Disable MFA Response DTO (Enhanced)
// ============================================================

export interface DisableMfaResponseDto {
  success: boolean;
  message: string;
  messageBn?: string;
  sessionsRevoked?: number;
  methodId?: string;
  mfaType?: string;
  disabledAt: string;
  correlationId?: string;
  remainingMethods?: number;
  requiresPasswordChange?: boolean;
}

// ============================================================
// Disable MFA Handler (Enterprise Enhanced)
// ============================================================

@Injectable()
export class DisableMfaHandler {
  private readonly logger = new Logger(DisableMfaHandler.name);
  private readonly notificationCircuitBreaker = CircuitBreaker.getInstance('notification');

  constructor(
    private readonly mfaRepository: MFARepository,
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly auditRepository: AuditRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly mfaVerificationService: MfaVerificationService,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly transactionManager: TransactionManager,
    private readonly notificationService: NotificationService,
    private readonly cacheService: CacheService
  ) {}

  /**
   * Execute the Disable MFA command
   * 
   * @param command - Disable MFA command with userId included
   * @returns Response with disable status and details
   */
  async execute(command: DisableMfaCommand): Promise<DisableMfaResponseDto> {
    const startTime = Date.now();
    const { userId, verificationType, verificationCode, deviceInfo, correlationId, reason, targetUserId, adminId } = command;

    this.logger.log(`Executing DisableMfaCommand for user ${userId}, type: ${verificationType}, correlationId: ${correlationId}`);

    try {
      // 1. Check rate limit for disable attempts
      await this.checkRateLimit(userId);

      // 2. Determine effective user ID
      const effectiveUserId = command.getEffectiveUserId(userId);

      // 3. Check if admin override is valid
      if (command.isAdminOverride()) {
        if (!adminId) {
          throw new UnauthorizedException(
            'Admin ID required for override',
            'অ্যাডমিন ওভাররাইডের জন্য অ্যাডমিন আইডি প্রয়োজন'
          );
        }
        this.logger.warn(`Admin override MFA disable for user ${effectiveUserId} by admin ${adminId}`);
      }

      // 4. Find user
      const user = await this.findUserOrThrow(effectiveUserId);

      // 5. Find MFA configurations
      const mfaMethods = await this.mfaRepository.findAllByUserId(effectiveUserId);
      const enabledMethods = mfaMethods.filter(m => m.isEnabled());

      if (enabledMethods.length === 0) {
        throw new BadRequestException(
          'MFA is not enabled for this user',
          'এই ব্যবহারকারীর জন্য MFA সক্রিয় নেই'
        );
      }

      // 6. For single method disable, identify which method
      let targetMethod: MFAMethod | undefined;
      
      if (command.methodId) {
        targetMethod = enabledMethods.find(m => m.getId() === command.methodId);
        if (!targetMethod) {
          throw new BadRequestException(
            'MFA method not found',
            'MFA পদ্ধতি পাওয়া যায়নি'
          );
        }
      } else if (enabledMethods.length === 1) {
        targetMethod = enabledMethods[0];
      }

      // 7. Verify the request (unless admin override)
      if (!command.isAdminOverride()) {
        const isValid = await this.verifyRequest(
          effectiveUserId,
          verificationType,
          verificationCode,
          targetMethod || enabledMethods,
          deviceInfo,
          correlationId
        );

        if (!isValid) {
          // Track failed attempt
          await this.trackFailedAttempt(effectiveUserId, verificationType, deviceInfo, correlationId);
          throw new UnauthorizedException(
            'Invalid verification code',
            'ভুল ভেরিফিকেশন কোড'
          );
        }
      }

      // 8. Execute MFA disable with transaction
      let sessionsRevoked = 0;
      let remainingMethods = 0;
      let requiresPasswordChange = false;

      await this.transactionManager.runInTransaction(async () => {
        // Disable MFA method(s)
        if (targetMethod) {
          // Disable single method
          targetMethod!.disable();
          await this.mfaRepository.save(targetMethod!);
          remainingMethods = enabledMethods.filter(m => m.getId() !== targetMethod!.getId() && m.isEnabled()).length;
        } else if (command.scope === 'all') {
          // Disable all methods
          for (const method of enabledMethods) {
            method.disable();
            await this.mfaRepository.save(method);
          }
          remainingMethods = 0;
          // Mark user as MFA disabled
          user.disableMFA();
          await this.userRepository.save(user);
          
          // Check if password change is required after MFA disable (security policy)
          requiresPasswordChange = MFA_CONFIG.REQUIRE_PASSWORD_CHANGE_ON_MFA_DISABLE || false;
        } else {
          throw new BadRequestException(
            'Invalid disable scope. Specify methodId or scope: "all"',
            'ভুল ডিজেবল স্কোপ। methodId বা scope: "all" নির্দিষ্ট করুন'
          );
        }

        // Revoke all sessions for security
        sessionsRevoked = await this.sessionRepository.revokeAllByUserId(
          effectiveUserId,
          'MFA disabled - security precaution'
        );

        // Also revoke refresh tokens
        await this.refreshTokenRepository.revokeAllByUserId(effectiveUserId, 'MFA disabled');
      });

      // 9. Determine disable reason
      const disableReason = command.isAdminOverride() 
        ? MFADisableReason.ADMIN_DISABLED 
        : MFADisableReason.USER_DISABLED;

      // 10. Publish event with circuit breaker
      await this.publishMfaDisabledEvent(
        effectiveUserId,
        targetMethod,
        disableReason,
        correlationId,
        deviceInfo,
        adminId,
        sessionsRevoked
      );

      // 11. Send notification with circuit breaker and retry
      await this.sendDisableNotification(
        user,
        targetMethod,
        command.isAdminOverride(),
        adminId,
        correlationId
      );

      // 12. Audit log
      await this.auditLog(
        effectiveUserId,
        user.getEmail().getValue(),
        targetMethod,
        verificationType,
        command.getReason(),
        command.isAdminOverride(),
        adminId,
        sessionsRevoked,
        remainingMethods,
        deviceInfo,
        correlationId,
        startTime
      );

      // 13. Invalidate user cache
      await this.invalidateUserCache(effectiveUserId);

      // 14. Clear rate limit on success
      await this.clearRateLimit(userId);

      return {
        success: true,
        message: this.getSuccessMessage(command.isAdminOverride(), remainingMethods),
        messageBn: this.getSuccessMessageBn(command.isAdminOverride(), remainingMethods),
        sessionsRevoked,
        methodId: targetMethod?.getId(),
        mfaType: targetMethod?.getType(),
        disabledAt: new Date().toISOString(),
        correlationId,
        remainingMethods,
        requiresPasswordChange
      };

    } catch (error) {
      this.logger.error(`DisableMfaCommand failed for user ${userId}: ${error.message}`);

      // Audit failure
      await this.auditService.log({
        action: 'MFA_DISABLE_FAILED',
        userId,
        verificationType: command.verificationType,
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
   * Check rate limit for MFA disable attempts
   */
  private async checkRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`mfa-disable:${userId}`);
    const attempts = await this.cacheService.incr(rateLimitKey);

    if (attempts === 1) {
      await this.cacheService.expire(rateLimitKey, 3600); // 1 hour window
    }

    const maxAttempts = MFA_CONFIG.MAX_DISABLE_ATTEMPTS_PER_HOUR || 5;
    if (attempts > maxAttempts) {
      throw new BadRequestException(
        'Too many MFA disable attempts. Please try again later.',
        'অনেকবার MFA ডিজেবলের চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।'
      );
    }
  }

  /**
   * Clear rate limit on successful disable
   */
  private async clearRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`mfa-disable:${userId}`);
    await this.cacheService.del(rateLimitKey);
  }

  /**
   * Track failed verification attempt for security monitoring
   */
  private async trackFailedAttempt(
    userId: string,
    verificationType: DisableMfaVerificationType,
    deviceInfo: any,
    correlationId?: string
  ): Promise<void> {
    const failKey = CacheKeyBuilder.mfaFailedAttempts(userId);
    const failCount = await this.cacheService.incr(failKey);
    if (failCount === 1) {
      await this.cacheService.expire(failKey, 3600);
    }

    await this.auditService.log({
      action: 'MFA_DISABLE_VERIFICATION_FAILED',
      userId,
      verificationType,
      failCount,
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      correlationId,
      timestamp: new Date().toISOString(),
      severity: AUDIT_SEVERITIES.WARNING
    });
  }

  /**
   * Find user by ID or throw exception
   */
  private async findUserOrThrow(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BadRequestException(
        'User not found',
        'ইউজার পাওয়া যায়নি'
      );
    }
    return user;
  }

  /**
   * Verify the disable request based on verification type
   */
  private async verifyRequest(
    userId: string,
    verificationType: DisableMfaVerificationType,
    verificationCode: string | undefined,
    mfaMethod: MFAMethod | MFAMethod[],
    deviceInfo: any,
    correlationId?: string
  ): Promise<boolean> {
    if (!verificationCode) {
      return false;
    }

    const methods = Array.isArray(mfaMethod) ? mfaMethod : [mfaMethod];

    switch (verificationType) {
      case DisableMfaVerificationType.MFA_CODE:
        // Verify MFA code using the primary method
        const primaryMethod = methods.find(m => m.isPrimary()) || methods[0];
        if (!primaryMethod) return false;
        
        const isValidCode = await this.mfaVerificationService.verifyCode(
          userId,
          verificationCode,
          primaryMethod.getId()
        );
        return isValidCode;

      case DisableMfaVerificationType.PASSWORD:
        // Verify user password
        const user = await this.userRepository.findById(userId);
        if (!user) return false;

        const isValidPassword = await this.passwordHasher.compare(
          verificationCode,
          user.getPasswordHash()
        );
        return isValidPassword;

      case DisableMfaVerificationType.BACKUP_CODE:
        // Verify backup code against any method's backup codes
        for (const method of methods) {
          const hashedCodes = method.getBackupCodes();
          for (const hashed of hashedCodes) {
            const isValid = await this.passwordHasher.compare(verificationCode, hashed);
            if (isValid) {
              // Remove used backup code
              method.removeBackupCode(hashed);
              await this.mfaRepository.save(method);
              return true;
            }
          }
        }
        return false;

      default:
        return false;
    }
  }

  /**
   * Publish MFA disabled event with circuit breaker
   */
  private async publishMfaDisabledEvent(
    userId: string,
    mfaMethod: MFAMethod | undefined,
    reason: MFADisableReason,
    correlationId: string | undefined,
    deviceInfo: any,
    adminId: string | undefined,
    sessionsRevoked: number
  ): Promise<void> {
    await this.notificationCircuitBreaker.call(async () => {
      await withRetry(() =>
        this.eventBus.publish(
          new MfaDisabledEvent(
            userId,
            mfaMethod?.getType() || 'UNKNOWN',
            reason,
            correlationId,
            deviceInfo?.ipAddress,
            adminId,
            {
              methodId: mfaMethod?.getId(),
              sessionsRevoked,
              deviceInfo: {
                deviceId: deviceInfo?.deviceId,
                userAgent: deviceInfo?.userAgent,
                district: deviceInfo?.district
              }
            }
          )
        )
      );
    }).catch(err => {
      this.logger.warn(`Failed to publish MFA disabled event: ${err.message}`);
    });
  }

  /**
   * Send disable notification with circuit breaker and retry
   */
  private async sendDisableNotification(
    user: User,
    mfaMethod: MFAMethod | undefined,
    isAdminOverride: boolean,
    adminId: string | undefined,
    correlationId: string | undefined
  ): Promise<void> {
    await this.notificationCircuitBreaker.call(async () => {
      await withRetry(() =>
        this.notificationService.sendMFADisabledNotification(
          user.getId(),
          user.getEmail().getValue(),
          mfaMethod?.getType() || 'All MFA methods',
          isAdminOverride,
          adminId
        )
      );
    }).catch(err => {
      this.logger.warn(`Failed to send MFA disabled notification: ${err.message}`);
    });

    // Send WhatsApp notification if user has phone number (Bangladesh specific)
    const phone = user.getPhone();
    if (phone) {
      await withRetry(() =>
        this.notificationService.sendWhatsAppNotification(
          phone.getValue(),
          `🔐 MFA Disabled\n\nYour MFA has been ${isAdminOverride ? 'disabled by admin' : 'disabled'}.\nIf you did not request this, please contact support immediately.`
        )
      ).catch(err => {
        this.logger.warn(`Failed to send WhatsApp MFA disabled notification: ${err.message}`);
      });
    }
  }

  /**
   * Audit log for MFA disable
   */
  private async auditLog(
    userId: string,
    userEmail: string,
    mfaMethod: MFAMethod | undefined,
    verificationType: DisableMfaVerificationType,
    reason: string,
    isAdminOverride: boolean,
    adminId: string | undefined,
    sessionsRevoked: number,
    remainingMethods: number,
    deviceInfo: any,
    correlationId: string | undefined,
    startTime: number
  ): Promise<void> {
    await this.auditService.log({
      action: 'MFA_DISABLED',
      userId,
      userEmail: maskEmail(userEmail),
      mfaType: mfaMethod?.getType(),
      methodId: mfaMethod?.getId(),
      verificationType,
      reason,
      isAdminOverride,
      adminId,
      sessionsRevoked,
      remainingMethods,
      deviceInfo: {
        ipAddress: deviceInfo?.ipAddress,
        deviceId: deviceInfo?.deviceId,
        userAgent: deviceInfo?.userAgent,
        deviceFingerprint: deviceInfo?.deviceFingerprint,
        district: deviceInfo?.district,
        networkType: deviceInfo?.networkType,
        mobileOperator: deviceInfo?.mobileOperator
      },
      correlationId,
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startTime,
      severity: AUDIT_SEVERITIES.INFO
    });
  }

  /**
   * Invalidate user cache after MFA disable
   */
  private async invalidateUserCache(userId: string): Promise<void> {
    await this.cacheService.del(CacheKeyBuilder.user(userId));
    await this.cacheService.del(CacheKeyBuilder.userMFAStatus(userId));
    await this.cacheService.del(CacheKeyBuilder.userPermissions(userId));
    await this.cacheService.delPattern(CacheKeyBuilder.userMfaMethods(userId));
  }

  /**
   * Get success message in English
   */
  private getSuccessMessage(isAdminOverride: boolean, remainingMethods: number): string {
    if (isAdminOverride) {
      return 'MFA has been disabled by administrator';
    }
    if (remainingMethods > 0) {
      return `MFA method disabled successfully. ${remainingMethods} MFA method(s) still active.`;
    }
    return 'MFA has been disabled successfully';
  }

  /**
   * Get success message in Bengali
   */
  private getSuccessMessageBn(isAdminOverride: boolean, remainingMethods: number): string {
    if (isAdminOverride) {
      return 'MFA অ্যাডমিন দ্বারা নিষ্ক্রিয় করা হয়েছে';
    }
    if (remainingMethods > 0) {
      return `MFA পদ্ধতি সফলভাবে নিষ্ক্রিয় করা হয়েছে। ${remainingMethods}টি MFA পদ্ধতি এখনও সক্রিয় আছে।`;
    }
    return 'MFA সফলভাবে নিষ্ক্রিয় করা হয়েছে';
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { DisableMfaResponseDto as DisableMfaResponseDtoType };
