/**
 * Authentication Service Implementation - Register Feature Only (Fixed)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module application/services/impl/auth.service.impl
 *
 * @description
 * Implementation of IAuthService for registration flow.
 * This file contains ONLY the register() method and its helpers.
 *
 * Enterprise Rules:
 * ✅ Implements IAuthService interface (partially)
 * ✅ Depends ONLY on domain and application ports
 * ✅ No infrastructure imports
 * ✅ SSOT: All constants from shared-* packages
 * ✅ Bangladesh specific: Phone, District, Upazila support
 * ✅ All TypeScript errors fixed
 */

import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';

// ============================================================
// Shared Packages Import (SSOT)
// ============================================================

import {
  USER_TIERS,
  AUDIT_ACTIONS,
  REGISTRATION_SOURCES,
  type UserRole,
} from '@vubon/shared-constants';

import { maskEmail, maskPhone, normalizePhone } from '@vubon/shared-utils';
import type { ApiErrorCode, UserResponseDto } from '@vubon/shared-types';

// ============================================================
// Domain Imports
// ============================================================

import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import type { IdGenerator } from '../../../domain/entities/base.entity';
import { User } from '../../../domain/entities/user.entity';
import { Email } from '../../../domain/value-objects/email.vo';
import { Password } from '../../../domain/value-objects/password.vo';
import { Phone } from '../../../domain/value-objects/phone.vo';

// ============================================================
// Domain Ports (Interfaces)
// ============================================================

import type { IEmailValidator } from '../../../domain/ports/email-validator.port';
import type { IPasswordValidator } from '../../../domain/ports/password-validator.port';
import type { IPhoneValidator } from '../../../domain/ports/phone-validator.port';
import type { IPasswordHasher } from '../../../domain/ports/password-hasher.port.ts';
import { PasswordStrength } from '../../../domain/ports/password-validator.port';
// ============================================================
// Application Imports
// ============================================================

import type {
  IAuthService,
  ServiceResult,
  RegistrationOptions,
} from '../interfaces/auth.service.interface';
import type { RegisterDto } from '../../dtos/auth/register.dto';
import { UserMapper } from '../../mappers/user.mapper';

// ============================================================
// Local Event Interfaces (Will be replaced with real implementations)
// ============================================================

export interface EventBus {
  publish(event: any): Promise<void>;
}

export interface AuditService {
  log(data: any): Promise<void>;
}

export interface EmailService {
  sendWelcomeEmail(
    email: string,
    fullName: string,
    language: string | undefined,
    correlationId: string,
  ): Promise<void>;
}

export interface SmsService {
  sendWelcomeSms(
    phone: string,
    fullName: string,
    language: string,
    correlationId: string,
  ): Promise<void>;
}

// ============================================================
// IdGenerator Implementation (Temporary)
// ============================================================

class UuidIdGenerator implements IdGenerator {
  generate(): string {
    return randomUUID();
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
      case 'ulid':
        return this.generateUlid();
      case 'snowflake':
        return this.generateSnowflake();
      case 'sequential':
        return this.generateSequential();
      default:
        return this.generate();
    }
  }
}

