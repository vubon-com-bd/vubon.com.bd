/**
 * Verification Schemas - Pure validation for email/phone verification
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/auth-schemas/src/auth/verification.schema
 * 
 * RULES:
 * ✅ ONLY Zod schemas - NO business logic
 * ✅ NO email sending, SMS sending, token generation
 * ✅ NO side effects, NO async
 * ✅ Reusable primitives from constants
 * ✅ Strict mode enabled
 * ✅ Type exports with z.infer
 */

import { z } from 'zod';

// Import constants from shared-constants layer (Enterprise rule)
import {
  TOKEN_EXPIRY,
  OTP_CONFIG,
} from '@vubon/auth-constants';

// ==================== Primitives (Reusable) ====================

// Email Schema
const UserEmailSchema = z
  .string()
  .min(1, 'Email is required')
  .max(255, 'Email too long')
  .email('Invalid email format')
  .trim()
  .toLowerCase();

// Phone Schema (Bangladesh specific)
const UserPhoneSchema = z
  .string()
  .regex(/^(?:\+880|0)1[3-9]\d{8}$/, 'Invalid Bangladesh phone number format')
  .transform((val) => {
    if (val.startsWith('0')) {
      return `+88${val}`;
    }
    if (val.startsWith('+880')) {
      return val;
    }
    return `+880${val}`;
  });

// Verification Type Schema
export const VerificationTypeSchema = z.enum([
  'email_verification',
  'phone_verification',
  'password_reset',
  'magic_link',
  'email_change',
  'phone_change',
  'account_recovery',
  'device_verification',
  'mfa_setup',
  'whatsapp_verification',
  'imo_verification',
]);

// Verification Status Schema
export const VerificationStatusSchema = z.enum([
  'pending',
  'verified',
  'expired',
  'failed',
  'cancelled',
  'used',
]);

// Verification Method Schema
export const VerificationMethodSchema = z.enum([
  'email',
  'sms',
  'whatsapp',
  'imo',
  'voice_call',
  'push',
]);

// Verification Token Schema
export const VerificationTokenSchema = z
  .string()
  .min(32, 'Invalid token format')
  .max(512, 'Token too long')
  .regex(/^[a-zA-Z0-9\-_]+$/, 'Token contains invalid characters')
  .brand('VerificationToken');

// Verification Code Schema (OTP)
export const VerificationCodeSchema = z
  .string()
  .length(OTP_CONFIG.LENGTH, `Verification code must be ${OTP_CONFIG.LENGTH} digits`)
  .regex(new RegExp(`^[0-9]{${OTP_CONFIG.LENGTH}}$`), 'Verification code must contain only digits')
  .brand('VerificationCode');

// User ID Schema
export const UserIdSchema = z.string().uuid('Invalid user ID format').brand('UserId');

// Session ID Schema
export const SessionIdSchema = z.string().uuid('Invalid session ID format').brand('SessionId');

// ==================== Request Schemas ====================

// Send Verification Request
export const SendVerificationSchema = z
  .object({
    userId: UserIdSchema,
    type: VerificationTypeSchema,
    method: VerificationMethodSchema.optional(),
    target: z.union([UserEmailSchema, UserPhoneSchema]),
    metadata: z
      .object({
        ipAddress: z.string().ip().optional(),
        userAgent: z.string().optional(),
        deviceId: z.string().optional(),
      })
      .optional(),
  })
  .strict()
  .brand('SendVerificationRequest');

// Verify Email Request (Token based)
export const VerifyEmailSchema = z
  .object({
    token: VerificationTokenSchema,
  })
  .strict()
  .brand('VerifyEmailRequest');

// Verify Code Request (OTP based)
export const VerifyCodeSchema = z
  .object({
    userId: UserIdSchema,
    code: VerificationCodeSchema,
    type: VerificationTypeSchema,
    method: VerificationMethodSchema.optional(),
    sessionId: SessionIdSchema.optional(),
  })
  .strict()
  .brand('VerifyCodeRequest');

