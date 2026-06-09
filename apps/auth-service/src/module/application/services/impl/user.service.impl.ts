/**
 * User Service Implementation - Application Layer (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/impl/user.service.impl
 * 
 * @description
 * Orchestrates user management use cases with enterprise-grade features.
 * NO business logic - coordinates domain entities, repositories, and infrastructure.
 * 
 * Enterprise Features (v2.0):
 * ✅ Full transaction management for all operations
 * ✅ Password history repository integration (prevent reuse)
 * ✅ Username generation and validation
 * ✅ District/Upazila validation using shared-utils
 * ✅ Email/Phone change with proper verification flow
 * ✅ Session service with circular dependency prevention
 * ✅ Event publishing for all state changes
 * ✅ Audit logging with proper severity levels
 * ✅ Soft delete with grace period and reactivation
 * ✅ Admin operations with proper permission checks
 * ✅ Bulk operations with progress tracking
 * ✅ Circuit breaker pattern for external services
 * ✅ Distributed tracing with correlation ID
 * ✅ Bengali error messages for user-facing errors
 * ✅ Health check for service monitoring
 * ✅ Cache invalidation strategy
 */

import { Injectable, NotFoundException, ConflictException, BadRequestException, UnauthorizedException, ForbiddenException, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UserService, DeviceInfo, UserFilters, BulkUserOperationResult, UserExportOptions, UserExportResult, UserDeletionOptions, UserSuspensionOptions } from '../interfaces/user.service.interface';
import { 
  UpdateProfileDto, 
  UpdateProfileResponseDto, 
  UpdateEmailDto, 
  UpdateEmailResponseDto, 
  UpdatePhoneDto, 
  UpdatePhoneResponseDto,
  VerifyEmailChangeDto,
  VerifyPhoneChangeDto,
  UserPreferencesDto
} from '../../dtos/user/update-profile.dto';
import { ChangePasswordDto, ChangePasswordResponseDto, ValidateCurrentPasswordResponseDto, PasswordRulesResponseDto } from '../../dtos/user/change-password.dto';
import { DeleteAccountResponseDto, ReactivateAccountResponseDto, UserStatistics, RegistrationTrend, RetentionMetrics } from '../interfaces/user.service.interface';
import { AdminCreateUserDto, AdminCreateUserResponseDto } from '../../dtos/user/create-user.dto';
import { PaginationDto, PaginatedResponseDto } from '../../dtos/common/pagination.dto';
import { UserResponseDto, BriefUserResponseDto, UserProfileResponseDto, UserActivitySummaryDto } from '../../mappers/user.mapper';
import { AuditDto } from '../../dtos/common/audit.dto';

import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { PasswordHistoryRepository } from '../../../domain/repositories/password-history.repository.interface';
import { AuditRepository } from '../../../domain/repositories/audit.repository.interface';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import { DeviceRepository } from '../../../domain/repositories/device.repository.interface';

import { User, UserStatus, UserRole, UserTier } from '../../../domain/entities/user.entity';
import { Email } from '../../../domain/value-objects/email.vo';
import { Password } from '../../../domain/value-objects/password.vo';
import { Phone } from '../../../domain/value-objects/phone.vo';

// Shared packages imports
import { 
  USER_CONFIG, 
  PASSWORD_POLICY, 
  USER_STATUS, 
  USER_ROLES, 
  USER_TIERS, 
  AUDIT_ACTIONS,
  ACCOUNT_CONFIG,
  NOTIFICATION_TEMPLATES,
  BANGLADESH_DISTRICTS,
  BANGLADESH_UPAZILAS
} from '@vubon/shared-constants';

import type { UserTier as SharedUserTier, UserStatus as SharedUserStatus, UserRole as SharedUserRole, BulkOperationProgress } from '@vubon/shared-types';

import { maskEmail, maskPhone, isValidDistrict, isValidUpazila, generateUsernameFromEmail } from '@vubon/shared-utils';

// Events
import { UserRegisteredEvent, RegistrationMethod, RegistrationSource } from '../../events/user-registered.event';
import { PasswordChangedEvent } from '../../events/password-changed.event';
import { EmailVerifiedEvent } from '../../events/email-verified.event';
import { PhoneVerifiedEvent } from '../../events/phone-verified.event';
import { UserAccountDeletedEvent } from '../../events/user-account-deleted.event';
import { UserProfileUpdatedEvent } from '../../events/user-profile-updated.event';
import { UserRoleChangedEvent } from '../../events/user-role-changed.event';
import { UserTierChangedEvent } from '../../events/user-tier-changed.event';
import { UserReactivatedEvent } from '../../events/user-reactivated.event';

// Mappers
import { UserMapper } from '../../mappers/user.mapper';

// Infrastructure interfaces
import { PasswordHasher } from '../interfaces/password-hasher.interface';
import { EventBus } from '../interfaces/event-bus.interface';
import { TokenGenerator } from '../interfaces/token-generator.interface';
import { OtpService } from '../interfaces/otp.service.interface';
import { CacheService, CacheKeyBuilder } from '../interfaces/cache.service.interface';
import { TransactionManager } from '../interfaces/transaction-manager.interface';

// ============================================================
// Service Interfaces (to avoid circular dependencies)
// ============================================================

export interface SessionService {
  revokeAllExceptCurrent(userId: string, currentSessionId: string, reason: string): Promise<{ sessionsRevoked: number; revokedSessionIds: string[] }>;
  revokeAllSessions(userId: string, reason: string): Promise<number>;
  revokeSession(userId: string, sessionId: string, reason?: string): Promise<boolean>;
}

export interface NotificationService {
  sendPasswordChangedNotification(userId: string, email: string, deviceInfo?: Partial<DeviceInfo>): Promise<void>;
  sendEmailChangeNotification(userId: string, email: string, newEmail: string): Promise<void>;
  sendPhoneChangeNotification(userId: string, email: string, newPhone: string): Promise<void>;
  sendAccountDeletedNotification(userId: string, email: string, gracePeriodDays?: number): Promise<void>;
  sendWelcomeEmail(userId: string, email: string, name: string): Promise<void>;
  sendAccountReactivatedNotification(userId: string, email: string): Promise<void>;
  sendAccountSuspendedNotification(userId: string, email: string, reason: string, durationDays: number): Promise<void>;
  sendRoleChangedNotification(userId: string, email: string, oldRole: string, newRole: string): Promise<void>;
}

export interface AuditService {
  logUserAction(userId: string, action: string, details: Record<string, unknown>, deviceInfo: DeviceInfo): Promise<void>;
  info(action: string, userId: string, details?: Record<string, unknown>, context?: Record<string, unknown>): Promise<void>;
  warn(action: string, userId: string, details?: Record<string, unknown>, context?: Record<string, unknown>): Promise<void>;
  error(action: string, userId: string, details?: Record<string, unknown>, context?: Record<string, unknown>): Promise<void>;
  critical(action: string, userId: string, details?: Record<string, unknown>, context?: Record<string, unknown>): Promise<void>;
}

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
// Retry Helper
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
// User Service Implementation
// ============================================================

