/**
 * Authentication SSO Types
 * Types for Single Sign-On configuration, protocols, and authentication
 */

import type {
  SsoProtocol,
  SsoStatus,
  SsoProvider,
  SsoError,
  SsoSuccess,
  SsoProviderType,
  SamlBinding,
  SamlNameIdFormat,
} from '@vubon/shared-constants';
import {
  SSO_PROTOCOLS,
  SSO_STATUS,
  SSO_PROVIDERS,
  SSO_CONFIG,
  SSO_ERRORS,
  SSO_SUCCESS,
  SSO_PROVIDER_TYPES,
  SSO_PROVIDER_TYPE_MAP,
  SSO_PROVIDER_LABELS,
  SSO_STATUS_MESSAGES,
  SAML_BINDINGS,
  SAML_NAMEID_FORMATS,
} from '@vubon/shared-constants';
import type { ID, Timestamp, Url } from '../common/core-primitives.types';

// ============================================================
// SSO CONFIGURATION
// ============================================================

/**
 * SSO provider configuration
 */
export interface AuthSsoProviderConfig {
  /** Provider name */
  provider: SsoProvider;
  /** Provider display name */
  displayName: string;
  /** Provider type */
  type: SsoProviderType;
  /** SSO protocol */
  protocol: SsoProtocol;
  /** Whether provider is enabled */
  isEnabled: boolean;
  /** Whether provider is configured */
  isConfigured: boolean;
  /** Entity ID (for SAML) */
  entityId?: string;
  /** ACS URL (for SAML) */
  acsUrl?: Url;
  /** Single logout URL */
  sloUrl?: Url;
  /** Metadata URL */
  metadataUrl?: Url;
  /** Client ID (for OIDC) */
  clientId?: string;
  /** Client secret (encrypted) */
  clientSecret?: string;
  /** Authorization endpoint (for OIDC) */
  authorizationEndpoint?: Url;
  /** Token endpoint (for OIDC) */
  tokenEndpoint?: Url;
  /** User info endpoint (for OIDC) */
  userInfoEndpoint?: Url;
  /** JWKS URI (for OIDC) */
  jwksUri?: Url;
  /** Allowed redirect URIs */
  redirectUris?: Url[];
  /** Allowed scopes */
  scopes?: string[];
  /** SAML bindings (for SAML) */
  samlBindings?: SamlBinding[];
  /** SAML NameID format (for SAML) */
  samlNameIdFormat?: SamlNameIdFormat;
  /** Certificate (for SAML) */
  certificate?: string;
  /** Private key (encrypted) */
  privateKey?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
  /** When the configuration was created */
  createdAt: Timestamp;
  /** When the configuration was updated */
  updatedAt: Timestamp;
}

// ============================================================
// SSO SESSION
// ============================================================

/**
 * SSO session record
 */