// Resend Verification Request
export const ResendVerificationSchema = z
  .object({
    userId: UserIdSchema,
    type: VerificationTypeSchema,
    method: VerificationMethodSchema.optional(),
    reason: z.string().max(200).optional(),
  })
  .strict()
  .brand('ResendVerificationRequest');

// Magic Link Request (Passwordless login)
export const MagicLinkRequestSchema = z
  .object({
    email: UserEmailSchema,
    redirectUrl: z.string().url('Invalid redirect URL'),
    deviceInfo: z
      .object({
        deviceId: z.string().optional(),
        userAgent: z.string().optional(),
        ipAddress: z.string().ip().optional(),
      })
      .optional(),
    action: z.enum(['login', 'signup', 'verify']).default('login'),
  })
  .strict()
  .brand('MagicLinkRequest');

// Magic Link Verify Request
export const MagicLinkVerifySchema = z
  .object({
    token: VerificationTokenSchema,
  })
  .strict()
  .brand('MagicLinkVerifyRequest');

// Email Change Request
export const EmailChangeRequestSchema = z
  .object({
    userId: UserIdSchema,
    newEmail: UserEmailSchema,
    password: z.string().min(1, 'Password is required'),
    reason: z.string().max(200).optional(),
  })
  .strict()
  .brand('EmailChangeRequest');

// Email Change Verify Request
export const EmailChangeVerifySchema = z
  .object({
    token: VerificationTokenSchema,
  })
  .strict()
  .brand('EmailChangeVerifyRequest');

// Phone Change Request (Bangladesh specific)
export const PhoneChangeRequestSchema = z
  .object({
    userId: UserIdSchema,
    newPhoneNumber: UserPhoneSchema,
    password: z.string().min(1, 'Password is required'),
    reason: z.string().max(200).optional(),
  })
  .strict()
  .brand('PhoneChangeRequest');

// Phone Change Verify Request
export const PhoneChangeVerifySchema = z
  .object({
    userId: UserIdSchema,
    code: VerificationCodeSchema,
    sessionId: SessionIdSchema.optional(),
  })
  .strict()
  .brand('PhoneChangeVerifyRequest');

// Send OTP Request (Bangladesh specific)
export const SendOTPRequestSchema = z
  .object({
    phoneNumber: UserPhoneSchema,
    type: VerificationTypeSchema,
    method: z.enum(['sms', 'whatsapp', 'voice']).default('sms'),
    locale: z.enum(['en', 'bn']).default('en'),
  })
  .strict()
  .brand('SendOTPRequest');

// Resend OTP Request
export const ResendOTPRequestSchema = z
  .object({
    sessionId: SessionIdSchema,
    method: z.enum(['sms', 'whatsapp', 'voice']).optional(),
  })
  .strict()
  .brand('ResendOTPRequest');

// WhatsApp Verification Request (Bangladesh specific)
export const WhatsAppVerificationSchema = z
  .object({
    phoneNumber: UserPhoneSchema,
    businessAccountId: z.string().optional(),
    templateName: z.string().optional(),
    locale: z.enum(['en', 'bn']).default('en'),
  })
  .strict()
  .brand('WhatsAppVerificationRequest');

// Voice Call Verification Request (For feature phones)
export const VoiceVerificationSchema = z
  .object({
    phoneNumber: UserPhoneSchema,
    language: z.enum(['en', 'bn']).default('bn'),
    retryCount: z.number().int().min(1).max(3).optional(),
  })
  .strict()
  .brand('VoiceVerificationRequest');

// ==================== Response Schemas ====================

// Verification Response
export const VerificationResponseSchema = z
  .object({
    success: z.boolean(),
    status: VerificationStatusSchema,
    message: z.string().optional(),
    messageBn: z.string().optional(), // Bengali message
    verifiedAt: z.date().optional(),
    remainingAttempts: z.number().int().min(0).optional(),
    expiresAt: z.date().optional(),
    sessionId: SessionIdSchema.optional(),
  })
  .strict()
  .brand('VerificationResponse');

