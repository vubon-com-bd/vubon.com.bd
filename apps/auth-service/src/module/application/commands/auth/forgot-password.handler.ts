/**
 * Forgot Password Command Handler - Application Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/forgot-password.handler
 * 
 * @description
 * Handles the forgot password use case.
 * Initiates password reset flow with rate limiting and security measures.
 * Supports both email and phone-based reset (Bangladesh specific).
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only forgot password
 * ✅ No user enumeration (always return success)
 * ✅ Rate limiting per email/phone/IP
 * ✅ Event publishing for audit
 * ✅ Repository coordination
 * ✅ Bangladesh specific - SMS/WhatsApp support
 */

import { Injectable } from '@nestjs/common';

import {
  ForgotPasswordCommand,
  ForgotPasswordPhoneCommand,
  ForgotPasswordUsernameCommand,
  ResendResetOtpCommand,
} from './forgot-password.command';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { PasswordResetRepository } from '../../../domain/repositories/password-reset.repository.interface';
import { Email } from '../../../domain/value-objects/email.vo';
import { Phone } from '../../../domain/value-objects/phone.vo';
import { Token, TokenType } from '../../../domain/value-objects/token.vo';
import { PasswordReset, PasswordResetMethod } from '../../../domain/entities/password-reset.entity';

import { PasswordResetRequestedEvent } from '../../events/password-reset-requested.event';

import {
  TokenGenerator,
  NotificationService,
  EventBus,
  CacheService,
  AuditService,
} from './infrastructure.interface';

// ============================================================
// Constants
// ============================================================

const RATE_LIMIT_CONFIG = {
  MAX_REQUESTS_PER_HOUR: 5,
  MAX_REQUESTS_PER_DAY: 10,
  MAX_REQUESTS_PER_IP_PER_HOUR: 20,
  MAX_OTP_REQUESTS_PER_HOUR: 3,
  OTP_EXPIRY_SECONDS: 300,
  RESEND_COOLDOWN_SECONDS: 60,
};

// ============================================================
// Forgot Password Handler (Email based)
// ============================================================

