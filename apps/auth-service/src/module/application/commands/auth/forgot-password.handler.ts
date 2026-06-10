/**
 * Forgot Password Command Handler - Application Layer (Enterprise Enhanced v4.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/forgot-password.handler
 * 
 * @description
 * Handles the forgot password use case with enterprise-grade features:
 * - Multi-channel reset (email, SMS, WhatsApp)
 * - No user enumeration (always return success)
 * - Rate limiting (email, phone, IP based)
 * - CAPTCHA validation with circuit breaker
 * - Distributed tracing with correlation ID
 * - Multi-language error messages (English/Bengali)
 * - Transaction management for data consistency
 * - Circuit breaker pattern for external services
 * - Secure OTP generation
 * - Audit logging with Bengali support
 * - Bangladesh specific - SMS/WhatsApp with locale support
 * 
 * @example
 * const handler = new ForgotPasswordHandler(...);
 * await handler.execute(command);
 */

import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CircuitBreaker } from 'opossum';

// ============================================================
// Shared Packages Import (Enterprise Enhancement)
// ============================================================

import { 
  PASSWORD_RESET_RATE_LIMITS,
  OTP_CONFIG,
  RESEND_COOLDOWN_CONFIG,
  CAPTCHA_CONFIG,
  CIRCUIT_BREAKER_CONFIG,
  ENV_CONFIG,
  PASSWORD_RESET_CONFIG,
  NOTIFICATION_CONFIG
} from '@vubon/shared-constants';

import type { 
  ResetMethod,
  NotificationOptions,
  AuditMetadata,
  RateLimitStatus,
  Locale,
  CircuitBreakerStatus
} from '@vubon/shared-types';

import { 
  maskEmail, 
  maskPhone, 
  normalizePhone, 
  generateSecureOtp,
  isValidEmail,
  isValidBdMobile
} from '@vubon/shared-utils';

// ============================================================
// Local Imports
// ============================================================

import {
  ForgotPasswordCommand,
  ForgotPasswordPhoneCommand,
  ForgotPasswordUsernameCommand,
  ResendResetOtpCommand,
} from './forgot-password.command';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { PasswordResetRepository } from '../../../domain/repositories/password-reset.repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { Email } from '../../../domain/value-objects/email.vo';
import { Phone } from '../../../domain/value-objects/phone.vo';
import { Token, TokenType } from '../../../domain/value-objects/token.vo';
import { IpAddress } from '../../../domain/value-objects/ip-address.vo';
import { UserAgent } from '../../../domain/value-objects/user-agent.vo';
import { DeviceId } from '../../../domain/value-objects/device-id.vo';
import { PasswordReset, PasswordResetMethod } from '../../../domain/entities/password-reset.entity';

import { PasswordResetRequestedEvent } from '../../events/password-reset-requested.event';

import {
  TokenGenerator,
  NotificationService,
  EventBus,
  CacheService,
  AuditService,
  TransactionManager,
  MetricsService,
  TracerService,
  CaptchaService
} from './infrastructure.interface';

// ============================================================
// Constants (Using shared-constants)
// ============================================================

const IS_PRODUCTION = ENV_CONFIG?.IS_PRODUCTION ?? false;

const RATE_LIMIT_CONFIG = {
  MAX_REQUESTS_PER_HOUR: PASSWORD_RESET_RATE_LIMITS?.MAX_PER_EMAIL_PER_HOUR ?? 5,
  MAX_REQUESTS_PER_DAY: PASSWORD_RESET_RATE_LIMITS?.MAX_PER_EMAIL_PER_DAY ?? 10,
  MAX_REQUESTS_PER_IP_PER_HOUR: PASSWORD_RESET_RATE_LIMITS?.MAX_PER_IP_PER_HOUR ?? 20,
  MAX_OTP_REQUESTS_PER_HOUR: PASSWORD_RESET_RATE_LIMITS?.MAX_OTP_PER_PHONE_PER_HOUR ?? 3,
  OTP_EXPIRY_SECONDS: OTP_CONFIG?.EXPIRY_SECONDS ?? 300,
  RESEND_COOLDOWN_SECONDS: RESEND_COOLDOWN_CONFIG?.COOLDOWN_SECONDS ?? 60,
} as const;

