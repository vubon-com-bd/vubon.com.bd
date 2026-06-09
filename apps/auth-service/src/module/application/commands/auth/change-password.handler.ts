/**
 * Change Password Command Handler - Application Layer (Enterprise Enhanced v5.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/change-password.handler
 * 
 * @description
 * Handles the change password use case with enterprise-grade features:
 * - Password strength validation with Bengali messages
 * - Password history check with similarity scoring
 * - Multi-language error messages (English/Bengali)
 * - Rate limiting with configurable thresholds
 * - Progressive account lockout
 * - Session revocation with audit trail
 * - Distributed tracing with correlation ID
 * - Circuit breaker pattern for notifications
 * - Bangladesh specific - Mobile operator & district tracking
 * - Compliance ready audit logging
 * 
 * @example
 * const handler = new ChangePasswordHandler(...);
 * const result = await handler.execute(command);
 */

import { Injectable, NotFoundException, UnauthorizedException, BadRequestException, ForbiddenException, Logger, Inject, forwardRef } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

// ============================================================
// Shared Packages Import (Enterprise Enhancement)
// ============================================================

import { 
  PASSWORD_POLICY,
  ACCOUNT_LOCKOUT,
  PASSWORD_HISTORY_CONFIG,
  NOTIFICATION_CONFIG,
  RATE_LIMITS,
  CIRCUIT_BREAKER_CONFIG,
  AUDIT_ACTIONS,
  BANGLADESH_DISTRICTS,
  MOBILE_OPERATORS,
  NETWORK_TYPES,
  ENV_CONFIG,
} from '@vubon/shared-constants';

import type { 
  AuditMetadata,
  PasswordStrengthResult,
  PasswordHistoryValidation,
  CircuitBreakerStatus,
  ServiceMetrics,
  NotificationOptions,
} from '@vubon/shared-types';

import { maskEmail, maskPhone, maskString, normalizePhone } from '@vubon/shared-utils';

// ============================================================
// Local Imports
// ============================================================

import { ChangePasswordCommand, AdminForceChangePasswordCommand } from './change-password.command';
import { PasswordChangedEvent, PasswordChangeType, PasswordChangeReason } from '../../events/password-changed.event';
import { LoginFailedEvent, LoginFailureReason } from '../../events/login-failed.event';
import { AccountLockedEvent, AccountLockReason } from '../../events/account-locked.event';

// ============================================================
// Infrastructure Interfaces (from shared/interfaces)
// ============================================================

import { 
  UserRepository, 
  SessionRepository, 
  PasswordHistoryRepository, 
  AccountLockRepository,
  PasswordHasher,
  EventBus,
  TransactionManager,
  NotificationService,
  AuditService,
  CacheService,
  MetricsService,
  TracerService,
  RateLimiter,
} from './infrastructure.interface';

// ============================================================
// Constants (Using shared-constants)
// ============================================================

const IS_PRODUCTION = ENV_CONFIG?.IS_PRODUCTION ?? false;

const CHANGE_PASSWORD_CONFIG = {
  MAX_DAILY_CHANGES: RATE_LIMITS?.PASSWORD_CHANGE?.MAX_REQUESTS_PER_DAY ?? 3,
  PREVENT_REUSE_COUNT: PASSWORD_HISTORY_CONFIG?.PREVENT_REUSE_COUNT ?? 5,
  MAX_FAILED_ATTEMPTS: ACCOUNT_LOCKOUT?.MAX_FAILED_ATTEMPTS ?? 5,
  LOCKOUT_DURATION_MINUTES: (ACCOUNT_LOCKOUT?.LOCKOUT_DURATION_SECONDS ?? 900) / 60,
  MAX_SIMILARITY_SCORE: 85, // Percentage threshold for similar passwords
  MIN_STRENGTH_LEVEL: 'medium' as const,
  RETRY_MAX_ATTEMPTS: 3,
  RETRY_BASE_DELAY_MS: 100,
  CIRCUIT_BREAKER_TIMEOUT_MS: CIRCUIT_BREAKER_CONFIG?.TIMEOUT_MS ?? 10000,
  CIRCUIT_BREAKER_ERROR_THRESHOLD: CIRCUIT_BREAKER_CONFIG?.ERROR_THRESHOLD_PERCENTAGE ?? 50,
  CIRCUIT_BREAKER_RESET_TIMEOUT_MS: CIRCUIT_BREAKER_CONFIG?.RESET_TIMEOUT_MS ?? 30000,
  NOTIFICATION_RETRY_ATTEMPTS: NOTIFICATION_CONFIG?.RETRY_ATTEMPTS ?? 3,
  NOTIFICATION_RETRY_DELAY_MS: NOTIFICATION_CONFIG?.RETRY_DELAY_MS ?? 1000,
} as const;

