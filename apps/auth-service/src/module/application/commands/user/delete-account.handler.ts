/**
 * Delete Account Handler - Application Layer (Enterprise Enhanced v5.0)
 * 
 * @module application/commands/user/delete-account.handler
 * 
 * @description
 * Handles user account deletion with enterprise-grade security features:
 * - Confirmation required for destructive action
 * - Password verification for security
 * - Soft delete with data retention (GDPR compliant)
 * - Data anonymization for privacy
 * - Session and token revocation
 * - Rate limiting to prevent abuse
 * - Cooldown period between deletion requests
 * - Transaction management for data consistency
 * - Cache invalidation strategy
 * - Event publishing with correlation tracking
 * - Email notification with circuit breaker
 * - Distributed tracing with correlation ID
 * - Bengali message support for better UX in Bangladesh
 * - Bangladesh-specific fields (district, networkType, mobileOperator)
 * - Complete audit logging with severity levels
 * - Account cancellation window for recovery
 * - GDPR compliance (right to erasure)
 */

import { Injectable, BadRequestException, UnauthorizedException, NotFoundException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';

import { DeleteAccountCommand, DeleteAccountResult } from './types';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import { PasswordHasher } from '../../services/interfaces/password-hasher.interface';
import { EventBus } from '../../services/interfaces/event-bus.interface';
import { NotificationService } from '../../services/interfaces/notification.service.interface';
import { AuditService } from '../../services/interfaces/audit.service.interface';
import { CacheService } from '../../services/interfaces/cache.service.interface';
import { TransactionManager } from '../../services/interfaces/transaction-manager.interface';
import { AccountDeletedEvent } from '../../events/account-deleted.event';
import { CacheKeyBuilder } from '../../services/interfaces/cache.service.interface';

// Import shared packages
import { 
  RATE_LIMIT_CONFIG, 
  AUDIT_SEVERITIES,
  ACCOUNT_CONFIG
} from '@vubon/shared-constants';
import { maskEmail as maskEmailUtil } from '@vubon/shared-utils';

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
      nextAttemptTime: 0,
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
      nextAttemptAt: this.state.nextAttemptTime ? new Date(this.state.nextAttemptTime) : undefined,
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
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

// ============================================================
// Constants
// ============================================================

const DATA_RETENTION_DAYS = ACCOUNT_CONFIG?.DATA_RETENTION_DAYS || 30;
const CANCELLATION_WINDOW_DAYS = ACCOUNT_CONFIG?.CANCELLATION_WINDOW_DAYS || 7;
const MAX_DELETE_REQUESTS_PER_HOUR = 3;
const DELETE_COOLDOWN_HOURS = 24;

// ============================================================
// Delete Account Handler (Enterprise Enhanced v5.0)
// ============================================================

@Injectable()
@CommandHandler(DeleteAccountCommand)
export class DeleteAccountHandler implements ICommandHandler<DeleteAccountCommand> {
  private readonly logger = new Logger(DeleteAccountHandler.name);
  private readonly notificationCircuitBreaker = CircuitBreaker.getInstance('notification');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly eventBus: EventBus,
    private readonly notificationService: NotificationService,
    private readonly auditService: AuditService,
    private readonly cacheService: CacheService,
    private readonly transactionManager: TransactionManager
  ) {}

  /**
   * Execute the Delete Account command
   */
  async execute(command: DeleteAccountCommand): Promise<DeleteAccountResult> {
    const startTime = Date.now();
    const { userId, confirm, currentPassword, reason, requestDataExport, gracePeriodDays, deviceInfo, correlationId } = command;
    const { deviceId, ipAddress, userAgent, deviceFingerprint, district, division, upazila, networkType, mobileOperator } = deviceInfo || {};

    this.logger.log(`Executing DeleteAccountCommand for user ${userId}, correlationId: ${correlationId}`);

    try {
      // 1. Validate confirmation (destructive action protection)
      if (!confirm) {
        throw new BadRequestException(
          'Confirmation required to delete account',
          'অ্যাকাউন্ট মুছতে নিশ্চিতকরণ প্রয়োজন'
        );
      }

      // 2. Rate limiting check (atomic increment)
      await this.checkRateLimit(userId);

      // 3. Cooldown check (prevent repeated deletion requests)
      await this.checkCooldown(userId);

      // 4. Find user
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException(
          `User with ID ${userId} not found`,
          `${userId} আইডি সহ ইউজার পাওয়া যায়নি`
        );
      }

      // 5. Check if already deleted or scheduled for deletion
      if (user.isDeleted()) {
        throw new BadRequestException(
          'Account is already scheduled for deletion',
          'অ্যাকাউন্ট ইতিমধ্যে মুছে ফেলার জন্য নির্ধারিত আছে'
        );
      }

      // 6. Verify current password for security (✅ FIXED: use getPasswordHash)
      if (!currentPassword) {
        throw new BadRequestException(
          'Current password is required to delete account',
          'অ্যাকাউন্ট মুছতে বর্তমান পাসওয়ার্ড প্রয়োজন'
        );
      }

      const isValid = await this.passwordHasher.compare(currentPassword, user.getPasswordHash());
      if (!isValid) {
        await this.trackFailedAttempt(userId, deviceInfo, correlationId);
        throw new UnauthorizedException(
          'Current password is incorrect',
          'বর্তমান পাসওয়ার্ড ভুল'
        );
      }

      // 7. Store user data for notification (before anonymization)
      const userEmail = user.getEmail().getValue();
      const userName = user.getFullName();
      const maskedEmail = this.maskEmail(userEmail);

      const retentionDays = gracePeriodDays || DATA_RETENTION_DAYS;
      const cancellationDays = CANCELLATION_WINDOW_DAYS;
      const permanentDeletionDate = new Date();
      permanentDeletionDate.setDate(permanentDeletionDate.getDate() + retentionDays);
      const reactivationDeadline = new Date();
      reactivationDeadline.setDate(reactivationDeadline.getDate() + cancellationDays);

      // 8. Prepare data export if requested
      let dataExportUrl: string | undefined;
      let dataExportExpiresAt: Date | undefined;
      if (requestDataExport) {
        const exportResult = await this.prepareDataExport(userId, userEmail, userName, correlationId);
        dataExportUrl = exportResult.url;
        dataExportExpiresAt = exportResult.expiresAt;
      }

      // 9. Execute in transaction
      let sessionsRevoked = 0;
      let refreshTokensRevoked = 0;

      await this.transactionManager.runInTransaction(async () => {
        // Soft delete and anonymize user data (GDPR compliance)
        user.delete();
        
        // Anonymize personal data (enhanced for multiple fields)
        const anonymizedPrefix = `deleted_user_${userId.slice(-8)}`;
        user.anonymize(anonymizedPrefix);
        
        await this.userRepository.save(user);

        // Revoke all sessions
        sessionsRevoked = await this.sessionRepository.revokeAllByUserId(
          userId,
          'Account deleted'
        );

        // Revoke all refresh tokens
        refreshTokensRevoked = await this.refreshTokenRepository.revokeAllByUserId(
          userId,
          'Account deleted'
        );
      });

      // 10. Invalidate all user caches
      await this.invalidateUserCaches(userId, userEmail);

      // 11. Clear rate limit on success
      await this.clearRateLimit(userId);

      // 12. Update cooldown timestamp
      await this.updateCooldown(userId);

      // 13. Audit log for compliance (with Bangladesh-specific fields)
      await this.auditLog(
        userId,
        maskedEmail,
        reason,
        sessionsRevoked,
        refreshTokensRevoked,
        requestDataExport,
        retentionDays,
        cancellationDays,
        permanentDeletionDate,
        reactivationDeadline,
        deviceInfo,
        startTime,
        correlationId
      );

      // 14. Publish event
      await this.eventBus.publish(
        new AccountDeletedEvent(
          userId,
          userEmail,
          reason,
          deviceId,
          ipAddress,
          userAgent,
          correlationId,
          retentionDays,
          cancellationDays,
          {
            sessionsRevoked,
            refreshTokensRevoked,
            dataExportRequested: !!requestDataExport,
            dataExportUrl,
            district,
            networkType,
            mobileOperator
          }
        )
      );

      // 15. Send confirmation email with circuit breaker (non-blocking)
      await this.sendDeletionNotification(
        userId,
        userEmail,
        userName,
        retentionDays,
        cancellationDays,
        dataExportUrl,
        dataExportExpiresAt,
        correlationId
      );

      this.logger.log(`Account deletion scheduled for user ${userId}: ${maskedEmail}`);

      // 16. Return result with Bengali message
      return {
        success: true,
        message: `Your account has been scheduled for deletion. You have ${cancellationDays} days to cancel. Data will be permanently deleted after ${retentionDays} days.`,
        messageBn: `আপনার অ্যাকাউন্ট মুছে ফেলার জন্য নির্ধারিত হয়েছে। আপনার কাছে বাতিল করার জন্য ${cancellationDays} দিন আছে। ${retentionDays} দিন পরে ডেটা স্থায়ীভাবে মুছে ফেলা হবে।`,
        userId,
        deletedAt: new Date(),
        dataRetentionDays: retentionDays,
        cancellationWindowDays: cancellationDays,
        permanentDeletionDate,
        canReactivate: true,
        reactivationDeadline,
        dataExportUrl,
        dataExportExpiresAt,
        correlationId
      };
    } catch (error) {
      this.logger.error(`DeleteAccountCommand failed for user ${userId}: ${error.message}`);

      // Audit failure
      await this.auditService.log({
        action: 'ACCOUNT_DELETION_FAILED',
        userId,
        error: error.message,
        correlationId,
        timestamp: new Date().toISOString(),
        severity: AUDIT_SEVERITIES.ERROR,
      });

      throw error;
    }
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  /**
   * Check rate limit for account deletion attempts (atomic increment)
   */
  private async checkRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`account-delete:${userId}`);
    const attempts = await this.cacheService.incr(rateLimitKey);

    if (attempts === 1) {
      await this.cacheService.expire(rateLimitKey, RATE_LIMIT_CONFIG?.ACCOUNT_DELETE_WINDOW_SECONDS || 3600);
    }

    const maxAttempts = RATE_LIMIT_CONFIG?.MAX_ACCOUNT_DELETE_ATTEMPTS_PER_HOUR || MAX_DELETE_REQUESTS_PER_HOUR;
    if (attempts > maxAttempts) {
      throw new BadRequestException(
        `Too many account deletion requests. Please try again after 1 hour.`,
        `অনেকবার অ্যাকাউন্ট মুছে ফেলার অনুরোধ করা হয়েছে। অনুগ্রহ করে ১ ঘন্টা পরে আবার চেষ্টা করুন।`
      );
    }
  }

  /**
   * Clear rate limit on successful deletion request
   */
  private async clearRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`account-delete:${userId}`);
    await this.cacheService.del(rateLimitKey);
  }

  /**
   * Check cooldown period between deletion requests
   */
  private async checkCooldown(userId: string): Promise<void> {
    const cooldownKey = CacheKeyBuilder.lastAccountDeleteRequest(userId);
    const lastRequestStr = await this.cacheService.get(cooldownKey);

    if (lastRequestStr) {
      const lastRequest = parseInt(lastRequestStr, 10);
      const hoursSinceLastRequest = (Date.now() - lastRequest) / (1000 * 60 * 60);

      if (hoursSinceLastRequest < DELETE_COOLDOWN_HOURS) {
        const remainingHours = Math.ceil(DELETE_COOLDOWN_HOURS - hoursSinceLastRequest);
        throw new BadRequestException(
          `Please wait ${remainingHours} hour(s) before requesting account deletion again.`,
          `অ্যাকাউন্ট মুছে ফেলার জন্য অনুগ্রহ করে ${remainingHours} ঘন্টা অপেক্ষা করুন।`
        );
      }
    }
  }

  /**
   * Update cooldown timestamp after successful deletion request
   */
  private async updateCooldown(userId: string): Promise<void> {
    const cooldownKey = CacheKeyBuilder.lastAccountDeleteRequest(userId);
    await this.cacheService.set(cooldownKey, Date.now().toString(), DELETE_COOLDOWN_HOURS * 60 * 60);
  }

  /**
   * Track failed account deletion attempt
   */
  private async trackFailedAttempt(userId: string, deviceInfo: any, correlationId?: string): Promise<void> {
    const failKey = CacheKeyBuilder.failedAttempts(`account-delete:${userId}`);
    const failCount = await this.cacheService.incr(failKey);
    if (failCount === 1) {
      await this.cacheService.expire(failKey, 3600);
    }

    await this.auditService.log({
      action: 'ACCOUNT_DELETION_FAILED',
      userId,
      failCount,
      reason: 'Invalid password',
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      deviceFingerprint: deviceInfo?.deviceFingerprint,
      correlationId,
      timestamp: new Date().toISOString(),
      severity: AUDIT_SEVERITIES.WARNING,
    });
  }

  /**
   * Prepare data export for GDPR compliance
   */
  private async prepareDataExport(
    userId: string,
    email: string,
    name: string,
    correlationId?: string
  ): Promise<{ url: string; expiresAt: Date }> {
    // Generate export token
    const exportToken = randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

    // Store export metadata in cache
    await this.cacheService.set(
      CacheKeyBuilder.userDataExport(userId),
      {
        token: exportToken,
        email,
        name,
        requestedAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString(),
      },
      7 * 24 * 60 * 60 // 7 days TTL
    );

    const exportUrl = `/api/users/${userId}/data-export?token=${exportToken}`;
    return { url: exportUrl, expiresAt };
  }

  /**
   * Invalidate all user caches after deletion
   */
  private async invalidateUserCaches(userId: string, email: string): Promise<void> {
    await this.cacheService.del(CacheKeyBuilder.user(userId));
    await this.cacheService.del(CacheKeyBuilder.userByEmail(email));
    await this.cacheService.del(CacheKeyBuilder.userPermissions(userId));
    await this.cacheService.del(CacheKeyBuilder.userRoles(userId));
    await this.cacheService.del(CacheKeyBuilder.userSessions(userId));
    await this.cacheService.del(CacheKeyBuilder.userMFAStatus(userId));
    await this.cacheService.delPattern(CacheKeyBuilder.userSessionPattern(userId));
  }

  /**
   * Send deletion notification with circuit breaker
   */
  private async sendDeletionNotification(
    userId: string,
    email: string,
    name: string,
    retentionDays: number,
    cancellationDays: number,
    dataExportUrl?: string,
    dataExportExpiresAt?: Date,
    correlationId?: string
  ): Promise<void> {
    await this.notificationCircuitBreaker.call(async () => {
      await withRetry(() =>
        this.notificationService.sendAccountDeletedNotification(
          userId,
          email,
          name,
          retentionDays,
          cancellationDays,
          dataExportUrl,
          correlationId
        )
      );
    }).catch((err) => {
      this.logger.warn(`Failed to send account deletion notification to user ${userId}: ${err.message}`);
    });
  }

  /**
   * Mask email for privacy
   */
  private maskEmail(email: string): string {
    return maskEmailUtil(email);
  }

  /**
   * Audit log for account deletion
   */
  private async auditLog(
    userId: string,
    email: string,
    reason: string | undefined,
    sessionsRevoked: number,
    refreshTokensRevoked: number,
    dataExportRequested: boolean,
    retentionDays: number,
    cancellationDays: number,
    permanentDeletionDate: Date,
    reactivationDeadline: Date,
    deviceInfo: any,
    startTime: number,
    correlationId?: string
  ): Promise<void> {
    const {
      ipAddress,
      deviceId,
      userAgent,
      deviceFingerprint,
      district,
      division,
      upazila,
      networkType,
      mobileOperator,
    } = deviceInfo || {};

    await this.auditService.log({
      action: 'ACCOUNT_DELETION_SCHEDULED',
      userId,
      email,
      reason: reason || 'User initiated account deletion',
      sessionsRevoked,
      refreshTokensRevoked,
      dataExportRequested,
      retentionDays,
      cancellationDays,
      permanentDeletionDate: permanentDeletionDate.toISOString(),
      reactivationDeadline: reactivationDeadline.toISOString(),
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
      severity: AUDIT_SEVERITIES.INFO,
    });
  }

  // ============================================================
  // Public Helper Methods (for account reactivation)
  // ============================================================

  /**
   * Get pending deletion data for a user (for reactivation check)
   */
  public async getPendingDeletion(userId: string): Promise<{ isDeleted: boolean; deletedAt?: Date; permanentDeletionDate?: Date } | null> {
    const user = await this.userRepository.findById(userId);
    if (!user || !user.isDeleted()) return null;
    
    return {
      isDeleted: true,
      deletedAt: user.getDeletedAt(),
      permanentDeletionDate: user.getPermanentDeletionDate(),
    };
  }

  /**
   * Reactivate a soft-deleted account (within cancellation window)
   */
  public async reactivateAccount(userId: string, deviceInfo: any, correlationId?: string): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    if (!user || !user.isDeleted()) {
      throw new BadRequestException('Account is not deleted or not found');
    }

    const deletedAt = user.getDeletedAt();
    if (!deletedAt) {
      throw new BadRequestException('Invalid deletion state');
    }

    const now = new Date();
    const daysSinceDeletion = (now.getTime() - deletedAt.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysSinceDeletion > CANCELLATION_WINDOW_DAYS) {
      throw new BadRequestException(
        `Cancellation window (${CANCELLATION_WINDOW_DAYS} days) has passed. Account cannot be reactivated.`,
        `বাতিল করার সময়সীমা (${CANCELLATION_WINDOW_DAYS} দিন) অতিক্রান্ত হয়েছে। অ্যাকাউন্ট পুনরায় সক্রিয় করা যাবে না।`
      );
    }

    await this.transactionManager.runInTransaction(async () => {
      user.reactivate();
      await this.userRepository.save(user);
    });

    await this.auditService.log({
      action: 'ACCOUNT_REACTIVATED',
      userId,
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      correlationId,
      timestamp: new Date().toISOString(),
      severity: AUDIT_SEVERITIES.INFO,
    });

    this.logger.log(`Account reactivated for user ${userId}`);
    return true;
  }
}
