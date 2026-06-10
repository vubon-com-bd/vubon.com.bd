/**
 * Update Email Handler - Application Layer (Enterprise Enhanced v4.0)

 * @module application/commands/user/update-email.handler

 * @description
 * Handles user email update with enterprise-grade security features:
 * - Password verification required
 * - Email uniqueness check
 * - Verification email sent before change
 * - Rate limiting with atomic counters
 * - Cooldown period between changes
 * - Transaction management for data consistency
 * - Secure token generation with HMAC signature
 * - Cache invalidation strategy
 * - Event publishing with correlation tracking
 * - Email notifications (verification + security alert)
 * - Distributed tracing with correlation ID
 * - Bengali message support for better UX in Bangladesh
 * - Bangladesh-specific fields (district, networkType, mobileOperator)
 * - Complete audit logging with severity levels
 * - Pending change expiry check
 */

import { Injectable, UnauthorizedException, ConflictException, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as crypto from 'crypto';

import { UpdateEmailCommand, UpdateEmailResult } from './types';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { Email } from '../../../domain/value-objects/email.vo';
import { PasswordHasher } from '../../services/interfaces/password-hasher.interface';
import { EventBus } from '../../services/interfaces/event-bus.interface';
import { NotificationService } from '../../services/interfaces/notification.service.interface';
import { CacheService } from '../../services/interfaces/cache.service.interface';
import { TransactionManager } from '../../services/interfaces/transaction-manager.interface';
import { AuditService } from '../../services/interfaces/audit.service.interface';
import { EmailChangeRequestedEvent } from '../../events/email-change-requested.event';
import { CacheKeyBuilder } from '../../services/interfaces/cache.service.interface';

// Import shared packages
import { 
  RATE_LIMIT_CONFIG, 
  AUDIT_SEVERITIES,
  ENV_CONFIG
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
// Constants
// ============================================================

const EMAIL_CHANGE_COOLDOWN_HOURS = 24;
const VERIFICATION_TOKEN_EXPIRY_HOURS = 24;
const MAX_REQUESTS_PER_DAY = 3;
const EMAIL_VERIFICATION_SECRET = process.env.EMAIL_VERIFICATION_SECRET || 'vubon-email-verification-secret-v1';

// ============================================================
// Update Email Handler (Enterprise Enhanced v4.0)
// ============================================================

@Injectable()
@CommandHandler(UpdateEmailCommand)
export class UpdateEmailHandler implements ICommandHandler<UpdateEmailCommand> {
  private readonly logger = new Logger(UpdateEmailHandler.name);
  private readonly notificationCircuitBreaker = CircuitBreaker.getInstance('email-notification');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly eventBus: EventBus,
    private readonly notificationService: NotificationService,
    private readonly cacheService: CacheService,
    private readonly transactionManager: TransactionManager,
    private readonly auditService: AuditService
  ) {}

  /**
   * Execute the Update Email command
   */
  async execute(command: UpdateEmailCommand): Promise<UpdateEmailResult> {
    const startTime = Date.now();
    const { userId, newEmail: newEmailRaw, currentPassword, deviceInfo, correlationId } = command;
    const { deviceId, ipAddress, userAgent, deviceFingerprint, district, networkType, mobileOperator, division, upazila } = deviceInfo || {};

    this.logger.log(`Executing UpdateEmailCommand for user ${userId}, correlationId: ${correlationId}`);

    try {
      // 1. Rate limiting check (atomic increment)
      await this.checkRateLimit(userId);

      // 2. Cooldown check (prevent frequent changes)
      await this.checkCooldown(userId);

      // 3. Find user
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException(
          `User with ID ${userId} not found`,
          `${userId} আইডি সহ ইউজার পাওয়া যায়নি`
        );
      }

      // 4. Verify current password
      const isValid = await this.passwordHasher.compare(currentPassword, user.getPasswordHash());
      if (!isValid) {
        await this.trackFailedAttempt(userId, deviceInfo, correlationId);
        throw new UnauthorizedException(
          'Current password is incorrect',
          'বর্তমান পাসওয়ার্ড ভুল'
        );
      }

      // 5. Validate new email format
      let newEmail: Email;
      try {
        newEmail = new Email(newEmailRaw);
      } catch (error) {
        throw new BadRequestException(
          'Invalid email format',
          'ভুল ইমেইল ফরম্যাট'
        );
      }

      // 6. Check if email is already taken
      const existingUser = await this.userRepository.findByEmail(newEmail);
      if (existingUser && existingUser.getId() !== userId) {
        throw new ConflictException(
          'Email is already taken',
          'ইমেইলটি ইতিমধ্যে ব্যবহৃত হচ্ছে'
        );
      }

      // 7. Check if same as current email
      if (newEmail.equals(user.getEmail())) {
        throw new BadRequestException(
          'New email is the same as current email',
          'নতুন ইমেইল বর্তমান ইমেইলের মতোই'
        );
      }

      // 8. Check if there's a pending change (with expiry check)
      await this.checkPendingChange(userId);

      // 9. Generate secure verification token
      const verificationToken = this.generateSecureToken(userId, newEmailRaw);

      const currentEmail = user.getEmail().getValue();
      const maskedNewEmail = this.maskEmail(newEmailRaw);
      const maskedCurrentEmail = this.maskEmail(currentEmail);

      // 10. Execute in transaction
      await this.transactionManager.runInTransaction(async () => {
        // Store pending email in cache
        await this.cacheService.set(
          CacheKeyBuilder.emailChange(userId),
          {
            newEmail: newEmailRaw,
            token: verificationToken,
            oldEmail: currentEmail,
            createdAt: new Date().toISOString(),
            deviceId,
            ipAddress,
            userAgent,
            deviceFingerprint
          },
          VERIFICATION_TOKEN_EXPIRY_HOURS * 60 * 60
        );

        // Increment request count
        await this.incrementRequestCount(userId);

        // Update last email change time (for cooldown)
        await this.cacheService.set(
          CacheKeyBuilder.lastEmailChange(userId),
          Date.now().toString(),
          EMAIL_CHANGE_COOLDOWN_HOURS * 60 * 60
        );
      });

      // 11. Publish event
      await this.eventBus.publish(
        new EmailChangeRequestedEvent(
          userId,
          currentEmail,
          newEmailRaw,
          correlationId,
          ipAddress,
          deviceId,
          {
            district,
            networkType,
            mobileOperator
          }
        )
      );

      // 12. Send verification email to new address (with circuit breaker)
      await this.sendVerificationEmail(newEmailRaw, verificationToken, user.getFullName(), correlationId);

      // 13. Send security notification to old email (with circuit breaker)
      await this.sendSecurityAlert(currentEmail, newEmailRaw, user.getFullName(), ipAddress, deviceId, correlationId);

      // 14. Audit log (with Bangladesh-specific fields)
      await this.auditLog(
        userId,
        maskedCurrentEmail,
        maskedNewEmail,
        deviceInfo,
        startTime,
        correlationId
      );

      // 15. Clear rate limit on success
      await this.clearRateLimit(userId);

      this.logger.log(`Email change requested for user ${userId} from ${maskedCurrentEmail} to ${maskedNewEmail}`);

      // 16. Return result with Bengali message
      return {
        success: true,
        message: `Verification email sent to ${maskedNewEmail}. Please verify to complete email change. The link expires in ${VERIFICATION_TOKEN_EXPIRY_HOURS} hours.`,
        messageBn: `${maskedNewEmail} এ ভেরিফিকেশন ইমেইল পাঠানো হয়েছে। অনুগ্রহ করে ভেরিফাই করুন। এই লিংকটি ${VERIFICATION_TOKEN_EXPIRY_HOURS} ঘন্টায় মেয়াদোত্তীর্ণ হবে।`,
        requiresVerification: true,
        maskedEmail: maskedNewEmail,
        sessionId: undefined,
        expiresInSeconds: VERIFICATION_TOKEN_EXPIRY_HOURS * 60 * 60,
        resendCooldownSeconds: 60,
        remainingAttempts: this.getRemainingAttempts(await this.getRequestCount(userId)),
        correlationId
      };

    } catch (error) {
      this.logger.error(`UpdateEmailCommand failed for user ${userId}: ${error.message}`);

      // Audit failure
      await this.auditService.log({
        action: 'EMAIL_CHANGE_FAILED',
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
   * Check rate limit for email change attempts (atomic increment)
   */
  private async checkRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`email-change:${userId}`);
    const attempts = await this.cacheService.incr(rateLimitKey);

    if (attempts === 1) {
      await this.cacheService.expire(rateLimitKey, RATE_LIMIT_CONFIG?.EMAIL_CHANGE_WINDOW_SECONDS || 86400);
    }

    const maxAttempts = RATE_LIMIT_CONFIG?.MAX_EMAIL_CHANGE_ATTEMPTS_PER_DAY || MAX_REQUESTS_PER_DAY;
    if (attempts > maxAttempts) {
      throw new BadRequestException(
        `You have exceeded the maximum of ${maxAttempts} email change requests per day. Please try again tomorrow.`,
        `আপনি প্রতিদিন সর্বোচ্চ ${maxAttempts} বার ইমেইল পরিবর্তনের অনুরোধ করতে পারেন। আগামীকাল আবার চেষ্টা করুন।`
      );
    }
  }

  /**
   * Clear rate limit on successful email change (when verification is complete)
   */
  private async clearRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`email-change:${userId}`);
    await this.cacheService.del(rateLimitKey);
  }

  /**
   * Check cooldown period between email changes
   */
  private async checkCooldown(userId: string): Promise<void> {
    const lastChangeKey = CacheKeyBuilder.lastEmailChange(userId);
    const lastChangeStr = await this.cacheService.get(lastChangeKey);

    if (lastChangeStr) {
      const lastChange = parseInt(lastChangeStr, 10);
      const hoursSinceLastChange = (Date.now() - lastChange) / (1000 * 60 * 60);
      
      if (hoursSinceLastChange < EMAIL_CHANGE_COOLDOWN_HOURS) {
        const remainingHours = Math.ceil(EMAIL_CHANGE_COOLDOWN_HOURS - hoursSinceLastChange);
        throw new BadRequestException(
          `Please wait ${remainingHours} hour(s) before changing your email again.`,
          `ইমেইল পরিবর্তনের জন্য অনুগ্রহ করে ${remainingHours} ঘন্টা অপেক্ষা করুন।`
        );
      }
    }
  }

  /**
   * Check if there's a pending email change (with expiry check)
   */
  private async checkPendingChange(userId: string): Promise<void> {
    const pendingKey = CacheKeyBuilder.emailChange(userId);
    const pendingChange = await this.cacheService.get<{
      newEmail: string;
      token: string;
      oldEmail: string;
      createdAt: string;
    }>(pendingKey);

    if (pendingChange) {
      const createdAt = new Date(pendingChange.createdAt);
      const expiresAt = new Date(createdAt.getTime() + VERIFICATION_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
      
      if (expiresAt > new Date()) {
        throw new BadRequestException(
          'An email change is already pending. Please check your email for verification link.',
          'ইমেইল পরিবর্তনের একটি অনুরোধ ইতিমধ্যে পেন্ডিং আছে। অনুগ্রহ করে আপনার ইমেইল চেক করুন।'
        );
      }
      // If expired, delete the pending change
      await this.cacheService.del(pendingKey);
    }
  }

  /**
   * Track failed email change attempt
   */
  private async trackFailedAttempt(userId: string, deviceInfo: any, correlationId?: string): Promise<void> {
    const failKey = CacheKeyBuilder.failedAttempts(`email-change:${userId}`);
    const failCount = await this.cacheService.incr(failKey);
    if (failCount === 1) {
      await this.cacheService.expire(failKey, 3600);
    }

    await this.auditService.log({
      action: 'EMAIL_CHANGE_FAILED',
      userId,
      failCount,
      reason: 'Invalid password',
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      deviceFingerprint: deviceInfo?.deviceFingerprint,
      correlationId,
      timestamp: new Date().toISOString(),
      severity: AUDIT_SEVERITIES.WARNING
    });
  }

  /**
   * Generate secure verification token with HMAC signature
   */
  private generateSecureToken(userId: string, email: string): string {
    const timestamp = Date.now();
    const payload = `${userId}:${email}:${timestamp}`;
    const signature = crypto
      .createHmac('sha256', EMAIL_VERIFICATION_SECRET)
      .update(payload)
      .digest('hex')
      .substring(0, 32);
    
    // Combine payload and signature, then encode
    const tokenData = `${payload}:${signature}`;
    return Buffer.from(tokenData).toString('base64url');
  }

  /**
   * Verify token (for the verification endpoint)
   */
  public verifyToken(token: string): { userId: string; email: string; timestamp: number; isValid: boolean } | null {
    try {
      const decoded = Buffer.from(token, 'base64url').toString();
      const parts = decoded.split(':');
      if (parts.length !== 4) return null;
      
      const [userId, email, timestampStr, signature] = parts;
      const timestamp = parseInt(timestampStr, 10);
      
      // Check if token is expired (24 hours)
      if (Date.now() - timestamp > VERIFICATION_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000) {
        return { userId: userId || '', email: email || '', timestamp, isValid: false };
      }
      
      // Verify signature
      const payload = `${userId}:${email}:${timestamp}`;
      const expectedSignature = crypto
        .createHmac('sha256', EMAIL_VERIFICATION_SECRET)
        .update(payload)
        .digest('hex')
        .substring(0, 32);
      
      if (signature !== expectedSignature) {
        return { userId: userId || '', email: email || '', timestamp, isValid: false };
      }
      
      return { userId: userId || '', email: email || '', timestamp, isValid: true };
    } catch {
      return null;
    }
  }

  /**
   * Get request count for rate limiting
   */
  private async getRequestCount(userId: string): Promise<number> {
    const key = CacheKeyBuilder.rateLimit(`email-change:${userId}`);
    const count = await this.cacheService.get<number>(key);
    return count || 0;
  }

  /**
   * Increment request count atomically
   */
  private async incrementRequestCount(userId: string): Promise<void> {
    const key = CacheKeyBuilder.rateLimit(`email-change:${userId}`);
    // Already incremented in checkRateLimit, so this is just for tracking
    // The actual increment is done in checkRateLimit
  }

  /**
   * Get remaining attempts for response
   */
  private getRemainingAttempts(currentCount: number): number {
    const maxAttempts = RATE_LIMIT_CONFIG?.MAX_EMAIL_CHANGE_ATTEMPTS_PER_DAY || MAX_REQUESTS_PER_DAY;
    return Math.max(0, maxAttempts - currentCount);
  }

  /**
   * Send verification email with circuit breaker
   */
  private async sendVerificationEmail(
    email: string,
    token: string,
    fullName: string,
    correlationId?: string
  ): Promise<void> {
    await this.notificationCircuitBreaker.call(async () => {
      await withRetry(() =>
        this.notificationService.sendEmailChangeVerification(
          email,
          token,
          fullName,
          correlationId
        )
      );
    }).catch(err => {
      this.logger.warn(`Failed to send verification email to ${this.maskEmail(email)}: ${err.message}`);
    });
  }

  /**
   * Send security alert to old email with circuit breaker
   */
  private async sendSecurityAlert(
    oldEmail: string,
    newEmail: string,
    fullName: string,
    ipAddress?: string,
    deviceId?: string,
    correlationId?: string
  ): Promise<void> {
    await this.notificationCircuitBreaker.call(async () => {
      await withRetry(() =>
        this.notificationService.sendEmailChangeAlert(
          oldEmail,
          newEmail,
          fullName,
          ipAddress,
          deviceId,
          correlationId
        )
      );
    }).catch(err => {
      this.logger.warn(`Failed to send security alert to ${this.maskEmail(oldEmail)}: ${err.message}`);
    });
  }

  /**
   * Mask email for privacy (uses shared-utils)
   */
  private maskEmail(email: string): string {
    return maskEmailUtil(email);
  }

  /**
   * Invalidate user cache after email change completion
   * (to be called from verify-email-change handler)
   */
  public async invalidateEmailCache(userId: string, oldEmail: string, newEmail: string): Promise<void> {
    await this.cacheService.del(CacheKeyBuilder.user(userId));
    await this.cacheService.del(CacheKeyBuilder.userByEmail(oldEmail));
    await this.cacheService.del(CacheKeyBuilder.userByEmail(newEmail));
    await this.cacheService.del(CacheKeyBuilder.userPermissions(userId));
    await this.cacheService.del(CacheKeyBuilder.userSessions(userId));
  }

  /**
   * Delete pending email change after verification
   */
  public async deletePendingChange(userId: string): Promise<void> {
    await this.cacheService.del(CacheKeyBuilder.emailChange(userId));
    await this.cacheService.del(CacheKeyBuilder.lastEmailChange(userId));
  }

  /**
   * Audit log for email change request
   */
  private async auditLog(
    userId: string,
    oldEmail: string,
    newEmail: string,
    deviceInfo: any,
    startTime: number,
    correlationId?: string
  ): Promise<void> {
    const { ipAddress, deviceId, userAgent, deviceFingerprint, district, division, upazila, networkType, mobileOperator } = deviceInfo || {};

    await this.auditService.log({
      action: 'EMAIL_CHANGE_REQUESTED',
      userId,
      oldEmail,
      newEmail,
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
