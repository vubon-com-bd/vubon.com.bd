// packages/shared-config/src/oauth/facebook.config.ts
import type { EnvConfig } from '../env/env.schema';
import { env } from '../env/env.validation';

// ============================================================================
// Facebook OAuth Configuration
// ============================================================================

/**
 * Facebook OAuth configuration interface
 */
export interface FacebookOAuthConfig {
  /** Facebook OAuth client ID */
  clientId: string;
  /** Facebook OAuth client secret */
  clientSecret: string;
  /** Facebook OAuth callback URL */
  callbackUrl: string;
  /** Required OAuth scopes */
  scopes: string[];
  /** OAuth authorization endpoint */
  authEndpoint: string;
  /** OAuth token endpoint */
  tokenEndpoint: string;
  /** OAuth user info endpoint */
  userInfoEndpoint: string;
  /** Facebook Graph API version */
  apiVersion: string;
  /** Display mode for OAuth dialog */
  display: 'page' | 'popup' | 'touch' | 'wap';
  /** Whether Facebook OAuth is enabled */
  enabled: boolean;
}

/**
 * Facebook OAuth login URL options
 */
export interface FacebookLoginUrlOptions {
  /** State parameter for CSRF protection */
  state?: string;
  /** Redirect URI (overrides default callback URL) */
  redirectUri?: string;
  /** Additional scopes to request */
  extraScopes?: string[];
  /** Display mode */
  display?: 'page' | 'popup' | 'touch' | 'wap';
  /** Whether to force re-authentication */
  authType?: 'reauthenticate' | 'rerequest';
}

/**
 * Facebook user info interface
 */
export interface FacebookUserInfo {
  /** Facebook user ID */
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
  picture?: {
    data: {
      url: string;
      isSilhouette: boolean;
    };
  };
  /** User's locale */
  locale?: string;
  /** User's timezone offset */
  timezone?: number;
  /** User's gender */
  gender?: string;
  /** User's birthday (MM/DD/YYYY) */
  birthday?: string;
}

// ============================================================================
// Facebook OAuth Constants
// ============================================================================

/**
 * Default Facebook Graph API version
 */
export const FACEBOOK_API_VERSION = 'v18.0';

/**
 * Facebook OAuth endpoints
 */
export const FACEBOOK_AUTH_ENDPOINT = 'https://www.facebook.com/v18.0/dialog/oauth';
export const FACEBOOK_TOKEN_ENDPOINT = 'https://graph.facebook.com/v18.0/oauth/access_token';
export const FACEBOOK_USER_INFO_ENDPOINT = 'https://graph.facebook.com/v18.0/me';

/**
 * Default Facebook OAuth scopes
 */
export const FACEBOOK_SCOPES = ['email', 'public_profile'] as const;

/**
 * Facebook OAuth response types
 */
export const FACEBOOK_RESPONSE_TYPE = 'code';

/**
 * Facebook OAuth grant type
 */
export const FACEBOOK_GRANT_TYPE = 'authorization_code';

// ============================================================================
// Facebook OAuth Configuration Factory
// ============================================================================

/**
 * Creates Facebook OAuth configuration from environment variables
 * @param envConfig - The environment configuration
 * @returns Facebook OAuth configuration object
 * @throws Error if required environment variables are missing when OAuth is enabled
 */
export function createFacebookOAuthConfig(envConfig: EnvConfig = env): FacebookOAuthConfig {
  const { oauth } = envConfig;

  // Check if OAuth is enabled and required variables are present
  const enabled = oauth.FACEBOOK_ENABLED;

  if (enabled && !oauth.FACEBOOK_CLIENT_ID) {
    throw new Error('FACEBOOK_CLIENT_ID is required when FACEBOOK_ENABLED is true');
  }

  if (enabled && !oauth.FACEBOOK_CLIENT_SECRET) {
    throw new Error('FACEBOOK_CLIENT_SECRET is required when FACEBOOK_ENABLED is true');
  }

  if (enabled && !oauth.FACEBOOK_CALLBACK_URL) {
    throw new Error('FACEBOOK_CALLBACK_URL is required when FACEBOOK_ENABLED is true');
  }

  return {
    clientId: oauth.FACEBOOK_CLIENT_ID || '',
    clientSecret: oauth.FACEBOOK_CLIENT_SECRET || '',
    callbackUrl: oauth.FACEBOOK_CALLBACK_URL || '',
    scopes: [...FACEBOOK_SCOPES] as string[],
    authEndpoint: FACEBOOK_AUTH_ENDPOINT,
    tokenEndpoint: FACEBOOK_TOKEN_ENDPOINT,
    userInfoEndpoint: FACEBOOK_USER_INFO_ENDPOINT,
    apiVersion: FACEBOOK_API_VERSION,
    display: 'popup',
    enabled,
  };
}