// ============================================================
// Bengali Error Messages
// ============================================================

const BENGALI_MESSAGES = {
  RATE_LIMIT_EXCEEDED: 'রেট লিমিট অতিক্রম করা হয়েছে। পরে আবার চেষ্টা করুন।',
  INVALID_CAPTCHA: 'অবৈধ ক্যাপচা। অনুগ্রহ করে আবার চেষ্টা করুন।',
  INVALID_PHONE: 'ভুল ফোন নম্বর ফরম্যাট।',
  USER_NOT_FOUND: 'এই ফোন নম্বরের সাথে কোনো অ্যাকাউন্ট পাওয়া যায়নি।',
  OTP_SENT: 'OTP পাঠানো হয়েছে।',
  OTP_RESENT: 'OTP পুনরায় পাঠানো হয়েছে।',
  RESET_LINK_SENT: 'যদি এই ইমেইলে একটি অ্যাকাউন্ট বিদ্যমান থাকে, তাহলে আপনি পাসওয়ার্ড রিসেট নির্দেশাবলী পাবেন।',
};

// ============================================================
// Circuit Breaker for External Services (Enterprise Pattern)
// ============================================================

class NotificationCircuitBreaker {
  private static instance: NotificationCircuitBreaker;
  private breaker: CircuitBreaker;
  private readonly logger = new Logger(NotificationCircuitBreaker.name);

  private constructor() {
    this.breaker = new CircuitBreaker(
      async (fn: () => Promise<void>) => {
        await fn();
      },
      {
        timeout: CIRCUIT_BREAKER_CONFIG?.TIMEOUT_MS ?? 10000,
        errorThresholdPercentage: CIRCUIT_BREAKER_CONFIG?.ERROR_THRESHOLD_PERCENTAGE ?? 50,
        resetTimeout: CIRCUIT_BREAKER_CONFIG?.RESET_TIMEOUT_MS ?? 30000,
        rollingCountTimeout: 10000,
        rollingCountBuckets: 10,
      }
    );

    this.setupEventListeners();
  }

  static getInstance(): NotificationCircuitBreaker {
    if (!NotificationCircuitBreaker.instance) {
      NotificationCircuitBreaker.instance = new NotificationCircuitBreaker();
    }
    return NotificationCircuitBreaker.instance;
  }

  private setupEventListeners(): void {
    this.breaker.on('open', () => {
      this.logger.warn('Notification circuit breaker opened');
    });

    this.breaker.on('halfOpen', () => {
      this.logger.log('Notification circuit breaker half-open');
    });

    this.breaker.on('close', () => {
      this.logger.log('Notification circuit breaker closed');
    });
  }

  async call(fn: () => Promise<void>): Promise<void> {
    return this.breaker.fire(fn);
  }

  getStatus(): CircuitBreakerStatus {
    const stats = this.breaker.stats;
    return {
      state: this.breaker.status?.state as 'open' | 'closed' | 'half-open' || 'closed',
      failures: stats?.failures || 0,
      successes: stats?.successes || 0,
      fallbacks: stats?.fallbacks || 0,
      rejects: stats?.rejects || 0,
    };
  }

  reset(): void {
    this.breaker.close();
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
// Forgot Password Handler (Enterprise Enhanced v4.0)
// ============================================================

@Injectable()
export class ForgotPasswordHandler {
  private readonly logger = new Logger(ForgotPasswordHandler.name);
  private readonly notificationBreaker = NotificationCircuitBreaker.getInstance();
  private readonly metrics = {
    totalRequests: 0,
    successfulRequests: 0,
    rateLimitedRequests: 0,
    invalidCaptchaRequests: 0,
  };

  constructor(
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => PasswordResetRepository))
    private readonly passwordResetRepository: PasswordResetRepository,
    private readonly tokenGenerator: TokenGenerator,
    private readonly notificationService: NotificationService,
    private readonly eventBus: EventBus,
    private readonly cacheService: CacheService,
    private readonly auditService: AuditService,
    private readonly transactionManager: TransactionManager,
    private readonly metricsService: MetricsService,
    private readonly tracerService: TracerService,
    private readonly captchaService: CaptchaService
  ) {}

  // ============================================================
  // Main Execute Method (Email based - Enterprise Enhanced)
  // ============================================================

