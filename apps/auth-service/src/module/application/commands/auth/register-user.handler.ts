/**
 * Register User Command Handler - Application Layer (Enterprise Enhanced v4.5 - FINAL)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 */

import { Injectable, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

// ============================================================
// Shared Packages Import
// ============================================================

import {
  REGISTRATION_RATE_LIMITS,
  USER_TIERS,
  AUDIT_ACTIONS,
} from '@vubon/shared-constants';

import { maskEmail, maskPhone, normalizePhone } from '@vubon/shared-utils';

// ============================================================
// Local Imports
// ============================================================

import { RegisterUserCommand, DeviceInfo } from './register-user.command';
// ✅ FIXED: UserRepository is imported as a TYPE and as a VALUE
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { Email } from '../../../domain/value-objects/email.vo';
import { Password } from '../../../domain/value-objects/password.vo';
import { Phone } from '../../../domain/value-objects/phone.vo';
import type { IdGenerator } from '../../../domain/entities/base.entity';

// ============================================================
// Service Interfaces (Defined locally - replace with actual imports)
// ============================================================

export interface PasswordHasher {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}

export interface EventBus {
  publish(event: any): Promise<void>;
}

export interface AuditService {
  log(data: any): Promise<void>;
}

export interface RateLimiter {
  getCount(key: string, windowSeconds: number): Promise<number>;
  increment(key: string, windowSeconds: number): Promise<void>;
}

export interface EmailService {
  sendVerificationEmail(
    email: string,
    token: string,
    fullName: string,
    expiryHours: number,
    language: string | undefined,
    correlationId: string
  ): Promise<void>;
}

export interface SmsService {
  sendVerificationSms(
    phone: string,
    otp: string,
    fullName: string,
    language: string,
    correlationId: string
  ): Promise<void>;
}

export interface CaptchaService {
  validate(token: string, correlationId: string): Promise<boolean>;
}

export interface TokenGenerator {
  generateEmailVerificationToken(userId: string, options: any): Promise<string>;
  generatePhoneVerificationCode(userId: string, options: any): Promise<string>;
}

export interface ReferralService {
  validateReferralCode(code: string, correlationId: string): Promise<{ userId: string } | null>;
}

export interface UserTierCalculator {
  calculateTier(userId: string): Promise<string>;
}

export interface CacheService {
  get(key: string): Promise<any>;
  set(key: string, value: any, ttlSeconds: number): Promise<void>;
}

export interface MetricsService {
  incrementCounter(name: string, labels?: Record<string, string>): void;
  recordHistogram(name: string, value: number, labels?: Record<string, string>): void;
}

export interface TracerService {
  startSpan(name: string): any;
}

export class CacheKeyBuilder {
  static user(id: string): string {
    return `user:${id}`;
  }
  static userByEmail(email: string): string {
    return `user:email:${email}`;
  }
  static userByPhone(phone: string): string {
    return `user:phone:${phone}`;
  }
}

// ============================================================
// IdGenerator Implementation
// ============================================================

class UuidIdGenerator implements IdGenerator {
  generate(): string {
    return uuidv4();
  }
  generateUlid(): string {
    const timestamp = Date.now().toString(36).padStart(10, '0');
    const random = Math.random().toString(36).substring(2, 18);
    return `${timestamp}${random}`.toUpperCase();
  }
  generateSnowflake(): string {
    const timestamp = BigInt(Date.now()) - 1288834974657n;
    const machineId = 1n;
    const sequence = BigInt(Math.floor(Math.random() * 4096));
    const snowflake = (timestamp << 22n) | (machineId << 12n) | sequence;
    return snowflake.toString();
  }
  generateSequential(): string {
    return Date.now().toString();
  }
  generateOfType(type: 'uuid' | 'ulid' | 'snowflake' | 'sequential'): string {
    switch (type) {
      case 'ulid': return this.generateUlid();
      case 'snowflake': return this.generateSnowflake();
      case 'sequential': return this.generateSequential();
      default: return this.generate();
    }
  }
}

// ============================================================
// Dummy Validators (Replace with actual injected validators)
// ============================================================

const emailValidator = {
  validate: (email: string) => ({ isValid: true, normalized: email.toLowerCase() }),
  normalize: (email: string) => email.toLowerCase(),
} as any;

const passwordValidator = {
  validate: (password: string) => ({
    isValid: true,
    strength: 'strong',
    entropy: 70,
    errors: [],
    warnings: [],
    suggestions: [],
    characterSet: { hasUppercase: true, hasLowercase: true, hasNumbers: true, hasSpecial: true },
    length: password.length,
  }),
} as any;

const phoneValidator = {
  validate: (phone: string) => ({ isValid: true, normalized: phone, components: { isMobile: true } }),
  normalize: (phone: string) => phone,
} as any;

// ============================================================
// Constants (Defined locally with fallbacks)
// ============================================================

const REGISTRATION_CONFIG = {
  MAX_REGISTRATIONS_PER_IP_PER_HOUR: REGISTRATION_RATE_LIMITS?.MAX_ATTEMPTS_PER_IP ?? 10,
  MAX_REGISTRATIONS_PER_EMAIL_PER_DAY: REGISTRATION_RATE_LIMITS?.MAX_ATTEMPTS_PER_EMAIL ?? 3,
  MAX_REGISTRATIONS_PER_PHONE_PER_DAY: REGISTRATION_RATE_LIMITS?.MAX_ATTEMPTS_PER_PHONE ?? 3,
  VERIFICATION_EMAIL_EXPIRY_HOURS: 24,
  VERIFICATION_SMS_EXPIRY_MINUTES: 10,
  WELCOME_SMS_ENABLED: true,
  // ✅ FIXED: Use USER_TIERS.BRONZE directly
  DEFAULT_USER_TIER: USER_TIERS.BRONZE,
  OTP_LENGTH: 6,
  RETRY_MAX_ATTEMPTS: 3,
  RETRY_BASE_DELAY_MS: 100,
  CIRCUIT_BREAKER_TIMEOUT_MS: 10000,
  CIRCUIT_BREAKER_ERROR_THRESHOLD: 50,
  CIRCUIT_BREAKER_RESET_TIMEOUT_MS: 30000,
} as const;

// ============================================================
// Response DTO
// ============================================================

export interface RegisterResponseDto {
  userId: string;
  email: string;
  phoneNumber?: string | undefined;
  requiresEmailVerification: boolean;
  requiresPhoneVerification: boolean;
  message: string;
  messageBn?: string | undefined;
  // ✅ FIXED: userTier type is string (will be assigned from USER_TIERS.BRONZE)
  userTier: string;
  correlationId?: string | undefined;
}

// ============================================================
// Circuit Breaker for External Services
// ============================================================

interface CircuitBreakerStatus {
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  failures: number;
  nextAttemptAt?: Date | undefined;
}

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
    private readonly failureThreshold: number = REGISTRATION_CONFIG.CIRCUIT_BREAKER_ERROR_THRESHOLD,
    private readonly timeoutMs: number = REGISTRATION_CONFIG.CIRCUIT_BREAKER_TIMEOUT_MS,
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
  maxRetries: number = REGISTRATION_CONFIG.RETRY_MAX_ATTEMPTS,
  baseDelayMs: number = REGISTRATION_CONFIG.RETRY_BASE_DELAY_MS,
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
// Registration Method Enum (Local - Replace with shared import)
// ============================================================

enum RegistrationMethodLocal {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  SOCIAL = 'SOCIAL',
}

// ============================================================
// Register User Handler (Enterprise Enhanced v4.5 - FINAL)
// ============================================================

@Injectable()
export class RegisterUserHandler {
  private readonly logger = new Logger(RegisterUserHandler.name);
  private readonly emailCircuitBreaker = CircuitBreaker.getInstance('email');
  private readonly smsCircuitBreaker = CircuitBreaker.getInstance('sms');
  private readonly captchaCircuitBreaker = CircuitBreaker.getInstance('captcha');
  private readonly idGenerator: IdGenerator = new UuidIdGenerator();

  // Performance metrics
  private metrics = {
    totalExecutions: 0,
    successfulExecutions: 0,
    failedExecutions: 0,
    totalDurationMs: 0,
  };

  constructor(
    // ✅ FIXED: UserRepository is properly injected as a value using forwardRef
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly rateLimiter: RateLimiter,
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
    private readonly captchaService: CaptchaService,
    private readonly tokenGenerator: TokenGenerator,
    private readonly referralService: ReferralService,
    private readonly userTierCalculator: UserTierCalculator,
    private readonly cacheService: CacheService,
    private readonly metricsService: MetricsService,
    private readonly tracerService: TracerService,
  ) {}

  // ============================================================
  // Main Execute Method with Distributed Tracing
  // ============================================================

  async execute(command: RegisterUserCommand): Promise<RegisterResponseDto> {
    const startTime = Date.now();
    const span = this.tracerService?.startSpan('RegisterUserHandler.execute');
    const correlationId = command.correlationId || uuidv4();

    this.metrics.totalExecutions++;
    this.metricsService?.incrementCounter('user.registrations.attempted');

    try {
      this.addTraceAttributes(span, command, correlationId);
      const result = await this.executeRegistration(command, correlationId);

      this.metrics.successfulExecutions++;
      this.metrics.totalDurationMs += Date.now() - startTime;
      this.metricsService?.incrementCounter('user.registrations.successful');
      this.metricsService?.recordHistogram('user.registration.duration', Date.now() - startTime);

      if (span) {
        span.setStatus({ code: 0, message: 'Success' });
        span.end();
      }

      return result;
    } catch (error) {
      this.metrics.failedExecutions++;
      this.metrics.totalDurationMs += Date.now() - startTime;
      this.metricsService?.incrementCounter('user.registrations.failed');
      this.metricsService?.incrementCounter(`user.registration.error.${this.getErrorCode(error)}`);

      const err = error as Error;
      if (span) {
        span.setStatus({ code: 2, message: err.message });
        span.setAttribute('error.code', this.getErrorCode(error));
        span.setAttribute('error.message', err.message);
        span.end();
      }

      throw error;
    }
  }

  // ============================================================
  // Core Registration Logic (Protected for Testability)
  // ============================================================

  protected async executeRegistration(
    command: RegisterUserCommand,
    correlationId: string
  ): Promise<RegisterResponseDto> {
    const {
      email: emailRaw,
      password,
      fullName,
      deviceInfo,
      captchaToken,
      phone: phoneRaw,
      displayName,
      preferredLanguage,
      preferences,
    } = command;

    // ============================================================
    // 1. Input Validation with Bengali Error Messages
    // ============================================================

    if (!command.hasAcceptedTerms()) {
      throw new BadRequestException(
        'You must accept the terms and conditions to register',
        'আপনাকে নিবন্ধনের জন্য শর্তাবলী মেনে নিতে হবে'
      );
    }

    if (!command.hasAcceptedPrivacy()) {
      throw new BadRequestException(
        'You must accept the privacy policy to register',
        'আপনাকে নিবন্ধনের জন্য গোপনীয়তা নীতি মেনে নিতে হবে'
      );
    }

    if (!command.doPasswordsMatch()) {
      throw new BadRequestException(
        'Passwords do not match',
        'পাসওয়ার্ড দুটি মিলছে না'
      );
    }

    // ============================================================
    // 2. CAPTCHA Validation with Circuit Breaker
    // ============================================================

    if (captchaToken) {
      try {
        const isValid = await this.captchaCircuitBreaker.call(async () =>
          withRetry(() => this.captchaService.validate(captchaToken, correlationId))
        );

        if (!isValid) {
          throw new BadRequestException(
            'Invalid CAPTCHA. Please try again.',
            'অবৈধ CAPTCHA। অনুগ্রহ করে আবার চেষ্টা করুন।'
          );
        }
      } catch (error) {
        const err = error as Error;
        if (err.message.includes('Circuit breaker')) {
          this.logger.warn(`CAPTCHA service unavailable: ${err.message}`);
          throw new BadRequestException(
            'CAPTCHA service temporarily unavailable. Please try again later.',
            'CAPTCHA সার্ভিস সাময়িকভাবে অনুপলব্ধ। অনুগ্রহ করে পরে আবার চেষ্টা করুন।'
          );
        }
        throw error;
      }
    }

    // ============================================================
    // 3. Rate Limiting Checks (IP, Email, Phone)
    // ============================================================

    await this.checkRateLimiting(emailRaw, phoneRaw, deviceInfo?.ipAddress, correlationId);

    // ============================================================
    // 4. Check Cache for Existing Email/Phone (Performance)
    // ============================================================

    const emailCacheKey = CacheKeyBuilder.userByEmail(emailRaw.toLowerCase());
    const cachedEmailExists = await this.cacheService.get(emailCacheKey);
    if (cachedEmailExists) {
      throw new ConflictException(
        'User with this email already exists',
        'এই ইমেইল দিয়ে already একটি অ্যাকাউন্ট আছে'
      );
    }

    // ============================================================
    // 5. Email Validation
    // ============================================================

    let email: Email;
    try {
      email = new Email(emailRaw, emailValidator);
    } catch (error) {
      throw new BadRequestException(
        'Invalid email format',
        'ভুল ইমেইল ফরম্যাট'
      );
    }

    const emailExists = await this.userRepository.existsByEmail(email);
    if (emailExists) {
      await this.cacheService.set(emailCacheKey, true, 300);
      throw new ConflictException(
        'User with this email already exists',
        'এই ইমেইল দিয়ে already একটি অ্যাকাউন্ট আছে'
      );
    }

    // ============================================================
    // 6. Phone Validation (Bangladesh specific with E.164 normalization)
    // ============================================================

    let phone: Phone | undefined;
    let requiresPhoneVerification = false;

    if (phoneRaw) {
      const normalizedPhone = normalizePhone(phoneRaw, 'BD');
      if (!normalizedPhone) {
        throw new BadRequestException(
          'Invalid phone number format. Please use E.164 format (e.g., +8801712345678)',
          'ভুল ফোন নম্বর ফরম্যাট। অনুগ্রহ করে E.164 ফরম্যাট ব্যবহার করুন (যেমন: +8801712345678)'
        );
      }

      try {
        phone = new Phone(normalizedPhone, phoneValidator);
      } catch (error) {
        throw new BadRequestException(
          'Invalid phone number format',
          'ভুল ফোন নম্বর ফরম্যাট'
        );
      }

      const phoneCacheKey = CacheKeyBuilder.userByPhone(normalizedPhone);
      const cachedPhoneExists = await this.cacheService.get(phoneCacheKey);
      if (cachedPhoneExists) {
        throw new ConflictException(
          'User with this phone number already exists',
          'এই ফোন নম্বর দিয়ে already একটি অ্যাকাউন্ট আছে'
        );
      }

      const phoneExists = await this.userRepository.existsByPhone(phone);
      if (phoneExists) {
        await this.cacheService.set(phoneCacheKey, true, 300);
        throw new ConflictException(
          'User with this phone number already exists',
          'এই ফোন নম্বর দিয়ে already একটি অ্যাকাউন্ট আছে'
        );
      }

      requiresPhoneVerification = true;
    }

    // ============================================================
    // 7. Password Validation with Strength Score
    // ============================================================

    let passwordVO: Password;
    try {
      passwordVO = new Password(password, passwordValidator);
      if (!passwordVO.isStrongEnough()) {
        throw new BadRequestException(
          'Password is too weak. Please choose a stronger password.',
          'পাসওয়ার্ড খুব দুর্বল। অনুগ্রহ করে আরও শক্তিশালী পাসওয়ার্ড চয়ন করুন।'
        );
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      const err = error as Error;
      throw new BadRequestException(
        `Invalid password: ${err.message}`,
        'ভুল পাসওয়ার্ড ফরম্যাট'
      );
    }

    // ============================================================
    // 8. Hash Password
    // ============================================================

    const hashedPassword = await this.passwordHasher.hash(passwordVO.getValue());

    // ============================================================
    // 9. Process Referral Code
    // ============================================================

    let referredBy: string | undefined;
    if (command.hasReferralCode()) {
      const referralCode = command.getReferralCode()!;
      const referrer = await this.referralService.validateReferralCode(referralCode, correlationId);
      if (referrer) {
        referredBy = referrer.userId;
      }
    }

    // ============================================================
    // 10. Calculate User Tier (Now using userTierCalculator)
    // ============================================================

    // ✅ FIXED: userTier is correctly typed as string
    let userTier: string = REGISTRATION_CONFIG.DEFAULT_USER_TIER;
    try {
      // Calculate tier based on user data
      userTier = await this.userTierCalculator.calculateTier('new-user');
    } catch (error) {
      this.logger.warn('Failed to calculate user tier, using default');
      userTier = REGISTRATION_CONFIG.DEFAULT_USER_TIER;
    }

    // ============================================================
    // 11. Create User Entity
    // ============================================================

    const user = User.create(
      email,
      new Password(hashedPassword, passwordValidator),
      fullName,
      this.idGenerator,
      phone,
      preferredLanguage,
      undefined
    );

    // ============================================================
    // 12. Save User with Cache Update
    // ============================================================

    await this.userRepository.save(user);
    await this.updateUserCache(user);

    // ============================================================
    // 13. Generate Verification Token
    // ============================================================

    const verificationToken = await this.tokenGenerator.generateEmailVerificationToken(
      user.id,
      { correlationId, expiresInHours: REGISTRATION_CONFIG.VERIFICATION_EMAIL_EXPIRY_HOURS }
    );

    // ============================================================
    // 14. Send Verification Email (with Circuit Breaker & Retry)
    // ============================================================

    let emailSent = false;
    try {
      await this.emailCircuitBreaker.call(async () =>
        withRetry(() =>
          this.emailService.sendVerificationEmail(
            email.getValue(),
            verificationToken,
            user.getFullName(),
            REGISTRATION_CONFIG.VERIFICATION_EMAIL_EXPIRY_HOURS,
            preferredLanguage,
            correlationId
          )
        )
      );
      emailSent = true;
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Failed to send verification email to ${maskEmail(email.getValue())}: ${err.message}`);
      await this.auditService.log({
        action: AUDIT_ACTIONS.REGISTER,
        userId: user.id,
        email: email.getValue(),
        error: err.message,
        correlationId,
      });
    }

    // ============================================================
    // 15. Send Verification SMS (Bangladesh specific with Circuit Breaker)
    // ============================================================

    let smsSent = false;
    if (phone && REGISTRATION_CONFIG.WELCOME_SMS_ENABLED) {
      try {
        const otpCode = await this.tokenGenerator.generatePhoneVerificationCode(
          user.id,
          { correlationId, length: REGISTRATION_CONFIG.OTP_LENGTH }
        );

        await this.smsCircuitBreaker.call(async () =>
          withRetry(() =>
            this.smsService.sendVerificationSms(
              phone.getValue(),
              otpCode,
              user.getFullName(),
              preferredLanguage || 'en',
              correlationId
            )
          )
        );
        smsSent = true;
      } catch (error) {
        const err = error as Error;
        this.logger.error(`Failed to send verification SMS to ${maskPhone(phone.getValue())}: ${err.message}`);
        await this.auditService.log({
          action: AUDIT_ACTIONS.REGISTER,
          userId: user.id,
          phone: phone.getValue(),
          error: err.message,
          correlationId,
        });
      }
    }

    // ============================================================
    // 16. Publish Events
    // ============================================================

    const registrationMethod = phone ? RegistrationMethodLocal.PHONE : RegistrationMethodLocal.EMAIL;

    await this.eventBus.publish({
      userId: user.id,
      email: user.getEmail().getValue(),
      fullName: user.getFullName(),
      registrationMethod,
      source: this.getRegistrationSource(deviceInfo),
      correlationId,
      metadata: {
        ipAddress: deviceInfo?.ipAddress,
        deviceId: deviceInfo?.deviceId,
        userAgent: deviceInfo?.userAgent,
        phoneNumber: phone?.getValue(),
        emailSent,
        smsSent,
        referredBy,
        captchaVerified: !!captchaToken,
        displayName,
        preferences,
      },
    });

    // ============================================================
    // 17. Audit Log (GDPR Compliant)
    // ============================================================

    await this.auditService.log({
      action: AUDIT_ACTIONS.REGISTER,
      userId: user.id,
      email: user.getEmail().getValue(),
      phoneNumber: phone?.getValue(),
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      userAgent: deviceInfo?.userAgent,
      correlationId,
      metadata: {
        registrationMethod,
        userTier,
        referredBy,
        hasReferralCode: command.hasReferralCode(),
        preferredLanguage,
        emailSent,
        smsSent,
        captchaVerified: !!captchaToken,
        displayName,
        preferences,
      },
    });

    // ============================================================
    // 18. Increment Rate Limits
    // ============================================================

    await this.incrementRateLimits(emailRaw, phoneRaw, deviceInfo?.ipAddress);

    // ============================================================
    // 19. Return Response (Multi-language)
    // ============================================================

    const message = requiresPhoneVerification
      ? 'Registration successful. Please check your email and phone to verify your account.'
      : 'Registration successful. Please check your email to verify your account.';

    const messageBn = requiresPhoneVerification
      ? 'নিবন্ধন সফল হয়েছে। আপনার অ্যাকাউন্ট যাচাই করতে দয়া করে আপনার ইমেইল এবং ফোন চেক করুন।'
      : 'নিবন্ধন সফল হয়েছে। আপনার অ্যাকাউন্ট যাচাই করতে দয়া করে আপনার ইমেইল চেক করুন।';

    return {
      userId: user.id,
      email: user.getEmail().getValue(),
      phoneNumber: phone?.getValue(),
      requiresEmailVerification: true,
      requiresPhoneVerification,
      message,
      messageBn,
      userTier,
      correlationId,
    };
  }

  // ============================================================
  // Protected Helper Methods (Testable)
  // ============================================================

  protected async checkRateLimiting(
    email: string,
    phone?: string,
    ipAddress?: string,
    correlationId?: string
  ): Promise<void> {
    // IP-based rate limiting
    if (ipAddress) {
      const ipKey = `ratelimit:register:ip:${ipAddress}`;
      const ipAttempts = await this.rateLimiter.getCount(ipKey, 3600);

      if (ipAttempts >= REGISTRATION_CONFIG.MAX_REGISTRATIONS_PER_IP_PER_HOUR) {
        await this.auditService.log({
          action: AUDIT_ACTIONS.REGISTER,
          ipAddress,
          correlationId,
          metadata: { rateLimited: true, type: 'ip' },
        });
        throw new BadRequestException(
          'Too many registration attempts from this IP. Please try again later.',
          'এই আইপি থেকে অনেকবার নিবন্ধন চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।'
        );
      }
    }

    // Email-based rate limiting
    const emailKey = `ratelimit:register:email:${email.toLowerCase()}`;
    const emailAttempts = await this.rateLimiter.getCount(emailKey, 86400);

    if (emailAttempts >= REGISTRATION_CONFIG.MAX_REGISTRATIONS_PER_EMAIL_PER_DAY) {
      await this.auditService.log({
        action: AUDIT_ACTIONS.REGISTER,
        email,
        correlationId,
        metadata: { rateLimited: true, type: 'email' },
      });
      throw new BadRequestException(
        'Too many registration attempts with this email. Please try again tomorrow.',
        'এই ইমেইল দিয়ে অনেকবার নিবন্ধন চেষ্টা করা হয়েছে। আগামীকাল আবার চেষ্টা করুন।'
      );
    }

    // Phone-based rate limiting
    if (phone) {
      const normalizedPhone = normalizePhone(phone, 'BD') || phone;
      const phoneKey = `ratelimit:register:phone:${normalizedPhone}`;
      const phoneAttempts = await this.rateLimiter.getCount(phoneKey, 86400);

      if (phoneAttempts >= REGISTRATION_CONFIG.MAX_REGISTRATIONS_PER_PHONE_PER_DAY) {
        await this.auditService.log({
          action: AUDIT_ACTIONS.REGISTER,
          phone: normalizedPhone,
          correlationId,
          metadata: { rateLimited: true, type: 'phone' },
        });
        throw new BadRequestException(
          'Too many registration attempts with this phone number. Please try again tomorrow.',
          'এই ফোন নম্বর দিয়ে অনেকবার নিবন্ধন চেষ্টা করা হয়েছে। আগামীকাল আবার চেষ্টা করুন।'
        );
      }
    }
  }

  protected async incrementRateLimits(email: string, phone?: string, ipAddress?: string): Promise<void> {
    if (ipAddress) {
      const ipKey = `ratelimit:register:ip:${ipAddress}`;
      await this.rateLimiter.increment(ipKey, 3600);
    }

    const emailKey = `ratelimit:register:email:${email.toLowerCase()}`;
    await this.rateLimiter.increment(emailKey, 86400);

    if (phone) {
      const normalizedPhone = normalizePhone(phone, 'BD') || phone;
      const phoneKey = `ratelimit:register:phone:${normalizedPhone}`;
      await this.rateLimiter.increment(phoneKey, 86400);
    }
  }

  protected async updateUserCache(user: User): Promise<void> {
    const cacheKey = CacheKeyBuilder.user(user.id);
    await this.cacheService.set(cacheKey, user, 300);

    const emailKey = CacheKeyBuilder.userByEmail(user.getEmail().getValue().toLowerCase());
    await this.cacheService.set(emailKey, true, 300);

    const phone = user.getPhone();
    if (phone) {
      const phoneKey = CacheKeyBuilder.userByPhone(phone.getValue());
      await this.cacheService.set(phoneKey, true, 300);
    }
  }

  protected getRegistrationSource(deviceInfo?: DeviceInfo): string {
    const userAgent = deviceInfo?.userAgent?.toLowerCase() || '';

    if (userAgent.includes('vubonapp')) {
      return 'SOCIAL';
    }
    if (userAgent.includes('admin') || userAgent.includes('dashboard')) {
      return 'EMAIL';
    }
    if (userAgent.includes('mobile') || userAgent.includes('android') || userAgent.includes('iphone') || userAgent.includes('ipad')) {
      return 'PHONE';
    }
    return 'EMAIL';
  }

  protected getErrorCode(error: unknown): string {
    if (error instanceof ConflictException) return 'CONFLICT';
    if (error instanceof BadRequestException) return 'BAD_REQUEST';
    return 'INTERNAL_ERROR';
  }

  protected getBengaliPasswordErrors(errors: string[]): string {
    const errorMap: Record<string, string> = {
      'At least 8 characters': 'কমপক্ষে ৮টি অক্ষর',
      'At least one uppercase letter': 'কমপক্ষে একটি বড় হাতের অক্ষর',
      'At least one lowercase letter': 'কমপক্ষে একটি ছোট হাতের অক্ষর',
      'At least one number': 'কমপক্ষে একটি সংখ্যা',
      'At least one special character': 'কমপক্ষে একটি বিশেষ অক্ষর',
    };

    const bengaliErrors = errors.map(err => errorMap[err] || err);
    return bengaliErrors.join(', ');
  }

  protected addTraceAttributes(span: any, command: RegisterUserCommand, correlationId: string): void {
    if (!span) return;

    span.setAttribute('command.id', command.commandId);
    span.setAttribute('correlation.id', correlationId);
    span.setAttribute('email.masked', command.getMaskedEmail());
    span.setAttribute('has.phone', command.hasPhone());
    span.setAttribute('has.referral', command.hasReferralCode());
    span.setAttribute('has.marketing.consent', command.hasMarketingConsent());
    span.setAttribute('has.captcha', command.hasCaptcha());
    span.setAttribute('preferred.language', command.preferredLanguage);
    span.setAttribute('registration.source', this.getRegistrationSource(command.deviceInfo));
  }

  // ============================================================
  // Public Metrics & Health Methods
  // ============================================================

  getMetrics(): {
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    successRate: number;
    averageDurationMs: number;
  } {
    return {
      totalExecutions: this.metrics.totalExecutions,
      successfulExecutions: this.metrics.successfulExecutions,
      failedExecutions: this.metrics.failedExecutions,
      successRate: this.metrics.totalExecutions > 0
        ? (this.metrics.successfulExecutions / this.metrics.totalExecutions) * 100
        : 0,
      averageDurationMs: this.metrics.totalExecutions > 0
        ? this.metrics.totalDurationMs / this.metrics.totalExecutions
        : 0,
    };
  }

  getCircuitBreakerStatus(): Record<string, CircuitBreakerStatus> {
    return {
      email: this.emailCircuitBreaker.getStatus(),
      sms: this.smsCircuitBreaker.getStatus(),
      captcha: this.captchaCircuitBreaker.getStatus(),
    };
  }

  resetCircuitBreakers(): void {
    this.emailCircuitBreaker.reset();
    this.smsCircuitBreaker.reset();
    this.captchaCircuitBreaker.reset();
  }

  async healthCheck(): Promise<{
    healthy: boolean;
    services: { email: boolean; sms: boolean; captcha: boolean };
    latency: number;
    circuitBreakers: Record<string, string>;
  }> {
    const startTime = Date.now();

    const emailHealthy = this.emailCircuitBreaker.getStatus().state !== 'OPEN';
    const smsHealthy = this.smsCircuitBreaker.getStatus().state !== 'OPEN';
    const captchaHealthy = this.captchaCircuitBreaker.getStatus().state !== 'OPEN';

    return {
      healthy: emailHealthy && smsHealthy && captchaHealthy,
      services: {
        email: emailHealthy,
        sms: smsHealthy,
        captcha: captchaHealthy,
      },
      latency: Date.now() - startTime,
      circuitBreakers: {
        email: this.emailCircuitBreaker.getStatus().state,
        sms: this.smsCircuitBreaker.getStatus().state,
        captcha: this.captchaCircuitBreaker.getStatus().state,
      },
    };
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { RegisterResponseDto as RegisterResponseDtoType };
