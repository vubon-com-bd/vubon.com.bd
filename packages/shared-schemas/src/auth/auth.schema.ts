/**
 * Authentication Core Schema
 * Zod schemas for core authentication process types
 */

import { z } from 'zod';
import { AUTH_TYPES, AUTH_PROVIDERS, AUTH_SCOPES, AUTH_CONFIG } from '@vubon/shared-constants';
import { idSchema, timestampSchema } from '../common/core-primitives.schema';

// ============================================================
// CORE AUTH CREDENTIALS SCHEMAS
// ============================================================

/**
 * Auth credentials schema
 */
export const authCredentialsSchema = z.object({
  identifier: z.string().min(1),
  password: z.string().min(1),
  type: z
    .enum([
      AUTH_TYPES.LOCAL,
      AUTH_TYPES.OAUTH,
      AUTH_TYPES.SSO,
      AUTH_TYPES.JWT,
      AUTH_TYPES.API_KEY,
      AUTH_TYPES.SESSION,
    ])
    .optional(),
  remember: z.boolean().optional(),
});

/**
 * Auth OAuth credentials schema
 */
export const authOAuthCredentialsSchema = z.object({
  provider: z.enum([
    AUTH_PROVIDERS.GOOGLE,
    AUTH_PROVIDERS.FACEBOOK,
    AUTH_PROVIDERS.GITHUB,
    AUTH_PROVIDERS.APPLE,
    AUTH_PROVIDERS.MICROSOFT,
    AUTH_PROVIDERS.TWITTER,
    AUTH_PROVIDERS.LINKEDIN,
  ]),
  code: z.string().min(1),
  redirectUri: z.string().url().optional(),
  state: z.string().optional(),
});

/**
 * Auth SSO credentials schema
 */
export const authSsoCredentialsSchema = z.object({
  provider: z.string().min(1),
  token: z.string().min(1),
  relayState: z.string().optional(),
});

// ============================================================
// AUTH CONTEXT SCHEMA
// ============================================================

/**
 * Auth context schema
 */
export const authContextSchema = z.object({
  authType: z.enum([
    AUTH_TYPES.LOCAL,
    AUTH_TYPES.OAUTH,
    AUTH_TYPES.SSO,
    AUTH_TYPES.JWT,
    AUTH_TYPES.API_KEY,
    AUTH_TYPES.SESSION,
  ]),
  sessionId: idSchema.optional(),
  deviceId: idSchema.optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  scopes: z
    .array(
      z.enum([
        AUTH_SCOPES.READ,
        AUTH_SCOPES.WRITE,
        AUTH_SCOPES.ADMIN,
        AUTH_SCOPES.USER,
        AUTH_SCOPES.VENDOR,
        AUTH_SCOPES.PROFILE,
        AUTH_SCOPES.EMAIL,
        AUTH_SCOPES.PHONE,
        AUTH_SCOPES.ADDRESS,
        AUTH_SCOPES.ORDERS,
        AUTH_SCOPES.PAYMENTS,
      ])
    )
    .optional(),
  authenticatedAt: timestampSchema,
});

// ============================================================
// AUTH CONFIG SCHEMA
// ============================================================

/**
 * Auth config schema
 */
export const authConfigSchema = z.object({
  jwtExpiry: z.string().default(AUTH_CONFIG.JWT_EXPIRY),
  refreshTokenExpiry: z.string().default(AUTH_CONFIG.REFRESH_TOKEN_EXPIRY),
  sessionExpiry: z.number().int().positive().default(AUTH_CONFIG.SESSION_EXPIRY),
  maxLoginAttempts: z.number().int().positive().default(AUTH_CONFIG.MAX_LOGIN_ATTEMPTS),
  lockoutDuration: z.number().int().positive().default(AUTH_CONFIG.LOCKOUT_DURATION),
  passwordMinLength: z.number().int().positive().default(AUTH_CONFIG.PASSWORD_MIN_LENGTH),
  passwordMaxLength: z.number().int().positive().default(AUTH_CONFIG.PASSWORD_MAX_LENGTH),
  tokenAlgorithm: z
    .enum(['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512'])
    .default(AUTH_CONFIG.TOKEN_ALGORITHM),
  tokenIssuer: z.string().default(AUTH_CONFIG.TOKEN_ISSUER),
  tokenAudience: z.string().default(AUTH_CONFIG.TOKEN_AUDIENCE),
  verificationTokenExpiry: z
    .number()
    .int()
    .positive()
    .default(AUTH_CONFIG.VERIFICATION_TOKEN_EXPIRY),
  resetTokenExpiry: z.number().int().positive().default(AUTH_CONFIG.RESET_TOKEN_EXPIRY),
  twoFaCodeLength: z.number().int().positive().default(AUTH_CONFIG.TWO_FA_CODE_LENGTH),
  twoFaCodeExpiry: z.number().int().positive().default(AUTH_CONFIG.TWO_FA_CODE_EXPIRY),
  sessionCheckInterval: z.number().int().positive().default(AUTH_CONFIG.SESSION_CHECK_INTERVAL),
});

