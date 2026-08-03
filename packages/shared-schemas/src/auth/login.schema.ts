import { z } from 'zod';
import { EMAIL_REGEX, USERNAME_REGEX, PASSWORD_POLICY } from '@vubon/shared-constants';

/**
 * Login schema for validating login requests
 */
export const LoginSchema = z.object({
  /**
   * User's email address
   * - Uses EMAIL_REGEX from shared-constants
   * - Will be normalized to lowercase
   */
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(EMAIL_REGEX.STANDARD, 'Please provide a valid email address')
    .transform((val) => val.toLowerCase().trim()),

  /**
   * User's password
   * - Uses PASSWORD_POLICY from shared-constants
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
    ),

  /**
   * Remember me option
   * - Extends session duration
   */
  rememberMe: z.boolean().optional().default(false),
});

/**
 * Phone login schema for validating phone-based login requests
 */
export const PhoneLoginSchema = z.object({
  /**
   * User's phone number
   * - Must be a valid Bangladeshi phone number
   */
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^(?:\+8801|01)[3-9]\d{8}$/, 'Please provide a valid Bangladeshi phone number'),

  /**
   * User's password
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
    ),

  /**
   * Remember me option
   */
  rememberMe: z.boolean().optional().default(false),
});

/**
 * Username login schema for validating username-based login requests
 */
export const UsernameLoginSchema = z.object({
  /**
   * User's username
   * - Uses USERNAME_REGEX from shared-constants
   * - 3-20 characters
   */
  username: z
    .string()
    .min(1, 'Username is required')
    .regex(
      USERNAME_REGEX.STANDARD,
      'Username can only contain letters, numbers, underscores, and hyphens'
    )
    .transform((val) => val.toLowerCase().trim()),

  /**
   * User's password
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
    ),

  /**
   * Remember me option
   */
  rememberMe: z.boolean().optional().default(false),
});

/**
 * Refresh token schema for validating token refresh requests
 */
export const RefreshTokenSchema = z.object({
  /**
   * Refresh token
   * - Must be a valid JWT refresh token
   * - Required field
   */
  refreshToken: z
    .string()
    .min(1, 'Refresh token is required')
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, 'Invalid refresh token format'),
});

/**
 * Logout schema for validating logout requests
 */
export const LogoutSchema = z.object({
  /**
   * Session ID to logout from
   * - Optional, if not provided, current session will be used
   */
  sessionId: z.string().uuid('Invalid session ID format').optional(),

  /**
   * Whether to logout from all devices
   * - Default: false
   */
  allDevices: z.boolean().optional().default(false),

  /**
   * Reason for logout
   */
  reason: z
    .enum(['user_initiated', 'session_expired', 'admin_revoked', 'password_changed'])
    .optional()
    .default('user_initiated'),
});

/**
 * Revoke all sessions schema for validating session revocation requests
 */
export const RevokeAllSessionsSchema = z.object({
  /**
   * Confirm the revocation
   * - Must be true to proceed
   */
  confirm: z.boolean().refine((val) => val === true, {
    message: 'You must confirm to revoke all sessions',
  }),

  /**
   * Whether to exclude the current session
   * - Default: false
   */
  excludeCurrent: z.boolean().optional().default(false),
});

/**
 * Combined login schema for flexible login
 */
export const FlexibleLoginSchema = z.object({
  /**
   * User's email or username or phone number
   * - Will be validated dynamically based on format
   */
  identifier: z.string().min(1, 'Email, username, or phone number is required'),

  /**
   * User's password
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
    ),

  /**
   * Remember me option
   */
  rememberMe: z.boolean().optional().default(false),
});

/**
 * Type inference for all schemas
 */
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type PhoneLoginSchemaType = z.infer<typeof PhoneLoginSchema>;
export type UsernameLoginSchemaType = z.infer<typeof UsernameLoginSchema>;
export type RefreshTokenSchemaType = z.infer<typeof RefreshTokenSchema>;
export type LogoutSchemaType = z.infer<typeof LogoutSchema>;
export type RevokeAllSessionsSchemaType = z.infer<typeof RevokeAllSessionsSchema>;
export type FlexibleLoginSchemaType = z.infer<typeof FlexibleLoginSchema>;

/**
 * Login validation utilities
 */
export const LoginValidator = {
  /**
   * Validate an email-based login request
   */
  validateEmailLogin: (data: unknown) => LoginSchema.safeParse(data),

  /**
   * Validate a phone-based login request
   */
  validatePhoneLogin: (data: unknown) => PhoneLoginSchema.safeParse(data),

  /**
   * Validate a username-based login request
   */
  validateUsernameLogin: (data: unknown) => UsernameLoginSchema.safeParse(data),

  /**
   * Validate a flexible login request
   */
  validateFlexibleLogin: (data: unknown) => FlexibleLoginSchema.safeParse(data),

  /**
   * Validate a refresh token request
   */
  validateRefreshToken: (data: unknown) => RefreshTokenSchema.safeParse(data),

  /**
   * Validate a logout request
   */
  validateLogout: (data: unknown) => LogoutSchema.safeParse(data),

  /**
   * Validate a revoke all sessions request
   */
  validateRevokeAllSessions: (data: unknown) => RevokeAllSessionsSchema.safeParse(data),

  /**
   * Validate and throw for email login
   */
  validateEmailLoginOrThrow: (data: unknown) => LoginSchema.parse(data),

  /**
   * Validate and throw for phone login
   */
  validatePhoneLoginOrThrow: (data: unknown) => PhoneLoginSchema.parse(data),

  /**
   * Validate and throw for username login
   */
  validateUsernameLoginOrThrow: (data: unknown) => UsernameLoginSchema.parse(data),

  /**
   * Validate and throw for flexible login
   */
  validateFlexibleLoginOrThrow: (data: unknown) => FlexibleLoginSchema.parse(data),

  /**
   * Validate and throw for refresh token
   */
  validateRefreshTokenOrThrow: (data: unknown) => RefreshTokenSchema.parse(data),

  /**
   * Validate and throw for logout
   */
  validateLogoutOrThrow: (data: unknown) => LogoutSchema.parse(data),

  /**
   * Validate and throw for revoke all sessions
   */
  validateRevokeAllSessionsOrThrow: (data: unknown) => RevokeAllSessionsSchema.parse(data),

  /**
   * Check if identifier is email
   */
  isEmail: (identifier: string): boolean => {
    return EMAIL_REGEX.STANDARD.test(identifier);
  },

  /**
   * Check if identifier is phone number
   */
  isPhone: (identifier: string): boolean => {
    return /^(?:\+8801|01)[3-9]\d{8}$/.test(identifier);
  },

  /**
   * Check if identifier is username
   */
  isUsername: (identifier: string): boolean => {
    return USERNAME_REGEX.STANDARD.test(identifier);
  },
};

/**
 * Custom error messages for login validation
 */
export const LOGIN_ERROR_MESSAGES = {
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Please provide a valid email address',
  PHONE_REQUIRED: 'Phone number is required',
  PHONE_INVALID: 'Please provide a valid Bangladeshi phone number',
  USERNAME_REQUIRED: 'Username is required',
  USERNAME_INVALID_CHARS: 'Username can only contain letters, numbers, underscores, and hyphens',
  IDENTIFIER_REQUIRED: 'Email, username, or phone number is required',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters long`,
  PASSWORD_MAX_LENGTH: `Password must not exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`,
  REFRESH_TOKEN_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_INVALID: 'Invalid refresh token format',
  SESSION_ID_INVALID: 'Invalid session ID format',
  CONFIRM_REQUIRED: 'You must confirm to revoke all sessions',
};
