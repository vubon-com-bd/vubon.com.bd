/**
 * Social login constants for the monorepo
 * All social authentication-related constants are centralized here
 */

/**
 * Social providers supported by the application
 */
export const SOCIAL_PROVIDERS = {
  /**
   * Google OAuth provider
   */
  GOOGLE: 'google',

  /**
   * Facebook OAuth provider
   */
  FACEBOOK: 'facebook',

  /**
   * GitHub OAuth provider
   */
  GITHUB: 'github',

  /**
   * Apple OAuth provider
   */
  APPLE: 'apple',

  /**
   * LinkedIn OAuth provider
   */
  LINKEDIN: 'linkedin',

  /**
   * Twitter/X OAuth provider
   */
  TWITTER: 'twitter',

  /**
   * Microsoft OAuth provider
   */
  MICROSOFT: 'microsoft',

  /**
   * Discord OAuth provider
   */
  DISCORD: 'discord',

  /**
   * Slack OAuth provider
   */
  SLACK: 'slack',

  /**
   * GitLab OAuth provider
   */
  GITLAB: 'gitlab',

  /**
   * Amazon OAuth provider
   */
  AMAZON: 'amazon',

  /**
   * Spotify OAuth provider
   */
  SPOTIFY: 'spotify',

  /**
   * Instagram OAuth provider
   */
  INSTAGRAM: 'instagram',

  /**
   * TikTok OAuth provider
   */
  TIKTOK: 'tiktok',

  /**
   * Snapchat OAuth provider
   */
  SNAPCHAT: 'snapchat',

  /**
   * WeChat OAuth provider
   */
  WECHAT: 'wechat',

  /**
   * Line OAuth provider
   */
  LINE: 'line',
} as const;

export type SocialProvider = (typeof SOCIAL_PROVIDERS)[keyof typeof SOCIAL_PROVIDERS];

/**
 * Social provider display names
 */
export const SOCIAL_PROVIDER_NAMES = {
  google: 'Google',
  facebook: 'Facebook',
  github: 'GitHub',
  apple: 'Apple',
  linkedin: 'LinkedIn',
  twitter: 'Twitter/X',
  microsoft: 'Microsoft',
  discord: 'Discord',
  slack: 'Slack',
  gitlab: 'GitLab',
  amazon: 'Amazon',
  spotify: 'Spotify',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  snapchat: 'Snapchat',
  wechat: 'WeChat',
  line: 'Line',
} as const;

export type SocialProviderName = (typeof SOCIAL_PROVIDER_NAMES)[keyof typeof SOCIAL_PROVIDER_NAMES];

/**
 * Social provider callback URLs
 * These are the endpoints where OAuth providers redirect after authentication
 */
export const SOCIAL_CALLBACK_URLS = {
  google: '/api/auth/callback/google',
  facebook: '/api/auth/callback/facebook',
  github: '/api/auth/callback/github',
  apple: '/api/auth/callback/apple',
  linkedin: '/api/auth/callback/linkedin',
  twitter: '/api/auth/callback/twitter',
  microsoft: '/api/auth/callback/microsoft',
  discord: '/api/auth/callback/discord',
  slack: '/api/auth/callback/slack',
  gitlab: '/api/auth/callback/gitlab',
  amazon: '/api/auth/callback/amazon',
  spotify: '/api/auth/callback/spotify',
  instagram: '/api/auth/callback/instagram',
  tiktok: '/api/auth/callback/tiktok',
  snapchat: '/api/auth/callback/snapchat',
  wechat: '/api/auth/callback/wechat',
  line: '/api/auth/callback/line',
} as const;

export type SocialCallbackUrl = (typeof SOCIAL_CALLBACK_URLS)[keyof typeof SOCIAL_CALLBACK_URLS];

/**
 * Social provider authorization URLs
 */
export const SOCIAL_AUTH_URLS = {
  google: 'https://accounts.google.com/o/oauth2/v2/auth',
  facebook: 'https://www.facebook.com/v18.0/dialog/oauth',
  github: 'https://github.com/login/oauth/authorize',
  apple: 'https://appleid.apple.com/auth/authorize',
  linkedin: 'https://www.linkedin.com/oauth/v2/authorization',
  twitter: 'https://twitter.com/i/oauth2/authorize',
  microsoft: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
  discord: 'https://discord.com/api/oauth2/authorize',
  slack: 'https://slack.com/oauth/v2/authorize',
  gitlab: 'https://gitlab.com/oauth/authorize',
  amazon: 'https://www.amazon.com/ap/oa',
  spotify: 'https://accounts.spotify.com/authorize',
  instagram: 'https://api.instagram.com/oauth/authorize',
  tiktok: 'https://www.tiktok.com/auth/authorize',
  snapchat: 'https://accounts.snapchat.com/accounts/oauth2/auth',
  wechat: 'https://open.weixin.qq.com/connect/qrconnect',
  line: 'https://access.line.me/oauth2/v2.1/authorize',
} as const;