  async execute(command: ForgotPasswordCommand): Promise<void> {
    const startTime = Date.now();
    const span = this.tracerService?.startSpan('ForgotPasswordHandler.execute');
    const correlationId = command.correlationId || uuidv4();
    const locale = command.locale || 'en';

    this.metrics.totalRequests++;
    this.metricsService?.incrementCounter('forgot.password.attempted');

    try {
      // Add trace attributes
      this.addTraceAttributes(span, command, correlationId);

      const { email: emailRaw, deviceInfo, resetUrl, captchaToken } = command;

      // 1. Verify captcha with circuit breaker
      if (captchaToken) {
        const isValid = await this.verifyCaptchaWithBreaker(captchaToken, correlationId, locale);
        if (!isValid) {
          this.metrics.invalidCaptchaRequests++;
          this.metricsService?.incrementCounter('forgot.password.invalid_captcha');
          await this.auditService.log({
            action: 'FORGOT_PASSWORD_INVALID_CAPTCHA',
            email: maskEmail(emailRaw),
            ipAddress: deviceInfo?.ipAddress,
            correlationId,
          });
          return;
        }
      }

      // 2. Rate limiting by email
      const emailRateLimit = await this.checkEmailRateLimit(emailRaw, correlationId);
      if (emailRateLimit.isLimited) {
        this.metrics.rateLimitedRequests++;
        this.metricsService?.incrementCounter('forgot.password.rate_limited');
        await this.auditService.log({
          action: 'FORGOT_PASSWORD_RATE_LIMITED',
          email: maskEmail(emailRaw),
          ipAddress: deviceInfo?.ipAddress,
          reason: 'Too many requests',
          remainingSeconds: emailRateLimit.remainingSeconds,
          correlationId,
        });
        return;
      }

      // 3. Rate limiting by IP
      if (deviceInfo?.ipAddress) {
        const ipRateLimit = await this.checkIpRateLimit(deviceInfo.ipAddress, correlationId);
        if (ipRateLimit.isLimited) {
          this.metrics.rateLimitedRequests++;
          await this.auditService.log({
            action: 'FORGOT_PASSWORD_IP_RATE_LIMITED',
            ipAddress: deviceInfo.ipAddress,
            reason: 'Too many requests from IP',
            correlationId,
          });
          return;
        }
      }

      // 4. Validate email format
      let email: Email;
      try {
        email = new Email(emailRaw);
      } catch (error) {
        await this.auditService.log({
          action: 'FORGOT_PASSWORD_INVALID_EMAIL',
          email: emailRaw,
          ipAddress: deviceInfo?.ipAddress,
          error: (error as Error).message,
          correlationId,
        });
        return;
      }

      // 5. Find user (don't reveal if exists)
      const user = await this.userRepository.findByEmail(email);

      if (!user || !user.isActive()) {
        await this.auditService.log({
          action: 'FORGOT_PASSWORD_USER_NOT_FOUND',
          email: email.getValue(),
          ipAddress: deviceInfo?.ipAddress,
          correlationId,
        });
        return;
      }

      // 6. Execute reset request in transaction
      await this.executeResetRequest(user, email, command, correlationId, locale);

      // 7. Increment rate limiting counters
      await this.incrementRateLimits(emailRaw, deviceInfo?.ipAddress);

      // 8. Record success metrics
      this.metrics.successfulRequests++;
      this.metricsService?.incrementCounter('forgot.password.successful');
      this.metricsService?.recordHistogram('forgot.password.duration', Date.now() - startTime);

      span?.setStatus({ code: 0, message: 'Success' });
      span?.end();

    } catch (error) {
      this.metricsService?.incrementCounter('forgot.password.failed');
      this.metricsService?.incrementCounter(`forgot.password.error.${this.getErrorCode(error)}`);

      span?.setStatus({ code: 2, message: (error as Error).message });
      span?.setAttribute('error.code', this.getErrorCode(error));
      span?.setAttribute('error.message', (error as Error).message);
      span?.end();

      this.logger.error(`Forgot password failed: ${(error as Error).message}`);
      throw error;
    }
  }

  // ============================================================
  // Phone-based Forgot Password (Bangladesh specific - Enterprise Enhanced)
  // ============================================================

