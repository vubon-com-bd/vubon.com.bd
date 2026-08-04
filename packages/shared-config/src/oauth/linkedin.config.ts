// packages/shared-config/src/oauth/linkedin.config.ts
import type { EnvConfig } from '../env/env.schema';
import { env } from '../env/env.validation';

// ============================================================================
// LinkedIn OAuth Configuration
// ============================================================================

/**
 * LinkedIn OAuth configuration interface
 */
export interface LinkedInOAuthConfig {
  /** LinkedIn OAuth client ID */
  clientId: string;
  /** LinkedIn OAuth client secret */
  clientSecret: string;
  /** LinkedIn OAuth callback URL */
  callbackUrl: string;
  /** Required OAuth scopes */
  scopes: string[];
  /** OAuth authorization endpoint */
  authEndpoint: string;
  /** OAuth token endpoint */
  tokenEndpoint: string;
  /** OAuth user info endpoint */
  userInfoEndpoint: string;
  /** LinkedIn API version */
  apiVersion: string;
  /** Whether LinkedIn OAuth is enabled */
  enabled: boolean;
}

/**
 * LinkedIn OAuth login URL options
 */
export interface LinkedInLoginUrlOptions {
  /** State parameter for CSRF protection */
  state?: string;
  /** Redirect URI (overrides default callback URL) */
  redirectUri?: string;
  /** Additional scopes to request */
  extraScopes?: string[];
}

/**
 * LinkedIn user info interface
 */
export interface LinkedInUserInfo {
  /** LinkedIn user ID */
  id: string;
  /** User's email address */
  email: string;
  /** User's full name */
  name: string;
  /** User's first name */
  firstName: string;
  /** User's last name */
  lastName: string;
  /** User's profile picture URL */
  picture?: string;
  /** User's headline/position */
  headline?: string;
  /** User's location */
  location?: string;
  /** User's industry */
  industry?: string;
  /** User's profile URL */
  profileUrl?: string;
  /** User's public profile URL */
  publicProfileUrl?: string;
}

// ============================================================================
// LinkedIn OAuth Constants
// ============================================================================

/**
 * LinkedIn API version
 */
export const LINKEDIN_API_VERSION = 'v2';

/**
 * LinkedIn OAuth endpoints
 */
export const LINKEDIN_AUTH_ENDPOINT = 'https://www.linkedin.com/oauth/v2/authorization';
export const LINKEDIN_TOKEN_ENDPOINT = 'https://www.linkedin.com/oauth/v2/accessToken';
export const LINKEDIN_USER_INFO_ENDPOINT = 'https://api.linkedin.com/v2/userinfo';

/**
 * Default LinkedIn OAuth scopes
 */
export const LINKEDIN_SCOPES = ['openid', 'profile', 'email'] as const;

/**
 * LinkedIn OAuth response types
 */
export const LINKEDIN_RESPONSE_TYPE = 'code';

/**
 * LinkedIn OAuth grant type
 */
export const LINKEDIN_GRANT_TYPE = 'authorization_code';

// ============================================================================
// LinkedIn OAuth Configuration Factory
// ============================================================================

/**
 * Creates LinkedIn OAuth configuration from environment variables
 * @param envConfig - The environment configuration
 * @returns LinkedIn OAuth configuration object
 * @throws Error if required environment variables are missing when OAuth is enabled
 */
export function createLinkedInOAuthConfig(envConfig: EnvConfig = env): LinkedInOAuthConfig {
  const { oauth } = envConfig;

  // Check if OAuth is enabled and required variables are present
  const enabled = oauth.LINKEDIN_ENABLED;

  if (enabled && !oauth.LINKEDIN_CLIENT_ID) {
    throw new Error('LINKEDIN_CLIENT_ID is required when LINKEDIN_ENABLED is true');
  }

  if (enabled && !oauth.LINKEDIN_CLIENT_SECRET) {
    throw new Error('LINKEDIN_CLIENT_SECRET is required when LINKEDIN_ENABLED is true');
  }

  if (enabled && !oauth.LINKEDIN_CALLBACK_URL) {
    throw new Error('LINKEDIN_CALLBACK_URL is required when LINKEDIN_ENABLED is true');
  }

  return {
    clientId: oauth.LINKEDIN_CLIENT_ID || '',
    clientSecret: oauth.LINKEDIN_CLIENT_SECRET || '',
    callbackUrl: oauth.LINKEDIN_CALLBACK_URL || '',
    scopes: [...LINKEDIN_SCOPES] as string[],
    authEndpoint: LINKEDIN_AUTH_ENDPOINT,
    tokenEndpoint: LINKEDIN_TOKEN_ENDPOINT,
    userInfoEndpoint: LINKEDIN_USER_INFO_ENDPOINT,
    apiVersion: LINKEDIN_API_VERSION,
    enabled,
  };
}

