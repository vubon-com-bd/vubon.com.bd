/**
 * Social Auth Schemas - Pure validation for OAuth
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/auth/social.schema
 * 
 * RULES:
 * ✅ ONLY Zod schemas - NO business logic
 * ✅ NO OAuth implementation, token exchange, API calls
 * ✅ NO side effects, NO async
 * ✅ Reusable primitives from constants
 * ✅ Strict mode enabled
 * ✅ Type exports with z.infer
 */

import { z } from 'zod';

// Import constants from shared-constants layer (Enterprise rule)
// ✅ FIXED: Correct package name and only needed imports
import { SOCIAL_PROVIDERS } from '@vubon/shared-constants';

// ==================== Primitives (Reusable) ====================

// Phone Schema for Bangladesh (Used in WhatsApp OTP, etc.)
// ✅ FIXED: Added export and brand
export const PhoneSchema = z
  .string()
  .regex(/^(?:\+880|0)1[3-9]\d{8}$/, 'Invalid Bangladesh phone number. Use format: 01XXXXXXXXX or +8801XXXXXXXXX')
  .transform((val) => {
    if (val.startsWith('0')) {
      return `+88${val}`;
    }
    if (val.startsWith('+880')) {
      return val;
    }
    return `+880${val}`;
  })
  .brand('Phone');

// Social Provider Schema (Based on constants)
export const SocialProviderSchema = z.enum([
  SOCIAL_PROVIDERS.GOOGLE,
  SOCIAL_PROVIDERS.GITHUB,
  SOCIAL_PROVIDERS.FACEBOOK,
  SOCIAL_PROVIDERS.APPLE,
  SOCIAL_PROVIDERS.TWITTER,
  SOCIAL_PROVIDERS.LINKEDIN,
  SOCIAL_PROVIDERS.MICROSOFT,
  // Bangladesh specific
  'whatsapp',
  'imo',
  'telegram',
  'viber',
  'instagram',
  'tiktok',
  'snapchat',
  'phone_otp',
  'whatsapp_otp',
  'imo_otp',
  'bkash',
  'nagad',
  'rocket',
]);

// OAuth State Schema (Anti-CSRF protection)
export const OAuthStateSchema = z
  .string()
  .min(10, 'State parameter must be at least 10 characters')
  .max(255, 'State parameter too long')
  .regex(/^[a-zA-Z0-9\-_]+$/, 'State contains invalid characters')
  .brand('OAuthState');

// OAuth Code Schema (Authorization code from provider)
export const OAuthCodeSchema = z
  .string()
  .min(1, 'Authorization code is required')
  .max(1000, 'Authorization code too long')
  .brand('OAuthCode');

// OAuth Scope Schema
export const OAuthScopeSchema = z.array(z.string().min(1)).default(['email', 'profile']);

// Redirect URI Schema
export const RedirectUriSchema = z
  .string()
  .url('Invalid redirect URI')
  .transform((val) => {
    // Remove trailing slash for consistency
    return val.replace(/\/$/, '');
  })
  .brand('RedirectUri');

// PKCE Code Verifier Schema (For enhanced OAuth security)
export const PKCECodeVerifierSchema = z
  .string()
  .min(43, 'PKCE code verifier must be at least 43 characters')
  .max(128, 'PKCE code verifier too long')
  .regex(/^[a-zA-Z0-9\-._~]+$/, 'PKCE code verifier contains invalid characters')
  .optional()
  .brand('PKCECodeVerifier');

// PKCE Code Challenge Schema
export const PKCECodeChallengeSchema = z
  .string()
  .min(43, 'PKCE code challenge must be at least 43 characters')
  .max(128, 'PKCE code challenge too long')
  .regex(/^[a-zA-Z0-9\-._~]+$/, 'PKCE code challenge contains invalid characters')
  .brand('PKCECodeChallenge');

// ==================== Provider-Specific Data Schemas ====================

// Google OAuth Data Schema
export const GoogleOAuthDataSchema = z
  .object({
    sub: z.string(),
    email: z.string().email(),
    email_verified: z.boolean(),
    name: z.string(),
    given_name: z.string(),
    family_name: z.string(),
    picture: z.string().url().optional(),
    locale: z.string().optional(),
    hd: z.string().optional(),
  })
  .strict()
  .brand('GoogleOAuthData');

