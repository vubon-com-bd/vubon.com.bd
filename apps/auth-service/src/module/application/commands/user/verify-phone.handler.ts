/**
 * Verify Phone Handler - Application Layer (Enterprise Enhanced v5.0)
 * 
 * @module application/commands/user/verify-phone.handler
 * 
 * @description
 * Handles phone number verification with OTP using enterprise-grade security features:
 * - Atomic rate limiting (Redis incr) for global attempts
 * - Max attempt limits with proper tracking
 * - Pending change expiry check
 * - Transaction management for data consistency
 * - Notification service abstraction (not direct SMS service)
 * - Cache invalidation strategy
 * - Event publishing with correlation tracking
 * - Distributed tracing with correlation ID
 * - Bengali message support for better UX in Bangladesh
 * - Bangladesh-specific fields (district, networkType, mobileOperator)
 * - Complete audit logging with severity levels
 * - Circuit breaker pattern for external services
 * - Retry mechanism with exponential backoff
 */

import { Injectable, BadRequestException, UnauthorizedException, NotFoundException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { VerifyPhoneCommand, VerifyPhoneResult } from './types';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { Phone } from '../../../domain/value-objects/phone.vo';
import { CacheService } from '../../services/interfaces/cache.service.interface';
import { TransactionManager } from '../../services/interfaces/transaction-manager.interface';
import { EventBus } from '../../services/interfaces/event-bus.interface';
import { AuditService } from '../../services/interfaces/audit.service.interface';
import { NotificationService } from '../../services/interfaces/notification.service.interface';
import { PhoneVerifiedEvent } from '../../events/phone-verified.event';
import { CacheKeyBuilder } from '../../services/interfaces/cache.service.interface';

// Import shared packages
import { AUDIT_SEVERITIES, RATE_LIMIT_CONFIG } from '@vubon/shared-constants';
import { maskPhone as maskPhoneUtil } from '@vubon/shared-utils';

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

const MAX_VERIFICATION_ATTEMPTS = 3;
const MAX_GLOBAL_ATTEMPTS_PER_HOUR = 5;

// ============================================================
// Verify Phone Handler (Enterprise Enhanced v5.0)
// ============================================================

@Injectable()
@CommandHandler(VerifyPhoneCommand)
export class VerifyPhoneHandler implements ICommandHandler<VerifyPhoneCommand> {
  private readonly logger = new Logger(VerifyPhoneHandler.name);
  private readonly notificationCircuitBreaker = CircuitBreaker.getInstance('notification');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheService: CacheService,
    private readonly transactionManager: TransactionManager,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly notificationService: NotificationService
  ) {}

  /**
   * Execute the Verify Phone command
   */
  async execute(command: VerifyPhoneCommand): Promise<VerifyPhoneResult> {
    const startTime = Date.now();
    const { userId, otp, deviceInfo, correlationId } = command;
    const {
      deviceId,
      ipAddress,
      userAgent,
      deviceFingerprint,
      district,
      division,
      upazila,
      networkType,
      mobileOperator,
    } = deviceInfo || {};

    this.logger.log(`Executing VerifyPhoneCommand for user ${userId}, correlationId: ${correlationId}`);

    try {
      // 1. Global rate limiting check (atomic increment - prevents race condition)
      await this.checkGlobalRateLimit(userId);

      // 2. Find user
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException(
          `User with ID ${userId} not found`,
          `${userId} আইডি সহ ইউজার পাওয়া যায়নি`
        );
      }

      // 3. Get pending phone change from cache (using CacheKeyBuilder)
      const pendingKey = CacheKeyBuilder.phoneChange(userId);
      const pendingData = await this.cacheService.get<{
        newPhone: string;
        otp: string;
        attempts: number;
        expiresAt: string;
        createdAt: string;
        deviceId?: string;
        ipAddress?: string;
      }>(pendingKey);

      if (!pendingData) {
        throw new BadRequestException(
          'No pending phone change request found or request expired',
          'কোন পেন্ডিং ফোন পরিবর্তন অনুরোধ পাওয়া যায়নি বা অনুরোধের মেয়াদ শেষ হয়েছে'
        );
      }

      // 4. Check expiry
      const expiresAt = new Date(pendingData.expiresAt);
      if (new Date() > expiresAt) {
        await this.cacheService.del(pendingKey);
        await this.auditService.log({
          action: 'PHONE_VERIFY_EXPIRED',
          userId,
          ipAddress,
          deviceId,
          correlationId,
          timestamp: new Date().toISOString(),
          severity: AUDIT_SEVERITIES.WARNING,
        });
        throw new BadRequestException(
          'OTP has expired. Please request a new one.',
          'OTP-এর মেয়াদ শেষ হয়েছে। অনুগ্রহ করে একটি নতুন অনুরোধ করুন।'
        );
      }

      // 5. Check if phone is already verified with this number
      const currentPhone = user.getPhone()?.getValue();
      if (user.isPhoneVerified() && currentPhone === pendingData.newPhone) {
        await this.cacheService.del(pendingKey);
        this.logger.log(`Phone ${this.maskPhone(pendingData.newPhone)} already verified for user ${userId}`);
        return {
          success: true,
          message: 'Phone already verified',
          messageBn: 'ফোন নম্বর ইতিমধ্যে ভেরিফাই করা আছে',
          phone: currentPhone!,
          verifiedAt: user.getPhoneVerifiedAt() || new Date(),
          correlationId,
        };
      }

      // 6. Check attempts limit
      if (pendingData.attempts >= MAX_VERIFICATION_ATTEMPTS) {
        await this.cacheService.del(pendingKey);
        await this.auditService.log({
          action: 'PHONE_VERIFY_MAX_ATTEMPTS',
          userId,
          attempts: pendingData.attempts,
          ipAddress,
          deviceId,
          deviceFingerprint,
          correlationId,
          timestamp: new Date().toISOString(),
          severity: AUDIT_SEVERITIES.WARNING,
        });
        throw new UnauthorizedException(
          `Too many failed attempts. Maximum ${MAX_VERIFICATION_ATTEMPTS} attempts allowed. Please request a new OTP.`,
          `অনেকবার ভুল চেষ্টা করা হয়েছে। সর্বোচ্চ ${MAX_VERIFICATION_ATTEMPTS} বার চেষ্টা করা যাবে। অনুগ্রহ করে একটি নতুন OTP অনুরোধ করুন।`
        );
      }

      // 7. Increment global attempt count (atomic - already done in checkGlobalRateLimit)
      // Note: The increment is already done in checkGlobalRateLimit

      // 8. Verify OTP
      if (pendingData.otp !== otp) {
        // Increment local attempts
        pendingData.attempts++;
        const ttlSeconds = Math.max(1, Math.ceil((expiresAt.getTime() - Date.now()) / 1000));
        await this.cacheService.set(pendingKey, pendingData, ttlSeconds);

        const remainingAttempts = MAX_VERIFICATION_ATTEMPTS - pendingData.attempts;

        await this.auditService.log({
          action: 'PHONE_VERIFY_FAILED',
          userId,
          attemptsUsed: pendingData.attempts,
          attemptsRemaining: remainingAttempts,
          ipAddress,
          deviceId,
          deviceFingerprint,
          correlationId,
          timestamp: new Date().toISOString(),
          severity: AUDIT_SEVERITIES.WARNING,
        });

        throw new UnauthorizedException(
          `Invalid OTP. ${remainingAttempts} ${remainingAttempts === 1 ? 'attempt' : 'attempts'} remaining.`,
          `ভুল OTP। ${remainingAttempts}টি চেষ্টা বাকি আছে।`
        );
      }

      // 9. Validate phone format
      let newPhone: Phone;
      try {
        newPhone = new Phone(pendingData.newPhone);
      } catch (error) {
        await this.cacheService.del(pendingKey);
        throw new BadRequestException(
          'Invalid phone number format in pending request',
          'পেন্ডিং অনুরোধে ভুল ফোন নম্বর ফরম্যাট'
        );
      }

      const oldPhone = user.getPhone()?.getValue();
      const maskedNewPhone = this.maskPhone(newPhone.getValue());

      // 10. Execute in transaction
      await this.transactionManager.runInTransaction(async () => {
        // Update user phone
        user.updatePhone(newPhone);
        user.markPhoneVerified();
        await this.userRepository.save(user);

        // Clear pending change cache
        await this.cacheService.del(pendingKey);
      });

      // 11. Invalidate user caches
      await this.invalidateUserCaches(userId, oldPhone, newPhone.getValue());

      // 12. Send confirmation SMS/WhatsApp with circuit breaker (Bangladesh specific)
      await this.sendConfirmationNotification(newPhone.getValue(), correlationId);

      // 13. Publish event
      await this.eventBus.publish(
        new PhoneVerifiedEvent(
          userId,
          newPhone.getValue(),
          correlationId,
          ipAddress,
          deviceId,
          userAgent,
          {
            district,
            networkType,
            mobileOperator,
            oldPhone: oldPhone ? this.maskPhone(oldPhone) : undefined,
          }
        )
      );

      // 14. Audit log (with Bangladesh-specific fields)
      await this.auditLog(
        userId,
        maskedNewPhone,
        deviceInfo,
        startTime,
        correlationId
      );

      this.logger.log(`Phone verified for user ${userId}: ${maskedNewPhone}`);

      // 15. Clear global rate limit on success
      await this.clearGlobalRateLimit(userId);

      // 16. Return result with Bengali message
      return {
        success: true,
        message: 'Phone number verified successfully',
        messageBn: 'ফোন নম্বর সফলভাবে ভেরিফাই করা হয়েছে',
        phone: newPhone.getValue(),
        verifiedAt: new Date(),
        correlationId,
      };
    } catch (error) {
      this.logger.error(`VerifyPhoneCommand failed for user ${userId}: ${error.message}`);

      // Audit failure
      await this.auditService.log({
        action: 'PHONE_VERIFY_ERROR',
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
   * Check global rate limit for phone verification attempts (atomic increment)
   */
  private async checkGlobalRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`phone-verify:${userId}`);
    const attempts = await this.cacheService.incr(rateLimitKey);

    if (attempts === 1) {
      await this.cacheService.expire(rateLimitKey, RATE_LIMIT_CONFIG?.PHONE_VERIFY_WINDOW_SECONDS || 3600);
    }

    const maxAttempts = RATE_LIMIT_CONFIG?.MAX_PHONE_VERIFY_ATTEMPTS_PER_HOUR || MAX_GLOBAL_ATTEMPTS_PER_HOUR;
    if (attempts > maxAttempts) {
      throw new BadRequestException(
        `Too many verification attempts. Please try again after 1 hour.`,
        `অনেকবার ভেরিফিকেশনের চেষ্টা করা হয়েছে। অনুগ্রহ করে ১ ঘন্টা পরে আবার চেষ্টা করুন।`
      );
    }
  }

  /**
   * Clear global rate limit on successful verification
   */
  private async clearGlobalRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`phone-verify:${userId}`);
    await this.cacheService.del(rateLimitKey);
  }

  /**
   * Invalidate all user caches after phone verification
   */
  private async invalidateUserCaches(userId: string, oldPhone?: string, newPhone?: string): Promise<void> {
    await this.cacheService.del(CacheKeyBuilder.user(userId));
    await this.cacheService.del(CacheKeyBuilder.userPermissions(userId));
    await this.cacheService.del(CacheKeyBuilder.userRoles(userId));
    await this.cacheService.del(CacheKeyBuilder.userSessions(userId));
    await this.cacheService.del(CacheKeyBuilder.userMFAStatus(userId));

    if (oldPhone) {
      await this.cacheService.del(CacheKeyBuilder.userByPhone(oldPhone));
    }
    if (newPhone) {
      await this.cacheService.del(CacheKeyBuilder.userByPhone(newPhone));
    }
  }

  /**
   * Send confirmation notification with circuit breaker
   */
  private async sendConfirmationNotification(phoneNumber: string, correlationId?: string): Promise<void> {
    const message = 'Your phone number has been successfully verified on Vubon.';
    const messageBn = 'আপনার ফোন নম্বর সফলভাবে ভুবনে ভেরিফাই করা হয়েছে।';

    await this.notificationCircuitBreaker.call(async () => {
      await withRetry(() =>
        this.notificationService.sendSms(phoneNumber, message, 'notification', correlationId)
      );
    }).catch((err) => {
      this.logger.warn(`Failed to send confirmation SMS to ${this.maskPhone(phoneNumber)}: ${err.message}`);
    });

    // Try WhatsApp for Bangladesh numbers (better delivery)
    try {
      await withRetry(() =>
        this.notificationService.sendWhatsAppNotification(phoneNumber, messageBn, correlationId)
      );
    } catch (err) {
      this.logger.warn(`Failed to send WhatsApp confirmation to ${this.maskPhone(phoneNumber)}: ${err.message}`);
    }
  }

  /**
   * Mask phone number for privacy
   */
  private maskPhone(phone: string): string {
    if (!phone) return 'none';
    return maskPhoneUtil(phone);
  }

  /**
   * Audit log for phone verification
   */
  private async auditLog(
    userId: string,
    phone: string,
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
      action: 'PHONE_VERIFIED',
      userId,
      phone,
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
  // Public Helper Methods (for other handlers to use)
  // ============================================================

  /**
   * Get pending phone change data (for debugging/admin)
   */
  public async getPendingChange(userId: string): Promise<unknown | null> {
    const pendingKey = CacheKeyBuilder.phoneChange(userId);
    return this.cacheService.get(pendingKey);
  }

  /**
   * Force clear pending change (admin override)
   */
  public async forceClearPendingChange(userId: string, adminId: string): Promise<boolean> {
    const pendingKey = CacheKeyBuilder.phoneChange(userId);
    const existed = await this.cacheService.exists(pendingKey);
    if (existed) {
      await this.cacheService.del(pendingKey);
      await this.auditService.log({
        action: 'PHONE_CHANGE_FORCE_CLEARED',
        userId,
        adminId,
        timestamp: new Date().toISOString(),
        severity: AUDIT_SEVERITIES.INFO,
      });
      return true;
    }
    return false;
  }
}
