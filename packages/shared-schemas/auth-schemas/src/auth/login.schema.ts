/**
 * Login Schemas - Pure validation for authentication
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/auth-schemas/src/auth/login.schema
 * 
 * RULES:
 * ✅ ONLY Zod schemas - NO business logic
 * ✅ NO password comparison, token generation, session creation
 * ✅ NO side effects, NO async
 * ✅ Reusable primitives from constants
 * ✅ Strict mode enabled
 * ✅ Type exports with z.infer
 */

import { z } from 'zod';

// Import constants from shared-constants layer (Enterprise rule)
import {
  REGEX_PHONE,
  PASSWORD_POLICY,
  TOKEN_EXPIRY,
} from '@vubon/auth-constants';

// ==================== Primitives (Reusable) ====================

// Login method enum (Bangladesh specific: email, phone, username)
export const LoginMethodSchema = z.enum(['email', 'phone', 'username']);

// Remember me flag
export const RememberMeSchema = z.boolean().default(false);

// Device ID for tracking
export const DeviceIdSchema = z
  .string()
  .min(1, 'Device ID is required')
  .max(255, 'Device ID too long')
  .optional()
  .nullable()
  .brand('DeviceId');

// CAPTCHA token for security (prevent brute force)
export const CaptchaTokenSchema = z
  .string()
  .min(1, 'CAPTCHA token required')
  .optional()
  .nullable()
  .brand('CaptchaToken');

// Client info schema (Bangladesh specific)
export const ClientInfoSchema = z
  .object({
    ipAddress: z.string().ip().optional(),
    userAgent: z.string().max(500).optional(),
    deviceId: DeviceIdSchema,
    screenResolution: z.string().optional(),
    language: z.string().optional(),
    timezone: z.string().optional(),
    // Bangladesh specific
    mobileOperator: z.enum(['gp', 'robi', 'banglalink', 'teletalk', 'unknown']).optional(),
    networkType: z.enum(['2g', '3g', '4g', '5g', 'wifi', 'unknown']).optional(),
  })
  .partial()
  .strict();

// ==================== Request Schemas ====================

// Email Login Schema
export const LoginSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .max(255, 'Email too long')
      .email('Invalid email format')
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_POLICY.MIN_LENGTH, `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`)
      .max(PASSWORD_POLICY.MAX_LENGTH, `Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`),
    rememberMe: RememberMeSchema,
    deviceId: DeviceIdSchema,
    captchaToken: CaptchaTokenSchema,
    clientInfo: ClientInfoSchema.optional(),
  })
  .strict()
  .brand('LoginRequest');

// Phone Login Schema (Bangladesh specific)
export const PhoneLoginSchema = z
  .object({
    phoneNumber: z
      .string()
      .regex(REGEX_PHONE.BANGLADESH, 'Invalid Bangladesh phone number format')
      .transform((val) => {
        // Normalize to +880 format
        if (val.startsWith('0')) {
          return `+88${val}`;
        }
        if (val.startsWith('+880')) {
          return val;
        }
        return `+880${val}`;
      }),
    password: z
      .string()
      .min(PASSWORD_POLICY.MIN_LENGTH, `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`)
      .max(PASSWORD_POLICY.MAX_LENGTH, `Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`),
    rememberMe: RememberMeSchema,
    deviceId: DeviceIdSchema,
    captchaToken: CaptchaTokenSchema,
    clientInfo: ClientInfoSchema.optional(),
  })
  .strict()
  .brand('PhoneLoginRequest');

// Username Login Schema
export const UsernameLoginSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(50, 'Username cannot exceed 50 characters')
      .regex(/^[a-zA-Z0-9._]+$/, 'Username can only contain letters, numbers, dots, and underscores')
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_POLICY.MIN_LENGTH, `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`)
      .max(PASSWORD_POLICY.MAX_LENGTH, `Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`),
    rememberMe: RememberMeSchema,
    deviceId: DeviceIdSchema,
    captchaToken: CaptchaTokenSchema,
    clientInfo: ClientInfoSchema.optional(),
  })
  .strict()
  .brand('UsernameLoginRequest');

// OTP Login Schema (Passwordless - Bangladesh specific)
export const OtpLoginSchema = z
  .object({
    phoneNumber: z
      .string()
      .regex(REGEX_PHONE.BANGLADESH, 'Invalid Bangladesh phone number format')
      .transform((val) => {
        if (val.startsWith('0')) {
          return `+88${val}`;
        }
        if (val.startsWith('+880')) {
          return val;
        }
        return `+880${val}`;
      }),
    otpCode: z
      .string()
      .length(6, 'OTP code must be 6 digits')
      .regex(/^\d{6}$/, 'OTP code must contain only digits'),
    rememberMe: RememberMeSchema,
    deviceId: DeviceIdSchema,
    clientInfo: ClientInfoSchema.optional(),
  })
  .strict()
  .brand('OtpLoginRequest');

