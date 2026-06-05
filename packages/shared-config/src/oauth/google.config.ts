/**
 * Google OAuth Configuration - Pure readonly OAuth metadata
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-config/oauth/google.config
 * 
 * RULES:
 * ✅ ONLY OAuth configuration - NO business logic
 * ✅ NO OAuth implementation, token exchange, API calls
 * ✅ Readonly frozen config
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

import { env } from '../env/env.validation';

// ==================== Constants ====================

export const GOOGLE_PROVIDER_NAME = 'google';
export const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
export const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
export const GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';
export const GOOGLE_REVOKE_URL = 'https://oauth2.googleapis.com/revoke';
export const GOOGLE_DISCOVERY_URL = 'https://accounts.google.com/.well-known/openid-configuration';

// Google OAuth version
export const GOOGLE_OAUTH_VERSION = '2.0';
export const GOOGLE_OIDC_VERSION = '3.0';

// ==================== Scopes ====================

export const GOOGLE_SCOPES = {
  /** OpenID Connect scope - required for OIDC */
  OPENID: 'openid',
  /** Access to user's email address */
  EMAIL: 'email',
  /** Access to user's profile information (name, picture, etc.) */
  PROFILE: 'profile',
  /** Access to user's profile (alternative URL) */
  USER_INFO: 'https://www.googleapis.com/auth/userinfo.profile',
  /** Access to user's email (alternative URL) */
  USER_EMAIL: 'https://www.googleapis.com/auth/userinfo.email',
  /** Access to user's calendar */
  CALENDAR: 'https://www.googleapis.com/auth/calendar',
  /** Access to user's contacts */
  CONTACTS: 'https://www.googleapis.com/auth/contacts',
  /** Access to user's drive files */
  DRIVE: 'https://www.googleapis.com/auth/drive',
  /** Access to user's photos */
  PHOTOS: 'https://www.googleapis.com/auth/photos',
} as const;

export const GOOGLE_DEFAULT_SCOPES = [
  GOOGLE_SCOPES.OPENID,
  GOOGLE_SCOPES.EMAIL,
  GOOGLE_SCOPES.PROFILE,
] as const;

// ==================== Response Types ====================

export const GOOGLE_RESPONSE_TYPES = {
  CODE: 'code',
  TOKEN: 'token',
  ID_TOKEN: 'id_token',
  CODE_ID_TOKEN: 'code id_token',
  CODE_TOKEN: 'code token',
  ID_TOKEN_TOKEN: 'id_token token',
  CODE_ID_TOKEN_TOKEN: 'code id_token token',
} as const;

export const GOOGLE_DEFAULT_RESPONSE_TYPE = GOOGLE_RESPONSE_TYPES.CODE;

// ==================== Grant Types ====================

export const GOOGLE_GRANT_TYPES = {
  AUTHORIZATION_CODE: 'authorization_code',
  REFRESH_TOKEN: 'refresh_token',
  CLIENT_CREDENTIALS: 'client_credentials',
} as const;

// ==================== Prompt Types ====================

export const GOOGLE_PROMPT_TYPES = {
  /** No prompt - use existing session */
  NONE: 'none',
  /** Always show account selection */
  SELECT_ACCOUNT: 'select_account',
  /** Force consent screen */
  CONSENT: 'consent',
} as const;

export const GOOGLE_DEFAULT_PROMPT = GOOGLE_PROMPT_TYPES.SELECT_ACCOUNT;

// ==================== Access Types ====================

export const GOOGLE_ACCESS_TYPES = {
  /** Online access - returns access token only */
  ONLINE: 'online',
  /** Offline access - returns refresh token */
  OFFLINE: 'offline',
} as const;

export const GOOGLE_DEFAULT_ACCESS_TYPE = GOOGLE_ACCESS_TYPES.OFFLINE;

// ==================== Configuration ====================

export const googleOAuthConfig = Object.freeze({
  // Basic provider info
  provider: GOOGLE_PROVIDER_NAME,
  providerName: 'Google',
  providerDisplayName: 'Google',
  
  // OAuth endpoints
  authUrl: GOOGLE_AUTH_URL,
  tokenUrl: GOOGLE_TOKEN_URL,
  userInfoUrl: GOOGLE_USER_INFO_URL,
  revokeUrl: GOOGLE_REVOKE_URL,
  discoveryUrl: GOOGLE_DISCOVERY_URL,
  
  // Client credentials (from environment)
  clientId: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  callbackUrl: env.GOOGLE_CALLBACK_URL,
  
  // OAuth parameters
  scopes: GOOGLE_DEFAULT_SCOPES,
  responseType: GOOGLE_DEFAULT_RESPONSE_TYPE,
  prompt: GOOGLE_DEFAULT_PROMPT,
  accessType: GOOGLE_DEFAULT_ACCESS_TYPE,
  
  // Google specific
  grantTypes: GOOGLE_GRANT_TYPES,
  includeGrantedScopes: true,
  enablePKCE: true,
  
  // User info fields (from userinfo endpoint)
  userInfoFields: [
    'sub',
    'email',
    'email_verified',
    'name',
    'given_name',
    'family_name',
    'picture',
    'locale',
    'hd',
  ] as const,
  
  // User info mapping (Google -> our system)
  userInfoMapping: {
    id: 'sub',
    email: 'email',
    emailVerified: 'email_verified',
    name: 'name',
    firstName: 'given_name',
    lastName: 'family_name',
    avatar: 'picture',
    locale: 'locale',
    hostedDomain: 'hd',
  } as const,
  
  // Additional settings
  hd: null, // Hosted domain restriction (null = all domains allowed)
}) as const;

