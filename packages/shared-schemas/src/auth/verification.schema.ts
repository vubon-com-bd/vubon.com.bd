import { z } from 'zod';

/**
 * Send verification email schema
 * Used when requesting to send a verification email
 */
export const SendVerificationEmailSchema = z.object({
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
   * Base URL for verification links (optional)
   */
  baseUrl: z.string().url('Please provide a valid URL').optional(),

  /**
   * Additional metadata (optional)
   */
  metadata: z.record(z.unknown()).optional(),
});

/**
 * Verify email schema
 * Used when verifying an email with a token
 */
export const VerifyEmailSchema = z.object({
  /**
   * Verification token
   * - Must be at least 32 characters
   * - Must be URL-safe base64 or hex
   */
  token: z
    .string()
    .min(32, 'Verification token must be at least 32 characters')
    .max(128, 'Verification token must not exceed 128 characters')
    .regex(/^[A-Za-z0-9_-]+$/, 'Verification token contains invalid characters'),

  /**
   * Additional metadata (optional)
   */
  metadata: z.record(z.unknown()).optional(),
});

/**
 * Resend verification email schema
 * Used when requesting to resend a verification email
 */
export const ResendVerificationEmailSchema = z.object({
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
   * Base URL for verification links (optional)
   */
  baseUrl: z.string().url('Please provide a valid URL').optional(),

  /**
   * Additional metadata (optional)
   */
  metadata: z.record(z.unknown()).optional(),
});

/**
 * Verify email response schema
 * Response after email verification attempt
 */
export const VerifyEmailResponseSchema = z.object({
  /**
   * Whether the verification was successful
   */
  success: z.boolean(),

  /**
   * Response message
   */
  message: z.string(),

  /**
   * Verified email address if successful
   */
  email: z.string().email().optional(),

  /**
   * User ID if verification was successful
   */
  userId: z.string().uuid().optional(),

  /**
   * Error code if verification failed
   */
  errorCode: z.string().optional(),

  /**
   * Whether the email was already verified
   */
  alreadyVerified: z.boolean().optional(),

  /**
   * Whether the verification token has expired
   */
  tokenExpired: z.boolean().optional(),
});

/**
 * Email verification status response schema
 * Current verification status of an email
 */
export const EmailVerificationStatusSchema = z.object({
  /**
   * Email address
   */
  email: z.string().email(),

  /**
   * Whether the email is verified
   */
  isVerified: z.boolean(),

  /**
   * Current verification status
   */
  status: z.enum(['PENDING', 'VERIFIED', 'EXPIRED', 'FAILED']),

  /**
   * When the email was verified (if applicable)
   */
  verifiedAt: z.date().optional(),

  /**
   * When the verification expires (if applicable)
   */
  expiresAt: z.date().optional(),

  /**
   * Whether a verification email was sent recently
   */
  recentEmailSent: z.boolean().optional(),

  /**
   * Time until next verification email can be sent (in seconds)
   */
  nextResendAvailableIn: z.number().int().nonnegative().optional(),
});

/**
 * Resend verification email response schema
 * Response after requesting to resend verification email
 */
export const ResendVerificationEmailResponseSchema = z.object({
  /**
   * Whether the resend was successful
   */
  success: z.boolean(),

  /**
   * Response message
   */
  message: z.string(),

  /**
   * Time when the next resend is allowed (in seconds)
   */
  cooldownSeconds: z.number().int().nonnegative().optional(),

  /**
   * Whether the email was already verified
   */
  alreadyVerified: z.boolean().optional(),
});

/**
 * Verification token validation schema
 * Used for validating verification token format
 */
export const VerificationTokenSchema = z.object({
  /**
   * Verification token
   */
  token: z
    .string()
    .min(32, 'Verification token must be at least 32 characters')
    .max(128, 'Verification token must not exceed 128 characters')
    .regex(/^[A-Za-z0-9_-]+$/, 'Verification token contains invalid characters'),
});

/**
 * Type inference for all schemas
 */
export type SendVerificationEmailSchemaType = z.infer<typeof SendVerificationEmailSchema>;
export type VerifyEmailSchemaType = z.infer<typeof VerifyEmailSchema>;
export type ResendVerificationEmailSchemaType = z.infer<typeof ResendVerificationEmailSchema>;
export type VerifyEmailResponseSchemaType = z.infer<typeof VerifyEmailResponseSchema>;
export type EmailVerificationStatusSchemaType = z.infer<typeof EmailVerificationStatusSchema>;
export type ResendVerificationEmailResponseSchemaType = z.infer<
  typeof ResendVerificationEmailResponseSchema
>;
export type VerificationTokenSchemaType = z.infer<typeof VerificationTokenSchema>;

/**
 * Verification validation utilities
 */
export const VerificationValidator = {
  /**
   * Validate a send verification email request
   */
  validateSendEmail: (data: unknown) => SendVerificationEmailSchema.safeParse(data),

  /**
   * Validate a verify email request
   */
  validateVerify: (data: unknown) => VerifyEmailSchema.safeParse(data),

  /**
   * Validate a resend verification email request
   */
  validateResendEmail: (data: unknown) => ResendVerificationEmailSchema.safeParse(data),

  /**
   * Validate a verification token
   */
  validateToken: (data: unknown) => VerificationTokenSchema.safeParse(data),

  /**
   * Validate and throw for send verification email
   */
  validateSendEmailOrThrow: (data: unknown) => SendVerificationEmailSchema.parse(data),

  /**
   * Validate and throw for verify email
   */
  validateVerifyOrThrow: (data: unknown) => VerifyEmailSchema.parse(data),

  /**
   * Validate and throw for resend verification email
   */
  validateResendEmailOrThrow: (data: unknown) => ResendVerificationEmailSchema.parse(data),

  /**
   * Validate and throw for verification token
   */
  validateTokenOrThrow: (data: unknown) => VerificationTokenSchema.parse(data),
};

/**
 * Custom error messages for verification validation
 */
export const VERIFICATION_ERROR_MESSAGES = {
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Please provide a valid email address',
  TOKEN_REQUIRED: 'Verification token is required',
  TOKEN_MIN_LENGTH: 'Verification token must be at least 32 characters',
  TOKEN_MAX_LENGTH: 'Verification token must not exceed 128 characters',
  TOKEN_INVALID_CHARS: 'Verification token contains invalid characters',
  BASE_URL_INVALID: 'Please provide a valid URL',
  METADATA_INVALID: 'Invalid metadata format',
};
