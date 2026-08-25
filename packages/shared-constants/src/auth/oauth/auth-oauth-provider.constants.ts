/**
 * Authentication OAuth Provider Constants
 * OAuth authentication providers
 */

export const AUTH_OAUTH_PROVIDER = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  GITHUB: 'github',
  MICROSOFT: 'microsoft',
  LINKEDIN: 'linkedin',
  APPLE: 'apple',

  OKTA: 'okta',
  AZURE_AD: 'azure_ad',
  GOOGLE_WORKSPACE: 'google_workspace',

  AMAZON: 'amazon',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  SPOTIFY: 'spotify',
  DROPBOX: 'dropbox',
  SALESFORCE: 'salesforce',
  SLACK: 'slack',
} as const;

export type AuthOauthProvider = (typeof AUTH_OAUTH_PROVIDER)[keyof typeof AUTH_OAUTH_PROVIDER];

export const OAUTH_MAJOR_PROVIDERS: AuthOauthProvider[] = [
  AUTH_OAUTH_PROVIDER.GOOGLE,
  AUTH_OAUTH_PROVIDER.FACEBOOK,
  AUTH_OAUTH_PROVIDER.GITHUB,
  AUTH_OAUTH_PROVIDER.MICROSOFT,
  AUTH_OAUTH_PROVIDER.LINKEDIN,
  AUTH_OAUTH_PROVIDER.APPLE,
];

export const OAUTH_ENTERPRISE_PROVIDERS: AuthOauthProvider[] = [
  AUTH_OAUTH_PROVIDER.OKTA,
  AUTH_OAUTH_PROVIDER.AZURE_AD,
  AUTH_OAUTH_PROVIDER.GOOGLE_WORKSPACE,
];

export const OAUTH_OTHER_PROVIDERS: AuthOauthProvider[] = [
  AUTH_OAUTH_PROVIDER.AMAZON,
  AUTH_OAUTH_PROVIDER.TWITTER,
  AUTH_OAUTH_PROVIDER.INSTAGRAM,
  AUTH_OAUTH_PROVIDER.SPOTIFY,
  AUTH_OAUTH_PROVIDER.DROPBOX,
  AUTH_OAUTH_PROVIDER.SALESFORCE,
  AUTH_OAUTH_PROVIDER.SLACK,
];

export const OAUTH_PROVIDERS_LIST: AuthOauthProvider[] = [
  ...OAUTH_MAJOR_PROVIDERS,
  ...OAUTH_ENTERPRISE_PROVIDERS,
  ...OAUTH_OTHER_PROVIDERS,
];

export const OAUTH_OIDC_COMPLIANT_PROVIDERS: AuthOauthProvider[] = [
  AUTH_OAUTH_PROVIDER.GOOGLE,
  AUTH_OAUTH_PROVIDER.MICROSOFT,
  AUTH_OAUTH_PROVIDER.LINKEDIN,
  AUTH_OAUTH_PROVIDER.APPLE,
  AUTH_OAUTH_PROVIDER.OKTA,
];

export const OAUTH_PKCE_SUPPORTED_PROVIDERS: AuthOauthProvider[] = [
  AUTH_OAUTH_PROVIDER.GOOGLE,
  AUTH_OAUTH_PROVIDER.MICROSOFT,
  AUTH_OAUTH_PROVIDER.LINKEDIN,
  AUTH_OAUTH_PROVIDER.APPLE,
  AUTH_OAUTH_PROVIDER.OKTA,
];

export function isOauthMajorProvider(provider: AuthOauthProvider): boolean {
  return OAUTH_MAJOR_PROVIDERS.includes(provider);
}

export function isOauthEnterpriseProvider(provider: AuthOauthProvider): boolean {
  return OAUTH_ENTERPRISE_PROVIDERS.includes(provider);
}

export function isOauthOtherProvider(provider: AuthOauthProvider): boolean {
  return OAUTH_OTHER_PROVIDERS.includes(provider);
}

export function isOauthOIDCCompliant(provider: AuthOauthProvider): boolean {
  return OAUTH_OIDC_COMPLIANT_PROVIDERS.includes(provider);
}

export function isOauthPKCESupported(provider: AuthOauthProvider): boolean {
  return OAUTH_PKCE_SUPPORTED_PROVIDERS.includes(provider);
}

