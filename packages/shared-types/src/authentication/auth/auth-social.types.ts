/**
 * Authentication Social Login Types Module
 * Social authentication and OAuth types for authentication system
 * Handles social login providers, OAuth flows, and social account management
 */

import { authentication } from '@vubon/shared-constants';
import { UserId, Email, Timestamp, Token, URL } from './core-primitives.types';

// Import social constants from shared-constants
const {
  SOCIAL_ENABLED_PROVIDERS,
  SOCIAL_DEFAULT_PROVIDER,
  SOCIAL_CALLBACK_TIMEOUT,
  SOCIAL_STATE_EXPIRY,
  SOCIAL_SCOPES,
  SOCIAL_CONFIG,
  SOCIAL_PROVIDER,
  SOCIAL_STATUS,
  OAUTH_CONFIG,
  OAUTH_PROVIDER,
  OAUTH_STATUS,
  SSO_CONFIG,
  SSO_PROVIDER,
  SSO_STATUS,
} = authentication;

/**
 * Social Provider
 * Supported social login providers (re-exported from shared-constants)
 */
export type SocialProvider = (typeof SOCIAL_PROVIDER)[keyof typeof SOCIAL_PROVIDER];

/**
 * Social Status
 * Status of social connection (re-exported from shared-constants)
 */
export type SocialStatus = (typeof SOCIAL_STATUS)[keyof typeof SOCIAL_STATUS];

/**
 * OAuth Provider
 * Supported OAuth providers (re-exported from shared-constants)
 */
export type OAuthProvider = (typeof OAUTH_PROVIDER)[keyof typeof OAUTH_PROVIDER];

/**
 * OAuth Status
 * Status of OAuth connection (re-exported from shared-constants)
 */
export type OAuthStatus = (typeof OAUTH_STATUS)[keyof typeof OAUTH_STATUS];

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
 * Social Account
 * User's social account information
 */
export interface SocialAccount {
  id: string;
  userId: UserId;
  provider: SocialProvider;
  providerUserId: string;
  email?: Email;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: URL;
  accessToken: Token;
  refreshToken?: Token;
  tokenExpiry: Timestamp;
  refreshTokenExpiry?: Timestamp;
  scope: string[];
  connectedAt: Timestamp;
  updatedAt: Timestamp;
  lastUsedAt?: Timestamp;
  disconnectedAt?: Timestamp;
  status: SocialStatus;
  metadata?: Record<string, unknown>;
}

/**
 * Social Login Request
 * Request to initiate social login
 */