// ============================================================================
// LinkedIn OAuth Configuration Instance
// ============================================================================

/**
 * LinkedIn OAuth configuration instance
 */
export const linkedinOAuthConfig: LinkedInOAuthConfig = createLinkedInOAuthConfig();

// ============================================================================
// LinkedIn OAuth Helper Functions
// ============================================================================

/**
 * Checks if LinkedIn OAuth is configured
 * @param config - The LinkedIn OAuth configuration (optional)
 * @returns True if LinkedIn OAuth is configured and enabled
 */
export function isLinkedInOAuthConfigured(
  config: LinkedInOAuthConfig = linkedinOAuthConfig
): boolean {
  if (!config.enabled) {
    return false;
  }

  if (!config.clientId || config.clientId.length === 0) {
    return false;
  }

  if (!config.clientSecret || config.clientSecret.length === 0) {
    return false;
  }

  if (!config.callbackUrl || config.callbackUrl.length === 0) {
    return false;
  }

  return true;
}

/**
 * Generates the LinkedIn OAuth login URL
 * @param options - Login URL options
 * @param config - The LinkedIn OAuth configuration (optional)
 * @returns The complete login URL
 */
export function getLinkedInLoginUrl(
  options: LinkedInLoginUrlOptions = {},
  config: LinkedInOAuthConfig = linkedinOAuthConfig
): string {
  if (!isLinkedInOAuthConfigured(config)) {
    throw new Error('LinkedIn OAuth is not properly configured');
  }

  const redirectUri = options.redirectUri || config.callbackUrl;

  // Build base parameters
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: redirectUri,
    response_type: LINKEDIN_RESPONSE_TYPE,
    scope: config.scopes.join(' '),
  });

  // Add optional parameters
  if (options.state) {
    params.set('state', options.state);
  }

  if (options.extraScopes && options.extraScopes.length > 0) {
    const allScopes = [...config.scopes, ...options.extraScopes];
    params.set('scope', allScopes.join(' '));
  }

  return `${config.authEndpoint}?${params.toString()}`;
}

/**
 * Generates the LinkedIn OAuth token exchange request body
 * @param code - The authorization code from LinkedIn
 * @param redirectUri - The redirect URI used in the initial request
 * @param config - The LinkedIn OAuth configuration (optional)
 * @returns The token exchange request body
 */
export function getLinkedInTokenExchangeBody(
  code: string,
  redirectUri?: string,
  config: LinkedInOAuthConfig = linkedinOAuthConfig
): Record<string, string> {
  const body: Record<string, string> = {
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    grant_type: LINKEDIN_GRANT_TYPE,
  };

  if (redirectUri) {
    body.redirect_uri = redirectUri;
  }

  return body;
}

/**
 * Gets the LinkedIn user info URL with access token
 * @param accessToken - The access token
 * @param config - The LinkedIn OAuth configuration (optional)
 * @returns The user info URL with token parameter
 */
export function getLinkedInUserInfoUrl(
  accessToken: string,
  config: LinkedInOAuthConfig = linkedinOAuthConfig
): string {
  return `${config.userInfoEndpoint}?access_token=${encodeURIComponent(accessToken)}`;
}

/**
 * Extracts user information from LinkedIn API response
 * @param data - The LinkedIn API response data
 * @returns Extracted user information
 * @throws Error if the response is invalid
 */
export function extractLinkedInUserInfo(data: unknown): LinkedInUserInfo {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid LinkedIn user info data');
  }

  const response = data as Record<string, unknown>;

  // Validate required fields
  if (typeof response.sub !== 'string' || !response.sub) {
    throw new Error('LinkedIn user ID (sub) is required');
  }

  if (typeof response.email !== 'string' || !response.email) {
    throw new Error('LinkedIn user email is required');
  }

  if (typeof response.name !== 'string' || !response.name) {
    throw new Error('LinkedIn user name is required');
  }

  const userInfo: LinkedInUserInfo = {
    id: response.sub as string,
    email: response.email as string,
    name: response.name as string,
    firstName: (response.given_name as string) || '',
    lastName: (response.family_name as string) || '',
  };

  // Extract picture if available
  if (response.picture && typeof response.picture === 'string') {
    userInfo.picture = response.picture;
  }

  // Extract additional optional fields
  if (response.headline && typeof response.headline === 'string') {
    userInfo.headline = response.headline;
  }

  if (response.location && typeof response.location === 'string') {
    userInfo.location = response.location;
  }

  if (response.industry && typeof response.industry === 'string') {
    userInfo.industry = response.industry;
  }

  if (response.profile_url && typeof response.profile_url === 'string') {
    userInfo.profileUrl = response.profile_url;
  }

  if (response.public_profile_url && typeof response.public_profile_url === 'string') {
    userInfo.publicProfileUrl = response.public_profile_url;
  }

  return userInfo;
}