export function getOauthProviderLabel(provider: AuthOauthProvider): string {
  const labels: Record<AuthOauthProvider, string> = {
    [AUTH_OAUTH_PROVIDER.GOOGLE]: 'Google',
    [AUTH_OAUTH_PROVIDER.FACEBOOK]: 'Facebook',
    [AUTH_OAUTH_PROVIDER.GITHUB]: 'GitHub',
    [AUTH_OAUTH_PROVIDER.MICROSOFT]: 'Microsoft',
    [AUTH_OAUTH_PROVIDER.LINKEDIN]: 'LinkedIn',
    [AUTH_OAUTH_PROVIDER.APPLE]: 'Apple',
    [AUTH_OAUTH_PROVIDER.OKTA]: 'Okta',
    [AUTH_OAUTH_PROVIDER.AZURE_AD]: 'Azure AD',
    [AUTH_OAUTH_PROVIDER.GOOGLE_WORKSPACE]: 'Google Workspace',
    [AUTH_OAUTH_PROVIDER.AMAZON]: 'Amazon',
    [AUTH_OAUTH_PROVIDER.TWITTER]: 'Twitter',
    [AUTH_OAUTH_PROVIDER.INSTAGRAM]: 'Instagram',
    [AUTH_OAUTH_PROVIDER.SPOTIFY]: 'Spotify',
    [AUTH_OAUTH_PROVIDER.DROPBOX]: 'Dropbox',
    [AUTH_OAUTH_PROVIDER.SALESFORCE]: 'Salesforce',
    [AUTH_OAUTH_PROVIDER.SLACK]: 'Slack',
  };

  return labels[provider] || 'Unknown Provider';
}

export function getOauthProviderIcon(provider: AuthOauthProvider): string {
  const icons: Record<AuthOauthProvider, string> = {
    [AUTH_OAUTH_PROVIDER.GOOGLE]: '🅶',
    [AUTH_OAUTH_PROVIDER.FACEBOOK]: '📘',
    [AUTH_OAUTH_PROVIDER.GITHUB]: '🐙',
    [AUTH_OAUTH_PROVIDER.MICROSOFT]: '💻',
    [AUTH_OAUTH_PROVIDER.LINKEDIN]: '💼',
    [AUTH_OAUTH_PROVIDER.APPLE]: '🍎',
    [AUTH_OAUTH_PROVIDER.OKTA]: '🔒',
    [AUTH_OAUTH_PROVIDER.AZURE_AD]: '☁️',
    [AUTH_OAUTH_PROVIDER.GOOGLE_WORKSPACE]: '📧',
    [AUTH_OAUTH_PROVIDER.AMAZON]: '🛒',
    [AUTH_OAUTH_PROVIDER.TWITTER]: '🐦',
    [AUTH_OAUTH_PROVIDER.INSTAGRAM]: '📸',
    [AUTH_OAUTH_PROVIDER.SPOTIFY]: '🎵',
    [AUTH_OAUTH_PROVIDER.DROPBOX]: '📁',
    [AUTH_OAUTH_PROVIDER.SALESFORCE]: '☁️',
    [AUTH_OAUTH_PROVIDER.SLACK]: '💬',
  };

  return icons[provider] || '🔑';
}

export function getOauthProviderColor(provider: AuthOauthProvider): string {
  const colors: Record<AuthOauthProvider, string> = {
    [AUTH_OAUTH_PROVIDER.GOOGLE]: '#4285F4',
    [AUTH_OAUTH_PROVIDER.FACEBOOK]: '#1877F2',
    [AUTH_OAUTH_PROVIDER.GITHUB]: '#181717',
    [AUTH_OAUTH_PROVIDER.MICROSOFT]: '#00A4EF',
    [AUTH_OAUTH_PROVIDER.LINKEDIN]: '#0A66C2',
    [AUTH_OAUTH_PROVIDER.APPLE]: '#000000',
    [AUTH_OAUTH_PROVIDER.OKTA]: '#0064B5',
    [AUTH_OAUTH_PROVIDER.AZURE_AD]: '#0078D4',
    [AUTH_OAUTH_PROVIDER.GOOGLE_WORKSPACE]: '#4285F4',
    [AUTH_OAUTH_PROVIDER.AMAZON]: '#FF9900',
    [AUTH_OAUTH_PROVIDER.TWITTER]: '#1DA1F2',
    [AUTH_OAUTH_PROVIDER.INSTAGRAM]: '#E4405F',
    [AUTH_OAUTH_PROVIDER.SPOTIFY]: '#1DB954',
    [AUTH_OAUTH_PROVIDER.DROPBOX]: '#0061FF',
    [AUTH_OAUTH_PROVIDER.SALESFORCE]: '#00A1E0',
    [AUTH_OAUTH_PROVIDER.SLACK]: '#4A154B',
  };

  return colors[provider] || '#6B7280';
}

export function getOauthProviderType(provider: AuthOauthProvider): 'oauth2' | 'oidc' | 'custom' {
  if (isOauthOIDCCompliant(provider)) return 'oidc';
  if (isOauthMajorProvider(provider)) return 'oauth2';
  return 'custom';
}