export interface SocialLoginRequest {
  provider: SocialProvider;
  redirectUri: URL;
  state?: string;
  scope?: string[];
  deviceId?: string;
  deviceName?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Social Login Response
 * Response after social login initiation
 */
export interface SocialLoginResponse {
  success: boolean;
  data?: {
    authUrl: URL;
    state: string;
    provider: SocialProvider;
    expiresIn: number;
    callbackUrl: URL;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Social Login Callback
 * Callback from social provider
 */
export interface SocialLoginCallback {
  code: string;
  state: string;
  provider: SocialProvider;
  error?: string;
  errorDescription?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Social Login Verification
 * Verify social login and create/update user
 */
export interface SocialLoginVerification {
  provider: SocialProvider;
  providerUserId: string;
  email?: Email;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: URL;
  accessToken: Token;
  refreshToken?: Token;
  expiresIn: number;
  scope: string[];
  metadata?: Record<string, unknown>;
}

/**
 * Social Connect Request
 * Request to connect social account
 */
export interface SocialConnectRequest {
  userId: UserId;
  provider: SocialProvider;
  code: string;
  redirectUri: URL;
  scope?: string[];
  metadata?: Record<string, unknown>;
}

/**
 * Social Connect Response
 * Response after social account connection
 */
export interface SocialConnectResponse {
  success: boolean;
  data?: {
    connected: boolean;
    provider: SocialProvider;
    providerUserId: string;
    connectedAt: Timestamp;
    accountId: string;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Social Disconnect Request
 * Request to disconnect social account
 */
export interface SocialDisconnectRequest {
  userId: UserId;
  provider: SocialProvider;
  providerUserId?: string;
  revokeTokens?: boolean;
  reason?: string;
}

/**
 * Social Disconnect Response
 * Response after social account disconnection
 */
export interface SocialDisconnectResponse {
  success: boolean;
  data?: {
    disconnected: boolean;
    provider: SocialProvider;
    disconnectedAt: Timestamp;
    tokensRevoked: boolean;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * OAuth Configuration
 * OAuth configuration for social providers
 */
export interface OAuthConfig {
  provider: OAuthProvider;
  clientId: string;
  clientSecret?: string;
  redirectUri: URL;
  authorizationEndpoint: URL;
  tokenEndpoint: URL;
  userInfoEndpoint: URL;
  scope: string[];
  responseType: string;
  grantType: string;
  stateExpiry: number;
  tokenExpiry: number;
  refreshTokenExpiry: number;
  enabled: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * OAuth Token Response
 * Response from OAuth token endpoint
 */
export interface OAuthTokenResponse {
  accessToken: Token;
  tokenType: string;
  expiresIn: number;
  refreshToken?: Token;
  refreshTokenExpiresIn?: number;
  scope?: string;
  idToken?: Token;
  metadata?: Record<string, unknown>;
}

/**
 * OAuth User Info
 * User information from OAuth provider
 */
export interface OAuthUserInfo {
  id: string;
  email?: Email;
  emailVerified?: boolean;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: URL;
  phoneNumber?: string;
  phoneVerified?: boolean;
  locale?: string;
  timezone?: string;
  metadata?: Record<string, unknown>;
}

/**
 * SSO Configuration
 * Single Sign-On configuration
 */
export interface SsoConfig {
  provider: SsoProvider;
  entityId: string;
  ssoUrl: URL;
  ssoBinding: 'redirect' | 'post';
  certificate: string;
  privateKey?: string;
  attributes: Record<string, string>;
  nameIdFormat: string;
  enabled: boolean;
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
 * Social Link
 * Link between social and local accounts
 */
export interface SocialLink {
  id: string;
  userId: UserId;
  provider: SocialProvider;
  providerUserId: string;
  connectedAt: Timestamp;
  isPrimary: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Social Provider Configuration
 * Configuration for a social provider
 */
export interface SocialProviderConfig {
  provider: SocialProvider;
  clientId: string;
  clientSecret: string;
  redirectUri: URL;
  scope: string[];
  enabled: boolean;
  icon?: string;
  displayName?: string;
  color?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Social Login Options
 * Options for social login
 */
export interface SocialLoginOptions {
  provider: SocialProvider;
  redirectUri?: URL;
  state?: string;
  scope?: string[];
  prompt?: 'consent' | 'select_account' | 'login' | 'none';
  display?: 'page' | 'popup' | 'touch' | 'mobile';
  responseType?: 'code' | 'token' | 'id_token';
  responseMode?: 'query' | 'fragment' | 'form_post';
  nonce?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Social Filter
 * Filter criteria for social queries
 */
export interface SocialFilter {
  userId?: UserId[];
  provider?: SocialProvider[];
  status?: SocialStatus[];
  connected?: boolean;
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  providerUserId?: string[];
}

/**
 * Social Response Builder
 * Helper for building social responses
 */
export interface SocialResponseBuilder {
  loginSuccess(response: SocialLoginResponse): SocialLoginResponse;
  connectSuccess(response: SocialConnectResponse): SocialConnectResponse;
  disconnectSuccess(response: SocialDisconnectResponse): SocialDisconnectResponse;
  ssoSuccess(response: SsoLoginResponse): SsoLoginResponse;
  error(code: string, message: string, details?: Record<string, unknown>): SocialErrorResponse;
}

/**
 * Social Error Response
 * Error response for social operations
 */
export interface SocialErrorResponse {
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
 * Social Constants
 * Social-related constants (re-exported from shared-constants)
 */
export const SOCIAL_PROVIDERS = SOCIAL_PROVIDER;
export const SOCIAL_STATUSES = SOCIAL_STATUS;
export const OAUTH_PROVIDERS = OAUTH_PROVIDER;
export const OAUTH_STATUSES = OAUTH_STATUS;
export const SSO_PROVIDERS = SSO_PROVIDER;
export const SSO_STATUSES = SSO_STATUS;
export const SOCIAL_CONFIG_DEFAULT = SOCIAL_CONFIG;
export const OAUTH_CONFIG_DEFAULT = OAUTH_CONFIG;
export const SSO_CONFIG_DEFAULT = SSO_CONFIG;

/**
 * Default Social Configuration
 */
export const DEFAULT_SOCIAL_CONFIG = {
  enabledProviders: SOCIAL_ENABLED_PROVIDERS,
  defaultProvider: SOCIAL_DEFAULT_PROVIDER,
  callbackTimeout: SOCIAL_CALLBACK_TIMEOUT,
  stateExpiry: SOCIAL_STATE_EXPIRY,
  scopes: SOCIAL_SCOPES,
} as const;

/**
 * Social Webhook
 * Webhook payload for social events
 */
export interface SocialWebhook {
  event: string;
  userId: UserId;
  provider: SocialProvider;
  status: SocialStatus;
  timestamp: Timestamp;
  data: Record<string, unknown>;
}

/**
 * Social Statistics
 * Statistical data about social logins
 */
export interface SocialStatistics {
  totalConnections: number;
  activeConnections: number;
  byProvider: Record<SocialProvider, number>;
  byStatus: Record<SocialStatus, number>;
  newConnectionsToday: number;
  newConnectionsWeek: number;
  newConnectionsMonth: number;
  mostUsedProvider: SocialProvider;
  leastUsedProvider: SocialProvider;
  averageConnectionsPerUser: number;
  timestamp: Timestamp;
}

/**
 * Social Account Profile
 * Social account profile data
 */
export interface SocialAccountProfile {
  provider: SocialProvider;
  providerUserId: string;
  email?: Email;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: URL;
  bio?: string;
  location?: string;
  website?: URL;
  birthDate?: string;
  gender?: string;
  followerCount?: number;
  followingCount?: number;
  postCount?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Social Connection Status
 * Status of social connection
 */
export interface SocialConnectionStatus {
  userId: UserId;
  connected: boolean;
  provider: SocialProvider;
  connectedAt?: Timestamp;
  lastUsedAt?: Timestamp;
  isPrimary: boolean;
  status: SocialStatus;
  accountInfo?: SocialAccountProfile;
}

/**
 * Social Account Link Request
 * Request to link social account
 */
export interface SocialAccountLinkRequest {
  userId: UserId;
  provider: SocialProvider;
  providerUserId: string;
  accessToken: Token;
  refreshToken?: Token;
  expiresIn: number;
  metadata?: Record<string, unknown>;
}

/**
 * Social Account Link Response
 * Response after social account linking
 */
export interface SocialAccountLinkResponse {
  success: boolean;
  data?: {
    linked: boolean;
    provider: SocialProvider;
    providerUserId: string;
    linkedAt: Timestamp;
    accountId: string;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Social Account Unlink Request
 * Request to unlink social account
 */
export interface SocialAccountUnlinkRequest {
  userId: UserId;
  provider: SocialProvider;
  providerUserId: string;
  reason?: string;
  keepLocalAccount: boolean;
}

/**
 * Social Account Unlink Response
 * Response after social account unlinking
 */
export interface SocialAccountUnlinkResponse {
  success: boolean;
  data?: {
    unlinked: boolean;
    provider: SocialProvider;
    unlinkedAt: Timestamp;
    localAccountKept: boolean;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}
