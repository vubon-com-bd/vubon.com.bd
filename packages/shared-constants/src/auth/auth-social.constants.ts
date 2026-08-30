/**
 * Authentication Social Constants
 * Social login, social media integration, and social authentication constants
 *
 * Note: Base SOCIAL_PROVIDERS and related types are exported from auth-provider.constants
 */

import { HTTP_STATUS } from '../common/http-status.constants';

/**
 * Social Login Status
 * Status of social login attempts
 */
export const SOCIAL_LOGIN_STATUS = {
  /** Social login successful */
  SUCCESS: 'success',
  /** Social login failed */
  FAILED: 'failed',
  /** Social login requires additional information */
  REQUIRES_INFO: 'requires_info',
  /** Social login requires email verification */
  REQUIRES_VERIFICATION: 'requires_verification',
  /** Social login cancelled by user */
  CANCELLED: 'cancelled',
  /** Social login timed out */
  TIMEOUT: 'timeout',
  /** Social login requires account linking */
  REQUIRES_LINKING: 'requires_linking',
  /** Social login is blocked */
  BLOCKED: 'blocked',
} as const;

export type SocialLoginStatus = (typeof SOCIAL_LOGIN_STATUS)[keyof typeof SOCIAL_LOGIN_STATUS];

/**
 * Social Login Status HTTP Mapping
 * Maps social login status to HTTP status codes
 */
export const SOCIAL_LOGIN_STATUS_HTTP_MAP: Record<SocialLoginStatus, number> = {
  [SOCIAL_LOGIN_STATUS.SUCCESS]: HTTP_STATUS.OK,
  [SOCIAL_LOGIN_STATUS.FAILED]: HTTP_STATUS.UNAUTHORIZED,
  [SOCIAL_LOGIN_STATUS.REQUIRES_INFO]: HTTP_STATUS.BAD_REQUEST,
  [SOCIAL_LOGIN_STATUS.REQUIRES_VERIFICATION]: HTTP_STATUS.FORBIDDEN,
  [SOCIAL_LOGIN_STATUS.CANCELLED]: HTTP_STATUS.BAD_REQUEST,
  [SOCIAL_LOGIN_STATUS.TIMEOUT]: HTTP_STATUS.REQUEST_TIMEOUT,
  [SOCIAL_LOGIN_STATUS.REQUIRES_LINKING]: HTTP_STATUS.CONFLICT,
  [SOCIAL_LOGIN_STATUS.BLOCKED]: HTTP_STATUS.FORBIDDEN,
} as const;

/**
 * Social Provider Config
 * Configuration for each social provider
 */
export const SOCIAL_PROVIDER_CONFIG = {
  /** Google OAuth configuration */
  GOOGLE: {
    clientId: '',
    clientSecret: '',
    redirectUri: '/api/auth/social/google/callback',
    scopes: ['email', 'profile'],
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
  },
  /** Facebook OAuth configuration */
  FACEBOOK: {
    clientId: '',
    clientSecret: '',
    redirectUri: '/api/auth/social/facebook/callback',
    scopes: ['email', 'public_profile'],
    authorizationUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
    userInfoUrl: 'https://graph.facebook.com/me',
  },
  /** GitHub OAuth configuration */
  GITHUB: {
    clientId: '',
    clientSecret: '',
    redirectUri: '/api/auth/social/github/callback',
    scopes: ['user:email', 'read:user'],
    authorizationUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    userInfoUrl: 'https://api.github.com/user',
  },
  /** Twitter/X OAuth configuration */
  TWITTER: {
    clientId: '',
    clientSecret: '',
    redirectUri: '/api/auth/social/twitter/callback',
    scopes: ['tweet.read', 'users.read', 'offline.access'],
    authorizationUrl: 'https://twitter.com/i/oauth2/authorize',
    tokenUrl: 'https://api.twitter.com/2/oauth2/token',
    userInfoUrl: 'https://api.twitter.com/2/users/me',
  },
  /** LinkedIn OAuth configuration */
  LINKEDIN: {
    clientId: '',
    clientSecret: '',
    redirectUri: '/api/auth/social/linkedin/callback',
    scopes: ['openid', 'profile', 'email'],
    authorizationUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    userInfoUrl: 'https://api.linkedin.com/v2/userinfo',
  },
  /** Apple OAuth configuration */
  APPLE: {
    clientId: '',
    clientSecret: '',
    redirectUri: '/api/auth/social/apple/callback',
    scopes: ['name', 'email'],
    authorizationUrl: 'https://appleid.apple.com/auth/authorize',
    tokenUrl: 'https://appleid.apple.com/auth/token',
    userInfoUrl: 'https://appleid.apple.com/auth/keys',
  },
  /** Microsoft OAuth configuration */
  MICROSOFT: {
    clientId: '',
    clientSecret: '',
    redirectUri: '/api/auth/social/microsoft/callback',
    scopes: ['openid', 'profile', 'email'],
    authorizationUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    userInfoUrl: 'https://graph.microsoft.com/v1.0/me',
  },
} as const;

