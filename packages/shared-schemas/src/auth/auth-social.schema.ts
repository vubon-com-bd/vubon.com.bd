/**
 * Authentication Social Schema
 * Zod schemas for social login, social media integration, and social authentication
 */

import { z } from 'zod';
import {
  AUTH_SOCIAL_LOGIN_STATUS,
  AUTH_SOCIAL_PROVIDER_CONFIG,
  AUTH_SOCIAL_LOGIN_ERRORS,
  AUTH_SOCIAL_LOGIN_SUCCESS,
  AUTH_SOCIAL_PROVIDER_TYPES,
  AUTH_SOCIAL_PROVIDER_TYPE_MAP,
  AUTH_SOCIAL_LOGIN_STATUS_MESSAGES,
  type AuthSocialLoginStatus,
  type AuthSocialProviderConfig,
  type AuthSocialLoginError,
  type AuthSocialLoginSuccess,
  type AuthSocialProviderType,
} from '@vubon/shared-constants';
import type { AuthSocialProvider } from '@vubon/shared-types';
import {
  idSchema,
  emailSchema,
  urlSchema,
  timestampSchema,
  jsonObjectSchema,
} from '../common/core-primitives.schema';

// ============================================================
// SOCIAL PROVIDER SCHEMAS
// ============================================================

/**
 * Social provider schema
 */
export const authSocialProviderSchema = z.enum([
  'google',
  'facebook',
  'github',
  'twitter',
  'linkedin',
  'apple',
  'microsoft',
  'instagram',
  'tiktok',
  'snapchat',
  'wechat',
  'line',
  'telegram',
  'whatsapp',
  'vk',
  'yahoo',
  'discord',
  'slack',
  'spotify',
]);

/**
 * Social login status schema
 */
export const authSocialLoginStatusSchema = z.enum([
  AUTH_SOCIAL_LOGIN_STATUS.SUCCESS,
  AUTH_SOCIAL_LOGIN_STATUS.FAILED,
  AUTH_SOCIAL_LOGIN_STATUS.REQUIRES_INFO,
  AUTH_SOCIAL_LOGIN_STATUS.REQUIRES_VERIFICATION,
  AUTH_SOCIAL_LOGIN_STATUS.CANCELLED,
  AUTH_SOCIAL_LOGIN_STATUS.TIMEOUT,
  AUTH_SOCIAL_LOGIN_STATUS.REQUIRES_LINKING,
  AUTH_SOCIAL_LOGIN_STATUS.BLOCKED,
]);

/**
 * Social provider type schema
 */
export const authSocialProviderTypeSchema = z.enum([
  AUTH_SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  AUTH_SOCIAL_PROVIDER_TYPES.PROFESSIONAL,
  AUTH_SOCIAL_PROVIDER_TYPES.DEVELOPER,
  AUTH_SOCIAL_PROVIDER_TYPES.MESSAGING,
  AUTH_SOCIAL_PROVIDER_TYPES.ENTERTAINMENT,
]);

// ============================================================
// SOCIAL PROFILE SCHEMAS
// ============================================================

/**
 * Social profile schema
 */
export const authSocialProfileSchema = z.object({
  provider: authSocialProviderSchema,
  providerUserId: z.string().min(1),
  email: emailSchema.optional(),
  emailVerified: z.boolean().optional(),
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  picture: urlSchema.optional(),
  profileUrl: urlSchema.optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
  rawData: jsonObjectSchema.optional(),
  fetchedAt: timestampSchema,
});

// ============================================================
// SOCIAL ACCOUNT SCHEMAS
// ============================================================

/**
 * Social account schema
 */
export const authSocialAccountSchema = z.object({
  id: idSchema,
  userId: idSchema,
  provider: authSocialProviderSchema,
  providerUserId: z.string().min(1),
  profile: authSocialProfileSchema,
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  tokenExpiresAt: timestampSchema.optional(),
  isActive: z.boolean().default(true),
  isVerified: z.boolean().default(false),
  linkedAt: timestampSchema,
  updatedAt: timestampSchema,
  unlinkedAt: timestampSchema.optional(),
});