// Facebook OAuth Data Schema
export const FacebookOAuthDataSchema = z
  .object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    picture: z
      .object({
        data: z.object({
          url: z.string().url(),
        }),
      })
      .optional(),
    birthday: z.string().optional(),
    gender: z.string().optional(),
    verified: z.boolean().optional(),
  })
  .strict()
  .brand('FacebookOAuthData');

// GitHub OAuth Data Schema
export const GitHubOAuthDataSchema = z
  .object({
    id: z.number(),
    login: z.string(),
    name: z.string().nullable(),
    email: z.string().email().nullable(),
    avatar_url: z.string().url().optional(),
    bio: z.string().nullable().optional(),
    company: z.string().nullable().optional(),
    location: z.string().nullable().optional(),
    followers: z.number().optional(),
    following: z.number().optional(),
  })
  .strict()
  .brand('GitHubOAuthData');

// Apple OAuth Data Schema
export const AppleOAuthDataSchema = z
  .object({
    sub: z.string(),
    email: z.string().email(),
    email_verified: z.boolean(),
    is_private_email: z.boolean().optional(),
    real_user_status: z.number().optional(),
    name: z.string().optional(),
  })
  .strict()
  .brand('AppleOAuthData');

// WhatsApp OAuth Data Schema (Bangladesh specific)
export const WhatsAppOAuthDataSchema = z
  .object({
    phoneNumber: PhoneSchema,
    verified: z.boolean(),
    businessAccount: z.boolean().default(false),
    displayName: z.string(),
    profilePicture: z.string().url().optional(),
  })
  .strict()
  .brand('WhatsAppOAuthData');

// bKash OAuth Data Schema (Bangladesh specific)
export const BkashOAuthDataSchema = z
  .object({
    accountNumber: z.string().min(11).max(20),
    maskedAccountNumber: z.string(),
    accountType: z.enum(['personal', 'merchant']),
    accountHolderName: z.string(),
    verified: z.boolean(),
  })
  .strict()
  .brand('BkashOAuthData');

// Nagad OAuth Data Schema (Bangladesh specific)
export const NagadOAuthDataSchema = z
  .object({
    accountNumber: z.string().min(11).max(20),
    maskedAccountNumber: z.string(),
    accountType: z.enum(['personal', 'merchant']),
    accountHolderName: z.string(),
    verified: z.boolean(),
  })
  .strict()
  .brand('NagadOAuthData');

// Rocket OAuth Data Schema (Bangladesh specific)
export const RocketOAuthDataSchema = z
  .object({
    accountNumber: z.string().min(11).max(20),
    maskedAccountNumber: z.string(),
    accountType: z.enum(['personal', 'merchant']),
    accountHolderName: z.string(),
    verified: z.boolean(),
  })
  .strict()
  .brand('RocketOAuthData');

// ==================== Request Schemas ====================

// Social Login Request (Initiate OAuth flow)
export const SocialLoginRequestSchema = z
  .object({
    provider: SocialProviderSchema,
    redirectUri: RedirectUriSchema.optional(),
    scopes: OAuthScopeSchema.optional(),
    state: OAuthStateSchema.optional(),
    codeChallenge: PKCECodeChallengeSchema.optional(),
    codeChallengeMethod: z.enum(['S256', 'plain']).default('S256'),
  })
  .strict()
  .brand('SocialLoginRequest');

// Social Login Response (OAuth redirect URL)
export const SocialLoginResponseSchema = z
  .object({
    url: z.string().url('Invalid redirect URL'),
    state: OAuthStateSchema,
    codeVerifier: PKCECodeVerifierSchema.optional(), // Store temporarily
  })
  .strict()
  .brand('SocialLoginResponse');

// Social Callback Request (Handle OAuth callback)
export const SocialCallbackSchema = z
  .object({
    provider: SocialProviderSchema,
    code: OAuthCodeSchema,
    state: OAuthStateSchema,
    codeVerifier: PKCECodeVerifierSchema.optional(),
    error: z.string().optional(),
    errorDescription: z.string().optional(),
  })
  .strict()
  .brand('SocialCallbackRequest');

// Social Connect Request (Link existing account)
export const SocialConnectRequestSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID'),
    provider: SocialProviderSchema,
    code: OAuthCodeSchema,
    state: OAuthStateSchema,
    codeVerifier: PKCECodeVerifierSchema.optional(),
    makePrimary: z.boolean().default(false),
  })
  .strict()
  .brand('SocialConnectRequest');

