/**
 * Apple OAuth Configuration - Pure readonly OAuth metadata
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-config/src/oauth/apple.config
 * 
 * RULES:
 * ✅ ONLY OAuth configuration - NO business logic
 * ✅ NO OAuth implementation, JWT signing, token exchange
 * ✅ Readonly frozen config
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

import { env } from '../env/env.validation';

// ==================== Constants ====================

export const APPLE_PROVIDER_NAME = 'apple';
export const APPLE_AUTH_URL = 'https://appleid.apple.com/auth/authorize';
export const APPLE_TOKEN_URL = 'https://appleid.apple.com/auth/token';
export const APPLE_REVOKE_URL = 'https://appleid.apple.com/auth/revoke';
export const APPLE_USER_INFO_URL = 'https://appleid.apple.com/auth/userinfo';

// Apple OAuth version
export const APPLE_OAUTH_VERSION = '1.0';

// ==================== Scopes ====================

export const APPLE_SCOPES = {
  NAME: 'name',
  EMAIL: 'email',
} as const;

export const APPLE_DEFAULT_SCOPES = [
  APPLE_SCOPES.NAME,
  APPLE_SCOPES.EMAIL,
] as const;

// ==================== Response Types ====================

export const APPLE_RESPONSE_TYPES = {
  CODE: 'code',
  ID_TOKEN: 'id_token',
  CODE_ID_TOKEN: 'code id_token',
} as const;

export const APPLE_DEFAULT_RESPONSE_TYPE = APPLE_RESPONSE_TYPES.CODE;

// ==================== Response Modes ====================

export const APPLE_RESPONSE_MODES = {
  QUERY: 'query',
  FORM_POST: 'form_post',
} as const;

export const APPLE_DEFAULT_RESPONSE_MODE = APPLE_RESPONSE_MODES.FORM_POST;

// ==================== Grant Types ====================

export const APPLE_GRANT_TYPES = {
  AUTHORIZATION_CODE: 'authorization_code',
  REFRESH_TOKEN: 'refresh_token',
  CLIENT_CREDENTIALS: 'client_credentials',
} as const;

// ==================== Configuration ====================

export const appleOAuthConfig = {
  // Basic provider info
  provider: APPLE_PROVIDER_NAME,
  providerName: 'Apple',
  providerDisplayName: 'Apple',
  
  // OAuth endpoints
  authUrl: APPLE_AUTH_URL,
  tokenUrl: APPLE_TOKEN_URL,
  revokeUrl: APPLE_REVOKE_URL,
  userInfoUrl: APPLE_USER_INFO_URL,
  
  // Client credentials (from environment)
  clientId: env.APPLE_CLIENT_ID,
  teamId: env.APPLE_TEAM_ID,
  keyId: env.APPLE_KEY_ID,
  privateKey: env.APPLE_PRIVATE_KEY,
  callbackUrl: env.APPLE_CALLBACK_URL,
  
  // OAuth parameters
  scopes: APPLE_DEFAULT_SCOPES,
  responseType: APPLE_DEFAULT_RESPONSE_TYPE,
  responseMode: APPLE_DEFAULT_RESPONSE_MODE,
  
  // Grant types
  grantTypes: APPLE_GRANT_TYPES,
  
  // Additional settings
  usePKCE: true,
  useNonce: true,
  
  // User info mapping (Apple -> our system)
  userInfoMapping: {
    id: 'sub',
    email: 'email',
    emailVerified: 'email_verified',
    firstName: 'name.firstName',
    lastName: 'name.lastName',
    isPrivateEmail: 'is_private_email',
  },
  
  // Real user status values
  realUserStatus: {
    UNSUPPORTED: 0,
    UNKNOWN: 1,
    LIKELY_REAL: 2,
  },
} as const;

// ==================== Helper Functions ====================

/**
 * Check if Apple OAuth is configured (has required credentials)
 */
