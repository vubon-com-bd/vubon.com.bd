/**
 * Authentication OAuth Constants
 * OAuth 2.0 and OIDC configuration and constants
 */

/**
 * OAuth Grant Types
 * OAuth 2.0 grant types supported by the platform
 */
export const OAUTH_GRANT_TYPES = {
  /** Authorization code grant */
  AUTHORIZATION_CODE: 'authorization_code',
  /** Implicit grant (deprecated, but supported for legacy) */
  IMPLICIT: 'implicit',
  /** Resource owner password credentials grant */
  PASSWORD: 'password',
  /** Client credentials grant */
  CLIENT_CREDENTIALS: 'client_credentials',
  /** Refresh token grant */
  REFRESH_TOKEN: 'refresh_token',
  /** Device code grant */
  DEVICE_CODE: 'urn:ietf:params:oauth:grant-type:device_code',
  /** JWT bearer grant */
  JWT_BEARER: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
} as const;

export type OAuthGrantType = (typeof OAUTH_GRANT_TYPES)[keyof typeof OAUTH_GRANT_TYPES];

/**
 * OAuth Response Types
 * OAuth 2.0 response types
 */
export const OAUTH_RESPONSE_TYPES = {
  /** Authorization code */
  CODE: 'code',
  /** Access token (implicit) */
  TOKEN: 'token',
  /** ID token (OIDC) */
  ID_TOKEN: 'id_token',
  /** Code and token */
  CODE_TOKEN: 'code token',
  /** Token and ID token */
  TOKEN_ID_TOKEN: 'token id_token',
  /** Code and ID token */
  CODE_ID_TOKEN: 'code id_token',
  /** Code, token, and ID token */
  CODE_TOKEN_ID_TOKEN: 'code token id_token',
  /** None (for logout) */
  NONE: 'none',
} as const;

export type OAuthResponseType = (typeof OAUTH_RESPONSE_TYPES)[keyof typeof OAUTH_RESPONSE_TYPES];

/**
 * OAuth Scopes
 * OAuth 2.0 scopes supported by the platform
 */
export const OAUTH_SCOPES = {
  /** Read access to user profile */
  PROFILE: 'profile',
  /** Read access to email */
  EMAIL: 'email',
  /** Read access to phone number */
  PHONE: 'phone',
  /** Read access to address */
  ADDRESS: 'address',
  /** Read access to orders */
  ORDERS_READ: 'orders:read',
  /** Write access to orders */
  ORDERS_WRITE: 'orders:write',
  /** Read access to products */
  PRODUCTS_READ: 'products:read',
  /** Write access to products */
  PRODUCTS_WRITE: 'products:write',
  /** Read access to payments */
  PAYMENTS_READ: 'payments:read',
  /** Write access to payments */
  PAYMENTS_WRITE: 'payments:write',
  /** Read access to users */
  USERS_READ: 'users:read',
  /** Write access to users */
  USERS_WRITE: 'users:write',
  /** Read access to vendors */
  VENDORS_READ: 'vendors:read',
  /** Write access to vendors */
  VENDORS_WRITE: 'vendors:write',
  /** Offline access (refresh token) */
  OFFLINE_ACCESS: 'offline_access',
  /** OpenID Connect */
  OPENID: 'openid',
} as const;

export type OAuthScope = (typeof OAUTH_SCOPES)[keyof typeof OAUTH_SCOPES];

/**
 * OAuth Token Types
 * Types of OAuth tokens
 */
export const OAUTH_TOKEN_TYPES = {
  /** Bearer token */
  BEARER: 'bearer',
  /** MAC token */
  MAC: 'mac',
  /** DPoP token */
  DPOP: 'dpop',
} as const;

export type OAuthTokenType = (typeof OAUTH_TOKEN_TYPES)[keyof typeof OAUTH_TOKEN_TYPES];

/**
 * OAuth Token Status
 * Status of OAuth tokens
 */
export const OAUTH_TOKEN_STATUS = {
  /** Token is active */
  ACTIVE: 'active',
  /** Token has expired */
  EXPIRED: 'expired',
  /** Token has been revoked */
  REVOKED: 'revoked',
  /** Token is pending */
  PENDING: 'pending',
  /** Token is invalid */
  INVALID: 'invalid',
} as const;

export type OAuthTokenStatus = (typeof OAUTH_TOKEN_STATUS)[keyof typeof OAUTH_TOKEN_STATUS];

/**
 * OAuth Configuration
 * Default configuration values for OAuth
 */