export type SocialProviderConfig =
  (typeof SOCIAL_PROVIDER_CONFIG)[keyof typeof SOCIAL_PROVIDER_CONFIG];

/**
 * Social Login Error Messages
 * Error messages for social login failures
 */
export const SOCIAL_LOGIN_ERRORS = {
  /** Social login failed */
  LOGIN_FAILED: 'Social login failed',
  /** Provider not configured */
  PROVIDER_NOT_CONFIGURED: 'Social provider is not configured',
  /** Invalid provider */
  INVALID_PROVIDER: 'Invalid social provider',
  /** User cancelled login */
  USER_CANCELLED: 'User cancelled the social login',
  /** Access denied */
  ACCESS_DENIED: 'Access denied by the social provider',
  /** Email already exists */
  EMAIL_ALREADY_EXISTS: 'Email is already registered with another provider',
  /** Account needs linking */
  ACCOUNT_NEEDS_LINKING: 'Account needs to be linked with existing account',
  /** Provider error */
  PROVIDER_ERROR: 'Social provider returned an error',
  /** Invalid state */
  INVALID_STATE: 'Invalid OAuth state parameter',
  /** Code exchange failed */
  CODE_EXCHANGE_FAILED: 'Failed to exchange authorization code',
  /** User info fetch failed */
  USER_INFO_FETCH_FAILED: 'Failed to fetch user information',
  /** Token invalid */
  TOKEN_INVALID: 'Social access token is invalid',
  /** Token expired */
  TOKEN_EXPIRED: 'Social access token has expired',
  /** Rate limit exceeded */
  RATE_LIMIT_EXCEEDED: 'Social provider rate limit exceeded',
  /** Account linking failed */
  LINKING_FAILED: 'Failed to link social account',
  /** Account unlinking failed */
  UNLINKING_FAILED: 'Failed to unlink social account',
} as const;

export type SocialLoginError = (typeof SOCIAL_LOGIN_ERRORS)[keyof typeof SOCIAL_LOGIN_ERRORS];

/**
 * Social Login Success Messages
 * Success messages for social login operations
 */
export const SOCIAL_LOGIN_SUCCESS = {
  SUCCESS: 'Social login successful',
  LINKED: 'Social account linked successfully',
  UNLINKED: 'Social account unlinked successfully',
  ACCOUNT_CREATED: 'New account created with social login',
} as const;

export type SocialLoginSuccess = (typeof SOCIAL_LOGIN_SUCCESS)[keyof typeof SOCIAL_LOGIN_SUCCESS];

/**
 * Social Login Status Messages
 * Human-readable messages for each social login status
 */
export const SOCIAL_LOGIN_STATUS_MESSAGES: Record<SocialLoginStatus, string> = {
  [SOCIAL_LOGIN_STATUS.SUCCESS]: 'Social login was successful',
  [SOCIAL_LOGIN_STATUS.FAILED]: 'Social login failed',
  [SOCIAL_LOGIN_STATUS.REQUIRES_INFO]: 'Additional information required to complete login',
  [SOCIAL_LOGIN_STATUS.REQUIRES_VERIFICATION]: 'Email verification required',
  [SOCIAL_LOGIN_STATUS.CANCELLED]: 'Social login was cancelled',
  [SOCIAL_LOGIN_STATUS.TIMEOUT]: 'Social login timed out',
  [SOCIAL_LOGIN_STATUS.REQUIRES_LINKING]: 'Account linking required',
  [SOCIAL_LOGIN_STATUS.BLOCKED]: 'Social login is blocked',
} as const;

/**
 * Social Provider Types
 * Categories of social providers (re-exported from auth-provider.constants)
 */
