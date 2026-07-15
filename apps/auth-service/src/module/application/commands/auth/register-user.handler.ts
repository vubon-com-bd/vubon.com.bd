/**
 * Register User Command Handler - Pure Application Logic (Enterprise Grade)
 * 
 * @module application/commands/auth/register-user.handler
 */

import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';

// ============================================================
// Shared Packages Import (SSOT)
// ============================================================

import {
  AUDIT_ACTIONS,
  REGISTRATION_SOURCES,
} from '@vubon/shared-constants';
import { maskEmail } from '@vubon/shared-utils';
import type { ApiErrorCode } from '@vubon/shared-types';

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
import type { IPasswordHasher } from '../../../domain/ports/password-hasher.port';
import type { IEventBus, IDomainEvent } from '../../../domain/ports/event-bus.port';
import type { IAuditService } from '../../../domain/ports/event-bus.port'; // ✅ IAuditService এখানে আছে
import { PasswordStrength } from '../../../domain/ports/password-validator.port';

// ============================================================
// Application Imports
// ============================================================

import { RegisterUserCommand } from './register-user.command';
import { UserRegisteredEvent } from '../../events/user-registered.event';

// ============================================================
// Type Converters
// ============================================================

import {
  toUserRole,
  toUserTier,
  toBangladeshDistrict,
  toBangladeshUpazila,
} from '@vubon/shared-utils';

// ============================================================
// Result Type
// ============================================================

export type CommandResult<T> = {
  success: boolean;
  data?: T;
  errorCode?: ApiErrorCode;
  errorMessage?: string;
  errorMessageBn?: string;
  correlationId?: string;
};

// ============================================================
// Handler Implementation
// ============================================================

@Injectable()
export class RegisterUserHandler {
  private readonly logger = new Logger(RegisterUserHandler.name);

  constructor(
    // Domain Ports
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly emailValidator: IEmailValidator,
    private readonly passwordValidator: IPasswordValidator,
    private readonly phoneValidator: IPhoneValidator,
    private readonly idGenerator: IdGenerator,
    
    // Application Ports (from domain/ports)
    private readonly eventBus: IEventBus,
    private readonly auditService: IAuditService,
  ) {}

  // ============================================================
  // Main Execute Method
  // ============================================================