export type SocialAuthUrl = (typeof SOCIAL_AUTH_URLS)[keyof typeof SOCIAL_AUTH_URLS];

/**
 * Social provider token URLs
 */
export const SOCIAL_TOKEN_URLS = {
  google: 'https://oauth2.googleapis.com/token',
  facebook: 'https://graph.facebook.com/v18.0/oauth/access_token',
  github: 'https://github.com/login/oauth/access_token',
  apple: 'https://appleid.apple.com/auth/token',
  linkedin: 'https://www.linkedin.com/oauth/v2/accessToken',
  twitter: 'https://api.twitter.com/2/oauth2/token',
  microsoft: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  discord: 'https://discord.com/api/oauth2/token',
  slack: 'https://slack.com/api/oauth.v2.access',
  gitlab: 'https://gitlab.com/oauth/token',
  amazon: 'https://api.amazon.com/auth/o2/token',
  spotify: 'https://accounts.spotify.com/api/token',
  instagram: 'https://api.instagram.com/oauth/access_token',
  tiktok: 'https://open-api.tiktok.com/oauth/access_token/',
  snapchat: 'https://accounts.snapchat.com/accounts/oauth2/token',
  wechat: 'https://api.weixin.qq.com/sns/oauth2/access_token',
  line: 'https://api.line.me/oauth2/v2.1/token',
} as const;

export type SocialTokenUrl = (typeof SOCIAL_TOKEN_URLS)[keyof typeof SOCIAL_TOKEN_URLS];

/**
 * Social provider user info URLs
 */
export const SOCIAL_USER_INFO_URLS = {
  google: 'https://www.googleapis.com/oauth2/v2/userinfo',
  facebook: 'https://graph.facebook.com/me?fields=id,name,email,picture',
  github: 'https://api.github.com/user',
  apple: 'https://appleid.apple.com/auth/keys',
  linkedin: 'https://api.linkedin.com/v2/userinfo',
  twitter: 'https://api.twitter.com/2/users/me',
  microsoft: 'https://graph.microsoft.com/v1.0/me',
  discord: 'https://discord.com/api/users/@me',
  slack: 'https://slack.com/api/users.profile.get',
  gitlab: 'https://gitlab.com/api/v4/user',
  amazon: 'https://api.amazon.com/user/profile',
  spotify: 'https://api.spotify.com/v1/me',
  instagram: 'https://graph.instagram.com/me',
  tiktok: 'https://open-api.tiktok.com/user/info/',
  snapchat: 'https://api.snapchat.com/v1/me',
  wechat: 'https://api.weixin.qq.com/sns/userinfo',
  line: 'https://api.line.me/v2/profile',
} as const;

export type SocialUserInfoUrl = (typeof SOCIAL_USER_INFO_URLS)[keyof typeof SOCIAL_USER_INFO_URLS];

/**
 * Social provider configurations
 */
export const SOCIAL_CONFIG = {
  /**
   * Whether social login is enabled
   */
  ENABLED: true,

  /**
   * Whether to allow account linking
   */
  ALLOW_ACCOUNT_LINKING: true,

  /**
   * Whether to allow registration via social providers
   */
  ALLOW_REGISTRATION: true,

  /**
   * Default redirect URI after social login
   */
  DEFAULT_REDIRECT: '/dashboard',

  /**
   * Session TTL for social login sessions
   */
  SESSION_TTL_SECONDS: 3600, // 1 hour

  /**
   * Whether to verify email from social provider
   */
  VERIFY_EMAIL: true,

  /**
   * Whether to use state parameter for CSRF protection
   */
  USE_STATE_PARAMETER: true,

  /**
   * State parameter expiry in seconds
   */
  STATE_EXPIRY_SECONDS: 300, // 5 minutes

  /**
   * Scopes to request from each provider
   */
  SCOPES: {
    google: ['profile', 'email'],
    facebook: ['email', 'public_profile'],
    github: ['user:email'],
    apple: ['name', 'email'],
    linkedin: ['profile', 'email', 'openid'],
    twitter: ['tweet.read', 'users.read', 'offline.access'],
    microsoft: ['User.Read', 'email', 'profile'],
    discord: ['identify', 'email'],
    slack: ['users.profile:read', 'users:read'],
    gitlab: ['read_user'],
    amazon: ['profile', 'profile:user_id'],
    spotify: ['user-read-email', 'user-read-private'],
    instagram: ['user_profile', 'user_media'],
    tiktok: ['user.info.basic'],
    snapchat: ['snapchat:user:read'],
    wechat: ['snsapi_login'],
    line: ['profile', 'openid', 'email'],
  },
} as const;