export interface AuthSsoSession {
  /** Unique session ID */
  id: ID;
  /** User ID */
  userId: ID;
  /** SSO provider */
  provider: SsoProvider;
  /** SSO protocol */
  protocol: SsoProtocol;
  /** SSO status */
  status: SsoStatus;
  /** Session token (hashed) */
  tokenHash: string;
  /** SAML session index (for SAML) */
  samlSessionIndex?: string;
  /** ID token (for OIDC) */
  idToken?: string;
  /** Access token (encrypted) */
  accessToken?: string;
  /** Refresh token (encrypted) */
  refreshToken?: string;
  /** Token expiry */
  tokenExpiresAt?: Timestamp;
  /** IP address of the session */
  ipAddress: string;
  /** User agent of the session */
  userAgent: string;
  /** When the session was created */
  createdAt: Timestamp;
  /** When the session was last active */
  lastActivityAt: Timestamp;
  /** When the session expires */
  expiresAt: Timestamp;
  /** When the session was terminated (if applicable) */
  terminatedAt?: Timestamp;
  /** Whether the session is active */
  isActive: boolean;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

// ============================================================
// SSO AUTH REQUEST
// ============================================================

/**
 * SSO authentication request
 */
export interface AuthSsoAuthRequest {
  /** SSO provider */
  provider: SsoProvider;
  /** Redirect URI after authentication */
  redirectUri?: Url;
  /** Relay state (for SAML) */
  relayState?: string;
  /** Additional parameters */
  params?: Record<string, string>;
}

/**
 * SSO callback request
 */
export interface AuthSsoCallbackRequest {
  /** SSO provider */
  provider: SsoProvider;
  /** SAML response (for SAML) */
  samlResponse?: string;
  /** Relay state (for SAML) */
  relayState?: string;
  /** Authorization code (for OIDC) */
  code?: string;
  /** State parameter (for OIDC) */
  state?: string;
  /** Error from provider */
  error?: SsoError;
  /** Error description from provider */
  error_description?: string;
}

// ============================================================
// SSO LOGOUT REQUEST
// ============================================================

/**
 * SSO logout request
 */
export interface AuthSsoLogoutRequest {
  /** User ID */
  userId: ID;
  /** SSO session ID */
  sessionId?: ID;
  /** SSO provider */
  provider?: SsoProvider;
  /** Logout redirect URI */
  redirectUri?: Url;
  /** SAML logout request (for SAML) */
  samlLogoutRequest?: string;
}

// ============================================================
// SSO RESPONSE
// ============================================================

/**
 * SSO authentication response
 */
export interface AuthSsoAuthResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** SSO status */
  status: SsoStatus;
  /** User ID if authenticated */
  userId?: ID;
  /** SSO session if created */
  session?: AuthSsoSession;
  /** Redirect URI (if needed) */
  redirectUri?: Url;
  /** Error message if failed */
  error?: SsoError | string;
  /** Whether new user was provisioned */
  isNewUser?: boolean;
  /** Whether account linking is required */
  linkingRequired?: boolean;
}

/**
 * SSO logout response
 */
export interface AuthSsoLogoutResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Error message if failed */
  error?: SsoError | string;
  /** Logout redirect URI (if needed) */
  redirectUri?: Url;
}

// ============================================================
// SSO FILTER
// ============================================================

/**
 * Filter for querying SSO sessions
 */
export interface AuthSsoSessionFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by provider */
  provider?: SsoProvider | SsoProvider[];
  /** Filter by protocol */
  protocol?: SsoProtocol | SsoProtocol[];
  /** Filter by status */
  status?: SsoStatus | SsoStatus[];
  /** Filter by active sessions only */
  activeOnly?: boolean;
  /** Filter by date range (created) */
  createdDateRange?: {
    start?: Date;
    end?: Date;
  };
}

/**
 * Filter for querying SSO providers
 */
export interface AuthSsoProviderFilter {
  /** Filter by provider name */
  providers?: SsoProvider | SsoProvider[];
  /** Filter by provider type */
  type?: SsoProviderType | SsoProviderType[];
  /** Filter by protocol */
  protocol?: SsoProtocol | SsoProtocol[];
  /** Filter by enabled status */
  isEnabled?: boolean;
  /** Filter by configured status */
  isConfigured?: boolean;
}

// ============================================================
// SSO SUMMARY
// ============================================================

/**
 * SSO summary for a user
 */
export interface AuthSsoSummary {
  /** User ID */
  userId: ID;
  /** Total SSO sessions */
  totalSessions: number;
  /** Active SSO sessions */
  activeSessions: number;
  /** SSO providers used */
  providers: SsoProvider[];
  /** Current SSO session (if any) */
  currentSession?: AuthSsoSession;
  /** Active sessions */
  sessions: AuthSsoSession[];
}

// ============================================================
// SAML ASSERTION
// ============================================================

/**
 * SAML assertion data
 */