// Resend Verification Response
export const ResendVerificationResponseSchema = z
  .object({
    success: z.boolean(),
    message: z.string(),
    messageBn: z.string().optional(),
    cooldownSeconds: z.number().int().positive(),
    expiresAt: z.date(),
    method: VerificationMethodSchema,
    sessionId: SessionIdSchema,
  })
  .strict()
  .brand('ResendVerificationResponse');

// Verification Status Response
export const VerificationStatusResponseSchema = z
  .object({
    emailVerified: z.boolean(),
    phoneVerified: z.boolean(),
    fullyVerified: z.boolean(),
    kycVerified: z.boolean().optional(),
    emailVerifiedAt: z.date().nullable(),
    phoneVerifiedAt: z.date().nullable(),
    kycVerifiedAt: z.date().nullable(),
    lastVerificationSentAt: z.date().nullable(),
  })
  .strict()
  .brand('VerificationStatusResponse');

// Magic Link Response
export const MagicLinkResponseSchema = z
  .object({
    success: z.boolean(),
    message: z.string(),
    emailSent: z.boolean(),
    maskedEmail: z.string(),
    expiresInSeconds: z.number().int().positive().default(TOKEN_EXPIRY.MAGIC_LINK_TOKEN),
    resendCooldownSeconds: z.number().int().default(60),
  })
  .strict()
  .brand('MagicLinkResponse');

// Magic Link Verify Response
export const MagicLinkVerifyResponseSchema = z
  .object({
    success: z.boolean(),
    verified: z.boolean(),
    userId: UserIdSchema.optional(),
    email: z.string().email().optional(),
    redirectUrl: z.string().url().optional(),
    expiresAt: z.date().optional(),
  })
  .strict()
  .brand('MagicLinkVerifyResponse');

// Send OTP Response
export const SendOTPResponseSchema = z
  .object({
    success: z.boolean(),
    otpSent: z.boolean(),
    maskedPhone: z.string(),
    method: z.enum(['sms', 'whatsapp', 'voice']),
    expiresInSeconds: z.number().int().positive().default(OTP_CONFIG.TOTP_INTERVAL_SECONDS * 10),
    resendCooldownSeconds: z.number().int().default(30),
    sessionId: SessionIdSchema,
    remainingAttempts: z.number().int().default(3),
  })
  .strict()
  .brand('SendOTPResponse');

// Email Change Response
export const EmailChangeResponseSchema = z
  .object({
    success: z.boolean(),
    message: z.string(),
    verificationSent: z.boolean(),
    targetEmail: z.string().email(),
    maskedEmail: z.string(),
    expiresInSeconds: z.number().int().positive().default(TOKEN_EXPIRY.EMAIL_VERIFICATION_TOKEN),
    requiresCurrentEmailVerification: z.boolean().default(false),
  })
  .strict()
  .brand('EmailChangeResponse');

// Phone Change Response (Bangladesh specific)
export const PhoneChangeResponseSchema = z
  .object({
    success: z.boolean(),
    message: z.string(),
    messageBn: z.string().optional(),
    verificationSent: z.boolean(),
    method: VerificationMethodSchema,
    maskedPhone: z.string(),
    expiresInSeconds: z.number().int().positive(),
    sessionId: SessionIdSchema,
  })
  .strict()
  .brand('PhoneChangeResponse');

// WhatsApp Verification Response
export const WhatsAppVerificationResponseSchema = z
  .object({
    success: z.boolean(),
    messageId: z.string().optional(),
    status: z.enum(['sent', 'pending', 'failed']),
    expiresInSeconds: z.number().int().positive(),
  })
  .strict()
  .brand('WhatsAppVerificationResponse');