export const isAppleOAuthConfigured = (): boolean => {
  return !!(
    env.APPLE_CLIENT_ID &&
    env.APPLE_TEAM_ID &&
    env.APPLE_KEY_ID &&
    env.APPLE_PRIVATE_KEY &&
    env.APPLE_CALLBACK_URL
  );
};

/**
 * Get Apple login URL with parameters
 * Pure function - no side effects
 */
export const getAppleLoginUrl = (state: string, nonce: string): string => {
  const params = new URLSearchParams({
    client_id: appleOAuthConfig.clientId,
    redirect_uri: appleOAuthConfig.callbackUrl,
    response_type: appleOAuthConfig.responseType,
    response_mode: appleOAuthConfig.responseMode,
    scope: appleOAuthConfig.scopes.join(' '),
    state,
    nonce,
  });
  
  return `${APPLE_AUTH_URL}?${params.toString()}`;
};

/**
 * Extract user info from Apple ID token response
 */
export const extractAppleUserInfo = (userInfo: {
  sub: string;
  email?: string;
  email_verified?: boolean;
  is_private_email?: boolean;
  name?: {
    firstName?: string;
    lastName?: string;
  };
}): {
  id: string;
  email: string | null;
  emailVerified: boolean;
  firstName: string | null;
  lastName: string | null;
  isPrivateEmail: boolean;
} => {
  return {
    id: userInfo.sub,
    email: userInfo.email || null,
    emailVerified: userInfo.email_verified || false,
    firstName: userInfo.name?.firstName || null,
    lastName: userInfo.name?.lastName || null,
    isPrivateEmail: userInfo.is_private_email || false,
  };
};

/**
 * Get client secret configuration for Apple
 */
export const getAppleClientSecretConfig = (): {
  teamId: string;
  clientId: string;
  keyId: string;
  privateKey: string;
} => {
  return {
    teamId: appleOAuthConfig.teamId,
    clientId: appleOAuthConfig.clientId,
    keyId: appleOAuthConfig.keyId,
    privateKey: appleOAuthConfig.privateKey,
  };
};

/**
 * Get revoke URL with token
 */
export const getRevokeUrl = (token: string, tokenTypeHint: 'access_token' | 'refresh_token' = 'access_token'): string => {
  const params = new URLSearchParams({
    token,
    token_type_hint: tokenTypeHint,
    client_id: appleOAuthConfig.clientId,
  });
  return `${APPLE_REVOKE_URL}?${params.toString()}`;
};

/**
 * Get the real user status description
 */
export const getRealUserStatusDescription = (status: number): string => {
  switch (status) {
    case appleOAuthConfig.realUserStatus.UNSUPPORTED:
      return 'Unsupported - Device does not support real user indicator';
    case appleOAuthConfig.realUserStatus.UNKNOWN:
      return 'Unknown - Could not determine if user is real';
    case appleOAuthConfig.realUserStatus.LIKELY_REAL:
      return 'Likely Real - User is likely a real person';
    default:
      return 'Unknown status';
  }
};

/**
 * Check if email is a private relay email (Apple's private email relay)
 */
export const isPrivateRelayEmail = (email: string): boolean => {
  return email?.endsWith('@privaterelay.appleid.com') ?? false;
};

// ==================== Type Exports ====================

export type AppleScope = typeof APPLE_SCOPES[keyof typeof APPLE_SCOPES];
export type AppleResponseType = typeof APPLE_RESPONSE_TYPES[keyof typeof APPLE_RESPONSE_TYPES];
export type AppleResponseMode = typeof APPLE_RESPONSE_MODES[keyof typeof APPLE_RESPONSE_MODES];
export type AppleGrantType = typeof APPLE_GRANT_TYPES[keyof typeof APPLE_GRANT_TYPES];
export type AppleOAuthConfig = typeof appleOAuthConfig;
export type ExtractedAppleUserInfo = ReturnType<typeof extractAppleUserInfo>;
export type AppleClientSecretConfig = ReturnType<typeof getAppleClientSecretConfig>;