// Social Disconnect Request (Unlink account)
export const SocialDisconnectRequestSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID'),
    provider: SocialProviderSchema,
    reason: z.string().max(500).optional(),
    keepData: z.boolean().default(false),
  })
  .strict()
  .brand('SocialDisconnectRequest');

// Social OTP Request (Bangladesh specific - WhatsApp/Imo OTP)
export const SocialOTPRequestSchema = z
  .object({
    phoneNumber: PhoneSchema,
    provider: z.enum(['whatsapp', 'imo', 'phone_otp']),
    method: z.enum(['sms', 'whatsapp', 'imo']),
    locale: z.enum(['en', 'bn']).default('en'),
  })
  .strict()
  .brand('SocialOTPRequest');

// Social OTP Verification Request
export const SocialOTPVerificationSchema = z
  .object({
    phoneNumber: PhoneSchema,
    provider: z.enum(['whatsapp', 'imo', 'phone_otp']),
    otpCode: z.string().length(6, 'OTP must be 6 digits').regex(/^\d{6}$/, 'OTP must contain only digits'),
    sessionId: z.string().uuid().optional(),
  })
  .strict()
  .brand('SocialOTPVerificationRequest');

// MFS Auth Request (bKash/Nagad/Rocket - Bangladesh specific)
export const MFSAuthRequestSchema = z
  .object({
    provider: z.enum(['bkash', 'nagad', 'rocket']),
    accountNumber: z.string().min(11).max(20),
    pin: z.string().length(4, 'PIN must be 4 digits').regex(/^\d{4}$/, 'PIN must contain only digits').optional(),
    otpCode: z.string().length(6, 'OTP must be 6 digits').regex(/^\d{6}$/, 'OTP must contain only digits').optional(),
    callbackUrl: z.string().url().optional(),
  })
  .strict()
  .refine(
    (data) => data.pin !== undefined || data.otpCode !== undefined,
    {
      message: 'Either PIN or OTP code is required',
      path: ['pin'],
    }
  )
  .brand('MFSAuthRequest');

// ==================== Response Schemas ====================

// Social User Info (Normalized user data from provider)
export const SocialUserInfoSchema = z
  .object({
    email: z.string().email().optional(),
    phoneNumber: PhoneSchema.optional(),
    name: z.string().min(1, 'Name is required'),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    avatar: z.string().url().optional(),
    provider: SocialProviderSchema,
    providerUserId: z.string().min(1, 'Provider user ID is required'),
    emailVerified: z.boolean().default(false),
    phoneVerified: z.boolean().default(false),
  })
  .strict()
  .brand('SocialUserInfo');

// Social Callback Response
export const SocialCallbackResponseSchema = z
  .object({
    success: z.boolean(),
    user: SocialUserInfoSchema.optional(),
    existingUser: z
      .object({
        userId: z.string().uuid(),
        email: z.string().email().optional(),
        phoneNumber: PhoneSchema.optional(),
        isLinked: z.boolean().default(false),
      })
      .optional(),
    isNewUser: z.boolean(),
    isNewConnection: z.boolean().default(false),
    accessToken: z.string().optional(),
    refreshToken: z.string().optional(),
    expiresIn: z.number().int().positive().optional(),
    requiresEmailVerification: z.boolean().default(false),
    requiresPhoneVerification: z.boolean().default(false),
  })
  .strict()
  .brand('SocialCallbackResponse');

