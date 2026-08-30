/**
 * Authentication SSO Constants
 * Single Sign-On configuration, protocols, and constants
 */

import { HTTP_STATUS } from '../common/http-status.constants';

/**
 * SSO Protocols
 * Supported Single Sign-On protocols
 */
export const SSO_PROTOCOLS = {
  /** SAML 2.0 protocol */
  SAML: 'saml',
  /** OAuth 2.0 / OIDC protocol */
  OAUTH: 'oauth',
  /** OpenID Connect 1.0 protocol */
  OIDC: 'oidc',
  /** CAS (Central Authentication Service) protocol */
  CAS: 'cas',
  /** LDAP based SSO */
  LDAP: 'ldap',
  /** Active Directory Federation Services */
  ADFS: 'adfs',
} as const;

export type SsoProtocol = (typeof SSO_PROTOCOLS)[keyof typeof SSO_PROTOCOLS];

/**
 * SSO Status
 * Status of SSO authentication
 */
export const SSO_STATUS = {
  /** SSO authentication successful */
  SUCCESS: 'success',
  /** SSO authentication failed */
  FAILED: 'failed',
  /** SSO authentication pending */
  PENDING: 'pending',
  /** SSO authentication requires additional action */
  REQUIRES_ACTION: 'requires_action',
  /** SSO authentication cancelled by user */
  CANCELLED: 'cancelled',
  /** SSO authentication timed out */
  TIMEOUT: 'timeout',
  /** SSO authentication error */
  ERROR: 'error',
  /** SSO authentication session expired */
  SESSION_EXPIRED: 'session_expired',
} as const;

export type SsoStatus = (typeof SSO_STATUS)[keyof typeof SSO_STATUS];

/**
 * SSO Status HTTP Mapping
 * Maps SSO status to HTTP status codes
 */
export const SSO_STATUS_HTTP_MAP: Record<SsoStatus, number> = {
  [SSO_STATUS.SUCCESS]: HTTP_STATUS.OK,
  [SSO_STATUS.FAILED]: HTTP_STATUS.UNAUTHORIZED,
  [SSO_STATUS.PENDING]: HTTP_STATUS.ACCEPTED,
  [SSO_STATUS.REQUIRES_ACTION]: HTTP_STATUS.ACCEPTED,
  [SSO_STATUS.CANCELLED]: HTTP_STATUS.BAD_REQUEST,
  [SSO_STATUS.TIMEOUT]: HTTP_STATUS.REQUEST_TIMEOUT,
  [SSO_STATUS.ERROR]: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  [SSO_STATUS.SESSION_EXPIRED]: HTTP_STATUS.UNAUTHORIZED,
} as const;

/**
 * SSO Providers
 * Supported SSO identity providers
 */
export const SSO_PROVIDERS = {
  /** Google Workspace SSO */
  GOOGLE_WORKSPACE: 'google_workspace',
  /** Microsoft Azure AD */
  AZURE_AD: 'azure_ad',
  /** Okta SSO */
  OKTA: 'okta',
  /** Auth0 SSO */
  AUTH0: 'auth0',
  /** Keycloak SSO */
  KEYCLOAK: 'keycloak',
  /** OneLogin SSO */
  ONELOGIN: 'onelogin',
  /** PingIdentity SSO */
  PING_IDENTITY: 'ping_identity',
  /** Salesforce SSO */
  SALESFORCE: 'salesforce',
  /** AWS Cognito */
  AWS_COGNITO: 'aws_cognito',
  /** Facebook Workplace */
  FACEBOOK_WORKPLACE: 'facebook_workplace',
  /** Slack Enterprise */
  SLACK_ENTERPRISE: 'slack_enterprise',
  /** GitHub Enterprise */
  GITHUB_ENTERPRISE: 'github_enterprise',
  /** GitLab SSO */
  GITLAB: 'gitlab',
  /** Custom SAML provider */
  CUSTOM_SAML: 'custom_saml',
  /** Custom OIDC provider */
  CUSTOM_OIDC: 'custom_oidc',
} as const;

export type SsoProvider = (typeof SSO_PROVIDERS)[keyof typeof SSO_PROVIDERS];

/**
 * SSO Configuration
 * Default configuration values for SSO
 */
