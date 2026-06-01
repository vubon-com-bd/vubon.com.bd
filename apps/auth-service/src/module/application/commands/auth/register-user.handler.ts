/**
 * Register User Command Handler - Application Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/register-user.handler
 * 
 * @description
 * Handles user registration use case with security features including:
 * - Email/phone uniqueness validation
 * - Password hashing
 * - Email verification flow
 * - Welcome email/SMS (Bangladesh specific)
 * - CAPTCHA validation
 * - Rate limiting
 * - Audit logging
 * - Referral code processing
 * - User tier assignment
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only registration
 * ✅ Repository coordination
 * ✅ Event publishing
 * ✅ Security validation
 * ✅ Audit logging
 * ✅ Bangladesh specific - SMS/WhatsApp verification
 */

import { Injectable, ConflictException, BadRequestException, TooManyRequestsException } from '@nestjs/common';

import { RegisterUserCommand, DeviceInfo } from './register-user.command';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { Email } from '../../../domain/value-objects/email.vo';
import { Password } from '../../../domain/value-objects/password.vo';
import { Phone } from '../../../domain/value-objects/phone.vo';
import { UserTier } from '../../../domain/entities/user.entity';

import { 
  UserRegisteredEvent, 
  RegistrationMethod, 
  RegistrationSource,
  WelcomeEmailSentEvent,
  WelcomeSmsSentEvent
} from '../../events/user-registered.event';

import { 
  PasswordHasher, 
  EventBus, 
  AuditService, 
  RateLimiter, 
  EmailService, 
  SmsService,
  CaptchaService,
  TokenGenerator,
  ReferralService,
  UserTierCalculator
} from './infrastructure.interface';

// ============================================================
// Constants
// ============================================================

const REGISTRATION_CONFIG = {
  MAX_REGISTRATIONS_PER_IP_PER_HOUR: 5,
  MAX_REGISTRATIONS_PER_EMAIL_PER_DAY: 3,
  MAX_REGISTRATIONS_PER_PHONE_PER_DAY: 3,
  VERIFICATION_EMAIL_EXPIRY_HOURS: 24,
  VERIFICATION_SMS_EXPIRY_MINUTES: 10,
  WELCOME_SMS_ENABLED: true,
  DEFAULT_USER_TIER: UserTier.BRONZE,
};

// ============================================================
// Register Response DTO
// ============================================================

export interface RegisterResponseDto {
  userId: string;
  email: string;
  phoneNumber?: string;
  requiresEmailVerification: boolean;
  requiresPhoneVerification: boolean;
  message: string;
  messageBn?: string;
  userTier: UserTier;
}

// ============================================================
// Register User Handler
// ============================================================

@Injectable()
export class RegisterUserHandler {
  constructor(
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
    private readonly userTierCalculator: UserTierCalculator
  ) {}

