/**
 * Authentication Social Provider Constants
 * Social authentication providers
 */

export const AUTH_SOCIAL_PROVIDER = {
  // Major providers
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  GITHUB: 'github',
  APPLE: 'apple',
  MICROSOFT: 'microsoft',

  // Regional providers (Bangladesh)
  BKASH: 'bkash',
  NAGAD: 'nogod',
  ROCKET: 'rocket',

  // Enterprise providers
  OKTA: 'okta',
  AZURE_AD: 'azure_ad',
  GOOGLE_WORKSPACE: 'google_workspace',

  // Other providers
  AMAZON: 'amazon',
  INSTAGRAM: 'instagram',
  TIKTOK: 'tiktok',
  SNAPCHAT: 'snapchat',
  TELEGRAM: 'telegram',
  DISCORD: 'discord',
  SLACK: 'slack',
} as const;

export type AuthSocialProvider = (typeof AUTH_SOCIAL_PROVIDER)[keyof typeof AUTH_SOCIAL_PROVIDER];

export const MAJOR_PROVIDERS: AuthSocialProvider[] = [
  AUTH_SOCIAL_PROVIDER.GOOGLE,
  AUTH_SOCIAL_PROVIDER.FACEBOOK,
  AUTH_SOCIAL_PROVIDER.TWITTER,
  AUTH_SOCIAL_PROVIDER.LINKEDIN,
  AUTH_SOCIAL_PROVIDER.GITHUB,
  AUTH_SOCIAL_PROVIDER.APPLE,
  AUTH_SOCIAL_PROVIDER.MICROSOFT,
];

export const BANGLADESH_PROVIDERS: AuthSocialProvider[] = [
  AUTH_SOCIAL_PROVIDER.BKASH,
  AUTH_SOCIAL_PROVIDER.NAGAD,
  AUTH_SOCIAL_PROVIDER.ROCKET,
];

export const ENTERPRISE_PROVIDERS: AuthSocialProvider[] = [
  AUTH_SOCIAL_PROVIDER.OKTA,
  AUTH_SOCIAL_PROVIDER.AZURE_AD,
  AUTH_SOCIAL_PROVIDER.GOOGLE_WORKSPACE,
];

export const OTHER_PROVIDERS: AuthSocialProvider[] = [
  AUTH_SOCIAL_PROVIDER.AMAZON,
  AUTH_SOCIAL_PROVIDER.INSTAGRAM,
  AUTH_SOCIAL_PROVIDER.TIKTOK,
  AUTH_SOCIAL_PROVIDER.SNAPCHAT,
  AUTH_SOCIAL_PROVIDER.TELEGRAM,
  AUTH_SOCIAL_PROVIDER.DISCORD,
  AUTH_SOCIAL_PROVIDER.SLACK,
];

export const SOCIAL_PROVIDERS_LIST: AuthSocialProvider[] = [
  ...MAJOR_PROVIDERS,
  ...BANGLADESH_PROVIDERS,
  ...ENTERPRISE_PROVIDERS,
  ...OTHER_PROVIDERS,
];

export const OAUTH2_PROVIDERS: AuthSocialProvider[] = [
  AUTH_SOCIAL_PROVIDER.GOOGLE,
  AUTH_SOCIAL_PROVIDER.FACEBOOK,
  AUTH_SOCIAL_PROVIDER.GITHUB,
  AUTH_SOCIAL_PROVIDER.MICROSOFT,
  AUTH_SOCIAL_PROVIDER.OKTA,
  AUTH_SOCIAL_PROVIDER.AZURE_AD,
];

export const OIDC_PROVIDERS: AuthSocialProvider[] = [
  AUTH_SOCIAL_PROVIDER.GOOGLE,
  AUTH_SOCIAL_PROVIDER.LINKEDIN,
  AUTH_SOCIAL_PROVIDER.APPLE,
  AUTH_SOCIAL_PROVIDER.MICROSOFT,
  AUTH_SOCIAL_PROVIDER.OKTA,
];

