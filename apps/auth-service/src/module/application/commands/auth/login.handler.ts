/**
 * Login Command Handler - Application Layer (Enterprise Grade v4.0)
 * 
 * @module application/commands/auth/login.handler
 * 
 * @description
 * Handles user login use case with enterprise-grade security features:
 * - MFA support (TOTP, SMS, WhatsApp, bKash PIN, Nagad PIN, Rocket PIN)
 * - Progressive account lockout
 * - Device fingerprinting and trust management
 * - Suspicious activity detection (location, device, time-based)
 * - Circuit breaker pattern for resilience
 * - Bulk rate limiting for DDoS protection
 * - Idempotency for duplicate request prevention
 * - Distributed tracing with OpenTelemetry
 * - Multi-language error messages (English/Bengali)
 * 
 * @example
 * const handler = new LoginCommandHandler(authService, metricsService, tracerService);
 * const result = await handler.execute(loginCommand);
 */

import { Injectable, UnauthorizedException, BadRequestException, Logger, Inject, Scope } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CircuitBreaker } from 'opossum';

// ============================================================
// Domain & Application Imports
// ============================================================

import { LoginCommand, PhoneLoginCommand, OtpLoginCommand } from './login.command';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import { AccountLockRepository } from '../../../domain/repositories/account-lock.repository.interface';
import { DeviceRepository } from '../../../domain/repositories/device.repository.interface';

import { User } from '../../../domain/entities/user.entity';
import { Session } from '../../../domain/entities/session.entity';
import { RefreshToken } from '../../../domain/entities/refresh-token.entity';
import { AccountLock, AccountLockReason, LockLevel } from '../../../domain/entities/account-lock.entity';
import { Device, DeviceTrustLevel } from '../../../domain/entities/device.entity';

import { Email } from '../../../domain/value-objects/email.vo';
import { Phone } from '../../../domain/value-objects/phone.vo';
import { Token, TokenType } from '../../../domain/value-objects/token.vo';
import { IpAddress } from '../../../domain/value-objects/ip-address.vo';
import { UserAgent } from '../../../domain/value-objects/user-agent.vo';
import { DeviceId } from '../../../domain/value-objects/device-id.vo';

// ============================================================
// DTO & Service Imports
// ============================================================

import { LoginResponseDto, MFARequiredResponseDto } from '../../dtos/auth/login.dto';
import { LoginOptions, DeviceInfo, ServiceResult } from '../../services/interfaces/auth.service.interface';
import { ICommandHandler, CommandResult, ValidationResult } from '../interfaces/command-handler.interface';

// ============================================================
// Event Imports
// ============================================================

import { UserLoggedInEvent, LoginMethod, LoginType } from '../../events/user-logged-in.event';
import { LoginFailedEvent, LoginFailureReason } from '../../events/login-failed.event';
import { AccountLockedEvent, AccountLockReason as LockReason, AccountLockMethod, AccountLockSource } from '../../events/account-locked.event';
import { DeviceTrustedEvent } from '../../events/device-trusted.event';
import { SuspiciousActivityEvent } from '../../events/suspicious-activity.event';

// ============================================================
// Infrastructure Imports
// ============================================================

import { PasswordHasher, TokenGenerator, EventBus, TransactionManager, RateLimiter, AuditService, SecurityService, CacheService, IdGenerator, MfaGenerator, NotificationService } from '../interfaces/infrastructure.interface';
import { MetricsService } from '../../../infrastructure/metrics/metrics.service';
import { TracerService } from '../../../infrastructure/tracing/tracer.service';
import { RateLimitService } from '../../../infrastructure/rate-limit/rate-limit.service';
import { ValidationCacheService } from '../../../infrastructure/cache/validation-cache.service';

// ============================================================
// Domain Errors
// ============================================================

import { AccountLockedError, MFASessionNotFoundError, InvalidOTPError, RateLimitExceededError } from '../../../domain/errors/domain-errors';

// ============================================================
// Shared Packages
// ============================================================