/**
 * Social provider icons (Unicode or emoji)
 */
export const SOCIAL_PROVIDER_ICONS = {
  google: '🔵',
  facebook: '🔷',
  github: '🐙',
  apple: '🍎',
  linkedin: '💼',
  twitter: '🐦',
  microsoft: '🪟',
  discord: '🎮',
  slack: '💬',
  gitlab: '🦊',
  amazon: '🛒',
  spotify: '🎵',
  instagram: '📸',
  tiktok: '🎵',
  snapchat: '👻',
  wechat: '💬',
  line: '📱',
} as const;

export type SocialProviderIcon = (typeof SOCIAL_PROVIDER_ICONS)[keyof typeof SOCIAL_PROVIDER_ICONS];

/**
 * Social provider colors (for UI theming)
 */
export const SOCIAL_PROVIDER_COLORS = {
  google: '#4285F4',
  facebook: '#1877F2',
  github: '#181717',
  apple: '#A2AAAD',
  linkedin: '#0A66C2',
  twitter: '#1DA1F2',
  microsoft: '#00A4EF',
  discord: '#5865F2',
  slack: '#4A154B',
  gitlab: '#FC6D26',
  amazon: '#FF9900',
  spotify: '#1DB954',
  instagram: '#E4405F',
  tiktok: '#010101',
  snapchat: '#FFFC00',
  wechat: '#07C160',
  line: '#00C300',
} as const;

export type SocialProviderColor =
  (typeof SOCIAL_PROVIDER_COLORS)[keyof typeof SOCIAL_PROVIDER_COLORS];

/**
 * Social provider button text
 */
export const SOCIAL_PROVIDER_BUTTON_TEXT = {
  google: 'Continue with Google',
  facebook: 'Continue with Facebook',
  github: 'Continue with GitHub',
  apple: 'Continue with Apple',
  linkedin: 'Continue with LinkedIn',
  twitter: 'Continue with Twitter/X',
  microsoft: 'Continue with Microsoft',
  discord: 'Continue with Discord',
  slack: 'Continue with Slack',
  gitlab: 'Continue with GitLab',
  amazon: 'Continue with Amazon',
  spotify: 'Continue with Spotify',
  instagram: 'Continue with Instagram',
  tiktok: 'Continue with TikTok',
  snapchat: 'Continue with Snapchat',
  wechat: 'Continue with WeChat',
  line: 'Continue with Line',
} as const;

export type SocialProviderButtonText =
  (typeof SOCIAL_PROVIDER_BUTTON_TEXT)[keyof typeof SOCIAL_PROVIDER_BUTTON_TEXT];

/**
 * Social provider error messages
 */
export const SOCIAL_ERROR_MESSAGES = {
  PROVIDER_NOT_SUPPORTED: 'Social provider is not supported',
  PROVIDER_DISABLED: 'Social provider is currently disabled',
  AUTH_FAILED: 'Social authentication failed',
  TOKEN_EXCHANGE_FAILED: 'Failed to exchange authorization code for access token',
  USER_INFO_FETCH_FAILED: 'Failed to fetch user information from provider',
  EMAIL_NOT_PROVIDED: 'Email address was not provided by the social provider',
  EMAIL_ALREADY_EXISTS: 'A user with this email already exists',
  ACCOUNT_LINKING_FAILED: 'Failed to link social account',
  ACCOUNT_UNLINKING_FAILED: 'Failed to unlink social account',
  INVALID_STATE: 'Invalid state parameter - possible CSRF attack',
  EXPIRED_STATE: 'State parameter has expired',
  INVALID_CODE: 'Invalid authorization code',
  ACCESS_DENIED: 'User denied access to their information',
  SCOPE_MISMATCH: 'Requested scopes do not match granted scopes',
  RATE_LIMITED: 'Rate limit exceeded for social authentication',
  NETWORK_ERROR: 'Network error while communicating with social provider',
  UNKNOWN_ERROR: 'An unknown error occurred during social authentication',
} as const;

