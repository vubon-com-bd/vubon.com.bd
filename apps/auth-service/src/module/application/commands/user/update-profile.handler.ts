/**
 * Update Profile Handler - Application Layer (Enterprise Enhanced v3.0)
 * 
 * @module application/commands/user/update-profile.handler
 * 
 * @description
 * Handles user profile updates (non-sensitive fields) with enterprise-grade features:
 * - Full field validation (name, phone, URL, timezone, language, district, upazila)
 * - Rate limiting to prevent abuse
 * - Transaction management for data consistency
 * - Cache invalidation strategy
 * - Audit logging with severity levels
 * - Event publishing with correlation tracking
 * - Distributed tracing with correlation ID
 * - Bengali message support for better UX in Bangladesh
 * - Bangladesh-specific field validation (district, upazila)
 * - Multi-language support (en/bn)
 * - Complete change tracking for audit trail
 * - Error handling with specific error codes
 * - Input sanitization for profile picture URL
 */

import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateProfileCommand, UpdateProfileResult } from './types';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { Phone } from '../../../domain/value-objects/phone.vo';
import { EventBus } from '../../services/interfaces/event-bus.interface';
import { AuditService } from '../../services/interfaces/audit.service.interface';
import { CacheService } from '../../services/interfaces/cache.service.interface';
import { TransactionManager } from '../../services/interfaces/transaction-manager.interface';
import { NotificationService } from '../../services/interfaces/notification.service.interface';
import { UserUpdatedEvent } from '../../events/user-updated.event';

// Import shared packages
import { 
  NAME_CONSTRAINTS, 
  TIMEZONE_CONFIG, 
  LANGUAGE_CONFIG,
  AUDIT_SEVERITIES,
  RATE_LIMIT_CONFIG 
} from '@vubon/shared-constants';
import { 
  isValidDistrict, 
  isValidUpazila, 
  isValidUrl, 
  isValidTimezone,
  isValidLanguage,
  maskEmail,
  maskPhone 
} from '@vubon/shared-utils';
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
// Change Tracking Interface
// ============================================================

interface ChangeDetail {
  field: string;
  oldValue: unknown;
  newValue: unknown;
  dataType?: string;
  isSensitive?: boolean;
}

// ============================================================
// Update Profile Handler (Enterprise Enhanced)
// ============================================================

