// packages/shared-config/src/oauth/google.config.ts
import type { EnvConfig } from '../env/env.schema';
import { env } from '../env/env.validation';

// ============================================================================
// Google OAuth Configuration
// ============================================================================

/**
 * Google OAuth configuration interface
 */
export interface GoogleOAuthConfig {
  /** Google OAuth client ID */
  clientId: string;
  /** Google OAuth client secret */
  clientSecret: string;
  /** Google OAuth callback URL */
  callbackUrl: string;
  /** Required OAuth scopes */
  scopes: string[];
  /** OAuth authorization endpoint */
  authEndpoint: string;
  /** OAuth token endpoint */
  tokenEndpoint: string;
  /** OAuth user info endpoint */
  userInfoEndpoint: string;
  /** Whether Google OAuth is enabled */
  enabled: boolean;
  /** Whether to use PKCE (Proof Key for Code Exchange) */
  usePKCE: boolean;
}

/**
 * Google OAuth login URL options
 */
export interface GoogleLoginUrlOptions {
  /** State parameter for CSRF protection */
  state?: string;
  /** Redirect URI (overrides default callback URL) */
  redirectUri?: string;
  /** Additional scopes to request */
  extraScopes?: string[];
  /** Whether to force re-authentication */
  prompt?: 'none' | 'consent' | 'select_account';
  /** Whether to use popup mode */
  popup?: boolean;
}

// ============================================================================
// Google OAuth Constants
// ============================================================================

/**
 * Default Google OAuth endpoints
 */
export const GOOGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
export const GOOGLE_TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
export const GOOGLE_USER_INFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v2/userinfo';
export const GOOGLE_REVOKE_ENDPOINT = 'https://oauth2.googleapis.com/revoke';

/**
 * Default Google OAuth scopes
 */
export const GOOGLE_SCOPES = ['openid', 'profile', 'email'] as const;

/**
 * Google OAuth response types
 */
export const GOOGLE_RESPONSE_TYPE = 'code';
export const GOOGLE_GRANT_TYPE = 'authorization_code';
export const GOOGLE_ACCESS_TYPE = 'offline';

// ============================================================================
// Google OAuth Configuration Factory
// ============================================================================

/**
 * Creates Google OAuth configuration from environment variables
 * @param envConfig - The environment configuration
 * @returns Google OAuth configuration object
 * @throws Error if required environment variables are missing when OAuth is enabled
 */
export function createGoogleOAuthConfig(envConfig: EnvConfig = env): GoogleOAuthConfig {
  const { oauth } = envConfig;

  // Check if OAuth is enabled and required variables are present
  const enabled = oauth.GOOGLE_ENABLED;

  if (enabled && !oauth.GOOGLE_CLIENT_ID) {
    throw new Error('GOOGLE_CLIENT_ID is required when GOOGLE_ENABLED is true');
  }

  if (enabled && !oauth.GOOGLE_CLIENT_SECRET) {
    throw new Error('GOOGLE_CLIENT_SECRET is required when GOOGLE_ENABLED is true');
  }

  if (enabled && !oauth.GOOGLE_CALLBACK_URL) {
    throw new Error('GOOGLE_CALLBACK_URL is required when GOOGLE_ENABLED is true');
  }

  return {
    clientId: oauth.GOOGLE_CLIENT_ID || '',
    clientSecret: oauth.GOOGLE_CLIENT_SECRET || '',
    callbackUrl: oauth.GOOGLE_CALLBACK_URL || '',
    scopes: [...GOOGLE_SCOPES] as string[],
    authEndpoint: GOOGLE_AUTH_ENDPOINT,
    tokenEndpoint: GOOGLE_TOKEN_ENDPOINT,
    userInfoEndpoint: GOOGLE_USER_INFO_ENDPOINT,
    enabled,
    usePKCE: true,
  };
}

// ============================================================================
// Google OAuth Configuration Instance
// ============================================================================

/**
 * Google OAuth configuration instance
 */
export const googleOAuthConfig: GoogleOAuthConfig = createGoogleOAuthConfig();

// ============================================================================
// Google OAuth Helper Functions
// ============================================================================

/**
 * Checks if Google OAuth is configured
 * @param config - The Google OAuth configuration (optional)
 * @returns True if Google OAuth is configured and enabled
 */
export function isGoogleOAuthConfigured(config: GoogleOAuthConfig = googleOAuthConfig): boolean {
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
 * Generates the Google OAuth login URL
 * @param options - Login URL options
 * @param config - The Google OAuth configuration (optional)
 * @returns The complete login URL
 */
export function getGoogleLoginUrl(
  options: GoogleLoginUrlOptions = {},
  config: GoogleOAuthConfig = googleOAuthConfig
): string {
  if (!isGoogleOAuthConfigured(config)) {
    throw new Error('Google OAuth is not properly configured');
  }

  const redirectUri = options.redirectUri || config.callbackUrl;

  // Build base parameters
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: redirectUri,
    response_type: GOOGLE_RESPONSE_TYPE,
    scope: config.scopes.join(' '),
    access_type: GOOGLE_ACCESS_TYPE,
  });

  // Add optional parameters
  if (options.state) {
    params.set('state', options.state);
  }

  if (options.extraScopes && options.extraScopes.length > 0) {
    const allScopes = [...config.scopes, ...options.extraScopes];
    params.set('scope', allScopes.join(' '));
  }

  if (options.prompt) {
    params.set('prompt', options.prompt);
  }

  if (options.popup) {
    params.set('popup', 'true');
  }

  return `${config.authEndpoint}?${params.toString()}`;
}

