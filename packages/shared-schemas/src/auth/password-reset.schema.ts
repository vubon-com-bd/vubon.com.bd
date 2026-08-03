import { z } from 'zod';
import { EMAIL_REGEX, PASSWORD_POLICY } from '@vubon/shared-constants';

/**
 * Schema for validating forgot password requests
 */
export const ForgotPasswordSchema = z.object({
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
});

/**
 * Schema for validating reset password requests
 * Includes password confirmation check
 */
export const ResetPasswordSchema = z
  .object({
    /**
     * Reset token - must be at least 32 characters
     */
    token: z
      .string({
        required_error: 'Reset token is required',
        invalid_type_error: 'Reset token must be a string',
      })
      .min(32, 'Reset token must be at least 32 characters')
      .max(128, 'Reset token cannot exceed 128 characters')
      .regex(/^[A-Za-z0-9_-]+$/, 'Reset token contains invalid characters'),

    /**
     * New password - must meet complexity requirements
     * - Minimum length: 8 characters
     * - Maximum length: 128 characters
     * - At least one uppercase letter
     * - At least one lowercase letter
     * - At least one number
     * - At least one special character
     */
    newPassword: z
      .string({
        required_error: 'New password is required',
        invalid_type_error: 'New password must be a string',
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
     * Confirm password - must match newPassword
     */
    confirmPassword: z
      .string({
        required_error: 'Please confirm your password',
        invalid_type_error: 'Confirm password must be a string',
      })
      .min(
        PASSWORD_POLICY.MIN_LENGTH,
        `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

/**
 * Schema for validating resend reset link requests
 */
export const ResendResetLinkSchema = z.object({
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
});

/**
 * Type inference for password reset schemas
 */
export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
export type ResendResetLinkSchemaType = z.infer<typeof ResendResetLinkSchema>;

/**
 * Validates forgot password data and returns typed result
 */
export function validateForgotPassword(data: unknown): ForgotPasswordSchemaType {
  return ForgotPasswordSchema.parse(data);
}

/**
 * Safely validates forgot password data without throwing
 */
export function safeValidateForgotPassword(data: unknown): {
  success: boolean;
  data?: ForgotPasswordSchemaType;
  error?: z.ZodError;
} {
  const result = ForgotPasswordSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates reset password data and returns typed result
 */
export function validateResetPassword(data: unknown): ResetPasswordSchemaType {
  return ResetPasswordSchema.parse(data);
}

/**
 * Safely validates reset password data without throwing
 */
export function safeValidateResetPassword(data: unknown): {
  success: boolean;
  data?: ResetPasswordSchemaType;
  error?: z.ZodError;
} {
  const result = ResetPasswordSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates resend reset link data and returns typed result
 */
export function validateResendResetLink(data: unknown): ResendResetLinkSchemaType {
  return ResendResetLinkSchema.parse(data);
}

/**
 * Safely validates resend reset link data without throwing
 */
export function safeValidateResendResetLink(data: unknown): {
  success: boolean;
  data?: ResendResetLinkSchemaType;
  error?: z.ZodError;
} {
  const result = ResendResetLinkSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
