/**
 * Authentication Social Constants
 * Social login, social media integration, and social authentication constants
 */

import { HTTP_STATUS } from '../common/http-status.constants';

// ============================================================
// AUTH SOCIAL LOGIN STATUS
// ============================================================
export const AUTH_SOCIAL_LOGIN_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  REQUIRES_INFO: 'requires_info',
  REQUIRES_VERIFICATION: 'requires_verification',
  CANCELLED: 'cancelled',
  TIMEOUT: 'timeout',
  REQUIRES_LINKING: 'requires_linking',
  BLOCKED: 'blocked',
} as const;

export type AuthSocialLoginStatus =
  (typeof AUTH_SOCIAL_LOGIN_STATUS)[keyof typeof AUTH_SOCIAL_LOGIN_STATUS];

// ============================================================
// AUTH SOCIAL LOGIN STATUS HTTP MAP
// ============================================================
export const AUTH_SOCIAL_LOGIN_STATUS_HTTP_MAP: Record<AuthSocialLoginStatus, number> = {
  [AUTH_SOCIAL_LOGIN_STATUS.SUCCESS]: HTTP_STATUS.OK,
  [AUTH_SOCIAL_LOGIN_STATUS.FAILED]: HTTP_STATUS.UNAUTHORIZED,
  [AUTH_SOCIAL_LOGIN_STATUS.REQUIRES_INFO]: HTTP_STATUS.BAD_REQUEST,
  [AUTH_SOCIAL_LOGIN_STATUS.REQUIRES_VERIFICATION]: HTTP_STATUS.FORBIDDEN,
  [AUTH_SOCIAL_LOGIN_STATUS.CANCELLED]: HTTP_STATUS.BAD_REQUEST,
  [AUTH_SOCIAL_LOGIN_STATUS.TIMEOUT]: HTTP_STATUS.REQUEST_TIMEOUT,
  [AUTH_SOCIAL_LOGIN_STATUS.REQUIRES_LINKING]: HTTP_STATUS.CONFLICT,
  [AUTH_SOCIAL_LOGIN_STATUS.BLOCKED]: HTTP_STATUS.FORBIDDEN,
} as const;