  async execute(command: RegisterUserCommand): Promise<RegisterResponseDto> {
    const { 
      email: emailRaw, 
      password, 
      confirmPassword,
      fullName, 
      deviceInfo, 
      captchaToken, 
      acceptTerms,
      acceptPrivacy,
      phone: phoneRaw, 
      displayName,
      preferredLanguage,
      preferences,
      correlationId 
    } = command;

    // ============================================================
    // 1. Input Validation
    // ============================================================

    // Validate terms acceptance
    if (!command.hasAcceptedTerms()) {
      throw new BadRequestException('You must accept the terms and conditions to register');
    }

    if (!command.hasAcceptedPrivacy()) {
      throw new BadRequestException('You must accept the privacy policy to register');
    }

    // Validate password match
    if (!command.doPasswordsMatch()) {
      throw new BadRequestException('Passwords do not match');
    }

    // ============================================================
    // 2. CAPTCHA Validation
    // ============================================================
    
    if (captchaToken) {
      const isValid = await this.captchaService.validate(captchaToken);
      if (!isValid) {
        throw new BadRequestException('Invalid CAPTCHA. Please try again.');
      }
    }

    // ============================================================
    // 3. Rate Limiting Checks
    // ============================================================
    
    await this.checkRateLimiting(emailRaw, phoneRaw, deviceInfo?.ipAddress, correlationId);

    // ============================================================
    // 4. Email Validation
    // ============================================================
    
    let email: Email;
    try {
      email = new Email(emailRaw);
    } catch (error) {
      throw new BadRequestException('Invalid email format');
    }

    // Check email uniqueness
    const emailExists = await this.userRepository.existsByEmail(email);
    if (emailExists) {
      throw new ConflictException('User with this email already exists');
    }

    // ============================================================
    // 5. Phone Validation (Bangladesh specific)
    // ============================================================
    
    let phone: Phone | undefined;
    let requiresPhoneVerification = false;
    
    if (phoneRaw) {
      try {
        phone = new Phone(phoneRaw);
      } catch (error) {
        throw new BadRequestException('Invalid phone number format. Please use E.164 format (e.g., +8801712345678)');
      }
      
      const phoneExists = await this.userRepository.existsByPhone(phone);
      if (phoneExists) {
        throw new ConflictException('User with this phone number already exists');
      }
      
      requiresPhoneVerification = true;
    }

    // ============================================================
    // 6. Password Validation
    // ============================================================
    
    let passwordVO: Password;
    try {
      passwordVO = new Password(password);
      const validation = Password.validate(password);
      if (!validation.isValid) {
        throw new BadRequestException(validation.errors.join(', '));
      }
      if (validation.strength === 'weak' || validation.strength === 'very_weak') {
        throw new BadRequestException('Password is too weak. Please choose a stronger password.');
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException('Invalid password format');
    }

    // ============================================================
    // 7. Hash Password
    // ============================================================
    
    const hashedPassword = await this.passwordHasher.hash(passwordVO.getValue());

    // ============================================================
    // 8. Process Referral Code
    // ============================================================
    
    let referredBy: string | undefined;
    if (command.hasReferralCode()) {
      const referralCode = command.getReferralCode()!;
      const referrer = await this.referralService.validateReferralCode(referralCode);
      if (referrer) {
        referredBy = referrer.userId;
      }
    }

    // ============================================================
    // 9. Calculate User Tier
    // ============================================================
    
    const userTier = REGISTRATION_CONFIG.DEFAULT_USER_TIER;

    // ============================================================
    // 10. Create User Entity
    // ============================================================
    
    const user = User.create(
      email,
      new Password(hashedPassword),
      fullName,
      phone,
      undefined, // id generator will be injected
      displayName,
      preferredLanguage,
      preferences?.preferredDistrict,
      preferences?.preferredUpazila,
      userTier,
      preferences?.marketingConsent
    );

    // ============================================================
    // 11. Save User
    // ============================================================
    
    await user.save(this.userRepository);

    // ============================================================
    // 12. Generate Verification Token
    // ============================================================
    
    const verificationToken = await this.tokenGenerator.generateEmailVerificationToken(user.getId());

    // ============================================================
    // 13. Send Verification Email
    // ============================================================
    
    await this.emailService.sendVerificationEmail(
      email.getValue(),
      verificationToken,
      user.getFullName(),
      REGISTRATION_CONFIG.VERIFICATION_EMAIL_EXPIRY_HOURS,
      preferredLanguage
    );

    // ============================================================
    // 14. Send Verification SMS (if phone provided - Bangladesh specific)
    // ============================================================
    
    let smsSent = false;
    if (phone && REGISTRATION_CONFIG.WELCOME_SMS_ENABLED) {
      try {
        const otpCode = await this.tokenGenerator.generatePhoneVerificationCode(user.getId());
        await this.smsService.sendVerificationSms(
          phone.getValue(),
          otpCode,
          user.getFullName(),
          preferredLanguage || 'en'
        );
        smsSent = true;
      } catch (error) {
        // Log error but don't block registration
        await this.auditService.log({
          action: 'SMS_SEND_FAILED',
          userId: user.getId(),
          phone: phone.getValue(),
          error: error.message,
        });
      }
    }

    // ============================================================
    // 15. Publish Events
    // ============================================================
    
    const registrationMethod = phone ? RegistrationMethod.EMAIL_AND_PHONE : RegistrationMethod.EMAIL_PASSWORD;
    
    await this.eventBus.publish(
      new UserRegisteredEvent(
        user.getId(),
        user.getEmail().getValue(),
        user.getFullName(),
        registrationMethod,
        this.getRegistrationSource(deviceInfo),
        correlationId,
        undefined,
        deviceInfo?.ipAddress,
        deviceInfo?.deviceId,
        deviceInfo?.userAgent,
        false,
        false,
        phone?.getValue(),
        user.getRole(),
        userTier,
        {
          userAgent: deviceInfo?.userAgent,
          captchaVerified: !!captchaToken,
          referralCode: command.getReferralCode(),
          referredBy,
          preferredLanguage,
          marketingConsent: preferences?.marketingConsent,
        }
      )
    );

    // Publish welcome email event
    await this.eventBus.publish(
      new WelcomeEmailSentEvent(
        user.getId(),
        user.getEmail().getValue(),
        user.getFullName(),
        preferredLanguage || 'en'
      )
    );

    if (smsSent && phone) {
      await this.eventBus.publish(
        new WelcomeSmsSentEvent(
          user.getId(),
          phone.getValue(),
          user.getFullName(),
          preferredLanguage || 'en'
        )
      );
    }

    // ============================================================
    // 16. Audit Log
    // ============================================================
    
    await this.auditService.log({
      action: 'USER_REGISTERED',
      userId: user.getId(),
      email: email.getValue(),
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
      },
    });

    // ============================================================
    // 17. Increment Rate Limits
    // ============================================================
    
    await this.incrementRateLimits(emailRaw, phoneRaw, deviceInfo?.ipAddress);

    // ============================================================
    // 18. Return Response
    // ============================================================
    
    const message = requiresPhoneVerification
      ? 'Registration successful. Please check your email and phone to verify your account.'
      : 'Registration successful. Please check your email to verify your account.';
    
    const messageBn = requiresPhoneVerification
      ? 'নিবন্ধন সফল হয়েছে। আপনার অ্যাকাউন্ট যাচাই করতে দয়া করে আপনার ইমেইল এবং ফোন চেক করুন।'
      : 'নিবন্ধন সফল হয়েছে। আপনার অ্যাকাউন্ট যাচাই করতে দয়া করে আপনার ইমেইল চেক করুন।';

    return {
      userId: user.getId(),
      email: user.getEmail().getValue(),
      phoneNumber: phone?.getValue(),
      requiresEmailVerification: true,
      requiresPhoneVerification,
      message,
      messageBn,
      userTier,
    };
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  private async checkRateLimiting(
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
          action: 'REGISTRATION_RATE_LIMITED_IP',
          ipAddress,
          correlationId,
        });
        throw new TooManyRequestsException('Too many registration attempts from this IP. Please try again later.');
      }
    }

    // Email-based rate limiting
    const emailKey = `ratelimit:register:email:${email.toLowerCase()}`;
    const emailAttempts = await this.rateLimiter.getCount(emailKey, 86400);
    
    if (emailAttempts >= REGISTRATION_CONFIG.MAX_REGISTRATIONS_PER_EMAIL_PER_DAY) {
      await this.auditService.log({
        action: 'REGISTRATION_RATE_LIMITED_EMAIL',
        email,
        correlationId,
      });
      throw new TooManyRequestsException('Too many registration attempts with this email. Please try again tomorrow.');
    }

    // Phone-based rate limiting (Bangladesh specific)
    if (phone) {
      const phoneKey = `ratelimit:register:phone:${phone}`;
      const phoneAttempts = await this.rateLimiter.getCount(phoneKey, 86400);
      
      if (phoneAttempts >= REGISTRATION_CONFIG.MAX_REGISTRATIONS_PER_PHONE_PER_DAY) {
        await this.auditService.log({
          action: 'REGISTRATION_RATE_LIMITED_PHONE',
          phone,
          correlationId,
        });
        throw new TooManyRequestsException('Too many registration attempts with this phone number. Please try again tomorrow.');
      }
    }
  }

  private async incrementRateLimits(email: string, phone?: string, ipAddress?: string): Promise<void> {
    if (ipAddress) {
      const ipKey = `ratelimit:register:ip:${ipAddress}`;
      await this.rateLimiter.increment(ipKey, 3600);
    }
    
    const emailKey = `ratelimit:register:email:${email.toLowerCase()}`;
    await this.rateLimiter.increment(emailKey, 86400);
    
    if (phone) {
      const phoneKey = `ratelimit:register:phone:${phone}`;
      await this.rateLimiter.increment(phoneKey, 86400);
    }
  }

  private getRegistrationSource(deviceInfo?: DeviceInfo): RegistrationSource {
    const userAgent = deviceInfo?.userAgent?.toLowerCase() || '';
    
    if (userAgent.includes('vubonapp')) {
      return RegistrationSource.MOBILE_APP;
    }
    if (userAgent.includes('admin') || userAgent.includes('dashboard')) {
      return RegistrationSource.ADMIN_PORTAL;
    }
    if (userAgent.includes('mobile') || userAgent.includes('android') || userAgent.includes('iphone') || userAgent.includes('ipad')) {
      return RegistrationSource.MOBILE_WEB;
    }
    return RegistrationSource.WEB;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { RegisterResponseDto as RegisterResponseDtoType };