export type SocialErrorMessage = (typeof SOCIAL_ERROR_MESSAGES)[keyof typeof SOCIAL_ERROR_MESSAGES];

/**
 * Social provider success messages
 */
export const SOCIAL_SUCCESS_MESSAGES = {
  AUTH_SUCCESS: 'Successfully authenticated with social provider',
  ACCOUNT_LINKED: 'Social account successfully linked',
  ACCOUNT_UNLINKED: 'Social account successfully unlinked',
  REGISTRATION_SUCCESS: 'Successfully registered with social provider',
} as const;

export type SocialSuccessMessage =
  (typeof SOCIAL_SUCCESS_MESSAGES)[keyof typeof SOCIAL_SUCCESS_MESSAGES];

/**
 * Social provider events for logging
 */
export const SOCIAL_EVENTS = {
  AUTH_STARTED: 'social.auth.started',
  AUTH_SUCCESS: 'social.auth.success',
  AUTH_FAILURE: 'social.auth.failure',
  AUTH_CANCELLED: 'social.auth.cancelled',
  TOKEN_EXCHANGE: 'social.token.exchange',
  USER_INFO_FETCHED: 'social.user.info.fetched',
  ACCOUNT_LINKED: 'social.account.linked',
  ACCOUNT_UNLINKED: 'social.account.unlinked',
  ACCOUNT_CREATED: 'social.account.created',
  ACCOUNT_UPDATED: 'social.account.updated',
} as const;

export type SocialEvent = (typeof SOCIAL_EVENTS)[keyof typeof SOCIAL_EVENTS];

/**
 * Social provider interface
 */
export interface SocialProviderConfig {
  /**
   * Provider identifier
   */
  provider: SocialProvider;

  /**
   * Display name of the provider
   */
  name: string;

  /**
   * Client ID for the OAuth application
   */
  clientId: string;

  /**
   * Client Secret for the OAuth application
   */
  clientSecret: string;

  /**
   * Callback URL for the OAuth flow
   */
  callbackUrl: string;

  /**
   * Authorization URL for the OAuth flow
   */
  authUrl: string;

  /**
   * Token URL for the OAuth flow
   */
  tokenUrl: string;

  /**
   * User info URL for fetching user data
   */
  userInfoUrl: string;

  /**
   * Scopes to request from the provider
   */
  scopes: string[];

  /**
   * Whether to use PKCE (Proof Key for Code Exchange)
   */
  usePKCE: boolean;

  /**
   * Whether the provider is enabled
   */
  enabled: boolean;

  /**
   * Logo/icon for the provider
   */
  icon: string;

  /**
   * Color for the provider button
   */
  color: string;
}

/**
 * Social user profile interface
 */
export interface SocialUserProfile {
  /**
   * Unique ID from the social provider
   */
  id: string;

  /**
   * Email address from the social provider
   */
  email: string;

  /**
   * Display name from the social provider
   */
  name?: string;

  /**
   * First name from the social provider
   */
  firstName?: string;

  /**
   * Last name from the social provider
   */
  lastName?: string;

  /**
   * Avatar URL from the social provider
   */
  avatar?: string;

  /**
   * Provider identifier
   */
  provider: SocialProvider;

  /**
   * Raw profile data from the provider
   */
  raw: Record<string, unknown>;

  /**
   * Whether the email is verified by the provider
   */
  emailVerified: boolean;

  /**
   * Locale/region from the provider
   */
  locale?: string;

  /**
   * Gender from the provider
   */
  gender?: string;

  /**
   * Birthday from the provider
   */
  birthday?: string;

  /**
   * Phone number from the provider
   */
  phoneNumber?: string;

  /**
   * Profile URL from the provider
   */
  profileUrl?: string;

  /**
   * Website URL from the provider
   */
  website?: string;

  /**
   * Country from the provider
   */
  country?: string;
}

/**
 * Social account linking interface
 */
export interface SocialAccountLink {
  /**
   * User ID in the application
   */
  userId: string;

  /**
   * Social provider
   */
  provider: SocialProvider;

  /**
   * Social provider user ID
   */
  providerUserId: string;

  /**
   * Social provider email
   */
  email: string;

  /**
   * Social provider access token
   */
  accessToken: string;