import { RATE_LIMIT_CONFIG, CIRCUIT_BREAKER_CONFIG, METRICS_CONFIG, VALIDATION_CACHE_CONFIG } from '@vubon/shared-constants';
import type { LoginMethod as SharedLoginMethod, ServiceMetrics, CircuitBreakerStatus, BulkRateLimitInfo } from '@vubon/shared-types';
import { maskEmail, maskPhone, normalizePhone, isValidBdMobile } from '@vubon/shared-utils';

// ============================================================
// Constants
// ============================================================

const LOGIN_CONFIG = {
  MAX_FAILED_ATTEMPTS: 5,
  PROGRESSIVE_LOCKOUT: true,
  SESSION_DURATION_REMEMBER_MS: 30 * 24 * 60 * 60 * 1000,      // 30 days
  SESSION_DURATION_DEFAULT_MS: 24 * 60 * 60 * 1000,            // 24 hours
  SESSION_DURATION_MOBILE_MS: 7 * 24 * 60 * 60 * 1000,         // 7 days for mobile
  ACCESS_TOKEN_EXPIRY_SECONDS: 900,                            // 15 minutes
  REFRESH_TOKEN_EXPIRY_SECONDS: 7 * 24 * 60 * 60,              // 7 days
  RATE_LIMIT_MAX_ATTEMPTS: 10,
  RATE_LIMIT_WINDOW_MINUTES: 15,
  DEVICE_TRUST_DURATION_DAYS: 30,
  MAX_CONCURRENT_SESSIONS: 5,
  SUSPICIOUS_HOUR_START: 22,                                   // 10 PM
  SUSPICIOUS_HOUR_END: 6,                                      // 6 AM
  BULK_TRACKING_WINDOW_MS: 60000,                              // 1 minute
  IDEMPOTENCY_TTL_MS: 60000,                                   // 1 minute
  CIRCUIT_BREAKER_TIMEOUT_MS: 10000,
  CIRCUIT_BREAKER_ERROR_THRESHOLD: 50,
  CIRCUIT_BREAKER_RESET_TIMEOUT_MS: 30000,
} as const;

// ============================================================
// Types
// ============================================================

export interface BulkRateLimitEntry {
  ipAddress: string;
  attempts: number;
  firstAttemptAt: Date;
  lastAttemptAt: Date;
  userIds: Set<string>;
  isBlocked: boolean;
  blockedUntil?: Date;
}

export interface IdempotencyRecord {
  key: string;
  result: unknown;
  expiresAt: Date;
}

export interface ValidationCacheEntry {
  isValid: boolean;
  timestamp: number;
  errors?: string[];
}

export interface LoginProcessResult {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    phoneNumber?: string | null;
    fullName: string;
    displayName?: string;
    role: string;
    tier: string;
    tierDiscount?: number;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    mfaEnabled: boolean;
    avatar?: string | null;
  };
  mfaRequired?: boolean;
  mfaSessionId?: string;
  mfaMethods?: string[];
}

// ============================================================
// Custom Exceptions
// ============================================================

export class AccountLockedException extends UnauthorizedException {
  constructor(remainingMinutes: number, lockLevel: LockLevel) {
    super(`Account is locked. Please try again in ${remainingMinutes} minutes.`);
    this.name = 'AccountLockedException';
  }
}

export class TooManyRequestsException extends UnauthorizedException {
  constructor(message: string) {
    super(message);
    this.name = 'TooManyRequestsException';
  }
}

export class MFASessionExpiredException extends UnauthorizedException {
  constructor() {
    super('MFA session has expired. Please login again.');
    this.name = 'MFASessionExpiredException';
  }
}

// ============================================================
// Multi-language Error Messages
// ============================================================

interface ErrorMessageMap {
  en: string;
  bn: string;
  errorCode: string;
  httpStatus: number;
}