export const SOCIAL_ONLY_PROVIDERS: AuthSocialProvider[] = [
  AUTH_SOCIAL_PROVIDER.TWITTER,
  AUTH_SOCIAL_PROVIDER.INSTAGRAM,
  AUTH_SOCIAL_PROVIDER.TIKTOK,
  AUTH_SOCIAL_PROVIDER.SNAPCHAT,
  AUTH_SOCIAL_PROVIDER.TELEGRAM,
  AUTH_SOCIAL_PROVIDER.DISCORD,
  AUTH_SOCIAL_PROVIDER.SLACK,
];

export function isMajorProvider(provider: AuthSocialProvider): boolean {
  return MAJOR_PROVIDERS.includes(provider);
}

export function isBangladeshProvider(provider: AuthSocialProvider): boolean {
  return BANGLADESH_PROVIDERS.includes(provider);
}

export function isEnterpriseProvider(provider: AuthSocialProvider): boolean {
  return ENTERPRISE_PROVIDERS.includes(provider);
}

export function isOtherProvider(provider: AuthSocialProvider): boolean {
  return OTHER_PROVIDERS.includes(provider);
}

export function isOAuth2Provider(provider: AuthSocialProvider): boolean {
  return OAUTH2_PROVIDERS.includes(provider);
}

export function isOIDCProvider(provider: AuthSocialProvider): boolean {
  return OIDC_PROVIDERS.includes(provider);
}

export function isSocialOnlyProvider(provider: AuthSocialProvider): boolean {
  return SOCIAL_ONLY_PROVIDERS.includes(provider);
}

export function getSocialProviderLabel(provider: AuthSocialProvider): string {
  const labels: Record<AuthSocialProvider, string> = {
    [AUTH_SOCIAL_PROVIDER.GOOGLE]: 'Google',
    [AUTH_SOCIAL_PROVIDER.FACEBOOK]: 'Facebook',
    [AUTH_SOCIAL_PROVIDER.TWITTER]: 'Twitter',
    [AUTH_SOCIAL_PROVIDER.LINKEDIN]: 'LinkedIn',
    [AUTH_SOCIAL_PROVIDER.GITHUB]: 'GitHub',
    [AUTH_SOCIAL_PROVIDER.APPLE]: 'Apple',
    [AUTH_SOCIAL_PROVIDER.MICROSOFT]: 'Microsoft',
    [AUTH_SOCIAL_PROVIDER.BKASH]: 'bKash',
    [AUTH_SOCIAL_PROVIDER.NAGAD]: 'Nagad',
    [AUTH_SOCIAL_PROVIDER.ROCKET]: 'Rocket',
    [AUTH_SOCIAL_PROVIDER.OKTA]: 'Okta',
    [AUTH_SOCIAL_PROVIDER.AZURE_AD]: 'Azure AD',
    [AUTH_SOCIAL_PROVIDER.GOOGLE_WORKSPACE]: 'Google Workspace',
    [AUTH_SOCIAL_PROVIDER.AMAZON]: 'Amazon',
    [AUTH_SOCIAL_PROVIDER.INSTAGRAM]: 'Instagram',
    [AUTH_SOCIAL_PROVIDER.TIKTOK]: 'TikTok',
    [AUTH_SOCIAL_PROVIDER.SNAPCHAT]: 'Snapchat',
    [AUTH_SOCIAL_PROVIDER.TELEGRAM]: 'Telegram',
    [AUTH_SOCIAL_PROVIDER.DISCORD]: 'Discord',
    [AUTH_SOCIAL_PROVIDER.SLACK]: 'Slack',
  };

  return labels[provider] || 'Unknown Provider';
}

