/**
 * Authentication Social Types
 * Types for social login, social media integration, and social authentication
 */

import type {
  AuthSocialLoginStatus,
  AuthSocialProviderConfig,
  AuthSocialLoginError,
  AuthSocialLoginSuccess,
  AuthSocialProviderType,
} from '@vubon/shared-constants';
import {
  AUTH_SOCIAL_LOGIN_STATUS,
  AUTH_SOCIAL_PROVIDER_CONFIG,
  AUTH_SOCIAL_LOGIN_ERRORS,
  AUTH_SOCIAL_LOGIN_SUCCESS,
  AUTH_SOCIAL_PROVIDER_TYPES,
  AUTH_SOCIAL_PROVIDER_TYPE_MAP,
  AUTH_SOCIAL_LOGIN_STATUS_MESSAGES,
} from '@vubon/shared-constants';
import type { ID, Timestamp, Email, Url } from '../common/core-primitives.types';

// ============================================================
// SOCIAL PROVIDER TYPES
// ============================================================

/**
 * Social provider name
 * Supported social providers
 */
export type AuthSocialProvider =
  | 'google'
  | 'facebook'
  | 'github'
  | 'twitter'
  | 'linkedin'
  | 'apple'
  | 'microsoft'
  | 'instagram'
  | 'tiktok'
  | 'snapchat'
  | 'wechat'
  | 'line'
  | 'telegram'
  | 'whatsapp'
  | 'vk'
  | 'yahoo'
  | 'discord'
  | 'slack'
  | 'spotify';

// ============================================================
// SOCIAL PROFILE
// ============================================================

/**
 * Social profile from provider
 */
export interface AuthSocialProfile {
  /** Provider name */
  provider: AuthSocialProvider;
  /** Provider-specific user ID */
  providerUserId: string;
  /** Email address */
  email?: Email;
  /** Whether email is verified */
  emailVerified?: boolean;
  /** Full name */
  name?: string;
  /** First name */
  firstName?: string;
  /** Last name */
  lastName?: string;
  /** Profile picture URL */
  picture?: Url;
  /** Profile URL */
  profileUrl?: Url;
  /** Location */
  location?: string;
  /** Bio/description */
  bio?: string;
  /** Phone number */
  phone?: string;
  /** Additional provider-specific data */
  rawData?: Record<string, unknown>;
  /** When the profile was fetched */
  fetchedAt: Timestamp;
}

// ============================================================
// SOCIAL ACCOUNT
// ============================================================

/**
 * Social account linked to a user
 */
export interface AuthSocialAccount {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Social provider */
  provider: AuthSocialProvider;
  /** Provider-specific user ID */
  providerUserId: string;
  /** Social profile data */
  profile: AuthSocialProfile;
  /** Access token (encrypted) */
  accessToken?: string;
  /** Refresh token (encrypted) */
  refreshToken?: string;
  /** Token expiry */
  tokenExpiresAt?: Timestamp;
  /** Whether the account is active */
  isActive: boolean;
  /** Whether the account is verified */
  isVerified: boolean;
  /** When the account was linked */
  linkedAt: Timestamp;
  /** When the account was updated */
  updatedAt: Timestamp;
  /** When the account was unlinked (if applicable) */
  unlinkedAt?: Timestamp;
}

// ============================================================
// SOCIAL LOGIN REQUEST
// ============================================================

/**
 * Social login request
 */
export interface AuthSocialLoginRequest {
  /** Social provider */
  provider: AuthSocialProvider;
  /** Authorization code from provider */
  code?: string;
  /** OAuth state parameter (for CSRF) */
  state?: string;
  /** Redirect URI */
  redirectUri?: Url;
  /** Whether to create account if not exists */
  createIfNotExists?: boolean;
  /** Whether to force account linking */
  forceLinking?: boolean;
}

/**
 * Social login callback request
 */
export interface AuthSocialCallbackRequest {
  /** Social provider */
  provider: AuthSocialProvider;
  /** Authorization code */
  code: string;
  /** OAuth state parameter */
  state?: string;
  /** Error from provider */
  error?: string;
  /** Error description from provider */
  error_description?: string;
}

// ============================================================
// SOCIAL LOGIN RESPONSE
// ============================================================