  async executePhone(command: ForgotPasswordPhoneCommand): Promise<{ sessionId: string; expiresIn: number }> {
    const startTime = Date.now();
    const span = this.tracerService?.startSpan('ForgotPasswordHandler.executePhone');
    const correlationId = command.correlationId || uuidv4();
    const locale = command.locale || 'en';

    this.metrics.totalRequests++;
    this.metricsService?.incrementCounter('forgot.password.phone.attempted');

    try {
      const { phoneNumber, method, deviceInfo, captchaToken } = command;

      // 1. Verify captcha with circuit breaker
      if (captchaToken) {
        const isValid = await this.verifyCaptchaWithBreaker(captchaToken, correlationId, locale);
        if (!isValid) {
          this.metrics.invalidCaptchaRequests++;
          throw new Error(locale === 'bn' ? BENGALI_MESSAGES.INVALID_CAPTCHA : 'Invalid captcha');
        }
      }

      // 2. Rate limiting by phone
      const phoneRateLimit = await this.checkPhoneRateLimit(phoneNumber, correlationId);
      if (phoneRateLimit.isLimited) {
        this.metrics.rateLimitedRequests++;
        const message = locale === 'bn' 
          ? BENGALI_MESSAGES.RATE_LIMIT_EXCEEDED
          : 'Rate limit exceeded. Please try again later.';
        throw new Error(message);
      }

      // 3. Validate phone format
      let phone: Phone;
      try {
        phone = new Phone(phoneNumber);
      } catch (error) {
        const message = locale === 'bn' 
          ? BENGALI_MESSAGES.INVALID_PHONE
          : 'Invalid phone number format';
        throw new Error(message);
      }

      // 4. Find user by phone
      const user = await this.userRepository.findByPhone(phone);

      if (!user || !user.isActive()) {
        const message = locale === 'bn'
          ? BENGALI_MESSAGES.USER_NOT_FOUND
          : 'No account found with this phone number';
        throw new Error(message);
      }

      // 5. Generate secure OTP
      const otpCode = generateSecureOtp(6);
      const sessionId = this.generateSessionId();

      // 6. Store OTP in cache with transaction
      await this.transactionManager.runInTransaction(async () => {
        // Invalidate any existing OTP for this user
        const existingSessionKey = `password-reset-otp:user:${user.id}`;
        const existingSessionId = await this.cacheService.get<string>(existingSessionKey);
        if (existingSessionId) {
          await this.cacheService.del(`password-reset-otp:${existingSessionId}`);
        }

        // Store new OTP
        await this.cacheService.set(
          `password-reset-otp:${sessionId}`,
          {
            userId: user.id,
            phoneNumber: phone.getE164(),
            otpCode,
            attempts: 0,
            createdAt: new Date(),
          },
          RATE_LIMIT_CONFIG.OTP_EXPIRY_SECONDS
        );

        // Store mapping from user to session
        await this.cacheService.set(
          existingSessionKey,
          sessionId,
          RATE_LIMIT_CONFIG.OTP_EXPIRY_SECONDS
        );
      });

      // 7. Send OTP via selected method with circuit breaker
      const notificationMethod = method === 'whatsapp' ? 'whatsapp' : 'sms';
      
      await this.notificationBreaker.call(async () => {
        await withRetry(
          () => this.notificationService.sendMfaCode(
            user.id,
            phone.getE164(),
            otpCode,
            notificationMethod,
            Math.floor(RATE_LIMIT_CONFIG.OTP_EXPIRY_SECONDS / 60),
            {
              correlationId,
              ipAddress: deviceInfo?.ipAddress,
              locale,
            }
          ),
          NOTIFICATION_CONFIG?.RETRY_ATTEMPTS ?? 3,
          NOTIFICATION_CONFIG?.RETRY_DELAY_MS ?? 1000
        );
      });

      // 8. Audit log
      await this.auditService.log({
        action: 'FORGOT_PASSWORD_OTP_SENT',
        userId: user.id,
        phoneNumber: phone.getE164(),
        method,
        ipAddress: deviceInfo?.ipAddress,
        deviceId: deviceInfo?.deviceId,
        correlationId,
      });

      // 9. Increment phone rate limit
      await this.incrementPhoneRateLimit(phoneNumber);

      // Record success metrics
      this.metrics.successfulRequests++;
      this.metricsService?.incrementCounter('forgot.password.phone.successful');
      this.metricsService?.recordHistogram('forgot.password.phone.duration', Date.now() - startTime);

      span?.setStatus({ code: 0, message: 'Success' });
      span?.end();

      return {
        sessionId,
        expiresIn: RATE_LIMIT_CONFIG.OTP_EXPIRY_SECONDS,
      };

    } catch (error) {
      this.metricsService?.incrementCounter('forgot.password.phone.failed');
      
      span?.setStatus({ code: 2, message: (error as Error).message });
      span?.end();

      throw error;
    }
  }

