import { z } from 'zod';

/**
 * Phone number regex for Bangladesh
 * Format: 01XXXXXXXXX (11 digits) or +8801XXXXXXXXX
 */
const PHONE_REGEX = /^(?:\+8801|01)[3-9]\d{8}$/;

/**
 * Password complexity requirements
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
     * - Minimum 8 characters
     * - Must contain at least one uppercase letter
     * - Must contain at least one lowercase letter
     * - Must contain at least one number
     * - Must contain at least one special character
     */
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(128, 'Password must not exceed 128 characters')
      .refine((val) => PASSWORD_REGEX.test(val), {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
      }),

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
     * - Format: 01XXXXXXXXX or +8801XXXXXXXXX
     */
    phone: z
      .string()
      .optional()
      .refine((val) => !val || PHONE_REGEX.test(val), {
        message:
          'Please provide a valid Bangladeshi phone number (e.g., 01XXXXXXXXX or +8801XXXXXXXXX)',
      }),

    /**
     * User's role (optional)
     * - Default role for new users is 'user'
     */
    role: z.enum(['user', 'admin', 'moderator']).optional().default('user'),

    /**
     * Accept terms and conditions
     * - Must be true
     */
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
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
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters long',
  PASSWORD_MAX_LENGTH: 'Password must not exceed 128 characters',
  PASSWORD_COMPLEXITY:
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  FIRST_NAME_REQUIRED: 'First name is required',
  FIRST_NAME_MAX_LENGTH: 'First name must not exceed 50 characters',
  LAST_NAME_REQUIRED: 'Last name is required',
  LAST_NAME_MAX_LENGTH: 'Last name must not exceed 50 characters',
  PHONE_INVALID: 'Please provide a valid Bangladeshi phone number',
  TERMS_REQUIRED: 'You must accept the terms and conditions',
};
