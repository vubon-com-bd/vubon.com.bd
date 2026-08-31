/**
 * Authentication OAuth Schema
 * Zod schemas for OAuth 2.0 and OpenID Connect flows
 */

import { z } from 'zod';
import {
  OAUTH_GRANT_TYPES,
  OAUTH_RESPONSE_TYPES,
  OAUTH_SCOPES,
  OAUTH_TOKEN_TYPES,
  OAUTH_TOKEN_STATUS,
  OAUTH_CLIENT_TYPES,
  OAUTH_CLIENT_AUTH_METHODS,
  OAUTH_CONFIG,
  OAUTH_ERRORS,
  OAUTH_SUCCESS,
  type OAuthGrantType,
  type OAuthResponseType,
  type OAuthScope,
  type OAuthTokenType,
  type OAuthTokenStatus,
  type OAuthClientType,
  type OAuthClientAuthMethod,
  type OAuthError,
  type OAuthSuccess,
} from '@vubon/shared-constants';
import type { Url } from '@vubon/shared-types';
import {
  idSchema,
  urlSchema,
  timestampSchema,
  jsonObjectSchema,
} from '../common/core-primitives.schema';

// ============================================================
// OAUTH GRANT TYPE SCHEMAS
// ============================================================

/**
 * OAuth grant type schema
 */
export const authOAuthGrantTypeSchema = z.enum([
  OAUTH_GRANT_TYPES.AUTHORIZATION_CODE,
  OAUTH_GRANT_TYPES.IMPLICIT,
  OAUTH_GRANT_TYPES.PASSWORD,
  OAUTH_GRANT_TYPES.CLIENT_CREDENTIALS,
  OAUTH_GRANT_TYPES.REFRESH_TOKEN,
  OAUTH_GRANT_TYPES.DEVICE_CODE,
  OAUTH_GRANT_TYPES.JWT_BEARER,
]);

/**
 * OAuth response type schema
 */
export const authOAuthResponseTypeSchema = z.enum([
  OAUTH_RESPONSE_TYPES.CODE,
  OAUTH_RESPONSE_TYPES.TOKEN,
  OAUTH_RESPONSE_TYPES.ID_TOKEN,
  OAUTH_RESPONSE_TYPES.CODE_TOKEN,
  OAUTH_RESPONSE_TYPES.TOKEN_ID_TOKEN,
  OAUTH_RESPONSE_TYPES.CODE_ID_TOKEN,
  OAUTH_RESPONSE_TYPES.CODE_TOKEN_ID_TOKEN,
  OAUTH_RESPONSE_TYPES.NONE,
]);

/**
 * OAuth scope schema
 */
export const authOAuthScopeSchema = z.enum([
  OAUTH_SCOPES.PROFILE,
  OAUTH_SCOPES.EMAIL,
  OAUTH_SCOPES.PHONE,
  OAUTH_SCOPES.ADDRESS,
  OAUTH_SCOPES.ORDERS_READ,
  OAUTH_SCOPES.ORDERS_WRITE,
  OAUTH_SCOPES.PRODUCTS_READ,
  OAUTH_SCOPES.PRODUCTS_WRITE,
  OAUTH_SCOPES.PAYMENTS_READ,
  OAUTH_SCOPES.PAYMENTS_WRITE,
  OAUTH_SCOPES.USERS_READ,
  OAUTH_SCOPES.USERS_WRITE,
  OAUTH_SCOPES.VENDORS_READ,
  OAUTH_SCOPES.VENDORS_WRITE,
  OAUTH_SCOPES.OFFLINE_ACCESS,
  OAUTH_SCOPES.OPENID,
]);

/**
 * OAuth token type schema
 */
export const authOAuthTokenTypeSchema = z.enum([
  OAUTH_TOKEN_TYPES.BEARER,
  OAUTH_TOKEN_TYPES.MAC,
  OAUTH_TOKEN_TYPES.DPOP,
]);

/**
 * OAuth token status schema
 */