  // ============================================================
  // Resend Reset OTP (Enterprise Enhanced)
  // ============================================================

  async resendOtp(command: ResendResetOtpCommand): Promise<{ sessionId: string; expiresIn: number }> {
    const startTime = Date.now();
    const span = this.tracerService?.startSpan('ForgotPasswordHandler.resendOtp');
    const correlationId = command.correlationId || uuidv4();
    const locale = command.locale || 'en';

    try {
      const { phoneNumber, method, sessionId: oldSessionId, deviceInfo } = command;

      // Check cooldown
      const cooldownKey = `password-reset-otp:cooldown:${phoneNumber}`;
      const lastResend = await this.cacheService.get<number>(cooldownKey);
      
      if (lastResend && (Date.now() - lastResend) < RATE_LIMIT_CONFIG.RESEND_COOLDOWN_SECONDS * 1000) {
        const remainingSeconds = Math.ceil(
          (RATE_LIMIT_CONFIG.RESEND_COOLDOWN_SECONDS * 1000 - (Date.now() - lastResend)) / 1000
        );
        throw new Error(`Please wait ${remainingSeconds} seconds before resending`);
      }

      // Validate old session if provided
      if (oldSessionId) {
        const existing = await this.cacheService.get(`password-reset-otp:${oldSessionId}`);
        if (existing) {
          const { phoneNumber: storedPhone } = existing as any;
          if (storedPhone === phoneNumber) {
            await this.cacheService.del(`password-reset-otp:${oldSessionId}`);
          }
        }
      }

      // Find user
      const phone = new Phone(phoneNumber);
      const user = await this.userRepository.findByPhone(phone);

      if (!user || !user.isActive()) {
        const message = locale === 'bn'
          ? BENGALI_MESSAGES.USER_NOT_FOUND
          : 'User not found';
        throw new Error(message);
      }

      // Generate new OTP and session
      const otpCode = generateSecureOtp(6);
      const sessionId = this.generateSessionId();

      // Store new OTP
      await this.transactionManager.runInTransaction(async () => {
        // Remove old user mapping
        const existingSessionKey = `password-reset-otp:user:${user.id}`;
        const existingSessionId = await this.cacheService.get<string>(existingSessionKey);
        if (existingSessionId) {
          await this.cacheService.del(`password-reset-otp:${existingSessionId}`);
        }

        await this.cacheService.set(
          `password-reset-otp:${sessionId}`,
          {
            userId: user.id,
            phoneNumber,
            otpCode,
            attempts: 0,
            createdAt: new Date(),
          },
          RATE_LIMIT_CONFIG.OTP_EXPIRY_SECONDS
        );

        await this.cacheService.set(existingSessionKey, sessionId, RATE_LIMIT_CONFIG.OTP_EXPIRY_SECONDS);
        await this.cacheService.set(cooldownKey, Date.now(), RATE_LIMIT_CONFIG.RESEND_COOLDOWN_SECONDS);
      });

      // Send OTP via selected method with circuit breaker
      const notificationMethod = method === 'whatsapp' ? 'whatsapp' : 'sms';
      
      await this.notificationBreaker.call(async () => {
        await withRetry(
          () => this.notificationService.sendMfaCode(
            user.id,
            phoneNumber,
            otpCode,
            notificationMethod,
            Math.floor(RATE_LIMIT_CONFIG.OTP_EXPIRY_SECONDS / 60),
            {
              correlationId,
              ipAddress: deviceInfo?.ipAddress,
              locale,
            }
          ),
          NOTIFICATION_CONFIG?.RETRY_ATTEMPTS ?? 3,
          NOTIFICATION_CONFIG?.RETRY_DELAY_MS ?? 1000
        );
      });

      // Update metrics
      this.metricsService?.incrementCounter('forgot.password.otp.resend');
      this.metricsService?.recordHistogram('forgot.password.otp.resend.duration', Date.now() - startTime);

      span?.setStatus({ code: 0, message: 'Success' });
      span?.end();

      return {
        sessionId,
        expiresIn: RATE_LIMIT_CONFIG.OTP_EXPIRY_SECONDS,
      };

    } catch (error) {
      this.metricsService?.incrementCounter('forgot.password.otp.resend.failed');
      span?.setStatus({ code: 2, message: (error as Error).message });
      span?.end();
      throw error;
    }
  }

