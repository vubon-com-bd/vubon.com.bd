/**
 * Authentication OAuth Types
 * Types for OAuth 2.0 and OpenID Connect flows
 */

import type {
  OAuthGrantType,
  OAuthResponseType,
  OAuthScope,
  OAuthTokenType,
  OAuthTokenStatus,
  OAuthClientType,
  OAuthClientAuthMethod,
  OAuthError,
} from '@vubon/shared-constants';
import {
  OAUTH_CONFIG,
  OAUTH_GRANT_TYPES,
  OAUTH_RESPONSE_TYPES,
  OAUTH_SCOPES,
  OAUTH_ERRORS,
} from '@vubon/shared-constants';
import type { ID, Timestamp, Url } from '../common/core-primitives.types';

// ============================================================
// OAUTH CLIENT
// ============================================================

/**
 * OAuth client record
 */
export interface AuthOAuthClient {
  /** Unique client ID */
  clientId: string;
  /** Client secret (hashed) */
  clientSecretHash: string;
  /** Client name */
  name: string;
  /** Client description */
  description?: string;
  /** Client type (public/confidential) */
  clientType: OAuthClientType;
  /** Client authentication method */
  authMethod: OAuthClientAuthMethod;
  /** Allowed redirect URIs */
  redirectUris: Url[];
  /** Allowed grant types */
  grantTypes: OAuthGrantType[];
  /** Allowed scopes */
  scopes: OAuthScope[];
  /** Allowed response types */
  responseTypes: OAuthResponseType[];
  /** Whether client is active */
  isActive: boolean;
  /** Whether client is trusted */
  isTrusted: boolean;
  /** Require PKCE for this client */
  requirePkce: boolean;
  /** Client metadata */
  metadata?: {
    logoUri?: Url;
    policyUri?: Url;
    tosUri?: Url;
    contacts?: string[];
    [key: string]: unknown;
  };
  /** When the client was created */
  createdAt: Timestamp;
  /** When the client was updated */
  updatedAt: Timestamp;
  /** When the client expires (if applicable) */
  expiresAt?: Timestamp;
}

// ============================================================
// OAUTH TOKEN
// ============================================================

/**
 * OAuth token record
 */
export interface AuthOAuthToken {
  /** Unique token ID */
  id: ID;
  /** Access token value (hashed) */
  accessTokenHash: string;
  /** Refresh token value (hashed) */
  refreshTokenHash?: string;
  /** Token type */
  tokenType: OAuthTokenType;
  /** Token status */
  status: OAuthTokenStatus;
  /** Client ID */
  clientId: string;
  /** User ID (if user-authorized) */
  userId?: ID;
  /** Granted scopes */
  scopes: OAuthScope[];
  /** Grant type used */
  grantType: OAuthGrantType;
  /** When the token was issued */
  issuedAt: Timestamp;
  /** When the token expires */
  expiresAt: Timestamp;
  /** When the refresh token expires (if applicable) */
  refreshExpiresAt?: Timestamp;
  /** Token metadata */
  metadata?: Record<string, unknown>;
}

// ============================================================
// OAUTH AUTHORIZATION REQUEST
// ============================================================

/**
 * OAuth authorization request
 */
export interface AuthOAuthAuthorizeRequest {
  /** Client ID */
  clientId: string;
  /** Response type */
  responseType: OAuthResponseType;
  /** Redirect URI */
  redirectUri: Url;
  /** Requested scopes */
  scope?: string;
  /** State parameter for CSRF protection */
  state?: string;
  /** PKCE code challenge */
  codeChallenge?: string;
  /** PKCE code challenge method */
  codeChallengeMethod?: 'plain' | 'S256';
  /** Additional parameters */
  [key: string]: unknown;
}

// ============================================================
// OAUTH TOKEN REQUEST
// ============================================================

/**
 * OAuth token request
 */
export interface AuthOAuthTokenRequest {
  /** Grant type */
  grantType: OAuthGrantType;
  /** Client ID */
  clientId: string;
  /** Client secret (for confidential clients) */
  clientSecret?: string;
  /** Authorization code (for authorization_code grant) */
  code?: string;
  /** Redirect URI (for authorization_code grant) */
  redirectUri?: Url;
  /** Refresh token (for refresh_token grant) */
  refreshToken?: string;
  /** Resource owner credentials (for password grant) */
  username?: string;
  /** Resource owner credentials (for password grant) */
  password?: string;
  /** PKCE code verifier (for authorization_code grant) */
  codeVerifier?: string;
  /** Requested scopes */
  scope?: string;
}