export const authOAuthTokenStatusSchema = z.enum([
  OAUTH_TOKEN_STATUS.ACTIVE,
  OAUTH_TOKEN_STATUS.EXPIRED,
  OAUTH_TOKEN_STATUS.REVOKED,
  OAUTH_TOKEN_STATUS.PENDING,
  OAUTH_TOKEN_STATUS.INVALID,
]);

/**
 * OAuth client type schema
 */
export const authOAuthClientTypeSchema = z.enum([
  OAUTH_CLIENT_TYPES.PUBLIC,
  OAUTH_CLIENT_TYPES.CONFIDENTIAL,
]);

/**
 * OAuth client auth method schema
 */
export const authOAuthClientAuthMethodSchema = z.enum([
  OAUTH_CLIENT_AUTH_METHODS.CLIENT_SECRET_BASIC,
  OAUTH_CLIENT_AUTH_METHODS.CLIENT_SECRET_POST,
  OAUTH_CLIENT_AUTH_METHODS.CLIENT_SECRET_JWT,
  OAUTH_CLIENT_AUTH_METHODS.PRIVATE_KEY_JWT,
  OAUTH_CLIENT_AUTH_METHODS.NONE,
]);

// ============================================================
// OAUTH CLIENT SCHEMAS
// ============================================================

/**
 * OAuth client schema
 */