  // ============================================================
  // Private Helper Methods (Enterprise Enhanced)
  // ============================================================

  private async executeResetRequest(
    user: User,
    email: Email,
    command: ForgotPasswordCommand,
    correlationId: string,
    locale: Locale
  ): Promise<void> {
    const { deviceInfo, resetUrl } = command;

    await this.transactionManager.runInTransaction(async () => {
      // Check for existing pending reset
      const existingReset = await this.passwordResetRepository.getMostRecentActiveByUserId(user.id);
      if (existingReset) {
        const cooldownRemaining = existingReset.getResendCooldownRemaining();
        if (cooldownRemaining > 0) {
          await this.auditService.log({
            action: 'FORGOT_PASSWORD_COOLDOWN',
            userId: user.id,
            email: email.getValue(),
            ipAddress: deviceInfo?.ipAddress,
            remainingSeconds: cooldownRemaining,
            correlationId,
          });
          return;
        }

        // Cancel old reset request
        await this.passwordResetRepository.cancel(user.id, 'New request initiated');
      }

      // Generate reset token
      const resetTokenValue = await this.tokenGenerator.generatePasswordResetToken(user.id);
      const token = new Token(resetTokenValue, TokenType.RESET);

      // Create password reset entity
      const passwordReset = PasswordReset.createEmail(
        user.id,
        email,
        token,
        deviceInfo?.ipAddress ? new IpAddress(deviceInfo.ipAddress) : undefined,
        deviceInfo?.userAgent ? new UserAgent(deviceInfo.userAgent) : undefined,
        deviceInfo?.deviceId ? new DeviceId(deviceInfo.deviceId) : undefined,
        { generate: () => uuidv4() }
      );

      await this.passwordResetRepository.save(passwordReset);

      // Store token in cache
      await this.cacheService.set(
        `password-reset:${user.id}`,
        resetTokenValue,
        PASSWORD_RESET_CONFIG?.TOKEN_EXPIRY_HOURS ? 3600 : 3600
      );

      // Send reset email with circuit breaker
      const resetLink = this.buildResetLink(resetUrl, resetTokenValue, locale);

      await this.notificationBreaker.call(async () => {
        await withRetry(
          () => this.notificationService.sendPasswordResetEmail(
            user.id,
            email.getValue(),
            resetLink,
            PASSWORD_RESET_CONFIG?.TOKEN_EXPIRY_HOURS ?? 1,
            {
              correlationId,
              ipAddress: deviceInfo?.ipAddress,
              locale,
            }
          ),
          NOTIFICATION_CONFIG?.RETRY_ATTEMPTS ?? 3,
          NOTIFICATION_CONFIG?.RETRY_DELAY_MS ?? 1000
        );
      });

      // Publish event
      await this.eventBus.publish(
        new PasswordResetRequestedEvent(
          user.id,
          email.getValue(),
          deviceInfo?.ipAddress,
          correlationId,
          passwordReset.getExpiresAt()
        )
      );

      // Audit log
      await this.auditService.log({
        action: 'FORGOT_PASSWORD_REQUESTED',
        userId: user.id,
        email: email.getValue(),
        ipAddress: deviceInfo?.ipAddress,
        deviceId: deviceInfo?.deviceId,
        userAgent: deviceInfo?.userAgent,
        correlationId,
        expiresAt: passwordReset.getExpiresAt(),
      });
    });
  }