export interface AuthSamlAssertion {
  /** SAML assertion ID */
  id: string;
  /** Issuer */
  issuer: string;
  /** Subject (user identifier) */
  subject: string;
  /** Subject name ID format */
  nameIdFormat: SamlNameIdFormat;
  /** Session index */
  sessionIndex: string;
  /** Authn context */
  authnContext: string;
  /** Authn instant */
  authnInstant: Timestamp;
  /** Attributes */
  attributes: Record<string, string | string[]>;
  /** Not before */
  notBefore: Timestamp;
  /** Not on or after */
  notOnOrAfter: Timestamp;
  /** Signature (if any) */
  signature?: string;
  /** Raw SAML response */
  rawResponse: string;
}

// ============================================================
// SSO ERROR RESPONSE
// ============================================================

/**
 * SSO error response
 */
export interface AuthSsoErrorResponse {
  /** Error code */
  error: SsoError;
  /** Human-readable error description */
  error_description?: string;
  /** State parameter (if provided in request) */
  state?: string;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if SSO provider is valid
 */
export function isValidAuthSsoProvider(provider: string): provider is SsoProvider {
  return Object.values(SSO_PROVIDERS).includes(provider as SsoProvider);
}

/**
 * Check if SSO protocol is valid
 */
export function isValidAuthSsoProtocol(protocol: string): protocol is SsoProtocol {
  return Object.values(SSO_PROTOCOLS).includes(protocol as SsoProtocol);
}

/**
 * Check if SSO status is valid
 */
export function isValidAuthSsoStatus(status: string): status is SsoStatus {
  return Object.values(SSO_STATUS).includes(status as SsoStatus);
}

/**
 * Get SSO provider display name
 */
export function getAuthSsoProviderDisplayName(provider: SsoProvider): string {
  return SSO_PROVIDER_LABELS[provider] || 'Unknown Provider';
}

/**
 * Get SSO provider type
 */
export function getAuthSsoProviderType(provider: SsoProvider): SsoProviderType {
  return SSO_PROVIDER_TYPE_MAP[provider] || SSO_PROVIDER_TYPES.CUSTOM;
}

/**
 * Get SSO status message
 */
export function getAuthSsoStatusMessage(status: SsoStatus): string {
  return SSO_STATUS_MESSAGES[status] || 'Unknown SSO status';
}

/**
 * Check if SSO status is successful
 */
export function isAuthSsoStatusSuccessful(status: SsoStatus): boolean {
  return status === SSO_STATUS.SUCCESS;
}

/**
 * Check if SSO status is terminal
 */
export function isAuthSsoStatusTerminal(status: SsoStatus): boolean {
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
 * Get SSO provider protocols
 */
export function getAuthSsoProviderProtocols(provider: SsoProvider): SsoProtocol[] {
  const protocolMap: Partial<Record<SsoProvider, SsoProtocol[]>> = {
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
 * Check if SSO session has expired
 */
export function isAuthSsoSessionExpired(
  createdAt: Date,
  sessionExpirySeconds: number = SSO_CONFIG.SESSION_EXPIRY
): boolean {
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  return age >= sessionExpirySeconds;
}

/**
 * Check if SSO session is idle
 */
export function isAuthSsoSessionIdle(
  lastActivityAt: Date,
  idleTimeoutSeconds: number = SSO_CONFIG.IDLE_TIMEOUT
): boolean {
  const now = Date.now();
  const idleTime = (now - lastActivityAt.getTime()) / 1000;
  return idleTime >= idleTimeoutSeconds;
}

/**
 * Get remaining SSO session time in seconds
 */
export function getAuthSsoSessionRemainingTime(
  createdAt: Date,
  sessionExpirySeconds: number = SSO_CONFIG.SESSION_EXPIRY
): number {
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  const remaining = sessionExpirySeconds - age;
  return Math.max(0, remaining);
}

/**
 * Get SAML binding label
 */
export function getAuthSamlBindingLabel(binding: SamlBinding): string {
  const labels: Record<SamlBinding, string> = {
    [SAML_BINDINGS.HTTP_REDIRECT]: 'HTTP Redirect',
    [SAML_BINDINGS.HTTP_POST]: 'HTTP POST',
    [SAML_BINDINGS.SOAP]: 'SOAP',
    [SAML_BINDINGS.PAOS]: 'PAOS',
  };
  return labels[binding] || 'Unknown Binding';
}

/**
 * Get SAML NameID format label
 */
export function getAuthSamlNameIdFormatLabel(format: SamlNameIdFormat): string {
  const labels: Record<SamlNameIdFormat, string> = {
    [SAML_NAMEID_FORMATS.PERSISTENT]: 'Persistent',
    [SAML_NAMEID_FORMATS.TRANSIENT]: 'Transient',
    [SAML_NAMEID_FORMATS.EMAIL]: 'Email Address',
    [SAML_NAMEID_FORMATS.ENTITY]: 'Entity',
    [SAML_NAMEID_FORMATS.UNSPECIFIED]: 'Unspecified',
  };
  return labels[format] || 'Unknown Format';
}

/**
 * Get default SSO config
 */
export function getAuthSsoDefaultConfig(): typeof SSO_CONFIG {
  return SSO_CONFIG;
}

/**
 * Create SAML assertion
 */
export function createAuthSamlAssertion(data: Partial<AuthSamlAssertion>): AuthSamlAssertion {
  const now = new Date();
  return {
    id: data.id || `saml-${Date.now()}`,
    issuer: data.issuer || '',
    subject: data.subject || '',
    nameIdFormat: data.nameIdFormat || SAML_NAMEID_FORMATS.UNSPECIFIED,
    sessionIndex: data.sessionIndex || `session-${Date.now()}`,
    authnContext: data.authnContext || 'urn:oasis:names:tc:SAML:2.0:ac:classes:Password',
    authnInstant: data.authnInstant || now,
    attributes: data.attributes || {},
    notBefore: data.notBefore || now,
    notOnOrAfter: data.notOnOrAfter || new Date(now.getTime() + 3600000),
    rawResponse: data.rawResponse || '',
    ...data,
  };
}

/**
 * Check if SAML binding is valid
 */
export function isValidAuthSamlBinding(binding: string): binding is SamlBinding {
  return Object.values(SAML_BINDINGS).includes(binding as SamlBinding);
}

/**
 * Check if SAML NameID format is valid
 */
export function isValidAuthSamlNameIdFormat(format: string): format is SamlNameIdFormat {
  return Object.values(SAML_NAMEID_FORMATS).includes(format as SamlNameIdFormat);
}

/**
 * Get all SSO providers
 */
export function getAllAuthSsoProviders(): SsoProvider[] {
  return Object.values(SSO_PROVIDERS);
}

/**
 * Get SSO provider configuration
 */
export function getAuthSsoProviderConfig(provider: SsoProvider): AuthSsoProviderConfig {
  const displayName = getAuthSsoProviderDisplayName(provider);
  const type = getAuthSsoProviderType(provider);
  const protocols = getAuthSsoProviderProtocols(provider);
  const protocol = protocols.length > 0 ? protocols[0] : SSO_PROTOCOLS.OIDC;
  const now = new Date();

  return {
    provider,
    displayName,
    type,
    protocol,
    isEnabled: true,
    isConfigured: false,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Create SSO error response
 */
export function createAuthSsoErrorResponse(
  error: SsoError,
  description?: string,
  state?: string
): AuthSsoErrorResponse {
  // Use the imported SSO_ERRORS constant for error messages
  const errorMessage = SSO_ERRORS[error as keyof typeof SSO_ERRORS] || 'Unknown SSO error';

  return {
    error,
    error_description: description || errorMessage,
    state,
  };
}

/**
 * Check if SSO error is valid
 */
export function isValidAuthSsoError(error: string): error is SsoError {
  return Object.values(SSO_ERRORS).includes(error as SsoError);
}

/**
 * Get human-readable SSO error message
 */
export function getAuthSsoErrorMessage(error: SsoError): string {
  return SSO_ERRORS[error as keyof typeof SSO_ERRORS] || 'Unknown SSO error';
}

/**
 * Get human-readable SSO success message
 */
export function getAuthSsoSuccessMessage(success: SsoSuccess): string {
  return SSO_SUCCESS[success as keyof typeof SSO_SUCCESS] || 'Unknown success message';
}