// ============================================================================
// Facebook OAuth Configuration Instance
// ============================================================================

/**
 * Facebook OAuth configuration instance
 */
export const facebookOAuthConfig: FacebookOAuthConfig = createFacebookOAuthConfig();

// ============================================================================
// Facebook OAuth Helper Functions
// ============================================================================

/**
 * Checks if Facebook OAuth is configured
 * @param config - The Facebook OAuth configuration (optional)
 * @returns True if Facebook OAuth is configured and enabled
 */
export function isFacebookOAuthConfigured(
  config: FacebookOAuthConfig = facebookOAuthConfig
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
 * Generates the Facebook OAuth login URL
 * @param options - Login URL options
 * @param config - The Facebook OAuth configuration (optional)
 * @returns The complete login URL
 */
export function getFacebookLoginUrl(
  options: FacebookLoginUrlOptions = {},
  config: FacebookOAuthConfig = facebookOAuthConfig
): string {
  if (!isFacebookOAuthConfigured(config)) {
    throw new Error('Facebook OAuth is not properly configured');
  }

  const redirectUri = options.redirectUri || config.callbackUrl;

  // Build base parameters
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: redirectUri,
    response_type: FACEBOOK_RESPONSE_TYPE,
  });

  // Add scopes
  let allScopes = [...config.scopes];
  if (options.extraScopes && options.extraScopes.length > 0) {
    allScopes = [...allScopes, ...options.extraScopes];
  }
  params.set('scope', allScopes.join(','));

  // Add optional parameters
  if (options.state) {
    params.set('state', options.state);
  }

  if (options.display) {
    params.set('display', options.display);
  }

  if (options.authType) {
    params.set('auth_type', options.authType);
  }

  // Build URL with version
  const baseUrl = `https://www.facebook.com/${config.apiVersion}/dialog/oauth`;
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generates the Facebook OAuth token exchange request body
 * @param code - The authorization code from Facebook
 * @param redirectUri - The redirect URI used in the initial request
 * @param config - The Facebook OAuth configuration (optional)
 * @returns The token exchange request body
 */
export function getFacebookTokenExchangeBody(
  code: string,
  redirectUri?: string,
  config: FacebookOAuthConfig = facebookOAuthConfig
): Record<string, string> {
  const body: Record<string, string> = {
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    grant_type: FACEBOOK_GRANT_TYPE,
  };

  if (redirectUri) {
    body.redirect_uri = redirectUri;
  }

  return body;
}

/**
 * Gets the Facebook user info URL with access token
 * @param accessToken - The access token
 * @param fields - Additional fields to request (optional)
 * @param config - The Facebook OAuth configuration (optional)
 * @returns The user info URL with token parameter
 */
export function getFacebookUserInfoUrl(
  accessToken: string,
  fields?: string[],
  config: FacebookOAuthConfig = facebookOAuthConfig
): string {
  const defaultFields = ['id', 'email', 'name', 'first_name', 'last_name', 'picture'];
  const requestedFields = fields || defaultFields;

  const params = new URLSearchParams({
    access_token: accessToken,
    fields: requestedFields.join(','),
  });

  return `${config.userInfoEndpoint}?${params.toString()}`;
}

/**
 * Extracts user information from Facebook API response
 * @param data - The Facebook API response data
 * @returns Extracted user information
 * @throws Error if the response is invalid
 */