  private async checkEmailRateLimit(email: string, correlationId?: string): Promise<RateLimitStatus> {
    const key = `ratelimit:forgot-password:email:${email.toLowerCase()}`;
    const count = await this.cacheService.get<number>(key);
    const currentCount = count || 0;

    if (currentCount >= RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_HOUR) {
      const ttl = await this.cacheService.ttl(key);
      return { 
        isLimited: true, 
        remaining: 0,
        remainingSeconds: ttl > 0 ? ttl : 0,
        limit: RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_HOUR,
        resetAt: new Date(Date.now() + (ttl > 0 ? ttl : 0) * 1000)
      };
    }

    const dailyKey = `ratelimit:forgot-password:email:daily:${email.toLowerCase()}`;
    const dailyCount = await this.cacheService.get<number>(dailyKey) || 0;

    if (dailyCount >= RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_DAY) {
      const ttl = await this.cacheService.ttl(dailyKey);
      return { 
        isLimited: true, 
        remaining: 0,
        remainingSeconds: ttl > 0 ? ttl : 0,
        limit: RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_DAY,
        resetAt: new Date(Date.now() + (ttl > 0 ? ttl : 0) * 1000)
      };
    }

    return { 
      isLimited: false, 
      remaining: RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_HOUR - currentCount,
      remainingSeconds: 0,
      limit: RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_HOUR,
      resetAt: new Date()
    };
  }

  private async checkPhoneRateLimit(phoneNumber: string, correlationId?: string): Promise<RateLimitStatus> {
    const key = `ratelimit:forgot-password:phone:${phoneNumber}`;
    const count = await this.cacheService.get<number>(key) || 0;

    if (count >= RATE_LIMIT_CONFIG.MAX_OTP_REQUESTS_PER_HOUR) {
      const ttl = await this.cacheService.ttl(key);
      return { 
        isLimited: true, 
        remaining: 0,
        remainingSeconds: ttl > 0 ? ttl : 0,
        limit: RATE_LIMIT_CONFIG.MAX_OTP_REQUESTS_PER_HOUR,
        resetAt: new Date(Date.now() + (ttl > 0 ? ttl : 0) * 1000)
      };
    }

    return { 
      isLimited: false, 
      remaining: RATE_LIMIT_CONFIG.MAX_OTP_REQUESTS_PER_HOUR - count,
      remainingSeconds: 0,
      limit: RATE_LIMIT_CONFIG.MAX_OTP_REQUESTS_PER_HOUR,
      resetAt: new Date()
    };
  }

  private async checkIpRateLimit(ip: string, correlationId?: string): Promise<RateLimitStatus> {
    const key = `ratelimit:forgot-password:ip:${ip}`;
    const count = await this.cacheService.get<number>(key) || 0;

    if (count >= RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_IP_PER_HOUR) {
      const ttl = await this.cacheService.ttl(key);
      return { 
        isLimited: true, 
        remaining: 0,
        remainingSeconds: ttl > 0 ? ttl : 0,
        limit: RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_IP_PER_HOUR,
        resetAt: new Date(Date.now() + (ttl > 0 ? ttl : 0) * 1000)
      };
    }

    return { 
      isLimited: false, 
      remaining: RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_IP_PER_HOUR - count,
      remainingSeconds: 0,
      limit: RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_IP_PER_HOUR,
      resetAt: new Date()
    };
  }

  private async incrementRateLimits(email: string, ipAddress?: string): Promise<void> {
    const emailKey = `ratelimit:forgot-password:email:${email.toLowerCase()}`;
    await this.cacheService.incr(emailKey);
    await this.cacheService.expire(emailKey, 3600);

    const dailyKey = `ratelimit:forgot-password:email:daily:${email.toLowerCase()}`;
    await this.cacheService.incr(dailyKey);
    await this.cacheService.expire(dailyKey, 86400);

    if (ipAddress) {
      const ipKey = `ratelimit:forgot-password:ip:${ipAddress}`;
      await this.cacheService.incr(ipKey);
      await this.cacheService.expire(ipKey, 3600);
    }
  }

  private async incrementPhoneRateLimit(phoneNumber: string): Promise<void> {
    const key = `ratelimit:forgot-password:phone:${phoneNumber}`;
    await this.cacheService.incr(key);
    await this.cacheService.expire(key, 3600);
  }

