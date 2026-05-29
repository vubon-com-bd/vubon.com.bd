/**
 * Facebook OAuth Configuration - Pure readonly OAuth metadata
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-config/src/oauth/facebook.config
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

export const FACEBOOK_PROVIDER_NAME = 'facebook';
export const FACEBOOK_API_VERSION = env.FACEBOOK_API_VERSION || 'v18.0';
export const FACEBOOK_AUTH_URL = `https://www.facebook.com/${FACEBOOK_API_VERSION}/dialog/oauth`;
export const FACEBOOK_TOKEN_URL = `https://graph.facebook.com/${FACEBOOK_API_VERSION}/oauth/access_token`;
export const FACEBOOK_USER_INFO_URL = `https://graph.facebook.com/${FACEBOOK_API_VERSION}/me`;
export const FACEBOOK_REVOKE_URL = `https://graph.facebook.com/${FACEBOOK_API_VERSION}/me/permissions`;
export const FACEBOOK_DEBUG_TOKEN_URL = `https://graph.facebook.com/${FACEBOOK_API_VERSION}/debug_token`;

// Facebook OAuth version
export const FACEBOOK_OAUTH_VERSION = '2.0';

// ==================== Scopes ====================

export const FACEBOOK_SCOPES = {
  /** Access to user's email address */
  EMAIL: 'email',
  /** Access to user's public profile (name, profile picture, age range) */
  PUBLIC_PROFILE: 'public_profile',
  /** Access to user's birthday */
  USER_BIRTHDAY: 'user_birthday',
  /** Access to user's gender */
  USER_GENDER: 'user_gender',
  /** Access to user's location */
  USER_LOCATION: 'user_location',
  /** Access to user's photos */
  USER_PHOTOS: 'user_photos',
  /** Access to user's videos */
  USER_VIDEOS: 'user_videos',
  /** Access to user's posts */
  USER_POSTS: 'user_posts',
  /** Access to user's friends list */
  USER_FRIENDS: 'user_friends',
  /** Access to user's about info */
  USER_ABOUT_ME: 'user_about_me',
  /** Access to user's education history */
  USER_EDUCATION_HISTORY: 'user_education_history',
  /** Access to user's work history */
  USER_WORK_HISTORY: 'user_work_history',
} as const;

export const FACEBOOK_DEFAULT_SCOPES = [
  FACEBOOK_SCOPES.EMAIL,
  FACEBOOK_SCOPES.PUBLIC_PROFILE,
] as const;

// ==================== Response Types ====================

export const FACEBOOK_RESPONSE_TYPES = {
  CODE: 'code',
  TOKEN: 'token',
  GRANTED_SCOPES: 'granted_scopes',
} as const;

export const FACEBOOK_DEFAULT_RESPONSE_TYPE = FACEBOOK_RESPONSE_TYPES.CODE;

// ==================== Display Modes ====================

export const FACEBOOK_DISPLAY_MODES = {
  /** Standard desktop view */
  PAGE: 'page',
  /** Mobile-optimized view */
  POPUP: 'popup',
  /** Mobile web view */
  TOUCH: 'touch',
  /** Async dialog */
  ASYNC: 'async',
} as const;

export const FACEBOOK_DEFAULT_DISPLAY = FACEBOOK_DISPLAY_MODES.PAGE;

// ==================== Grant Types ====================

export const FACEBOOK_GRANT_TYPES = {
  AUTHORIZATION_CODE: 'authorization_code',
  CLIENT_CREDENTIALS: 'client_credentials',
} as const;

// ==================== Configuration ====================

export const facebookOAuthConfig = Object.freeze({
  // Basic provider info
  provider: FACEBOOK_PROVIDER_NAME,
  providerName: 'Facebook',
  providerDisplayName: 'Facebook',
  
  // OAuth endpoints
  authUrl: FACEBOOK_AUTH_URL,
  tokenUrl: FACEBOOK_TOKEN_URL,
  userInfoUrl: FACEBOOK_USER_INFO_URL,
  revokeUrl: FACEBOOK_REVOKE_URL,
  debugTokenUrl: FACEBOOK_DEBUG_TOKEN_URL,
  
  // Client credentials (from environment)
  clientId: env.FACEBOOK_CLIENT_ID,
  clientSecret: env.FACEBOOK_CLIENT_SECRET,
  callbackUrl: env.FACEBOOK_CALLBACK_URL,
  
  // OAuth parameters
  scopes: FACEBOOK_DEFAULT_SCOPES,
  responseType: FACEBOOK_DEFAULT_RESPONSE_TYPE,
  display: FACEBOOK_DEFAULT_DISPLAY,
  
  // Facebook specific
  apiVersion: FACEBOOK_API_VERSION,
  grantTypes: FACEBOOK_GRANT_TYPES,
  
  // User info fields to request
  userInfoFields: [
    'id',
    'name',
    'first_name',
    'last_name',
    'email',
    'picture',
    'birthday',
    'gender',
    'location',
  ] as const,
  
  // Picture size options
  pictureSizes: {
    SMALL: 'small',
    NORMAL: 'normal',
    LARGE: 'large',
    SQUARE: 'square',
  } as const,
  
  // User info mapping (Facebook -> our system)
  userInfoMapping: {
    id: 'id',
    email: 'email',
    name: 'name',
    firstName: 'first_name',
    lastName: 'last_name',
    avatar: 'picture.data.url',
    birthday: 'birthday',
    gender: 'gender',
    location: 'location.name',
  } as const,
}) as const;

// ==================== Helper Functions ====================

/**
 * Check if Facebook OAuth is configured (has required credentials)
 */
export const isFacebookOAuthConfigured = (): boolean => {
  return !!(
    env.FACEBOOK_CLIENT_ID &&
    env.FACEBOOK_CLIENT_SECRET &&
    env.FACEBOOK_CALLBACK_URL
  );
};

/**
 * Get Facebook login URL with parameters
 * Pure function - no side effects
 */
export const getFacebookLoginUrl = (
  state: string,
  redirectUri?: string,
  scopes?: readonly string[]
): string => {
  const params = new URLSearchParams({
    client_id: facebookOAuthConfig.clientId,
    redirect_uri: redirectUri || facebookOAuthConfig.callbackUrl,
    response_type: facebookOAuthConfig.responseType,
    scope: (scopes || facebookOAuthConfig.scopes).join(','),
    state,
    display: facebookOAuthConfig.display,
  });
  
  return `${FACEBOOK_AUTH_URL}?${params.toString()}`;
};

/**
 * Get user info URL with fields parameter
 */
export const getUserInfoUrl = (accessToken: string, fields?: readonly string[]): string => {
  const fieldsList = fields || facebookOAuthConfig.userInfoFields;
  const params = new URLSearchParams({
    access_token: accessToken,
    fields: fieldsList.join(','),
  });
  
  return `${FACEBOOK_USER_INFO_URL}?${params.toString()}`;
};

// ==================== Type Exports ====================

export type FacebookScope = typeof FACEBOOK_SCOPES[keyof typeof FACEBOOK_SCOPES];
export type FacebookResponseType = typeof FACEBOOK_RESPONSE_TYPES[keyof typeof FACEBOOK_RESPONSE_TYPES];
export type FacebookDisplayMode = typeof FACEBOOK_DISPLAY_MODES[keyof typeof FACEBOOK_DISPLAY_MODES];
export type FacebookGrantType = typeof FACEBOOK_GRANT_TYPES[keyof typeof FACEBOOK_GRANT_TYPES];
export type FacebookOAuthConfig = typeof facebookOAuthConfig;
