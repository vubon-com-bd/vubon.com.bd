// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Authentication type enum
 */
export const AUTH_TYPE = {
  BASIC: 'basic',
  SOCIAL: 'social',
  SSO: 'sso',
  OAUTH: 'oauth',
  JWT: 'jwt',
  API_KEY: 'api_key',
} as const;

/**
 * Basic authentication (email/password)
 */
export const BASIC = AUTH_TYPE.BASIC;

/**
 * Social authentication (Google, Facebook, etc.)
 */
export const SOCIAL = AUTH_TYPE.SOCIAL;

/**
 * Single Sign-On authentication
 */
export const SSO = AUTH_TYPE.SSO;

/**
 * OAuth authentication
 */
export const OAUTH = AUTH_TYPE.OAUTH;

/**
 * JWT token authentication
 */
export const JWT = AUTH_TYPE.JWT;

/**
 * API Key authentication
 */
export const API_KEY = AUTH_TYPE.API_KEY;

/**
 * Type for authentication type
 */
export type AuthType = (typeof AUTH_TYPE)[keyof typeof AUTH_TYPE];