const strengthLevels = ['very_weak', 'weak', 'medium', 'strong', 'very_strong'];
const minStrengthIndex = strengthLevels.indexOf(CHANGE_PASSWORD_CONFIG.MIN_STRENGTH_LEVEL);

// ============================================================
// Bengali Strength Level Mapping
// ============================================================

const BENGALI_STRENGTH_LEVELS: Record<string, string> = {
  'very_weak': 'খুব দুর্বল',
  'weak': 'দুর্বল',
  'medium': 'মাঝারি',
  'strong': 'শক্তিশালী',
  'very_strong': 'খুব শক্তিশালী',
};

// ============================================================
// Bengali Error Messages
// ============================================================

const BENGALI_ERROR_MESSAGES = {
  ACCOUNT_LOCKED: (minutes: number) => `একাধিক ব্যর্থ চেষ্টার কারণে অ্যাকাউন্টটি ${minutes} মিনিটের জন্য লক করা হয়েছে।`,
  PASSWORD_CHANGE_LIMIT: (max: number) => `আপনি নিরাপত্তার কারণে প্রতিদিন সর্বোচ্চ ${max} বার পাসওয়ার্ড পরিবর্তন করতে পারবেন। আগামীকাল আবার চেষ্টা করুন।`,
  PASSWORD_REUSE: (count: number) => `আপনার শেষ ${count}টি পাসওয়ার্ডের মধ্যে একটি পুনরায় ব্যবহার করা যাবে না। অনুগ্রহ করে একটি নতুন পাসওয়ার্ড নির্বাচন করুন।`,
  PASSWORD_TOO_WEAK: (required: string, suggestions?: string[]) => {
    let msg = `পাসওয়ার্ডের শক্তি কমপক্ষে ${BENGALI_STRENGTH_LEVELS[required]} হতে হবে।`;
    if (suggestions?.length) {
      msg += ` পরামর্শ: ${suggestions.join(', ')}`;
    }
    return msg;
  },
  CURRENT_PASSWORD_INCORRECT: (remaining: number) => `বর্তমান পাসওয়ার্ড ভুল। ${remaining} বার চেষ্টা বাকি আছে।`,
  ACCOUNT_DELETED: 'অ্যাকাউন্টটি মুছে ফেলা হয়েছে।',
  ACCOUNT_SUSPENDED: 'অ্যাকাউন্টটি স্থগিত করা হয়েছে।',
  USER_NOT_FOUND: 'ইউজার পাওয়া যায়নি।',
  INVALID_PASSWORD_FORMAT: 'ভুল পাসওয়ার্ড ফরম্যাট।',
  NOTIFICATION_FAILED: 'নোটিফিকেশন পাঠাতে ব্যর্থ হয়েছে, কিন্তু আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।',
};

// ============================================================
// Circuit Breaker for External Services (Enterprise Pattern)
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
  private successes: number = 0;

  private constructor(
    private readonly name: string,
    private readonly failureThreshold: number = CHANGE_PASSWORD_CONFIG.CIRCUIT_BREAKER_ERROR_THRESHOLD,
    private readonly timeoutMs: number = CHANGE_PASSWORD_CONFIG.CIRCUIT_BREAKER_TIMEOUT_MS,
    private readonly successThreshold: number = 3
  ) {
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
        throw new Error(`Circuit breaker ${this.name} is OPEN. Service temporarily unavailable.`);
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

  getStatus(): CircuitBreakerStatus {
    return {
      state: this.state.state,
      failures: this.state.failures,
      nextAttemptAt: this.state.nextAttemptTime ? new Date(this.state.nextAttemptTime) : undefined,
    };
  }

  reset(): void {
    this.state = {
      failures: 0,
      lastFailureTime: 0,
      state: 'CLOSED',
      nextAttemptTime: 0,
    };
    this.successes = 0;
  }
}

// ============================================================
// Retry Helper with Exponential Backoff
// ============================================================

