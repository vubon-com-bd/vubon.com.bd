import { z } from 'zod';
import { PASSWORD_POLICY, PHONE_REGEX, EMAIL_REGEX } from '@vubon/shared-constants';
import type { CreateUserRequest } from '@vubon/shared-types';

/**
 * Schema for validating user registration requests
 * Uses Zod for runtime validation with comprehensive rules
 */
export const RegisterSchema = z
  .object({
    /**
     * Email address - must be valid format and will be normalized
     */
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .trim()
      .min(1, 'Email is required')
      .email('Please provide a valid email address')
      .regex(EMAIL_REGEX.STANDARD, 'Email format is invalid')
      .transform((val) => val.toLowerCase()),

    /**
     * Password - must meet complexity requirements
     * - Minimum length: 8 characters
     * - Maximum length: 128 characters
     * - At least one uppercase letter
     * - At least one lowercase letter
     * - At least one number
     * - At least one special character
     */
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(
        PASSWORD_POLICY.MIN_LENGTH,
        `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`
      )
      .max(
        PASSWORD_POLICY.MAX_LENGTH,
        `Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`
      )
      .refine(
        (val) => (PASSWORD_POLICY.REQUIRE_UPPERCASE ? /[A-Z]/.test(val) : true),
        'Password must contain at least one uppercase letter'
      )
      .refine(
        (val) => (PASSWORD_POLICY.REQUIRE_LOWERCASE ? /[a-z]/.test(val) : true),
        'Password must contain at least one lowercase letter'
      )
      .refine(
        (val) => (PASSWORD_POLICY.REQUIRE_NUMBER ? /\d/.test(val) : true),
        'Password must contain at least one number'
      )
      .refine(
        (val) =>
          PASSWORD_POLICY.REQUIRE_SPECIAL_CHAR
            ? /[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(val)
            : true,
        'Password must contain at least one special character'
      ),

    /**
     * User's first name - required field
     */
    firstName: z
      .string({
        required_error: 'First name is required',
        invalid_type_error: 'First name must be a string',
      })
      .trim()
      .min(1, 'First name is required')
      .max(50, 'First name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z\s\-']+$/,
        'First name can only contain letters, spaces, hyphens, and apostrophes'
      )
      .transform((val) =>
        val
          .trim()
          .split(/\s+/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ')
      ),

    /**
     * User's last name - required field
     */
    lastName: z
      .string({
        required_error: 'Last name is required',
        invalid_type_error: 'Last name must be a string',
      })
      .trim()
      .min(1, 'Last name is required')
      .max(50, 'Last name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z\s\-']+$/,
        'Last name can only contain letters, spaces, hyphens, and apostrophes'
      )
      .transform((val) =>
        val
          .trim()
          .split(/\s+/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ')
      ),

    /**
     * Phone number - optional field with Bangladeshi format validation
     * Valid formats: 01XXXXXXXXX, +8801XXXXXXXXX, 8801XXXXXXXXX
     */
    phone: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          // Check if phone matches Bangladeshi format
          return (
            PHONE_REGEX.INTERNATIONAL.test(val) ||
            PHONE_REGEX.WITH_COUNTRY_CODE.test(val) ||
            /^01[3-9]\d{8}$/.test(val) // Bangladeshi mobile format
          );
        },
        {
          message:
            'Please provide a valid phone number. Supported formats: 01XXXXXXXXX, +8801XXXXXXXXX, 8801XXXXXXXXX',
        }
      ),
  })
  .strict(); // Prevent extra fields

/**
 * Type inference for registration schema
 */
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

/**
 * Type for validated and typed registration data
 * This matches the CreateUserRequest from shared-types
 */
export type ValidatedRegisterData = RegisterSchemaType;

/**
 * Validates registration data and returns typed result
 */
export function validateRegistration(data: unknown): ValidatedRegisterData {
  return RegisterSchema.parse(data);
}

/**
 * Safely validates registration data without throwing
 */
export function safeValidateRegistration(data: unknown): {
  success: boolean;
  data?: ValidatedRegisterData;
  error?: z.ZodError;
} {
  const result = RegisterSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