// MFA Login Schema (After successful password verification)
export const MfaLoginSchema = z
  .object({
    sessionId: z.string().uuid('Invalid session ID'),
    mfaCode: z
      .string()
      .min(6, 'MFA code must be at least 6 digits')
      .max(8, 'MFA code cannot exceed 8 digits')
      .regex(/^\d+$/, 'MFA code must contain only digits'),
    method: z.enum(['totp', 'sms', 'email', 'backup_code', 'whatsapp']),
    trustDevice: z.boolean().default(false),
    deviceId: DeviceIdSchema,
  })
  .strict()
  .brand('MfaLoginRequest');

// ==================== Response Schemas ====================

// Login Response Schema
export const LoginResponseSchema = z
  .object({
    accessToken: z.string().min(1, 'Access token is required'),
    refreshToken: z.string().min(1, 'Refresh token is required'),
    expiresIn: z.number().int().positive().default(TOKEN_EXPIRY.ACCESS_TOKEN),
    refreshExpiresIn: z.number().int().positive().default(TOKEN_EXPIRY.REFRESH_TOKEN),
    tokenType: z.literal('Bearer'),
    user: z.object({
      id: z.string().uuid(),
      email: z.string().email(),
      phoneNumber: z.string().nullable(),
      firstName: z.string(),
      lastName: z.string(),
      displayName: z.string(),
      avatar: z.string().url().nullable(),
      role: z.string(),
      userTier: z.enum(['bronze', 'silver', 'gold', 'platinum', 'diamond']),
      emailVerified: z.boolean(),
      phoneVerified: z.boolean(),
    }),
    requiresMfa: z.boolean().default(false),
    mfaMethods: z.array(z.string()).optional(),
    sessionId: z.string().uuid().optional(),
  })
  .strict()
  .brand('LoginResponse');

// Refresh Token Response Schema
export const RefreshTokenResponseSchema = z
  .object({
    accessToken: z.string().min(1),
    refreshToken: z.string().min(1),
    expiresIn: z.number().int().positive(),
    tokenType: z.literal('Bearer'),
  })
  .strict()
  .brand('RefreshTokenResponse');

// Logout Request Schema
export const LogoutRequestSchema = z
  .object({
    refreshToken: z.string().min(1).optional(),
    allDevices: z.boolean().default(false),
    sessionId: z.string().uuid().optional(),
  })
  .strict()
  .brand('LogoutRequest');

// Logout Response Schema
export const LogoutResponseSchema = z
  .object({
    success: z.boolean(),
    message: z.string().default('Logged out successfully'),
  })
  .strict()
  .brand('LogoutResponse');

// ==================== Error Response Schemas ====================

export const LoginErrorSchema = z
  .object({
    error: z.string(),
    errorCode: z.enum([
      'invalid_credentials',
      'account_locked',
      'account_suspended',
      'email_not_verified',
      'phone_not_verified',
      'mfa_required',
      'mfa_failed',
      'rate_limited',
      'ip_blocked',
      'too_many_attempts',
    ]),
    remainingAttempts: z.number().int().min(0).optional(),
    lockoutDuration: z.number().int().optional(),
    retryAfterSeconds: z.number().int().optional(),
  })
  .strict()
  .brand('LoginError');

// ==================== Type Exports ====================

export type LoginMethod = z.infer < typeof LoginMethodSchema > ;
export type LoginRequest = z.infer < typeof LoginSchema > ;
export type PhoneLoginRequest = z.infer < typeof PhoneLoginSchema > ;
export type UsernameLoginRequest = z.infer < typeof UsernameLoginSchema > ;
export type OtpLoginRequest = z.infer < typeof OtpLoginSchema > ;
export type MfaLoginRequest = z.infer < typeof MfaLoginSchema > ;
export type LoginResponse = z.infer < typeof LoginResponseSchema > ;
export type RefreshTokenResponse = z.infer < typeof RefreshTokenResponseSchema > ;
export type LogoutRequest = z.infer < typeof LogoutRequestSchema > ;
export type LogoutResponse = z.infer < typeof LogoutResponseSchema > ;
export type LoginError = z.infer < typeof LoginErrorSchema > ;
export type DeviceId = z.infer < typeof DeviceIdSchema > ;
export type ClientInfo = z.infer < typeof ClientInfoSchema > ;
export type CaptchaToken = z.infer < typeof CaptchaTokenSchema > ;

// ==================== Helper Types (For frontend usage) ====================

export type LoginFormData = LoginRequest;
export type PhoneLoginFormData = PhoneLoginRequest;
export type OtpLoginFormData = OtpLoginRequest;
export type MfaLoginFormData = MfaLoginRequest;
