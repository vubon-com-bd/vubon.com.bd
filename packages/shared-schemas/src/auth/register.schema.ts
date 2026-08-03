import { z } from 'zod';
import { PASSWORD_REGEX, PASSWORD_POLICY } from '@vubon/shared-constants';

/**
 * Registration schema for validating user registration requests
 */
export const RegisterSchema = z
  .object({
    /**
     * User's email address
     * - Must be a valid email format
     * - Will be normalized to lowercase
     */
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please provide a valid email address')
      .transform((val) => val.toLowerCase().trim()),

    /**
     * User's password
     * - Uses PASSWORD_POLICY from shared-constants
     * - Validates complexity via PASSWORD_REGEX
     */
    password: z
      .string()
      .min(
        PASSWORD_POLICY.MIN_LENGTH,
        `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters long`
      )
      .max(
        PASSWORD_POLICY.MAX_LENGTH,
        `Password must not exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`
      )
      .regex(
        PASSWORD_REGEX.STRONG,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),

    /**
     * User's first name
     * - Must be at least 1 character
     * - Will be trimmed
     */
    firstName: z
      .string()
      .min(1, 'First name is required')
      .max(50, 'First name must not exceed 50 characters')
      .transform((val) => val.trim()),

    /**
     * User's last name
     * - Must be at least 1 character
     * - Will be trimmed
     */
    lastName: z
      .string()
      .min(1, 'Last name is required')
      .max(50, 'Last name must not exceed 50 characters')
      .transform((val) => val.trim()),

    /**
     * User's phone number (optional)
     * - Must be a valid Bangladeshi phone number
     */
    phone: z
      .string()
      .optional()
      .refine((val) => !val || /^(?:\+8801|01)[3-9]\d{8}$/.test(val), {
        message:
          'Please provide a valid Bangladeshi phone number (e.g., 01XXXXXXXXX or +8801XXXXXXXXX)',
      }),

    /**
     * Accept terms and conditions
     * - Must be true
     */
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),

    /**
     * Accept privacy policy (optional)
     */
    acceptPrivacy: z.boolean().optional().default(false),
  })
  .strict();

/**
 * Type inference for RegisterSchema
 */
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

/**
 * Partial registration schema for updates
 */
export const UpdateRegisterSchema = RegisterSchema.partial();

/**
 * Type inference for UpdateRegisterSchema
 */
export type UpdateRegisterSchemaType = z.infer<typeof UpdateRegisterSchema>;

/**
 * Registration response schema
 */
export const RegisterResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  userId: z.string().uuid().optional(),
  requiresEmailVerification: z.boolean().optional(),
});

/**
 * Type inference for RegisterResponseSchema
 */
export type RegisterResponseSchemaType = z.infer<typeof RegisterResponseSchema>;

/**
 * Registration validation utility
 */
export const RegistrationValidator = {
  /**
   * Validate a registration request
   */
  validate: (data: unknown) => RegisterSchema.safeParse(data),

  /**
   * Validate a registration request and throw if invalid
   */
  validateOrThrow: (data: unknown) => RegisterSchema.parse(data),

  /**
   * Partially validate a registration request
   */
  validatePartial: (data: unknown) => UpdateRegisterSchema.safeParse(data),
};

/**
 * Custom error messages for registration validation
 */
export const REGISTRATION_ERROR_MESSAGES = {
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Please provide a valid email address',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters long`,
  PASSWORD_MAX_LENGTH: `Password must not exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`,
  PASSWORD_COMPLEXITY:
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  FIRST_NAME_REQUIRED: 'First name is required',
  FIRST_NAME_MAX_LENGTH: 'First name must not exceed 50 characters',
  LAST_NAME_REQUIRED: 'Last name is required',
  LAST_NAME_MAX_LENGTH: 'Last name must not exceed 50 characters',
  PHONE_INVALID: 'Please provide a valid Bangladeshi phone number',
  TERMS_REQUIRED: 'You must accept the terms and conditions',
};