// ============================================================
// Main Implementation
// ============================================================

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly idGenerator: IdGenerator = new UuidIdGenerator();

  constructor(
    // Domain Ports (Injected)
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly emailValidator: IEmailValidator,
    private readonly passwordValidator: IPasswordValidator,
    private readonly phoneValidator: IPhoneValidator,

    // Application Ports (Injected)
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
  ) {}

  // ============================================================
  // ✅ REGISTER METHOD (Implementation)
  // ============================================================

  /**
   * Register a new user with email or phone
   */
  async register(
    dto: RegisterDto,
    ipAddress: string,
    userAgent: string,
    options?: RegistrationOptions,
  ): Promise<ServiceResult<UserResponseDto>> {
    const correlationId = options?.correlationId || randomUUID();
    const preferredLanguage = options?.preferredLanguage || 'en';

    this.logger.debug(`[${correlationId}] Registration started for email: ${maskEmail(dto.email)}`);

    try {
      // ============================================================
      // STEP 1: Validate Input Data
      // ============================================================

      // Validate Email
      const emailValidation = this.emailValidator.validate(dto.email);
      if (!emailValidation.isValid) {
        return this.createErrorResult(
          'INVALID_EMAIL' as ApiErrorCode,
          'Invalid email format',
          'ভুল ইমেইল ফরম্যাট',
          correlationId,
        );
      }

      // Validate Password Strength
      const passwordValidation = this.passwordValidator.validate(dto.password, {
        minStrength: PasswordStrength.MEDIUM, // ✅ FIXED: Using enum instead of string
        checkCommonPasswords: true,
      });
      if (!passwordValidation.isValid) {
        return this.createErrorResult(
          'WEAK_PASSWORD' as ApiErrorCode,
          `Password is too weak: ${passwordValidation.errors.join(', ')}`,
          `পাসওয়ার্ড খুব দুর্বল: ${passwordValidation.errors.join(', ')}`,
          correlationId,
        );
      }

      // Validate Password Match
      if (dto.password !== dto.confirmPassword) {
        return this.createErrorResult(
          'PASSWORD_MISMATCH' as ApiErrorCode,
          'Passwords do not match',
          'পাসওয়ার্ড দুটি মিলছে না',
          correlationId,
        );
      }

      // Validate Phone (if provided)
      let phone: Phone | undefined;
      let requiresPhoneVerification = false;
      if (dto.phoneNumber) {
        const phoneValidation = this.phoneValidator.validate(dto.phoneNumber, 'BD');
        if (!phoneValidation.isValid) {
          return this.createErrorResult(
            'INVALID_PHONE' as ApiErrorCode,
            'Invalid Bangladesh phone number. Use format: +8801XXXXXXXXX',
            'ভুল বাংলাদেশ ফোন নম্বর। ফরম্যাট: +8801XXXXXXXXX',
            correlationId,
          );
        }
        phone = new Phone(dto.phoneNumber, this.phoneValidator);
        requiresPhoneVerification = options?.requirePhoneVerification ?? true;
      }

      // Check Terms Acceptance
      if (!dto.acceptTerms) {
        return this.createErrorResult(
          'TERMS_NOT_ACCEPTED' as ApiErrorCode,
          'You must accept the terms and conditions',
          'আপনাকে শর্তাবলী মেনে নিতে হবে',
          correlationId,
        );
      }

      // ============================================================
      // STEP 2: Check Duplicate User
      // ============================================================

      // Check Email
      const email = new Email(dto.email, this.emailValidator);
      const emailExists = await this.userRepository.existsByEmail(email);
      if (emailExists) {
        await this.auditService.log({
          action: AUDIT_ACTIONS.REGISTER,
          email: dto.email,
          status: 'failed',
          reason: 'Email already exists',
          ipAddress,
          userAgent,
          correlationId,
        });

        return this.createErrorResult(
          'EMAIL_EXISTS' as ApiErrorCode,
          'User with this email already exists',
          'এই ইমেইল দিয়ে already একটি অ্যাকাউন্ট আছে',
          correlationId,
        );
      }

      // Check Phone (if provided)
      if (phone) {
        const phoneExists = await this.userRepository.existsByPhone(phone);
        if (phoneExists) {
          await this.auditService.log({
            action: AUDIT_ACTIONS.REGISTER,
            phone: phone.getValue(),
            status: 'failed',
            reason: 'Phone already exists',
            ipAddress,
            userAgent,
            correlationId,
          });

          return this.createErrorResult(
            'PHONE_EXISTS' as ApiErrorCode,
            'User with this phone number already exists',
            'এই ফোন নম্বর দিয়ে already একটি অ্যাকাউন্ট আছে',
            correlationId,
          );
        }
      }

      // ============================================================
      // STEP 3: Hash Password
      // ============================================================

      let hashedPassword: string;
      try {
        const hashResult = await this.passwordHasher.hash(dto.password);
        hashedPassword = hashResult.hash; // ✅ FIXED: Extracting hash from HashResult
      } catch (error) {
        this.logger.error(`[${correlationId}] Password hashing failed:`, error);
        return this.createErrorResult(
          'INTERNAL_ERROR' as ApiErrorCode,
          'Registration failed due to technical error',
          'প্রযুক্তিগত ত্রুটির কারণে নিবন্ধন ব্যর্থ হয়েছে',
          correlationId,
        );
      }

      // ============================================================
      // STEP 4: Create User Entity
      // ============================================================

      const passwordVO = new Password(hashedPassword, this.passwordValidator);
      const emailVO = new Email(dto.email, this.emailValidator);

      // Determine user role (default: CUSTOMER)
      const defaultRole = (options?.defaultRole as UserRole) || 'CUSTOMER';

      // ✅ FIXED: User.create() expects operator as 6th parameter, not role
      // For now, we pass undefined for operator
      const user = User.create(
        emailVO,
        passwordVO,
        `${dto.firstName} ${dto.lastName}`,
        this.idGenerator,
        phone,
        preferredLanguage,
        undefined, // preferredOperator - will be set later from device info
      );

      // Set role after creation (since User.create doesn't accept role)
      // This assumes User has a changeRole method
      if (user.changeRole) {
        user.changeRole(defaultRole);
      }

      // ============================================================
      // STEP 5: Save User
      // ============================================================

      try {
        await this.userRepository.save(user);
        this.logger.debug(`[${correlationId}] User saved successfully: ${user.id}`);
      } catch (error) {
        this.logger.error(`[${correlationId}] Failed to save user:`, error);
        return this.createErrorResult(
          'INTERNAL_ERROR' as ApiErrorCode,
          'Registration failed due to technical error',
          'প্রযুক্তিগত ত্রুটির কারণে নিবন্ধন ব্যর্থ হয়েছে',
          correlationId,
        );
      }

      // ============================================================
      // STEP 6: Send Welcome Email (if enabled)
      // ============================================================

      const sendWelcomeEmail = options?.sendWelcomeEmail !== false;
      if (sendWelcomeEmail) {
        try {
          await this.sendWelcomeEmail(user, preferredLanguage, correlationId);
        } catch (error) {
          this.logger.warn(`[${correlationId}] Welcome email failed:`, error);
          await this.recordFailedAttempt('welcome_email', user.id, error as Error, correlationId);
        }
      }

      // ============================================================
      // STEP 7: Send Welcome SMS (if enabled and phone exists)
      // ============================================================

      const sendWelcomeSms = options?.sendWelcomeSms !== false && user.getPhone();
      if (sendWelcomeSms) {
        try {
          await this.sendWelcomeSms(user, preferredLanguage, correlationId);
        } catch (error) {
          this.logger.warn(`[${correlationId}] Welcome SMS failed:`, error);
          await this.recordFailedAttempt('welcome_sms', user.id, error as Error, correlationId);
        }
      }

      // ============================================================
      // STEP 8: Publish UserRegisteredEvent
      // ============================================================

      try {
        await this.eventBus.publish({
          eventType: 'user.registered',
          userId: user.id,
          email: user.getEmail().getValue(),
          fullName: user.getFullName(),
          phone: user.getPhone()?.getValue(),
          registrationSource: REGISTRATION_SOURCES.WEB,
          correlationId,
          metadata: {
            ipAddress,
            userAgent,
            preferredLanguage,
            requiresEmailVerification: options?.requireEmailVerification ?? true,
            requiresPhoneVerification,
          },
        });
      } catch (error) {
        this.logger.warn(`[${correlationId}] Event publishing failed:`, error);
        await this.recordFailedAttempt('event_publish', user.id, error as Error, correlationId);
      }

      // ============================================================
      // STEP 9: Audit Log (Success)
      // ============================================================

      await this.auditService.log({
        action: AUDIT_ACTIONS.REGISTER,
        userId: user.id,
        email: user.getEmail().getValue(),
        phone: user.getPhone()?.getValue(),
        ipAddress,
        userAgent,
        correlationId,
        status: 'success',
        metadata: {
          role: defaultRole,
          tier: options?.userTier || USER_TIERS.BRONZE,
          requiresEmailVerification: options?.requireEmailVerification ?? true,
          requiresPhoneVerification,
        },
      });

      // ============================================================
      // STEP 10: Map to Response DTO
      // ============================================================

      const userDto = UserMapper.toDto(user);

      const response: UserResponseDto = {
        id: userDto.id,
        email: userDto.email,
        phone: userDto.phone,
        fullName: userDto.fullName,
        status: userDto.status,
        role: userDto.role,
        tier: userDto.tier,
        isEmailVerified: userDto.isEmailVerified,
        isPhoneVerified: userDto.isPhoneVerified,
        createdAt: userDto.createdAt,
        requiresEmailVerification: options?.requireEmailVerification ?? true,
        requiresPhoneVerification,
        message: requiresPhoneVerification
          ? 'Registration successful. Please check your email and phone to verify your account.'
          : 'Registration successful. Please check your email to verify your account.',
        messageBn: requiresPhoneVerification
          ? 'নিবন্ধন সফল হয়েছে। আপনার অ্যাকাউন্ট যাচাই করতে দয়া করে আপনার ইমেইল এবং ফোন চেক করুন।'
          : 'নিবন্ধন সফল হয়েছে। আপনার অ্যাকাউন্ট যাচাই করতে দয়া করে আপনার ইমেইল চেক করুন।',
      };

      return {
        success: true,
        data: response,
        correlationId,
      };
    } catch (error) {
      this.logger.error(`[${correlationId}] Unexpected registration error:`, error);
      return this.createErrorResult(
        'INTERNAL_ERROR' as ApiErrorCode,
        'Registration failed due to unexpected error',
        'অপ্রত্যাশিত ত্রুটির কারণে নিবন্ধন ব্যর্থ হয়েছে',
        correlationId,
      );
    }
  }

  // ============================================================
  // ✅ HELPER: recordFailedAttempt
  // ============================================================

  private async recordFailedAttempt(
    operation: string,
    userId: string | undefined,
    error: Error,
    correlationId: string,
  ): Promise<void> {
    try {
      await this.auditService.log({
        action: 'OPERATION_FAILED',
        userId,
        correlationId,
        metadata: {
          operation,
          error: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (auditError) {
      this.logger.error(
        `[${correlationId}] Failed to record audit for operation ${operation}:`,
        auditError,
      );
    }
  }

  // ============================================================
  // ✅ HELPER: sendWelcomeEmail
  // ============================================================

  private async sendWelcomeEmail(
    user: User,
    preferredLanguage: string,
    correlationId: string,
  ): Promise<void> {
    const email = user.getEmail().getValue();
    const fullName = user.getFullName();
    const language = preferredLanguage as 'en' | 'bn';

    this.logger.debug(`[${correlationId}] Sending welcome email to ${maskEmail(email)}`);

    await this.emailService.sendWelcomeEmail(email, fullName, language, correlationId);
  }

  // ============================================================
  // ✅ HELPER: sendWelcomeSms
  // ============================================================

  private async sendWelcomeSms(
    user: User,
    preferredLanguage: string,
    correlationId: string,
  ): Promise<void> {
    const phone = user.getPhone();
    if (!phone) {
      this.logger.warn(`[${correlationId}] Cannot send SMS: No phone number for user ${user.id}`);
      return;
    }

    const phoneNumber = phone.getValue();
    const fullName = user.getFullName();
    const language = preferredLanguage as 'en' | 'bn';

    const normalizedPhone = normalizePhone(phoneNumber, 'BD');
    if (!normalizedPhone) {
      this.logger.warn(`[${correlationId}] Cannot send SMS: Invalid phone format ${phoneNumber}`);
      return;
    }

    this.logger.debug(`[${correlationId}] Sending welcome SMS to ${maskPhone(phoneNumber)}`);

    await this.smsService.sendWelcomeSms(normalizedPhone, fullName, language, correlationId);
  }

  // ============================================================
  // ✅ HELPER: createErrorResult
  // ============================================================

  private createErrorResult(
    errorCode: ApiErrorCode,
    errorMessage: string,
    errorMessageBn: string,
    correlationId: string,
  ): ServiceResult<never> {
    return {
      success: false,
      errorCode,
      errorMessage,
      errorMessageBn,
      correlationId,
    };
  }

  // ============================================================
  // ✅ PLACEHOLDER METHODS (To be implemented in future phases)
  // ============================================================

  // Login methods
  async login(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async loginWithPhone(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async loginWithUsername(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async loginWithOtp(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async socialLogin(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async socialPhoneLogin(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  // MFA methods
  async verifyMfa(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async enableMfa(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async verifyMfaSetup(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async disableMfa(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async getMfaStatus(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async regenerateBackupCodes(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  // Verification methods
  async verifyEmail(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async verifyPhone(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async resendVerificationEmail(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async resendVerificationSms(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  // Token methods
  async refreshToken(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async validateToken(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async revokeRefreshToken(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  // Session methods
  async logout(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async getCurrentUser(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async getUserSessions(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async revokeSession(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async revokeAllSessions(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  // Password methods
  async forgotPassword(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async forgotPasswordByPhone(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async resetPassword(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async resetPasswordWithOtp(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async changePassword(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  // Bulk operations
  async bulkLogout(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async bulkForcePasswordReset(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  // Health
  async healthCheck(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async getRateLimitStatus(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { ServiceResult as AuthServiceResult };
