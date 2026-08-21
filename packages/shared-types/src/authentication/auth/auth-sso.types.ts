/**
 * Authentication SSO Types Module
 * Single Sign-On (SSO) and SAML types for authentication system
 * Handles SSO providers, SAML assertions, identity providers, and federation
 */

import { authentication } from '@vubon/shared-constants';
import { UserId, Email, Timestamp, URL } from './core-primitives.types';

// Import SSO constants from shared-constants
const {
  SSO_ENABLED_PROVIDERS,
  SSO_SESSION_TIMEOUT,
  SSO_TOKEN_EXPIRY,
  SSO_DEFAULT_PROVIDER,
  SSO_CONFIG,
  SSO_PROVIDER,
  SSO_STATUS,
} = authentication;

/**
 * SSO Provider
 * Supported SSO providers (re-exported from shared-constants)
 */
export type SsoProvider = (typeof SSO_PROVIDER)[keyof typeof SSO_PROVIDER];

/**
 * SSO Status
 * Status of SSO connection (re-exported from shared-constants)
 */
export type SsoStatus = (typeof SSO_STATUS)[keyof typeof SSO_STATUS];

/**
 * SSO Session
 * SSO user session
 */
export interface SsoSession {
  id: string;
  userId: UserId;
  provider: SsoProvider;
  sessionId: string;
  nameId: string;
  nameIdFormat: string;
  sessionIndex: string;
  createdAt: Timestamp;
  expiresAt: Timestamp;
  lastActivityAt: Timestamp;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * SSO Identity Provider
 * Identity Provider configuration
 */
export interface SsoIdentityProvider {
  id: string;
  provider: SsoProvider;
  entityId: string;
  displayName: string;
  ssoUrl: URL;
  ssoBinding: 'redirect' | 'post';
  logoutUrl?: URL;
  logoutBinding?: 'redirect' | 'post';
  certificate: string;
  privateKey?: string;
  attributes: Record<string, string>;
  nameIdFormat: string;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * SSO Service Provider
 * Service Provider configuration
 */
export interface SsoServiceProvider {
  id: string;
  entityId: string;
  displayName: string;
  acsUrl: URL;
  acsBinding: 'redirect' | 'post';
  logoutUrl?: URL;
  logoutBinding?: 'redirect' | 'post';
  certificate: string;
  privateKey?: string;
  nameIdFormat: string;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * SSO Login Request
 * Request to initiate SSO login
 */
export interface SsoLoginRequest {
  provider: SsoProvider;
  relayState?: string;
  deviceId?: string;
  deviceName?: string;
  metadata?: Record<string, unknown>;
}

/**
 * SSO Login Response
 * Response after SSO login initiation
 */
export interface SsoLoginResponse {
  success: boolean;
  data?: {
    ssoUrl: URL;
    relayState: string;
    provider: SsoProvider;
    requestId: string;
    samlRequest: string;
    binding: 'redirect' | 'post';
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * SSO Callback
 * Callback from SSO provider
 */
export interface SsoCallback {
  samlResponse: string;
  relayState?: string;
  provider: SsoProvider;
  metadata?: Record<string, unknown>;
}

/**
 * SSO Verification
 * Verify SSO login and create/update user
 */
export interface SsoVerification {
  provider: SsoProvider;
  nameId: string;
  nameIdFormat: string;
  sessionIndex?: string;
  attributes: Record<string, string>;
  metadata?: Record<string, unknown>;
}

/**
 * SSO Logout Request
 * Request to logout from SSO
 */
export interface SsoLogoutRequest {
  sessionId: string;
  provider: SsoProvider;
  logoutUrl?: URL;
  metadata?: Record<string, unknown>;
}

/**
 * SSO Logout Response
 * Response after SSO logout
 */
export interface SsoLogoutResponse {
  success: boolean;
  data?: {
    loggedOut: boolean;
    sessionId: string;
    provider: SsoProvider;
    logoutTime: Timestamp;
    redirectUrl?: URL;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * SAML Assertion
 * SAML assertion data
 */
export interface SamlAssertion {
  id: string;
  issueInstant: Timestamp;
  issuer: string;
  subject: {
    nameId: string;
    nameIdFormat: string;
  };
  conditions: {
    notBefore: Timestamp;
    notOnOrAfter: Timestamp;
    audienceRestriction: string[];
  };
  attributes: Record<string, string[]>;
  authnContext: {
    authnContextClassRef: string;
    authnInstant: Timestamp;
    sessionIndex: string;
  };
  signature?: {
    algorithm: string;
    digestAlgorithm: string;
    signatureValue: string;
  };
  metadata?: Record<string, unknown>;
}

/**
 * SAML Request
 * SAML request data
 */
export interface SamlRequest {
  id: string;
  issueInstant: Timestamp;
  issuer: string;
  version: string;
  protocolBinding: string;
  assertionConsumerServiceUrl: URL;
  attributeConsumingServiceIndex?: number;
  forceAuthn?: boolean;
  isPassive?: boolean;
  nameIdPolicy?: {
    format: string;
    allowCreate: boolean;
  };
  requestedAuthnContext?: {
    comparison: string;
    authnContextClassRefs: string[];
  };
}

/**
 * SSO User
 * SSO user information
 */
export interface SsoUser {
  id: string;
  userId: UserId;
  provider: SsoProvider;
  nameId: string;
  nameIdFormat: string;
  email: Email;
  firstName: string;
  lastName: string;
  fullName: string;
  attributes: Record<string, string[]>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt: Timestamp;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * SSO Provider Configuration
 * Configuration for SSO provider
 */
export interface SsoProviderConfig {
  provider: SsoProvider;
  entityId: string;
  ssoUrl: URL;
  ssoBinding: 'redirect' | 'post';
  logoutUrl?: URL;
  logoutBinding?: 'redirect' | 'post';
  certificate: string;
  privateKey?: string;
  attributes: Record<string, string>;
  nameIdFormat: string;
  enabled: boolean;
  icon?: string;
  displayName?: string;
  color?: string;
  metadata?: Record<string, unknown>;
}

/**
 * SSO Filter
 * Filter criteria for SSO queries
 */
export interface SsoFilter {
  userId?: UserId[];
  provider?: SsoProvider[];
  status?: SsoStatus[];
  sessionId?: string[];
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  isActive?: boolean;
}

/**
 * SSO Response Builder
 * Helper for building SSO responses
 */
export interface SsoResponseBuilder {
  loginSuccess(response: SsoLoginResponse): SsoLoginResponse;
  logoutSuccess(response: SsoLogoutResponse): SsoLogoutResponse;
  error(code: string, message: string, details?: Record<string, unknown>): SsoErrorResponse;
}

/**
 * SSO Error Response
 * Error response for SSO operations
 */
export interface SsoErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * SSO Constants
 * SSO-related constants (re-exported from shared-constants)
 */
export const SSO_PROVIDERS = SSO_PROVIDER;
export const SSO_STATUSES = SSO_STATUS;
export const SSO_CONFIG_DEFAULT = SSO_CONFIG;

/**
 * Default SSO Configuration
 */
export const DEFAULT_SSO_CONFIG = {
  enabledProviders: SSO_ENABLED_PROVIDERS,
  defaultProvider: SSO_DEFAULT_PROVIDER,
  sessionTimeout: SSO_SESSION_TIMEOUT,
  tokenExpiry: SSO_TOKEN_EXPIRY,
} as const;

/**
 * SSO Webhook
 * Webhook payload for SSO events
 */
export interface SsoWebhook {
  event: string;
  userId: UserId;
  provider: SsoProvider;
  status: SsoStatus;
  timestamp: Timestamp;
  data: Record<string, unknown>;
}

/**
 * SSO Statistics
 * Statistical data about SSO
 */
export interface SsoStatistics {
  totalSessions: number;
  activeSessions: number;
  byProvider: Record<SsoProvider, number>;
  byStatus: Record<SsoStatus, number>;
  newSessionsToday: number;
  newSessionsWeek: number;
  newSessionsMonth: number;
  mostUsedProvider: SsoProvider;
  leastUsedProvider: SsoProvider;
  averageSessionDuration: number;
  logoutCount: number;
  failedLogins: number;
  timestamp: Timestamp;
}

/**
 * SSO Connection Status
 * Status of SSO connection
 */
export interface SsoConnectionStatus {
  userId: UserId;
  connected: boolean;
  provider: SsoProvider;
  sessionId?: string;
  connectedAt?: Timestamp;
  lastUsedAt?: Timestamp;
  expiresAt?: Timestamp;
  status: SsoStatus;
}

/**
 * SSO Link Request
 * Request to link SSO account
 */
export interface SsoLinkRequest {
  userId: UserId;
  provider: SsoProvider;
  nameId: string;
  nameIdFormat: string;
  sessionIndex: string;
  attributes: Record<string, string[]>;
  metadata?: Record<string, unknown>;
}

/**
 * SSO Link Response
 * Response after SSO account linking
 */
export interface SsoLinkResponse {
  success: boolean;
  data?: {
    linked: boolean;
    provider: SsoProvider;
    nameId: string;
    linkedAt: Timestamp;
    sessionId: string;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * SSO Unlink Request
 * Request to unlink SSO account
 */
export interface SsoUnlinkRequest {
  userId: UserId;
  provider: SsoProvider;
  nameId: string;
  reason?: string;
  keepLocalAccount: boolean;
}

/**
 * SSO Unlink Response
 * Response after SSO account unlinking
 */
export interface SsoUnlinkResponse {
  success: boolean;
  data?: {
    unlinked: boolean;
    provider: SsoProvider;
    unlinkedAt: Timestamp;
    localAccountKept: boolean;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * SAML Metadata
 * SAML metadata configuration
 */
export interface SamlMetadata {
  entityId: string;
  entityIdFormat: string;
  metadataType: 'saml20' | 'saml11';
  organization: {
    name: string;
    displayName: string;
    url: URL;
  };
  contactPerson: {
    type: string;
    name: string;
    email: Email;
  };
  ssoService: {
    url: URL;
    binding: 'redirect' | 'post';
  };
  logoutService?: {
    url: URL;
    binding: 'redirect' | 'post';
  };
  assertionConsumerService: {
    url: URL;
    binding: 'redirect' | 'post';
    index: number;
  };
  certificate: string;
  metadata?: Record<string, unknown>;
}

/**
 * SSO Session Data
 * SSO session data
 */
export interface SsoSessionData {
  sessionId: string;
  userId: UserId;
  provider: SsoProvider;
  nameId: string;
  nameIdFormat: string;
  sessionIndex: string;
  attributes: Record<string, string[]>;
  createdAt: Timestamp;
  expiresAt: Timestamp;
  lastActivityAt: Timestamp;
  isActive: boolean;
}

/**
 * SSO Federation
 * SSO federation configuration
 */
export interface SsoFederation {
  id: string;
  provider: SsoProvider;
  federationId: string;
  displayName: string;
  identityProvider: string;
  serviceProvider: string;
  metadata: SamlMetadata;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * SSO Certificate
 * SSO certificate management
 */
export interface SsoCertificate {
  id: string;
  provider: SsoProvider;
  certificate: string;
  privateKey?: string;
  algorithm: string;
  expiresAt: Timestamp;
  createdAt: Timestamp;
  isActive: boolean;
  isDefault: boolean;
  metadata?: Record<string, unknown>;
}
