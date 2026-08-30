/**
 * Authentication SSO Types
 * Single Sign-On data types
 */

import type {
  SsoProtocol,
  SsoStatus,
  SsoProvider,
  SsoProviderType,
  SamlBinding,
  SamlNameIdFormat,
} from '@vubon/shared-constants';

import type { ID, Timestamp, Url, Email } from '../common/core-primitives.types';
import type { AuthUser } from './auth.types';

/**
 * SSO Session Data
 * Complete SSO session information
 */
export interface SsoSessionData {
  /** Session ID */
  id: ID;
  /** User ID (if authenticated) */
  userId?: ID;
  /** SSO provider */
  provider: SsoProvider;
  /** SSO protocol */
  protocol: SsoProtocol;
  /** Session status */
  status: SsoStatus;
  /** Session creation timestamp */
  createdAt: Timestamp;
  /** Session expiry timestamp */
  expiresAt: Timestamp;
  /** Last activity timestamp */
  lastActivityAt: Timestamp;
  /** IDP session ID */
  idpSessionId?: string;
  /** SP session ID */
  spSessionId?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * SSO Login Request
 * Request to initiate SSO login
 */
export interface SsoLoginRequest {
  /** SSO provider */
  provider: SsoProvider;
  /** Redirect URI after login */
  redirectUri?: Url;
  /** State parameter for CSRF */
  state?: string;
  /** Additional parameters (protocol-specific) */
  params?: Record<string, string>;
}

/**
 * SSO Login Result
 * Result of SSO login
 */
export interface SsoLoginResult {
  /** Is login successful */
  success: boolean;
  /** Login status */
  status: SsoStatus;
  /** User data (if successful) */
  user?: AuthUser;
  /** Access token (if successful) */
  accessToken?: string;
  /** Refresh token (if successful) */
  refreshToken?: string;
  /** Token expiry in seconds */
  expiresIn?: number;
  /** SSO session data */
  session?: SsoSessionData;
  /** Is new account provisioned */
  isProvisioned?: boolean;
  /** Is account linked */
  isLinked?: boolean;
  /** Error message (if failed) */
  error?: string;
  /** Required action (if requires action) */
  requiredAction?: string;
}

/**
 * SSO SAML Request
 * SAML-specific request data
 */
export interface SsoSamlRequest {
  /** SAML request (base64 encoded) */
  samlRequest: string;
  /** Relay state */
  relayState?: string;
  /** SAML binding */
  binding: SamlBinding;
  /** ACS URL */
  acsUrl: Url;
  /** Entity ID */
  entityId: string;
}

/**
 * SSO SAML Response
 * SAML-specific response data
 */
export interface SsoSamlResponse {
  /** SAML response (base64 encoded) */
  samlResponse: string;
  /** Relay state */
  relayState?: string;
  /** SAML binding */
  binding: SamlBinding;
  /** NameID */
  nameId?: string;
  /** NameID format */
  nameIdFormat?: SamlNameIdFormat;
  /** Attributes from SAML response */
  attributes: Record<string, string | string[]>;
  /** Session index */
  sessionIndex?: string;
}

/**
 * SSO OIDC Request
 * OIDC-specific request data
 */
export interface SsoOidcRequest {
  /** Authorization code */
  code: string;
  /** Redirect URI */
  redirectUri: Url;
  /** State parameter */
  state?: string;
  /** Code verifier (PKCE) */
  codeVerifier?: string;
}

/**
 * SSO OIDC Response
 * OIDC-specific response data
 */
export interface SsoOidcResponse {
  /** ID token */
  idToken: string;
  /** Access token */
  accessToken: string;
  /** Refresh token */
  refreshToken?: string;
  /** Token expiry in seconds */
  expiresIn: number;
  /** User info */
  userInfo: {
    sub: string;
    email?: Email;
    emailVerified?: boolean;
    name?: string;
    givenName?: string;
    familyName?: string;
    picture?: Url;
    [key: string]: unknown;
  };
}

/**
 * SSO Provider Configuration
 * Configuration for an SSO provider
 */
export interface SsoProviderConfig {
  /** Provider name */
  provider: SsoProvider;
  /** Is provider enabled */
  enabled: boolean;
  /** Provider type */
  type: SsoProviderType;
  /** Provider label */
  label: string;
  /** Provider protocols */
  protocols: SsoProtocol[];
  /** Configuration specific to provider */
  config: {
    /** Entity ID (SAML) */
    entityId?: string;
    /** ACS URL (SAML) */
    acsUrl?: Url;
    /** SSO URL (SAML/OIDC) */
    ssoUrl?: Url;
    /** SLO URL (SAML) */
    sloUrl?: Url;
    /** Certificate (SAML) */
    certificate?: string;
    /** Client ID (OIDC) */
    clientId?: string;
    /** Client Secret (OIDC) */
    clientSecret?: string;
    /** Discovery URL (OIDC) */
    discoveryUrl?: Url;
    /** Issuer (OIDC) */
    issuer?: string;
    /** Scopes (OIDC) */
    scopes?: string[];
  };
}

/**
 * SSO Provider Status
 * Status of SSO provider configuration
 */
export interface SsoProviderStatus {
  /** Provider name */
  provider: SsoProvider;
  /** Is provider configured */
  isConfigured: boolean;
  /** Is provider enabled */
  isEnabled: boolean;
  /** Is provider healthy */
  isHealthy: boolean;
  /** Provider type */
  type: SsoProviderType;
  /** Provider label */
  label: string;
  /** Supported protocols */
  protocols: SsoProtocol[];
  /** Error message (if not healthy) */
  error?: string;
  /** Last health check */
  lastHealthCheck?: Timestamp;
}

/**
 * SSO Account Link Request
 * Request to link SSO account to existing user
 */
export interface SsoAccountLinkRequest {
  /** User ID */
  userId: ID;
  /** SSO provider */
  provider: SsoProvider;
  /** Provider user ID */
  providerUserId: string;
  /** Provider data */
  providerData?: Record<string, unknown>;
}

/**
 * SSO Account Unlink Request
 * Request to unlink SSO account from user
 */
export interface SsoAccountUnlinkRequest {
  /** User ID */
  userId: ID;
  /** SSO provider to unlink */
  provider: SsoProvider;
}

/**
 * SSO Account Link Result
 * Result of SSO account linking
 */
export interface SsoAccountLinkResult {
  /** Is linking successful */
  success: boolean;
  /** User data */
  user?: AuthUser;
  /** SSO provider that was linked */
  provider?: SsoProvider;
  /** Message */
  message: string;
}

/**
 * SSO Account Unlink Result
 * Result of SSO account unlinking
 */
export interface SsoAccountUnlinkResult {
  /** Is unlinking successful */
  success: boolean;
  /** SSO provider that was unlinked */
  provider?: SsoProvider;
  /** Message */
  message: string;
}

/**
 * SSO User Data
 * SSO user information
 */
export interface SsoUserData {
  /** Provider */
  provider: SsoProvider;
  /** Provider user ID */
  providerUserId: string;
  /** Provider email */
  email: Email;
  /** Provider display name */
  displayName?: string;
  /** Provider first name */
  givenName?: string;
  /** Provider last name */
  familyName?: string;
  /** Provider profile picture URL */
  picture?: Url;
  /** Provider locale */
  locale?: string;
  /** Provider groups/roles */
  groups?: string[];
  /** Provider attributes */
  attributes?: Record<string, unknown>;
  /** When account was linked */
  linkedAt: Timestamp;
  /** When account was last used */
  lastUsedAt?: Timestamp;
}

/**
 * SSO User List
 * List of SSO accounts linked to a user
 */
export interface SsoUserList {
  /** User ID */
  userId: ID;
  /** List of linked SSO accounts */
  accounts: SsoUserData[];
  /** Total count */
  total: number;
}

/**
 * SSO Statistics
 * SSO usage statistics
 */
export interface SsoStatistics {
  /** Total SSO logins */
  totalLogins: number;
  /** Successful logins */
  successfulLogins: number;
  /** Failed logins */
  failedLogins: number;
  /** Logins by provider */
  byProvider: Record<SsoProvider, number>;
  /** Logins by protocol */
  byProtocol: Record<SsoProtocol, number>;
  /** New accounts provisioned */
  provisionedAccounts: number;
  /** Account links */
  accountLinks: number;
  /** Success rate by provider */
  successRateByProvider: Record<SsoProvider, number>;
  /** Average login time in seconds */
  averageLoginTime: number;
  /** Timestamp of statistics */
  timestamp: Timestamp;
}

/**
 * SSO Configuration Values
 * SSO configuration values (using primitive types)
 */
export interface SsoConfigValues {
  /** SSO session expiry in seconds */
  sessionExpiry: number;
  /** SSO idle timeout in seconds */
  idleTimeout: number;
  /** SSO callback timeout in seconds */
  callbackTimeout: number;
  /** Maximum SSO attempts per hour */
  maxAttemptsPerHour: number;
  /** SSO token expiry in seconds */
  tokenExpiry: number;
  /** Enable SSO auto-provisioning */
  enableAutoProvisioning: boolean;
  /** Enable SSO auto-linking */
  enableAutoLinking: boolean;
  /** Maximum SSO sessions per user */
  maxSessionsPerUser: number;
  /** SSO session validation interval in seconds */
  sessionValidationInterval: number;
}

/**
 * SSO SAML Metadata
 * SAML service provider metadata
 */
export interface SsoSamlMetadata {
  /** Entity ID */
  entityId: string;
  /** SP certificate */
  certificate: string;
  /** ACS URLs */
  acsUrls: Url[];
  /** SLO URLs */
  sloUrls: Url[];
  /** NameID formats supported */
  nameIdFormats: SamlNameIdFormat[];
  /** Attributes mapping */
  attributeMapping: Record<string, string>;
}

/**
 * SSO Logout Request
 * Request for SSO logout
 */
export interface SsoLogoutRequest {
  /** User ID */
  userId: ID;
  /** SSO session ID */
  sessionId: ID;
  /** Logout from all SSO sessions */
  allSessions?: boolean;
  /** Redirect URI after logout */
  redirectUri?: Url;
}

/**
 * SSO Logout Result
 * Result of SSO logout
 */
export interface SsoLogoutResult {
  /** Is logout successful */
  success: boolean;
  /** Logout status */
  status: SsoStatus;
  /** Session ID that was logged out */
  sessionId?: ID;
  /** Logged out from all sessions */
  allSessions?: boolean;
  /** Message */
  message: string;
}
