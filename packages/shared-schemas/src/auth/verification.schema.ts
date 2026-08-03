import { z } from 'zod';
import { EMAIL_REGEX } from '@vubon/shared-constants';

/**
 * Schema for validating send verification email requests
 */
export const SendVerificationEmailSchema = z.object({
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
 * Schema for validating verify email requests
 */
export const VerifyEmailSchema = z.object({
  /**
   * Verification token - must be at least 32 characters
   */
  token: z
    .string({
      required_error: 'Verification token is required',
      invalid_type_error: 'Verification token must be a string',
    })
    .min(32, 'Verification token must be at least 32 characters')
    .max(128, 'Verification token cannot exceed 128 characters')
    .regex(/^[A-Za-z0-9_-]+$/, 'Verification token contains invalid characters'),
});

/**
 * Schema for validating resend verification email requests
 */
export const ResendVerificationEmailSchema = z.object({
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
 * Type inference for verification schemas
 */
export type SendVerificationEmailSchemaType = z.infer<typeof SendVerificationEmailSchema>;
export type VerifyEmailSchemaType = z.infer<typeof VerifyEmailSchema>;
export type ResendVerificationEmailSchemaType = z.infer<typeof ResendVerificationEmailSchema>;

/**
 * Validates send verification email data and returns typed result
 */
export function validateSendVerificationEmail(data: unknown): SendVerificationEmailSchemaType {
  return SendVerificationEmailSchema.parse(data);
}

/**
 * Safely validates send verification email data without throwing
 */
export function safeValidateSendVerificationEmail(data: unknown): {
  success: boolean;
  data?: SendVerificationEmailSchemaType;
  error?: z.ZodError;
} {
  const result = SendVerificationEmailSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates verify email data and returns typed result
 */
export function validateVerifyEmail(data: unknown): VerifyEmailSchemaType {
  return VerifyEmailSchema.parse(data);
}

/**
 * Safely validates verify email data without throwing
 */
export function safeValidateVerifyEmail(data: unknown): {
  success: boolean;
  data?: VerifyEmailSchemaType;
  error?: z.ZodError;
} {
  const result = VerifyEmailSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates resend verification email data and returns typed result
 */
export function validateResendVerificationEmail(data: unknown): ResendVerificationEmailSchemaType {
  return ResendVerificationEmailSchema.parse(data);
}

/**
 * Safely validates resend verification email data without throwing
 */
export function safeValidateResendVerificationEmail(data: unknown): {
  success: boolean;
  data?: ResendVerificationEmailSchemaType;
  error?: z.ZodError;
} {
  const result = ResendVerificationEmailSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