const ERROR_MESSAGES: Record<string, ErrorMessageMap> = {
  [AccountLockedError.name]: {
    en: 'Account is locked due to multiple failed attempts.',
    bn: 'একাধিক ব্যর্থ চেষ্টার কারণে অ্যাকাউন্টটি লক করা হয়েছে।',
    errorCode: 'ACCOUNT_LOCKED',
    httpStatus: 423,
  },
  [MFASessionNotFoundError.name]: {
    en: 'MFA session expired or invalid. Please login again.',
    bn: 'MFA সেশনের মেয়াদ শেষ বা অবৈধ। অনুগ্রহ করে আবার লগইন করুন।',
    errorCode: 'MFA_SESSION_EXPIRED',
    httpStatus: 401,
  },
  [InvalidOTPError.name]: {
    en: 'Invalid or expired OTP code.',
    bn: 'অবৈধ বা মেয়াদোত্তীর্ণ OTP কোড।',
    errorCode: 'INVALID_OTP',
    httpStatus: 401,
  },
  [RateLimitExceededError.name]: {
    en: 'Too many login attempts. Please try again later.',
    bn: 'অনেকবার লগইন চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।',
    errorCode: 'RATE_LIMIT_EXCEEDED',
    httpStatus: 429,
  },
};

// ============================================================
// Bulk Rate Limit Tracker (Enterprise Feature)
// ============================================================

export class BulkRateLimitTracker {
  private static instances: Map<string, BulkRateLimitTracker> = new Map();
  private rateLimitMap: Map<string, BulkRateLimitEntry> = new Map();
  private readonly maxAttemptsPerWindow: number;
  private readonly blockDurationMs: number;
  private cleanupInterval: NodeJS.Timeout;

  private constructor(
    private readonly identifier: string,
    config: { maxAttempts: number; blockDurationMinutes: number }
  ) {
    this.maxAttemptsPerWindow = config.maxAttempts;
    this.blockDurationMs = config.blockDurationMinutes * 60 * 1000;

    // Cleanup expired entries periodically
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
  }

  static getInstance(identifier: string, config?: { maxAttempts: number; blockDurationMinutes: number }): BulkRateLimitTracker {
    if (!BulkRateLimitTracker.instances.has(identifier)) {
      BulkRateLimitTracker.instances.set(
        identifier,
        new BulkRateLimitTracker(identifier, config || { maxAttempts: 100, blockDurationMinutes: 5 })
      );
    }
    return BulkRateLimitTracker.instances.get(identifier)!;
  }

  trackAttempt(ipAddress: string, userId?: string): { allowed: boolean; remaining: number; retryAfterSeconds?: number } {
    const now = new Date();
    let entry = this.rateLimitMap.get(ipAddress);

    if (!entry) {
      entry = {
        ipAddress,
        attempts: 1,
        firstAttemptAt: now,
        lastAttemptAt: now,
        userIds: userId ? new Set([userId]) : new Set(),
        isBlocked: false,
      };
      this.rateLimitMap.set(ipAddress, entry);
      return { allowed: true, remaining: this.maxAttemptsPerWindow - 1 };
    }

    // Check if currently blocked
    if (entry.isBlocked && entry.blockedUntil && now < entry.blockedUntil) {
      const retryAfterSeconds = Math.ceil((entry.blockedUntil.getTime() - now.getTime()) / 1000);
      return { allowed: false, remaining: 0, retryAfterSeconds };
    }

    // Reset if window expired
    if (now.getTime() - entry.lastAttemptAt.getTime() > LOGIN_CONFIG.BULK_TRACKING_WINDOW_MS) {
      entry.attempts = 1;
      entry.firstAttemptAt = now;
      entry.userIds = userId ? new Set([userId]) : new Set();
      entry.isBlocked = false;
      entry.blockedUntil = undefined;
      this.rateLimitMap.set(ipAddress, entry);
      return { allowed: true, remaining: this.maxAttemptsPerWindow - 1 };
    }

    entry.attempts++;
    entry.lastAttemptAt = now;
    if (userId) entry.userIds.add(userId);

    // Check if exceeded threshold
    if (entry.attempts > this.maxAttemptsPerWindow) {
      entry.isBlocked = true;
      entry.blockedUntil = new Date(now.getTime() + this.blockDurationMs);
      return { allowed: false, remaining: 0, retryAfterSeconds: this.blockDurationMs / 1000 };
    }

    this.rateLimitMap.set(ipAddress, entry);
    return { allowed: true, remaining: this.maxAttemptsPerWindow - entry.attempts };
  }

