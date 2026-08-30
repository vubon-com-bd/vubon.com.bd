/**
 * Authentication OAuth Types
 * OAuth 2.0 and OIDC data types
 */

import type {
  OAuthGrantType,
  OAuthScope,
  OAuthTokenType,
  OAuthTokenStatus,
  OAuthClientType,
  OAuthClientAuthMethod,
} from '@vubon/shared-constants';

import type { ID, Timestamp, Url } from '../common/core-primitives.types';
import type { AuthUser } from './auth.types';

/**
 * OAuth Client Data
 * OAuth client application information
 */
export interface OAuthClientData {
  /** Client ID */
  clientId: ID;
  /** Client name */
  clientName: string;
  /** Client description */
  clientDescription?: string;
  /** Client type (public/confidential) */
  clientType: OAuthClientType;
  /** Client authentication method */
  authMethod: OAuthClientAuthMethod;
  /** Redirect URIs */
  redirectUris: Url[];
  /** Allowed grant types */
  grantTypes: OAuthGrantType[];
  /** Allowed scopes */
  scopes: OAuthScope[];
  /** Is client active */
  isActive: boolean;
  /** Is client trusted */
  isTrusted: boolean;
  /** Client creation timestamp */
  createdAt: Timestamp;
  /** Client last update timestamp */
  updatedAt: Timestamp;
  /** Client metadata */
  metadata?: Record<string, unknown>;
}

/**
 * OAuth Authorization Request
 * Request for OAuth authorization
 */
export interface OAuthAuthorizationRequest {
  /** Response type */
  responseType: string;
  /** Client ID */
  clientId: ID;
  /** Redirect URI */
  redirectUri: Url;
  /** Requested scopes */
  scope?: string;
  /** State parameter for CSRF */
  state?: string;
  /** Code challenge (PKCE) */
  codeChallenge?: string;
  /** Code challenge method (PKCE) */
  codeChallengeMethod?: string;
  /** Additional parameters */
  [key: string]: unknown;
}

/**
 * OAuth Authorization Response
 * Response for OAuth authorization
 */
export interface OAuthAuthorizationResponse {
  /** Authorization code */
  code: string;
  /** State parameter */
  state: string;
  /** Redirect URI */
  redirectUri: Url;
  /** Expiry timestamp */
  expiresAt: Timestamp;
  /** Granted scopes */
  scopes?: OAuthScope[];
}

/**
 * OAuth Token Request
 * Request for OAuth token exchange
 */
export interface OAuthTokenRequest {
  /** Grant type */
  grantType: OAuthGrantType;
  /** Authorization code (for authorization_code grant) */
  code?: string;
  /** Refresh token (for refresh_token grant) */
  refreshToken?: string;
  /** Redirect URI (for authorization_code grant) */
  redirectUri?: Url;
  /** Client ID (for public clients) */
  clientId?: ID;
  /** Client secret (for confidential clients) */
  clientSecret?: string;
  /** Code verifier (PKCE) */
  codeVerifier?: string;
}

/**
 * OAuth Token Response
 * Response for OAuth token exchange
 */
export interface OAuthTokenResponse {
  /** Access token */
  accessToken: string;
  /** Token type (Bearer, MAC, DPoP) */
  tokenType: OAuthTokenType;
  /** Access token expiry in seconds */
  expiresIn: number;
  /** Refresh token (if applicable) */
  refreshToken?: string;
  /** Granted scopes */
  scope?: string;
  /** ID token (OIDC) */
  idToken?: string;
  /** Token creation timestamp */
  createdAt: Timestamp;
}

/**
 * OAuth Token Data
 * Complete OAuth token information
 */
export interface OAuthTokenData {
  /** Token ID */
  id: ID;
  /** Client ID */
  clientId: ID;
  /** User ID (if applicable) */
  userId?: ID;
  /** Associated user data (if available) */
  user?: AuthUser;
  /** Token type */
  tokenType: OAuthTokenType;
  /** Token status */
  status: OAuthTokenStatus;
  /** Granted scopes */
  scopes: OAuthScope[];
  /** Token creation timestamp */
  createdAt: Timestamp;
  /** Token expiry timestamp */
  expiresAt: Timestamp;
  /** Token last used timestamp */
  lastUsedAt?: Timestamp;
  /** IP address of last use */
  lastIpAddress?: string;
  /** Token metadata */
  metadata?: Record<string, unknown>;
}

/**
 * OAuth Client Create Request
 * Request to create an OAuth client
 */
export interface OAuthClientCreateRequest {
  /** Client name */
  clientName: string;
  /** Client description */
  clientDescription?: string;
  /** Client type */
  clientType: OAuthClientType;
  /** Redirect URIs */
  redirectUris: Url[];
  /** Allowed grant types */
  grantTypes: OAuthGrantType[];
  /** Allowed scopes */
  scopes: OAuthScope[];
  /** Is client trusted */
  isTrusted?: boolean;
}

/**
 * OAuth Client Update Request
 * Request to update an OAuth client
 */
export interface OAuthClientUpdateRequest {
  /** Client ID */
  clientId: ID;
  /** New client name */
  clientName?: string;
  /** New client description */
  clientDescription?: string;
  /** New redirect URIs */
  redirectUris?: Url[];
  /** New allowed grant types */
  grantTypes?: OAuthGrantType[];
  /** New allowed scopes */
  scopes?: OAuthScope[];
  /** New active status */
  isActive?: boolean;
}

/**
 * OAuth Client List
 * List of OAuth clients
 */