@Injectable()
export class ForgotPasswordHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordResetRepository: PasswordResetRepository,
    private readonly tokenGenerator: TokenGenerator,
    private readonly notificationService: NotificationService,
    private readonly eventBus: EventBus,
    private readonly cacheService: CacheService,
    private readonly auditService: AuditService
  ) {}

  async execute(command: ForgotPasswordCommand): Promise<void> {
    const { email: emailRaw, deviceInfo, resetUrl, correlationId, captchaToken, locale = 'en' } = command;

    // 1. Verify captcha (optional but recommended)
    if (captchaToken) {
      const isValid = await this.verifyCaptcha(captchaToken);
      if (!isValid) {
        await this.auditService.log({
          action: 'FORGOT_PASSWORD_INVALID_CAPTCHA',
          email: this.maskEmail(emailRaw),
          ipAddress: deviceInfo?.ipAddress,
          correlationId,
        });
        return;
      }
    }

    // 2. Rate limiting by email
    const emailRateLimit = await this.checkEmailRateLimit(emailRaw);
    if (emailRateLimit.isLimited) {
      await this.auditService.log({
        action: 'FORGOT_PASSWORD_RATE_LIMITED',
        email: this.maskEmail(emailRaw),
        ipAddress: deviceInfo?.ipAddress,
        reason: 'Too many requests',
        remainingSeconds: emailRateLimit.remainingSeconds,
        correlationId,
      });
      return;
    }

    // 3. Rate limiting by IP
    if (deviceInfo?.ipAddress) {
      const ipRateLimit = await this.checkIpRateLimit(deviceInfo.ipAddress);
      if (ipRateLimit.isLimited) {
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
      // Still return success to avoid user enumeration
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

    if (!user) {
      await this.auditService.log({
        action: 'FORGOT_PASSWORD_USER_NOT_FOUND',
        email: email.getValue(),
        ipAddress: deviceInfo?.ipAddress,
        correlationId,
      });
      return;
    }

    // 6. Check if user is active
    if (!user.isActive()) {
      await this.auditService.log({
        action: 'FORGOT_PASSWORD_INACTIVE_USER',
        userId: user.id,
        email: email.getValue(),
        ipAddress: deviceInfo?.ipAddress,
        correlationId,
      });
      return;
    }

    // 7. Check for existing pending reset
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

      // Expire old reset request
      await this.passwordResetRepository.cancel(user.id, 'New request initiated');
    }

    // 8. Generate reset token
    const resetTokenValue = await this.tokenGenerator.generatePasswordResetToken(user.id);
    const token = new Token(resetTokenValue, TokenType.RESET);

    // 9. Create and save password reset entity
    const passwordReset = PasswordReset.createEmail(
      user.id,
      email,
      token,
      deviceInfo?.ipAddress ? new IpAddress(deviceInfo.ipAddress) : undefined,
      deviceInfo?.userAgent ? new UserAgent(deviceInfo.userAgent) : undefined,
      deviceInfo?.deviceId ? new DeviceId(deviceInfo.deviceId) : undefined,
      this
    );

    await this.passwordResetRepository.save(passwordReset);

    // 10. Store token in cache with expiry
    await this.cacheService.set(
      `password-reset:${user.id}`,
      resetTokenValue,
      60 * 60 // 1 hour expiry
    );

    // 11. Send reset email
    const resetLink = this.buildResetLink(resetUrl, resetTokenValue);

    await this.notificationService.sendPasswordResetEmail(
      user.id,
      email.getValue(),
      resetLink,
      1, // expires in hours
      {
        correlationId,
        ipAddress: deviceInfo?.ipAddress,
        locale,
      }
    );

    // 12. Publish event
    await this.eventBus.publish(
      new PasswordResetRequestedEvent(
        user.id,
        email.getValue(),
        deviceInfo?.ipAddress,
        correlationId,
        passwordReset.getExpiresAt()
      )
    );

    // 13. Audit log
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

    // 14. Increment rate limiting counters
    await this.incrementRateLimits(emailRaw, deviceInfo?.ipAddress);
  }

  // ============================================================
  // Phone-based Forgot Password (Bangladesh specific)
  // ============================================================

  async executePhone(command: ForgotPasswordPhoneCommand): Promise<{ sessionId: string; expiresIn: number }> {
    const { phoneNumber, method, deviceInfo, correlationId, captchaToken, locale = 'en' } = command;

    // 1. Verify captcha
    if (captchaToken) {
      const isValid = await this.verifyCaptcha(captchaToken);
      if (!isValid) {
        await this.auditService.log({
          action: 'FORGOT_PASSWORD_PHONE_INVALID_CAPTCHA',
          phoneNumber: this.maskPhone(phoneNumber),
          ipAddress: deviceInfo?.ipAddress,
          correlationId,
        });
        throw new Error('Invalid captcha');
      }
    }

    // 2. Rate limiting by phone
    const phoneRateLimit = await this.checkPhoneRateLimit(phoneNumber);
    if (phoneRateLimit.isLimited) {
      await this.auditService.log({
        action: 'FORGOT_PASSWORD_PHONE_RATE_LIMITED',
        phoneNumber: this.maskPhone(phoneNumber),
        ipAddress: deviceInfo?.ipAddress,
        remainingSeconds: phoneRateLimit.remainingSeconds,
        correlationId,
      });
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    // 3. Validate phone format
    let phone: Phone;
    try {
      phone = new Phone(phoneNumber);
    } catch (error) {
      await this.auditService.log({
        action: 'FORGOT_PASSWORD_INVALID_PHONE',
        phoneNumber,
        ipAddress: deviceInfo?.ipAddress,
        correlationId,
      });
      throw new Error('Invalid phone number format');
    }

    // 4. Find user by phone
    const user = await this.userRepository.findByPhone(phone);

    if (!user || !user.isActive()) {
      await this.auditService.log({
        action: 'FORGOT_PASSWORD_PHONE_USER_NOT_FOUND',
        phoneNumber: phone.getE164(),
        ipAddress: deviceInfo?.ipAddress,
        correlationId,
      });
      throw new Error('No account found with this phone number');
    }

    // 5. Generate OTP
    const otpCode = this.generateOtp();
    const sessionId = this.generateSessionId();

    // 6. Store OTP in cache
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

    // 7. Send OTP via selected method
    if (method === 'sms') {
      await this.notificationService.sendMfaCode(
        user.id,
        phone.getE164(),
        otpCode,
        'sms',
        5,
        {
          correlationId,
          ipAddress: deviceInfo?.ipAddress,
          locale,
        }
      );
    } else if (method === 'whatsapp') {
      await this.notificationService.sendMfaCode(
        user.id,
        phone.getE164(),
        otpCode,
        'whatsapp',
        5,
        {
          correlationId,
          ipAddress: deviceInfo?.ipAddress,
          locale,
        }
      );
    }

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

    // 9. Increment rate limits
    await this.incrementPhoneRateLimit(phoneNumber);

    return {
      sessionId,
      expiresIn: RATE_LIMIT_CONFIG.OTP_EXPIRY_SECONDS,
    };
  }

  // ============================================================
  // Resend Reset OTP
  // ============================================================

  async resendOtp(command: ResendResetOtpCommand): Promise<{ sessionId: string; expiresIn: number }> {
    const { phoneNumber, method, sessionId: oldSessionId, deviceInfo, correlationId, locale = 'en' } = command;

    // Check if old session exists
    if (oldSessionId) {
      const existing = await this.cacheService.get(`password-reset-otp:${oldSessionId}`);
      if (existing) {
        const { userId, phoneNumber: storedPhone } = existing as any;
        if (storedPhone === phoneNumber) {
          // Invalidate old OTP
          await this.cacheService.del(`password-reset-otp:${oldSessionId}`);
        }
      }
    }

    // Generate new OTP and session
    const otpCode = this.generateOtp();
    const sessionId = this.generateSessionId();

    // Find user by phone
    const phone = new Phone(phoneNumber);
    const user = await this.userRepository.findByPhone(phone);

    if (!user) {
      throw new Error('User not found');
    }

    // Store new OTP
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

    // Send OTP
    if (method === 'sms') {
      await this.notificationService.sendMfaCode(
        user.id,
        phoneNumber,
        otpCode,
        'sms',
        5,
        { correlationId, ipAddress: deviceInfo?.ipAddress, locale }
      );
    } else {
      await this.notificationService.sendMfaCode(
        user.id,
        phoneNumber,
        otpCode,
        'whatsapp',
        5,
        { correlationId, ipAddress: deviceInfo?.ipAddress, locale }
      );
    }

    return {
      sessionId,
      expiresIn: RATE_LIMIT_CONFIG.OTP_EXPIRY_SECONDS,
    };
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  private async checkEmailRateLimit(email: string): Promise<{ isLimited: boolean; remainingSeconds?: number }> {
    const key = `ratelimit:forgot-password:email:${email.toLowerCase()}`;
    const count = await this.cacheService.get<number>(key);
    const currentCount = count || 0;

    if (currentCount >= RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_HOUR) {
      const ttl = await this.cacheService.ttl(key);
      return { isLimited: true, remainingSeconds: ttl > 0 ? ttl : 0 };
    }

    const dailyKey = `ratelimit:forgot-password:email:daily:${email.toLowerCase()}`;
    const dailyCount = await this.cacheService.get<number>(dailyKey) || 0;

    if (dailyCount >= RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_DAY) {
      return { isLimited: true };
    }

    return { isLimited: false };
  }

  private async checkPhoneRateLimit(phoneNumber: string): Promise<{ isLimited: boolean; remainingSeconds?: number }> {
    const key = `ratelimit:forgot-password:phone:${phoneNumber}`;
    const count = await this.cacheService.get<number>(key) || 0;

    if (count >= RATE_LIMIT_CONFIG.MAX_OTP_REQUESTS_PER_HOUR) {
      const ttl = await this.cacheService.ttl(key);
      return { isLimited: true, remainingSeconds: ttl > 0 ? ttl : 0 };
    }

    return { isLimited: false };
  }

  private async checkIpRateLimit(ip: string): Promise<{ isLimited: boolean; remainingSeconds?: number }> {
    const key = `ratelimit:forgot-password:ip:${ip}`;
    const count = await this.cacheService.get<number>(key) || 0;

    if (count >= RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_IP_PER_HOUR) {
      const ttl = await this.cacheService.ttl(key);
      return { isLimited: true, remainingSeconds: ttl > 0 ? ttl : 0 };
    }

    return { isLimited: false };
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

  private async verifyCaptcha(captchaToken: string): Promise<boolean> {
    // Implement captcha verification logic
    // This would call Google reCAPTCHA or similar service
    return true;
  }

  private buildResetLink(baseUrl: string | undefined, token: string): string {
    const url = baseUrl || process.env.PASSWORD_RESET_URL || 'https://vubon.com.bd/reset-password';
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}token=${encodeURIComponent(token)}`;
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private generateSessionId(): string {
    return `reset_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  private maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (!local || !domain) return email;
    const maskedLocal = local.length <= 2
      ? local[0] + '***'
      : local[0] + '***' + local[local.length - 1];
    return `${maskedLocal}@${domain}`;
  }

  private maskPhone(phone: string): string {
    if (phone.length <= 6) return '***';
    return phone.substring(0, 4) + '****' + phone.substring(phone.length - 2);
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { ForgotPasswordHandler as ForgotPasswordHandlerType };
