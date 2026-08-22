/**
 * Authentication SSO Provider Constants
 * Single Sign-On authentication providers
 */

export const AUTH_SSO_PROVIDER = {
  // Enterprise SSO providers
  SAML: 'saml',
  LDAP: 'ldap',
  KERBEROS: 'kerberos',
  OAUTH2: 'oauth2',
  OIDC: 'oidc',
  CAS: 'cas',
  WS_FEDERATION: 'ws_federation',

  // Enterprise identity providers
  OKTA: 'okta',
  AZURE_AD: 'azure_ad',
  GOOGLE_WORKSPACE: 'google_workspace',
  ONELOGIN: 'onelogin',
  PING_IDENTITY: 'ping_identity',
  ADFS: 'adfs',
  KEYCLOAK: 'keycloak',
} as const;

export type AuthSSOProvider = (typeof AUTH_SSO_PROVIDER)[keyof typeof AUTH_SSO_PROVIDER];

export const ENTERPRISE_SSO_PROVIDERS: AuthSSOProvider[] = [
  AUTH_SSO_PROVIDER.OKTA,
  AUTH_SSO_PROVIDER.AZURE_AD,
  AUTH_SSO_PROVIDER.GOOGLE_WORKSPACE,
  AUTH_SSO_PROVIDER.ONELOGIN,
  AUTH_SSO_PROVIDER.PING_IDENTITY,
  AUTH_SSO_PROVIDER.ADFS,
  AUTH_SSO_PROVIDER.KEYCLOAK,
];

export const SAML_PROVIDERS: AuthSSOProvider[] = [
  AUTH_SSO_PROVIDER.SAML,
  AUTH_SSO_PROVIDER.OKTA,
  AUTH_SSO_PROVIDER.AZURE_AD,
  AUTH_SSO_PROVIDER.ONELOGIN,
  AUTH_SSO_PROVIDER.PING_IDENTITY,
  AUTH_SSO_PROVIDER.ADFS,
];

export const OIDC_PROVIDERS: AuthSSOProvider[] = [
  AUTH_SSO_PROVIDER.OIDC,
  AUTH_SSO_PROVIDER.OKTA,
  AUTH_SSO_PROVIDER.AZURE_AD,
  AUTH_SSO_PROVIDER.GOOGLE_WORKSPACE,
  AUTH_SSO_PROVIDER.KEYCLOAK,
];

export const LDAP_PROVIDERS: AuthSSOProvider[] = [
  AUTH_SSO_PROVIDER.LDAP,
  AUTH_SSO_PROVIDER.AZURE_AD,
];

export const SSO_PROVIDERS_LIST: AuthSSOProvider[] = [
  ...ENTERPRISE_SSO_PROVIDERS,
  AUTH_SSO_PROVIDER.SAML,
  AUTH_SSO_PROVIDER.LDAP,
  AUTH_SSO_PROVIDER.KERBEROS,
  AUTH_SSO_PROVIDER.OAUTH2,
  AUTH_SSO_PROVIDER.OIDC,
  AUTH_SSO_PROVIDER.CAS,
  AUTH_SSO_PROVIDER.WS_FEDERATION,
];

export function isEnterpriseSSOProvider(provider: AuthSSOProvider): boolean {
  return ENTERPRISE_SSO_PROVIDERS.includes(provider);
}

export function isSAMLProvider(provider: AuthSSOProvider): boolean {
  return SAML_PROVIDERS.includes(provider);
}

export function isOIDCProvider(provider: AuthSSOProvider): boolean {
  return OIDC_PROVIDERS.includes(provider);
}

export function isLDAPProvider(provider: AuthSSOProvider): boolean {
  return LDAP_PROVIDERS.includes(provider);
}