export function getSocialProviderIcon(provider: AuthSocialProvider): string {
  const icons: Record<AuthSocialProvider, string> = {
    [AUTH_SOCIAL_PROVIDER.GOOGLE]: '🅶',
    [AUTH_SOCIAL_PROVIDER.FACEBOOK]: '📘',
    [AUTH_SOCIAL_PROVIDER.TWITTER]: '🐦',
    [AUTH_SOCIAL_PROVIDER.LINKEDIN]: '💼',
    [AUTH_SOCIAL_PROVIDER.GITHUB]: '🐙',
    [AUTH_SOCIAL_PROVIDER.APPLE]: '🍎',
    [AUTH_SOCIAL_PROVIDER.MICROSOFT]: '💻',
    [AUTH_SOCIAL_PROVIDER.BKASH]: '📱',
    [AUTH_SOCIAL_PROVIDER.NAGAD]: '📱',
    [AUTH_SOCIAL_PROVIDER.ROCKET]: '📱',
    [AUTH_SOCIAL_PROVIDER.OKTA]: '🔒',
    [AUTH_SOCIAL_PROVIDER.AZURE_AD]: '☁️',
    [AUTH_SOCIAL_PROVIDER.GOOGLE_WORKSPACE]: '📧',
    [AUTH_SOCIAL_PROVIDER.AMAZON]: '🛒',
    [AUTH_SOCIAL_PROVIDER.INSTAGRAM]: '📸',
    [AUTH_SOCIAL_PROVIDER.TIKTOK]: '🎵',
    [AUTH_SOCIAL_PROVIDER.SNAPCHAT]: '👻',
    [AUTH_SOCIAL_PROVIDER.TELEGRAM]: '✈️',
    [AUTH_SOCIAL_PROVIDER.DISCORD]: '🎮',
    [AUTH_SOCIAL_PROVIDER.SLACK]: '💬',
  };

  return icons[provider] || '🔑';
}

export function getSocialProviderColor(provider: AuthSocialProvider): string {
  const colors: Record<AuthSocialProvider, string> = {
    [AUTH_SOCIAL_PROVIDER.GOOGLE]: '#4285F4',
    [AUTH_SOCIAL_PROVIDER.FACEBOOK]: '#1877F2',
    [AUTH_SOCIAL_PROVIDER.TWITTER]: '#1DA1F2',
    [AUTH_SOCIAL_PROVIDER.LINKEDIN]: '#0A66C2',
    [AUTH_SOCIAL_PROVIDER.GITHUB]: '#181717',
    [AUTH_SOCIAL_PROVIDER.APPLE]: '#000000',
    [AUTH_SOCIAL_PROVIDER.MICROSOFT]: '#00A4EF',
    [AUTH_SOCIAL_PROVIDER.BKASH]: '#D31D3D',
    [AUTH_SOCIAL_PROVIDER.NAGAD]: '#F26925',
    [AUTH_SOCIAL_PROVIDER.ROCKET]: '#006A4E',
    [AUTH_SOCIAL_PROVIDER.OKTA]: '#0064B5',
    [AUTH_SOCIAL_PROVIDER.AZURE_AD]: '#0078D4',
    [AUTH_SOCIAL_PROVIDER.GOOGLE_WORKSPACE]: '#4285F4',
    [AUTH_SOCIAL_PROVIDER.AMAZON]: '#FF9900',
    [AUTH_SOCIAL_PROVIDER.INSTAGRAM]: '#E4405F',
    [AUTH_SOCIAL_PROVIDER.TIKTOK]: '#000000',
    [AUTH_SOCIAL_PROVIDER.SNAPCHAT]: '#FFFC00',
    [AUTH_SOCIAL_PROVIDER.TELEGRAM]: '#0088CC',
    [AUTH_SOCIAL_PROVIDER.DISCORD]: '#5865F2',
    [AUTH_SOCIAL_PROVIDER.SLACK]: '#4A154B',
  };

  return colors[provider] || '#6B7280';
}

export function getSocialProviderType(provider: AuthSocialProvider): 'oauth2' | 'oidc' | 'social' {
  if (isOIDCProvider(provider)) return 'oidc';
  if (isOAuth2Provider(provider)) return 'oauth2';
  return 'social';
}