export const SOCIAL_PROVIDER_TYPES = {
  /** Social media platforms */
  SOCIAL_MEDIA: 'social_media',
  /** Professional networks */
  PROFESSIONAL: 'professional',
  /** Developer platforms */
  DEVELOPER: 'developer',
  /** Messaging platforms */
  MESSAGING: 'messaging',
  /** Entertainment platforms */
  ENTERTAINMENT: 'entertainment',
} as const;

export type SocialProviderType = (typeof SOCIAL_PROVIDER_TYPES)[keyof typeof SOCIAL_PROVIDER_TYPES];

/**
 * Social Provider Type Map
 * Maps each social provider to its type
 */
export const SOCIAL_PROVIDER_TYPE_MAP: Record<string, SocialProviderType> = {
  google: SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  facebook: SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  github: SOCIAL_PROVIDER_TYPES.DEVELOPER,
  twitter: SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  linkedin: SOCIAL_PROVIDER_TYPES.PROFESSIONAL,
  apple: SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  microsoft: SOCIAL_PROVIDER_TYPES.PROFESSIONAL,
  instagram: SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  tiktok: SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  snapchat: SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  wechat: SOCIAL_PROVIDER_TYPES.MESSAGING,
  line: SOCIAL_PROVIDER_TYPES.MESSAGING,
  telegram: SOCIAL_PROVIDER_TYPES.MESSAGING,
  whatsapp: SOCIAL_PROVIDER_TYPES.MESSAGING,
  vk: SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  yahoo: SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  discord: SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  slack: SOCIAL_PROVIDER_TYPES.PROFESSIONAL,
  spotify: SOCIAL_PROVIDER_TYPES.ENTERTAINMENT,
} as const;

/**
 * Helper function to check if social provider is valid
 * Uses the provider list from auth-provider.constants
 */
export function isValidSocialProvider(provider: string): boolean {
  // This checks against the providers defined in auth.constants
  const validProviders = [
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
  return validProviders.includes(provider);
}

/**
 * Helper function to get social provider label
 */
export function getSocialProviderLabel(provider: string): string {
  const labels: Record<string, string> = {
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
 * Helper function to get social provider color
 */
export function getSocialProviderColor(provider: string): string {
  const colors: Record<string, string> = {
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
 * Helper function to get social provider icon
 */
export function getSocialProviderIcon(provider: string): string {
  const icons: Record<string, string> = {
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
 * Helper function to get social provider config
 */
export function getSocialProviderConfig(provider: string): SocialProviderConfig | null {
  const providerKey = provider.toUpperCase() as keyof typeof SOCIAL_PROVIDER_CONFIG;
  const config = SOCIAL_PROVIDER_CONFIG[providerKey];
  return config || null;
}

/**
 * Helper function to get social provider type
 */
export function getSocialProviderType(provider: string): SocialProviderType {
  return SOCIAL_PROVIDER_TYPE_MAP[provider] || SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA;
}

/**
 * Helper function to check if social login status is valid
 */
export function isValidSocialLoginStatus(status: string): status is SocialLoginStatus {
  return Object.values(SOCIAL_LOGIN_STATUS).includes(status as SocialLoginStatus);
}

/**
 * Helper function to check if social login was successful
 */
export function isSocialLoginSuccessful(status: SocialLoginStatus): boolean {
  return status === SOCIAL_LOGIN_STATUS.SUCCESS;
}

/**
 * Helper function to check if social login requires action
 * Only includes statuses that require user action
 */
export function isSocialLoginRequiringAction(status: SocialLoginStatus): boolean {
  const actionRequiredStatuses: SocialLoginStatus[] = [
    SOCIAL_LOGIN_STATUS.REQUIRES_INFO,
    SOCIAL_LOGIN_STATUS.REQUIRES_VERIFICATION,
    SOCIAL_LOGIN_STATUS.REQUIRES_LINKING,
  ];
  return actionRequiredStatuses.includes(status);
}

/**
 * Helper function to get social login status message
 */
export function getSocialLoginStatusMessage(status: SocialLoginStatus): string {
  return SOCIAL_LOGIN_STATUS_MESSAGES[status] || 'Unknown status';
}

/**
 * Helper function to get HTTP status for social login status
 */
export function getHttpStatusForSocialLoginStatus(status: SocialLoginStatus): number {
  return SOCIAL_LOGIN_STATUS_HTTP_MAP[status] || HTTP_STATUS.INTERNAL_SERVER_ERROR;
}

/**
 * Helper function to get all social provider names
 */
export function getAllSocialProviderNames(): string[] {
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