// ============================================================
// AUTH TOKEN SCHEMA
// ============================================================

/**
 * Auth token schema
 */
export const authTokenSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().optional(),
  tokenType: z.string().min(1),
  expiresIn: z.number().int().positive(),
  refreshExpiresIn: z.number().int().positive().optional(),
  scope: z.string().optional(),
  idToken: z.string().optional(),
});

// ============================================================
// AUTH HEADER SCHEMA
// ============================================================

/**
 * Auth header schema
 */
export const authHeaderSchema = z.object({
  authorization: z.string().optional(),
  xApiKey: z.string().optional(),
  xSessionId: z.string().optional(),
  xDeviceId: z.string().optional(),
  userAgent: z.string().optional(),
  xForwardedFor: z.string().optional(),
});

// ============================================================
// AUTH COOKIE SCHEMA
// ============================================================

/**
 * Auth cookie schema
 */
export const authCookieSchema = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  sessionId: z.string().optional(),
  deviceId: z.string().optional(),
  twoFaCode: z.string().optional(),
});

// ============================================================
// TYPE INFERENCES
// ============================================================

export type AuthCredentials = z.infer<typeof authCredentialsSchema>;
export type AuthOAuthCredentials = z.infer<typeof authOAuthCredentialsSchema>;
export type AuthSsoCredentials = z.infer<typeof authSsoCredentialsSchema>;
export type AuthContext = z.infer<typeof authContextSchema>;
export type AuthConfig = z.infer<typeof authConfigSchema>;
export type AuthToken = z.infer<typeof authTokenSchema>;
export type AuthHeader = z.infer<typeof authHeaderSchema>;
export type AuthCookie = z.infer<typeof authCookieSchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get default auth config
 */
export function getAuthDefaultConfig(): AuthConfig {
  return {
    jwtExpiry: AUTH_CONFIG.JWT_EXPIRY,
    refreshTokenExpiry: AUTH_CONFIG.REFRESH_TOKEN_EXPIRY,
    sessionExpiry: AUTH_CONFIG.SESSION_EXPIRY,
    maxLoginAttempts: AUTH_CONFIG.MAX_LOGIN_ATTEMPTS,
    lockoutDuration: AUTH_CONFIG.LOCKOUT_DURATION,
    passwordMinLength: AUTH_CONFIG.PASSWORD_MIN_LENGTH,
    passwordMaxLength: AUTH_CONFIG.PASSWORD_MAX_LENGTH,
    tokenAlgorithm: AUTH_CONFIG.TOKEN_ALGORITHM,
    tokenIssuer: AUTH_CONFIG.TOKEN_ISSUER,
    tokenAudience: AUTH_CONFIG.TOKEN_AUDIENCE,
    verificationTokenExpiry: AUTH_CONFIG.VERIFICATION_TOKEN_EXPIRY,
    resetTokenExpiry: AUTH_CONFIG.RESET_TOKEN_EXPIRY,
    twoFaCodeLength: AUTH_CONFIG.TWO_FA_CODE_LENGTH,
    twoFaCodeExpiry: AUTH_CONFIG.TWO_FA_CODE_EXPIRY,
    sessionCheckInterval: AUTH_CONFIG.SESSION_CHECK_INTERVAL,
  };
}

/**
 * Create auth header
 */
export function createAuthHeader(token: string, type: string = 'Bearer'): AuthHeader {
  return {
    authorization: `${type} ${token}`,
  };
}