// ============================================================
// OAUTH TOKEN RESPONSE
// ============================================================

/**
 * OAuth token response
 */
export interface AuthOAuthTokenResponse {
  /** Access token */
  access_token: string;
  /** Token type */
  token_type: OAuthTokenType;
  /** Token expiry in seconds */
  expires_in: number;
  /** Refresh token (if applicable) */
  refresh_token?: string;
  /** ID token (for OIDC) */
  id_token?: string;
  /** Granted scopes */
  scope?: string;
}

// ============================================================
// OAUTH INTROSPECTION
// ============================================================

/**
 * OAuth token introspection request
 */
export interface AuthOAuthIntrospectRequest {
  /** Token to introspect */
  token: string;
  /** Token type hint (optional) */
  token_type_hint?: 'access_token' | 'refresh_token';
}

/**
 * OAuth token introspection response
 */
export interface AuthOAuthIntrospectResponse {
  /** Whether the token is active */
  active: boolean;
  /** Token scopes */
  scope?: string;
  /** Client ID */
  client_id?: string;
  /** Username (or user ID) */
  username?: string;
  /** Token type */
  token_type?: OAuthTokenType;
  /** Token expiry timestamp */
  exp?: number;
  /** Token issued timestamp */
  iat?: number;
  /** Token ID */
  jti?: string;
  /** Additional claims */
  [key: string]: unknown;
}

// ============================================================
// OAUTH REVOCATION
// ============================================================

/**
 * OAuth token revocation request
 */
export interface AuthOAuthRevokeRequest {
  /** Token to revoke */
  token: string;
  /** Token type hint (optional) */
  token_type_hint?: 'access_token' | 'refresh_token';
  /** Client ID */
  clientId: string;
  /** Client secret (for confidential clients) */
  clientSecret?: string;
}

// ============================================================
// OAUTH USER INFO
// ============================================================

/**
 * OIDC user info response
 */
export interface AuthOAuthUserInfo {
  /** User ID (sub) */
  sub: string;
  /** Email address */
  email?: string;
  /** Whether email is verified */
  email_verified?: boolean;
  /** Phone number */
  phone_number?: string;
  /** Whether phone is verified */
  phone_number_verified?: boolean;
  /** Full name */
  name?: string;
  /** Given name */
  given_name?: string;
  /** Family name */
  family_name?: string;
  /** Profile URL */
  profile?: Url;
  /** Picture URL */
  picture?: Url;
  /** Website URL */
  website?: Url;
  /** Locale */
  locale?: string;
  /** Updated timestamp */
  updated_at?: number;
  /** Additional claims */
  [key: string]: unknown;
}

// ============================================================
// OAUTH CLIENT FILTER
// ============================================================

/**
 * Filter for querying OAuth clients
 */
export interface AuthOAuthClientFilter {
  /** Filter by client type */
  clientType?: OAuthClientType;
  /** Filter by auth method */
  authMethod?: OAuthClientAuthMethod;
  /** Filter by active status */
  isActive?: boolean;
  /** Filter by trusted status */
  isTrusted?: boolean;
  /** Filter by grant type */
  grantType?: OAuthGrantType;
  /** Filter by scope */
  scope?: OAuthScope;
  /** Search by name or description */
  search?: string;
}

// ============================================================
// OAUTH TOKEN FILTER
// ============================================================

/**
 * Filter for querying OAuth tokens
 */
export interface AuthOAuthTokenFilter {
  /** Filter by client ID */
  clientId?: string;
  /** Filter by user ID */
  userId?: ID;
  /** Filter by status */
  status?: OAuthTokenStatus;
  /** Filter by grant type */
  grantType?: OAuthGrantType;
  /** Filter by scope */
  scope?: OAuthScope;
  /** Filter by active tokens only */
  activeOnly?: boolean;
}

// ============================================================
// OAUTH CONFIG
// ============================================================

/**
 * OAuth server configuration
 */
