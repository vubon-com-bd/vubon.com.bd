// packages/backend-service/src/auth/module/application/dtos/auth/register.dto.ts

// ✅ External libraries
import { z } from 'zod';

// ✅ Shared packages
import { REGISTRATION_CONFIG, USER_STATUS } from '@vubon/shared-constants';
import type { CreateUserRequest, UserPreferences } from '@vubon/shared-types';

// ✅ Domain Value Objects
import { EmailValueObject } from '../../../domain/value-objects/email.vo';
import { PasswordValueObject } from '../../../domain/value-objects/password.vo';
import { PhoneValueObject } from '../../../domain/value-objects/phone.vo';

// ✅ Local imports
import { RegisterSchema } from '@vubon/shared-schemas';

/**
 * Register DTO
 * Data Transfer Object for user registration
 * Used for validation and data transformation in the application layer
 */
export class RegisterDto {
  public readonly email: string;
  public readonly password: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly phone?: string;
  public readonly preferences?: Partial<UserPreferences>;

  private constructor(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    preferences?: Partial<UserPreferences>;
  }) {
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.phone = data.phone;
    this.preferences = data.preferences;
  }

  /**
   * Create a RegisterDto from raw input data
   * Uses Zod schema for validation
   */
  public static fromRequest(data: unknown): RegisterDto {
    const validated = RegisterSchema.parse(data);

    // Convert to domain value objects for validation
    const email = EmailValueObject.create(validated.email);
    const password = PasswordValueObject.create(validated.password);
    // Phone is optional
    const phone = validated.phone ? PhoneValueObject.create(validated.phone) : undefined;

    return new RegisterDto({
      email: email.value,
      password: password.value,
      firstName: validated.firstName,
      lastName: validated.lastName,
      phone: phone?.value,
      preferences: this.getDefaultPreferences(),
    });
  }

  /**
   * Safe version of fromRequest that doesn't throw
   */
  public static safeFromRequest(
    data: unknown
  ): { success: true; data: RegisterDto } | { success: false; error: z.ZodError } {
    const result = RegisterSchema.safeParse(data);

    if (!result.success) {
      return { success: false, error: result.error };
    }

    try {
      const dto = this.fromRequest(data);
      return { success: true, data: dto };
    } catch (error) {
      // If domain validation fails, create a ZodError
      const zodError = new z.ZodError([
        {
          code: z.ZodIssueCode.custom,
          path: ['email'],
          message: (error as Error).message,
        },
      ]);
      return { success: false, error: zodError };
    }
  }

  /**
   * Get default user preferences based on registration config
   */
  private static getDefaultPreferences(): Partial<UserPreferences> {
    return {
      language: 'en',
      timezone: 'Asia/Dhaka',
      currency: 'BDT',
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: false,
    };
  }

  /**
   * Convert to domain CreateUserRequest
   * Used by the application service to create a user entity
   */
  public toDomainRequest(): CreateUserRequest {
    return {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      preferences: {
        ...this.getDefaultPreferences(),
        ...this.preferences,
      },
    };
  }

  /**
   * Validate the DTO after creation
   * Ensures all fields are valid and meet business requirements
   */
  public validate(): {
    isValid: boolean;
    errors: Array<{ field: string; message: string }>;
  } {
    const errors: Array<{ field: string; message: string }> = [];

    // Validate email format
    try {
      EmailValueObject.create(this.email);
    } catch (error) {
      errors.push({ field: 'email', message: (error as Error).message });
    }

    // Validate password strength
    try {
      PasswordValueObject.create(this.password);
    } catch (error) {
      errors.push({ field: 'password', message: (error as Error).message });
    }

    // Validate phone if provided
    if (this.phone) {
      try {
        PhoneValueObject.create(this.phone);
      } catch (error) {
        errors.push({ field: 'phone', message: (error as Error).message });
      }
    }

    // Validate first name
    if (!this.firstName || this.firstName.trim().length === 0) {
      errors.push({ field: 'firstName', message: 'First name is required' });
    } else if (this.firstName.length > 50) {
      errors.push({
        field: 'firstName',
        message: 'First name cannot exceed 50 characters',
      });
    }

    // Validate last name
    if (!this.lastName || this.lastName.trim().length === 0) {
      errors.push({ field: 'lastName', message: 'Last name is required' });
    } else if (this.lastName.length > 50) {
      errors.push({
        field: 'lastName',
        message: 'Last name cannot exceed 50 characters',
      });
    }

    // Check registration is allowed
    if (!REGISTRATION_CONFIG.ALLOW_REGISTRATION) {
      errors.push({
        field: '_global',
        message: 'Registration is currently disabled',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get the initial user status based on registration config
   */
  public getInitialStatus(): string {
    if (REGISTRATION_CONFIG.REQUIRES_EMAIL_VERIFICATION) {
      return USER_STATUS.PENDING_VERIFICATION;
    }
    return USER_STATUS.ACTIVE;
  }

  /**
   * Check if the user needs to accept terms
   */
  public requiresTermsAcceptance(): boolean {
    return REGISTRATION_CONFIG.REQUIRES_TERMS_ACCEPTANCE;
  }

  /**
   * Get the minimum age requirement
   */
  public getMinAgeRequirement(): number {
    return REGISTRATION_CONFIG.MIN_AGE_REQUIRED;
  }

  /**
   * Check if email domain is disallowed
   */
  public isEmailDomainDisallowed(): boolean {
    const domain = this.email.split('@')[1];
    if (!domain) {
      return true;
    }
    return REGISTRATION_CONFIG.DISALLOWED_EMAIL_DOMAINS.some(
      (disallowed: string) => domain === disallowed
    );
  }

  /**
   * Get the current registration configuration
   */
  public getRegistrationConfig() {
    return {
      allowRegistration: REGISTRATION_CONFIG.ALLOW_REGISTRATION,
      requiresEmailVerification: REGISTRATION_CONFIG.REQUIRES_EMAIL_VERIFICATION,
      requiresTermsAcceptance: REGISTRATION_CONFIG.REQUIRES_TERMS_ACCEPTANCE,
      minAgeRequired: REGISTRATION_CONFIG.MIN_AGE_REQUIRED,
      disallowedEmailDomains: REGISTRATION_CONFIG.DISALLOWED_EMAIL_DOMAINS,
    };
  }

  /**
   * Get summary of the DTO for logging
   */
  public toLog(): {
    email: string;
    firstName: string;
    lastName: string;
    hasPhone: boolean;
    hasPreferences: boolean;
  } {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      hasPhone: !!this.phone,
      hasPreferences: !!this.preferences && Object.keys(this.preferences).length > 0,
    };
  }
}