// Social Account Schema (Linked social account)
export const SocialAccountSchema = z
  .object({
    id: z.string().uuid(),
    provider: SocialProviderSchema,
    providerUserId: z.string(),
    email: z.string().email().nullable(),
    phoneNumber: PhoneSchema.nullable(),
    name: z.string(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    avatar: z.string().url().nullable(),
    isPrimary: z.boolean(),
    isVerified: z.boolean(),
    connectedAt: z.date(),
    lastUsedAt: z.date().nullable(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict()
  .brand('SocialAccount');

// Social Accounts Response (List of linked accounts)
export const SocialAccountsResponseSchema = z
  .object({
    userId: z.string().uuid(),
    accounts: z.array(SocialAccountSchema),
    total: z.number().int().min(0),
    canAddMore: z.boolean(),
    maxAccounts: z.number().int().positive(),
  })
  .strict()
  .brand('SocialAccountsResponse');

// Social OTP Response (Bangladesh specific)
export const SocialOTPResponseSchema = z
  .object({
    success: z.boolean(),
    otpSent: z.boolean(),
    maskedPhone: z.string(),
    method: z.enum(['sms', 'whatsapp', 'imo']),
    expiresInSeconds: z.number().int().positive().default(300),
    resendCooldownSeconds: z.number().int().default(30),
    sessionId: z.string().uuid(),
    remainingAttempts: z.number().int().default(3),
  })
  .strict()
  .brand('SocialOTPResponse');

// MFS Auth Response (Bangladesh specific)
export const MFSAuthResponseSchema = z
  .object({
    success: z.boolean(),
    authenticated: z.boolean(),
    requiresOTP: z.boolean(),
    requiresPin: z.boolean(),
    sessionId: z.string().uuid().optional(),
    userInfo: SocialUserInfoSchema.optional(),
    errorMessage: z.string().optional(),
    errorCode: z.string().optional(),
  })
  .strict()
  .brand('MFSAuthResponse');

// ==================== Error Schemas ====================

export const SocialAuthErrorSchema = z
  .object({
    error: z.string(),
    errorCode: z.enum([
      'invalid_provider',
      'invalid_code',
      'invalid_state',
      'state_mismatch',
      'access_denied',
      'user_cancelled',
      'invalid_redirect_uri',
      'provider_error',
      'token_exchange_failed',
      'email_already_exists',
      'phone_already_exists',
      'account_already_linked',
      'rate_limited',
      'invalid_pin',
      'invalid_otp',
      'otp_expired',
      'max_attempts_exceeded',
    ]),
    errorDescription: z.string().optional(),
  })
  .strict()
  .brand('SocialAuthError');

// ==================== Type Exports ====================

export type Phone = z.infer<typeof PhoneSchema>;
export type SocialProvider = z.infer<typeof SocialProviderSchema>;
export type OAuthState = z.infer<typeof OAuthStateSchema>;
export type OAuthCode = z.infer<typeof OAuthCodeSchema>;
export type OAuthScope = z.infer<typeof OAuthScopeSchema>;
export type RedirectUri = z.infer<typeof RedirectUriSchema>;
export type PKCECodeVerifier = z.infer<typeof PKCECodeVerifierSchema>;
export type PKCECodeChallenge = z.infer<typeof PKCECodeChallengeSchema>;

export type GoogleOAuthData = z.infer<typeof GoogleOAuthDataSchema>;
export type FacebookOAuthData = z.infer<typeof FacebookOAuthDataSchema>;
export type GitHubOAuthData = z.infer<typeof GitHubOAuthDataSchema>;
export type AppleOAuthData = z.infer<typeof AppleOAuthDataSchema>;
export type WhatsAppOAuthData = z.infer<typeof WhatsAppOAuthDataSchema>;
export type BkashOAuthData = z.infer<typeof BkashOAuthDataSchema>;
export type NagadOAuthData = z.infer<typeof NagadOAuthDataSchema>;
export type RocketOAuthData = z.infer<typeof RocketOAuthDataSchema>;

export type SocialLoginRequest = z.infer<typeof SocialLoginRequestSchema>;
export type SocialLoginResponse = z.infer<typeof SocialLoginResponseSchema>;
export type SocialCallbackRequest = z.infer<typeof SocialCallbackSchema>;
export type SocialConnectRequest = z.infer<typeof SocialConnectRequestSchema>;
export type SocialDisconnectRequest = z.infer<typeof SocialDisconnectRequestSchema>;
export type SocialOTPRequest = z.infer<typeof SocialOTPRequestSchema>;
export type SocialOTPVerificationRequest = z.infer<typeof SocialOTPVerificationSchema>;
export type MFSAuthRequest = z.infer<typeof MFSAuthRequestSchema>;

export type SocialUserInfo = z.infer<typeof SocialUserInfoSchema>;
export type SocialCallbackResponse = z.infer<typeof SocialCallbackResponseSchema>;
export type SocialAccount = z.infer<typeof SocialAccountSchema>;
export type SocialAccountsResponse = z.infer<typeof SocialAccountsResponseSchema>;
export type SocialOTPResponse = z.infer<typeof SocialOTPResponseSchema>;
export type MFSAuthResponse = z.infer<typeof MFSAuthResponseSchema>;
export type SocialAuthError = z.infer<typeof SocialAuthErrorSchema>;