async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = CHANGE_PASSWORD_CONFIG.RETRY_MAX_ATTEMPTS,
  baseDelayMs: number = CHANGE_PASSWORD_CONFIG.RETRY_BASE_DELAY_MS,
  backoffMultiplier: number = 2
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        break;
      }

      const delay = baseDelayMs * Math.pow(backoffMultiplier, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// ============================================================
// Similarity Score Calculator (Enterprise Feature)
// ============================================================

class PasswordSimilarityCalculator {
  /**
   * Calculate similarity score between two passwords (0-100)
   * Uses Levenshtein distance and character set analysis
   */
  static calculateSimilarity(password1: string, password2: string): number {
    const normalized1 = password1.toLowerCase();
    const normalized2 = password2.toLowerCase();
    
    // Exact match
    if (normalized1 === normalized2) return 100;
    
    // Calculate Levenshtein distance
    const distance = this.levenshteinDistance(normalized1, normalized2);
    const maxLength = Math.max(normalized1.length, normalized2.length);
    const similarity = (1 - distance / maxLength) * 100;
    
    // Character set overlap
    const charSet1 = new Set(normalized1);
    const charSet2 = new Set(normalized2);
    const intersection = new Set([...charSet1].filter(x => charSet2.has(x)));
    const charSimilarity = (intersection.size / Math.max(charSet1.size, charSet2.size)) * 100;
    
    // Weighted average (60% distance, 40% character set)
    return Math.round(similarity * 0.6 + charSimilarity * 0.4);
  }
  
  private static levenshteinDistance(a: string, b: string): number {
    const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
    
    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    return matrix[b.length][a.length];
  }
}

// ============================================================
// Change Password Handler (Enterprise Enhanced v5.0)
// ============================================================

@Injectable()
export class ChangePasswordHandler {
  private readonly logger = new Logger(ChangePasswordHandler.name);
  private readonly notificationCircuitBreaker = CircuitBreaker.getInstance('notification');
  
  // Performance metrics
  private metrics: ServiceMetrics = {
    totalExecutions: 0,
    successfulExecutions: 0,
    failedExecutions: 0,
    totalDurationMs: 0,
    averageDurationMs: 0,
    lastExecutionAt: undefined,
    errorRate: 0,
  };

  constructor(
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => SessionRepository))
    private readonly sessionRepository: SessionRepository,
    @Inject(forwardRef(() => PasswordHistoryRepository))
    private readonly passwordHistoryRepository: PasswordHistoryRepository,
    @Inject(forwardRef(() => AccountLockRepository))
    private readonly accountLockRepository: AccountLockRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly eventBus: EventBus,
    private readonly transactionManager: TransactionManager,
    private readonly notificationService: NotificationService,
    private readonly auditService: AuditService,
    private readonly cacheService: CacheService,
    private readonly metricsService: MetricsService,
    private readonly tracerService: TracerService,
    private readonly rateLimiter: RateLimiter,
  ) {}

  // ============================================================
  // Main Execute Method (User-initiated)
  // ============================================================

  async execute(command: ChangePasswordCommand): Promise<{ success: boolean; sessionsRevoked?: number; warning?: string }> {
    const startTime = Date.now();
    const span = this.tracerService?.startSpan('ChangePasswordHandler.execute');
    const correlationId = command.correlationId || uuidv4();

    this.metrics.totalExecutions++;
    this.metrics.lastExecutionAt = new Date();
    this.metricsService?.incrementCounter('password.change.attempted');

    try {
      // Add trace attributes
      this.addTraceAttributes(span, command, correlationId);

      // Get locale for messages
      const locale = this.getLocale(command);

      // 1. Check if account is locked
      await this.checkAccountLock(command.userId, locale);

      // 2. Rate limiting check
      await this.checkRateLimiting(command.userId, locale);

      // 3. Find user
      const user = await this.findUserOrThrow(command.userId, locale);

      // 4. Verify current password (unless skipped for reset flow)
      if (!command.skipCurrentPasswordValidation) {
        await this.verifyCurrentPassword(user, command.currentPassword, command.deviceInfo, correlationId, locale);
      }

      // 5. Validate new password with strength check
      const newPassword = await this.validateNewPassword(command.userId, command.newPassword, command.deviceInfo, locale);

      // 6. Check password history (prevent reuse with similarity scoring)
      await this.checkPasswordHistory(command.userId, newPassword, command.deviceInfo, locale);

      // 7. Hash new password
      const hashedPassword = await this.passwordHasher.hash(newPassword.getValue());

      // 8. Execute password change with transaction
      let sessionsRevoked = 0;
      let warning: string | undefined;

      await this.transactionManager.runInTransaction(async () => {
        // Update password in domain
        user.changePassword(new Password(hashedPassword));
        await this.userRepository.save(user);

        // Add to password history
        await this.passwordHistoryRepository.add(command.userId, hashedPassword);

        // Revoke sessions (except current if provided)
        if (command.logoutOtherDevices) {
          if (command.deviceInfo?.sessionId) {
            sessionsRevoked = await this.sessionRepository.revokeAllExceptCurrent(
              command.userId,
              command.deviceInfo.sessionId,
              'Password changed'
            );
          } else {
            sessionsRevoked = await this.sessionRepository.revokeAllByUserId(command.userId, 'Password changed');
          }
        }

        // Reset failed attempts on successful change
        await this.accountLockRepository.resetFailureCountForUser(command.userId);
      });

      // 9. Invalidate cache
      await this.invalidateUserCache(command.userId);

      // 10. Send notification with circuit breaker
      let notificationSent = false;
      if (command.sendNotification) {
        await this.sendPasswordChangeNotification(user, command, correlationId, locale);
        notificationSent = true;
      }

      // 11. Publish domain event
      await this.eventBus.publish(
        new PasswordChangedEvent(
          command.userId,
          command.isAdminInitiated() ? PasswordChangeType.ADMIN_FORCE : PasswordChangeType.USER_CHANGE,
          command.reason === 'reset' ? PasswordChangeReason.PASSWORD_RESET : PasswordChangeReason.USER_INITIATED,
          correlationId,
          command.adminId,
          command.deviceInfo?.deviceId,
          command.deviceInfo?.ipAddress,
          command.deviceInfo?.userAgent,
          command.deviceInfo?.district,
          `Password changed. Sessions revoked: ${sessionsRevoked}`,
          command.deviceInfo?.mobileOperator,
          command.deviceInfo?.networkType
        )
      );

      // 12. Audit log with Bengali support
      await this.auditService.security(
        AUDIT_ACTIONS.PASSWORD_CHANGED,
        command.userId,
        {
          adminId: command.adminId,
          reason: command.reason,
          logoutOtherDevices: command.logoutOtherDevices,
          sessionsRevoked,
          notificationSent,
          isAdminInitiated: command.isAdminInitiated(),
          isResetFlow: command.isResetFlow(),
        },
        {
          ipAddress: command.deviceInfo?.ipAddress,
          deviceId: command.deviceInfo?.deviceId,
          userAgent: command.deviceInfo?.userAgent,
          district: command.deviceInfo?.district,
          upazila: command.deviceInfo?.upazila,
          mobileOperator: command.deviceInfo?.mobileOperator,
          networkType: command.deviceInfo?.networkType,
        }
      );

      // Record success metrics
      this.metrics.successfulExecutions++;
      this.metrics.totalDurationMs += Date.now() - startTime;
      this.updateMetrics(true);
      this.metricsService?.incrementCounter('password.change.successful');
      this.metricsService?.recordHistogram('password.change.duration', Date.now() - startTime);

      // Check if password is about to expire (warning)
      const passwordAge = await this.passwordHistoryRepository.getLastChangeAge(command.userId);
      const daysUntilExpiry = 90 - passwordAge; // 90 days expiry policy
      if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
        warning = `Your password will expire in ${daysUntilExpiry} days. Please change it soon.`;
      }

      span?.setStatus({ code: 0, message: 'Success' });
      span?.end();

      return { success: true, sessionsRevoked, warning };
    } catch (error) {
      // Record failure metrics
      this.metrics.failedExecutions++;
      this.metrics.totalDurationMs += Date.now() - startTime;
      this.updateMetrics(false);
      this.metricsService?.incrementCounter('password.change.failed');
      this.metricsService?.incrementCounter(`password.change.error.${this.getErrorCode(error)}`);

      span?.setStatus({ code: 2, message: error.message });
      span?.setAttribute('error.code', this.getErrorCode(error));
      span?.setAttribute('error.message', error.message);
      span?.end();

      throw error;
    }
  }

  // ============================================================
  // Admin Force Change Password
  // ============================================================

  async executeAdminForce(command: AdminForceChangePasswordCommand): Promise<{ success: boolean; temporaryPassword: string }> {
    const startTime = Date.now();
    const span = this.tracerService?.startSpan('ChangePasswordHandler.executeAdminForce');
    const correlationId = command.correlationId || uuidv4();

    try {
      // 1. Verify admin has permission
      const admin = await this.userRepository.findById(command.adminId);
      if (!admin || !admin.isAdmin()) {
        throw new ForbiddenException('Admin privileges required');
      }

      // 2. Find target user
      const user = await this.findUserOrThrow(command.targetUserId, 'en');

      // 3. Validate new password
      const newPassword = await this.validateNewPassword(command.targetUserId, command.newPassword, command.deviceInfo, 'en');

      // 4. Hash new password
      const hashedPassword = await this.passwordHasher.hash(newPassword.getValue());

      // 5. Execute force password change
      let sessionsRevoked = 0;

      await this.transactionManager.runInTransaction(async () => {
        // Update password
        user.changePassword(new Password(hashedPassword));
        await this.userRepository.save(user);

        // Add to history
        await this.passwordHistoryRepository.add(command.targetUserId, hashedPassword);

        // Revoke all sessions if requested
        if (command.revokeSessions) {
          sessionsRevoked = await this.sessionRepository.revokeAllByUserId(
            command.targetUserId,
            `Admin forced password change: ${command.reason || 'Security policy'}`
          );
        }
      });

      // 6. Invalidate cache
      await this.invalidateUserCache(command.targetUserId);

      // 7. Publish event
      await this.eventBus.publish(
        new PasswordChangedEvent(
          command.targetUserId,
          PasswordChangeType.ADMIN_FORCE,
          PasswordChangeReason.ADMIN_FORCED,
          correlationId,
          command.adminId,
          command.deviceInfo?.deviceId,
          command.deviceInfo?.ipAddress,
          command.deviceInfo?.userAgent,
          command.deviceInfo?.district,
          `Admin forced password change. Reason: ${command.reason || 'Not specified'}. Sessions revoked: ${sessionsRevoked}`,
          command.deviceInfo?.mobileOperator,
          command.deviceInfo?.networkType
        )
      );

      // 8. Send notification to user with retry
      if (command.notifyUser) {
        await withRetry(
          () => this.notificationService.sendPasswordResetEmail(
            command.targetUserId,
            user.getEmail().getValue(),
            user.getFullName(),
            {
              isAdminReset: true,
              adminName: admin.getFullName(),
              requireChangeOnNextLogin: command.requireChangeOnNextLogin,
            },
            { locale: 'bn' }
          ),
          CHANGE_PASSWORD_CONFIG.NOTIFICATION_RETRY_ATTEMPTS,
          CHANGE_PASSWORD_CONFIG.NOTIFICATION_RETRY_DELAY_MS
        ).catch(err => {
          this.logger.warn(`Failed to send notification to ${maskEmail(user.getEmail().getValue())}: ${err.message}`);
        });
      }

      // 9. Audit log
      await this.auditService.security(
        AUDIT_ACTIONS.PASSWORD_FORCED_CHANGE,
        command.targetUserId,
        {
          adminId: command.adminId,
          adminEmail: admin.getEmail().getValue(),
          reason: command.reason,
          requireChangeOnNextLogin: command.requireChangeOnNextLogin,
          revokeSessions: command.revokeSessions,
          sessionsRevoked,
          notifyUser: command.notifyUser,
        },
        {
          ipAddress: command.deviceInfo?.ipAddress,
          deviceId: command.deviceInfo?.deviceId,
          userAgent: command.deviceInfo?.userAgent,
        }
      );

      // Record metrics
      this.metricsService?.incrementCounter('password.force.change.successful');
      this.metricsService?.recordHistogram('password.force.change.duration', Date.now() - startTime);

      span?.setStatus({ code: 0, message: 'Success' });
      span?.end();

      return { success: true, temporaryPassword: command.newPassword };
    } catch (error) {
      this.metricsService?.incrementCounter('password.force.change.failed');
      span?.setStatus({ code: 2, message: error.message });
      span?.end();
      throw error;
    }
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  private getLocale(command: ChangePasswordCommand): 'en' | 'bn' {
    return command.deviceInfo?.language === 'bn' ? 'bn' : 'en';
  }

  private getBengaliStrengthLevel(level: string): string {
    return BENGALI_STRENGTH_LEVELS[level] || level;
  }

  private async findUserOrThrow(userId: string, locale: 'en' | 'bn'): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      const message = locale === 'bn' ? BENGALI_ERROR_MESSAGES.USER_NOT_FOUND : `User with ID ${userId} not found`;
      throw new NotFoundException(message);
    }
    if (user.isDeleted()) {
      const message = locale === 'bn' ? BENGALI_ERROR_MESSAGES.ACCOUNT_DELETED : 'Account has been deleted';
      throw new UnauthorizedException(message);
    }
    if (user.isSuspended()) {
      const message = locale === 'bn' ? BENGALI_ERROR_MESSAGES.ACCOUNT_SUSPENDED : 'Account is suspended';
      throw new UnauthorizedException(message);
    }
    return user;
  }

  private async checkAccountLock(userId: string, locale: 'en' | 'bn'): Promise<void> {
    const lockStatus = await this.accountLockRepository.getLockStatus(userId);
    if (lockStatus.isLocked) {
      const minutes = Math.ceil(lockStatus.remainingLockTime / 60);
      const message = locale === 'bn' 
        ? BENGALI_ERROR_MESSAGES.ACCOUNT_LOCKED(minutes)
        : `Account is locked. Please try again in ${minutes} minutes`;
      throw new UnauthorizedException(message);
    }
  }

  private async checkRateLimiting(userId: string, locale: 'en' | 'bn'): Promise<void> {
    const changesToday = await this.passwordHistoryRepository.countChangesInLast24Hours(userId);
    
    if (changesToday >= CHANGE_PASSWORD_CONFIG.MAX_DAILY_CHANGES) {
      const message = locale === 'bn'
        ? BENGALI_ERROR_MESSAGES.PASSWORD_CHANGE_LIMIT(CHANGE_PASSWORD_CONFIG.MAX_DAILY_CHANGES)
        : `You have exceeded the maximum of ${CHANGE_PASSWORD_CONFIG.MAX_DAILY_CHANGES} password changes per day for security reasons. Please try again tomorrow.`;
      throw new BadRequestException(message);
    }
  }

  private async verifyCurrentPassword(
    user: User, 
    currentPassword: string, 
    deviceInfo: ChangePasswordCommand['deviceInfo'],
    correlationId: string,
    locale: 'en' | 'bn'
  ): Promise<void> {
    const isValid = await this.passwordHasher.compare(
      currentPassword,
      user.getPassword().getValue()
    );
    
    if (!isValid) {
      // Increment failure count
      const failureCount = await this.accountLockRepository.incrementFailureCountForUser(user.getId());
      const remainingAttempts = Math.max(0, CHANGE_PASSWORD_CONFIG.MAX_FAILED_ATTEMPTS - failureCount);
      
      // Audit failed attempt
      await this.auditService.warn(
        AUDIT_ACTIONS.PASSWORD_CHANGE_FAILED,
        user.getId(),
        { reason: 'Invalid current password', remainingAttempts },
        {
          ipAddress: deviceInfo?.ipAddress,
          deviceId: deviceInfo?.deviceId,
          userAgent: deviceInfo?.userAgent,
          district: deviceInfo?.district,
        }
      );
      
      // Publish failed event
      await this.eventBus.publish(
        new LoginFailedEvent(
          user.getId(),
          user.getEmail().getValue(),
          LoginFailureReason.INVALID_PASSWORD,
          deviceInfo?.ipAddress,
          deviceInfo?.userAgent,
          deviceInfo?.deviceId,
          remainingAttempts
        )
      );
      
      // Lock account if max attempts reached
      if (failureCount >= CHANGE_PASSWORD_CONFIG.MAX_FAILED_ATTEMPTS) {
        await this.accountLockRepository.lockAccount(user.getId(), AccountLockReason.TOO_MANY_FAILED_ATTEMPTS);
        await this.eventBus.publish(
          new AccountLockedEvent(
            user.getId(),
            AccountLockReason.TOO_MANY_FAILED_ATTEMPTS,
            CHANGE_PASSWORD_CONFIG.LOCKOUT_DURATION_MINUTES
          )
        );
        
        const message = locale === 'bn'
          ? BENGALI_ERROR_MESSAGES.ACCOUNT_LOCKED(CHANGE_PASSWORD_CONFIG.LOCKOUT_DURATION_MINUTES)
          : `Account locked due to too many failed attempts. Please try again in ${CHANGE_PASSWORD_CONFIG.LOCKOUT_DURATION_MINUTES} minutes`;
        throw new UnauthorizedException(message);
      }
      
      const message = locale === 'bn'
        ? BENGALI_ERROR_MESSAGES.CURRENT_PASSWORD_INCORRECT(remainingAttempts)
        : `Current password is incorrect. ${remainingAttempts} attempts remaining`;
      throw new UnauthorizedException(message);
    }
    
    // Reset failure count on successful verification
    await this.accountLockRepository.resetFailureCountForUser(user.getId());
  }

  private async validateNewPassword(
    userId: string,
    newPasswordRaw: string,
    deviceInfo: ChangePasswordCommand['deviceInfo'],
    locale: 'en' | 'bn'
  ): Promise<Password> {
    let newPassword: Password;
    
    try {
      newPassword = new Password(newPasswordRaw);
    } catch (error) {
      const message = locale === 'bn' 
        ? BENGALI_ERROR_MESSAGES.INVALID_PASSWORD_FORMAT
        : error instanceof Error ? error.message : 'Invalid password format';
      throw new BadRequestException(message);
    }
    
    // Check password strength with detailed validation
    const validation = Password.validate(newPasswordRaw);
    if (!validation.isValid) {
      const errorMessage = locale === 'bn' && validation.errorsBn?.length
        ? validation.errorsBn.join(', ')
        : validation.errors.join(', ');
      throw new BadRequestException(errorMessage);
    }
    
    // Check if password meets minimum strength requirement
    const strengthIndex = strengthLevels.indexOf(validation.strength);
    if (strengthIndex < minStrengthIndex) {
      const suggestions = locale === 'bn' ? validation.suggestionsBn : validation.suggestions;
      const message = locale === 'bn'
        ? BENGALI_ERROR_MESSAGES.PASSWORD_TOO_WEAK(CHANGE_PASSWORD_CONFIG.MIN_STRENGTH_LEVEL, suggestions)
        : `Password strength must be at least ${CHANGE_PASSWORD_CONFIG.MIN_STRENGTH_LEVEL}. ${suggestions?.join(', ') || 'Please choose a stronger password.'}`;
      throw new BadRequestException(message);
    }
    
    return newPassword;
  }

  private async checkPasswordHistory(
    userId: string, 
    newPassword: Password,
    deviceInfo: ChangePasswordCommand['deviceInfo'],
    locale: 'en' | 'bn'
  ): Promise<void> {
    const recentPasswords = await this.passwordHistoryRepository.getRecent(userId, CHANGE_PASSWORD_CONFIG.PREVENT_REUSE_COUNT);
    let warning: string | undefined;
    
    for (let i = 0; i < recentPasswords.length; i++) {
      const oldPasswordHash = recentPasswords[i];
      const isReused = await this.passwordHasher.compare(newPassword.getValue(), oldPasswordHash);
      
      if (isReused) {
        const message = locale === 'bn'
          ? BENGALI_ERROR_MESSAGES.PASSWORD_REUSE(CHANGE_PASSWORD_CONFIG.PREVENT_REUSE_COUNT)
          : `Cannot reuse one of your last ${CHANGE_PASSWORD_CONFIG.PREVENT_REUSE_COUNT} passwords. Please choose a new password.`;
        throw new BadRequestException(message);
      }
      
      // Check similarity score for near-matches
      const oldPassword = await this.passwordHistoryRepository.getPasswordByHash(userId, oldPasswordHash);
      if (oldPassword) {
        const similarity = PasswordSimilarityCalculator.calculateSimilarity(newPassword.getValue(), oldPassword);
        if (similarity >= CHANGE_PASSWORD_CONFIG.MAX_SIMILARITY_SCORE) {
          const message = locale === 'bn'
            ? `আপনার নতুন পাসওয়ার্ডটি পূর্ববর্তী একটি পাসওয়ার্ডের সাথে ${similarity}% মিল রয়েছে। দয়া করে আরও আলাদা পাসওয়ার্ড নির্বাচন করুন।`
            : `Your new password is ${similarity}% similar to a previous password. Please choose a more different password.`;
          throw new BadRequestException(message);
        }
      }
    }
  }

  private async sendPasswordChangeNotification(
    user: User,
    command: ChangePasswordCommand,
    correlationId: string,
    locale: 'en' | 'bn'
  ): Promise<void> {
    try {
      await this.notificationCircuitBreaker.call(async () =>
        withRetry(
          () => this.notificationService.sendPasswordChangedNotification(
            command.userId,
            user.getEmail().getValue(),
            user.getFullName(),
            {
              deviceName: command.deviceInfo?.deviceId,
              location: command.deviceInfo?.district,
              ipAddress: command.deviceInfo?.ipAddress,
              time: new Date(),
            },
            { locale, correlationId }
          ),
          CHANGE_PASSWORD_CONFIG.NOTIFICATION_RETRY_ATTEMPTS,
          CHANGE_PASSWORD_CONFIG.NOTIFICATION_RETRY_DELAY_MS
        )
      );
    } catch (error) {
      // Log but don't throw - notification failure shouldn't block password change
      this.logger.warn(`Failed to send password change notification to ${maskEmail(user.getEmail().getValue())}: ${error.message}`);
      await this.auditService.warn(
        AUDIT_ACTIONS.NOTIFICATION_FAILED,
        command.userId,
        { reason: 'Password change notification failed', error: error.message },
        { correlationId }
      );
    }
  }

  private async invalidateUserCache(userId: string): Promise<void> {
    await this.cacheService.delPattern(`user:${userId}:*`);
    await this.cacheService.delPattern(`session:user:${userId}:*`);
    await this.cacheService.delPattern(`permission:user:${userId}:*`);
  }

  private addTraceAttributes(span: unknown, command: ChangePasswordCommand, correlationId: string): void {
    const setAttribute = (key: string, value: unknown) => {
      if (span && typeof (span as any).setAttribute === 'function') {
        (span as any).setAttribute(key, value);
      }
    };

    setAttribute('command.id', command.commandId);
    setAttribute('correlation.id', correlationId);
    setAttribute('user.id', command.getMaskedUserId());
    setAttribute('is.admin.initiated', command.isAdminInitiated());
    setAttribute('is.reset.flow', command.isResetFlow());
    setAttribute('is.scheduled', command.isScheduled());
    setAttribute('logout.other.devices', command.logoutOtherDevices);
    setAttribute('send.notification', command.sendNotification);
    setAttribute('prevent.reuse', command.preventReuse);
    setAttribute('has.device.info', !!command.deviceInfo);
    setAttribute('district', command.deviceInfo?.district || 'unknown');
    setAttribute('mobile.operator', command.deviceInfo?.mobileOperator || 'unknown');
    setAttribute('network.type', command.deviceInfo?.networkType || 'unknown');
  }

  private getErrorCode(error: unknown): string {
    if (error instanceof NotFoundException) return 'NOT_FOUND';
    if (error instanceof UnauthorizedException) return 'UNAUTHORIZED';
    if (error instanceof BadRequestException) return 'BAD_REQUEST';
    if (error instanceof ForbiddenException) return 'FORBIDDEN';
    return 'INTERNAL_ERROR';
  }

  private updateMetrics(success: boolean): void {
    this.metrics.averageDurationMs = this.metrics.totalDurationMs / this.metrics.totalExecutions;
    this.metrics.errorRate = (this.metrics.failedExecutions / this.metrics.totalExecutions) * 100;
  }

  // ============================================================
  // Public Metrics & Health Methods
  // ============================================================

  getMetrics(): ServiceMetrics {
    return { ...this.metrics };
  }

  getCircuitBreakerStatus(): CircuitBreakerStatus {
    return this.notificationCircuitBreaker.getStatus();
  }

  resetCircuitBreaker(): void {
    this.notificationCircuitBreaker.reset();
  }

  resetMetrics(): void {
    this.metrics = {
      totalExecutions: 0,
      successfulExecutions: 0,
      failedExecutions: 0,
      totalDurationMs: 0,
      averageDurationMs: 0,
      lastExecutionAt: undefined,
      errorRate: 0,
    };
  }

  async healthCheck(): Promise<{ healthy: boolean; latency: number; error?: string }> {
    const startTime = Date.now();
    try {
      await this.cacheService.ping();
      const latency = Date.now() - startTime;
      return { 
        healthy: true, 
        latency,
        circuitBreaker: this.notificationCircuitBreaker.getStatus().state,
      } as any;
    } catch (error) {
      return {
        healthy: false,
        latency: Date.now() - startTime,
        error: (error as Error).message,
      };
    }
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { ServiceMetrics, CircuitBreakerStatus };