/**
 * Generates the Google OAuth token exchange request body
 * @param code - The authorization code from Google
 * @param redirectUri - The redirect URI used in the initial request
 * @param codeVerifier - PKCE code verifier (if using PKCE)
 * @returns The token exchange request body
 */
export function getGoogleTokenExchangeBody(
  code: string,
  redirectUri?: string,
  codeVerifier?: string
): Record<string, string> {
  const body: Record<string, string> = {
    client_id: googleOAuthConfig.clientId,
    client_secret: googleOAuthConfig.clientSecret,
    code,
    grant_type: GOOGLE_GRANT_TYPE,
  };

  if (redirectUri) {
    body.redirect_uri = redirectUri;
  }

  if (codeVerifier) {
    body.code_verifier = codeVerifier;
  }

  return body;
}

/**
 * Generates the Google OAuth token revocation request body
 * @param token - The token to revoke
 * @returns The token revocation request body
 */
export function getGoogleRevokeBody(token: string): Record<string, string> {
  return {
    token,
    client_id: googleOAuthConfig.clientId,
    client_secret: googleOAuthConfig.clientSecret,
  };
}

/**
 * Gets the Google user info URL with access token
 * @param accessToken - The access token
 * @returns The user info URL with token parameter
 */
export function getGoogleUserInfoUrl(accessToken: string): string {
  return `${googleOAuthConfig.userInfoEndpoint}?access_token=${encodeURIComponent(accessToken)}`;
}

/**
 * Gets the Google token revocation URL
 * @returns The token revocation endpoint URL
 */
export function getGoogleRevokeUrl(): string {
  return GOOGLE_REVOKE_ENDPOINT;
}

// ============================================================================
// Google OAuth Error Handling
// ============================================================================

/**
 * Google OAuth error codes
 */
export const GOOGLE_OAUTH_ERRORS = {
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
 * Google OAuth error types
 */
export type GoogleOAuthErrorType = (typeof GOOGLE_OAUTH_ERRORS)[keyof typeof GOOGLE_OAUTH_ERRORS];

/**
 * Google OAuth error messages
 */
export const GOOGLE_OAUTH_ERROR_MESSAGES: Record<GoogleOAuthErrorType, string> = {
  [GOOGLE_OAUTH_ERRORS.ACCESS_DENIED]: 'User denied access to their Google account',
  [GOOGLE_OAUTH_ERRORS.INVALID_REQUEST]: 'Invalid OAuth request',
  [GOOGLE_OAUTH_ERRORS.UNAUTHORIZED_CLIENT]: 'Unauthorized OAuth client',
  [GOOGLE_OAUTH_ERRORS.UNSUPPORTED_RESPONSE_TYPE]: 'Unsupported OAuth response type',
  [GOOGLE_OAUTH_ERRORS.INVALID_SCOPE]: 'Invalid OAuth scope requested',
  [GOOGLE_OAUTH_ERRORS.SERVER_ERROR]: 'Google OAuth server error',
  [GOOGLE_OAUTH_ERRORS.TEMPORARILY_UNAVAILABLE]: 'Google OAuth temporarily unavailable',
  [GOOGLE_OAUTH_ERRORS.INVALID_GRANT]: 'Invalid OAuth grant',
  [GOOGLE_OAUTH_ERRORS.INVALID_TOKEN]: 'Invalid or expired OAuth token',
  [GOOGLE_OAUTH_ERRORS.INSUFFICIENT_SCOPE]: 'Insufficient OAuth scope',
};

/**
 * Google OAuth configuration error types
 */
const GOOGLE_OAUTH_CONFIG_ERRORS: GoogleOAuthErrorType[] = [
  GOOGLE_OAUTH_ERRORS.INVALID_REQUEST,
  GOOGLE_OAUTH_ERRORS.UNAUTHORIZED_CLIENT,
  GOOGLE_OAUTH_ERRORS.UNSUPPORTED_RESPONSE_TYPE,
  GOOGLE_OAUTH_ERRORS.INVALID_SCOPE,
];

/**
 * Checks if a Google OAuth error is a user denial
 * @param error - The error string from Google
 * @returns True if the error is a user denial
 */
export function isGoogleOAuthAccessDenied(error: string): boolean {
  return error === GOOGLE_OAUTH_ERRORS.ACCESS_DENIED;
}

/**
 * Checks if a Google OAuth error is a configuration error
 * @param error - The error string from Google
 * @returns True if the error is a configuration error
 */
export function isGoogleOAuthConfigError(error: string): boolean {
  return GOOGLE_OAUTH_CONFIG_ERRORS.includes(error as GoogleOAuthErrorType);
}

/**
 * Gets a user-friendly error message for a Google OAuth error
 * @param error - The error string from Google
 * @returns A user-friendly error message
 */
export function getGoogleOAuthErrorMessage(error: string): string {
  return (
    GOOGLE_OAUTH_ERROR_MESSAGES[error as GoogleOAuthErrorType] ||
    'An unknown Google OAuth error occurred'
  );
}

// ============================================================================
// Google OAuth Token Validation
// ============================================================================

/**
 * Validates Google OAuth token response
 * @param data - The token response data
 * @returns True if the token response is valid
 */
export function isValidGoogleTokenResponse(data: unknown): data is {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
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

/**
 * Validates Google OAuth user info response
 * @param data - The user info response data
 * @returns True if the user info response is valid
 */
export function isValidGoogleUserInfo(data: unknown): data is {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
} {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const response = data as Record<string, unknown>;

  if (typeof response.id !== 'string' || !response.id) {
    return false;
  }

  if (typeof response.email !== 'string' || !response.email) {
    return false;
  }

  if (typeof response.verified_email !== 'boolean') {
    return false;
  }

  if (typeof response.name !== 'string' || !response.name) {
    return false;
  }

  return true;
}
