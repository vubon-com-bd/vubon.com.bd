/**
 * Auth OAuth Types
 * Type definitions for OAuth authentication based on shared-constants
 * @module AuthOAuthTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth oauth
// ============================================================
import {
  // Core OAuth Constants
  AUTH_OAUTH,
  OAUTH_CONFIG,
  OAUTH_GRANT_TYPES,
  OAUTH_RESPONSE_TYPES,
  OAUTH_TOKEN_TYPES,
  OAUTH_SCOPES,
  OAUTH_ENDPOINTS,
  OAUTH_SECURITY,
  OAUTH_RATE_LIMIT,
  OAUTH_DEFAULTS,
  OAUTH_EVENTS,
  OAUTH_PROVIDER_CONFIGS,
  // Core OAuth Types
  AuthOAuthConfig,
  AuthOAuthEvent,
  AuthOAuthDefaults,
  OAuthProviderConfig,
  // Core OAuth Status Types
  AuthOauthStatus,
  // Core OAuth Provider Types
  AuthOauthProvider,
  // Core OAuth Functions
  getOauthProviderConfig,
  getOauthScopes,
  getOauthRedirectUri,
  getOauthAuthorizationUrl,
  getOauthTokenUrl,
  getOauthUserInfoUrl,
  isOauthProviderSupported,
  getOauthSupportedProviders,
  getOauthProviderLabel,
  getOauthProviderIcon,
  getOauthProviderColor,
  getOauthStateExpiry,
  getOauthCodeExpiry,
  getOauthAccessTokenExpiry,
  getOauthRefreshTokenExpiry,
  getOauthIdTokenExpiry,
  isOauthStateValid,
  isOauthCodeValid,
  isOauthAccessTokenValid,
  shouldOauthRefreshAccessToken,
  getOauthGrantTypeLabel,
  getOauthResponseTypeLabel,
  getOauthTokenTypeLabel,
} from '@vubon/shared-constants';

// ============================================================
// Auth OAuth Extended Types
// ============================================================

/**
 * Auth OAuth with additional metadata
 */
export interface AuthOAuthExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  provider: AuthOauthProvider;
  status: AuthOauthStatus;
  providerUserId: string;
  email?: string;
  name?: string;
  avatar?: string;
  accessToken: string;
  refreshToken?: string;
  idToken?: string;
  tokenType: string;
  grantType: string;
  responseType: string;
  scopes: string[];
  tokenExpiry: Date;
  refreshTokenExpiry?: Date;
  idTokenExpiry?: Date;
  isActive: boolean;
  isPending: boolean;
  isInactive: boolean;
  isFailed: boolean;
  isSecurityIssue: boolean;
  isTokenStatus: boolean;
  isCodeStatus: boolean;
  isOIDCCompliant: boolean;
  isPKCESupported: boolean;
  lastUsedAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth OAuth filter
 */
export interface AuthOAuthFilter {
  userIds?: ID[];
  providers?: AuthOauthProvider[];
  statuses?: AuthOauthStatus[];
  grantTypes?: string[];
  responseTypes?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isPending?: boolean;
  isInactive?: boolean;
  isFailed?: boolean;
  isTokenStatus?: boolean;
  isCodeStatus?: boolean;
  isSecurityIssue?: boolean;
  isOIDCCompliant?: boolean;
  isPKCESupported?: boolean;
  searchTerm?: string;
}

/**
 * Auth OAuth statistics
 */
export interface AuthOAuthStatistics {
  userId: ID;
  totalConnections: number;
  activeConnections: number;
  pendingConnections: number;
  inactiveConnections: number;
  failedConnections: number;
  tokenConnections: number;
  codeConnections: number;
  byProvider: Record<AuthOauthProvider, number>;
  byStatus: Record<AuthOauthStatus, number>;
  byGrantType: Record<string, number>;
  byResponseType: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentProvider: AuthOauthProvider;
  mostFrequentStatus: AuthOauthStatus;
  mostFrequentGrantType: string;
}

/**
 * Auth OAuth summary
 */
export interface AuthOAuthSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  pending: number;
  inactive: number;
  failed: number;
  token: number;
  code: number;
  byProvider: Record<AuthOauthProvider, number>;
  byStatus: Record<AuthOauthStatus, number>;
  byGrantType: Record<string, number>;
  byResponseType: Record<string, number>;
  oauthTrend: {
    date: Date;
    total: number;
    active: number;
    token: number;
  }[];
  topProviders: {
    provider: AuthOauthProvider;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: AuthOauthStatus;
    count: number;
    label: string;
  }[];
}