export const SSO_CONFIG = {
  /** SSO session expiry in seconds (8 hours) */
  SESSION_EXPIRY: 28800,
  /** SSO idle timeout in seconds (30 minutes) */
  IDLE_TIMEOUT: 1800,
  /** SSO callback timeout in seconds (5 minutes) */
  CALLBACK_TIMEOUT: 300,
  /** Maximum SSO attempts per hour */
  MAX_ATTEMPTS_PER_HOUR: 10,
  /** SSO token expiry in seconds (1 hour) */
  TOKEN_EXPIRY: 3600,
  /** Enable SSO auto-provisioning */
  ENABLE_AUTO_PROVISIONING: true,
  /** Enable SSO auto-linking */
  ENABLE_AUTO_LINKING: false,
  /** Maximum SSO sessions per user */
  MAX_SESSIONS_PER_USER: 5,
  /** SSO session validation interval in seconds */
  SESSION_VALIDATION_INTERVAL: 300,
} as const;

export type SsoConfig = (typeof SSO_CONFIG)[keyof typeof SSO_CONFIG];

/**
 * SSO Error Messages
 * Error messages for SSO failures
 */
export const SSO_ERRORS = {
  /** SSO authentication failed */
  AUTHENTICATION_FAILED: 'SSO authentication failed',
  /** SSO provider not configured */
  PROVIDER_NOT_CONFIGURED: 'SSO provider is not configured',
  /** Invalid SSO provider */
  INVALID_PROVIDER: 'Invalid SSO provider',
  /** Invalid SSO protocol */
  INVALID_PROTOCOL: 'Invalid SSO protocol',
  /** SSO session expired */
  SESSION_EXPIRED: 'SSO session has expired',
  /** SSO session invalid */
  SESSION_INVALID: 'SSO session is invalid',
  /** SSO user not found */
  USER_NOT_FOUND: 'SSO user not found in the system',
  /** SSO user already exists */
  USER_ALREADY_EXISTS: 'SSO user already exists with a different account',
  /** SSO provisioning failed */
  PROVISIONING_FAILED: 'SSO user provisioning failed',
  /** SSO account linking failed */
  LINKING_FAILED: 'SSO account linking failed',
  /** Invalid SAML response */
  INVALID_SAML_RESPONSE: 'Invalid SAML response from provider',
  /** Invalid OIDC response */
  INVALID_OIDC_RESPONSE: 'Invalid OIDC response from provider',
  /** SSO callback failed */
  CALLBACK_FAILED: 'SSO callback processing failed',
  /** SSO logout failed */
  LOGOUT_FAILED: 'SSO logout failed',
  /** SSO service unavailable */
  SERVICE_UNAVAILABLE: 'SSO service is currently unavailable',
  /** SSO rate limit exceeded */
  RATE_LIMIT_EXCEEDED: 'SSO rate limit exceeded',
  /** Invalid SSO token */
  INVALID_TOKEN: 'Invalid SSO token',
  /** SSO token expired */
  TOKEN_EXPIRED: 'SSO token has expired',
  /** SSO assertion invalid */
  INVALID_ASSERTION: 'Invalid SSO assertion',
  /** SSO attribute missing */
  ATTRIBUTE_MISSING: 'Required SSO attribute is missing',
  /** SSO acs URL invalid */
  INVALID_ACS_URL: 'Invalid ACS URL',
  /** SSO entity ID mismatch */
  ENTITY_ID_MISMATCH: 'Entity ID mismatch',
} as const;

export type SsoError = (typeof SSO_ERRORS)[keyof typeof SSO_ERRORS];

/**
 * SSO Success Messages
 * Success messages for SSO operations
 */
export const SSO_SUCCESS = {
  AUTHENTICATED: 'SSO authentication successful',
  LOGOUT: 'SSO logout successful',
  PROVISIONED: 'SSO user provisioned successfully',
  LINKED: 'SSO account linked successfully',
  SESSION_VALIDATED: 'SSO session validated successfully',
} as const;

export type SsoSuccess = (typeof SSO_SUCCESS)[keyof typeof SSO_SUCCESS];

/**
 * SSO Status Messages
 * Human-readable messages for each SSO status
 */
