import { z } from 'zod';
import { EMAIL_REGEX, PHONE_REGEX } from '@vubon/shared-constants';

/**
 * Schema for validating standard email-based login requests
 */
export const LoginSchema = z.object({
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
   * Password - required field
   */
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(1, 'Password is required'),

  /**
   * Remember me option - optional boolean
   */
  rememberMe: z.boolean().optional().default(false),
});

/**
 * Schema for validating phone number-based login requests
 */
export const PhoneLoginSchema = z.object({
  /**
   * Phone number - must be valid Bangladeshi format
   * Valid formats: 01XXXXXXXXX, +8801XXXXXXXXX, 8801XXXXXXXXX
   */
  phoneNumber: z
    .string({
      required_error: 'Phone number is required',
      invalid_type_error: 'Phone number must be a string',
    })
    .trim()
    .min(1, 'Phone number is required')
    .refine(
      (val) => {
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

  /**
   * Password - required field
   */
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(1, 'Password is required'),

  /**
   * Remember me option - optional boolean
   */
  rememberMe: z.boolean().optional().default(false),
});

/**
 * Schema for validating username-based login requests
 */
export const UsernameLoginSchema = z.object({
  /**
   * Username - must be valid format
   */
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    })
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username cannot exceed 30 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores, and hyphens'
    ),

  /**
   * Password - required field
   */
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(1, 'Password is required'),

  /**
   * Remember me option - optional boolean
   */
  rememberMe: z.boolean().optional().default(false),
});

/**
 * Schema for validating token refresh requests
 */
export const RefreshTokenSchema = z.object({
  /**
   * Refresh token - required string
   */
  refreshToken: z
    .string({
      required_error: 'Refresh token is required',
      invalid_type_error: 'Refresh token must be a string',
    })
    .min(1, 'Refresh token is required'),
});

/**
 * Schema for validating logout requests
 */
export const LogoutSchema = z.object({
  /**
   * Session ID to logout from
   */
  sessionId: z
    .string({
      required_error: 'Session ID is required',
      invalid_type_error: 'Session ID must be a string',
    })
    .min(1, 'Session ID is required'),

  /**
   * Whether to logout from all devices - optional boolean
   */
  allDevices: z.boolean().optional().default(false),
});

/**
 * Schema for validating revoke all sessions requests
 */
export const RevokeAllSessionsSchema = z.object({
  /**
   * Confirmation flag - required
   */
  confirm: z
    .boolean({
      required_error: 'Confirmation is required',
      invalid_type_error: 'Confirmation must be a boolean',
    })
    .refine((val) => val === true, 'You must confirm to revoke all sessions'),

  /**
   * Whether to exclude current session - optional boolean
   */
  excludeCurrent: z.boolean().optional().default(false),
});

/**
 * Type inference for login schemas
 */
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type PhoneLoginSchemaType = z.infer<typeof PhoneLoginSchema>;
export type UsernameLoginSchemaType = z.infer<typeof UsernameLoginSchema>;
export type RefreshTokenSchemaType = z.infer<typeof RefreshTokenSchema>;
export type LogoutSchemaType = z.infer<typeof LogoutSchema>;
export type RevokeAllSessionsSchemaType = z.infer<typeof RevokeAllSessionsSchema>;

/**
 * Validates login data and returns typed result
 */
export function validateLogin(data: unknown): LoginSchemaType {
  return LoginSchema.parse(data);
}

/**
 * Safely validates login data without throwing
 */
export function safeValidateLogin(data: unknown): {
  success: boolean;
  data?: LoginSchemaType;
  error?: z.ZodError;
} {
  const result = LoginSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates phone login data and returns typed result
 */
export function validatePhoneLogin(data: unknown): PhoneLoginSchemaType {
  return PhoneLoginSchema.parse(data);
}

/**
 * Safely validates phone login data without throwing
 */
export function safeValidatePhoneLogin(data: unknown): {
  success: boolean;
  data?: PhoneLoginSchemaType;
  error?: z.ZodError;
} {
  const result = PhoneLoginSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates username login data and returns typed result
 */
export function validateUsernameLogin(data: unknown): UsernameLoginSchemaType {
  return UsernameLoginSchema.parse(data);
}

/**
 * Safely validates username login data without throwing
 */
export function safeValidateUsernameLogin(data: unknown): {
  success: boolean;
  data?: UsernameLoginSchemaType;
  error?: z.ZodError;
} {
  const result = UsernameLoginSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates refresh token data and returns typed result
 */
export function validateRefreshToken(data: unknown): RefreshTokenSchemaType {
  return RefreshTokenSchema.parse(data);
}

/**
 * Safely validates refresh token data without throwing
 */
export function safeValidateRefreshToken(data: unknown): {
  success: boolean;
  data?: RefreshTokenSchemaType;
  error?: z.ZodError;
} {
  const result = RefreshTokenSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates logout data and returns typed result
 */
export function validateLogout(data: unknown): LogoutSchemaType {
  return LogoutSchema.parse(data);
}

/**
 * Safely validates logout data without throwing
 */
export function safeValidateLogout(data: unknown): {
  success: boolean;
  data?: LogoutSchemaType;
  error?: z.ZodError;
} {
  const result = LogoutSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates revoke all sessions data and returns typed result
 */
export function validateRevokeAllSessions(data: unknown): RevokeAllSessionsSchemaType {
  return RevokeAllSessionsSchema.parse(data);
}

/**
 * Safely validates revoke all sessions data without throwing
 */
export function safeValidateRevokeAllSessions(data: unknown): {
  success: boolean;
  data?: RevokeAllSessionsSchemaType;
  error?: z.ZodError;
} {
  const result = RevokeAllSessionsSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