/**
 * Auth OAuth configuration
 */
export interface AuthOAuthConfiguration {
  enabled: boolean;
  defaultProviders: AuthOauthProvider[];
  defaultGrantType: string;
  defaultResponseType: string;
  defaultScopes: string[];
  stateExpirySeconds: number;
  codeExpirySeconds: number;
  accessTokenExpirySeconds: number;
  refreshTokenExpirySeconds: number;
  idTokenExpirySeconds: number;
  requirePKCE: boolean;
  requireOIDC: boolean;
  allowAutoLink: boolean;
  allowMultipleConnections: boolean;
  notificationOnLink: boolean;
  notificationOnUnlink: boolean;
  notificationOnTokenRefresh: boolean;
  alertConfig?: AuthOAuthAlertConfig;
}

/**
 * Auth OAuth alert configuration
 */
export interface AuthOAuthAlertConfig {
  enabled: boolean;
  failedConnectionAlert: boolean;
  tokenExpiryAlert: boolean;
  suspiciousActivityAlert: boolean;
  providerErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Auth OAuth history
 */
export interface AuthOAuthHistory extends BaseEntity, Timestamp {
  id: ID;
  oauthId: ID;
  userId: ID;
  action: 'link' | 'unlink' | 'refresh' | 'verify' | 'fail' | 'expire' | 'update' | 'rotate';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * Auth OAuth token
 */
export interface AuthOAuthToken extends BaseEntity, Timestamp {
  id: ID;
  oauthId: ID;
  userId: ID;
  provider: AuthOauthProvider;
  accessToken: string;
  refreshToken?: string;
  idToken?: string;
  tokenType: string;
  grantType: string;
  scopes: string[];
  expiresAt: Date;
  refreshTokenExpiresAt?: Date;
  idTokenExpiresAt?: Date;
  isValid: boolean;
  isExpired: boolean;
  metadata?: Metadata;
}

/**
 * Auth OAuth code
 */
export interface AuthOAuthCode extends BaseEntity, Timestamp {
  id: ID;
  oauthId: ID;
  userId: ID;
  provider: AuthOauthProvider;
  code: string;
  redirectUri: string;
  grantType: string;
  responseType: string;
  scopes: string[];
  state?: string;
  codeChallenge?: string;
  codeChallengeMethod?: string;
  expiresAt: Date;
  isUsed: boolean;
  usedAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth OAuth profile
 */
export interface AuthOAuthProfile extends BaseEntity, Timestamp {
  id: ID;
  oauthId: ID;
  userId: ID;
  provider: AuthOauthProvider;
  providerUserId: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  location?: string;
  gender?: string;
  birthday?: Date;
  isOIDC: boolean;
  metadata?: Metadata;
}

/**
 * Auth OAuth export
 */
export interface AuthOAuthExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AuthOAuthFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Constants
  AUTH_OAUTH,
  OAUTH_CONFIG,
  OAUTH_GRANT_TYPES,
  OAUTH_RESPONSE_TYPES,
  OAUTH_TOKEN_TYPES,
  OAUTH_SCOPES,
  OAUTH_ENDPOINTS,
  OAUTH_SECURITY,
  OAUTH_RATE_LIMIT,
  OAUTH_DEFAULTS,
  OAUTH_EVENTS,
  OAUTH_PROVIDER_CONFIGS,
  // Core Types
  AuthOAuthConfig,
  AuthOAuthEvent,
  AuthOAuthDefaults,
  OAuthProviderConfig,
  AuthOauthStatus,
  AuthOauthProvider,
  // Core Functions
  getOauthProviderConfig,
  getOauthScopes,
  getOauthRedirectUri,
  getOauthAuthorizationUrl,
  getOauthTokenUrl,
  getOauthUserInfoUrl,
  isOauthProviderSupported,
  getOauthSupportedProviders,
  getOauthProviderLabel,
  getOauthProviderIcon,
  getOauthProviderColor,
  getOauthStateExpiry,
  getOauthCodeExpiry,
  getOauthAccessTokenExpiry,
  getOauthRefreshTokenExpiry,
  getOauthIdTokenExpiry,
  isOauthStateValid,
  isOauthCodeValid,
  isOauthAccessTokenValid,
  shouldOauthRefreshAccessToken,
  getOauthGrantTypeLabel,
  getOauthResponseTypeLabel,
  getOauthTokenTypeLabel,
};