/**
 * Social login response
 */
export interface AuthSocialLoginResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Login status */
  status: AuthSocialLoginStatus;
  /** Social account if successful */
  account?: AuthSocialAccount;
  /** User ID if authenticated */
  userId?: ID;
  /** Whether new account was created */
  isNewAccount?: boolean;
  /** Whether account linking is required */
  linkingRequired?: boolean;
  /** Error message if failed */
  error?: string;
  /** Required additional info (if status is REQUIRES_INFO) */
  requiredFields?: string[];
  /** Social profile (if available) */
  profile?: AuthSocialProfile;
  /** Error code (if status is FAILED) */
  errorCode?: AuthSocialLoginError;
  /** Success message (if status is SUCCESS) */
  successMessage?: AuthSocialLoginSuccess;
}

// ============================================================
// SOCIAL LINK REQUEST
// ============================================================

/**
 * Request to link social account
 */
export interface AuthSocialLinkRequest {
  /** User ID */
  userId: ID;
  /** Social provider */
  provider: AuthSocialProvider;
  /** Authorization code */
  code: string;
  /** OAuth state parameter */
  state?: string;
  /** Whether to set as primary */
  setPrimary?: boolean;
}

/**
 * Request to unlink social account
 */
export interface AuthSocialUnlinkRequest {
  /** User ID */
  userId: ID;
  /** Social provider */
  provider: AuthSocialProvider;
  /** Reason for unlinking */
  reason?: string;
}

// ============================================================
// SOCIAL FILTER
// ============================================================

/**
 * Filter for querying social accounts
 */
export interface AuthSocialFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by provider */
  provider?: AuthSocialProvider | AuthSocialProvider[];
  /** Filter by provider user ID */
  providerUserId?: string;
  /** Filter by active status */
  isActive?: boolean;
  /** Filter by verification status */
  isVerified?: boolean;
}

// ============================================================
// SOCIAL SUMMARY
// ============================================================

/**
 * Social accounts summary for a user
 */
export interface AuthSocialSummary {
  /** User ID */
  userId: ID;
  /** Total linked accounts */
  totalAccounts: number;
  /** Active accounts */
  activeAccounts: number;
  /** Verified accounts */
  verifiedAccounts: number;
  /** Linked providers */
  providers: AuthSocialProvider[];
  /** Primary social account */
  primaryAccount?: AuthSocialAccount;
  /** All social accounts */
  accounts: AuthSocialAccount[];
  /** Social login status */
  status: AuthSocialLoginStatus;
}

// ============================================================
// SOCIAL PROVIDER INFO
// ============================================================

/**
 * Social provider information for UI
 */
export interface AuthSocialProviderInfo {
  /** Provider name */
  name: AuthSocialProvider;
  /** Display name */
  displayName: string;
  /** Provider type */
  type: AuthSocialProviderType;
  /** Brand color */
  color: string;
  /** Icon name */
  icon: string;
  /** Whether provider is enabled */
  isEnabled: boolean;
  /** Whether provider is configured */
  isConfigured: boolean;
}

// ============================================================
// SOCIAL ERROR RESPONSE
// ============================================================

/**
 * Social login error response
 */
export interface AuthSocialErrorResponse {
  /** Error code */
  error: AuthSocialLoginError;
  /** Human-readable error message */
  message: string;
  /** HTTP status code */
  statusCode: number;
  /** Additional details */
  details?: Record<string, unknown>;
}

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
    return getAuthSocialProviderDisplayName(provider);
  }
  return 'Unknown Provider';
}

/**
 * Get social login error message
 */
export function getAuthSocialErrorMessage(errorCode: AuthSocialLoginError): string {
  // Access error message from constants using the enum value
  const errorMessages = AUTH_SOCIAL_LOGIN_ERRORS;
  return errorMessages[errorCode as keyof typeof errorMessages] || 'Unknown social login error';
}

/**
 * Get social login success message
 */
export function getAuthSocialSuccessMessage(successCode: AuthSocialLoginSuccess): string {
  // Access success message from constants using the enum value
  const successMessages = AUTH_SOCIAL_LOGIN_SUCCESS;
  return successMessages[successCode as keyof typeof successMessages] || 'Success';
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

  // Type-safe way to check if a feature is supported
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