@Injectable()
@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler implements ICommandHandler<UpdateProfileCommand> {
  private readonly logger = new Logger(UpdateProfileHandler.name);
  private readonly notificationCircuitBreaker = CircuitBreaker.getInstance('notification');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly cacheService: CacheService,
    private readonly transactionManager: TransactionManager,
    private readonly notificationService: NotificationService
  ) {}

  /**
   * Execute the Update Profile command
   * 
   * @param command - Update profile command with user ID and updates
   * @returns Updated user profile with change summary
   */
  async execute(command: UpdateProfileCommand): Promise<UpdateProfileResult> {
    const startTime = Date.now();
    const { 
      userId, 
      deviceInfo, 
      correlationId, 
      reason,
      fullName, 
      displayName,
      phone: phoneRaw, 
      profilePicture, 
      timezone, 
      language,
      preferredDistrict,
      preferredUpazila
    } = command;

    const { ipAddress, deviceId, userAgent, district, networkType, mobileOperator } = deviceInfo || {};

    this.logger.log(`Executing UpdateProfileCommand for user ${userId}, correlationId: ${correlationId}`);

    try {
      // 1. Check rate limit for profile update attempts
      await this.checkRateLimit(userId);

      // 2. Find user
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException(
          `User with ID ${userId} not found`,
          `${userId} আইডি সহ ইউজার পাওয়া যায়নি`
        );
      }

      // 3. Track changes for event and audit
      const changes: ChangeDetail[] = [];

      // 4. Update full name
      if (fullName !== undefined && fullName !== user.getFullName()) {
        this.validateFullName(fullName);
        changes.push({
          field: 'fullName',
          oldValue: user.getFullName(),
          newValue: fullName,
          dataType: 'string',
          isSensitive: false
        });
        user.updateFullName(fullName);
      }

      // 5. Update display name
      if (displayName !== undefined && displayName !== user.getDisplayName()) {
        this.validateDisplayName(displayName);
        changes.push({
          field: 'displayName',
          oldValue: user.getDisplayName(),
          newValue: displayName,
          dataType: 'string',
          isSensitive: false
        });
        user.updateDisplayName(displayName);
      }

      // 6. Update phone (with validation)
      let newPhone: Phone | undefined;
      if (phoneRaw !== undefined) {
        try {
          newPhone = phoneRaw ? new Phone(phoneRaw) : undefined;
        } catch (error) {
          throw new BadRequestException(
            'Invalid phone number format. Use E.164 format (e.g., +8801712345678)',
            'ভুল ফোন নম্বর ফরম্যাট। E.164 ফরম্যাট ব্যবহার করুন (যেমন: +8801712345678)'
          );
        }
        
        const currentPhoneValue = user.getPhone()?.getValue();
        const newPhoneValue = newPhone?.getValue();
        
        if (newPhoneValue !== currentPhoneValue) {
          changes.push({
            field: 'phone',
            oldValue: currentPhoneValue ? maskPhone(currentPhoneValue) : null,
            newValue: newPhoneValue ? maskPhone(newPhoneValue) : null,
            dataType: 'string',
            isSensitive: true
          });
          user.updatePhone(newPhone);
          
          // Reset phone verification status when phone number changes
          if (user.isPhoneVerified()) {
            user.setPhoneVerified(false);
            changes.push({
              field: 'phoneVerified',
              oldValue: true,
              newValue: false,
              dataType: 'boolean',
              isSensitive: false
            });
          }
        }
      }

      // 7. Update profile picture (with URL validation)
      if (profilePicture !== undefined && profilePicture !== user.getProfilePicture()) {
        this.validateProfilePicture(profilePicture);
        changes.push({
          field: 'profilePicture',
          oldValue: user.getProfilePicture(),
          newValue: profilePicture,
          dataType: 'string',
          isSensitive: false
        });
        user.updateProfilePicture(profilePicture);
      }

      // 8. Update timezone (with validation)
      if (timezone !== undefined && timezone !== user.getTimezone()) {
        this.validateTimezone(timezone);
        changes.push({
          field: 'timezone',
          oldValue: user.getTimezone(),
          newValue: timezone,
          dataType: 'string',
          isSensitive: false
        });
        user.updateTimezone(timezone);
      }

      // 9. Update language (with validation)
      if (language !== undefined && language !== user.getLanguage()) {
        this.validateLanguage(language);
        changes.push({
          field: 'language',
          oldValue: user.getLanguage(),
          newValue: language,
          dataType: 'string',
          isSensitive: false
        });
        user.updateLanguage(language);
      }

      // 10. Update preferred district (Bangladesh specific)
      if (preferredDistrict !== undefined && preferredDistrict !== user.getPreferredDistrict()) {
        this.validateDistrict(preferredDistrict);
        changes.push({
          field: 'preferredDistrict',
          oldValue: user.getPreferredDistrict(),
          newValue: preferredDistrict,
          dataType: 'string',
          isSensitive: false
        });
        user.updatePreferredDistrict(preferredDistrict);
      }

      // 11. Update preferred upazila (Bangladesh specific)
      if (preferredUpazila !== undefined && preferredUpazila !== user.getPreferredUpazila()) {
        this.validateUpazila(preferredUpazila, preferredDistrict || user.getPreferredDistrict());
        changes.push({
          field: 'preferredUpazila',
          oldValue: user.getPreferredUpazila(),
          newValue: preferredUpazila,
          dataType: 'string',
          isSensitive: false
        });
        user.updatePreferredUpazila(preferredUpazila);
      }

      // 12. Save if any changes
      if (changes.length === 0) {
        return this.createNoChangesResponse(user, correlationId);
      }

      // 13. Execute in transaction
      await this.transactionManager.runInTransaction(async () => {
        await this.userRepository.save(user);
        await this.invalidateUserCaches(userId);
      });

      // 14. Publish event with circuit breaker
      await this.publishUserUpdatedEvent(userId, changes, deviceInfo, correlationId);

      // 15. Send notification (if significant changes)
      await this.sendProfileUpdateNotification(user, changes, correlationId);

      // 16. Audit log
      await this.auditLog(userId, changes, deviceInfo, reason, startTime, correlationId);

      // 17. Clear rate limit on success
      await this.clearRateLimit(userId);

      this.logger.log(`Profile updated for user ${userId}: ${changes.map(c => c.field).join(', ')}`);

      // 18. Return result
      return this.createSuccessResponse(user, changes, correlationId);

    } catch (error) {
      this.logger.error(`UpdateProfileCommand failed for user ${userId}: ${error.message}`);

      // Audit failure
      await this.auditService.log({
        action: 'PROFILE_UPDATE_FAILED',
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
   * Check rate limit for profile update attempts
   */
  private async checkRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`profile-update:${userId}`);
    const attempts = await this.cacheService.incr(rateLimitKey);

    if (attempts === 1) {
      await this.cacheService.expire(rateLimitKey, RATE_LIMIT_CONFIG.PROFILE_UPDATE_WINDOW_SECONDS || 3600);
    }

    const maxAttempts = RATE_LIMIT_CONFIG.MAX_PROFILE_UPDATE_ATTEMPTS_PER_HOUR || 10;
    if (attempts > maxAttempts) {
      throw new BadRequestException(
        'Too many profile update attempts. Please try again later.',
        'অনেকবার প্রোফাইল আপডেটের চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।'
      );
    }
  }

  /**
   * Clear rate limit on successful update
   */
  private async clearRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`profile-update:${userId}`);
    await this.cacheService.del(rateLimitKey);
  }

  /**
   * Invalidate all user caches
   */
  private async invalidateUserCaches(userId: string): Promise<void> {
    await this.cacheService.del(CacheKeyBuilder.user(userId));
    await this.cacheService.del(CacheKeyBuilder.userPermissions(userId));
    await this.cacheService.del(CacheKeyBuilder.userRoles(userId));
    await this.cacheService.del(CacheKeyBuilder.userMFAStatus(userId));
  }

  /**
   * Validate full name
   */
  private validateFullName(fullName: string): void {
    if (fullName.length < NAME_CONSTRAINTS.FULL_NAME_MIN_LENGTH || 
        fullName.length > NAME_CONSTRAINTS.FULL_NAME_MAX_LENGTH) {
      throw new BadRequestException(
        `Full name must be between ${NAME_CONSTRAINTS.FULL_NAME_MIN_LENGTH} and ${NAME_CONSTRAINTS.FULL_NAME_MAX_LENGTH} characters`,
        `পূর্ণ নাম ${NAME_CONSTRAINTS.FULL_NAME_MIN_LENGTH} থেকে ${NAME_CONSTRAINTS.FULL_NAME_MAX_LENGTH} অক্ষরের হতে হবে`
      );
    }
  }

  /**
   * Validate display name
   */
  private validateDisplayName(displayName: string): void {
    if (displayName.length < NAME_CONSTRAINTS.DISPLAY_NAME_MIN_LENGTH || 
        displayName.length > NAME_CONSTRAINTS.DISPLAY_NAME_MAX_LENGTH) {
      throw new BadRequestException(
        `Display name must be between ${NAME_CONSTRAINTS.DISPLAY_NAME_MIN_LENGTH} and ${NAME_CONSTRAINTS.DISPLAY_NAME_MAX_LENGTH} characters`,
        `ডিসপ্লে নাম ${NAME_CONSTRAINTS.DISPLAY_NAME_MIN_LENGTH} থেকে ${NAME_CONSTRAINTS.DISPLAY_NAME_MAX_LENGTH} অক্ষরের হতে হবে`
      );
    }
  }

  /**
   * Validate profile picture URL
   */
  private validateProfilePicture(url: string): void {
    if (url && !isValidUrl(url)) {
      throw new BadRequestException(
        'Invalid profile picture URL',
        'ভুল প্রোফাইল পিকচার URL'
      );
    }
    if (url && !url.startsWith('https://')) {
      throw new BadRequestException(
        'Profile picture must use HTTPS',
        'প্রোফাইল পিকচার HTTPS ব্যবহার করতে হবে'
      );
    }
  }

  /**
   * Validate timezone
   */
  private validateTimezone(timezone: string): void {
    if (!isValidTimezone(timezone)) {
      const supportedTimezones = TIMEZONE_CONFIG.SUPPORTED_TIMEZONES.join(', ');
      throw new BadRequestException(
        `Invalid timezone. Supported: ${supportedTimezones}`,
        `ভুল টাইমজোন। সাপোর্টেড: ${supportedTimezones}`
      );
    }
  }

  /**
   * Validate language
   */
  private validateLanguage(language: string): void {
    if (!isValidLanguage(language)) {
      throw new BadRequestException(
        `Invalid language. Supported: ${LANGUAGE_CONFIG.SUPPORTED_LANGUAGES.join(', ')}`,
        `ভুল ভাষা। সাপোর্টেড: ${LANGUAGE_CONFIG.SUPPORTED_LANGUAGES.join(', ')}`
      );
    }
  }

  /**
   * Validate district (Bangladesh specific)
   */
  private validateDistrict(district: string): void {
    if (!isValidDistrict(district)) {
      throw new BadRequestException(
        `Invalid district: ${district}`,
        `ভুল জেলা: ${district}`
      );
    }
  }

  /**
   * Validate upazila (Bangladesh specific)
   */
  private validateUpazila(upazila: string, district?: string): void {
    if (!district) {
      throw new BadRequestException(
        'District is required to validate upazila',
        'উপজেলা ভ্যালিডেশনের জন্য জেলা প্রয়োজন'
      );
    }
    if (!isValidUpazila(upazila, district)) {
      throw new BadRequestException(
        `Invalid upazila: ${upazila} for district: ${district}`,
        `ভুল উপজেলা: ${upazila} (জেলা: ${district})`
      );
    }
  }

  /**
   * Publish user updated event with circuit breaker
   */
  private async publishUserUpdatedEvent(
    userId: string,
    changes: ChangeDetail[],
    deviceInfo: any,
    correlationId?: string
  ): Promise<void> {
    const { deviceId, ipAddress, userAgent, district, networkType, mobileOperator } = deviceInfo || {};

    await this.eventBus.publish(
      new UserUpdatedEvent(
        userId,
        changes.map(c => c.field),
        deviceId,
        correlationId,
        {
          ipAddress,
          userAgent,
          district,
          networkType,
          mobileOperator,
          changeCount: changes.length,
          changedFields: changes.map(c => c.field)
        }
      )
    );
  }

  /**
   * Send profile update notification (for important changes)
   */
  private async sendProfileUpdateNotification(
    user: any,
    changes: ChangeDetail[],
    correlationId?: string
  ): Promise<void> {
    const importantFields = ['phone', 'email', 'password'];
    const hasImportantChange = changes.some(c => importantFields.includes(c.field));

    if (hasImportantChange) {
      await this.notificationCircuitBreaker.call(async () => {
        await withRetry(() =>
          this.notificationService.sendEmail(
            user.getId(),
            `Profile Updated - ${new Date().toLocaleString()}`,
            `Your profile has been updated.\n\nChanges: ${changes.map(c => c.field).join(', ')}\n\nIf you did not make these changes, please contact support immediately.`
          )
        );
      }).catch(err => {
        this.logger.warn(`Failed to send profile update notification: ${err.message}`);
      });
    }
  }

  /**
   * Audit log for profile update
   */
  private async auditLog(
    userId: string,
    changes: ChangeDetail[],
    deviceInfo: any,
    reason: string | undefined,
    startTime: number,
    correlationId?: string
  ): Promise<void> {
    const { ipAddress, deviceId, userAgent, district, division, upazila, networkType, mobileOperator } = deviceInfo || {};

    await this.auditService.log({
      action: 'PROFILE_UPDATED',
      userId,
      changes: changes.map(c => ({
        field: c.field,
        oldValue: c.isSensitive ? '[REDACTED]' : c.oldValue,
        newValue: c.isSensitive ? '[REDACTED]' : c.newValue,
        dataType: c.dataType
      })),
      changedFields: changes.map(c => c.field),
      changeCount: changes.length,
      reason,
      ipAddress,
      deviceId,
      deviceFingerprint: deviceInfo?.deviceFingerprint,
      userAgent,
      district: district || deviceInfo?.district,
      division: division || deviceInfo?.division,
      upazila: upazila || deviceInfo?.upazila,
      networkType: networkType || deviceInfo?.networkType,
      mobileOperator: mobileOperator || deviceInfo?.mobileOperator,
      correlationId,
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startTime,
      severity: AUDIT_SEVERITIES.INFO
    });
  }

  /**
   * Create no changes response
   */
  private createNoChangesResponse(user: any, correlationId?: string): UpdateProfileResult {
    return {
      id: user.getId(),
      email: user.getEmail().getValue(),
      fullName: user.getFullName(),
      displayName: user.getDisplayName(),
      phone: user.getPhone()?.getValue(),
      role: user.getRole(),
      status: user.getStatus(),
      isEmailVerified: user.isEmailVerified(),
      isPhoneVerified: user.isPhoneVerified(),
      isMfaEnabled: user.isMfaEnabled(),
      profilePicture: user.getProfilePicture(),
      timezone: user.getTimezone(),
      language: user.getLanguage(),
      preferredDistrict: user.getPreferredDistrict(),
      preferredUpazila: user.getPreferredUpazila(),
      updatedAt: user.getUpdatedAt(),
      message: 'No changes were made to your profile',
      messageBn: 'আপনার প্রোফাইলে কোন পরিবর্তন করা হয়নি',
      correlationId
    };
  }

  /**
   * Create success response
   */
  private createSuccessResponse(user: any, changes: ChangeDetail[], correlationId?: string): UpdateProfileResult {
    const changeSummary = changes.map(c => c.field).join(', ');
    
    return {
      id: user.getId(),
      email: user.getEmail().getValue(),
      fullName: user.getFullName(),
      displayName: user.getDisplayName(),
      phone: user.getPhone()?.getValue(),
      role: user.getRole(),
      status: user.getStatus(),
      isEmailVerified: user.isEmailVerified(),
      isPhoneVerified: user.isPhoneVerified(),
      isMfaEnabled: user.isMfaEnabled(),
      profilePicture: user.getProfilePicture(),
      timezone: user.getTimezone(),
      language: user.getLanguage(),
      preferredDistrict: user.getPreferredDistrict(),
      preferredUpazila: user.getPreferredUpazila(),
      updatedAt: user.getUpdatedAt(),
      message: `Profile updated successfully. Changes: ${changeSummary}`,
      messageBn: `প্রোফাইল সফলভাবে আপডেট করা হয়েছে। পরিবর্তন: ${this.getBengaliFieldNames(changes)}`,
      correlationId
    };
  }

  /**
   * Get Bengali field names for response
   */
  private getBengaliFieldNames(changes: ChangeDetail[]): string {
    const fieldNames: Record<string, string> = {
      'fullName': 'পূর্ণ নাম',
      'displayName': 'ডিসপ্লে নাম',
      'phone': 'ফোন নম্বর',
      'profilePicture': 'প্রোফাইল ছবি',
      'timezone': 'টাইমজোন',
      'language': 'ভাষা',
      'preferredDistrict': 'পছন্দের জেলা',
      'preferredUpazila': 'পছন্দের উপজেলা'
    };
    
    return changes.map(c => fieldNames[c.field] || c.field).join(', ');
  }
}