export const SSO_STATUS_MESSAGES: Record<SsoStatus, string> = {
  [SSO_STATUS.SUCCESS]: 'SSO authentication was successful',
  [SSO_STATUS.FAILED]: 'SSO authentication failed',
  [SSO_STATUS.PENDING]: 'SSO authentication is pending',
  [SSO_STATUS.REQUIRES_ACTION]: 'SSO authentication requires additional action',
  [SSO_STATUS.CANCELLED]: 'SSO authentication was cancelled',
  [SSO_STATUS.TIMEOUT]: 'SSO authentication timed out',
  [SSO_STATUS.ERROR]: 'SSO authentication encountered an error',
  [SSO_STATUS.SESSION_EXPIRED]: 'SSO session has expired',
} as const;

/**
 * SSO Provider Labels
 * Human-readable labels for each SSO provider
 */
export const SSO_PROVIDER_LABELS: Record<SsoProvider, string> = {
  [SSO_PROVIDERS.GOOGLE_WORKSPACE]: 'Google Workspace',
  [SSO_PROVIDERS.AZURE_AD]: 'Microsoft Azure AD',
  [SSO_PROVIDERS.OKTA]: 'Okta',
  [SSO_PROVIDERS.AUTH0]: 'Auth0',
  [SSO_PROVIDERS.KEYCLOAK]: 'Keycloak',
  [SSO_PROVIDERS.ONELOGIN]: 'OneLogin',
  [SSO_PROVIDERS.PING_IDENTITY]: 'PingIdentity',
  [SSO_PROVIDERS.SALESFORCE]: 'Salesforce',
  [SSO_PROVIDERS.AWS_COGNITO]: 'AWS Cognito',
  [SSO_PROVIDERS.FACEBOOK_WORKPLACE]: 'Facebook Workplace',
  [SSO_PROVIDERS.SLACK_ENTERPRISE]: 'Slack Enterprise',
  [SSO_PROVIDERS.GITHUB_ENTERPRISE]: 'GitHub Enterprise',
  [SSO_PROVIDERS.GITLAB]: 'GitLab',
  [SSO_PROVIDERS.CUSTOM_SAML]: 'Custom SAML Provider',
  [SSO_PROVIDERS.CUSTOM_OIDC]: 'Custom OIDC Provider',
} as const;

/**
 * SSO Provider Types
 * Types/categories of SSO providers
 */
export const SSO_PROVIDER_TYPES = {
  /** Major cloud providers */
  CLOUD: 'cloud',
  /** Enterprise identity providers */
  ENTERPRISE: 'enterprise',
  /** Developer platforms */
  DEVELOPER: 'developer',
  /** Custom self-hosted providers */
  CUSTOM: 'custom',
} as const;

export type SsoProviderType = (typeof SSO_PROVIDER_TYPES)[keyof typeof SSO_PROVIDER_TYPES];

/**
 * SSO Provider Type Map
 * Maps each SSO provider to its type
 */
export const SSO_PROVIDER_TYPE_MAP: Record<SsoProvider, SsoProviderType> = {
  [SSO_PROVIDERS.GOOGLE_WORKSPACE]: SSO_PROVIDER_TYPES.CLOUD,
  [SSO_PROVIDERS.AZURE_AD]: SSO_PROVIDER_TYPES.CLOUD,
  [SSO_PROVIDERS.OKTA]: SSO_PROVIDER_TYPES.ENTERPRISE,
  [SSO_PROVIDERS.AUTH0]: SSO_PROVIDER_TYPES.ENTERPRISE,
  [SSO_PROVIDERS.KEYCLOAK]: SSO_PROVIDER_TYPES.ENTERPRISE,
  [SSO_PROVIDERS.ONELOGIN]: SSO_PROVIDER_TYPES.ENTERPRISE,
  [SSO_PROVIDERS.PING_IDENTITY]: SSO_PROVIDER_TYPES.ENTERPRISE,
  [SSO_PROVIDERS.SALESFORCE]: SSO_PROVIDER_TYPES.CLOUD,
  [SSO_PROVIDERS.AWS_COGNITO]: SSO_PROVIDER_TYPES.CLOUD,
  [SSO_PROVIDERS.FACEBOOK_WORKPLACE]: SSO_PROVIDER_TYPES.CLOUD,
  [SSO_PROVIDERS.SLACK_ENTERPRISE]: SSO_PROVIDER_TYPES.ENTERPRISE,
  [SSO_PROVIDERS.GITHUB_ENTERPRISE]: SSO_PROVIDER_TYPES.DEVELOPER,
  [SSO_PROVIDERS.GITLAB]: SSO_PROVIDER_TYPES.DEVELOPER,
  [SSO_PROVIDERS.CUSTOM_SAML]: SSO_PROVIDER_TYPES.CUSTOM,
  [SSO_PROVIDERS.CUSTOM_OIDC]: SSO_PROVIDER_TYPES.CUSTOM,
} as const;

