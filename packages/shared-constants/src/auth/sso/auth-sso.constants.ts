/**
 * Authentication SSO Constants
 * Single Sign-On authentication configuration
 */

import { AUTH_SSO_PROVIDER } from './auth-sso-provider.constants';
import { AUTH_SSO_STATUS } from './auth-sso-status.constants';

// Define PROVIDER_CONFIGS first
export const SSO_PROVIDER_CONFIGS = {
  SAML: {
    protocol: 'saml',
    version: '2.0',
    binding: 'redirect',
    nameIdFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent',
    wantAssertionsSigned: true,
    wantResponseSigned: true,
    acsUrl: '/sso/saml/acs',
    entityId: 'https://vubon.com.bd',
    metadataUrl: 'https://vubon.com.bd/sso/saml/metadata',
    logoutUrl: '/sso/saml/logout',
  },
  LDAP: {
    protocol: 'ldap',
    version: '3',
    port: 389,
    securePort: 636,
    baseDN: 'dc=vubon,dc=com,dc=bd',
    bindDN: 'cn=admin,dc=vubon,dc=com,dc=bd',
    userSearchBase: 'ou=users,dc=vubon,dc=com,dc=bd',
    groupSearchBase: 'ou=groups,dc=vubon,dc=com,dc=bd',
    attributes: {
      username: 'uid',
      email: 'mail',
      firstName: 'givenName',
      lastName: 'sn',
      groups: 'memberOf',
    },
  },
  KERBEROS: {
    protocol: 'kerberos',
    version: '5',
    realm: 'VUBON.COM.BD',
    kdc: 'kdc.vubon.com.bd',
    adminServer: 'admin.vubon.com.bd',
    passwordServer: 'password.vubon.com.bd',
    keytabPath: '/etc/krb5.keytab',
    principal: 'HTTP/vubon.com.bd@VUBON.COM.BD',
  },
  OAUTH2: {
    protocol: 'oauth2',
    version: '2.0',
    authorizationEndpoint: '/oauth/authorize',
    tokenEndpoint: '/oauth/token',
    userInfoEndpoint: '/oauth/userinfo',
    jwksEndpoint: '/oauth/jwks',
    revocationEndpoint: '/oauth/revoke',
    introspectionEndpoint: '/oauth/introspect',
  },
  OIDC: {
    protocol: 'oidc',
    version: '1.0',
    discoveryEndpoint: '/.well-known/openid-configuration',
    authorizationEndpoint: '/authorize',
    tokenEndpoint: '/token',
    userInfoEndpoint: '/userinfo',
    jwksEndpoint: '/jwks',
    revocationEndpoint: '/revoke',
    introspectionEndpoint: '/introspect',
    endSessionEndpoint: '/end_session',
  },
} as const;

// Define PROTOCOLS
export const SSO_PROTOCOLS = {
  SAML: 'saml',
  LDAP: 'ldap',
  KERBEROS: 'kerberos',
  OAUTH2: 'oauth2',
  OIDC: 'oidc',
  CAS: 'cas',
  WS_FEDERATION: 'ws_federation',
} as const;

// Define SAML_BINDINGS
export const SSO_SAML_BINDINGS = {
  REDIRECT: 'redirect',
  POST: 'post',
  ARTIFACT: 'artifact',
  SOAP: 'soap',
  PAOS: 'paos',
} as const;

// Define SAML_NAME_ID_FORMATS
export const SSO_SAML_NAME_ID_FORMATS = {
  PERSISTENT: 'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent',
  TRANSIENT: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
  EMAIL: 'urn:oasis:names:tc:SAML:2.0:nameid-format:emailAddress',
  UNSPECIFIED: 'urn:oasis:names:tc:SAML:2.0:nameid-format:unspecified',
  X509_SUBJECT: 'urn:oasis:names:tc:SAML:2.0:nameid-format:X509SubjectName',
  WINDOWS_DOMAIN: 'urn:oasis:names:tc:SAML:2.0:nameid-format:WindowsDomainQualifiedName',
  KERBEROS: 'urn:oasis:names:tc:SAML:2.0:nameid-format:kerberos',
  ENTITY: 'urn:oasis:names:tc:SAML:2.0:nameid-format:entity',
} as const;

// Define LDAP_ATTRIBUTES
export const SSO_LDAP_ATTRIBUTES = {
  USERNAME: 'uid',
  EMAIL: 'mail',
  FIRST_NAME: 'givenName',
  LAST_NAME: 'sn',
  DISPLAY_NAME: 'displayName',
  GROUPS: 'memberOf',
  EMPLOYEE_ID: 'employeeNumber',
  DEPARTMENT: 'department',
  TITLE: 'title',
  PHONE: 'telephoneNumber',
  MOBILE: 'mobile',
  ADDRESS: 'postalAddress',
} as const;