// ============================================================
// SOCIAL REQUEST SCHEMAS
// ============================================================

/**
 * Social login request schema
 */
export const authSocialLoginRequestSchema = z.object({
  provider: authSocialProviderSchema,
  code: z.string().optional(),
  state: z.string().optional(),
  redirectUri: urlSchema.optional(),
  createIfNotExists: z.boolean().default(true),
  forceLinking: z.boolean().default(false),
});

/**
 * Social callback request schema
 */
export const authSocialCallbackRequestSchema = z.object({
  provider: authSocialProviderSchema,
  code: z.string().min(1),
  state: z.string().optional(),
  error: z.string().optional(),
  error_description: z.string().optional(),
});

/**
 * Social link request schema
 */
export const authSocialLinkRequestSchema = z.object({
  userId: idSchema,
  provider: authSocialProviderSchema,
  code: z.string().min(1),
  state: z.string().optional(),
  setPrimary: z.boolean().default(false),
});

/**
 * Social unlink request schema
 */
export const authSocialUnlinkRequestSchema = z.object({
  userId: idSchema,
  provider: authSocialProviderSchema,
  reason: z.string().optional(),
});

// ============================================================
// SOCIAL RESPONSE SCHEMAS
// ============================================================

/**
 * Social login response schema
 */
export const authSocialLoginResponseSchema = z.object({
  success: z.boolean(),
  status: authSocialLoginStatusSchema,
  account: authSocialAccountSchema.optional(),
  userId: idSchema.optional(),
  isNewAccount: z.boolean().optional(),
  linkingRequired: z.boolean().optional(),
  error: z.string().optional(),
  requiredFields: z.array(z.string()).optional(),
  profile: authSocialProfileSchema.optional(),
  errorCode: z.string().optional(),
  successMessage: z.string().optional(),
});

/**
 * Social error response schema
 */
export const authSocialErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number().int().min(100).max(599),
  details: jsonObjectSchema.optional(),
});

// ============================================================
// SOCIAL FILTER SCHEMAS
// ============================================================

/**
 * Social filter schema
 */
export const authSocialFilterSchema = z.object({
  userId: idSchema.optional(),
  provider: z.union([authSocialProviderSchema, z.array(authSocialProviderSchema)]).optional(),
  providerUserId: z.string().optional(),
  isActive: z.boolean().optional(),
  isVerified: z.boolean().optional(),
});

// ============================================================
// SOCIAL SUMMARY SCHEMAS
// ============================================================

/**
 * Social summary schema
 */
export const authSocialSummarySchema = z.object({
  userId: idSchema,
  totalAccounts: z.number().int().min(0),
  activeAccounts: z.number().int().min(0),
  verifiedAccounts: z.number().int().min(0),
  providers: z.array(authSocialProviderSchema),
  primaryAccount: authSocialAccountSchema.optional(),
  accounts: z.array(authSocialAccountSchema),
  status: authSocialLoginStatusSchema,
});

// ============================================================
// SOCIAL PROVIDER INFO SCHEMA
// ============================================================

/**
 * Social provider info schema
 */
export const authSocialProviderInfoSchema = z.object({
  name: authSocialProviderSchema,
  displayName: z.string(),
  type: authSocialProviderTypeSchema,
  color: z.string(),
  icon: z.string(),
  isEnabled: z.boolean(),
  isConfigured: z.boolean(),
});

// ============================================================
// TYPE INFERENCES (Zod থেকে টাইপ বের করা)
// ============================================================

export type AuthSocialProfile = z.infer<typeof authSocialProfileSchema>;
export type AuthSocialAccount = z.infer<typeof authSocialAccountSchema>;
export type AuthSocialLoginRequest = z.infer<typeof authSocialLoginRequestSchema>;
export type AuthSocialCallbackRequest = z.infer<typeof authSocialCallbackRequestSchema>;
export type AuthSocialLinkRequest = z.infer<typeof authSocialLinkRequestSchema>;
export type AuthSocialUnlinkRequest = z.infer<typeof authSocialUnlinkRequestSchema>;
export type AuthSocialLoginResponse = z.infer<typeof authSocialLoginResponseSchema>;
export type AuthSocialErrorResponse = z.infer<typeof authSocialErrorResponseSchema>;
export type AuthSocialFilter = z.infer<typeof authSocialFilterSchema>;
export type AuthSocialSummary = z.infer<typeof authSocialSummarySchema>;
export type AuthSocialProviderInfo = z.infer<typeof authSocialProviderInfoSchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if social provider is valid
 */
