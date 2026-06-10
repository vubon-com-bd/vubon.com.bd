/**
 * Update Phone Handler - Application Layer (Enterprise Enhanced v4.0)
 *
 * @module application/commands/user/update-phone.handler
 *
 * @description
 * Handles user phone number update with enterprise-grade security features:
 * - Current password verification required
 * - OTP sent to new phone for verification
 * - Atomic rate limiting (Redis incr)
 * - Cooldown period between changes
 * - Transaction management for data consistency
 * - Secure OTP generation (crypto.randomInt)
 * - Notification service abstraction (not direct SMS service)
 * - Phone uniqueness check
 * - Pending change expiry check
 * - Event publishing with correlation tracking
 * - Distributed tracing with correlation ID
 * - Bengali message support for better UX in Bangladesh
 * - Bangladesh-specific fields (district, networkType, mobileOperator)
 * - Complete audit logging with severity levels
 */

import { Injectable, UnauthorizedException, ConflictException, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { randomInt } from 'crypto';

import { UpdatePhoneCommand, UpdatePhoneResult } from './types';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { Phone } from '../../../domain/value-objects/phone.vo';
import { PasswordHasher } from '../../services/interfaces/password-hasher.interface';
import { NotificationService } from '../../services/interfaces/notification.service.interface';
import { CacheService } from '../../services/interfaces/cache.service.interface';
import { TransactionManager } from '../../services/interfaces/transaction-manager.interface';
import { EventBus } from '../../services/interfaces/event-bus.interface';
import { AuditService } from '../../services/interfaces/audit.service.interface';
import { PhoneChangeRequestedEvent } from '../../events/phone-change-requested.event';
import { CacheKeyBuilder } from '../../services/interfaces/cache.service.interface';

// Import shared packages
import { RATE_LIMIT_CONFIG, AUDIT_SEVERITIES } from '@vubon/shared-constants';
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

const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 5;
const MAX_OTP_REQUESTS_PER_HOUR = 3;
const MAX_VERIFICATION_ATTEMPTS = 3;
const PHONE_CHANGE_COOLDOWN_HOURS = 24;

// ============================================================
// Update Phone Handler (Enterprise Enhanced v4.0)
// ============================================================

@Injectable()
@CommandHandler(UpdatePhoneCommand)
export class UpdatePhoneHandler implements ICommandHandler<UpdatePhoneCommand> {
  private readonly logger = new Logger(UpdatePhoneHandler.name);
  private readonly notificationCircuitBreaker = CircuitBreaker.getInstance('notification');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly notificationService: NotificationService,
    private readonly cacheService: CacheService,
    private readonly transactionManager: TransactionManager,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService
  ) {}

  /**
   * Execute the Update Phone command
   */
  async execute(command: UpdatePhoneCommand): Promise<UpdatePhoneResult> {
    const startTime = Date.now();
    const { userId, newPhone: newPhoneRaw, currentPassword, deviceInfo, correlationId } = command;
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

    this.logger.log(`Executing UpdatePhoneCommand for user ${userId}, correlationId: ${correlationId}`);

    try {
      // 1. Rate limiting check (atomic increment)
      await this.checkRateLimit(userId);

      // 2. Cooldown check (prevent frequent changes)
      await this.checkCooldown(userId);

      // 3. Find user
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`, `${userId} আইডি সহ ইউজার পাওয়া যায়নি`);
      }

      // 4. Verify current password (✅ FIXED: use getPasswordHash)
      const isValid = await this.passwordHasher.compare(currentPassword, user.getPasswordHash());
      if (!isValid) {
        await this.trackFailedAttempt(userId, deviceInfo, correlationId);
        throw new UnauthorizedException('Current password is incorrect', 'বর্তমান পাসওয়ার্ড ভুল');
      }

      // 5. Validate new phone format
      let newPhone: Phone;
      try {
        newPhone = new Phone(newPhoneRaw);
      } catch (error) {
        throw new BadRequestException('Invalid phone number format', 'ভুল ফোন নম্বর ফরম্যাট');
      }

      // 6. Check if phone is already taken by another user
      const existingUser = await this.userRepository.findByPhone(newPhone);
      if (existingUser && existingUser.getId() !== userId) {
        throw new ConflictException('Phone number is already taken', 'ফোন নম্বরটি ইতিমধ্যে ব্যবহৃত হচ্ছে');
      }

      // 7. Check if same as current phone (✅ FIXED: use equals method)
      if (newPhone.equals(user.getPhone())) {
        throw new BadRequestException('New phone number is the same as current phone', 'নতুন ফোন নম্বর বর্তমান ফোন নম্বরের মতোই');
      }

      // 8. Check if there's a pending change (with expiry check)
      await this.checkPendingChange(userId);

      // 9. Generate secure OTP (✅ FIXED: use crypto.randomInt)
      const otp = this.generateSecureOtp();

      const currentPhone = user.getPhone()?.getValue();
      const maskedNewPhone = this.maskPhone(newPhoneRaw);
      const maskedCurrentPhone = currentPhone ? this.maskPhone(currentPhone) : 'none';

      // 10. Execute in transaction
      await this.transactionManager.runInTransaction(async () => {
        // Store OTP in cache with attempt tracking
        await this.cacheService.set(
          CacheKeyBuilder.phoneChange(userId),
          {
            newPhone: newPhoneRaw,
            otp,
            attempts: 0,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000).toISOString(),
            deviceId,
            ipAddress,
            deviceFingerprint,
          },
          OTP_EXPIRY_MINUTES * 60
        );

        // Increment OTP request count (already done in checkRateLimit)
        // Update last phone change time (for cooldown)
        await this.cacheService.set(CacheKeyBuilder.lastPhoneChange(userId), Date.now().toString(), PHONE_CHANGE_COOLDOWN_HOURS * 60 * 60);
      });

      // 11. Send OTP via notification service (✅ FIXED: use interface, not direct SMS service)
      await this.sendOtpNotification(newPhoneRaw, otp, correlationId);

      // 12. Publish event
      await this.eventBus.publish(
        new PhoneChangeRequestedEvent(
          userId,
          currentPhone,
          newPhoneRaw,
          correlationId,
          ipAddress,
          deviceId,
          {
            district,
            networkType,
            mobileOperator,
          }
        )
      );

      // 13. Audit log (with Bangladesh-specific fields)
      await this.auditLog(
        userId,
        maskedCurrentPhone,
        maskedNewPhone,
        deviceInfo,
        startTime,
        correlationId
      );

      // 14. Clear rate limit on success (will be cleared after verification)
      // Note: Rate limit is cleared when OTP is verified in verify-phone handler

      this.logger.log(`Phone change requested for user ${userId} from ${maskedCurrentPhone} to ${maskedNewPhone}`);

      // 15. Return result with Bengali message
      return {
        success: true,
        message: `Verification code sent to ${maskedNewPhone}. Valid for ${OTP_EXPIRY_MINUTES} minutes.`,
        messageBn: `${maskedNewPhone} এ ভেরিফিকেশন কোড পাঠানো হয়েছে। ${OTP_EXPIRY_MINUTES} মিনিটের মধ্যে ব্যবহার করুন।`,
        requiresVerification: true,
        maskedPhone: maskedNewPhone,
        sessionId: undefined,
        expiresInSeconds: OTP_EXPIRY_MINUTES * 60,
        resendCooldownSeconds: 30,
        remainingAttempts: this.getRemainingAttempts(await this.getRequestCount(userId)),
        correlationId,
      };
    } catch (error) {
      this.logger.error(`UpdatePhoneCommand failed for user ${userId}: ${error.message}`);

      // Audit failure
      await this.auditService.log({
        action: 'PHONE_CHANGE_FAILED',
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
   * Check rate limit for phone change attempts (atomic increment)
   */
  private async checkRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`phone-change:${userId}`);
    const attempts = await this.cacheService.incr(rateLimitKey);

    if (attempts === 1) {
      await this.cacheService.expire(rateLimitKey, RATE_LIMIT_CONFIG?.PHONE_CHANGE_WINDOW_SECONDS || 3600);
    }

    const maxAttempts = RATE_LIMIT_CONFIG?.MAX_PHONE_CHANGE_ATTEMPTS_PER_HOUR || MAX_OTP_REQUESTS_PER_HOUR;
    if (attempts > maxAttempts) {
      throw new BadRequestException(
        `Too many OTP requests. Please try again after 1 hour.`,
        `অনেকবার OTP রিকোয়েস্ট করা হয়েছে। অনুগ্রহ করে ১ ঘন্টা পরে আবার চেষ্টা করুন।`
      );
    }
  }

  /**
   * Clear rate limit on successful phone change (when verification is complete)
   */
  private async clearRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`phone-change:${userId}`);
    await this.cacheService.del(rateLimitKey);
  }

  /**
   * Check cooldown period between phone changes
   */
  private async checkCooldown(userId: string): Promise<void> {
    const lastChangeKey = CacheKeyBuilder.lastPhoneChange(userId);
    const lastChangeStr = await this.cacheService.get(lastChangeKey);

    if (lastChangeStr) {
      const lastChange = parseInt(lastChangeStr, 10);
      const hoursSinceLastChange = (Date.now() - lastChange) / (1000 * 60 * 60);

      if (hoursSinceLastChange < PHONE_CHANGE_COOLDOWN_HOURS) {
        const remainingHours = Math.ceil(PHONE_CHANGE_COOLDOWN_HOURS - hoursSinceLastChange);
        throw new BadRequestException(
          `Please wait ${remainingHours} hour(s) before changing your phone number again.`,
          `ফোন নম্বর পরিবর্তনের জন্য অনুগ্রহ করে ${remainingHours} ঘন্টা অপেক্ষা করুন।`
        );
      }
    }
  }

  /**
   * Check if there's a pending phone change (with expiry check)
   */
  private async checkPendingChange(userId: string): Promise<void> {
    const pendingKey = CacheKeyBuilder.phoneChange(userId);
    const pendingChange = await this.cacheService.get<{
      newPhone: string;
      otp: string;
      attempts: number;
      createdAt: string;
      expiresAt: string;
    }>(pendingKey);

    if (pendingChange) {
      const expiresAt = new Date(pendingChange.expiresAt);
      if (expiresAt > new Date()) {
        throw new BadRequestException(
          'A phone change is already pending. Please check your phone for OTP.',
          'ফোন পরিবর্তনের একটি অনুরোধ ইতিমধ্যে পেন্ডিং আছে। অনুগ্রহ করে আপনার ফোন চেক করুন।'
        );
      }
      // If expired, delete the pending change
      await this.cacheService.del(pendingKey);
    }
  }

  /**
   * Track failed phone change attempt
   */
  private async trackFailedAttempt(userId: string, deviceInfo: any, correlationId?: string): Promise<void> {
    const failKey = CacheKeyBuilder.failedAttempts(`phone-change:${userId}`);
    const failCount = await this.cacheService.incr(failKey);
    if (failCount === 1) {
      await this.cacheService.expire(failKey, 3600);
    }

    await this.auditService.log({
      action: 'PHONE_CHANGE_FAILED',
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
   * Generate secure OTP using crypto.randomInt
   */
  private generateSecureOtp(): string {
    const otp = randomInt(100000, 999999);
    return otp.toString();
  }

  /**
   * Send OTP via notification service with circuit breaker
   */
  private async sendOtpNotification(phoneNumber: string, otp: string, correlationId?: string): Promise<void> {
    await this.notificationCircuitBreaker.call(async () => {
      await withRetry(() => this.notificationService.sendSmsOtp(phoneNumber, otp, OTP_EXPIRY_MINUTES, correlationId));
    }).catch((err) => {
      this.logger.warn(`Failed to send OTP to ${this.maskPhone(phoneNumber)}: ${err.message}`);
    });
  }

  /**
   * Get request count for rate limiting
   */
  private async getRequestCount(userId: string): Promise<number> {
    const key = CacheKeyBuilder.rateLimit(`phone-change:${userId}`);
    const count = await this.cacheService.get<number>(key);
    return count || 0;
  }

  /**
   * Get remaining attempts for response
   */
  private getRemainingAttempts(currentCount: number): number {
    const maxAttempts = RATE_LIMIT_CONFIG?.MAX_PHONE_CHANGE_ATTEMPTS_PER_HOUR || MAX_OTP_REQUESTS_PER_HOUR;
    return Math.max(0, maxAttempts - currentCount);
  }

  /**
   * Mask phone number for privacy (uses shared-utils)
   */
  private maskPhone(phone: string): string {
    if (!phone) return 'none';
    return maskPhoneUtil(phone);
  }

  /**
   * Invalidate user cache after phone change completion
   * (to be called from verify-phone handler)
   */
  public async invalidatePhoneCache(userId: string, oldPhone: string, newPhone: string): Promise<void> {
    await this.cacheService.del(CacheKeyBuilder.user(userId));
    await this.cacheService.del(CacheKeyBuilder.userByPhone(oldPhone));
    await this.cacheService.del(CacheKeyBuilder.userByPhone(newPhone));
    await this.cacheService.del(CacheKeyBuilder.userPermissions(userId));
    await this.cacheService.del(CacheKeyBuilder.userSessions(userId));
  }

  /**
   * Delete pending phone change after verification
   */
  public async deletePendingChange(userId: string): Promise<void> {
    await this.cacheService.del(CacheKeyBuilder.phoneChange(userId));
    await this.cacheService.del(CacheKeyBuilder.lastPhoneChange(userId));
  }

  /**
   * Audit log for phone change request
   */
  private async auditLog(
    userId: string,
    oldPhone: string,
    newPhone: string,
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
      action: 'PHONE_CHANGE_REQUESTED',
      userId,
      oldPhone,
      newPhone,
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
}