export const OAUTH_CONFIG = {
  /** Access token expiry in seconds (1 hour) */
  ACCESS_TOKEN_EXPIRY: 3600,
  /** Refresh token expiry in seconds (30 days) */
  REFRESH_TOKEN_EXPIRY: 2592000,
  /** Authorization code expiry in seconds (10 minutes) */
  AUTHORIZATION_CODE_EXPIRY: 600,
  /** Device code expiry in seconds (10 minutes) */
  DEVICE_CODE_EXPIRY: 600,
  /** Maximum OAuth clients per user */
  MAX_CLIENTS_PER_USER: 10,
  /** Maximum scopes per token */
  MAX_SCOPES_PER_TOKEN: 10,
  /** Maximum refresh token reuse count */
  MAX_REFRESH_TOKEN_REUSE: 3,
  /** OAuth issuer */
  ISSUER: 'vubon.com.bd',
  /** OAuth token endpoint */
  TOKEN_ENDPOINT: '/oauth/token',
  /** OAuth authorization endpoint */
  AUTHORIZATION_ENDPOINT: '/oauth/authorize',
  /** OAuth user info endpoint */
  USER_INFO_ENDPOINT: '/oauth/userinfo',
  /** OAuth revocation endpoint */
  REVOCATION_ENDPOINT: '/oauth/revoke',
  /** OAuth introspection endpoint */
  INTROSPECTION_ENDPOINT: '/oauth/introspect',
  /** PKCE code challenge method */
  PKCE_METHOD: 'S256' as const,
  /** Enable PKCE for public clients */
  ENABLE_PKCE: true,
} as const;

export type OAuthConfig = (typeof OAUTH_CONFIG)[keyof typeof OAUTH_CONFIG];

/**
 * OAuth Error Messages
 * Error messages for OAuth failures
 */
export const OAUTH_ERRORS = {
  /** Invalid OAuth request */
  INVALID_REQUEST: 'Invalid OAuth request',
  /** Unauthorized client */
  UNAUTHORIZED_CLIENT: 'Unauthorized client',
  /** Access denied by resource owner */
  ACCESS_DENIED: 'Access denied by resource owner',
  /** Unsupported response type */
  UNSUPPORTED_RESPONSE_TYPE: 'Unsupported response type',
  /** Invalid scope */
  INVALID_SCOPE: 'Invalid scope',
  /** Server error */
  SERVER_ERROR: 'OAuth server error',
  /** Temporarily unavailable */
  TEMPORARILY_UNAVAILABLE: 'OAuth service temporarily unavailable',
  /** Invalid client credentials */
  INVALID_CLIENT: 'Invalid client credentials',
  /** Invalid grant type */
  INVALID_GRANT: 'Invalid grant type',
  /** Invalid authorization code */
  INVALID_AUTHORIZATION_CODE: 'Invalid authorization code',
  /** Invalid refresh token */
  INVALID_REFRESH_TOKEN: 'Invalid refresh token',
  /** Invalid device code */
  INVALID_DEVICE_CODE: 'Invalid device code',
  /** Code already used */
  CODE_ALREADY_USED: 'Authorization code already used',
  /** Token expired */
  TOKEN_EXPIRED: 'Token has expired',
  /** Token invalid */
  TOKEN_INVALID: 'Token is invalid',
  /** Token revoked */
  TOKEN_REVOKED: 'Token has been revoked',
  /** Insufficient scope */
  INSUFFICIENT_SCOPE: 'Insufficient scope for the requested resource',
  /** Invalid client ID */
  INVALID_CLIENT_ID: 'Invalid client ID',
  /** Invalid redirect URI */
  INVALID_REDIRECT_URI: 'Invalid redirect URI',
  /** Unsupported grant type */
  UNSUPPORTED_GRANT_TYPE: 'Unsupported grant type',
  /** Invalid PKCE challenge */
  INVALID_PKCE_CHALLENGE: 'Invalid PKCE challenge',
} as const;

export type OAuthError = (typeof OAUTH_ERRORS)[keyof typeof OAUTH_ERRORS];

/**
 * OAuth Success Messages
 * Success messages for OAuth operations
 */
export const OAUTH_SUCCESS = {
  TOKEN_GENERATED: 'Token generated successfully',
  TOKEN_REFRESHED: 'Token refreshed successfully',
  TOKEN_REVOKED: 'Token revoked successfully',
  TOKEN_INTROSPECTED: 'Token introspection successful',
  AUTHORIZATION_GRANTED: 'Authorization granted successfully',
} as const;

export type OAuthSuccess = (typeof OAUTH_SUCCESS)[keyof typeof OAUTH_SUCCESS];

/**
 * OAuth Client Types
 * Types of OAuth clients
 */