export function isValidAuthSocialProvider(provider: string): provider is AuthSocialProvider {
  const validProviders: AuthSocialProvider[] = [
    'google',
    'facebook',
    'github',
    'twitter',
    'linkedin',
    'apple',
    'microsoft',
    'instagram',
    'tiktok',
    'snapchat',
    'wechat',
    'line',
    'telegram',
    'whatsapp',
    'vk',
    'yahoo',
    'discord',
    'slack',
    'spotify',
  ];
  return validProviders.includes(provider as AuthSocialProvider);
}

/**
 * Check if social login status is successful
 */
export function isAuthSocialLoginSuccessful(status: AuthSocialLoginStatus): boolean {
  return status === AUTH_SOCIAL_LOGIN_STATUS.SUCCESS;
}

/**
 * Check if social login requires action
 */
export function isAuthSocialLoginRequiringAction(status: AuthSocialLoginStatus): boolean {
  const actionRequiredStatuses: AuthSocialLoginStatus[] = [
    AUTH_SOCIAL_LOGIN_STATUS.REQUIRES_INFO,
    AUTH_SOCIAL_LOGIN_STATUS.REQUIRES_VERIFICATION,
    AUTH_SOCIAL_LOGIN_STATUS.REQUIRES_LINKING,
  ];
  return actionRequiredStatuses.includes(status);
}

/**
 * Get social provider display name
 */
export function getAuthSocialProviderDisplayName(provider: AuthSocialProvider): string {
  const labels: Record<AuthSocialProvider, string> = {
    google: 'Google',
    facebook: 'Facebook',
    github: 'GitHub',
    twitter: 'Twitter / X',
    linkedin: 'LinkedIn',
    apple: 'Apple',
    microsoft: 'Microsoft',
    instagram: 'Instagram',
    tiktok: 'TikTok',
    snapchat: 'Snapchat',
    wechat: 'WeChat',
    line: 'LINE',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    vk: 'VK',
    yahoo: 'Yahoo',
    discord: 'Discord',
    slack: 'Slack',
    spotify: 'Spotify',
  };
  return labels[provider] || 'Unknown Provider';
}

/**
 * Get social provider brand color
 */
export function getAuthSocialProviderColor(provider: AuthSocialProvider): string {
  const colors: Record<AuthSocialProvider, string> = {
    google: '#4285F4',
    facebook: '#1877F2',
    github: '#181717',
    twitter: '#000000',
    linkedin: '#0A66C2',
    apple: '#000000',
    microsoft: '#00A4EF',
    instagram: '#E4405F',
    tiktok: '#000000',
    snapchat: '#FFFC00',
    wechat: '#07C160',
    line: '#00C300',
    telegram: '#26A5E4',
    whatsapp: '#25D366',
    vk: '#0077FF',
    yahoo: '#6001D2',
    discord: '#5865F2',
    slack: '#4A154B',
    spotify: '#1ED760',
  };
  return colors[provider] || '#000000';
}

/**
 * Get social provider icon name
 */
export function getAuthSocialProviderIcon(provider: AuthSocialProvider): string {
  const icons: Record<AuthSocialProvider, string> = {
    google: 'google',
    facebook: 'facebook',
    github: 'github',
    twitter: 'twitter',
    linkedin: 'linkedin',
    apple: 'apple',
    microsoft: 'microsoft',
    instagram: 'instagram',
    tiktok: 'tiktok',
    snapchat: 'snapchat',
    wechat: 'wechat',
    line: 'line',
    telegram: 'telegram',
    whatsapp: 'whatsapp',
    vk: 'vk',
    yahoo: 'yahoo',
    discord: 'discord',
    slack: 'slack',
    spotify: 'spotify',
  };
  return icons[provider] || 'link';
}