  private async verifyCaptchaWithBreaker(
    captchaToken: string, 
    correlationId: string,
    locale: Locale
  ): Promise<boolean> {
    try {
      return await withRetry(
        () => this.captchaService.validate(captchaToken, correlationId),
        2,
        500
      );
    } catch (error) {
      this.logger.warn(`CAPTCHA validation failed: ${(error as Error).message}`);
      return false;
    }
  }

  private buildResetLink(baseUrl: string | undefined, token: string, locale: Locale): string {
    const url = baseUrl || process.env.PASSWORD_RESET_URL || 'https://vubon.com.bd/reset-password';
    const separator = url.includes('?') ? '&' : '?';
    const localeParam = locale === 'bn' ? '&lang=bn' : '';
    return `${url}${separator}token=${encodeURIComponent(token)}${localeParam}`;
  }

  private generateSessionId(): string {
    return `reset_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  private addTraceAttributes(span: unknown, command: ForgotPasswordCommand, correlationId: string): void {
    const setAttribute = (key: string, value: unknown) => {
      if (span && typeof (span as any).setAttribute === 'function') {
        (span as any).setAttribute(key, value);
      }
    };

    setAttribute('command.id', command.commandId);
    setAttribute('correlation.id', correlationId);
    setAttribute('email.masked', maskEmail(command.email));
    setAttribute('has.reset.url', !!command.resetUrl);
    setAttribute('has.captcha', !!command.captchaToken);
    setAttribute('locale', command.locale);
    setAttribute('has.device.info', !!command.deviceInfo);
    setAttribute('device.district', command.deviceInfo?.district || 'unknown');
    setAttribute('device.mobile.operator', command.deviceInfo?.mobileOperator || 'unknown');
    setAttribute('device.network.type', command.deviceInfo?.networkType || 'unknown');
  }

  private getErrorCode(error: unknown): string {
    if (error instanceof Error) {
      if (error.message.includes('captcha')) return 'INVALID_CAPTCHA';
      if (error.message.includes('rate limit')) return 'RATE_LIMIT_EXCEEDED';
      if (error.message.includes('phone')) return 'INVALID_PHONE';
    }
    return 'INTERNAL_ERROR';
  }

  // ============================================================
  // Public Metrics & Health Methods
  // ============================================================

  getMetrics(): {
    totalRequests: number;
    successfulRequests: number;
    rateLimitedRequests: number;
    invalidCaptchaRequests: number;
    successRate: number;
  } {
    return {
      totalRequests: this.metrics.totalRequests,
      successfulRequests: this.metrics.successfulRequests,
      rateLimitedRequests: this.metrics.rateLimitedRequests,
      invalidCaptchaRequests: this.metrics.invalidCaptchaRequests,
      successRate: this.metrics.totalRequests > 0
        ? (this.metrics.successfulRequests / this.metrics.totalRequests) * 100
        : 0,
    };
  }

  getCircuitBreakerStatus(): CircuitBreakerStatus {
    return this.notificationBreaker.getStatus();
  }

  resetCircuitBreaker(): void {
    this.notificationBreaker.reset();
  }

  resetMetrics(): void {
    this.metrics.totalRequests = 0;
    this.metrics.successfulRequests = 0;
    this.metrics.rateLimitedRequests = 0;
    this.metrics.invalidCaptchaRequests = 0;
  }

  async healthCheck(): Promise<{ 
    healthy: boolean; 
    latency: number; 
    services: { 
      cache: boolean; 
      captcha: boolean; 
      notification: string; 
    };
    error?: string;
  }> {
    const startTime = Date.now();
    const services = {
      cache: false,
      captcha: false,
      notification: this.getCircuitBreakerStatus().state,
    };

    try {
      await this.cacheService.ping();
      services.cache = true;
    } catch (error) {
      this.logger.error(`Cache health check failed: ${(error as Error).message}`);
    }

    try {
      await this.captchaService.healthCheck();
      services.captcha = true;
    } catch (error) {
      this.logger.error(`CAPTCHA service health check failed: ${(error as Error).message}`);
    }

    const latency = Date.now() - startTime;
    const healthy = services.cache && services.captcha;

    return { healthy, latency, services };
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { ForgotPasswordHandler as ForgotPasswordHandlerType };