// Define SECURITY
export const SSO_SECURITY = {
  SESSION_TIMEOUT: 3600,
  SINGLE_LOGOUT: true,
  FORCE_AUTH: false,
  PASSIVE_AUTH: false,
  ENCRYPT_ASSERTIONS: true,
  SIGN_ASSERTIONS: true,
  VALIDATE_SIGNATURES: true,
  ALLOW_UNSIGNED: false,
} as const;

// Define SESSION
export const SSO_SESSION = {
  MAX_AGE: 3600,
  EXTEND_ON_ACTIVITY: true,
  MAX_SESSIONS_PER_USER: 5,
  INACTIVITY_TIMEOUT: 1800,
} as const;

// Define RATE_LIMIT
export const SSO_RATE_LIMIT = {
  MAX_ATTEMPTS: 5,
  WINDOW_MS: 900000,
  BLOCK_DURATION: 3600000,
} as const;

// Define DEFAULTS
export const SSO_DEFAULTS = {
  STATUS: AUTH_SSO_STATUS.PENDING,
  PROVIDER: AUTH_SSO_PROVIDER.SAML,
  PROTOCOL: SSO_PROTOCOLS.SAML,
  BINDING: SSO_SAML_BINDINGS.REDIRECT,
  NAME_ID_FORMAT: SSO_SAML_NAME_ID_FORMATS.PERSISTENT,
} as const;

// Define EVENTS
export const SSO_EVENTS = {
  AUTH_STARTED: 'sso:auth_started',
  AUTH_SUCCESS: 'sso:auth_success',
  AUTH_FAILED: 'sso:auth_failed',
  AUTH_CANCELLED: 'sso:auth_cancelled',
  LOGOUT_STARTED: 'sso:logout_started',
  LOGOUT_SUCCESS: 'sso:logout_success',
  LOGOUT_FAILED: 'sso:logout_failed',
  METADATA_FETCHED: 'sso:metadata_fetched',
  METADATA_FAILED: 'sso:metadata_failed',
  ASSERTION_VALIDATED: 'sso:assertion_validated',
  ASSERTION_INVALID: 'sso:assertion_invalid',
  SESSION_CREATED: 'sso:session_created',
  SESSION_DESTROYED: 'sso:session_destroyed',
  SESSION_EXPIRED: 'sso:session_expired',
} as const;

// Main AUTH_SSO object
export const AUTH_SSO = {
  CONFIG: {
    PROTOCOLS: SSO_PROTOCOLS,
    SAML_BINDINGS: SSO_SAML_BINDINGS,
    SAML_NAME_ID_FORMATS: SSO_SAML_NAME_ID_FORMATS,
    LDAP_ATTRIBUTES: SSO_LDAP_ATTRIBUTES,
    SECURITY: SSO_SECURITY,
    SESSION: SSO_SESSION,
    RATE_LIMIT: SSO_RATE_LIMIT,
    DEFAULTS: SSO_DEFAULTS,
  },
  PROVIDERS: AUTH_SSO_PROVIDER,
  PROVIDER_CONFIGS: SSO_PROVIDER_CONFIGS,
  EVENTS: SSO_EVENTS,
  DEFAULTS: SSO_DEFAULTS,
} as const;

export type AuthSSOConfig = typeof AUTH_SSO.CONFIG;
export type AuthSSOEvent = (typeof SSO_EVENTS)[keyof typeof SSO_EVENTS];
export type AuthSSODefaults = typeof SSO_DEFAULTS;
export type SSOProviderConfig = (typeof SSO_PROVIDER_CONFIGS)[keyof typeof SSO_PROVIDER_CONFIGS];

export function getSSOProviderConfig(
  provider: (typeof AUTH_SSO_PROVIDER)[keyof typeof AUTH_SSO_PROVIDER]
): SSOProviderConfig {
  const config = SSO_PROVIDER_CONFIGS[provider as keyof typeof SSO_PROVIDER_CONFIGS];
  if (!config) {
    throw new Error(`SSO provider configuration not found for: ${provider}`);
  }
  return config;
}

export function getSSOProtocol(
  provider: (typeof AUTH_SSO_PROVIDER)[keyof typeof AUTH_SSO_PROVIDER]
): string {
  const config = getSSOProviderConfig(provider);
  return config.protocol;
}