/**
 * Validates LinkedIn OAuth token response
 * @param data - The token response data
 * @returns True if the token response is valid
 */
export function isValidLinkedInTokenResponse(data: unknown): data is {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token?: string;
  scope?: string;
  id_token?: string;
} {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const response = data as Record<string, unknown>;

  if (typeof response.access_token !== 'string' || !response.access_token) {
    return false;
  }

  if (typeof response.expires_in !== 'number' || response.expires_in <= 0) {
    return false;
  }

  if (typeof response.token_type !== 'string' || !response.token_type) {
    return false;
  }

  return true;
}

// ============================================================================
// LinkedIn OAuth Error Handling
// ============================================================================

/**
 * LinkedIn OAuth error codes
 */
export const LINKEDIN_OAUTH_ERRORS = {
  ACCESS_DENIED: 'access_denied',
  INVALID_REQUEST: 'invalid_request',
  UNAUTHORIZED_CLIENT: 'unauthorized_client',
  UNSUPPORTED_RESPONSE_TYPE: 'unsupported_response_type',
  INVALID_SCOPE: 'invalid_scope',
  SERVER_ERROR: 'server_error',
  TEMPORARILY_UNAVAILABLE: 'temporarily_unavailable',
  INVALID_GRANT: 'invalid_grant',
  INVALID_TOKEN: 'invalid_token',
  INSUFFICIENT_SCOPE: 'insufficient_scope',
} as const;

/**
 * LinkedIn OAuth error types
 */
export type LinkedInOAuthErrorType =
  (typeof LINKEDIN_OAUTH_ERRORS)[keyof typeof LINKEDIN_OAUTH_ERRORS];

/**
 * LinkedIn OAuth error messages
 */
export const LINKEDIN_OAUTH_ERROR_MESSAGES: Record<LinkedInOAuthErrorType, string> = {
  [LINKEDIN_OAUTH_ERRORS.ACCESS_DENIED]: 'User denied access to their LinkedIn account',
  [LINKEDIN_OAUTH_ERRORS.INVALID_REQUEST]: 'Invalid OAuth request',
  [LINKEDIN_OAUTH_ERRORS.UNAUTHORIZED_CLIENT]: 'Unauthorized OAuth client',
  [LINKEDIN_OAUTH_ERRORS.UNSUPPORTED_RESPONSE_TYPE]: 'Unsupported OAuth response type',
  [LINKEDIN_OAUTH_ERRORS.INVALID_SCOPE]: 'Invalid OAuth scope requested',
  [LINKEDIN_OAUTH_ERRORS.SERVER_ERROR]: 'LinkedIn OAuth server error',
  [LINKEDIN_OAUTH_ERRORS.TEMPORARILY_UNAVAILABLE]: 'LinkedIn OAuth temporarily unavailable',
  [LINKEDIN_OAUTH_ERRORS.INVALID_GRANT]: 'Invalid OAuth grant',
  [LINKEDIN_OAUTH_ERRORS.INVALID_TOKEN]: 'Invalid or expired OAuth token',
  [LINKEDIN_OAUTH_ERRORS.INSUFFICIENT_SCOPE]: 'Insufficient OAuth scope',
};

/**
 * Gets a user-friendly error message for a LinkedIn OAuth error
 * @param error - The error string from LinkedIn
 * @returns A user-friendly error message
 */
export function getLinkedInOAuthErrorMessage(error: string): string {
  return (
    LINKEDIN_OAUTH_ERROR_MESSAGES[error as LinkedInOAuthErrorType] ||
    'An unknown LinkedIn OAuth error occurred'
  );
}

/**
 * Checks if a LinkedIn OAuth error is a user denial
 * @param error - The error string from LinkedIn
 * @returns True if the error is a user denial
 */
export function isLinkedInOAuthAccessDenied(error: string): boolean {
  return error === LINKEDIN_OAUTH_ERRORS.ACCESS_DENIED;
}