export const OAUTH_CLIENT_TYPES = {
  /** Public client (mobile, SPA) */
  PUBLIC: 'public',
  /** Confidential client (server) */
  CONFIDENTIAL: 'confidential',
} as const;

export type OAuthClientType = (typeof OAUTH_CLIENT_TYPES)[keyof typeof OAUTH_CLIENT_TYPES];

/**
 * OAuth Client Authentication Methods
 * Methods for client authentication
 */
export const OAUTH_CLIENT_AUTH_METHODS = {
  /** Client secret (basic auth) */
  CLIENT_SECRET_BASIC: 'client_secret_basic',
  /** Client secret (POST) */
  CLIENT_SECRET_POST: 'client_secret_post',
  /** Client secret (JWT) */
  CLIENT_SECRET_JWT: 'client_secret_jwt',
  /** Private key JWT */
  PRIVATE_KEY_JWT: 'private_key_jwt',
  /** None (public clients) */
  NONE: 'none',
} as const;

export type OAuthClientAuthMethod =
  (typeof OAUTH_CLIENT_AUTH_METHODS)[keyof typeof OAUTH_CLIENT_AUTH_METHODS];

/**
 * OAuth Grant Type Labels
 * Human-readable labels for each grant type
 */
export const OAUTH_GRANT_TYPE_LABELS: Record<OAuthGrantType, string> = {
  [OAUTH_GRANT_TYPES.AUTHORIZATION_CODE]: 'Authorization Code',
  [OAUTH_GRANT_TYPES.IMPLICIT]: 'Implicit (deprecated)',
  [OAUTH_GRANT_TYPES.PASSWORD]: 'Resource Owner Password',
  [OAUTH_GRANT_TYPES.CLIENT_CREDENTIALS]: 'Client Credentials',
  [OAUTH_GRANT_TYPES.REFRESH_TOKEN]: 'Refresh Token',
  [OAUTH_GRANT_TYPES.DEVICE_CODE]: 'Device Code',
  [OAUTH_GRANT_TYPES.JWT_BEARER]: 'JWT Bearer',
} as const;

/**
 * OAuth Scope Labels
 * Human-readable labels for each scope
 */
export const OAUTH_SCOPE_LABELS: Record<OAuthScope, string> = {
  [OAUTH_SCOPES.PROFILE]: 'View profile information',
  [OAUTH_SCOPES.EMAIL]: 'View email address',
  [OAUTH_SCOPES.PHONE]: 'View phone number',
  [OAUTH_SCOPES.ADDRESS]: 'View address information',
  [OAUTH_SCOPES.ORDERS_READ]: 'Read orders',
  [OAUTH_SCOPES.ORDERS_WRITE]: 'Create and update orders',
  [OAUTH_SCOPES.PRODUCTS_READ]: 'Read products',
  [OAUTH_SCOPES.PRODUCTS_WRITE]: 'Create and update products',
  [OAUTH_SCOPES.PAYMENTS_READ]: 'Read payments',
  [OAUTH_SCOPES.PAYMENTS_WRITE]: 'Create and update payments',
  [OAUTH_SCOPES.USERS_READ]: 'Read users',
  [OAUTH_SCOPES.USERS_WRITE]: 'Create and update users',
  [OAUTH_SCOPES.VENDORS_READ]: 'Read vendors',
  [OAUTH_SCOPES.VENDORS_WRITE]: 'Create and update vendors',
  [OAUTH_SCOPES.OFFLINE_ACCESS]: 'Offline access (refresh token)',
  [OAUTH_SCOPES.OPENID]: 'OpenID Connect authentication',
} as const;

/**
 * Default OAuth Scopes for different grant types
 */
export const OAUTH_DEFAULT_SCOPES: Record<OAuthGrantType, OAuthScope[]> = {
  [OAUTH_GRANT_TYPES.AUTHORIZATION_CODE]: [
    OAUTH_SCOPES.PROFILE,
    OAUTH_SCOPES.EMAIL,
    OAUTH_SCOPES.OPENID,
  ],
  [OAUTH_GRANT_TYPES.IMPLICIT]: [OAUTH_SCOPES.PROFILE, OAUTH_SCOPES.EMAIL],
  [OAUTH_GRANT_TYPES.PASSWORD]: [
    OAUTH_SCOPES.PROFILE,
    OAUTH_SCOPES.EMAIL,
    OAUTH_SCOPES.OFFLINE_ACCESS,
  ],
  [OAUTH_GRANT_TYPES.CLIENT_CREDENTIALS]: [],
  [OAUTH_GRANT_TYPES.REFRESH_TOKEN]: [],
  [OAUTH_GRANT_TYPES.DEVICE_CODE]: [OAUTH_SCOPES.PROFILE, OAUTH_SCOPES.EMAIL],
  [OAUTH_GRANT_TYPES.JWT_BEARER]: [],
} as const;