export function getSSOProviderLabel(provider: AuthSSOProvider): string {
  const labels: Record<AuthSSOProvider, string> = {
    [AUTH_SSO_PROVIDER.SAML]: 'SAML 2.0',
    [AUTH_SSO_PROVIDER.LDAP]: 'LDAP',
    [AUTH_SSO_PROVIDER.KERBEROS]: 'Kerberos',
    [AUTH_SSO_PROVIDER.OAUTH2]: 'OAuth 2.0',
    [AUTH_SSO_PROVIDER.OIDC]: 'OpenID Connect',
    [AUTH_SSO_PROVIDER.CAS]: 'CAS',
    [AUTH_SSO_PROVIDER.WS_FEDERATION]: 'WS-Federation',
    [AUTH_SSO_PROVIDER.OKTA]: 'Okta',
    [AUTH_SSO_PROVIDER.AZURE_AD]: 'Azure AD',
    [AUTH_SSO_PROVIDER.GOOGLE_WORKSPACE]: 'Google Workspace',
    [AUTH_SSO_PROVIDER.ONELOGIN]: 'OneLogin',
    [AUTH_SSO_PROVIDER.PING_IDENTITY]: 'Ping Identity',
    [AUTH_SSO_PROVIDER.ADFS]: 'ADFS',
    [AUTH_SSO_PROVIDER.KEYCLOAK]: 'Keycloak',
  };

  return labels[provider] || 'Unknown Provider';
}

export function getSSOProviderIcon(provider: AuthSSOProvider): string {
  const icons: Record<AuthSSOProvider, string> = {
    [AUTH_SSO_PROVIDER.SAML]: '🔐',
    [AUTH_SSO_PROVIDER.LDAP]: '📋',
    [AUTH_SSO_PROVIDER.KERBEROS]: '🛡️',
    [AUTH_SSO_PROVIDER.OAUTH2]: '🔑',
    [AUTH_SSO_PROVIDER.OIDC]: '🔓',
    [AUTH_SSO_PROVIDER.CAS]: '🎫',
    [AUTH_SSO_PROVIDER.WS_FEDERATION]: '🌐',
    [AUTH_SSO_PROVIDER.OKTA]: '🔒',
    [AUTH_SSO_PROVIDER.AZURE_AD]: '☁️',
    [AUTH_SSO_PROVIDER.GOOGLE_WORKSPACE]: '📧',
    [AUTH_SSO_PROVIDER.ONELOGIN]: '🔑',
    [AUTH_SSO_PROVIDER.PING_IDENTITY]: '🔗',
    [AUTH_SSO_PROVIDER.ADFS]: '🪟',
    [AUTH_SSO_PROVIDER.KEYCLOAK]: '🔓',
  };

  return icons[provider] || '🔑';
}

export function getSSOProviderColor(provider: AuthSSOProvider): string {
  const colors: Record<AuthSSOProvider, string> = {
    [AUTH_SSO_PROVIDER.SAML]: '#3B82F6',
    [AUTH_SSO_PROVIDER.LDAP]: '#F59E0B',
    [AUTH_SSO_PROVIDER.KERBEROS]: '#8B5CF6',
    [AUTH_SSO_PROVIDER.OAUTH2]: '#10B981',
    [AUTH_SSO_PROVIDER.OIDC]: '#6366F1',
    [AUTH_SSO_PROVIDER.CAS]: '#EC4899',
    [AUTH_SSO_PROVIDER.WS_FEDERATION]: '#06B6D4',
    [AUTH_SSO_PROVIDER.OKTA]: '#0064B5',
    [AUTH_SSO_PROVIDER.AZURE_AD]: '#0078D4',
    [AUTH_SSO_PROVIDER.GOOGLE_WORKSPACE]: '#4285F4',
    [AUTH_SSO_PROVIDER.ONELOGIN]: '#4A154B',
    [AUTH_SSO_PROVIDER.PING_IDENTITY]: '#00A1E0',
    [AUTH_SSO_PROVIDER.ADFS]: '#0078D4',
    [AUTH_SSO_PROVIDER.KEYCLOAK]: '#F59E0B',
  };

  return colors[provider] || '#6B7280';
}

export function getSSOProviderType(
  provider: AuthSSOProvider
): 'saml' | 'oidc' | 'ldap' | 'kerberos' | 'other' {
  if (isSAMLProvider(provider)) return 'saml';
  if (isOIDCProvider(provider)) return 'oidc';
  if (isLDAPProvider(provider)) return 'ldap';
  if (provider === AUTH_SSO_PROVIDER.KERBEROS) return 'kerberos';
  return 'other';
}