export function getSSOProviderLabel(
  provider: (typeof AUTH_SSO_PROVIDER)[keyof typeof AUTH_SSO_PROVIDER]
): string {
  const labels: Record<string, string> = {
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

export function getSSOProviderIcon(
  provider: (typeof AUTH_SSO_PROVIDER)[keyof typeof AUTH_SSO_PROVIDER]
): string {
  const icons: Record<string, string> = {
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

export function getSSOProviderColor(
  provider: (typeof AUTH_SSO_PROVIDER)[keyof typeof AUTH_SSO_PROVIDER]
): string {
  const colors: Record<string, string> = {
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

export function getSSOProtocolLabel(protocol: string): string {
  const labels: Record<string, string> = {
    [SSO_PROTOCOLS.SAML]: 'SAML 2.0',
    [SSO_PROTOCOLS.LDAP]: 'LDAP',
    [SSO_PROTOCOLS.KERBEROS]: 'Kerberos',
    [SSO_PROTOCOLS.OAUTH2]: 'OAuth 2.0',
    [SSO_PROTOCOLS.OIDC]: 'OpenID Connect',
    [SSO_PROTOCOLS.CAS]: 'CAS',
    [SSO_PROTOCOLS.WS_FEDERATION]: 'WS-Federation',
  };

  return labels[protocol] || 'Unknown Protocol';
}

export function getSAMLNameIdFormatLabel(format: string): string {
  const labels: Record<string, string> = {
    [SSO_SAML_NAME_ID_FORMATS.PERSISTENT]: 'Persistent',
    [SSO_SAML_NAME_ID_FORMATS.TRANSIENT]: 'Transient',
    [SSO_SAML_NAME_ID_FORMATS.EMAIL]: 'Email Address',
    [SSO_SAML_NAME_ID_FORMATS.UNSPECIFIED]: 'Unspecified',
    [SSO_SAML_NAME_ID_FORMATS.X509_SUBJECT]: 'X.509 Subject',
    [SSO_SAML_NAME_ID_FORMATS.WINDOWS_DOMAIN]: 'Windows Domain',
    [SSO_SAML_NAME_ID_FORMATS.KERBEROS]: 'Kerberos',
    [SSO_SAML_NAME_ID_FORMATS.ENTITY]: 'Entity',
  };

  return labels[format] || 'Unknown Format';
}

export function getSAMLBindingLabel(binding: string): string {
  const labels: Record<string, string> = {
    [SSO_SAML_BINDINGS.REDIRECT]: 'HTTP Redirect',
    [SSO_SAML_BINDINGS.POST]: 'HTTP POST',
    [SSO_SAML_BINDINGS.ARTIFACT]: 'Artifact',
    [SSO_SAML_BINDINGS.SOAP]: 'SOAP',
    [SSO_SAML_BINDINGS.PAOS]: 'PAOS',
  };

  return labels[binding] || 'Unknown Binding';
}

export function getLDAPAttributeLabel(attribute: string): string {
  const labels: Record<string, string> = {
    [SSO_LDAP_ATTRIBUTES.USERNAME]: 'Username',
    [SSO_LDAP_ATTRIBUTES.EMAIL]: 'Email',
    [SSO_LDAP_ATTRIBUTES.FIRST_NAME]: 'First Name',
    [SSO_LDAP_ATTRIBUTES.LAST_NAME]: 'Last Name',
    [SSO_LDAP_ATTRIBUTES.DISPLAY_NAME]: 'Display Name',
    [SSO_LDAP_ATTRIBUTES.GROUPS]: 'Groups',
    [SSO_LDAP_ATTRIBUTES.EMPLOYEE_ID]: 'Employee ID',
    [SSO_LDAP_ATTRIBUTES.DEPARTMENT]: 'Department',
    [SSO_LDAP_ATTRIBUTES.TITLE]: 'Title',
    [SSO_LDAP_ATTRIBUTES.PHONE]: 'Phone',
    [SSO_LDAP_ATTRIBUTES.MOBILE]: 'Mobile',
    [SSO_LDAP_ATTRIBUTES.ADDRESS]: 'Address',
  };

  return labels[attribute] || 'Unknown Attribute';
}

export function getSSOSessionMaxAge(): number {
  return SSO_SESSION.MAX_AGE;
}

export function getSSOSessionInactivityTimeout(): number {
  return SSO_SESSION.INACTIVITY_TIMEOUT;
}

export function getSSOMaxSessionsPerUser(): number {
  return SSO_SESSION.MAX_SESSIONS_PER_USER;
}

export function isSSOProviderSupported(provider: string): boolean {
  return Object.keys(SSO_PROVIDER_CONFIGS).includes(provider);
}

export function getSupportedSSOProviders(): string[] {
  return Object.keys(SSO_PROVIDER_CONFIGS);
}