// Voice Verification Response
export const VoiceVerificationResponseSchema = z
  .object({
    success: z.boolean(),
    callId: z.string(),
    status: z.enum(['initiated', 'in_progress', 'completed', 'failed']),
    expiresInSeconds: z.number().int().positive(),
  })
  .strict()
  .brand('VoiceVerificationResponse');

// ==================== Error Schemas ====================

export const VerificationErrorSchema = z
  .object({
    error: z.string(),
    errorCode: z.enum([
      'invalid_token',
      'token_expired',
      'token_already_used',
      'invalid_code',
      'code_expired',
      'max_attempts_exceeded',
      'rate_limited',
      'user_not_found',
      'email_already_verified',
      'phone_already_verified',
      'email_already_exists',
      'phone_already_exists',
      'invalid_otp_method',
      'sms_failed',
      'whatsapp_failed',
      'voice_call_failed',
    ]),
    remainingAttempts: z.number().int().min(0).optional(),
    retryAfterSeconds: z.number().int().optional(),
  })
  .strict()
  .brand('VerificationError');

// ==================== Type Exports ====================

export type VerificationType = z.infer<typeof VerificationTypeSchema>;
export type VerificationStatus = z.infer<typeof VerificationStatusSchema>;
export type VerificationMethod = z.infer<typeof VerificationMethodSchema>;
export type VerificationToken = z.infer<typeof VerificationTokenSchema>;
export type VerificationCode = z.infer<typeof VerificationCodeSchema>;
export type UserId = z.infer<typeof UserIdSchema>;
export type SessionId = z.infer<typeof SessionIdSchema>;

export type SendVerificationRequest = z.infer<typeof SendVerificationSchema>;
export type VerifyEmailRequest = z.infer<typeof VerifyEmailSchema>;
export type VerifyCodeRequest = z.infer<typeof VerifyCodeSchema>;
export type ResendVerificationRequest = z.infer<typeof ResendVerificationSchema>;
export type MagicLinkRequest = z.infer<typeof MagicLinkRequestSchema>;
export type MagicLinkVerifyRequest = z.infer<typeof MagicLinkVerifySchema>;
export type EmailChangeRequest = z.infer<typeof EmailChangeRequestSchema>;
export type EmailChangeVerifyRequest = z.infer<typeof EmailChangeVerifySchema>;
export type PhoneChangeRequest = z.infer<typeof PhoneChangeRequestSchema>;
export type PhoneChangeVerifyRequest = z.infer<typeof PhoneChangeVerifySchema>;
export type SendOTPRequest = z.infer<typeof SendOTPRequestSchema>;
export type ResendOTPRequest = z.infer<typeof ResendOTPRequestSchema>;
export type WhatsAppVerificationRequest = z.infer<typeof WhatsAppVerificationSchema>;
export type VoiceVerificationRequest = z.infer<typeof VoiceVerificationSchema>;

export type VerificationResponse = z.infer<typeof VerificationResponseSchema>;
export type ResendVerificationResponse = z.infer<typeof ResendVerificationResponseSchema>;
export type VerificationStatusResponse = z.infer<typeof VerificationStatusResponseSchema>;
export type MagicLinkResponse = z.infer<typeof MagicLinkResponseSchema>;
export type MagicLinkVerifyResponse = z.infer<typeof MagicLinkVerifyResponseSchema>;
export type SendOTPResponse = z.infer<typeof SendOTPResponseSchema>;
export type EmailChangeResponse = z.infer<typeof EmailChangeResponseSchema>;
export type PhoneChangeResponse = z.infer<typeof PhoneChangeResponseSchema>;
export type WhatsAppVerificationResponse = z.infer<typeof WhatsAppVerificationResponseSchema>;
export type VoiceVerificationResponse = z.infer<typeof VoiceVerificationResponseSchema>;
export type VerificationError = z.infer<typeof VerificationErrorSchema>;