export interface AuthOAuthServerConfig {
  /** OAuth issuer */
  issuer: string;
  /** Token endpoint URL */
  tokenEndpoint: Url;
  /** Authorization endpoint URL */
  authorizationEndpoint: Url;
  /** User info endpoint URL */
  userInfoEndpoint: Url;
  /** Revocation endpoint URL */
  revocationEndpoint: Url;
  /** Introspection endpoint URL */
  introspectionEndpoint: Url;
  /** JWKS URI (if using JWT) */
  jwksUri?: Url;
  /** Access token expiry in seconds */
  accessTokenExpiry: number;
  /** Refresh token expiry in seconds */
  refreshTokenExpiry: number;
  /** Authorization code expiry in seconds */
  authorizationCodeExpiry: number;
  /** Supported grant types */
  supportedGrantTypes: OAuthGrantType[];
  /** Supported response types */
  supportedResponseTypes: OAuthResponseType[];
  /** Supported scopes */
  supportedScopes: OAuthScope[];
  /** Supported token types */
  supportedTokenTypes: OAuthTokenType[];
  /** Require PKCE for public clients */
  requirePkce: boolean;
  /** Supported PKCE methods */
  pkceMethods: ('plain' | 'S256')[];
}

// ============================================================
// OAUTH CLIENT CREDENTIALS
// ============================================================

/**
 * OAuth client credentials for storage
 */
export interface AuthOAuthClientCredentials {
  /** Client ID */
  clientId: string;
  /** Client secret (plain text) */
  clientSecret: string;
}

// ============================================================
// OAUTH ERROR RESPONSE
// ============================================================

/**
 * OAuth error response
 */