  /**
   * Social provider refresh token
   */
  refreshToken?: string;

  /**
   * Token expiry timestamp
   */
  tokenExpiresAt?: Date;

  /**
   * Social provider user data
   */
  profile: SocialUserProfile;

  /**
   * When the account was linked
   */
  linkedAt: Date;

  /**
   * When the account was last used
   */
  lastUsedAt?: Date;

  /**
   * Whether the account is active
   */
  isActive: boolean;
}

/**
 * Type for scopes configuration
 */
export type SocialScopes = {
  [K in SocialProvider]: readonly string[];
};

/**
 * Helper function to get provider display name
 */
export const getProviderDisplayName = (provider: SocialProvider): string => {
  return SOCIAL_PROVIDER_NAMES[provider] || provider;
};

/**
 * Helper function to get provider callback URL
 */
export const getProviderCallbackUrl = (provider: SocialProvider): string => {
  return SOCIAL_CALLBACK_URLS[provider] || '';
};

/**
 * Helper function to get provider icon
 */
export const getProviderIcon = (provider: SocialProvider): string => {
  return SOCIAL_PROVIDER_ICONS[provider] || '🔑';
};

/**
 * Helper function to get provider color
 */
export const getProviderColor = (provider: SocialProvider): string => {
  return SOCIAL_PROVIDER_COLORS[provider] || '#6B7280';
};

/**
 * Helper function to get provider button text
 */
export const getProviderButtonText = (provider: SocialProvider): string => {
  return (
    SOCIAL_PROVIDER_BUTTON_TEXT[provider] || `Continue with ${SOCIAL_PROVIDER_NAMES[provider]}`
  );
};

/**
 * Helper function to get provider scopes
 * Returns a copy of the scopes array to avoid mutation issues
 */
export const getProviderScopes = (provider: SocialProvider): string[] => {
  const scopes = SOCIAL_CONFIG.SCOPES[provider as keyof typeof SOCIAL_CONFIG.SCOPES];
  return scopes ? [...scopes] : [];
};

/**
 * Helper function to check if provider is supported
 */
export const isProviderSupported = (provider: string): provider is SocialProvider => {
  return Object.values(SOCIAL_PROVIDERS).includes(provider as SocialProvider);
};

/**
 * Helper function to get enabled providers
 */
export const getEnabledProviders = (): SocialProvider[] => {
  // This should check against your actual configuration
  // For now, we return all providers as enabled
  return Object.values(SOCIAL_PROVIDERS).filter(() => {
    return SOCIAL_CONFIG.ENABLED;
  });
};

/**
 * All social constants for export
 */
export const SOCIAL_CONSTANTS = {
  PROVIDERS: SOCIAL_PROVIDERS,
  PROVIDER_NAMES: SOCIAL_PROVIDER_NAMES,
  CALLBACK_URLS: SOCIAL_CALLBACK_URLS,
  AUTH_URLS: SOCIAL_AUTH_URLS,
  TOKEN_URLS: SOCIAL_TOKEN_URLS,
  USER_INFO_URLS: SOCIAL_USER_INFO_URLS,
  CONFIG: SOCIAL_CONFIG,
  ICONS: SOCIAL_PROVIDER_ICONS,
  COLORS: SOCIAL_PROVIDER_COLORS,
  BUTTON_TEXT: SOCIAL_PROVIDER_BUTTON_TEXT,
  ERROR_MESSAGES: SOCIAL_ERROR_MESSAGES,
  SUCCESS_MESSAGES: SOCIAL_SUCCESS_MESSAGES,
  EVENTS: SOCIAL_EVENTS,
} as const;

/**
 * All social constants for export
 */
export const ALL_SOCIAL_CONSTANTS = {
  ...SOCIAL_PROVIDERS,
  ...SOCIAL_PROVIDER_NAMES,
  ...SOCIAL_CALLBACK_URLS,
  ...SOCIAL_AUTH_URLS,
  ...SOCIAL_TOKEN_URLS,
  ...SOCIAL_USER_INFO_URLS,
  ...SOCIAL_CONFIG,
  ...SOCIAL_PROVIDER_ICONS,
  ...SOCIAL_PROVIDER_COLORS,
  ...SOCIAL_PROVIDER_BUTTON_TEXT,
  ...SOCIAL_ERROR_MESSAGES,
  ...SOCIAL_SUCCESS_MESSAGES,
  ...SOCIAL_EVENTS,
} as const;