export interface OAuthClientList {
  /** List of clients */
  clients: OAuthClientData[];
  /** Total count */
  total: number;
  /** Active count */
  activeCount: number;
}

/**
 * OAuth Access Token Request
 * Request to get an access token (simplified)
 */
export interface OAuthAccessTokenRequest {
  /** Client ID */
  clientId: ID;
  /** Client secret (for confidential clients) */
  clientSecret?: string;
  /** Grant type */
  grantType: OAuthGrantType;
  /** User credentials (for password grant) */
  username?: string;
  /** User password (for password grant) */
  password?: string;
  /** Refresh token (for refresh_token grant) */
  refreshToken?: string;
  /** Authorization code (for authorization_code grant) */
  code?: string;
  /** Redirect URI (for authorization_code grant) */
  redirectUri?: Url;
}

/**
 * OAuth Introspection Request
 * Request for token introspection
 */
export interface OAuthIntrospectionRequest {
  /** Token value */
  token: string;
  /** Token type hint (access_token or refresh_token) */
  tokenTypeHint?: string;
  /** Client ID (optional) */
  clientId?: ID;
  /** Client secret (optional) */
  clientSecret?: string;
}

/**
 * OAuth Introspection Response
 * Response for token introspection
 */
export interface OAuthIntrospectionResponse {
  /** Is token active */
  active: boolean;
  /** Granted scopes */
  scope?: string;
  /** Client ID */
  clientId?: ID;
  /** Username */
  username?: string;
  /** Token type */
  tokenType?: OAuthTokenType;
  /** Expiration timestamp */
  exp?: number;
  /** Issued at timestamp */
  iat?: number;
  /** Not before timestamp */
  nbf?: number;
  /** Subject (user ID) */
  sub?: string;
  /** Audience */
  aud?: string;
  /** Issuer */
  iss?: string;
  /** JWT ID */
  jti?: string;
  /** Additional claims */
  [key: string]: unknown;
}

/**
 * OAuth Revocation Request
 * Request to revoke a token
 */
export interface OAuthRevocationRequest {
  /** Token value */
  token: string;
  /** Token type hint (access_token or refresh_token) */
  tokenTypeHint?: string;
  /** Client ID (optional) */
  clientId?: ID;
  /** Client secret (optional) */
  clientSecret?: string;
}

/**
 * OAuth Statistics
 * OAuth usage statistics
 */
export interface OAuthStatistics {
  /** Total clients */
  totalClients: number;
  /** Active clients */
  activeClients: number;
  /** Total tokens issued */
  totalTokensIssued: number;
  /** Active tokens */
  activeTokens: number;
  /** Expired tokens */
  expiredTokens: number;
  /** Revoked tokens */
  revokedTokens: number;
  /** Tokens by grant type */
  byGrantType: Record<OAuthGrantType, number>;
  /** Tokens by scope */
  byScope: Record<OAuthScope, number>;
  /** Token issuance rate (per day) */
  issuanceRate: number;
  /** Average token lifetime in seconds */
  averageLifetime: number;
  /** Top users by token usage */
  topUsers: Array<{
    userId: ID;
    user?: AuthUser;
    tokenCount: number;
  }>;
  /** Timestamp of statistics */
  timestamp: Timestamp;
}

/**
 * OAuth Consent Request
 * Request for user consent
 */
export interface OAuthConsentRequest {
  /** Client ID */
  clientId: ID;
  /** Client name */
  clientName: string;
  /** Requested scopes */
  requestedScopes: OAuthScope[];
  /** User ID */
  userId: ID;
  /** User data (if available) */
  user?: AuthUser;
  /** Redirect URI */
  redirectUri: Url;
  /** State parameter */
  state?: string;
}

/**
 * OAuth Consent Response
 * Response for user consent
 */
export interface OAuthConsentResponse {
  /** Is consent given */
  granted: boolean;
  /** Granted scopes */
  grantedScopes: OAuthScope[];
  /** Remember consent */
  remember?: boolean;
  /** Redirect URI with code or error */
  redirectUri: Url;
}

/**
 * OAuth Device Code Request
 * Request for device code (device flow)
 */
export interface OAuthDeviceCodeRequest {
  /** Client ID */
  clientId: ID;
  /** Requested scopes */
  scope?: string;
}

/**
 * OAuth Device Code Response
 * Response for device code
 */
export interface OAuthDeviceCodeResponse {
  /** Device code */
  deviceCode: string;
  /** User code (for display) */
  userCode: string;
  /** Verification URI */
  verificationUri: Url;
  /** Verification URI with user code */
  verificationUriComplete?: Url;
  /** Expiry in seconds */
  expiresIn: number;
  /** Polling interval in seconds */
  interval: number;
}

/**
 * OAuth Configuration Values
 * OAuth configuration
 */
export interface OAuthConfigValues {
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
  authorizationCodeExpiry: number;
  deviceCodeExpiry: number;
  maxClientsPerUser: number;
  maxScopesPerToken: number;
  maxRefreshTokenReuse: number;
  issuer: string;
  tokenEndpoint: string;
  authorizationEndpoint: string;
  userInfoEndpoint: string;
  revocationEndpoint: string;
  introspectionEndpoint: string;
  pkceMethod: string;
  enablePkce: boolean;
}

/**
 * OAuth PKCE Data
 * PKCE (Proof Key for Code Exchange) data
 */
export interface OAuthPkceData {
  /** Code verifier */
  codeVerifier: string;
  /** Code challenge */
  codeChallenge: string;
  /** Code challenge method (S256 or plain) */
  codeChallengeMethod: string;
  /** When generated */
  generatedAt: Timestamp;
}