// ==================== Helper Functions ====================

/**
 * Check if Google OAuth is configured (has required credentials)
 */
export const isGoogleOAuthConfigured = (): boolean => {
  return !!(
    env.GOOGLE_CLIENT_ID &&
    env.GOOGLE_CLIENT_SECRET &&
    env.GOOGLE_CALLBACK_URL
  );
};

/**
 * Get Google login URL with parameters
 * Pure function - no side effects
 * 
 * @param state - CSRF protection state token
 * @param nonce - Optional nonce for OIDC
 * @param hd - Optional hosted domain restriction
 * @param prompt - Optional prompt type (default: 'select_account')
 * @param accessType - Optional access type (default: 'offline')
 * @returns Full Google login URL
 * 
 * @example
 * const loginUrl = getGoogleLoginUrl('random-state-123');
 */
export const getGoogleLoginUrl = (
  state: string,
  nonce?: string,
  hd?: string,
  prompt: string = GOOGLE_DEFAULT_PROMPT,
  accessType: string = GOOGLE_DEFAULT_ACCESS_TYPE
): string => {
  const params = new URLSearchParams({
    client_id: googleOAuthConfig.clientId,
    redirect_uri: googleOAuthConfig.callbackUrl,
    response_type: googleOAuthConfig.responseType,
    scope: googleOAuthConfig.scopes.join(' '),
    state,
    access_type: accessType,
    prompt: prompt,
  });
  
  if (nonce) {
    params.set('nonce', nonce);
  }
  
  if (hd) {
    params.set('hd', hd);
  }
  
  // Add PKCE code challenge if needed
  if (googleOAuthConfig.enablePKCE) {
    params.set('code_challenge_method', 'S256');
  }
  
  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
};

/**
 * Get revoke URL with token
 * 
 * @param token - Access token to revoke
 * @returns Revoke URL with token parameter
 */
export const getRevokeUrl = (token: string): string => {
  const params = new URLSearchParams({
    token,
  });
  return `${GOOGLE_REVOKE_URL}?${params.toString()}`;
};

/**
 * Get token exchange params
 * 
 * @param code - Authorization code
 * @param codeVerifier - PKCE code verifier
 * @returns Token exchange parameters
 */
export const getTokenExchangeParams = (
  code: string,
  codeVerifier?: string
): Record<string, string> => {
  const params: Record<string, string> = {
    client_id: googleOAuthConfig.clientId,
    client_secret: googleOAuthConfig.clientSecret,
    code,
    grant_type: GOOGLE_GRANT_TYPES.AUTHORIZATION_CODE,
    redirect_uri: googleOAuthConfig.callbackUrl,
  };
  
  if (codeVerifier) {
    params.code_verifier = codeVerifier;
  }
  
  return params;
};

/**
 * Get refresh token params
 * 
 * @param refreshToken - Refresh token
 * @returns Refresh token parameters
 */
export const getRefreshTokenParams = (refreshToken: string): Record<string, string> => {
  return {
    client_id: googleOAuthConfig.clientId,
    client_secret: googleOAuthConfig.clientSecret,
    refresh_token: refreshToken,
    grant_type: GOOGLE_GRANT_TYPES.REFRESH_TOKEN,
  };
};

// ==================== Type Exports ====================

export type GoogleScope = typeof GOOGLE_SCOPES[keyof typeof GOOGLE_SCOPES];
export type GoogleResponseType = typeof GOOGLE_RESPONSE_TYPES[keyof typeof GOOGLE_RESPONSE_TYPES];
export type GoogleGrantType = typeof GOOGLE_GRANT_TYPES[keyof typeof GOOGLE_GRANT_TYPES];
export type GooglePromptType = typeof GOOGLE_PROMPT_TYPES[keyof typeof GOOGLE_PROMPT_TYPES];
export type GoogleAccessType = typeof GOOGLE_ACCESS_TYPES[keyof typeof GOOGLE_ACCESS_TYPES];
export type GoogleOAuthConfig = typeof googleOAuthConfig;