// ============================================================
// AUTH SOCIAL PROVIDER CONFIG
// ============================================================
export const AUTH_SOCIAL_PROVIDER_CONFIG = {
  GOOGLE: {
    clientId: '',
    clientSecret: '',
    redirectUri: '/api/auth/social/google/callback',
    scopes: ['email', 'profile'],
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
  },
  FACEBOOK: {
    clientId: '',
    clientSecret: '',
    redirectUri: '/api/auth/social/facebook/callback',
    scopes: ['email', 'public_profile'],
    authorizationUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
    userInfoUrl: 'https://graph.facebook.com/me',
  },
  GITHUB: {
    clientId: '',
    clientSecret: '',
    redirectUri: '/api/auth/social/github/callback',
    scopes: ['user:email', 'read:user'],
    authorizationUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    userInfoUrl: 'https://api.github.com/user',
  },
  TWITTER: {
    clientId: '',
    clientSecret: '',
    redirectUri: '/api/auth/social/twitter/callback',
    scopes: ['tweet.read', 'users.read', 'offline.access'],
    authorizationUrl: 'https://twitter.com/i/oauth2/authorize',
    tokenUrl: 'https://api.twitter.com/2/oauth2/token',
    userInfoUrl: 'https://api.twitter.com/2/users/me',
  },
  LINKEDIN: {
    clientId: '',
    clientSecret: '',
    redirectUri: '/api/auth/social/linkedin/callback',
    scopes: ['openid', 'profile', 'email'],
    authorizationUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    userInfoUrl: 'https://api.linkedin.com/v2/userinfo',
  },
  APPLE: {
    clientId: '',
    clientSecret: '',
    redirectUri: '/api/auth/social/apple/callback',
    scopes: ['name', 'email'],
    authorizationUrl: 'https://appleid.apple.com/auth/authorize',
    tokenUrl: 'https://appleid.apple.com/auth/token',
    userInfoUrl: 'https://appleid.apple.com/auth/keys',
  },
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

export type AuthSocialProviderConfig =
  (typeof AUTH_SOCIAL_PROVIDER_CONFIG)[keyof typeof AUTH_SOCIAL_PROVIDER_CONFIG];

// ============================================================
// AUTH SOCIAL LOGIN ERRORS
// ============================================================
export const AUTH_SOCIAL_LOGIN_ERRORS = {
  LOGIN_FAILED: 'Social login failed',
  PROVIDER_NOT_CONFIGURED: 'Social provider is not configured',
  INVALID_PROVIDER: 'Invalid social provider',
  USER_CANCELLED: 'User cancelled the social login',
  ACCESS_DENIED: 'Access denied by the social provider',
  EMAIL_ALREADY_EXISTS: 'Email is already registered with another provider',
  ACCOUNT_NEEDS_LINKING: 'Account needs to be linked with existing account',
  PROVIDER_ERROR: 'Social provider returned an error',
  INVALID_STATE: 'Invalid OAuth state parameter',
  CODE_EXCHANGE_FAILED: 'Failed to exchange authorization code',
  USER_INFO_FETCH_FAILED: 'Failed to fetch user information',
  TOKEN_INVALID: 'Social access token is invalid',
  TOKEN_EXPIRED: 'Social access token has expired',
  RATE_LIMIT_EXCEEDED: 'Social provider rate limit exceeded',
  LINKING_FAILED: 'Failed to link social account',
  UNLINKING_FAILED: 'Failed to unlink social account',
} as const;

export type AuthSocialLoginError =
  (typeof AUTH_SOCIAL_LOGIN_ERRORS)[keyof typeof AUTH_SOCIAL_LOGIN_ERRORS];

// ============================================================
// AUTH SOCIAL LOGIN SUCCESS
// ============================================================
export const AUTH_SOCIAL_LOGIN_SUCCESS = {
  SUCCESS: 'Social login successful',
  LINKED: 'Social account linked successfully',
  UNLINKED: 'Social account unlinked successfully',
  ACCOUNT_CREATED: 'New account created with social login',
} as const;

export type AuthSocialLoginSuccess =
  (typeof AUTH_SOCIAL_LOGIN_SUCCESS)[keyof typeof AUTH_SOCIAL_LOGIN_SUCCESS];

// ============================================================
// AUTH SOCIAL LOGIN STATUS MESSAGES
// ============================================================
export const AUTH_SOCIAL_LOGIN_STATUS_MESSAGES: Record<AuthSocialLoginStatus, string> = {
  [AUTH_SOCIAL_LOGIN_STATUS.SUCCESS]: 'Social login was successful',
  [AUTH_SOCIAL_LOGIN_STATUS.FAILED]: 'Social login failed',
  [AUTH_SOCIAL_LOGIN_STATUS.REQUIRES_INFO]: 'Additional information required to complete login',
  [AUTH_SOCIAL_LOGIN_STATUS.REQUIRES_VERIFICATION]: 'Email verification required',
  [AUTH_SOCIAL_LOGIN_STATUS.CANCELLED]: 'Social login was cancelled',
  [AUTH_SOCIAL_LOGIN_STATUS.TIMEOUT]: 'Social login timed out',
  [AUTH_SOCIAL_LOGIN_STATUS.REQUIRES_LINKING]: 'Account linking required',
  [AUTH_SOCIAL_LOGIN_STATUS.BLOCKED]: 'Social login is blocked',
} as const;

// ============================================================
// AUTH SOCIAL PROVIDER TYPES
// ============================================================
export const AUTH_SOCIAL_PROVIDER_TYPES = {
  SOCIAL_MEDIA: 'social_media',
  PROFESSIONAL: 'professional',
  DEVELOPER: 'developer',
  MESSAGING: 'messaging',
  ENTERTAINMENT: 'entertainment',
} as const;

export type AuthSocialProviderType =
  (typeof AUTH_SOCIAL_PROVIDER_TYPES)[keyof typeof AUTH_SOCIAL_PROVIDER_TYPES];

// ============================================================
// AUTH SOCIAL PROVIDER TYPE MAP
// ============================================================
export const AUTH_SOCIAL_PROVIDER_TYPE_MAP: Record<string, AuthSocialProviderType> = {
  google: AUTH_SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  facebook: AUTH_SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  github: AUTH_SOCIAL_PROVIDER_TYPES.DEVELOPER,
  twitter: AUTH_SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  linkedin: AUTH_SOCIAL_PROVIDER_TYPES.PROFESSIONAL,
  apple: AUTH_SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  microsoft: AUTH_SOCIAL_PROVIDER_TYPES.PROFESSIONAL,
  instagram: AUTH_SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  tiktok: AUTH_SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  snapchat: AUTH_SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  wechat: AUTH_SOCIAL_PROVIDER_TYPES.MESSAGING,
  line: AUTH_SOCIAL_PROVIDER_TYPES.MESSAGING,
  telegram: AUTH_SOCIAL_PROVIDER_TYPES.MESSAGING,
  whatsapp: AUTH_SOCIAL_PROVIDER_TYPES.MESSAGING,
  vk: AUTH_SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  yahoo: AUTH_SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  discord: AUTH_SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA,
  slack: AUTH_SOCIAL_PROVIDER_TYPES.PROFESSIONAL,
  spotify: AUTH_SOCIAL_PROVIDER_TYPES.ENTERTAINMENT,
} as const;

// ============================================================
// AUTH SOCIAL MAIN OBJECT
// ============================================================
export const authSocial = {
  LOGIN_STATUS: AUTH_SOCIAL_LOGIN_STATUS,
  STATUS_HTTP_MAP: AUTH_SOCIAL_LOGIN_STATUS_HTTP_MAP,
  PROVIDER_CONFIG: AUTH_SOCIAL_PROVIDER_CONFIG,
  ERRORS: AUTH_SOCIAL_LOGIN_ERRORS,
  SUCCESS: AUTH_SOCIAL_LOGIN_SUCCESS,
  STATUS_MESSAGES: AUTH_SOCIAL_LOGIN_STATUS_MESSAGES,
  PROVIDER_TYPES: AUTH_SOCIAL_PROVIDER_TYPES,
  PROVIDER_TYPE_MAP: AUTH_SOCIAL_PROVIDER_TYPE_MAP,
} as const;

export type AuthSocial = typeof authSocial;

// ============================================================
// HELPER FUNCTIONS
// ============================================================
export function isValidAuthSocialProvider(provider: string): boolean {
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

export function getAuthSocialProviderLabel(provider: string): string {
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

export function getAuthSocialProviderColor(provider: string): string {
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

export function getAuthSocialProviderIcon(provider: string): string {
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

export function getAuthSocialProviderConfig(provider: string): AuthSocialProviderConfig | null {
  const providerKey = provider.toUpperCase() as keyof typeof AUTH_SOCIAL_PROVIDER_CONFIG;
  const config = AUTH_SOCIAL_PROVIDER_CONFIG[providerKey];
  return config || null;
}

export function getAuthSocialProviderType(provider: string): AuthSocialProviderType {
  return AUTH_SOCIAL_PROVIDER_TYPE_MAP[provider] || AUTH_SOCIAL_PROVIDER_TYPES.SOCIAL_MEDIA;
}

export function isValidAuthSocialLoginStatus(status: string): status is AuthSocialLoginStatus {
  return Object.values(AUTH_SOCIAL_LOGIN_STATUS).includes(status as AuthSocialLoginStatus);
}

export function isAuthSocialLoginSuccessful(status: AuthSocialLoginStatus): boolean {
  return status === AUTH_SOCIAL_LOGIN_STATUS.SUCCESS;
}

export function isAuthSocialLoginRequiringAction(status: AuthSocialLoginStatus): boolean {
  const actionRequiredStatuses: AuthSocialLoginStatus[] = [
    AUTH_SOCIAL_LOGIN_STATUS.REQUIRES_INFO,
    AUTH_SOCIAL_LOGIN_STATUS.REQUIRES_VERIFICATION,
    AUTH_SOCIAL_LOGIN_STATUS.REQUIRES_LINKING,
  ];
  return actionRequiredStatuses.includes(status);
}

export function getAuthSocialLoginStatusMessage(status: AuthSocialLoginStatus): string {
  return AUTH_SOCIAL_LOGIN_STATUS_MESSAGES[status] || 'Unknown status';
}

export function getHttpStatusForAuthSocialLoginStatus(status: AuthSocialLoginStatus): number {
  return AUTH_SOCIAL_LOGIN_STATUS_HTTP_MAP[status] || HTTP_STATUS.INTERNAL_SERVER_ERROR;
}

export function getAllAuthSocialProviderNames(): string[] {
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
