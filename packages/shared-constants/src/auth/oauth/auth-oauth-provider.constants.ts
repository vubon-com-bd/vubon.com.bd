/**
 * Authentication OAuth Provider Constants
 * OAuth authentication providers
 */

export const AUTH_OAUTH_PROVIDER = {
  // Major OAuth providers
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  GITHUB: 'github',
  MICROSOFT: 'microsoft',
  LINKEDIN: 'linkedin',
  APPLE: 'apple',

  // Enterprise providers
  OKTA: 'okta',
  AZURE_AD: 'azure_ad',
  GOOGLE_WORKSPACE: 'google_workspace',

  // Other OAuth providers
  AMAZON: 'amazon',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  SPOTIFY: 'spotify',
  DROPBOX: 'dropbox',
  SALESFORCE: 'salesforce',
  SLACK: 'slack',
} as const;

export type AuthOAuthProvider = (typeof AUTH_OAUTH_PROVIDER)[keyof typeof AUTH_OAUTH_PROVIDER];

export const MAJOR_OAUTH_PROVIDERS: AuthOAuthProvider[] = [
  AUTH_OAUTH_PROVIDER.GOOGLE,
  AUTH_OAUTH_PROVIDER.FACEBOOK,
  AUTH_OAUTH_PROVIDER.GITHUB,
  AUTH_OAUTH_PROVIDER.MICROSOFT,
  AUTH_OAUTH_PROVIDER.LINKEDIN,
  AUTH_OAUTH_PROVIDER.APPLE,
];

export const ENTERPRISE_OAUTH_PROVIDERS: AuthOAuthProvider[] = [
  AUTH_OAUTH_PROVIDER.OKTA,
  AUTH_OAUTH_PROVIDER.AZURE_AD,
  AUTH_OAUTH_PROVIDER.GOOGLE_WORKSPACE,
];

export const OTHER_OAUTH_PROVIDERS: AuthOAuthProvider[] = [
  AUTH_OAUTH_PROVIDER.AMAZON,
  AUTH_OAUTH_PROVIDER.TWITTER,
  AUTH_OAUTH_PROVIDER.INSTAGRAM,
  AUTH_OAUTH_PROVIDER.SPOTIFY,
  AUTH_OAUTH_PROVIDER.DROPBOX,
  AUTH_OAUTH_PROVIDER.SALESFORCE,
  AUTH_OAUTH_PROVIDER.SLACK,
];

export const OAUTH_PROVIDERS_LIST: AuthOAuthProvider[] = [
  ...MAJOR_OAUTH_PROVIDERS,
  ...ENTERPRISE_OAUTH_PROVIDERS,
  ...OTHER_OAUTH_PROVIDERS,
];

export const OIDC_COMPLIANT_PROVIDERS: AuthOAuthProvider[] = [
  AUTH_OAUTH_PROVIDER.GOOGLE,
  AUTH_OAUTH_PROVIDER.MICROSOFT,
  AUTH_OAUTH_PROVIDER.LINKEDIN,
  AUTH_OAUTH_PROVIDER.APPLE,
  AUTH_OAUTH_PROVIDER.OKTA,
];

export const PKCE_SUPPORTED_PROVIDERS: AuthOAuthProvider[] = [
  AUTH_OAUTH_PROVIDER.GOOGLE,
  AUTH_OAUTH_PROVIDER.MICROSOFT,
  AUTH_OAUTH_PROVIDER.LINKEDIN,
  AUTH_OAUTH_PROVIDER.APPLE,
  AUTH_OAUTH_PROVIDER.OKTA,
];

export function isMajorOAuthProvider(provider: AuthOAuthProvider): boolean {
  return MAJOR_OAUTH_PROVIDERS.includes(provider);
}

export function isEnterpriseOAuthProvider(provider: AuthOAuthProvider): boolean {
  return ENTERPRISE_OAUTH_PROVIDERS.includes(provider);
}

export function isOtherOAuthProvider(provider: AuthOAuthProvider): boolean {
  return OTHER_OAUTH_PROVIDERS.includes(provider);
}

export function isOIDCCompliant(provider: AuthOAuthProvider): boolean {
  return OIDC_COMPLIANT_PROVIDERS.includes(provider);
}

export function isPKCESupported(provider: AuthOAuthProvider): boolean {
  return PKCE_SUPPORTED_PROVIDERS.includes(provider);
}

export function getOAuthProviderLabel(provider: AuthOAuthProvider): string {
  const labels: Record<AuthOAuthProvider, string> = {
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

export function getOAuthProviderIcon(provider: AuthOAuthProvider): string {
  const icons: Record<AuthOAuthProvider, string> = {
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

export function getOAuthProviderColor(provider: AuthOAuthProvider): string {
  const colors: Record<AuthOAuthProvider, string> = {
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

export function getOAuthProviderType(provider: AuthOAuthProvider): 'oauth2' | 'oidc' | 'custom' {
  if (isOIDCCompliant(provider)) return 'oidc';
  if (isMajorOAuthProvider(provider)) return 'oauth2';
  return 'custom';
}
