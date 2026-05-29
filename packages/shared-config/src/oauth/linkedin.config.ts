/**
 * LinkedIn OAuth Configuration - Pure readonly OAuth metadata
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-config/src/oauth/linkedin.config
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

export const LINKEDIN_PROVIDER_NAME = 'linkedin';
export const LINKEDIN_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization';
export const LINKEDIN_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken';
export const LINKEDIN_USER_INFO_URL = 'https://api.linkedin.com/v2/userinfo';
export const LINKEDIN_REVOKE_URL = 'https://www.linkedin.com/oauth/v2/revoke';
export const LINKEDIN_EMAIL_URL = 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*)';

// LinkedIn API version
export const LINKEDIN_API_VERSION = 'v2';
export const LINKEDIN_OAUTH_VERSION = '2.0';

// ==================== Scopes ====================

export const LINKEDIN_SCOPES = {
  /** OpenID Connect scope - required for OIDC */
  OPENID: 'openid',
  /** Access to user's profile information (name, picture, etc.) */
  PROFILE: 'profile',
  /** Access to user's email address */
  EMAIL: 'email',
  /** Post, comment and interact on behalf of a member */
  W_MEMBER_SOCIAL: 'w_member_social',
  /** Access to user's organization/company pages */
  ORGANIZATION: 'organization',
  /** Access to user's network data */
  NETWORK: 'network',
} as const;

export const LINKEDIN_DEFAULT_SCOPES = [
  LINKEDIN_SCOPES.OPENID,
  LINKEDIN_SCOPES.PROFILE,
  LINKEDIN_SCOPES.EMAIL,
] as const;

// ==================== Response Types ====================

export const LINKEDIN_RESPONSE_TYPES = {
  CODE: 'code',
} as const;

export const LINKEDIN_DEFAULT_RESPONSE_TYPE = LINKEDIN_RESPONSE_TYPES.CODE;

// ==================== Grant Types ====================

export const LINKEDIN_GRANT_TYPES = {
  AUTHORIZATION_CODE: 'authorization_code',
  REFRESH_TOKEN: 'refresh_token',
  CLIENT_CREDENTIALS: 'client_credentials',
} as const;

// ==================== Configuration ====================

export const linkedinOAuthConfig = Object.freeze({
  // Basic provider info
  provider: LINKEDIN_PROVIDER_NAME,
  providerName: 'LinkedIn',
  providerDisplayName: 'LinkedIn',
  
  // OAuth endpoints
  authUrl: LINKEDIN_AUTH_URL,
  tokenUrl: LINKEDIN_TOKEN_URL,
  userInfoUrl: LINKEDIN_USER_INFO_URL,
  revokeUrl: LINKEDIN_REVOKE_URL,
  emailUrl: LINKEDIN_EMAIL_URL,
  
  // Client credentials (from environment)
  clientId: env.LINKEDIN_CLIENT_ID,
  clientSecret: env.LINKEDIN_CLIENT_SECRET,
  callbackUrl: env.LINKEDIN_CALLBACK_URL,
  
  // OAuth parameters
  scopes: LINKEDIN_DEFAULT_SCOPES,
  responseType: LINKEDIN_DEFAULT_RESPONSE_TYPE,
  
  // LinkedIn specific
  apiVersion: LINKEDIN_API_VERSION,
  grantTypes: LINKEDIN_GRANT_TYPES,
  usePKCE: true,
  
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
  ] as const,
  
  // Profile fields (for old v2 API)
  profileFields: [
    'id',
    'firstName',
    'lastName',
    'profilePicture(displayImage~:playableStreams)',
    'headline',
    'vanityName',
    'industry',
    'location',
    'summary',
    'positions',
  ] as const,
  
  // User info mapping (LinkedIn -> our system)
  userInfoMapping: {
    id: 'sub',
    email: 'email',
    emailVerified: 'email_verified',
    name: 'name',
    firstName: 'given_name',
    lastName: 'family_name',
    avatar: 'picture',
    locale: 'locale',
  } as const,
  
  // OIDC provider metadata
  oidcProviderMetadata: {
    issuer: 'https://www.linkedin.com',
    authorization_endpoint: LINKEDIN_AUTH_URL,
    token_endpoint: LINKEDIN_TOKEN_URL,
    userinfo_endpoint: LINKEDIN_USER_INFO_URL,
    revocation_endpoint: LINKEDIN_REVOKE_URL,
    response_types_supported: ['code'],
    scopes_supported: ['openid', 'profile', 'email'],
    claims_supported: ['sub', 'email', 'email_verified', 'name', 'given_name', 'family_name', 'picture', 'locale'],
  } as const,
}) as const;

// ==================== Helper Functions ====================

/**
 * Check if LinkedIn OAuth is configured (has required credentials)
 */
export const isLinkedInOAuthConfigured = (): boolean => {
  return !!(
    env.LINKEDIN_CLIENT_ID &&
    env.LINKEDIN_CLIENT_SECRET &&
    env.LINKEDIN_CALLBACK_URL
  );
};

/**
 * Get LinkedIn login URL with parameters
 * Pure function - no side effects
 */
export const getLinkedInLoginUrl = (state: string): string => {
  const params = new URLSearchParams({
    client_id: linkedinOAuthConfig.clientId,
    redirect_uri: linkedinOAuthConfig.callbackUrl,
    response_type: linkedinOAuthConfig.responseType,
    scope: linkedinOAuthConfig.scopes.join(' '),
    state,
  });
  
  return `${LINKEDIN_AUTH_URL}?${params.toString()}`;
};

/**
 * Get email URL with access token
 */
export const getEmailUrl = (accessToken: string): string => {
  return `${LINKEDIN_EMAIL_URL}&oauth2_access_token=${accessToken}`;
};

// ==================== Type Exports ====================

export type LinkedInScope = typeof LINKEDIN_SCOPES[keyof typeof LINKEDIN_SCOPES];
export type LinkedInResponseType = typeof LINKEDIN_RESPONSE_TYPES[keyof typeof LINKEDIN_RESPONSE_TYPES];
export type LinkedInGrantType = typeof LINKEDIN_GRANT_TYPES[keyof typeof LINKEDIN_GRANT_TYPES];
export type LinkedInOAuthConfig = typeof linkedinOAuthConfig;
