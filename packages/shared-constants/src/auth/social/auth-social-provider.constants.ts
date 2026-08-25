/**
 * Authentication Social Provider Constants
 * Social authentication providers
 */

export const AUTH_SOCIAL_PROVIDER = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  GITHUB: 'github',
  APPLE: 'apple',
  MICROSOFT: 'microsoft',

  BKASH: 'bkash',
  NAGAD: 'nogod',
  ROCKET: 'rocket',

  OKTA: 'okta',
  AZURE_AD: 'azure_ad',
  GOOGLE_WORKSPACE: 'google_workspace',

  AMAZON: 'amazon',
  INSTAGRAM: 'instagram',
  TIKTOK: 'tiktok',
  SNAPCHAT: 'snapchat',
  TELEGRAM: 'telegram',
  DISCORD: 'discord',
  SLACK: 'slack',
} as const;

export type AuthsocialProvider = (typeof AUTH_SOCIAL_PROVIDER)[keyof typeof AUTH_SOCIAL_PROVIDER];

export const AUTHSOCIAL_MAJOR_PROVIDERS: AuthsocialProvider[] = [
  AUTH_SOCIAL_PROVIDER.GOOGLE,
  AUTH_SOCIAL_PROVIDER.FACEBOOK,
  AUTH_SOCIAL_PROVIDER.TWITTER,
  AUTH_SOCIAL_PROVIDER.LINKEDIN,
  AUTH_SOCIAL_PROVIDER.GITHUB,
  AUTH_SOCIAL_PROVIDER.APPLE,
  AUTH_SOCIAL_PROVIDER.MICROSOFT,
];

export const AUTHSOCIAL_BANGLADESH_PROVIDERS: AuthsocialProvider[] = [
  AUTH_SOCIAL_PROVIDER.BKASH,
  AUTH_SOCIAL_PROVIDER.NAGAD,
  AUTH_SOCIAL_PROVIDER.ROCKET,
];

export const AUTHSOCIAL_ENTERPRISE_PROVIDERS: AuthsocialProvider[] = [
  AUTH_SOCIAL_PROVIDER.OKTA,
  AUTH_SOCIAL_PROVIDER.AZURE_AD,
  AUTH_SOCIAL_PROVIDER.GOOGLE_WORKSPACE,
];

export const AUTHSOCIAL_OTHER_PROVIDERS: AuthsocialProvider[] = [
  AUTH_SOCIAL_PROVIDER.AMAZON,
  AUTH_SOCIAL_PROVIDER.INSTAGRAM,
  AUTH_SOCIAL_PROVIDER.TIKTOK,
  AUTH_SOCIAL_PROVIDER.SNAPCHAT,
  AUTH_SOCIAL_PROVIDER.TELEGRAM,
  AUTH_SOCIAL_PROVIDER.DISCORD,
  AUTH_SOCIAL_PROVIDER.SLACK,
];

export const AUTHSOCIAL_PROVIDERS_LIST: AuthsocialProvider[] = [
  ...AUTHSOCIAL_MAJOR_PROVIDERS,
  ...AUTHSOCIAL_BANGLADESH_PROVIDERS,
  ...AUTHSOCIAL_ENTERPRISE_PROVIDERS,
  ...AUTHSOCIAL_OTHER_PROVIDERS,
];

export const AUTHSOCIAL_OAUTH2_PROVIDERS: AuthsocialProvider[] = [
  AUTH_SOCIAL_PROVIDER.GOOGLE,
  AUTH_SOCIAL_PROVIDER.FACEBOOK,
  AUTH_SOCIAL_PROVIDER.GITHUB,
  AUTH_SOCIAL_PROVIDER.MICROSOFT,
  AUTH_SOCIAL_PROVIDER.OKTA,
  AUTH_SOCIAL_PROVIDER.AZURE_AD,
];

export const AUTHSOCIAL_OIDC_PROVIDERS: AuthsocialProvider[] = [
  AUTH_SOCIAL_PROVIDER.GOOGLE,
  AUTH_SOCIAL_PROVIDER.LINKEDIN,
  AUTH_SOCIAL_PROVIDER.APPLE,
  AUTH_SOCIAL_PROVIDER.MICROSOFT,
  AUTH_SOCIAL_PROVIDER.OKTA,
];

export const AUTHSOCIAL_SOCIAL_ONLY_PROVIDERS: AuthsocialProvider[] = [
  AUTH_SOCIAL_PROVIDER.TWITTER,
  AUTH_SOCIAL_PROVIDER.INSTAGRAM,
  AUTH_SOCIAL_PROVIDER.TIKTOK,
  AUTH_SOCIAL_PROVIDER.SNAPCHAT,
  AUTH_SOCIAL_PROVIDER.TELEGRAM,
  AUTH_SOCIAL_PROVIDER.DISCORD,
  AUTH_SOCIAL_PROVIDER.SLACK,
];

export function isAuthsocialMajorProvider(provider: AuthsocialProvider): boolean {
  return AUTHSOCIAL_MAJOR_PROVIDERS.includes(provider);
}

export function isAuthsocialBangladeshProvider(provider: AuthsocialProvider): boolean {
  return AUTHSOCIAL_BANGLADESH_PROVIDERS.includes(provider);
}

export function isAuthsocialEnterpriseProvider(provider: AuthsocialProvider): boolean {
  return AUTHSOCIAL_ENTERPRISE_PROVIDERS.includes(provider);
}

export function isAuthsocialOtherProvider(provider: AuthsocialProvider): boolean {
  return AUTHSOCIAL_OTHER_PROVIDERS.includes(provider);
}

export function isAuthsocialOAuth2Provider(provider: AuthsocialProvider): boolean {
  return AUTHSOCIAL_OAUTH2_PROVIDERS.includes(provider);
}

export function isAuthsocialOIDCProvider(provider: AuthsocialProvider): boolean {
  return AUTHSOCIAL_OIDC_PROVIDERS.includes(provider);
}

export function isAuthsocialSocialOnlyProvider(provider: AuthsocialProvider): boolean {
  return AUTHSOCIAL_SOCIAL_ONLY_PROVIDERS.includes(provider);
}

export function getAuthsocialProviderLabel(provider: AuthsocialProvider): string {
  const labels: Record<AuthsocialProvider, string> = {
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

export function getAuthsocialProviderIcon(provider: AuthsocialProvider): string {
  const icons: Record<AuthsocialProvider, string> = {
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

export function getAuthsocialProviderColor(provider: AuthsocialProvider): string {
  const colors: Record<AuthsocialProvider, string> = {
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

export function getAuthsocialProviderType(
  provider: AuthsocialProvider
): 'oauth2' | 'oidc' | 'social' {
  if (isAuthsocialOIDCProvider(provider)) return 'oidc';
  if (isAuthsocialOAuth2Provider(provider)) return 'oauth2';
  return 'social';
}