export const authOAuthClientSchema = z.object({
  clientId: z.string().min(1),
  clientSecretHash: z.string().min(1),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  clientType: authOAuthClientTypeSchema,
  authMethod: authOAuthClientAuthMethodSchema,
  redirectUris: z.array(urlSchema).min(1),
  grantTypes: z.array(authOAuthGrantTypeSchema).min(1),
  scopes: z.array(authOAuthScopeSchema).default([]),
  responseTypes: z.array(authOAuthResponseTypeSchema).default([]),
  isActive: z.boolean().default(true),
  isTrusted: z.boolean().default(false),
  requirePkce: z.boolean().default(OAUTH_CONFIG.ENABLE_PKCE),
  metadata: z
    .object({
      logoUri: urlSchema.optional(),
      policyUri: urlSchema.optional(),
      tosUri: urlSchema.optional(),
      contacts: z.array(z.string()).optional(),
    })
    .passthrough()
    .optional(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  expiresAt: timestampSchema.optional(),
});

/**
 * OAuth token schema
 */
export const authOAuthTokenSchema = z.object({
  id: idSchema,
  accessTokenHash: z.string().min(1),
  refreshTokenHash: z.string().optional(),
  tokenType: authOAuthTokenTypeSchema,
  status: authOAuthTokenStatusSchema,
  clientId: z.string().min(1),
  userId: idSchema.optional(),
  scopes: z.array(authOAuthScopeSchema).default([]),
  grantType: authOAuthGrantTypeSchema,
  issuedAt: timestampSchema,
  expiresAt: timestampSchema,
  refreshExpiresAt: timestampSchema.optional(),
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// OAUTH REQUEST SCHEMAS
// ============================================================

/**
 * OAuth authorization request schema
 */
export const authOAuthAuthorizeRequestSchema = z.object({
  clientId: z.string().min(1),
  responseType: authOAuthResponseTypeSchema,
  redirectUri: urlSchema,
  scope: z.string().optional(),
  state: z.string().optional(),
  codeChallenge: z.string().optional(),
  codeChallengeMethod: z.enum(['plain', 'S256']).optional(),
});

/**
 * OAuth token request schema
 */
export const authOAuthTokenRequestSchema = z.object({
  grantType: authOAuthGrantTypeSchema,
  clientId: z.string().min(1),
  clientSecret: z.string().optional(),
  code: z.string().optional(),
  redirectUri: urlSchema.optional(),
  refreshToken: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  codeVerifier: z.string().optional(),
  scope: z.string().optional(),
});

/**
 * OAuth introspect request schema
 */
export const authOAuthIntrospectRequestSchema = z.object({
  token: z.string().min(1),
  token_type_hint: z.enum(['access_token', 'refresh_token']).optional(),
});

/**
 * OAuth revoke request schema
 */
export const authOAuthRevokeRequestSchema = z.object({
  token: z.string().min(1),
  token_type_hint: z.enum(['access_token', 'refresh_token']).optional(),
  clientId: z.string().min(1),
  clientSecret: z.string().optional(),
});

// ============================================================
// OAUTH RESPONSE SCHEMAS
// ============================================================

/**
 * OAuth token response schema
 */
export const authOAuthTokenResponseSchema = z.object({
  access_token: z.string().min(1),
  token_type: authOAuthTokenTypeSchema,
  expires_in: z.number().int().positive(),
  refresh_token: z.string().optional(),
  id_token: z.string().optional(),
  scope: z.string().optional(),
});

/**
 * OAuth introspect response schema
 */
export const authOAuthIntrospectResponseSchema = z.object({
  active: z.boolean(),
  scope: z.string().optional(),
  client_id: z.string().optional(),
  username: z.string().optional(),
  token_type: authOAuthTokenTypeSchema.optional(),
  exp: z.number().int().optional(),
  iat: z.number().int().optional(),
  jti: z.string().optional(),
});

/**
 * OIDC user info schema
 */
export const authOAuthUserInfoSchema = z.object({
  sub: z.string().min(1),
  email: z.string().email().optional(),
  email_verified: z.boolean().optional(),
  phone_number: z.string().optional(),
  phone_number_verified: z.boolean().optional(),
  name: z.string().optional(),
  given_name: z.string().optional(),
  family_name: z.string().optional(),
  profile: urlSchema.optional(),
  picture: urlSchema.optional(),
  website: urlSchema.optional(),
  locale: z.string().optional(),
  updated_at: z.number().int().optional(),
});

// ============================================================
// OAUTH FILTER SCHEMAS
// ============================================================

/**
 * OAuth client filter schema
 */
export const authOAuthClientFilterSchema = z.object({
  clientType: authOAuthClientTypeSchema.optional(),
  authMethod: authOAuthClientAuthMethodSchema.optional(),
  isActive: z.boolean().optional(),
  isTrusted: z.boolean().optional(),
  grantType: authOAuthGrantTypeSchema.optional(),
  scope: authOAuthScopeSchema.optional(),
  search: z.string().optional(),
});

/**
 * OAuth token filter schema
 */
export const authOAuthTokenFilterSchema = z.object({
  clientId: z.string().optional(),
  userId: idSchema.optional(),
  status: authOAuthTokenStatusSchema.optional(),
  grantType: authOAuthGrantTypeSchema.optional(),
  scope: authOAuthScopeSchema.optional(),
  activeOnly: z.boolean().optional(),
});

// ============================================================
// OAUTH ERROR RESPONSE SCHEMA
// ============================================================

/**
 * OAuth error response schema
 */
export const authOAuthErrorResponseSchema = z.object({
  error: z.string(),
  error_description: z.string().optional(),
  error_uri: urlSchema.optional(),
  state: z.string().optional(),
});

// ============================================================
// OAUTH CONFIG SCHEMA
// ============================================================

/**
 * OAuth server config schema
 */
export const authOAuthServerConfigSchema = z.object({
  issuer: z.string().min(1),
  tokenEndpoint: urlSchema,
  authorizationEndpoint: urlSchema,
  userInfoEndpoint: urlSchema,
  revocationEndpoint: urlSchema,
  introspectionEndpoint: urlSchema,
  jwksUri: urlSchema.optional(),
  accessTokenExpiry: z.number().int().positive().default(OAUTH_CONFIG.ACCESS_TOKEN_EXPIRY),
  refreshTokenExpiry: z.number().int().positive().default(OAUTH_CONFIG.REFRESH_TOKEN_EXPIRY),
  authorizationCodeExpiry: z
    .number()
    .int()
    .positive()
    .default(OAUTH_CONFIG.AUTHORIZATION_CODE_EXPIRY),
  supportedGrantTypes: z.array(authOAuthGrantTypeSchema).min(1),
  supportedResponseTypes: z.array(authOAuthResponseTypeSchema).min(1),
  supportedScopes: z.array(authOAuthScopeSchema).default([]),
  supportedTokenTypes: z.array(authOAuthTokenTypeSchema).min(1),
  requirePkce: z.boolean().default(OAUTH_CONFIG.ENABLE_PKCE),
  pkceMethods: z.array(z.enum(['plain', 'S256'])).default(['plain', 'S256']),
});

// ============================================================
// TYPE INFERENCES (Zod থেকে টাইপ বের করা)
// ============================================================

export type AuthOAuthClient = z.infer<typeof authOAuthClientSchema>;
export type AuthOAuthToken = z.infer<typeof authOAuthTokenSchema>;
export type AuthOAuthAuthorizeRequest = z.infer<typeof authOAuthAuthorizeRequestSchema>;
export type AuthOAuthTokenRequest = z.infer<typeof authOAuthTokenRequestSchema>;
export type AuthOAuthIntrospectRequest = z.infer<typeof authOAuthIntrospectRequestSchema>;
export type AuthOAuthRevokeRequest = z.infer<typeof authOAuthRevokeRequestSchema>;
export type AuthOAuthTokenResponse = z.infer<typeof authOAuthTokenResponseSchema>;
export type AuthOAuthIntrospectResponse = z.infer<typeof authOAuthIntrospectResponseSchema>;
export type AuthOAuthUserInfo = z.infer<typeof authOAuthUserInfoSchema>;
export type AuthOAuthClientFilter = z.infer<typeof authOAuthClientFilterSchema>;
export type AuthOAuthTokenFilter = z.infer<typeof authOAuthTokenFilterSchema>;
export type AuthOAuthErrorResponse = z.infer<typeof authOAuthErrorResponseSchema>;
export type AuthOAuthServerConfig = z.infer<typeof authOAuthServerConfigSchema>;

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
 * Check if OAuth token type is valid
 */
export function isValidAuthOAuthTokenType(tokenType: string): tokenType is OAuthTokenType {
  return Object.values(OAUTH_TOKEN_TYPES).includes(tokenType as OAuthTokenType);
}

/**
 * Check if OAuth client type is valid
 */
export function isValidAuthOAuthClientType(clientType: string): clientType is OAuthClientType {
  return Object.values(OAUTH_CLIENT_TYPES).includes(clientType as OAuthClientType);
}

/**
 * Check if OAuth client auth method is valid
 */
export function isValidAuthOAuthClientAuthMethod(method: string): method is OAuthClientAuthMethod {
  return Object.values(OAUTH_CLIENT_AUTH_METHODS).includes(method as OAuthClientAuthMethod);
}

/**
 * Check if OAuth token status is valid
 */
export function isValidAuthOAuthTokenStatus(status: string): status is OAuthTokenStatus {
  return Object.values(OAUTH_TOKEN_STATUS).includes(status as OAuthTokenStatus);
}

/**
 * Check if OAuth error is valid
 */
export function isValidAuthOAuthError(error: string): error is OAuthError {
  return Object.values(OAUTH_ERRORS).includes(error as OAuthError);
}

/**
 * Get OAuth grant type label
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
 * Get OAuth scope label
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
 * Get OAuth token status label
 */
export function getAuthOAuthTokenStatusLabel(status: OAuthTokenStatus): string {
  const labels: Record<OAuthTokenStatus, string> = {
    active: 'Active',
    expired: 'Expired',
    revoked: 'Revoked',
    pending: 'Pending',
    invalid: 'Invalid',
  };
  return labels[status] || 'Unknown Status';
}

/**
 * Get OAuth client type label
 */
export function getAuthOAuthClientTypeLabel(clientType: OAuthClientType): string {
  const labels: Record<OAuthClientType, string> = {
    public: 'Public Client',
    confidential: 'Confidential Client',
  };
  return labels[clientType] || 'Unknown Client Type';
}

/**
 * Get OAuth client auth method label
 */
export function getAuthOAuthClientAuthMethodLabel(method: OAuthClientAuthMethod): string {
  const labels: Record<OAuthClientAuthMethod, string> = {
    client_secret_basic: 'Client Secret (Basic Auth)',
    client_secret_post: 'Client Secret (POST)',
    client_secret_jwt: 'Client Secret (JWT)',
    private_key_jwt: 'Private Key (JWT)',
    none: 'None (Public Client)',
  };
  return labels[method] || 'Unknown Auth Method';
}

/**
 * Get OAuth error message
 */
export function getAuthOAuthErrorMessage(error: OAuthError): string {
  return OAUTH_ERRORS[error as keyof typeof OAUTH_ERRORS] || 'Unknown OAuth error';
}

/**
 * Get OAuth success message
 */
export function getAuthOAuthSuccessMessage(success: OAuthSuccess): string {
  return OAUTH_SUCCESS[success as keyof typeof OAUTH_SUCCESS] || 'Unknown success message';
}

/**
 * Check if OAuth token is active
 */
export function isAuthOAuthTokenActive(status: OAuthTokenStatus): boolean {
  return status === OAUTH_TOKEN_STATUS.ACTIVE;
}

/**
 * Check if OAuth token is expired
 */
export function isAuthOAuthTokenExpired(status: OAuthTokenStatus): boolean {
  return status === OAUTH_TOKEN_STATUS.EXPIRED;
}

/**
 * Check if OAuth token is revoked
 */
export function isAuthOAuthTokenRevoked(status: OAuthTokenStatus): boolean {
  return status === OAUTH_TOKEN_STATUS.REVOKED;
}

/**
 * Check if OAuth token is valid (active or pending)
 */
export function isAuthOAuthTokenValid(status: OAuthTokenStatus): boolean {
  const validStatuses: OAuthTokenStatus[] = [OAUTH_TOKEN_STATUS.ACTIVE, OAUTH_TOKEN_STATUS.PENDING];
  return validStatuses.includes(status);
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
 * Parse OAuth scopes from space-separated string
 */
export function parseAuthOAuthScopes(scopeString: string): OAuthScope[] {
  return scopeString
    .split(' ')
    .filter((scope) => isValidAuthOAuthScope(scope))
    .map((scope) => scope as OAuthScope);
}

/**
 * Stringify OAuth scopes to space-separated string
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
 * Get remaining OAuth token time in seconds
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
 * Get default OAuth scopes for grant type
 */
export function getAuthOAuthDefaultScopes(grantType: OAuthGrantType): OAuthScope[] {
  const defaultScopesMap: Record<OAuthGrantType, OAuthScope[]> = {
    authorization_code: [OAUTH_SCOPES.PROFILE, OAUTH_SCOPES.EMAIL, OAUTH_SCOPES.OPENID],
    implicit: [OAUTH_SCOPES.PROFILE, OAUTH_SCOPES.EMAIL],
    password: [OAUTH_SCOPES.PROFILE, OAUTH_SCOPES.EMAIL, OAUTH_SCOPES.OFFLINE_ACCESS],
    client_credentials: [],
    refresh_token: [],
    'urn:ietf:params:oauth:grant-type:device_code': [OAUTH_SCOPES.PROFILE, OAUTH_SCOPES.EMAIL],
    'urn:ietf:params:oauth:grant-type:jwt-bearer': [],
  };
  return defaultScopesMap[grantType] || [];
}

/**
 * Create OAuth error response
 */
export function createAuthOAuthErrorResponse(
  error: OAuthError,
  description?: string,
  state?: string
): AuthOAuthErrorResponse {
  const errorMessage = OAUTH_ERRORS[error as keyof typeof OAUTH_ERRORS] || 'Unknown OAuth error';

  return {
    error,
    error_description: description || errorMessage,
    state,
  };
}

/**
 * Get default OAuth server config
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
    supportedTokenTypes: Object.values(OAUTH_TOKEN_TYPES),
    requirePkce: OAUTH_CONFIG.ENABLE_PKCE,
    pkceMethods: ['plain', 'S256'],
  };
}