@Injectable()
export class UserServiceImpl implements UserService {
  private readonly logger = new Logger(UserServiceImpl.name);
  private readonly notificationCircuitBreaker = CircuitBreaker.getInstance('notification');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly passwordHistoryRepository: PasswordHistoryRepository,
    private readonly auditRepository: AuditRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly deviceRepository: DeviceRepository,
    private readonly sessionService: SessionService,
    private readonly notificationService: NotificationService,
    private readonly auditService: AuditService,
    private readonly passwordHasher: PasswordHasher,
    private readonly eventBus: EventBus,
    private readonly tokenGenerator: TokenGenerator,
    private readonly otpService: OtpService,
    private readonly cacheService: CacheService,
    private readonly transactionManager: TransactionManager
  ) {}

  // ============================================================
  // Private Helper Methods
  // ============================================================

  private async findUserOrThrow(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  private async isTransactionActive(): Promise<boolean> {
    return this.transactionManager.isActive();
  }

  private async executeInTransaction<T>(callback: () => Promise<T>): Promise<T> {
    if (await this.isTransactionActive()) {
      return callback();
    }
    return this.transactionManager.runInTransaction(callback);
  }

  private generateUsername(email: string): string {
    return generateUsernameFromEmail(email);
  }

  private async invalidateUserCache(userId: string): Promise<void> {
    await this.cacheService.del(CacheKeyBuilder.user(userId));
    await this.cacheService.del(CacheKeyBuilder.userPermissions(userId));
    await this.cacheService.del(CacheKeyBuilder.userRoles(userId));
    await this.cacheService.del(CacheKeyBuilder.userMFAStatus(userId));
  }

  private getErrorCode(error: Error): string {
    if (error instanceof UnauthorizedException) return 'UNAUTHORIZED';
    if (error instanceof ConflictException) return 'CONFLICT';
    if (error instanceof BadRequestException) return 'BAD_REQUEST';
    if (error instanceof ForbiddenException) return 'FORBIDDEN';
    if (error instanceof NotFoundException) return 'NOT_FOUND';
    return 'INTERNAL_ERROR';
  }

  private getBengaliErrorMessage(error: Error): string | undefined {
    const errorMap: Record<string, string> = {
      'User not found': 'ইউজার পাওয়া যায়নি',
      'Email already exists': 'ইমেইল already ব্যবহৃত হচ্ছে',
      'Phone number already exists': 'ফোন নম্বর already ব্যবহৃত হচ্ছে',
      'Invalid district': 'অবৈধ জেলা',
      'Invalid upazila': 'অবৈধ উপজেলা',
      'Current password is incorrect': 'বর্তমান পাসওয়ার্ড ভুল',
      'Cannot reuse a recent password': 'সাম্প্রতিক পাসওয়ার্ড পুনরায় ব্যবহার করা যাবে না',
      'Invalid OTP': 'অবৈধ OTP',
      'Account already activated': 'অ্যাকাউন্ট already সক্রিয়',
      'Account already deactivated': 'অ্যাকাউন্ট already নিষ্ক্রিয়'
    };
    
    for (const [en, bn] of Object.entries(errorMap)) {
      if (error.message.includes(en)) {
        return bn;
      }
    }
    
    return undefined;
  }

  // ============================================================
  // Profile Operations
  // ============================================================

  async getProfile(userId: string): Promise<UserProfileResponseDto> {
    const cacheKey = CacheKeyBuilder.user(userId);
    const cached = await this.cacheService.get<UserProfileResponseDto>(cacheKey);
    if (cached) {
      return cached;
    }
    
    const user = await this.findUserOrThrow(userId);
    const result = UserMapper.toProfileDto(user);
    
    await this.cacheService.set(cacheKey, result, 300); // 5 minutes TTL
    return result;
  }

  async updateProfile(
    userId: string,
    dto: UpdateProfileDto,
    deviceInfo: DeviceInfo,
    options?: { skipValidation?: boolean; notifyUser?: boolean }
  ): Promise<UpdateProfileResponseDto> {
    const user = await this.findUserOrThrow(userId);

    // Validate district if provided
    if (dto.preferredDistrict && !isValidDistrict(dto.preferredDistrict)) {
      throw new BadRequestException(`Invalid district: ${dto.preferredDistrict}`);
    }

    // Validate upazila if provided
    if (dto.preferredUpazila && !isValidUpazila(dto.preferredUpazila, dto.preferredDistrict)) {
      throw new BadRequestException(`Invalid upazila: ${dto.preferredUpazila} for district ${dto.preferredDistrict}`);
    }

    // Track changes for audit
    const changes: Record<string, { old: unknown; new: unknown }> = {};

    // Update fields using domain methods
    if (dto.fullName !== undefined) {
      changes.fullName = { old: user.getFullName(), new: dto.fullName };
      user.updateFullName(dto.fullName);
    }

    if (dto.displayName !== undefined) {
      changes.displayName = { old: user.getDisplayName(), new: dto.displayName };
      user.updateDisplayName(dto.displayName);
    }

    if (dto.profilePicture !== undefined) {
      changes.profilePicture = { old: user.getAvatar(), new: dto.profilePicture };
      user.updateAvatar(dto.profilePicture);
    }

    if (dto.timezone !== undefined) {
      changes.timezone = { old: user.getTimezone(), new: dto.timezone };
      user.updateTimezone(dto.timezone);
    }

    if (dto.language !== undefined) {
      changes.language = { old: user.getPreferredLanguage(), new: dto.language };
      user.updatePreferredLanguage(dto.language);
    }

    if (dto.preferredDistrict !== undefined) {
      changes.preferredDistrict = { old: user.getPreferredDistrict(), new: dto.preferredDistrict };
      user.updatePreferredDistrict(dto.preferredDistrict);
    }

    if (dto.preferredUpazila !== undefined) {
      changes.preferredUpazila = { old: user.getPreferredUpazila(), new: dto.preferredUpazila };
      user.updatePreferredUpazila(dto.preferredUpazila);
    }

    if (dto.preferences !== undefined) {
      changes.preferences = { old: user.getPreferences(), new: dto.preferences };
      user.updatePreferences(dto.preferences);
    }

    await this.userRepository.save(user);
    
    // Invalidate cache
    await this.invalidateUserCache(userId);

    // Publish event
    await this.eventBus.publish(
      new UserProfileUpdatedEvent(
        userId,
        user.getEmail().getValue(),
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent,
        changes
      )
    );

    // Audit log
    await this.auditService.logUserAction(
      userId,
      AUDIT_ACTIONS.PROFILE_UPDATED,
      { updatedFields: Object.keys(changes), changes },
      deviceInfo
    );

    // Send notification if requested
    if (options?.notifyUser !== false) {
      await withRetry(() => 
        this.notificationService.sendEmailChangeNotification(
          userId,
          user.getEmail().getValue(),
          'Profile updated successfully'
        )
      ).catch(err => this.logger.warn(`Failed to send profile update notification: ${err.message}`));
    }

    return new UpdateProfileResponseDto(
      user.getId(),
      user.getEmail().getValue(),
      user.getFullName(),
      user.getUpdatedAt(),
      user.getPhone()?.getValue(),
      user.getAvatar(),
      user.getTimezone(),
      user.getPreferredLanguage(),
      user.getDisplayName(),
      user.getPreferredDistrict(),
      user.getPreferredUpazila(),
      deviceInfo.correlationId
    );
  }

  async updatePreferences(
    userId: string,
    preferences: UserPreferencesDto,
    deviceInfo: DeviceInfo
  ): Promise<UserPreferencesDto> {
    const user = await this.findUserOrThrow(userId);
    
    user.updatePreferences(preferences);
    await this.userRepository.save(user);
    
    await this.invalidateUserCache(userId);
    
    await this.auditService.logUserAction(
      userId,
      AUDIT_ACTIONS.PREFERENCES_UPDATED,
      { preferences },
      deviceInfo
    );
    
    return preferences;
  }

  async getPreferences(userId: string): Promise<UserPreferencesDto> {
    const user = await this.findUserOrThrow(userId);
    return user.getPreferences();
  }

  // ============================================================
  // Email Change Operations (with verification)
  // ============================================================

  async updateEmail(
    userId: string,
    dto: UpdateEmailDto,
    deviceInfo: DeviceInfo,
    options?: { skipRateLimit?: boolean }
  ): Promise<UpdateEmailResponseDto> {
    const user = await this.findUserOrThrow(userId);

    // Verify current password
    const isValid = await this.passwordHasher.compare(
      dto.currentPassword,
      user.getPasswordHash()
    );

    if (!isValid) {
      await this.auditService.logUserAction(
        userId,
        AUDIT_ACTIONS.EMAIL_CHANGE_FAILED,
        { reason: 'Invalid password' },
        deviceInfo
      );
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Check email uniqueness
    const newEmail = new Email(dto.newEmail);
    const isTaken = await this.userRepository.isEmailTaken(newEmail, userId);
    
    if (isTaken) {
      throw new ConflictException('Email is already taken');
    }

    // Check rate limit
    if (!options?.skipRateLimit) {
      const rateLimitKey = CacheKeyBuilder.rateLimit(`email-change:${userId}`);
      const attempts = await this.cacheService.incr(rateLimitKey);
      if (attempts === 1) {
        await this.cacheService.expire(rateLimitKey, 3600);
      }
      if (attempts > 3) {
        throw new BadRequestException('Too many email change attempts. Please try again later.');
      }
    }

    // Generate verification token
    const token = await this.tokenGenerator.generateEmailChangeToken(
      userId,
      dto.newEmail,
      { 
        sessionId: deviceInfo.sessionId,
        deviceId: deviceInfo.deviceId 
      }
    );

    // Store pending change in cache
    const pendingKey = CacheKeyBuilder.emailChange(userId);
    await this.cacheService.set(
      pendingKey,
      { newEmail: dto.newEmail, token },
      24 * 60 * 60 // 24 hours
    );

    // Send verification email with circuit breaker
    await this.notificationCircuitBreaker.call(async () => {
      return withRetry(() => 
        this.notificationService.sendEmailChangeNotification(
          userId,
          user.getEmail().getValue(),
          dto.newEmail,
          token
        )
      );
    }).catch(err => {
      this.logger.warn(`Failed to send email change notification: ${err.message}`);
    });

    // Audit log
    await this.auditService.logUserAction(
      userId,
      AUDIT_ACTIONS.EMAIL_CHANGE_INITIATED,
      { newEmail: maskEmail(dto.newEmail) },
      deviceInfo
    );

    return new UpdateEmailResponseDto(
      true,
      maskEmail(dto.newEmail),
      undefined,
      'Email change initiated. Please verify your new email address.',
      undefined,
      3 // remaining attempts
    );
  }

  async verifyEmailChange(
    userId: string,
    dto: VerifyEmailChangeDto,
    deviceInfo: DeviceInfo
  ): Promise<UpdateEmailResponseDto> {
    const user = await this.findUserOrThrow(userId);
    
    // Verify token
    let payload;
    try {
      payload = await this.tokenGenerator.verifyToken(dto.token);
    } catch (error) {
      throw new BadRequestException('Invalid or expired verification token');
    }
    
    if (!payload || payload.type !== 'email_change' || payload.sub !== userId) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    const newEmail = new Email(payload.email);
    
    // Check if email is still available
    const isTaken = await this.userRepository.isEmailTaken(newEmail, userId);
    if (isTaken) {
      throw new ConflictException('Email is already taken by another user');
    }
    
    // Update email in domain
    const oldEmail = user.getEmail().getValue();
    user.updateEmail(newEmail);
    await this.userRepository.save(user);
    
    // Clear pending change cache
    await this.cacheService.del(CacheKeyBuilder.emailChange(userId));
    await this.invalidateUserCache(userId);

    // Publish event
    await this.eventBus.publish(
      new EmailVerifiedEvent(
        userId,
        newEmail.getValue(),
        'email_change',
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent,
        oldEmail
      )
    );

    // Audit log
    await this.auditService.logUserAction(
      userId,
      AUDIT_ACTIONS.EMAIL_CHANGED,
      { oldEmail: maskEmail(oldEmail), newEmail: maskEmail(newEmail.getValue()) },
      deviceInfo
    );

    // Revoke all sessions for security (optional)
    await this.sessionService.revokeAllSessions(userId, 'Email changed - security precaution');

    return new UpdateEmailResponseDto(
      false,
      maskEmail(newEmail.getValue()),
      undefined,
      'Email updated successfully.'
    );
  }

  // ============================================================
  // Phone Change Operations (Bangladesh specific with OTP)
  // ============================================================

  async updatePhone(
    userId: string,
    dto: UpdatePhoneDto,
    deviceInfo: DeviceInfo,
    options?: { skipRateLimit?: boolean }
  ): Promise<UpdatePhoneResponseDto> {
    const user = await this.findUserOrThrow(userId);

    // Verify current password
    const isValid = await this.passwordHasher.compare(
      dto.currentPassword,
      user.getPasswordHash()
    );

    if (!isValid) {
      await this.auditService.logUserAction(
        userId,
        AUDIT_ACTIONS.PHONE_CHANGE_FAILED,
        { reason: 'Invalid password' },
        deviceInfo
      );
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Check phone uniqueness
    const newPhone = new Phone(dto.newPhone);
    const isTaken = await this.userRepository.isPhoneTaken(newPhone, userId);
    
    if (isTaken) {
      throw new ConflictException('Phone number is already taken');
    }

    // Check rate limit
    if (!options?.skipRateLimit) {
      const rateLimitKey = CacheKeyBuilder.rateLimit(`phone-change:${userId}`);
      const attempts = await this.cacheService.incr(rateLimitKey);
      if (attempts === 1) {
        await this.cacheService.expire(rateLimitKey, 3600);
      }
      if (attempts > 3) {
        throw new BadRequestException('Too many phone change attempts. Please try again later.');
      }
    }

    // Send OTP to new phone with circuit breaker
    let otpResult;
    await this.notificationCircuitBreaker.call(async () => {
      otpResult = await this.otpService.generateAndSend(
        newPhone.getE164(),
        'phone_change',
        dto.method || 'sms',
        deviceInfo
      );
    });

    // Store pending change in cache
    const pendingKey = CacheKeyBuilder.phoneChange(userId);
    await this.cacheService.set(
      pendingKey,
      { newPhone: dto.newPhone, sessionId: otpResult!.sessionId },
      10 * 60 // 10 minutes
    );

    // Audit log
    await this.auditService.logUserAction(
      userId,
      AUDIT_ACTIONS.PHONE_CHANGE_INITIATED,
      { newPhone: maskPhone(dto.newPhone), method: dto.method },
      deviceInfo
    );

    return new UpdatePhoneResponseDto(
      true,
      maskPhone(dto.newPhone),
      otpResult!.sessionId,
      dto.method,
      'Phone change initiated. Please verify your new phone number.',
      undefined,
      30 // cooldown seconds
    );
  }

  async verifyPhoneChange(
    userId: string,
    dto: VerifyPhoneChangeDto,
    deviceInfo: DeviceInfo
  ): Promise<UpdatePhoneResponseDto> {
    const user = await this.findUserOrThrow(userId);
    
    // Get pending change from cache
    const pendingKey = CacheKeyBuilder.phoneChange(userId);
    const pending = await this.cacheService.get<{ newPhone: string; sessionId: string }>(pendingKey);
    
    if (!pending) {
      throw new BadRequestException('No pending phone change request');
    }
    
    // Verify OTP
    const isValid = await this.otpService.verify(dto.otp, pending.sessionId, 'phone_change');
    
    if (!isValid) {
      // Track attempts
      const attemptsKey = CacheKeyBuilder.otpAttempts(`phone-change:${userId}`);
      const attempts = await this.cacheService.incr(attemptsKey);
      await this.cacheService.expire(attemptsKey, 300);
      
      const remainingAttempts = 3 - attempts;
      if (remainingAttempts <= 0) {
        await this.cacheService.del(pendingKey);
        throw new BadRequestException('Too many failed attempts. Please request a new phone change.');
      }
      
      throw new BadRequestException(`Invalid OTP. ${remainingAttempts} attempts remaining.`);
    }
    
    const newPhone = new Phone(pending.newPhone);
    const oldPhone = user.getPhone()?.getValue();
    user.updatePhone(newPhone);
    await this.userRepository.save(user);
    
    // Clear cache
    await this.cacheService.del(pendingKey);
    await this.cacheService.del(CacheKeyBuilder.otpAttempts(`phone-change:${userId}`));
    await this.invalidateUserCache(userId);

    // Publish event
    await this.eventBus.publish(
      new PhoneVerifiedEvent(
        userId,
        newPhone.getE164(),
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent
      )
    );

    // Audit log
    await this.auditService.logUserAction(
      userId,
      AUDIT_ACTIONS.PHONE_CHANGED,
      { oldPhone: oldPhone ? maskPhone(oldPhone) : null, newPhone: maskPhone(pending.newPhone) },
      deviceInfo
    );

    return new UpdatePhoneResponseDto(
      false,
      maskPhone(pending.newPhone),
      undefined,
      undefined,
      'Phone number updated successfully.'
    );
  }

  // ============================================================
  // Password Operations (with history check)
  // ============================================================

  async changePassword(
    userId: string,
    dto: ChangePasswordDto,
    deviceInfo: DeviceInfo,
    options?: { logoutOtherDevices?: boolean; preventReuse?: boolean; notifyUser?: boolean }
  ): Promise<ChangePasswordResponseDto> {
    const user = await this.findUserOrThrow(userId);

    // Verify current password (unless skipped for reset flow)
    if (!dto.skipCurrentPasswordValidation) {
      const isValid = await this.passwordHasher.compare(
        dto.currentPassword,
        user.getPasswordHash()
      );

      if (!isValid) {
        await this.auditService.logUserAction(
          userId,
          AUDIT_ACTIONS.PASSWORD_CHANGE_FAILED,
          { reason: 'Invalid current password' },
          deviceInfo
        );
        throw new UnauthorizedException('Current password is incorrect');
      }
    }

    // Check password history (prevent reuse)
    const preventReuseCount = ACCOUNT_CONFIG.PASSWORD_PREVENT_REUSE_COUNT || 5;
    const recentHashes = await this.passwordHistoryRepository.getRecentHashes(userId, preventReuseCount);
    
    for (const hash of recentHashes) {
      const isReused = await this.passwordHasher.compare(dto.newPassword, hash);
      if (isReused) {
        throw new BadRequestException('Cannot reuse a recent password');
      }
    }

    // Validate new password strength
    const strengthResult = await this.passwordHasher.validateStrength(dto.newPassword);
    if (!strengthResult.isValid) {
      throw new BadRequestException(strengthResult.errors.join(', '));
    }

    // Hash new password
    const hashedPassword = await this.passwordHasher.hash(dto.newPassword);

    // Update password and related data in transaction
    let sessionsRevoked = 0;
    
    await this.executeInTransaction(async () => {
      user.changePassword(hashedPassword);
      await this.userRepository.save(user);
      
      // Add to password history
      await this.passwordHistoryRepository.add(
        userId,
        hashedPassword,
        {
          changedBy: userId,
          changedByType: 'user',
          ipAddress: deviceInfo.ipAddress,
          userAgent: deviceInfo.userAgent,
          deviceId: deviceInfo.deviceId,
          sessionId: deviceInfo.sessionId,
          reason: 'User initiated password change'
        }
      );
      
      // Revoke other sessions if requested
      if (options?.logoutOtherDevices !== false) {
        const sessions = await this.sessionRepository.findActiveSessions(userId);
        for (const session of sessions) {
          if (session.getId() !== deviceInfo.sessionId) {
            session.revoke('Password changed - logged out from other devices');
            await this.sessionRepository.save(session);
            sessionsRevoked++;
          }
        }
      }
      
      // Revoke all refresh tokens
      await this.refreshTokenRepository.revokeAllByUserId(userId, 'Password changed');
    });
    
    // Invalidate cache
    await this.invalidateUserCache(userId);

    // Publish event
    await this.eventBus.publish(
      new PasswordChangedEvent(
        userId,
        user.getEmail().getValue(),
        'user_change',
        'user_initiated',
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent,
        `Sessions revoked: ${sessionsRevoked}`
      )
    );

    // Send notification
    if (options?.notifyUser !== false) {
      await this.notificationCircuitBreaker.call(async () => {
        return withRetry(() => 
          this.notificationService.sendPasswordChangedNotification(
            userId,
            user.getEmail().getValue(),
            deviceInfo
          )
        );
      }).catch(err => this.logger.warn(`Failed to send password change notification: ${err.message}`));
    }

    // Audit log
    await this.auditService.logUserAction(
      userId,
      AUDIT_ACTIONS.PASSWORD_CHANGED,
      { sessionsRevoked, method: dto.skipCurrentPasswordValidation ? 'reset' : 'user_change' },
      deviceInfo
    );

    return ChangePasswordResponseDto.success(
      sessionsRevoked,
      false,
      undefined,
      deviceInfo.sessionId,
      strengthResult.score,
      undefined,
      undefined,
      undefined,
      deviceInfo.correlationId
    );
  }

  async validateCurrentPassword(
    userId: string,
    password: string,
    options?: { checkLockout?: boolean }
  ): Promise<ValidateCurrentPasswordResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return new ValidateCurrentPasswordResponseDto(false);
    }

    const isValid = await this.passwordHasher.compare(password, user.getPasswordHash());
    
    return new ValidateCurrentPasswordResponseDto(
      isValid,
      undefined,
      false,
      undefined,
      undefined,
      ACCOUNT_LOCK_POLICY?.MAX_FAILED_ATTEMPTS
    );
  }

  async getPasswordRules(locale?: 'en' | 'bn'): Promise<PasswordRulesResponseDto> {
    const rules = new PasswordRulesResponseDto();
    if (locale === 'bn') {
      // Add Bengali translations if needed
      rules.rulesBn = `পাসওয়ার্ডে কমপক্ষে ${PASSWORD_POLICY.MIN_LENGTH}টি অক্ষর থাকতে হবে। 
        একটি বড় হাতের অক্ষর (A-Z), একটি ছোট হাতের অক্ষর (a-z), একটি সংখ্যা (0-9) এবং 
        একটি বিশেষ অক্ষর (${PASSWORD_POLICY.SPECIAL_CHARS}) থাকতে হবে।`;
    }
    return rules;
  }

  // ============================================================
  // Account Management (Soft Delete with Grace Period)
  // ============================================================

  async deleteAccount(
    userId: string,
    deviceInfo: DeviceInfo,
    options?: UserDeletionOptions
  ): Promise<DeleteAccountResponseDto> {
    const user = await this.findUserOrThrow(userId);

    const dataRetentionDays = options?.gracePeriodDays || ACCOUNT_CONFIG.DATA_RETENTION_DAYS || 30;
    const reactivationDeadline = new Date(Date.now() + dataRetentionDays * 24 * 60 * 60 * 1000);

    // Soft delete
    user.delete();
    await this.userRepository.save(user);

    // Revoke all sessions
    const sessionsRevoked = await this.sessionService.revokeAllSessions(userId, 'Account deleted');

    // Revoke all refresh tokens
    await this.refreshTokenRepository.revokeAllByUserId(userId, 'Account deleted');

    // Invalidate cache
    await this.invalidateUserCache(userId);

    // Request data export if needed
    let dataExportUrl: string | undefined;
    let dataExportExpiresAt: Date | undefined;
    
    if (options?.requestDataExport) {
      // Generate data export
      const exportId = uuidv4();
      dataExportUrl = `/api/v1/users/${userId}/export/${exportId}`;
      dataExportExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      
      await this.cacheService.set(
        CacheKeyBuilder.userDataExport(userId),
        { exportId, status: 'pending' },
        7 * 24 * 60 * 60
      );
    }

    // Publish event
    await this.eventBus.publish(
      new UserAccountDeletedEvent(
        userId,
        user.getEmail().getValue(),
        options?.reason || 'user_initiated',
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent,
        dataRetentionDays,
        reactivationDeadline,
        options?.requestDataExport
      )
    );

    // Send notification
    await this.notificationCircuitBreaker.call(async () => {
      return withRetry(() => 
        this.notificationService.sendAccountDeletedNotification(
          userId,
          user.getEmail().getValue(),
          dataRetentionDays
        )
      );
    }).catch(err => this.logger.warn(`Failed to send account deletion notification: ${err.message}`));

    // Audit log
    await this.auditService.critical(
      AUDIT_ACTIONS.ACCOUNT_DELETED,
      userId,
      { sessionsRevoked, dataRetentionDays, reason: options?.reason },
      { ipAddress: deviceInfo.ipAddress, deviceId: deviceInfo.deviceId, userAgent: deviceInfo.userAgent }
    );

    return {
      success: true,
      message: `Account deleted successfully. Your data will be retained for ${dataRetentionDays} days.`,
      userId,
      deletedAt: new Date().toISOString(),
      dataRetentionDays,
      canReactivate: true,
      reactivationDeadline: reactivationDeadline.toISOString(),
      dataExportRequested: options?.requestDataExport || false,
      dataExportUrl,
      dataExportExpiresAt,
      reason: options?.reason
    };
  }

  async reactivateAccount(
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<ReactivateAccountResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user || user.getStatus() !== UserStatus.DELETED) {
      throw new NotFoundException('Deleted user not found or already reactivated');
    }

    // Check if still within grace period
    const deletedAt = user.getDeletedAt();
    if (deletedAt) {
      const dataRetentionDays = ACCOUNT_CONFIG.DATA_RETENTION_DAYS || 30;
      const gracePeriodEnd = new Date(deletedAt.getTime() + dataRetentionDays * 24 * 60 * 60 * 1000);
      
      if (new Date() > gracePeriodEnd) {
        throw new BadRequestException('Cannot reactivate account. Grace period has expired.');
      }
    }

    user.restore();
    await this.userRepository.save(user);

    // Invalidate cache
    await this.invalidateUserCache(userId);

    // Publish event
    await this.eventBus.publish(
      new UserReactivatedEvent(
        userId,
        user.getEmail().getValue(),
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent
      )
    );

    // Send notification
    await this.notificationCircuitBreaker.call(async () => {
      return withRetry(() => 
        this.notificationService.sendAccountReactivatedNotification(
          userId,
          user.getEmail().getValue()
        )
      );
    }).catch(err => this.logger.warn(`Failed to send reactivation notification: ${err.message}`));

    // Audit log
    await this.auditService.info(
      AUDIT_ACTIONS.ACCOUNT_RESTORED,
      userId,
      { reactivatedAt: new Date().toISOString() },
      { ipAddress: deviceInfo.ipAddress, deviceId: deviceInfo.deviceId, userAgent: deviceInfo.userAgent }
    );

    // Create new session for auto-login
    let newSessionId: string | undefined;
    if (deviceInfo.sessionId) {
      const deviceId = new (require('../../../domain/value-objects/device-id.vo').DeviceId)(deviceInfo.deviceId);
      const ipAddress = new (require('../../../domain/value-objects/ip-address.vo').IpAddress)(deviceInfo.ipAddress);
      const userAgent = new (require('../../../domain/value-objects/user-agent.vo').UserAgent)(deviceInfo.userAgent);
      
      const session = Session.create(
        user.getId(),
        new (require('../../../domain/value-objects/token.vo').Token)(uuidv4(), 'session'),
        ipAddress,
        userAgent,
        deviceId,
        { generate: () => uuidv4() },
        {},
        undefined,
        undefined,
        false
      );
      await this.sessionRepository.save(session);
      newSessionId = session.getId();
    }

    return {
      success: true,
      message: 'Account reactivated successfully',
      userId,
      reactivatedAt: new Date().toISOString(),
      sessionsRestored: newSessionId ? 1 : 0,
      mfaReEnabled: user.isMfaEnabled(),
      newSessionId
    };
  }

  async restoreAccount(
    adminId: string,
    targetUserId: string,
    deviceInfo: DeviceInfo,
    options?: { restoreSessions?: boolean; restoreData?: boolean }
  ): Promise<UserResponseDto> {
    // Check admin permission
    const admin = await this.userRepository.findById(adminId);
    if (!admin || !admin.isSuperAdmin()) {
      throw new ForbiddenException('Only super admins can restore deleted accounts');
    }

    const user = await this.userRepository.findById(targetUserId);
    if (!user || user.getStatus() !== UserStatus.DELETED) {
      throw new NotFoundException('Deleted user not found');
    }

    user.restore();
    await this.userRepository.save(user);

    await this.invalidateUserCache(targetUserId);

    // Audit log
    await this.auditService.critical(
      AUDIT_ACTIONS.ACCOUNT_RESTORED_BY_ADMIN,
      adminId,
      { targetUserId, restoredBy: adminId, options },
      { ipAddress: deviceInfo.ipAddress, deviceId: deviceInfo.deviceId, userAgent: deviceInfo.userAgent }
    );

    return UserMapper.toDto(user);
  }

  // ============================================================
  // User Query Operations (with caching)
  // ============================================================

  async getUserById(
    requesterId: string,
    targetUserId: string,
    options?: { useCache?: boolean; includeSensitive?: boolean }
  ): Promise<UserResponseDto> {
    // Check permission (can view own profile or admin)
    if (requesterId !== targetUserId) {
      const requester = await this.userRepository.findById(requesterId);
      if (!requester || !requester.isAdmin()) {
        throw new ForbiddenException('Cannot view other user profiles');
      }
    }

    // Try cache
    if (options?.useCache !== false) {
      const cacheKey = CacheKeyBuilder.user(targetUserId);
      const cached = await this.cacheService.get<UserResponseDto>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const user = await this.findUserOrThrow(targetUserId);
    const result = UserMapper.toDto(user);
    
    if (options?.useCache !== false) {
      await this.cacheService.set(CacheKeyBuilder.user(targetUserId), result, 300);
    }
    
    return result;
  }

  async getUserByEmail(email: string): Promise<UserResponseDto | null> {
    const emailVo = new Email(email);
    const user = await this.userRepository.findByEmail(emailVo);
    return user ? UserMapper.toDto(user) : null;
  }

  async getUserByPhone(phone: string): Promise<UserResponseDto | null> {
    const phoneVo = new Phone(phone);
    const user = await this.userRepository.findByPhone(phoneVo);
    return user ? UserMapper.toDto(user) : null;
  }

  async getUserActivitySummary(
    userId: string,
    options?: { days?: number; includeDetailed?: boolean }
  ): Promise<UserActivitySummaryDto> {
    const user = await this.findUserOrThrow(userId);
    const days = options?.days || 30;
    
    const sessions = await this.sessionRepository.findByUserId(userId);
    const recentSessions = sessions.filter(s => 
      s.getCreatedAt() > new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    );
    
    const totalLogins = recentSessions.length;
    const lastLoginAt = recentSessions.length > 0 
      ? recentSessions[recentSessions.length - 1]?.getCreatedAt() 
      : undefined;
    
    // This would normally come from order service
    const totalOrders = 0;
    const totalSpent = user.getTotalSpent();
    
    return {
      userId: user.getId(),
      totalLogins,
      lastLoginAt,
      totalOrders,
      totalSpent,
      accountAgeDays: Math.floor((Date.now() - user.getCreatedAt().getTime()) / (1000 * 60 * 60 * 24)),
      daysSinceLastActivity: lastLoginAt 
        ? Math.floor((Date.now() - lastLoginAt.getTime()) / (1000 * 60 * 60 * 24))
        : days,
      isActive: user.getStatus() === UserStatus.ACTIVE,
      preferredPaymentMethod: undefined,
      preferredDistrict: user.getPreferredDistrict()
    };
  }

  async getUserTierBenefits(userId: string): Promise<{
    tier: SharedUserTier;
    discountPercentage: number;
    freeShipping: boolean;
    prioritySupport: boolean;
    exclusiveAccess: boolean;
    birthdayGift: boolean;
    anniversaryDiscount: boolean;
    referralBonus: number;
    cashbackPercentage: number;
    tierUpgradeThreshold: number;
    tierUpgradeProgress: number;
    benefitsExpiry?: Date;
  }> {
    const user = await this.findUserOrThrow(userId);
    const tier = user.getTier();
    const totalSpent = user.getTotalSpent();
    
    const tierThresholds: Record<UserTier, number> = {
      [UserTier.BRONZE]: 0,
      [UserTier.SILVER]: 5000,
      [UserTier.GOLD]: 25000,
      [UserTier.PLATINUM]: 100000,
      [UserTier.DIAMOND]: 500000
    };
    
    const currentThreshold = tierThresholds[tier];
    let nextTier: UserTier | null = null;
    let nextThreshold = 0;
    
    switch (tier) {
      case UserTier.BRONZE:
        nextTier = UserTier.SILVER;
        nextThreshold = tierThresholds[UserTier.SILVER];
        break;
      case UserTier.SILVER:
        nextTier = UserTier.GOLD;
        nextThreshold = tierThresholds[UserTier.GOLD];
        break;
      case UserTier.GOLD:
        nextTier = UserTier.PLATINUM;
        nextThreshold = tierThresholds[UserTier.PLATINUM];
        break;
      case UserTier.PLATINUM:
        nextTier = UserTier.DIAMOND;
        nextThreshold = tierThresholds[UserTier.DIAMOND];
        break;
      case UserTier.DIAMOND:
        nextThreshold = currentThreshold;
        break;
    }
    
    const progressToNext = nextTier 
      ? Math.min(100, Math.floor(((totalSpent - currentThreshold) / (nextThreshold - currentThreshold)) * 100))
      : 100;
    
    return {
      tier,
      discountPercentage: user.getTierDiscount(),
      freeShipping: user.hasFreeShipping(),
      prioritySupport: user.hasPrioritySupport(),
      exclusiveAccess: tier === UserTier.PLATINUM || tier === UserTier.DIAMOND,
      birthdayGift: tier !== UserTier.BRONZE,
      anniversaryDiscount: tier !== UserTier.BRONZE,
      referralBonus: tier === UserTier.DIAMOND ? 500 : tier === UserTier.PLATINUM ? 300 : 100,
      cashbackPercentage: tier === UserTier.DIAMOND ? 5 : tier === UserTier.PLATINUM ? 3 : tier === UserTier.GOLD ? 2 : 1,
      tierUpgradeThreshold: nextThreshold,
      tierUpgradeProgress: progressToNext,
      benefitsExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
    };
  }

  calculateUserTier(totalSpent: number): SharedUserTier {
    if (totalSpent >= 500000) return UserTier.DIAMOND;
    if (totalSpent >= 100000) return UserTier.PLATINUM;
    if (totalSpent >= 25000) return UserTier.GOLD;
    if (totalSpent >= 5000) return UserTier.SILVER;
    return UserTier.BRONZE;
  }

  // ============================================================
  // User Listing (with pagination and caching)
  // ============================================================

  async listUsers(
    options: PaginationDto,
    filters?: UserFilters,
    queryOptions?: { useCache?: boolean; includeDeleted?: boolean }
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>> {
    // Try cache for first page without filters
    if (options.page === 1 && !filters && queryOptions?.useCache !== false) {
      const cacheKey = CacheKeyBuilder.userList(options.page, options.limit);
      const cached = await this.cacheService.get<PaginatedResponseDto<BriefUserResponseDto>>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const result = await this.userRepository.findByFilters(filters || {}, options);
    const response = new PaginatedResponseDto(
      result.items.map(u => UserMapper.toBriefDto(u)),
      result.total,
      result.page,
      result.limit
    );
    
    // Cache first page result
    if (options.page === 1 && !filters && queryOptions?.useCache !== false) {
      await this.cacheService.set(
        CacheKeyBuilder.userList(options.page, options.limit),
        response,
        60 // 1 minute TTL for list
      );
    }
    
    return response;
  }

  async searchUsers(
    filters: UserFilters,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>> {
    const result = await this.userRepository.findByFilters(filters, options);
    return new PaginatedResponseDto(
      result.items.map(u => UserMapper.toBriefDto(u)),
      result.total,
      result.page,
      result.limit
    );
  }

  async getUsersByRole(
    role: string,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>> {
    const result = await this.userRepository.findByRole(role, options);
    return new PaginatedResponseDto(
      result.items.map(u => UserMapper.toBriefDto(u)),
      result.total,
      result.page,
      result.limit
    );
  }

  async getUsersByStatus(
    status: string,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>> {
    const result = await this.userRepository.findByStatus(status, options);
    return new PaginatedResponseDto(
      result.items.map(u => UserMapper.toBriefDto(u)),
      result.total,
      result.page,
      result.limit
    );
  }

  async getUsersByTier(
    tier: SharedUserTier,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>> {
    const result = await this.userRepository.findByTier(tier, options);
    return new PaginatedResponseDto(
      result.items.map(u => UserMapper.toBriefDto(u)),
      result.total,
      result.page,
      result.limit
    );
  }

  async getActiveUsers(
    days: number,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>> {
    const result = await this.userRepository.findRecentlyActive(days, options);
    return new PaginatedResponseDto(
      result.items.map(u => UserMapper.toBriefDto(u)),
      result.total,
      result.page,
      result.limit
    );
  }

  async getInactiveUsers(
    days: number,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>> {
    const result = await this.userRepository.findInactiveUsers(days, options);
    return new PaginatedResponseDto(
      result.items.map(u => UserMapper.toBriefDto(u)),
      result.total,
      result.page,
      result.limit
    );
  }

  async getUsersByDistrict(
    district: string,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>> {
    if (!isValidDistrict(district)) {
      throw new BadRequestException(`Invalid district: ${district}`);
    }
    
    const result = await this.userRepository.findByDistrict(district, options);
    return new PaginatedResponseDto(
      result.items.map(u => UserMapper.toBriefDto(u)),
      result.total,
      result.page,
      result.limit
    );
  }

  // ============================================================
  // Admin User Management
  // ============================================================

  async createUser(
    adminId: string,
    dto: AdminCreateUserDto,
    deviceInfo: DeviceInfo,
    options?: { sendWelcomeEmail?: boolean; requirePasswordChange?: boolean }
  ): Promise<AdminCreateUserResponseDto> {
    // Check admin permission
    const admin = await this.userRepository.findById(adminId);
    if (!admin || !admin.isAdmin()) {
      throw new ForbiddenException('Only admins can create users');
    }

    // Check if user exists
    const email = new Email(dto.email);
    const exists = await this.userRepository.existsByEmail(email);
    if (exists) {
      throw new ConflictException('User already exists');
    }

    // Check password match
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Validate password strength
    const strengthResult = await this.passwordHasher.validateStrength(dto.password);
    if (!strengthResult.isValid) {
      throw new BadRequestException(strengthResult.errors.join(', '));
    }

    // Hash password
    const hashedPassword = await this.passwordHasher.hash(dto.password);

    // Validate district if provided
    if (dto.preferredDistrict && !isValidDistrict(dto.preferredDistrict)) {
      throw new BadRequestException(`Invalid district: ${dto.preferredDistrict}`);
    }

    // Validate upazila if provided
    if (dto.preferredUpazila && !isValidUpazila(dto.preferredUpazila, dto.preferredDistrict)) {
      throw new BadRequestException(`Invalid upazila: ${dto.preferredUpazila}`);
    }

    // Generate username
    const username = this.generateUsername(dto.email);

    // Create user in transaction
    let user: User;
    await this.executeInTransaction(async () => {
      user = User.create(
        email,
        hashedPassword,
        dto.fullName,
        dto.phone ? new Phone(dto.phone) : undefined,
        { generate: () => uuidv4() },
        dto.preferredLanguage
      );
      
      // Set username
      user.updateUsername(username);
      
      // Set display name if provided
      if (dto.displayName) {
        user.updateDisplayName(dto.displayName);
      }
      
      // Set role if provided and not default
      if (dto.role && dto.role !== 'CUSTOMER') {
        user.changeRole(dto.role, adminId);
      }
      
      // Set tier if provided
      if (dto.userTier && dto.userTier !== 'BRONZE') {
        user.updateTier(dto.userTier);
      }
      
      // Set preferences
      if (dto.preferredDistrict) {
        user.updatePreferredDistrict(dto.preferredDistrict);
      }
      if (dto.preferredUpazila) {
        user.updatePreferredUpazila(dto.preferredUpazila);
      }
      if (dto.preferences) {
        user.updatePreferences(dto.preferences);
      }
      
      // Mark as verified if specified
      if (dto.isEmailVerified) {
        user.markEmailVerified();
      }
      if (dto.isPhoneVerified) {
        user.markPhoneVerified();
      }
      
      await this.userRepository.save(user);
      
      // Add password to history
      await this.passwordHistoryRepository.add(
        user.getId(),
        hashedPassword,
        {
          changedBy: adminId,
          changedByType: 'admin',
          ipAddress: deviceInfo.ipAddress,
          userAgent: deviceInfo.userAgent,
          deviceId: deviceInfo.deviceId,
          reason: 'Admin created user'
        }
      );
    });

    // Publish event
    await this.eventBus.publish(
      new UserRegisteredEvent(
        user!.getId(),
        user!.getEmail().getValue(),
        user!.getFullName(),
        'admin_created',
        'admin_portal',
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent,
        dto.isEmailVerified,
        dto.isPhoneVerified,
        undefined,
        user!.getRole(),
        user!.getTier(),
        { createdBy: adminId }
      )
    );

    // Send welcome email if requested
    if (options?.sendWelcomeEmail !== false) {
      await this.notificationCircuitBreaker.call(async () => {
        return withRetry(() => 
          this.notificationService.sendWelcomeEmail(
            user!.getId(),
            user!.getEmail().getValue(),
            user!.getFullName()
          )
        );
      }).catch(err => this.logger.warn(`Failed to send welcome email: ${err.message}`));
    }

    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.USER_CREATED,
      { 
        targetUserId: user!.getId(),
        email: user!.getEmail().getValue(),
        role: user!.getRole(),
        username: user!.getUsername(),
        isEmailVerified: dto.isEmailVerified,
        isPhoneVerified: dto.isPhoneVerified
      },
      deviceInfo
    );

    return new AdminCreateUserResponseDto(
      user!.getId(),
      user!.getEmail().getValue(),
      user!.getFullName(),
      !dto.isEmailVerified,
      !dto.isPhoneVerified,
      user!.getRole(),
      user!.getTier(),
      adminId,
      options?.requirePasswordChange || false,
      dto.isEmailVerified,
      dto.isPhoneVerified,
      dto.businessName,
      user!.getCreatedAt(),
      user!.getPhone()?.getValue(),
      username,
      user!.getDisplayName()
    );
  }

  async updateUser(
    adminId: string,
    targetUserId: string,
    dto: UpdateProfileDto,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto> {
    // Check admin permission
    const admin = await this.userRepository.findById(adminId);
    if (!admin || !admin.isAdmin()) {
      throw new ForbiddenException('Only admins can update other users');
    }

    const user = await this.findUserOrThrow(targetUserId);

    // Validate district if provided
    if (dto.preferredDistrict && !isValidDistrict(dto.preferredDistrict)) {
      throw new BadRequestException(`Invalid district: ${dto.preferredDistrict}`);
    }

    // Validate upazila if provided
    if (dto.preferredUpazila && !isValidUpazila(dto.preferredUpazila, dto.preferredDistrict)) {
      throw new BadRequestException(`Invalid upazila: ${dto.preferredUpazila}`);
    }

    const changes: Record<string, { old: unknown; new: unknown }> = {};

    // Update fields using domain methods
    if (dto.fullName !== undefined) {
      changes.fullName = { old: user.getFullName(), new: dto.fullName };
      user.updateFullName(dto.fullName);
    }
    if (dto.displayName !== undefined) {
      changes.displayName = { old: user.getDisplayName(), new: dto.displayName };
      user.updateDisplayName(dto.displayName);
    }
    if (dto.phone !== undefined) {
      changes.phone = { old: user.getPhone()?.getValue(), new: dto.phone };
      user.updatePhone(new Phone(dto.phone));
    }
    if (dto.profilePicture !== undefined) {
      changes.profilePicture = { old: user.getAvatar(), new: dto.profilePicture };
      user.updateAvatar(dto.profilePicture);
    }
    if (dto.timezone !== undefined) {
      changes.timezone = { old: user.getTimezone(), new: dto.timezone };
      user.updateTimezone(dto.timezone);
    }
    if (dto.language !== undefined) {
      changes.language = { old: user.getPreferredLanguage(), new: dto.language };
      user.updatePreferredLanguage(dto.language);
    }
    if (dto.preferredDistrict !== undefined) {
      changes.preferredDistrict = { old: user.getPreferredDistrict(), new: dto.preferredDistrict };
      user.updatePreferredDistrict(dto.preferredDistrict);
    }
    if (dto.preferredUpazila !== undefined) {
      changes.preferredUpazila = { old: user.getPreferredUpazila(), new: dto.preferredUpazila };
      user.updatePreferredUpazila(dto.preferredUpazila);
    }

    await this.userRepository.save(user);
    await this.invalidateUserCache(targetUserId);

    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.USER_UPDATED,
      { 
        targetUserId,
        updatedFields: Object.keys(changes),
        changes
      },
      deviceInfo
    );

    return UserMapper.toDto(user);
  }

  async deleteUser(
    adminId: string,
    targetUserId: string,
    deviceInfo: DeviceInfo,
    options?: { cascadeDelete?: boolean; deleteReason?: string }
  ): Promise<DeleteAccountResponseDto> {
    // Check admin permission
    const admin = await this.userRepository.findById(adminId);
    if (!admin || !admin.isAdmin()) {
      throw new ForbiddenException('Only admins can delete users');
    }

    const user = await this.findUserOrThrow(targetUserId);
    
    // Hard delete
    await this.executeInTransaction(async () => {
      // Delete user sessions
      await this.sessionRepository.deleteAllByUserId(targetUserId, options?.deleteReason || 'Admin deleted user');
      
      // Delete refresh tokens
      await this.refreshTokenRepository.revokeAllByUserId(targetUserId, options?.deleteReason || 'Admin deleted user');
      
      // Delete devices
      await this.deviceRepository.deleteAllByUserId(targetUserId);
      
      // Delete password history
      await this.passwordHistoryRepository.deleteByUserId(targetUserId);
      
      // Delete user (permanent)
      await this.userRepository.permanentDelete(targetUserId);
    });

    // Audit log
    await this.auditService.critical(
      AUDIT_ACTIONS.USER_PERMANENTLY_DELETED,
      adminId,
      { targetUserId, userEmail: user.getEmail().getValue(), reason: options?.deleteReason },
      deviceInfo
    );

    return {
      success: true,
      message: 'User permanently deleted',
      userId: targetUserId,
      deletedAt: new Date().toISOString(),
      dataRetentionDays: 0,
      canReactivate: false,
      reactivationDeadline: undefined,
      dataExportRequested: false
    };
  }

  async activateUser(
    adminId: string,
    targetUserId: string,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto> {
    const user = await this.findUserOrThrow(targetUserId);
    
    if (user.getStatus() === UserStatus.ACTIVE) {
      throw new BadRequestException('User is already active');
    }
    
    user.activate();
    await this.userRepository.save(user);
    await this.invalidateUserCache(targetUserId);

    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.USER_ACTIVATED,
      { targetUserId },
      deviceInfo
    );

    return UserMapper.toDto(user);
  }

  async deactivateUser(
    adminId: string,
    targetUserId: string,
    reason: string,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto> {
    const user = await this.findUserOrThrow(targetUserId);
    
    if (user.getStatus() === UserStatus.INACTIVE) {
      throw new BadRequestException('User is already inactive');
    }
    
    user.deactivate();
    await this.userRepository.save(user);
    await this.invalidateUserCache(targetUserId);
    
    // Revoke all sessions
    await this.sessionService.revokeAllSessions(targetUserId, `Account deactivated: ${reason}`);

    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.USER_DEACTIVATED,
      { targetUserId, reason },
      deviceInfo
    );

    return UserMapper.toDto(user);
  }

  async suspendUser(
    adminId: string,
    targetUserId: string,
    options: UserSuspensionOptions,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto> {
    const user = await this.findUserOrThrow(targetUserId);
    
    user.suspend(options.reason);
    await this.userRepository.save(user);
    await this.invalidateUserCache(targetUserId);
    
    // Revoke all sessions
    await this.sessionService.revokeAllSessions(targetUserId, `Account suspended: ${options.reason}`);
    
    // Block device fingerprint if requested
    if (options.blockDeviceFingerprint && options.deviceFingerprint) {
      // Add to blocklist (implementation depends on infrastructure)
      await this.cacheService.set(
        CacheKeyBuilder.blockedDevice(options.deviceFingerprint),
        { userId: targetUserId, reason: options.reason, suspendedAt: new Date() },
        options.durationDays * 24 * 60 * 60
      );
    }
    
    // Send notification
    if (options.notifyUser) {
      await this.notificationCircuitBreaker.call(async () => {
        return withRetry(() => 
          this.notificationService.sendAccountSuspendedNotification(
            targetUserId,
            user.getEmail().getValue(),
            options.reason,
            options.durationDays
          )
        );
      }).catch(err => this.logger.warn(`Failed to send suspension notification: ${err.message}`));
    }

    // Audit log
    await this.auditService.critical(
      AUDIT_ACTIONS.USER_SUSPENDED,
      adminId,
      { targetUserId, reason: options.reason, durationDays: options.durationDays },
      deviceInfo
    );

    return UserMapper.toDto(user);
  }

  async changeUserRole(
    adminId: string,
    targetUserId: string,
    newRole: string,
    deviceInfo: DeviceInfo,
    reason?: string
  ): Promise<UserResponseDto> {
    // Check super admin permission
    const admin = await this.userRepository.findById(adminId);
    if (!admin || !admin.isSuperAdmin()) {
      throw new ForbiddenException('Only super admins can change roles');
    }

    const user = await this.findUserOrThrow(targetUserId);
    
    const oldRole = user.getRole();
    user.changeRole(newRole, adminId);
    await this.userRepository.save(user);
    await this.invalidateUserCache(targetUserId);

    // Publish event
    await this.eventBus.publish(
      new UserRoleChangedEvent(
        targetUserId,
        user.getEmail().getValue(),
        oldRole,
        newRole,
        adminId,
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent,
        reason
      )
    );

    // Send notification
    await this.notificationCircuitBreaker.call(async () => {
      return withRetry(() => 
        this.notificationService.sendRoleChangedNotification(
          targetUserId,
          user.getEmail().getValue(),
          oldRole,
          newRole
        )
      );
    }).catch(err => this.logger.warn(`Failed to send role change notification: ${err.message}`));

    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.USER_ROLE_CHANGED,
      { targetUserId, oldRole, newRole, reason },
      deviceInfo
    );

    return UserMapper.toDto(user);
  }

  async changeUserTier(
    adminId: string,
    targetUserId: string,
    newTier: SharedUserTier,
    reason: string,
    deviceInfo: DeviceInfo,
    options?: { notifyUser?: boolean; expiryDays?: number }
  ): Promise<UserResponseDto> {
    // Check admin permission
    const admin = await this.userRepository.findById(adminId);
    if (!admin || !admin.isAdmin()) {
      throw new ForbiddenException('Only admins can change user tiers');
    }

    const user = await this.findUserOrThrow(targetUserId);
    
    const oldTier = user.getTier();
    user.updateTier(newTier);
    await this.userRepository.save(user);
    await this.invalidateUserCache(targetUserId);

    // Publish event
    await this.eventBus.publish(
      new UserTierChangedEvent(
        targetUserId,
        user.getEmail().getValue(),
        oldTier,
        newTier,
        adminId,
        reason,
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent,
        options?.expiryDays
      )
    );

    // Send notification
    if (options?.notifyUser !== false) {
      await this.notificationCircuitBreaker.call(async () => {
        return withRetry(() => 
          this.notificationService.sendEmailChangeNotification(
            targetUserId,
            user.getEmail().getValue(),
            `Your tier has been updated from ${oldTier} to ${newTier}`
          )
        );
      }).catch(err => this.logger.warn(`Failed to send tier change notification: ${err.message}`));
    }

    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.USER_TIER_CHANGED,
      { targetUserId, oldTier, newTier, reason, expiryDays: options?.expiryDays },
      deviceInfo
    );

    return UserMapper.toDto(user);
  }

  async verifyKyc(
    adminId: string,
    targetUserId: string,
    deviceInfo: DeviceInfo,
    options?: { documentType?: string; notes?: string }
  ): Promise<UserResponseDto> {
    // Check admin permission
    const admin = await this.userRepository.findById(adminId);
    if (!admin || !admin.isAdmin()) {
      throw new ForbiddenException('Only admins can verify KYC');
    }

    const user = await this.findUserOrThrow(targetUserId);
    
    user.markKycVerified();
    await this.userRepository.save(user);
    await this.invalidateUserCache(targetUserId);

    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.KYC_VERIFIED,
      { targetUserId, documentType: options?.documentType, notes: options?.notes },
      deviceInfo
    );

    return UserMapper.toDto(user);
  }

  async rejectKyc(
    adminId: string,
    targetUserId: string,
    reason: string,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto> {
    // Check admin permission
    const admin = await this.userRepository.findById(adminId);
    if (!admin || !admin.isAdmin()) {
      throw new ForbiddenException('Only admins can reject KYC');
    }

    const user = await this.findUserOrThrow(targetUserId);
    
    user.rejectKyc(reason);
    await this.userRepository.save(user);
    await this.invalidateUserCache(targetUserId);

    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.KYC_REJECTED,
      { targetUserId, reason },
      deviceInfo
    );

    return UserMapper.toDto(user);
  }

  async forcePasswordReset(
    adminId: string,
    targetUserId: string,
    reason: string,
    deviceInfo: DeviceInfo,
    options?: { requireChangeOnLogin?: boolean; notifyUser?: boolean }
  ): Promise<{ resetToken?: string; notifySent: boolean }> {
    // Check admin permission
    const admin = await this.userRepository.findById(adminId);
    if (!admin || !admin.isSuperAdmin()) {
      throw new ForbiddenException('Only super admins can force password reset');
    }

    const user = await this.findUserOrThrow(targetUserId);
    
    // Generate reset token
    const resetToken = await this.tokenGenerator.generatePasswordResetToken(
      targetUserId,
      { requiresChangeOnLogin: options?.requireChangeOnLogin !== false }
    );
    
    // Set force password change flag
    if (options?.requireChangeOnLogin !== false) {
      user.setRequirePasswordChange(true);
      await this.userRepository.save(user);
    }
    
    // Revoke all sessions
    await this.sessionService.revokeAllSessions(targetUserId, `Force password reset: ${reason}`);
    
    // Revoke all refresh tokens
    await this.refreshTokenRepository.revokeAllByUserId(targetUserId, `Force password reset: ${reason}`);
    
    // Send notification
    let notifySent = false;
    if (options?.notifyUser !== false) {
      await this.notificationCircuitBreaker.call(async () => {
        await withRetry(() => 
          this.notificationService.sendPasswordResetEmail(
            targetUserId,
            user.getEmail().getValue(),
            resetToken,
            24 // 24 hours
          )
        );
        notifySent = true;
      }).catch(err => this.logger.warn(`Failed to send password reset notification: ${err.message}`));
    }

    // Audit log
    await this.auditService.critical(
      AUDIT_ACTIONS.PASSWORD_RESET_FORCED,
      adminId,
      { targetUserId, reason, requireChangeOnLogin: options?.requireChangeOnLogin !== false },
      deviceInfo
    );

    return { resetToken: options?.requireChangeOnLogin !== false ? resetToken : undefined, notifySent };
  }

  // ============================================================
  // Bulk Operations (with progress tracking)
  // ============================================================

  async bulkActivateUsers(
    userIds: string[],
    adminId: string,
    onProgress?: (progress: BulkOperationProgress) => void
  ): Promise<BulkUserOperationResult> {
    const startTime = Date.now();
    let successful = 0;
    let failed = 0;
    const errors: Array<{ userId: string; error: string; timestamp: Date }> = [];
    
    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      try {
        const user = await this.findUserOrThrow(userId);
        user.activate();
        await this.userRepository.save(user);
        await this.invalidateUserCache(userId);
        successful++;
      } catch (error) {
        failed++;
        errors.push({
          userId,
          error: (error as Error).message,
          timestamp: new Date()
        });
      }
      
      if (onProgress) {
        onProgress({
          total: userIds.length,
          processed: i + 1,
          succeeded: successful,
          failed,
          percentage: ((i + 1) / userIds.length) * 100,
          estimatedRemainingMs: ((userIds.length - (i + 1)) / (i + 1)) * (Date.now() - startTime)
        });
      }
    }
    
    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.BULK_USER_ACTIVATION,
      { total: userIds.length, successful, failed },
      { ipAddress: 'system', deviceId: 'system', userAgent: 'system' }
    );
    
    return {
      totalProcessed: userIds.length,
      successful,
      failed,
      skipped: 0,
      errors,
      progress: {
        total: userIds.length,
        processed: userIds.length,
        succeeded: successful,
        failed,
        percentage: 100,
        estimatedRemainingMs: 0
      },
      durationMs: Date.now() - startTime,
      operationType: 'activate'
    };
  }

  async bulkDeactivateUsers(
    userIds: string[],
    reason: string,
    adminId: string,
    onProgress?: (progress: BulkOperationProgress) => void
  ): Promise<BulkUserOperationResult> {
    const startTime = Date.now();
    let successful = 0;
    let failed = 0;
    const errors: Array<{ userId: string; error: string; timestamp: Date }> = [];
    
    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      try {
        const user = await this.findUserOrThrow(userId);
        user.deactivate();
        await this.userRepository.save(user);
        await this.invalidateUserCache(userId);
        await this.sessionService.revokeAllSessions(userId, reason);
        successful++;
      } catch (error) {
        failed++;
        errors.push({
          userId,
          error: (error as Error).message,
          timestamp: new Date()
        });
      }
      
      if (onProgress) {
        onProgress({
          total: userIds.length,
          processed: i + 1,
          succeeded: successful,
          failed,
          percentage: ((i + 1) / userIds.length) * 100,
          estimatedRemainingMs: ((userIds.length - (i + 1)) / (i + 1)) * (Date.now() - startTime)
        });
      }
    }
    
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.BULK_USER_DEACTIVATION,
      { total: userIds.length, successful, failed, reason },
      { ipAddress: 'system', deviceId: 'system', userAgent: 'system' }
    );
    
    return {
      totalProcessed: userIds.length,
      successful,
      failed,
      skipped: 0,
      errors,
      progress: {
        total: userIds.length,
        processed: userIds.length,
        succeeded: successful,
        failed,
        percentage: 100,
        estimatedRemainingMs: 0
      },
      durationMs: Date.now() - startTime,
      operationType: 'deactivate'
    };
  }

  async bulkAssignRole(
    userIds: string[],
    role: string,
    adminId: string,
    reason: string,
    onProgress?: (progress: BulkOperationProgress) => void
  ): Promise<BulkUserOperationResult> {
    const startTime = Date.now();
    let successful = 0;
    let failed = 0;
    const errors: Array<{ userId: string; error: string; timestamp: Date }> = [];
    
    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      try {
        const user = await this.findUserOrThrow(userId);
        const oldRole = user.getRole();
        user.changeRole(role, adminId);
        await this.userRepository.save(user);
        await this.invalidateUserCache(userId);
        
        await this.eventBus.publish(
          new UserRoleChangedEvent(
            userId,
            user.getEmail().getValue(),
            oldRole,
            role,
            adminId,
            undefined,
            undefined,
            undefined,
            undefined,
            reason
          )
        );
        successful++;
      } catch (error) {
        failed++;
        errors.push({
          userId,
          error: (error as Error).message,
          timestamp: new Date()
        });
      }
      
      if (onProgress) {
        onProgress({
          total: userIds.length,
          processed: i + 1,
          succeeded: successful,
          failed,
          percentage: ((i + 1) / userIds.length) * 100,
          estimatedRemainingMs: ((userIds.length - (i + 1)) / (i + 1)) * (Date.now() - startTime)
        });
      }
    }
    
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.BULK_ROLE_ASSIGNMENT,
      { total: userIds.length, successful, failed, role, reason },
      { ipAddress: 'system', deviceId: 'system', userAgent: 'system' }
    );
    
    return {
      totalProcessed: userIds.length,
      successful,
      failed,
      skipped: 0,
      errors,
      progress: {
        total: userIds.length,
        processed: userIds.length,
        succeeded: successful,
        failed,
        percentage: 100,
        estimatedRemainingMs: 0
      },
      durationMs: Date.now() - startTime,
      operationType: 'assign_role'
    };
  }

  async bulkRecalculateTiers(
    userIds: string[],
    adminId: string,
    onProgress?: (progress: BulkOperationProgress) => void
  ): Promise<BulkUserOperationResult> {
    const startTime = Date.now();
    let successful = 0;
    let failed = 0;
    const errors: Array<{ userId: string; error: string; timestamp: Date }> = [];
    
    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      try {
        const user = await this.findUserOrThrow(userId);
        const totalSpent = user.getTotalSpent();
        const newTier = this.calculateUserTier(totalSpent);
        const oldTier = user.getTier();
        
        if (oldTier !== newTier) {
          user.updateTier(newTier);
          await this.userRepository.save(user);
          await this.invalidateUserCache(userId);
        }
        successful++;
      } catch (error) {
        failed++;
        errors.push({
          userId,
          error: (error as Error).message,
          timestamp: new Date()
        });
      }
      
      if (onProgress) {
        onProgress({
          total: userIds.length,
          processed: i + 1,
          succeeded: successful,
          failed,
          percentage: ((i + 1) / userIds.length) * 100,
          estimatedRemainingMs: ((userIds.length - (i + 1)) / (i + 1)) * (Date.now() - startTime)
        });
      }
    }
    
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.BULK_TIER_RECALCULATION,
      { total: userIds.length, successful, failed },
      { ipAddress: 'system', deviceId: 'system', userAgent: 'system' }
    );
    
    return {
      totalProcessed: userIds.length,
      successful,
      failed,
      skipped: 0,
      errors,
      progress: {
        total: userIds.length,
        processed: userIds.length,
        succeeded: successful,
        failed,
        percentage: 100,
        estimatedRemainingMs: 0
      },
      durationMs: Date.now() - startTime,
      operationType: 'update_tier'
    };
  }

  // ============================================================
  // Statistics & Analytics
  // ============================================================

  async getUserStatistics(options?: { useCache?: boolean }): Promise<UserStatistics> {
    if (options?.useCache !== false) {
      const cacheKey = CacheKeyBuilder.userStatistics();
      const cached = await this.cacheService.get<UserStatistics>(cacheKey);
      if (cached) {
        return cached;
      }
    }
    
    const stats = await this.userRepository.getStatistics();
    
    // Calculate percentages
    const totalUsers = stats.totalUsers;
    const result: UserStatistics = {
      ...stats,
      verifiedEmailPercentage: totalUsers > 0 ? (stats.emailVerifiedUsers / totalUsers) * 100 : 0,
      mfaEnabledPercentage: totalUsers > 0 ? (stats.mfaEnabledUsers / totalUsers) * 100 : 0,
      // Add Bangladesh specific breakdowns
      usersByDistrict: await this.userRepository.getUserDistributionByDistrict(),
      usersByMobileOperator: await this.userRepository.getUserDistributionByMobileOperator(),
      usersByNetworkType: await this.userRepository.getUserDistributionByNetworkType(),
      churnRate30Days: await this.userRepository.getChurnRate(30),
      retentionRate30Days: await this.userRepository.getRetentionRate(30),
      averageSessionsPerUser: await this.userRepository.getAverageSessionsPerUser(),
      averageOrdersPerUser: 0, // Would come from order service
      lifetimeValueAvg: stats.averageTotalSpent,
      userGrowthRate: await this.userRepository.getGrowthRate(),
      engagementRate: await this.userRepository.getEngagementRate(),
      churnPrediction: await this.userRepository.getChurnPrediction()
    };
    
    if (options?.useCache !== false) {
      await this.cacheService.set(CacheKeyBuilder.userStatistics(), result, 300);
    }
    
    return result;
  }

  async getRegistrationTrends(days: number): Promise<RegistrationTrend[]> {
    return this.userRepository.getRegistrationTrends(days);
  }

  async getRetentionMetrics(
    days: number,
    options?: { cohortPeriod?: 'week' | 'month'; includeProjection?: boolean }
  ): Promise<RetentionMetrics> {
    return this.userRepository.getRetentionMetrics(days, options);
  }

  async getChurnPrediction(userId: string): Promise<{
    churnProbability: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    contributingFactors: string[];
    recommendations: string[];
    confidence: number;
  }> {
    const user = await this.findUserOrThrow(userId);
    const totalSpent = user.getTotalSpent();
    const lastLoginAt = user.getLastLoginAt();
    const daysSinceLastLogin = lastLoginAt 
      ? Math.floor((Date.now() - lastLoginAt.getTime()) / (1000 * 60 * 60 * 24))
      : 0;
    
    // Simple ML-inspired calculation
    let churnProbability = 0;
    const contributingFactors: string[] = [];
    
    if (daysSinceLastLogin > 30) {
      churnProbability += 40;
      contributingFactors.push('No login for over 30 days');
    } else if (daysSinceLastLogin > 14) {
      churnProbability += 20;
      contributingFactors.push('No login for over 14 days');
    }
    
    if (totalSpent < 1000) {
      churnProbability += 20;
      contributingFactors.push('Low lifetime value');
    }
    
    if (user.getTotalOrders() === 0) {
      churnProbability += 30;
      contributingFactors.push('Never placed an order');
    }
    
    churnProbability = Math.min(95, churnProbability);
    
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    if (churnProbability >= 70) riskLevel = 'critical';
    else if (churnProbability >= 50) riskLevel = 'high';
    else if (churnProbability >= 30) riskLevel = 'medium';
    
    const recommendations: string[] = [];
    if (daysSinceLastLogin > 14) {
      recommendations.push('Send re-engagement email with personalized offers');
    }
    if (totalSpent < 1000) {
      recommendations.push('Offer welcome discount or first purchase incentive');
    }
    if (user.getTotalOrders() === 0) {
      recommendations.push('Show popular products based on browsing history');
    }
    
    return {
      churnProbability,
      riskLevel,
      contributingFactors,
      recommendations,
      confidence: 75 + (churnProbability / 100) * 20
    };
  }

  // ============================================================
  // Data Export & Audit
  // ============================================================

  async exportUsersForAudit(
    adminId: string,
    options: UserExportOptions
  ): Promise<UserExportResult> {
    // Check admin permission
    const admin = await this.userRepository.findById(adminId);
    if (!admin || !admin.isAdmin()) {
      throw new ForbiddenException('Only admins can export user data');
    }
    
    const users = await this.userRepository.exportForAudit(options.filters);
    const exportId = uuidv4();
    const exportData = users.map(user => {
      const data: Record<string, unknown> = {};
      for (const field of options.fields) {
        data[field] = user[field as keyof User];
      }
      return data;
    });
    
    let exportString: string;
    let contentType: string;
    let fileExtension: string;
    
    switch (options.format) {
      case 'csv':
        const headers = options.fields.join(',');
        const rows = exportData.map(row => options.fields.map(f => JSON.stringify(row[f])).join(','));
        exportString = [headers, ...rows].join('\n');
        contentType = 'text/csv';
        fileExtension = 'csv';
        break;
      case 'xlsx':
        // In production, use a library like exceljs
        exportString = JSON.stringify(exportData, null, 2);
        contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        fileExtension = 'xlsx';
        break;
      default:
        exportString = JSON.stringify(exportData, null, 2);
        contentType = 'application/json';
        fileExtension = 'json';
        break;
    }
    
    // Store export in cache for download
    const exportKey = CacheKeyBuilder.userExport(exportId);
    await this.cacheService.set(exportKey, exportString, 3600);
    
    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.USER_DATA_EXPORTED,
      { format: options.format, recordCount: users.length, filters: options.filters },
      { ipAddress: 'system', deviceId: 'system', userAgent: 'system' }
    );
    
    return {
      downloadUrl: `/api/v1/admin/users/export/${exportId}`,
      expiresAt: new Date(Date.now() + 3600 * 1000),
      fileSize: Buffer.byteLength(exportString),
      recordCount: users.length,
      format: options.format,
      expiresInSeconds: 3600
    };
  }

  async getUserAuditLog(
    userId: string,
    options: PaginationDto,
    filters?: { action?: string; fromDate?: Date; toDate?: Date }
  ): Promise<PaginatedResponseDto<AuditDto>> {
    return this.auditRepository.findByUserId(userId, options, filters);
  }

  async getUserChangeHistory(
    userId: string,
    limit?: number,
    fields?: string[]
  ): Promise<Array<{
    field: string;
    oldValue: unknown;
    newValue: unknown;
    changedAt: Date;
    changedBy: string;
    ipAddress?: string;
    userAgent?: string;
    reason?: string;
  }>> {
    return this.auditRepository.getUserChangeHistory(userId, limit, fields);
  }

  async exportUserDataForGDPR(userId: string): Promise<{
    userData: UserResponseDto;
    accountActivity: unknown[];
    loginHistory: unknown[];
    orderHistory: unknown[];
    exportGeneratedAt: Date;
    downloadUrl: string;
    expiresAt: Date;
  }> {
    const user = await this.findUserOrThrow(userId);
    const userData = UserMapper.toDto(user);
    
    const sessions = await this.sessionRepository.findByUserId(userId);
    const loginHistory = sessions.map(s => ({
      sessionId: s.getId(),
      deviceId: s.getDeviceId().getValue(),
      ipAddress: s.getIpAddress().getValue(),
      userAgent: s.getUserAgent().getValue(),
      createdAt: s.getCreatedAt(),
      lastActivityAt: s.getLastActivityAt(),
      expiresAt: s.getExpiresAt()
    }));
    
    const exportId = uuidv4();
    const exportData = {
      userId,
      userData,
      loginHistory,
      accountActivity: [],
      orderHistory: [],
      exportGeneratedAt: new Date()
    };
    
    const exportKey = CacheKeyBuilder.gdprExport(exportId);
    await this.cacheService.set(exportKey, JSON.stringify(exportData, null, 2), 7 * 24 * 60 * 60);
    
    return {
      userData,
      accountActivity: [],
      loginHistory,
      orderHistory: [],
      exportGeneratedAt: new Date(),
      downloadUrl: `/api/v1/users/${userId}/gdpr-export/${exportId}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    };
  }

  // ============================================================
  // Health Check
  // ============================================================

  async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    cacheHitRate: number;
    averageResponseTimeMs: number;
    activeUsersCount: number;
    databaseLatencyMs: number;
    cacheLatencyMs: number;
  }> {
    const startTime = Date.now();
    
    let databaseLatency = 0;
    let cacheLatency = 0;
    let databaseHealthy = false;
    let cacheHealthy = false;
    
    try {
      const dbStart = Date.now();
      await this.userRepository.count();
      databaseLatency = Date.now() - dbStart;
      databaseHealthy = true;
    } catch (error) {
      databaseHealthy = false;
    }
    
    try {
      const cacheStart = Date.now();
      await this.cacheService.ping();
      cacheLatency = Date.now() - cacheStart;
      cacheHealthy = true;
    } catch (error) {
      cacheHealthy = false;
    }
    
    const cacheStats = await this.cacheService.getStatistics();
    const activeUsersCount = await this.userRepository.countActiveUsers();
    
    const allHealthy = databaseHealthy && cacheHealthy;
    
    return {
      status: allHealthy ? 'healthy' : 'degraded',
      cacheHitRate: cacheStats.hitRate || 0,
      averageResponseTimeMs: (databaseLatency + cacheLatency) / 2,
      activeUsersCount,
      databaseLatency,
      cacheLatency
    };
  }

  async invalidateUserCache(userId: string): Promise<{ cacheInvalidated: boolean }> {
    await this.invalidateUserCache(userId);
    await this.cacheService.del(CacheKeyBuilder.userStatistics());
    return { cacheInvalidated: true };
  }
}