/**
 * SAML Bindings
 * SAML protocol bindings
 */
export const SAML_BINDINGS = {
  HTTP_REDIRECT: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
  HTTP_POST: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
  SOAP: 'urn:oasis:names:tc:SAML:2.0:bindings:SOAP',
  PAOS: 'urn:oasis:names:tc:SAML:2.0:bindings:PAOS',
} as const;

export type SamlBinding = (typeof SAML_BINDINGS)[keyof typeof SAML_BINDINGS];

/**
 * SAML NameID Formats
 * SAML NameID format types
 */
export const SAML_NAMEID_FORMATS = {
  PERSISTENT: 'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent',
  TRANSIENT: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
  EMAIL: 'urn:oasis:names:tc:SAML:2.0:nameid-format:emailAddress',
  ENTITY: 'urn:oasis:names:tc:SAML:2.0:nameid-format:entity',
  UNSPECIFIED: 'urn:oasis:names:tc:SAML:2.0:nameid-format:unspecified',
} as const;

export type SamlNameIdFormat = (typeof SAML_NAMEID_FORMATS)[keyof typeof SAML_NAMEID_FORMATS];

/**
 * Helper function to check if SSO protocol is valid
 */
export function isValidSsoProtocol(protocol: string): protocol is SsoProtocol {
  return Object.values(SSO_PROTOCOLS).includes(protocol as SsoProtocol);
}

/**
 * Helper function to check if SSO status is valid
 */
export function isValidSsoStatus(status: string): status is SsoStatus {
  return Object.values(SSO_STATUS).includes(status as SsoStatus);
}

/**
 * Helper function to check if SSO provider is valid
 */
export function isValidSsoProvider(provider: string): provider is SsoProvider {
  return Object.values(SSO_PROVIDERS).includes(provider as SsoProvider);
}

/**
 * Helper function to get SSO provider label
 */
export function getSsoProviderLabel(provider: SsoProvider): string {
  return SSO_PROVIDER_LABELS[provider] || 'Unknown Provider';
}

/**
 * Helper function to get SSO provider type
 */
export function getSsoProviderType(provider: SsoProvider): SsoProviderType {
  return SSO_PROVIDER_TYPE_MAP[provider] || SSO_PROVIDER_TYPES.CUSTOM;
}

/**
 * Helper function to get SSO status message
 */
export function getSsoStatusMessage(status: SsoStatus): string {
  return SSO_STATUS_MESSAGES[status] || 'Unknown SSO status';
}

/**
 * Helper function to get HTTP status for SSO status
 */
export function getHttpStatusForSsoStatus(status: SsoStatus): number {
  return SSO_STATUS_HTTP_MAP[status] || HTTP_STATUS.INTERNAL_SERVER_ERROR;
}

/**
 * Helper function to check if SSO status is successful
 */
export function isSsoStatusSuccessful(status: SsoStatus): boolean {
  return status === SSO_STATUS.SUCCESS;
}

/**
 * Helper function to check if SSO status is terminal
 * Terminal statuses are those that end the SSO flow
 * Includes: success, failed, cancelled, timeout, error
 * Excludes: pending, requires_action, session_expired
 */
export function isSsoStatusTerminal(status: SsoStatus): boolean {
  const terminalStatuses: SsoStatus[] = [
    SSO_STATUS.SUCCESS,
    SSO_STATUS.FAILED,
    SSO_STATUS.CANCELLED,
    SSO_STATUS.TIMEOUT,
    SSO_STATUS.ERROR,
  ];
  return terminalStatuses.includes(status);
}

/**
 * Helper function to check if SAML binding is valid
 */
export function isValidSamlBinding(binding: string): binding is SamlBinding {
  return Object.values(SAML_BINDINGS).includes(binding as SamlBinding);
}

/**
 * Helper function to check if SAML NameID format is valid
 */
export function isValidSamlNameIdFormat(format: string): format is SamlNameIdFormat {
  return Object.values(SAML_NAMEID_FORMATS).includes(format as SamlNameIdFormat);
}

/**
 * Helper function to get SSO provider protocols
 * Returns the protocols supported by a provider
 */