/**
 * Helper function to check if OAuth grant type is valid
 */
export function isValidOAuthGrantType(type: string): type is OAuthGrantType {
  return Object.values(OAUTH_GRANT_TYPES).includes(type as OAuthGrantType);
}

/**
 * Helper function to check if OAuth response type is valid
 */
export function isValidOAuthResponseType(type: string): type is OAuthResponseType {
  return Object.values(OAUTH_RESPONSE_TYPES).includes(type as OAuthResponseType);
}

/**
 * Helper function to check if OAuth scope is valid
 */
export function isValidOAuthScope(scope: string): scope is OAuthScope {
  return Object.values(OAUTH_SCOPES).includes(scope as OAuthScope);
}

/**
 * Helper function to check if OAuth token type is valid
 */
export function isValidOAuthTokenType(type: string): type is OAuthTokenType {
  return Object.values(OAUTH_TOKEN_TYPES).includes(type as OAuthTokenType);
}

/**
 * Helper function to check if OAuth client type is valid
 */
export function isValidOAuthClientType(type: string): type is OAuthClientType {
  return Object.values(OAUTH_CLIENT_TYPES).includes(type as OAuthClientType);
}

/**
 * Helper function to check if OAuth token status is valid
 */
export function isValidOAuthTokenStatus(status: string): status is OAuthTokenStatus {
  return Object.values(OAUTH_TOKEN_STATUS).includes(status as OAuthTokenStatus);
}

/**
 * Helper function to get OAuth grant type label
 */
export function getOAuthGrantTypeLabel(type: OAuthGrantType): string {
  return OAUTH_GRANT_TYPE_LABELS[type] || 'Unknown Grant Type';
}

/**
 * Helper function to get OAuth scope label
 */
export function getOAuthScopeLabel(scope: OAuthScope): string {
  return OAUTH_SCOPE_LABELS[scope] || 'Unknown Scope';
}

/**
 * Helper function to get OAuth default scopes for grant type
 */
export function getOAuthDefaultScopes(grantType: OAuthGrantType): OAuthScope[] {
  return OAUTH_DEFAULT_SCOPES[grantType] || [];
}

/**
 * Helper function to check if token is active
 */
export function isOAuthTokenActive(status: OAuthTokenStatus): boolean {
  return status === OAUTH_TOKEN_STATUS.ACTIVE;
}

/**
 * Helper function to check if token is valid
 */
export function isOAuthTokenValid(status: OAuthTokenStatus): boolean {
  const validStatuses: OAuthTokenStatus[] = [OAUTH_TOKEN_STATUS.ACTIVE, OAUTH_TOKEN_STATUS.PENDING];
  return validStatuses.includes(status);
}

/**
 * Helper function to check if token is expired
 */
export function isOAuthTokenExpired(status: OAuthTokenStatus): boolean {
  return status === OAUTH_TOKEN_STATUS.EXPIRED;
}

/**
 * Helper function to check if token needs refresh
 */
export function doesOAuthTokenNeedRefresh(
  createdAt: Date,
  expiry: number = OAUTH_CONFIG.ACCESS_TOKEN_EXPIRY
): boolean {
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  return age >= expiry;
}

/**
 * Helper function to get remaining token time in seconds
 */
export function getOAuthTokenRemainingTime(
  createdAt: Date,
  expiry: number = OAUTH_CONFIG.ACCESS_TOKEN_EXPIRY
): number {
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  const remaining = expiry - age;
  return Math.max(0, remaining);
}

/**
 * Helper function to validate OAuth scopes
 * Returns true if all scopes are valid
 */
export function validateOAuthScopes(scopes: string[]): { valid: boolean; invalidScopes: string[] } {
  const invalidScopes = scopes.filter((scope) => !isValidOAuthScope(scope));
  return {
    valid: invalidScopes.length === 0,
    invalidScopes,
  };
}

/**
 * Helper function to check if scope is sensitive
 * Sensitive scopes require special handling
 */
export function isSensitiveOAuthScope(scope: OAuthScope): boolean {
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
 * Helper function to get OAuth scope descriptions for UI
 */
export function getOAuthScopeDescriptions(scopes: OAuthScope[]): Record<OAuthScope, string> {
  const result: Partial<Record<OAuthScope, string>> = {};
  scopes.forEach((scope) => {
    result[scope] = OAUTH_SCOPE_LABELS[scope] || 'Unknown scope';
  });
  return result as Record<OAuthScope, string>;
}
