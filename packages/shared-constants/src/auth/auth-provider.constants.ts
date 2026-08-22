/**
 * Authentication Provider Constants
 * Authentication providers for social and external login
 */

export const AUTH_PROVIDER = {
  // Local provider
  LOCAL: 'local',

  // Social providers
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  GITHUB: 'github',
  APPLE: 'apple',
  MICROSOFT: 'microsoft',

  // Bangladesh local providers
  BANGLADESH_GOV: 'bangladesh_gov',
  BANGLADESH_BANK: 'bangladesh_bank',
  BKASH: 'bkash',
  NAGAD: 'nogod',
  ROCKET: 'rocket',

  // Enterprise providers
  OKTA: 'okta',
  AZURE_AD: 'azure_ad',
  GOOGLE_WORKSPACE: 'google_workspace',
  MICROSOFT_365: 'microsoft_365',

  // SSO providers
  SAML_SSO: 'saml_sso',
  LDAP_SSO: 'ldap_sso',
} as const;

export type AuthProvider = (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];

export const SOCIAL_PROVIDERS: AuthProvider[] = [
  AUTH_PROVIDER.GOOGLE,
  AUTH_PROVIDER.FACEBOOK,
  AUTH_PROVIDER.TWITTER,
  AUTH_PROVIDER.LINKEDIN,
  AUTH_PROVIDER.GITHUB,
  AUTH_PROVIDER.APPLE,
  AUTH_PROVIDER.MICROSOFT,
];

export const BANGLADESH_PROVIDERS: AuthProvider[] = [
  AUTH_PROVIDER.BANGLADESH_GOV,
  AUTH_PROVIDER.BANGLADESH_BANK,
  AUTH_PROVIDER.BKASH,
  AUTH_PROVIDER.NAGAD,
  AUTH_PROVIDER.ROCKET,
];

export const ENTERPRISE_PROVIDERS: AuthProvider[] = [
  AUTH_PROVIDER.OKTA,
  AUTH_PROVIDER.AZURE_AD,
  AUTH_PROVIDER.GOOGLE_WORKSPACE,
  AUTH_PROVIDER.MICROSOFT_365,
];

export const SSO_PROVIDERS: AuthProvider[] = [AUTH_PROVIDER.SAML_SSO, AUTH_PROVIDER.LDAP_SSO];

export function isSocialProvider(provider: AuthProvider): boolean {
  return SOCIAL_PROVIDERS.includes(provider);
}

export function isBangladeshProvider(provider: AuthProvider): boolean {
  return BANGLADESH_PROVIDERS.includes(provider);
}

export function isEnterpriseProvider(provider: AuthProvider): boolean {
  return ENTERPRISE_PROVIDERS.includes(provider);
}

export function isSSOProvider(provider: AuthProvider): boolean {
  return SSO_PROVIDERS.includes(provider);
}

export function getProviderLabel(provider: AuthProvider): string {
  const labels: Record<AuthProvider, string> = {
    [AUTH_PROVIDER.LOCAL]: 'Local',
    [AUTH_PROVIDER.GOOGLE]: 'Google',
    [AUTH_PROVIDER.FACEBOOK]: 'Facebook',
    [AUTH_PROVIDER.TWITTER]: 'Twitter',
    [AUTH_PROVIDER.LINKEDIN]: 'LinkedIn',
    [AUTH_PROVIDER.GITHUB]: 'GitHub',
    [AUTH_PROVIDER.APPLE]: 'Apple',
    [AUTH_PROVIDER.MICROSOFT]: 'Microsoft',
    [AUTH_PROVIDER.BANGLADESH_GOV]: 'Bangladesh Government',
    [AUTH_PROVIDER.BANGLADESH_BANK]: 'Bangladesh Bank',
    [AUTH_PROVIDER.BKASH]: 'bKash',
    [AUTH_PROVIDER.NAGAD]: 'Nagad',
    [AUTH_PROVIDER.ROCKET]: 'Rocket',
    [AUTH_PROVIDER.OKTA]: 'Okta',
    [AUTH_PROVIDER.AZURE_AD]: 'Azure AD',
    [AUTH_PROVIDER.GOOGLE_WORKSPACE]: 'Google Workspace',
    [AUTH_PROVIDER.MICROSOFT_365]: 'Microsoft 365',
    [AUTH_PROVIDER.SAML_SSO]: 'SAML SSO',
    [AUTH_PROVIDER.LDAP_SSO]: 'LDAP SSO',
  };

  return labels[provider] || 'Unknown Provider';
}

export function getProviderIcon(provider: AuthProvider): string {
  const icons: Record<AuthProvider, string> = {
    [AUTH_PROVIDER.LOCAL]: '🔐',
    [AUTH_PROVIDER.GOOGLE]: '🅶',
    [AUTH_PROVIDER.FACEBOOK]: '📘',
    [AUTH_PROVIDER.TWITTER]: '🐦',
    [AUTH_PROVIDER.LINKEDIN]: '💼',
    [AUTH_PROVIDER.GITHUB]: '🐙',
    [AUTH_PROVIDER.APPLE]: '🍎',
    [AUTH_PROVIDER.MICROSOFT]: '💻',
    [AUTH_PROVIDER.BANGLADESH_GOV]: '🇧🇩',
    [AUTH_PROVIDER.BANGLADESH_BANK]: '🏦',
    [AUTH_PROVIDER.BKASH]: '📱',
    [AUTH_PROVIDER.NAGAD]: '📱',
    [AUTH_PROVIDER.ROCKET]: '📱',
    [AUTH_PROVIDER.OKTA]: '🔒',
    [AUTH_PROVIDER.AZURE_AD]: '☁️',
    [AUTH_PROVIDER.GOOGLE_WORKSPACE]: '📧',
    [AUTH_PROVIDER.MICROSOFT_365]: '📊',
    [AUTH_PROVIDER.SAML_SSO]: '🔑',
    [AUTH_PROVIDER.LDAP_SSO]: '🔐',
  };

  return icons[provider] || '🔑';
}

export function getProviderColor(provider: AuthProvider): string {
  const colors: Record<AuthProvider, string> = {
    [AUTH_PROVIDER.LOCAL]: '#6B7280',
    [AUTH_PROVIDER.GOOGLE]: '#4285F4',
    [AUTH_PROVIDER.FACEBOOK]: '#1877F2',
    [AUTH_PROVIDER.TWITTER]: '#1DA1F2',
    [AUTH_PROVIDER.LINKEDIN]: '#0A66C2',
    [AUTH_PROVIDER.GITHUB]: '#181717',
    [AUTH_PROVIDER.APPLE]: '#000000',
    [AUTH_PROVIDER.MICROSOFT]: '#00A4EF',
    [AUTH_PROVIDER.BANGLADESH_GOV]: '#006A4E',
    [AUTH_PROVIDER.BANGLADESH_BANK]: '#003366',
    [AUTH_PROVIDER.BKASH]: '#D31D3D',
    [AUTH_PROVIDER.NAGAD]: '#F26925',
    [AUTH_PROVIDER.ROCKET]: '#006A4E',
    [AUTH_PROVIDER.OKTA]: '#0064B5',
    [AUTH_PROVIDER.AZURE_AD]: '#0078D4',
    [AUTH_PROVIDER.GOOGLE_WORKSPACE]: '#4285F4',
    [AUTH_PROVIDER.MICROSOFT_365]: '#00A4EF',
    [AUTH_PROVIDER.SAML_SSO]: '#4A5568',
    [AUTH_PROVIDER.LDAP_SSO]: '#2D3748',
  };

  return colors[provider] || '#6B7280';
}
