/**
 * Authentication OAuth Types Module
 * OAuth 2.0 and OpenID Connect types for authentication system
 * Handles OAuth flows, tokens, client management, and authorization
 */

import { authentication } from '@vubon/shared-constants';
import { UserId, Email, Timestamp, Token, URL } from './core-primitives.types';

// Import OAuth constants from shared-constants
const {
  OAUTH_DEFAULT_PROVIDER,
  OAUTH_GRANT_TYPES,
  OAUTH_TOKEN_EXPIRY,
  OAUTH_REFRESH_TOKEN_EXPIRY,
  OAUTH_SCOPES,
  OAUTH_CONFIG,
  OAUTH_PROVIDER,
  OAUTH_STATUS,
} = authentication;

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
 * OAuth Grant Type
 * OAuth 2.0 grant types
 */
export type OAuthGrantType =
  | 'authorization_code'
  | 'refresh_token'
  | 'client_credentials'
  | 'password'
  | 'implicit'
  | 'device_code';

/**
 * OAuth Scope
 * OAuth scope definitions
 */
export type OAuthScope = string;

/**
 * OAuth Client
 * OAuth client application
 */
export interface OAuthClient {
  id: string;
  clientId: string;
  clientSecret: string;
  clientName: string;
  clientType: 'public' | 'confidential' | 'trusted';
  redirectUris: URL[];
  allowedGrantTypes: OAuthGrantType[];
  allowedScopes: string[];
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastUsedAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * OAuth Token
 * OAuth access token
 */
export interface OAuthToken {
  id: string;
  clientId: string;
  userId: UserId;
  accessToken: Token;
  refreshToken?: Token;
  tokenType: 'Bearer' | 'MAC';
  scope: string[];
  expiresAt: Timestamp;
  refreshTokenExpiresAt?: Timestamp;
  issuedAt: Timestamp;
  revokedAt?: Timestamp;
  isRevoked: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * OAuth Authorization Request
 * Request for OAuth authorization
 */
export interface OAuthAuthorizationRequest {
  clientId: string;
  redirectUri: URL;
  responseType: 'code' | 'token' | 'id_token';
  scope: string[];
  state?: string;
  codeChallenge?: string;
  codeChallengeMethod?: 'plain' | 'S256';
  nonce?: string;
  prompt?: 'none' | 'login' | 'consent' | 'select_account';
  maxAge?: number;
  metadata?: Record<string, unknown>;
}

/**
 * OAuth Authorization Response
 * Response from OAuth authorization
 */
export interface OAuthAuthorizationResponse {
  success: boolean;
  data?: {
    code?: string;
    state?: string;
    redirectUri: URL;
    expiresIn: number;
    tokenType?: string;
    accessToken?: Token;
    idToken?: Token;
    scope?: string;
  };
  error?: string;
  errorDescription?: string;
  timestamp: Timestamp;
}

/**
 * OAuth Token Request
 * Request for OAuth token
 */
export interface OAuthTokenRequest {
  clientId: string;
  clientSecret?: string;
  grantType: OAuthGrantType;
  code?: string;
  redirectUri?: URL;
  refreshToken?: Token;
  codeVerifier?: string;
  username?: string;
  password?: string;
  scope?: string[];
  metadata?: Record<string, unknown>;
}

/**
 * OAuth Token Response
 * Response from OAuth token endpoint
 */
export interface OAuthTokenResponse {
  success: boolean;
  data?: {
    accessToken: Token;
    tokenType: 'Bearer' | 'MAC';
    expiresIn: number;
    refreshToken?: Token;
    refreshTokenExpiresIn?: number;
    scope?: string;
    idToken?: Token;
    userId?: UserId;
  };
  error?: string;
  errorDescription?: string;
  timestamp: Timestamp;
}

/**
 * OAuth Client Registration Request
 * Request to register OAuth client
 */
export interface OAuthClientRegistrationRequest {
  clientName: string;
  clientType: 'public' | 'confidential' | 'trusted';
  redirectUris: URL[];
  allowedGrantTypes: OAuthGrantType[];
  allowedScopes: string[];
  accessTokenExpiry?: number;
  refreshTokenExpiry?: number;
  metadata?: Record<string, unknown>;
}

/**
 * OAuth Client Registration Response
 * Response after OAuth client registration
 */
export interface OAuthClientRegistrationResponse {
  success: boolean;
  data?: {
    clientId: string;
    clientSecret: string;
    clientName: string;
    clientType: string;
    redirectUris: URL[];
    allowedGrantTypes: OAuthGrantType[];
    allowedScopes: string[];
    createdAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * OAuth Authorization Code
 * OAuth authorization code
 */
export interface OAuthAuthorizationCode {
  id: string;
  code: string;
  clientId: string;
  userId: UserId;
  redirectUri: URL;
  scope: string[];
  codeChallenge?: string;
  codeChallengeMethod?: 'plain' | 'S256';
  nonce?: string;
  expiresAt: Timestamp;
  createdAt: Timestamp;
  usedAt?: Timestamp;
  isUsed: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * OAuth Refresh Token
 * OAuth refresh token
 */
export interface OAuthRefreshToken {
  id: string;
  token: Token;
  clientId: string;
  userId: UserId;
  scope: string[];
  expiresAt: Timestamp;
  createdAt: Timestamp;
  revokedAt?: Timestamp;
  isRevoked: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * OAuth Session
 * OAuth user session
 */
export interface OAuthSession {
  id: string;
  userId: UserId;
  clientId: string;
  scope: string[];
  createdAt: Timestamp;
  expiresAt: Timestamp;
  lastActivityAt?: Timestamp;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * OAuth Consent
 * User consent for OAuth scopes
 */
export interface OAuthConsent {
  id: string;
  userId: UserId;
  clientId: string;
  scope: string[];
  grantedAt: Timestamp;
  expiresAt?: Timestamp;
  isActive: boolean;
  revokedAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * OAuth Filter
 * Filter criteria for OAuth queries
 */
export interface OAuthFilter {
  clientId?: string[];
  userId?: UserId[];
  status?: OAuthStatus[];
  scope?: string[];
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  isActive?: boolean;
}

/**
 * OAuth Response Builder
 * Helper for building OAuth responses
 */
export interface OAuthResponseBuilder {
  authSuccess(response: OAuthAuthorizationResponse): OAuthAuthorizationResponse;
  tokenSuccess(response: OAuthTokenResponse): OAuthTokenResponse;
  clientSuccess(response: OAuthClientRegistrationResponse): OAuthClientRegistrationResponse;
  error(code: string, message: string, details?: Record<string, unknown>): OAuthErrorResponse;
}

/**
 * OAuth Error Response
 * Error response for OAuth operations
 */
export interface OAuthErrorResponse {
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
 * OAuth Constants
 * OAuth-related constants (re-exported from shared-constants)
 */
export const OAUTH_PROVIDERS = OAUTH_PROVIDER;
export const OAUTH_STATUSES = OAUTH_STATUS;
export const OAUTH_GRANT_TYPES_LIST = OAUTH_GRANT_TYPES;
export const OAUTH_SCOPES_LIST = OAUTH_SCOPES;
export const OAUTH_CONFIG_DEFAULT = OAUTH_CONFIG;

/**
 * Default OAuth Configuration
 */
export const DEFAULT_OAUTH_CONFIG = {
  defaultProvider: OAUTH_DEFAULT_PROVIDER,
  tokenExpiry: OAUTH_TOKEN_EXPIRY,
  refreshTokenExpiry: OAUTH_REFRESH_TOKEN_EXPIRY,
} as const;

/**
 * OAuth Webhook
 * Webhook payload for OAuth events
 */
export interface OAuthWebhook {
  event: string;
  userId: UserId;
  clientId: string;
  status: OAuthStatus;
  timestamp: Timestamp;
  data: Record<string, unknown>;
}

/**
 * OAuth Statistics
 * Statistical data about OAuth
 */
export interface OAuthStatistics {
  totalClients: number;
  activeClients: number;
  totalTokens: number;
  activeTokens: number;
  byProvider: Record<string, number>;
  byStatus: Record<string, number>;
  byGrantType: Record<string, number>;
  byScope: Record<string, number>;
  newClientsToday: number;
  newTokensToday: number;
  refreshCount: number;
  revokeCount: number;
  timestamp: Timestamp;
}

/**
 * OAuth Client Credentials
 * OAuth client credentials
 */
export interface OAuthClientCredentials {
  clientId: string;
  clientSecret: string;
  clientName: string;
  clientType: string;
  redirectUris: URL[];
  grantTypes: OAuthGrantType[];
  scopes: string[];
}

/**
 * OAuth Authorization Result
 * Result of OAuth authorization
 */
export interface OAuthAuthorizationResult {
  authorized: boolean;
  userId: UserId;
  clientId: string;
  scope: string[];
  code?: string;
  redirectUri: URL;
  state?: string;
  expiresIn: number;
  grantedAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * OAuth Token Validation
 * OAuth token validation result
 */
export interface OAuthTokenValidation {
  valid: boolean;
  token: Token;
  userId?: UserId;
  clientId?: string;
  scope?: string[];
  expiresAt?: Timestamp;
  isExpired: boolean;
  isRevoked: boolean;
  tokenType?: string;
  metadata?: Record<string, unknown>;
}

/**
 * OAuth Client Update Request
 * Request to update OAuth client
 */
export interface OAuthClientUpdateRequest {
  clientId: string;
  clientName?: string;
  redirectUris?: URL[];
  allowedGrantTypes?: OAuthGrantType[];
  allowedScopes?: string[];
  accessTokenExpiry?: number;
  refreshTokenExpiry?: number;
  isActive?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * OAuth Client Update Response
 * Response after OAuth client update
 */
export interface OAuthClientUpdateResponse {
  success: boolean;
  data?: {
    updated: boolean;
    clientId: string;
    updatedAt: Timestamp;
    updatedFields: string[];
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * OAuth Client Delete Request
 * Request to delete OAuth client
 */
export interface OAuthClientDeleteRequest {
  clientId: string;
  revokeTokens?: boolean;
  reason?: string;
}

/**
 * OAuth Client Delete Response
 * Response after OAuth client deletion
 */
export interface OAuthClientDeleteResponse {
  success: boolean;
  data?: {
    deleted: boolean;
    clientId: string;
    deletedAt: Timestamp;
    tokensRevoked: boolean;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * OAuth Token Revocation Request
 * Request to revoke OAuth token
 */
export interface OAuthTokenRevocationRequest {
  token: Token;
  tokenTypeHint?: 'access_token' | 'refresh_token';
  clientId: string;
  clientSecret?: string;
  reason?: string;
}

/**
 * OAuth Token Revocation Response
 * Response after OAuth token revocation
 */
export interface OAuthTokenRevocationResponse {
  success: boolean;
  data?: {
    revoked: boolean;
    token: Token;
    revokedAt: Timestamp;
    tokenType: string;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * OpenID Connect Claims
 * OpenID Connect user claims
 */
export interface OIDCClaims {
  sub: string;
  iss: string;
  aud: string[];
  exp: number;
  iat: number;
  auth_time?: number;
  nonce?: string;
  at_hash?: string;
  c_hash?: string;
  email?: Email;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  nickname?: string;
  preferred_username?: string;
  profile?: URL;
  picture?: URL;
  website?: URL;
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  address?: {
    formatted?: string;
    street_address?: string;
    locality?: string;
    region?: string;
    postal_code?: string;
    country?: string;
  };
  updated_at?: number;
  [key: string]: unknown;
}

/**
 * OIDC Configuration
 * OpenID Connect configuration
 */
export interface OIDCConfig {
  issuer: URL;
  authorizationEndpoint: URL;
  tokenEndpoint: URL;
  userInfoEndpoint: URL;
  jwksUri: URL;
  registrationEndpoint?: URL;
  scopesSupported: string[];
  responseTypesSupported: string[];
  responseModesSupported: string[];
  grantTypesSupported: string[];
  acrValuesSupported: string[];
  subjectTypesSupported: string[];
  idTokenSigningAlgValuesSupported: string[];
  idTokenEncryptionAlgValuesSupported: string[];
  idTokenEncryptionEncValuesSupported: string[];
  userInfoSigningAlgValuesSupported: string[];
  userInfoEncryptionAlgValuesSupported: string[];
  userInfoEncryptionEncValuesSupported: string[];
  requestObjectSigningAlgValuesSupported: string[];
  requestObjectEncryptionAlgValuesSupported: string[];
  requestObjectEncryptionEncValuesSupported: string[];
  tokenEndpointAuthMethodsSupported: string[];
  tokenEndpointAuthSigningAlgValuesSupported: string[];
  displayValuesSupported: string[];
  claimTypesSupported: string[];
  claimsSupported: string[];
  serviceDocumentation: URL;
  uiLocalesSupported: string[];
  opPolicyUri: URL;
  opTosUri: URL;
  revocationEndpoint: URL;
  revocationEndpointAuthMethodsSupported: string[];
  revocationEndpointAuthSigningAlgValuesSupported: string[];
  introspectionEndpoint: URL;
  introspectionEndpointAuthMethodsSupported: string[];
  introspectionEndpointAuthSigningAlgValuesSupported: string[];
  codeChallengeMethodsSupported: string[];
}