export function extractFacebookUserInfo(data: unknown): FacebookUserInfo {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid Facebook user info data');
  }

  const response = data as Record<string, unknown>;

  // Validate required fields
  if (typeof response.id !== 'string' || !response.id) {
    throw new Error('Facebook user ID is required');
  }

  if (typeof response.email !== 'string' || !response.email) {
    throw new Error('Facebook user email is required');
  }

  if (typeof response.name !== 'string' || !response.name) {
    throw new Error('Facebook user name is required');
  }

  const userInfo: FacebookUserInfo = {
    id: response.id as string,
    email: response.email as string,
    name: response.name as string,
    firstName: (response.first_name as string) || '',
    lastName: (response.last_name as string) || '',
  };

  // Extract picture if available
  if (response.picture && typeof response.picture === 'object') {
    const pictureData = response.picture as Record<string, unknown>;
    if (pictureData.data && typeof pictureData.data === 'object') {
      const data = pictureData.data as Record<string, unknown>;
      userInfo.picture = {
        data: {
          url: (data.url as string) || '',
          isSilhouette: (data.is_silhouette as boolean) || false,
        },
      };
    }
  }

  // Extract additional optional fields
  if (response.locale && typeof response.locale === 'string') {
    userInfo.locale = response.locale;
  }

  if (response.timezone && typeof response.timezone === 'number') {
    userInfo.timezone = response.timezone;
  }

  if (response.gender && typeof response.gender === 'string') {
    userInfo.gender = response.gender;
  }

  if (response.birthday && typeof response.birthday === 'string') {
    userInfo.birthday = response.birthday;
  }

  return userInfo;
}

/**
 * Validates Facebook OAuth token response
 * @param data - The token response data
 * @returns True if the token response is valid
 */
export function isValidFacebookTokenResponse(data: unknown): data is {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
} {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const response = data as Record<string, unknown>;

  if (typeof response.access_token !== 'string' || !response.access_token) {
    return false;
  }

  if (typeof response.token_type !== 'string' || !response.token_type) {
    return false;
  }

  if (typeof response.expires_in !== 'number' || response.expires_in <= 0) {
    return false;
  }

  return true;
}

// ============================================================================
// Facebook OAuth Error Handling
// ============================================================================

/**
 * Facebook OAuth error codes
 */
export const FACEBOOK_OAUTH_ERRORS = {
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
 * Facebook OAuth error types
 */
export type FacebookOAuthErrorType =
  (typeof FACEBOOK_OAUTH_ERRORS)[keyof typeof FACEBOOK_OAUTH_ERRORS];

/**
 * Facebook OAuth error messages
 */
export const FACEBOOK_OAUTH_ERROR_MESSAGES: Record<FacebookOAuthErrorType, string> = {
  [FACEBOOK_OAUTH_ERRORS.ACCESS_DENIED]: 'User denied access to their Facebook account',
  [FACEBOOK_OAUTH_ERRORS.INVALID_REQUEST]: 'Invalid OAuth request',
  [FACEBOOK_OAUTH_ERRORS.UNAUTHORIZED_CLIENT]: 'Unauthorized OAuth client',
  [FACEBOOK_OAUTH_ERRORS.UNSUPPORTED_RESPONSE_TYPE]: 'Unsupported OAuth response type',
  [FACEBOOK_OAUTH_ERRORS.INVALID_SCOPE]: 'Invalid OAuth scope requested',
  [FACEBOOK_OAUTH_ERRORS.SERVER_ERROR]: 'Facebook OAuth server error',
  [FACEBOOK_OAUTH_ERRORS.TEMPORARILY_UNAVAILABLE]: 'Facebook OAuth temporarily unavailable',
  [FACEBOOK_OAUTH_ERRORS.INVALID_GRANT]: 'Invalid OAuth grant',
  [FACEBOOK_OAUTH_ERRORS.INVALID_TOKEN]: 'Invalid or expired OAuth token',
  [FACEBOOK_OAUTH_ERRORS.INSUFFICIENT_SCOPE]: 'Insufficient OAuth scope',
};

/**
 * Gets a user-friendly error message for a Facebook OAuth error
 * @param error - The error string from Facebook
 * @returns A user-friendly error message
 */
export function getFacebookOAuthErrorMessage(error: string): string {
  return (
    FACEBOOK_OAUTH_ERROR_MESSAGES[error as FacebookOAuthErrorType] ||
    'An unknown Facebook OAuth error occurred'
  );
}

/**
 * Checks if a Facebook OAuth error is a user denial
 * @param error - The error string from Facebook
 * @returns True if the error is a user denial
 */
export function isFacebookOAuthAccessDenied(error: string): boolean {
  return error === FACEBOOK_OAUTH_ERRORS.ACCESS_DENIED;
}