/**
 * Get social provider type
 */
export function getAuthSocialProviderType(provider: AuthSocialProvider): AuthSocialProviderType {
  return AUTH_SOCIAL_PROVIDER_TYPE_MAP[provider] || AUTH_SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA;
}

/**
 * Get social provider configuration
 */
export function getAuthSocialProviderConfig(
  provider: AuthSocialProvider
): AuthSocialProviderConfig | null {
  const providerKey = provider.toUpperCase() as keyof typeof AUTH_SOCIAL_PROVIDER_CONFIG;
  return AUTH_SOCIAL_PROVIDER_CONFIG[providerKey] || null;
}

/**
 * Get all social provider names
 */
export function getAllAuthSocialProviders(): AuthSocialProvider[] {
  return [
    'google',
    'facebook',
    'github',
    'twitter',
    'linkedin',
    'apple',
    'microsoft',
    'instagram',
    'tiktok',
    'snapchat',
    'wechat',
    'line',
    'telegram',
    'whatsapp',
    'vk',
    'yahoo',
    'discord',
    'slack',
    'spotify',
  ];
}

/**
 * Get social login status message
 */
export function getAuthSocialLoginStatusMessage(status: AuthSocialLoginStatus): string {
  return AUTH_SOCIAL_LOGIN_STATUS_MESSAGES[status] || 'Unknown status';
}

/**
 * Create social provider info for UI
 */
export function createAuthSocialProviderInfo(
  provider: AuthSocialProvider,
  isEnabled: boolean = true,
  isConfigured: boolean = true
): AuthSocialProviderInfo {
  return {
    name: provider,
    displayName: getAuthSocialProviderDisplayName(provider),
    type: getAuthSocialProviderType(provider),
    color: getAuthSocialProviderColor(provider),
    icon: getAuthSocialProviderIcon(provider),
    isEnabled,
    isConfigured,
  };
}

/**
 * Check if social account is active
 */
export function isAuthSocialAccountActive(account: AuthSocialAccount): boolean {
  return account.isActive && account.isVerified;
}

/**
 * Check if social account token has expired
 */
export function isAuthSocialTokenExpired(account: AuthSocialAccount): boolean {
  if (!account.tokenExpiresAt) return false;
  return new Date() > account.tokenExpiresAt;
}

/**
 * Check if social account is linked to user
 */
export function isAuthSocialAccountLinked(account: AuthSocialAccount): boolean {
  return !!account.userId && account.isActive;
}

/**
 * Get social provider display name from string
 */
export function getAuthSocialProviderNameFromString(provider: string): string {
  if (isValidAuthSocialProvider(provider)) {
    return getAuthSocialProviderDisplayName(provider as AuthSocialProvider);
  }
  return 'Unknown Provider';
}

/**
 * Get social login error message
 */
export function getAuthSocialErrorMessage(errorCode: AuthSocialLoginError): string {
  return (
    AUTH_SOCIAL_LOGIN_ERRORS[errorCode as keyof typeof AUTH_SOCIAL_LOGIN_ERRORS] ||
    'Unknown social login error'
  );
}

/**
 * Get social login success message
 */
export function getAuthSocialSuccessMessage(successCode: AuthSocialLoginSuccess): string {
  return (
    AUTH_SOCIAL_LOGIN_SUCCESS[successCode as keyof typeof AUTH_SOCIAL_LOGIN_SUCCESS] || 'Success'
  );
}

/**
 * Check if social provider supports given feature
 */
export function doesAuthSocialProviderSupport(
  provider: AuthSocialProvider,
  feature: 'email' | 'profile' | 'phone'
): boolean {
  const config = getAuthSocialProviderConfig(provider);
  if (!config) return false;

  const scopes = config.scopes as readonly string[];

  switch (feature) {
    case 'email':
      return scopes.includes('email') || scopes.includes('user:email');
    case 'profile':
      return scopes.includes('profile') || scopes.includes('public_profile');
    case 'phone':
      return scopes.includes('phone');
    default:
      return false;
  }
}
