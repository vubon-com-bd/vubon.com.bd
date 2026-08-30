/**
 * Authentication Provider Constants
 * Extended provider definitions (re-exports from auth.constants)
 *
 * Note: Base AUTH_PROVIDERS, AuthProvider, and isValidAuthProvider are exported from auth.constants
 */

/**
 * Provider Display Names
 * Human-readable names for each provider
 */
export const AUTH_PROVIDER_NAMES: Record<string, string> = {
  google: 'Google',
  facebook: 'Facebook',
  github: 'GitHub',
  apple: 'Apple',
  microsoft: 'Microsoft',
  twitter: 'Twitter / X',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  vk: 'VKontakte',
  yahoo: 'Yahoo',
  amazon: 'Amazon',
  discord: 'Discord',
  slack: 'Slack',
  spotify: 'Spotify',
  tiktok: 'TikTok',
  snapchat: 'Snapchat',
  wechat: 'WeChat',
  line: 'LINE',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
} as const;

/**
 * Provider Icons
 * Icon class or URL for each provider
 */
export const AUTH_PROVIDER_ICONS: Record<string, string> = {
  google: 'google',
  facebook: 'facebook',
  github: 'github',
  apple: 'apple',
  microsoft: 'microsoft',
  twitter: 'twitter',
  linkedin: 'linkedin',
  instagram: 'instagram',
  vk: 'vk',
  yahoo: 'yahoo',
  amazon: 'amazon',
  discord: 'discord',
  slack: 'slack',
  spotify: 'spotify',
  tiktok: 'tiktok',
  snapchat: 'snapchat',
  wechat: 'wechat',
  line: 'line',
  telegram: 'telegram',
  whatsapp: 'whatsapp',
} as const;

/**
 * Provider Colors
 * Brand colors for each provider
 */
export const AUTH_PROVIDER_COLORS: Record<string, string> = {
  google: '#4285F4',
  facebook: '#1877F2',
  github: '#181717',
  apple: '#000000',
  microsoft: '#00A4EF',
  twitter: '#000000',
  linkedin: '#0A66C2',
  instagram: '#E4405F',
  vk: '#0077FF',
  yahoo: '#6001D2',
  amazon: '#FF9900',
  discord: '#5865F2',
  slack: '#4A154B',
  spotify: '#1ED760',
  tiktok: '#000000',
  snapchat: '#FFFC00',
  wechat: '#07C160',
  line: '#00C300',
  telegram: '#26A5E4',
  whatsapp: '#25D366',
} as const;

/**
 * Provider Types
 * Category of each authentication provider
 */
export const AUTH_PROVIDER_TYPES = {
  /** Social media providers */
  SOCIAL: 'social',
  /** Professional/Work providers */
  PROFESSIONAL: 'professional',
  /** Developer platforms */
  DEVELOPER: 'developer',
  /** Messaging platforms */
  MESSAGING: 'messaging',
  /** E-commerce platforms */
  ECOMMERCE: 'ecommerce',
} as const;

export type AuthProviderType = (typeof AUTH_PROVIDER_TYPES)[keyof typeof AUTH_PROVIDER_TYPES];

/**
 * Provider Type Mapping
 * Maps each provider to its category
 */
export const AUTH_PROVIDER_TYPE_MAP: Record<string, AuthProviderType> = {
  google: AUTH_PROVIDER_TYPES.SOCIAL,
  facebook: AUTH_PROVIDER_TYPES.SOCIAL,
  github: AUTH_PROVIDER_TYPES.DEVELOPER,
  apple: AUTH_PROVIDER_TYPES.SOCIAL,
  microsoft: AUTH_PROVIDER_TYPES.PROFESSIONAL,
  twitter: AUTH_PROVIDER_TYPES.SOCIAL,
  linkedin: AUTH_PROVIDER_TYPES.PROFESSIONAL,
  instagram: AUTH_PROVIDER_TYPES.SOCIAL,
  vk: AUTH_PROVIDER_TYPES.SOCIAL,
  yahoo: AUTH_PROVIDER_TYPES.SOCIAL,
  amazon: AUTH_PROVIDER_TYPES.ECOMMERCE,
  discord: AUTH_PROVIDER_TYPES.SOCIAL,
  slack: AUTH_PROVIDER_TYPES.PROFESSIONAL,
  spotify: AUTH_PROVIDER_TYPES.SOCIAL,
  tiktok: AUTH_PROVIDER_TYPES.SOCIAL,
  snapchat: AUTH_PROVIDER_TYPES.SOCIAL,
  wechat: AUTH_PROVIDER_TYPES.MESSAGING,
  line: AUTH_PROVIDER_TYPES.MESSAGING,
  telegram: AUTH_PROVIDER_TYPES.MESSAGING,
  whatsapp: AUTH_PROVIDER_TYPES.MESSAGING,
} as const;

/**
 * Provider Scopes
 * OAuth scopes required for each provider
 */
export const AUTH_PROVIDER_SCOPES: Record<string, string[]> = {
  google: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
  facebook: ['email', 'public_profile'],
  github: ['user:email', 'read:user'],
  apple: ['email', 'name'],
  microsoft: ['openid', 'profile', 'email'],
  twitter: ['tweet.read', 'users.read'],
  linkedin: ['openid', 'profile', 'email'],
  instagram: ['user_profile', 'user_media'],
  vk: ['email', 'offline'],
  yahoo: ['openid', 'email', 'profile'],
  amazon: ['profile', 'profile:user_id'],
  discord: ['identify', 'email'],
  slack: ['users:read', 'openid'],
  spotify: ['user-read-email', 'user-read-private'],
  tiktok: ['user.info.basic'],
  snapchat: ['user.display_name'],
  wechat: ['snsapi_userinfo'],
  line: ['profile', 'openid'],
  telegram: ['basic'],
  whatsapp: ['basic'],
} as const;

/**
 * Social Providers
 * List of social media providers
 */
export const SOCIAL_PROVIDERS: string[] = [
  'google',
  'facebook',
  'twitter',
  'instagram',
  'vk',
  'tiktok',
  'snapchat',
] as const;

/**
 * Professional Providers
 * List of professional/work providers
 */
export const PROFESSIONAL_PROVIDERS: string[] = ['microsoft', 'linkedin', 'slack'] as const;

/**
 * Developer Providers
 * List of developer platforms
 */
export const DEVELOPER_PROVIDERS: string[] = ['github', 'discord'] as const;

/**
 * Messaging Providers
 * List of messaging platforms
 */
export const MESSAGING_PROVIDERS: string[] = ['wechat', 'line', 'telegram', 'whatsapp'] as const;