  getStats(ipAddress: string): BulkRateLimitEntry | undefined {
    return this.rateLimitMap.get(ipAddress);
  }

  reset(ipAddress: string): void {
    this.rateLimitMap.delete(ipAddress);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [ip, entry] of this.rateLimitMap.entries()) {
      // Remove entries older than 2 windows
      if (now - entry.lastAttemptAt.getTime() > LOGIN_CONFIG.BULK_TRACKING_WINDOW_MS * 2) {
        this.rateLimitMap.delete(ip);
      }
    }
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// ============================================================
// Idempotency Manager (Enterprise Feature)
// ============================================================

export class IdempotencyManager {
  private static instance: IdempotencyManager;
  private cache: Map<string, IdempotencyRecord> = new Map();
  private readonly ttlMs: number = LOGIN_CONFIG.IDEMPOTENCY_TTL_MS;

  private constructor() {}

  static getInstance(): IdempotencyManager {
    if (!IdempotencyManager.instance) {
      IdempotencyManager.instance = new IdempotencyManager();
    }
    return IdempotencyManager.instance;
  }

  async getOrExecute<T>(
    key: string,
    executor: () => Promise<T>,
    options?: { ttlMs?: number }
  ): Promise<T> {
    const existing = this.cache.get(key);
    if (existing && existing.expiresAt > new Date()) {
      return existing.result as T;
    }

    const result = await executor();
    this.cache.set(key, {
      key,
      result,
      expiresAt: new Date(Date.now() + (options?.ttlMs || this.ttlMs)),
    });

    // Auto cleanup after TTL
    setTimeout(() => {
      this.cache.delete(key);
    }, options?.ttlMs || this.ttlMs);

    return result;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

// ============================================================
// Login Command Handler (Enterprise Grade v4.0)
// ============================================================

@Injectable({ scope: Scope.TRANSIENT })
export class LoginCommandHandler implements ICommandHandler<LoginCommand | PhoneLoginCommand | OtpLoginCommand, CommandResult<LoginResponseDto | MFARequiredResponseDto>> {
  private readonly logger = new Logger(LoginCommandHandler.name);
  private readonly commandType = 'LoginCommand';
  private readonly circuitBreaker: CircuitBreaker;
  private readonly bulkRateLimiter: BulkRateLimitTracker;
  private readonly idempotencyManager: IdempotencyManager;
  private readonly validationCache: ValidationCacheService;

  // Metrics tracking
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
    private readonly authService: AuthService,
    private readonly metricsService: MetricsService,
    private readonly tracerService: TracerService,
    private readonly cacheService: CacheService,
    private readonly rateLimitService: RateLimitService,
    validationCacheService: ValidationCacheService,
    @Inject('VALIDATION_CACHE_CONFIG') validationConfig: typeof VALIDATION_CACHE_CONFIG
  ) {
    // Initialize circuit breaker
    this.circuitBreaker = new CircuitBreaker(
      async (command: LoginCommand, ipAddress: string, userAgent: string, options?: LoginOptions) => {
        return this.authService.login(command, ipAddress, userAgent, options);
      },
      {
        timeout: CIRCUIT_BREAKER_CONFIG.TIMEOUT_MS || LOGIN_CONFIG.CIRCUIT_BREAKER_TIMEOUT_MS,
        errorThresholdPercentage: CIRCUIT_BREAKER_CONFIG.ERROR_THRESHOLD_PERCENTAGE || LOGIN_CONFIG.CIRCUIT_BREAKER_ERROR_THRESHOLD,
        resetTimeout: CIRCUIT_BREAKER_CONFIG.RESET_TIMEOUT_MS || LOGIN_CONFIG.CIRCUIT_BREAKER_RESET_TIMEOUT_MS,
        rollingCountTimeout: CIRCUIT_BREAKER_CONFIG.ROLLING_COUNT_TIMEOUT_MS || 10000,
        rollingCountBuckets: 10,
      }
    );

    // Initialize bulk rate limiter
    this.bulkRateLimiter = BulkRateLimitTracker.getInstance('login', {
      maxAttempts: RATE_LIMIT_CONFIG.BULK_MAX_ATTEMPTS || 100,
      blockDurationMinutes: RATE_LIMIT_CONFIG.BULK_BLOCK_DURATION_MINUTES || 5,
    });

    // Initialize idempotency manager
    this.idempotencyManager = IdempotencyManager.getInstance();

    // Initialize validation cache
    this.validationCache = validationCacheService;

    // Setup circuit breaker event listeners
    this.setupCircuitBreakerListeners();
  }

  // ============================================================
  // Circuit Breaker Event Listeners
  // ============================================================

  private setupCircuitBreakerListeners(): void {
    this.circuitBreaker.on('open', () => {
      this.logger.warn('Circuit breaker opened for auth service');
      this.metricsService.recordCircuitBreakerEvent('auth', 'open');
    });

    this.circuitBreaker.on('halfOpen', () => {
      this.logger.log('Circuit breaker half-open for auth service');
      this.metricsService.recordCircuitBreakerEvent('auth', 'halfOpen');
    });

    this.circuitBreaker.on('close', () => {
      this.logger.log('Circuit breaker closed for auth service');
      this.metricsService.recordCircuitBreakerEvent('auth', 'close');
    });
  }

  // ============================================================
  // Validation with Caching (Enterprise Feature)
  // ============================================================

  async validate(command: LoginCommand | PhoneLoginCommand | OtpLoginCommand): Promise<ValidationResult> {
    const cacheKey = `login_validation_${this.getCommandIdentifier(command)}_${command.method}`;

    // Check cache first
    const cached = await this.validationCache.get<ValidationCacheEntry>(cacheKey);
    if (cached && Date.now() - cached.timestamp < VALIDATION_CACHE_CONFIG.TTL_MS) {
      return { isValid: cached.isValid, errors: cached.errors || [] };
    }

    // Perform validation
    const validationResult = command.getValidationResult();

    // Cache the result
    await this.validationCache.set(
      cacheKey,
      {
        isValid: validationResult.isValid,
        errors: validationResult.errors,
        timestamp: Date.now(),
      },
      VALIDATION_CACHE_CONFIG.TTL_MS
    );

    return validationResult;
  }

  private getCommandIdentifier(command: LoginCommand | PhoneLoginCommand | OtpLoginCommand): string {
    if (command instanceof LoginCommand) return command.identifier;
    if (command instanceof PhoneLoginCommand) return command.phoneNumber;
    return command.phoneNumber;
  }

  // ============================================================
  // Main Execute Method with Distributed Tracing
  // ============================================================

  async execute(command: LoginCommand | PhoneLoginCommand | OtpLoginCommand): Promise<CommandResult<LoginResponseDto | MFARequiredResponseDto>> {
    const startTime = Date.now();
    const span = this.tracerService.startSpan('LoginCommandHandler.execute');

    // Update metrics
    this.metrics.totalExecutions++;
    this.metrics.lastExecutionAt = new Date();

    try {
      // 1. Add trace attributes
      this.addTraceAttributes(span, command);

      // 2. Validate command
      const validation = await this.validate(command);
      if (!validation.isValid) {
        span.setAttribute('validation.failed', true);
        span.setStatus({ code: 1, message: 'Validation failed' });
        this.updateMetrics(false, startTime);

        return {
          success: false,
          error: validation.errors.join(', '),
          errorCode: 'VALIDATION_ERROR',
        };
      }

      // 3. Check bulk rate limit (分布式攻击防护)
      const ipAddress = command.deviceInfo?.ipAddress || 'unknown';
      const rateLimitStatus = this.bulkRateLimiter.trackAttempt(ipAddress, this.extractUserIdFromCommand(command));

      if (!rateLimitStatus.allowed) {
        span.setAttribute('rate.limited', true);
        span.setAttribute('retry.after.seconds', rateLimitStatus.retryAfterSeconds || 0);
        this.updateMetrics(false, startTime);

        return {
          success: false,
          error: `Too many login attempts from this IP. Please try again in ${rateLimitStatus.retryAfterSeconds} seconds.`,
          errorCode: 'BULK_RATE_LIMIT_EXCEEDED',
        };
      }

      // 4. Check individual rate limit
      const individualRateLimit = await this.rateLimitService.checkRateLimit(
        this.getCommandIdentifier(command),
        'login',
        { windowMs: 3600000, maxAttempts: 5 }
      );

      if (!individualRateLimit.allowed) {
        span.setAttribute('individual.rate.limited', true);
        span.setAttribute('remaining.attempts', individualRateLimit.remaining);
        this.updateMetrics(false, startTime);

        return {
          success: false,
          error: `Too many login attempts. ${individualRateLimit.remaining} attempts remaining.`,
          errorCode: 'RATE_LIMIT_EXCEEDED',
        };
      }

      // 5. Check idempotency (prevent duplicate processing)
      const idempotencyKey = `login_${this.getCommandIdentifier(command)}_${command.deviceInfo?.deviceId || ''}_${command.correlationId}`;
      const result = await this.idempotencyManager.getOrExecute(
        idempotencyKey,
        async () => {
          // 6. Execute with circuit breaker
          const deviceInfo: DeviceInfo = this.buildDeviceInfo(command);
          const options: LoginOptions = this.buildLoginOptions(command);

          // Execute via circuit breaker
          const serviceResult = await this.circuitBreaker.fire(command, deviceInfo, deviceInfo.userAgent || 'unknown', options);

          // Record success metrics
          await this.rateLimitService.recordSuccess(this.getCommandIdentifier(command), 'login');

          return serviceResult;
        },
        { ttlMs: LOGIN_CONFIG.IDEMPOTENCY_TTL_MS }
      );

      // 7. Record success metrics
      await this.rateLimitService.recordSuccess(this.getCommandIdentifier(command), 'login');
      this.updateMetrics(true, startTime);

      // 8. End span with success
      span.setStatus({ code: 0, message: 'Success' });
      span.end();

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorCode = this.getErrorCode(error);

      // Record failure metrics
      await this.rateLimitService.recordFailure(this.getCommandIdentifier(command), 'login', errorCode);
      this.updateMetrics(false, startTime);

      // End span with error
      span.setStatus({ code: 2, message: errorMessage });
      span.setAttribute('error.code', errorCode);
      span.setAttribute('error.message', errorMessage);
      span.end();

      // Get Bengali error message if available
      const errorBn = this.getBengaliErrorMessage(error);

      return {
        success: false,
        error: errorMessage,
        errorCode,
        ...(errorBn && { errorMessageBn: errorBn }),
      };
    }
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  private addTraceAttributes(span: unknown, command: LoginCommand | PhoneLoginCommand | OtpLoginCommand): void {
    const setAttribute = (key: string, value: unknown) => {
      if (span && typeof (span as any).setAttribute === 'function') {
        (span as any).setAttribute(key, value);
      }
    };

    setAttribute('command.id', command.commandId);
    setAttribute('command.method', command.method);
    setAttribute('command.source', command.source);
    setAttribute('has.captcha', command.hasCaptcha?.() ?? false);
    setAttribute('remember.me', command.rememberMe ?? false);

    if (command instanceof LoginCommand) {
      setAttribute('identifier.masked', command.getMaskedIdentifier());
    } else if (command instanceof PhoneLoginCommand) {
      setAttribute('phone.masked', command.getMaskedPhone());
    } else if (command instanceof OtpLoginCommand) {
      setAttribute('phone.masked', command.getMaskedPhone());
      setAttribute('otp.length', command.otpCode?.length ?? 0);
    }
  }

  private buildDeviceInfo(command: LoginCommand | PhoneLoginCommand | OtpLoginCommand): DeviceInfo {
    return {
      ipAddress: command.deviceInfo?.ipAddress,
      userAgent: command.deviceInfo?.userAgent,
      deviceId: command.deviceInfo?.deviceId,
      correlationId: command.correlationId,
      district: command.deviceInfo?.district,
      upazila: command.deviceInfo?.upazila,
      mobileOperator: command.deviceInfo?.mobileOperator,
      networkType: command.deviceInfo?.networkType,
      screenResolution: command.deviceInfo?.screenResolution,
      language: command.deviceInfo?.language,
      timezone: command.deviceInfo?.timezone,
      retryAttempt: command.deviceInfo?.retryAttempt,
    };
  }

  private buildLoginOptions(command: LoginCommand | PhoneLoginCommand | OtpLoginCommand): LoginOptions {
    return {
      trustDevice: command.rememberMe ?? false,
      correlationId: command.correlationId,
      preferredLanguage: 'en',
      district: command.deviceInfo?.district,
      networkType: command.deviceInfo?.networkType,
      retryAttempt: command.deviceInfo?.retryAttempt,
    };
  }

  private extractUserIdFromCommand(command: LoginCommand | PhoneLoginCommand | OtpLoginCommand): string | undefined {
    // This would be populated from previous attempts in a real implementation
    // For now, return undefined as user ID is not known until after successful lookup
    return undefined;
  }

  private getErrorCode(error: unknown): string {
    if (error instanceof AccountLockedException) return 'ACCOUNT_LOCKED';
    if (error instanceof MFASessionExpiredException) return 'MFA_SESSION_EXPIRED';
    if (error instanceof InvalidOTPError) return 'INVALID_OTP';
    if (error instanceof RateLimitExceededError) return 'RATE_LIMIT_EXCEEDED';
    if (error instanceof TooManyRequestsException) return 'TOO_MANY_REQUESTS';
    if (error instanceof UnauthorizedException) return 'UNAUTHORIZED';
    if (error instanceof BadRequestException) return 'BAD_REQUEST';
    return 'INTERNAL_ERROR';
  }

  private getBengaliErrorMessage(error: unknown): string | undefined {
    const errorName = error instanceof Error ? error.name : '';
    const errorMap: Record<string, string> = {
      AccountLockedException: 'একাধিক ব্যর্থ চেষ্টার কারণে অ্যাকাউন্টটি লক করা হয়েছে।',
      MFASessionExpiredException: 'MFA সেশনের মেয়াদ শেষ বা অবৈধ। অনুগ্রহ করে আবার লগইন করুন।',
      InvalidOTPError: 'অবৈধ বা মেয়াদোত্তীর্ণ OTP কোড।',
      RateLimitExceededError: 'অনেকবার লগইন চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।',
      TooManyRequestsException: 'অনেকবার অনুরোধ করা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পরে আবার চেষ্টা করুন।',
    };

    return errorMap[errorName];
  }

  private updateMetrics(success: boolean, startTime: number): void {
    const duration = Date.now() - startTime;
    this.metrics.totalDurationMs += duration;

    if (success) {
      this.metrics.successfulExecutions++;
    } else {
      this.metrics.failedExecutions++;
    }

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
    return {
      state: this.circuitBreaker.status?.state as 'open' | 'closed' | 'half-open' || 'closed',
      failures: this.circuitBreaker.stats?.failures || 0,
      successes: this.circuitBreaker.stats?.successes || 0,
      fallbacks: this.circuitBreaker.stats?.fallbacks || 0,
      rejects: this.circuitBreaker.stats?.rejects || 0,
    };
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
      return { healthy: true, latency };
    } catch (error) {
      return {
        healthy: false,
        latency: Date.now() - startTime,
        error: (error as Error).message,
      };
    }
  }

  // ============================================================
  // Command Type
  // ============================================================

  get commandType(): string {
    return this.commandType;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { CommandResult, ValidationResult, ServiceMetrics, CircuitBreakerStatus };
export { ERROR_MESSAGES };