export interface AuthOAuthErrorResponse {
  /** Error code */
  error: OAuthError;
  /** Human-readable error description */
  error_description?: string;
  /** URI for more information about the error */
  error_uri?: string;
  /** State parameter (if provided in request) */
  state?: string;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if OAuth grant type is valid
 */
export function isValidAuthOAuthGrantType(grantType: string): grantType is OAuthGrantType {
  return Object.values(OAUTH_GRANT_TYPES).includes(grantType as OAuthGrantType);
}

/**
 * Check if OAuth response type is valid
 */
export function isValidAuthOAuthResponseType(
  responseType: string
): responseType is OAuthResponseType {
  return Object.values(OAUTH_RESPONSE_TYPES).includes(responseType as OAuthResponseType);
}

/**
 * Check if OAuth scope is valid
 */
export function isValidAuthOAuthScope(scope: string): scope is OAuthScope {
  return Object.values(OAUTH_SCOPES).includes(scope as OAuthScope);
}

/**
 * Check if OAuth token is active
 */
export function isAuthOAuthTokenActive(status: OAuthTokenStatus): boolean {
  return status === 'active';
}

/**
 * Check if OAuth token is expired
 */
export function isAuthOAuthTokenExpired(status: OAuthTokenStatus): boolean {
  return status === 'expired';
}

/**
 * Check if OAuth token is revoked
 */
export function isAuthOAuthTokenRevoked(status: OAuthTokenStatus): boolean {
  return status === 'revoked';
}

/**
 * Get human-readable label for OAuth grant type
 */
export function getAuthOAuthGrantTypeLabel(grantType: OAuthGrantType): string {
  const labels: Record<OAuthGrantType, string> = {
    authorization_code: 'Authorization Code',
    implicit: 'Implicit (deprecated)',
    password: 'Resource Owner Password',
    client_credentials: 'Client Credentials',
    refresh_token: 'Refresh Token',
    'urn:ietf:params:oauth:grant-type:device_code': 'Device Code',
    'urn:ietf:params:oauth:grant-type:jwt-bearer': 'JWT Bearer',
  };
  return labels[grantType] || 'Unknown Grant Type';
}

/**
 * Get human-readable label for OAuth scope
 */
export function getAuthOAuthScopeLabel(scope: OAuthScope): string {
  const labels: Record<OAuthScope, string> = {
    profile: 'View profile information',
    email: 'View email address',
    phone: 'View phone number',
    address: 'View address information',
    'orders:read': 'Read orders',
    'orders:write': 'Create and update orders',
    'products:read': 'Read products',
    'products:write': 'Create and update products',
    'payments:read': 'Read payments',
    'payments:write': 'Create and update payments',
    'users:read': 'Read users',
    'users:write': 'Create and update users',
    'vendors:read': 'Read vendors',
    'vendors:write': 'Create and update vendors',
    offline_access: 'Offline access (refresh token)',
    openid: 'OpenID Connect authentication',
  };
  return labels[scope] || 'Unknown Scope';
}

/**
 * Get default OAuth config
 */
export function getAuthOAuthDefaultConfig(): AuthOAuthServerConfig {
  return {
    issuer: OAUTH_CONFIG.ISSUER,
    tokenEndpoint: OAUTH_CONFIG.TOKEN_ENDPOINT as Url,
    authorizationEndpoint: OAUTH_CONFIG.AUTHORIZATION_ENDPOINT as Url,
    userInfoEndpoint: OAUTH_CONFIG.USER_INFO_ENDPOINT as Url,
    revocationEndpoint: OAUTH_CONFIG.REVOCATION_ENDPOINT as Url,
    introspectionEndpoint: OAUTH_CONFIG.INTROSPECTION_ENDPOINT as Url,
    accessTokenExpiry: OAUTH_CONFIG.ACCESS_TOKEN_EXPIRY,
    refreshTokenExpiry: OAUTH_CONFIG.REFRESH_TOKEN_EXPIRY,
    authorizationCodeExpiry: OAUTH_CONFIG.AUTHORIZATION_CODE_EXPIRY,
    supportedGrantTypes: Object.values(OAUTH_GRANT_TYPES),
    supportedResponseTypes: Object.values(OAUTH_RESPONSE_TYPES),
    supportedScopes: Object.values(OAUTH_SCOPES),
    supportedTokenTypes: ['bearer', 'mac', 'dpop'],
    requirePkce: OAUTH_CONFIG.ENABLE_PKCE,
    pkceMethods: ['plain', 'S256'],
  };
}

/**
 * Check if OAuth scope is sensitive
 */
export function isAuthOAuthScopeSensitive(scope: OAuthScope): boolean {
  const sensitiveScopes: OAuthScope[] = [
    OAUTH_SCOPES.USERS_READ,
    OAUTH_SCOPES.USERS_WRITE,
    OAUTH_SCOPES.PAYMENTS_READ,
    OAUTH_SCOPES.PAYMENTS_WRITE,
    OAUTH_SCOPES.OFFLINE_ACCESS,
  ];
  return sensitiveScopes.includes(scope);
}

/**
 * Get OAuth scopes from space-separated string
 */
export function parseAuthOAuthScopes(scopeString: string): OAuthScope[] {
  return scopeString
    .split(' ')
    .filter((scope) => isValidAuthOAuthScope(scope))
    .map((scope) => scope as OAuthScope);
}

/**
 * Get OAuth scopes as space-separated string
 */
export function stringifyAuthOAuthScopes(scopes: OAuthScope[]): string {
  return scopes.join(' ');
}

/**
 * Check if OAuth token needs refresh
 */
export function doesAuthOAuthTokenNeedRefresh(
  issuedAt: Date,
  expirySeconds: number = OAUTH_CONFIG.ACCESS_TOKEN_EXPIRY
): boolean {
  const now = Date.now();
  const age = (now - issuedAt.getTime()) / 1000;
  return age >= expirySeconds;
}

/**
 * Calculate remaining OAuth token time
 */
export function getAuthOAuthTokenRemainingTime(
  issuedAt: Date,
  expirySeconds: number = OAUTH_CONFIG.ACCESS_TOKEN_EXPIRY
): number {
  const now = Date.now();
  const age = (now - issuedAt.getTime()) / 1000;
  const remaining = expirySeconds - age;
  return Math.max(0, remaining);
}

/**
 * Create OAuth error response
 */
export function createAuthOAuthErrorResponse(
  error: OAuthError,
  description?: string,
  state?: string
): AuthOAuthErrorResponse {
  // Use type assertion to safely access OAUTH_ERRORS
  const errorMessage = OAUTH_ERRORS[error as keyof typeof OAUTH_ERRORS];
  return {
    error,
    error_description: description || errorMessage || 'Unknown error',
    state,
  };
}

/**
 * Check if OAuth error is valid
 */
export function isValidAuthOAuthError(error: string): error is OAuthError {
  return Object.values(OAUTH_ERRORS).includes(error as OAuthError);
}

/**
 * Get human-readable OAuth error message
 */
export function getAuthOAuthErrorMessage(error: OAuthError): string {
  // Use type assertion to safely access OAUTH_ERRORS
  return OAUTH_ERRORS[error as keyof typeof OAUTH_ERRORS] || 'Unknown OAuth error';
}