  async execute(
    command: RegisterUserCommand,
    ipAddress: string,
    userAgent: string,
  ): Promise<CommandResult<{ userId: string }>> {
    const correlationId = command.correlationId || randomUUID();

    this.logger.debug(
      `[${correlationId}] Processing registration for ${maskEmail(command.email)}`,
    );

    try {
      // STEP 1: Validate Input Data
      const emailValidation = this.emailValidator.validate(command.email);
      if (!emailValidation.isValid) {
        return this.createErrorResult(
          'INVALID_EMAIL' as ApiErrorCode,
          'Invalid email format',
          'ভুল ইমেইল ফরম্যাট',
          correlationId,
        );
      }

      const passwordValidation = this.passwordValidator.validate(
        command.password,
        {
          minStrength: PasswordStrength.MEDIUM,
          checkCommonPasswords: true,
        },
      );
      if (!passwordValidation.isValid) {
        return this.createErrorResult(
          'WEAK_PASSWORD' as ApiErrorCode,
          `Password is too weak: ${passwordValidation.errors.join(', ')}`,
          `পাসওয়ার্ড খুব দুর্বল: ${passwordValidation.errors.join(', ')}`,
          correlationId,
        );
      }

      let phone: Phone | undefined;
      if (command.phone) {
        const phoneValidation = this.phoneValidator.validate(
          command.phone,
          'BD',
        );
        if (!phoneValidation.isValid) {
          return this.createErrorResult(
            'INVALID_PHONE' as ApiErrorCode,
            'Invalid Bangladesh phone number',
            'ভুল বাংলাদেশ ফোন নম্বর',
            correlationId,
          );
        }
        phone = new Phone(command.phone, this.phoneValidator);
      }

      // STEP 2: Check for Duplicates
      const email = new Email(command.email, this.emailValidator);
      const emailExists = await this.userRepository.existsByEmail(email);
      if (emailExists) {
        await this.auditService.log({
          action: AUDIT_ACTIONS.REGISTER,
          email: command.email,
          status: 'failed',
          reason: 'Email already exists',
          ipAddress,
          userAgent,
          correlationId,
        });

        return this.createErrorResult(
          'EMAIL_EXISTS' as ApiErrorCode,
          'User with this email already exists',
          'এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে',
          correlationId,
        );
      }

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
            'এই ফোন নম্বর দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে',
            correlationId,
          );
        }
      }

      // STEP 3: Hash Password
      let hashedPassword: string;
      try {
        const hashResult = await this.passwordHasher.hash(command.password);
        hashedPassword = hashResult.hash;
      } catch (error) {
        this.logger.error(
          `[${correlationId}] Password hashing failed:`,
          error,
        );
        return this.createErrorResult(
          'INTERNAL_ERROR' as ApiErrorCode,
          'Registration failed due to technical error',
          'প্রযুক্তিগত ত্রুটির কারণে নিবন্ধন ব্যর্থ হয়েছে',
          correlationId,
        );
      }

      // STEP 4: Create Domain User Entity
      const passwordVO = new Password(hashedPassword, this.passwordValidator);
      const emailVO = new Email(command.email, this.emailValidator);

      const user = User.create(
        emailVO,
        passwordVO,
        command.fullName,
        this.idGenerator,
        phone,
        command.preferredLanguage,
        command.deviceInfo?.mobileOperator,
      );

      if (command.role) {
        const role = toUserRole(command.role);
        if (role) {
          user.changeRole(role);
        }
      }

      if (command.tier) {
        const tier = toUserTier(command.tier);
        if (tier) {
          user.changeTier(tier);
        }
      }

      if (command.displayName) {
        user.updateDisplayName(command.displayName);
      }

      if (command.preferences?.preferredDistrict) {
        const district = toBangladeshDistrict(command.preferences.preferredDistrict);
        if (district) {
          user.setPreferredDistrict(district);
        }
      }

      if (command.preferences?.preferredUpazila) {
        const upazila = toBangladeshUpazila(command.preferences.preferredUpazila);
        if (upazila) {
          user.setPreferredUpazila(upazila);
        }
      }

      // STEP 5: Save User
      try {
        await this.userRepository.save(user);
        this.logger.debug(
          `[${correlationId}] User saved successfully: ${user.id}`,
        );
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
      // STEP 6: Publish Domain Events (✅ FIXED: IDomainEvent-এ কাস্ট)
      // ============================================================

      const domainEvents = user.pullDomainEvents();
      for (const event of domainEvents) {
        try {
          // ✅ DomainEvent-কে IDomainEvent-এ কাস্ট করুন (কারণ সঠিক ইন্টারফেস ইমপ্লিমেন্ট করে)
          await this.eventBus.publish(event as unknown as IDomainEvent);
        } catch (error) {
          this.logger.warn(
            `[${correlationId}] Failed to publish event ${(event as any).eventType}:`,
            error,
          );
        }
      }

      // ============================================================
      // STEP 7: Audit Log
      // ============================================================

      const auditLogData: {
        action: string;
        userId: string;
        email: string;
        status: string;
        ipAddress: string;
        userAgent: string;
        correlationId: string;
        metadata: Record<string, unknown>;
        phone?: string;
      } = {
        action: AUDIT_ACTIONS.REGISTER,
        userId: user.id,
        email: user.getEmail().getValue(),
        status: 'success',
        ipAddress,
        userAgent,
        correlationId,
        metadata: {
          role: user.getRole(),
          tier: user.getTier(),
          registrationMethod: command.registrationMethod,
        },
      };

      const phoneValue = user.getPhone()?.getValue();
      if (phoneValue) {
        auditLogData.phone = phoneValue;
      }

      await this.auditService.log(auditLogData);

      // ============================================================
      // STEP 8: Publish Application Event (✅ FIXED: IDomainEvent-এ কাস্ট)
      // ============================================================

      const registeredEvent = UserRegisteredEvent.fromUser(user, {
        registrationMethod: command.registrationMethod || 'email',
        registrationSource: this.mapToRegistrationSource(command.getRegistrationSource()),
        correlationId,
        ipAddress,
        userAgent,
        deviceId: command.deviceInfo?.deviceId,
        deviceFingerprint: command.deviceInfo?.deviceFingerprint,
        referralCode: command.getReferralCode(),
        marketingConsent: command.hasMarketingConsent(),
        whatsappConsent: command.hasWhatsAppConsent(),
        smsConsent: (command.preferences as any)?.smsConsent || false,
        emailConsent: (command.preferences as any)?.emailConsent || false,
        acceptedTerms: command.hasAcceptedTerms(),
        acceptedPrivacy: command.hasAcceptedPrivacy(),
        age: command.preferences?.age,
        captchaVerified: command.hasCaptcha(),
        metadata: {
          deviceInfo: command.deviceInfo,
          preferences: command.preferences,
        },
      });
      
      // ✅ IDomainEvent-এ কাস্ট করে পাবলিশ করুন
      await this.eventBus.publish(registeredEvent as unknown as IDomainEvent);

      return {
        success: true,
        data: { userId: user.id },
        correlationId,
      };
    } catch (error) {
      this.logger.error(
        `[${correlationId}] Unexpected registration error:`,
        error,
      );
      return this.createErrorResult(
        'INTERNAL_ERROR' as ApiErrorCode,
        'Registration failed due to unexpected error',
        'অপ্রত্যাশিত ত্রুটির কারণে নিবন্ধন ব্যর্থ হয়েছে',
        correlationId,
      );
    }
  }

  // ============================================================
  // Helper Methods
  // ============================================================

  private createErrorResult(
    errorCode: ApiErrorCode,
    errorMessage: string,
    errorMessageBn: string,
    correlationId: string,
  ): CommandResult<never> {
    return {
      success: false,
      errorCode,
      errorMessage,
      errorMessageBn,
      correlationId,
    };
  }

  private mapToRegistrationSource(source: string): any {
    const sourceMap: Record<string, any> = {
      'WEB': REGISTRATION_SOURCES.WEB,
      'MOBILE_APP': REGISTRATION_SOURCES.MOBILE_APP,
      'API': REGISTRATION_SOURCES.API,
      'ADMIN': REGISTRATION_SOURCES.ADMIN,
      'SOCIAL': REGISTRATION_SOURCES.SOCIAL,
    };
    return sourceMap[source] || REGISTRATION_SOURCES.WEB;
  }
}