export function getSsoProviderProtocols(provider: SsoProvider): SsoProtocol[] {
  const protocolMap: Record<SsoProvider, SsoProtocol[]> = {
    [SSO_PROVIDERS.GOOGLE_WORKSPACE]: [SSO_PROTOCOLS.SAML, SSO_PROTOCOLS.OIDC],
    [SSO_PROVIDERS.AZURE_AD]: [SSO_PROTOCOLS.SAML, SSO_PROTOCOLS.OIDC],
    [SSO_PROVIDERS.OKTA]: [SSO_PROTOCOLS.SAML, SSO_PROTOCOLS.OIDC],
    [SSO_PROVIDERS.AUTH0]: [SSO_PROTOCOLS.OIDC, SSO_PROTOCOLS.SAML],
    [SSO_PROVIDERS.KEYCLOAK]: [SSO_PROTOCOLS.SAML, SSO_PROTOCOLS.OIDC],
    [SSO_PROVIDERS.ONELOGIN]: [SSO_PROTOCOLS.SAML],
    [SSO_PROVIDERS.PING_IDENTITY]: [SSO_PROTOCOLS.SAML, SSO_PROTOCOLS.OIDC],
    [SSO_PROVIDERS.SALESFORCE]: [SSO_PROTOCOLS.SAML],
    [SSO_PROVIDERS.AWS_COGNITO]: [SSO_PROTOCOLS.OIDC],
    [SSO_PROVIDERS.FACEBOOK_WORKPLACE]: [SSO_PROTOCOLS.SAML],
    [SSO_PROVIDERS.SLACK_ENTERPRISE]: [SSO_PROTOCOLS.SAML],
    [SSO_PROVIDERS.GITHUB_ENTERPRISE]: [SSO_PROTOCOLS.OIDC, SSO_PROTOCOLS.SAML],
    [SSO_PROVIDERS.GITLAB]: [SSO_PROTOCOLS.OIDC, SSO_PROTOCOLS.SAML],
    [SSO_PROVIDERS.CUSTOM_SAML]: [SSO_PROTOCOLS.SAML],
    [SSO_PROVIDERS.CUSTOM_OIDC]: [SSO_PROTOCOLS.OIDC],
  };
  return protocolMap[provider] || [];
}

/**
 * Helper function to check if SSO session has expired
 */
export function isSsoSessionExpired(createdAt: Date, config: typeof SSO_CONFIG): boolean {
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  return age >= config.SESSION_EXPIRY;
}

/**
 * Helper function to check if SSO session is idle
 */
export function isSsoSessionIdle(lastActivityAt: Date, config: typeof SSO_CONFIG): boolean {
  const now = Date.now();
  const idleTime = (now - lastActivityAt.getTime()) / 1000;
  return idleTime >= config.IDLE_TIMEOUT;
}

/**
 * Helper function to get remaining SSO session time in seconds
 */
export function getSsoSessionRemainingTime(createdAt: Date, config: typeof SSO_CONFIG): number {
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  const remaining = config.SESSION_EXPIRY - age;
  return Math.max(0, remaining);
}

/**
 * Helper function to get SAML binding label
 */
export function getSamlBindingLabel(binding: SamlBinding): string {
  const labels: Record<SamlBinding, string> = {
    [SAML_BINDINGS.HTTP_REDIRECT]: 'HTTP Redirect',
    [SAML_BINDINGS.HTTP_POST]: 'HTTP POST',
    [SAML_BINDINGS.SOAP]: 'SOAP',
    [SAML_BINDINGS.PAOS]: 'PAOS',
  };
  return labels[binding] || 'Unknown Binding';
}

/**
 * Helper function to get SAML NameID format label
 */
export function getSamlNameIdFormatLabel(format: SamlNameIdFormat): string {
  const labels: Record<SamlNameIdFormat, string> = {
    [SAML_NAMEID_FORMATS.PERSISTENT]: 'Persistent',
    [SAML_NAMEID_FORMATS.TRANSIENT]: 'Transient',
    [SAML_NAMEID_FORMATS.EMAIL]: 'Email Address',
    [SAML_NAMEID_FORMATS.ENTITY]: 'Entity',
    [SAML_NAMEID_FORMATS.UNSPECIFIED]: 'Unspecified',
  };
  return labels[format] || 'Unknown Format';
}
