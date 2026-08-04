// packages/shared-config/src/oauth/apple.config.ts
import type { EnvConfig } from '../env/env.schema';
import { env } from '../env/env.validation';

// ============================================================================
// Apple OAuth Configuration
// ============================================================================

/**
 * Apple OAuth configuration interface
 */
export interface AppleOAuthConfig {
  /** Apple OAuth client ID (Service ID) */
  clientId: string;
  /** Apple OAuth team ID */
  teamId: string;
  /** Apple OAuth key ID */
  keyId: string;
  /** Apple OAuth private key (base64 encoded) */
  privateKey: string;
  /** Apple OAuth callback URL */
  callbackUrl: string;
  /** Required OAuth scopes */
  scopes: string[];
  /** OAuth authorization endpoint */
  authEndpoint: string;
  /** OAuth token endpoint */
  tokenEndpoint: string;
  /** OAuth user info endpoint */
  userInfoEndpoint: string;
  /** Whether Apple OAuth is enabled */
  enabled: boolean;
  /** Whether to use PKCE (Proof Key for Code Exchange) */
  usePKCE: boolean;
  /** Response mode */
  responseMode: 'form_post' | 'query';
  /** Response type */
  responseType: string;
}

/**
 * Apple OAuth login URL options
 */
export interface AppleLoginUrlOptions {
  /** State parameter for CSRF protection */
  state?: string;
  /** Nonce parameter for ID token validation */
  nonce?: string;
  /** Redirect URI (overrides default callback URL) */
  redirectUri?: string;
  /** Additional scopes to request */
  extraScopes?: string[];
  /** Response mode */
  responseMode?: 'form_post' | 'query';
}

/**
 * Apple user info interface
 */
export interface AppleUserInfo {
  /** Apple user ID (sub) */
  id: string;
  /** User's email address */
  email: string;
  /** Whether email is verified */
  emailVerified: boolean;
  /** User's full name */
  name: string;
  /** User's first name */
  firstName: string;
  /** User's last name */
  lastName: string;
  /** User's avatar URL (if available) */
  avatar?: string;
  /** ID token */
  idToken?: string;
}

/**
 * Apple ID token payload interface
 */
export interface AppleIDTokenPayload {
  /** Issuer */
  iss: string;
  /** Audience */
  aud: string;
  /** Expiration time */
  exp: number;
  /** Issued at time */
  iat: number;
  /** Subject (user ID) */
  sub: string;
  /** Email */
  email: string;
  /** Email verified */
  email_verified: string;
  /** Nonce */
  nonce?: string;
  /** Authentication time */
  auth_time?: number;
}

// ============================================================================
// Apple OAuth Constants
// ============================================================================

/**
 * Apple OAuth endpoints
 */
export const APPLE_AUTH_ENDPOINT = 'https://appleid.apple.com/auth/authorize';
export const APPLE_TOKEN_ENDPOINT = 'https://appleid.apple.com/auth/token';
export const APPLE_USER_INFO_ENDPOINT = 'https://appleid.apple.com/auth/keys';

/**
 * Default Apple OAuth scopes
 */
export const APPLE_SCOPES = ['name', 'email'] as const;

/**
 * Apple OAuth response types
 */
export const APPLE_RESPONSE_TYPE = 'code';
export const APPLE_RESPONSE_MODE = 'form_post';

/**
 * Apple OAuth grant type
 */
export const APPLE_GRANT_TYPE = 'authorization_code';

// ============================================================================
// Apple OAuth Configuration Factory
// ============================================================================

/**
 * Creates Apple OAuth configuration from environment variables
 * @param envConfig - The environment configuration
 * @returns Apple OAuth configuration object
 * @throws Error if required environment variables are missing when OAuth is enabled
 */
export function createAppleOAuthConfig(envConfig: EnvConfig = env): AppleOAuthConfig {
  const { oauth } = envConfig;

  // Check if OAuth is enabled and required variables are present
  const enabled = oauth.APPLE_ENABLED;

  if (enabled && !oauth.APPLE_CLIENT_ID) {
    throw new Error('APPLE_CLIENT_ID is required when APPLE_ENABLED is true');
  }

  if (enabled && !oauth.APPLE_TEAM_ID) {
    throw new Error('APPLE_TEAM_ID is required when APPLE_ENABLED is true');
  }

  if (enabled && !oauth.APPLE_KEY_ID) {
    throw new Error('APPLE_KEY_ID is required when APPLE_ENABLED is true');
  }

  if (enabled && !oauth.APPLE_PRIVATE_KEY) {
    throw new Error('APPLE_PRIVATE_KEY is required when APPLE_ENABLED is true');
  }

  if (enabled && !oauth.APPLE_CALLBACK_URL) {
    throw new Error('APPLE_CALLBACK_URL is required when APPLE_ENABLED is true');
  }

  return {
    clientId: oauth.APPLE_CLIENT_ID || '',
    teamId: oauth.APPLE_TEAM_ID || '',
    keyId: oauth.APPLE_KEY_ID || '',
    privateKey: oauth.APPLE_PRIVATE_KEY || '',
    callbackUrl: oauth.APPLE_CALLBACK_URL || '',
    scopes: [...APPLE_SCOPES] as string[],
    authEndpoint: APPLE_AUTH_ENDPOINT,
    tokenEndpoint: APPLE_TOKEN_ENDPOINT,
    userInfoEndpoint: APPLE_USER_INFO_ENDPOINT,
    enabled,
    usePKCE: true,
    responseMode: APPLE_RESPONSE_MODE,
    responseType: APPLE_RESPONSE_TYPE,
  };
}

// ============================================================================
// Apple OAuth Configuration Instance
// ============================================================================

/**
 * Apple OAuth configuration instance
 */
export const appleOAuthConfig: AppleOAuthConfig = createAppleOAuthConfig();

// ============================================================================
// Apple OAuth Helper Functions
// ============================================================================

/**
 * Checks if Apple OAuth is configured
 * @param config - The Apple OAuth configuration (optional)
 * @returns True if Apple OAuth is configured and enabled
 */
export function isAppleOAuthConfigured(config: AppleOAuthConfig = appleOAuthConfig): boolean {
  if (!config.enabled) {
    return false;
  }

  if (!config.clientId || config.clientId.length === 0) {
    return false;
  }

  if (!config.teamId || config.teamId.length === 0) {
    return false;
  }

  if (!config.keyId || config.keyId.length === 0) {
    return false;
  }

  if (!config.privateKey || config.privateKey.length === 0) {
    return false;
  }

  if (!config.callbackUrl || config.callbackUrl.length === 0) {
    return false;
  }

  return true;
}

/**
 * Generates the Apple OAuth login URL
 * @param options - Login URL options
 * @param config - The Apple OAuth configuration (optional)
 * @returns The complete login URL
 */
export function getAppleLoginUrl(
  options: AppleLoginUrlOptions = {},
  config: AppleOAuthConfig = appleOAuthConfig
): string {
  if (!isAppleOAuthConfigured(config)) {
    throw new Error('Apple OAuth is not properly configured');
  }

  const redirectUri = options.redirectUri || config.callbackUrl;

  // Build base parameters
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: redirectUri,
    response_type: config.responseType,
    scope: config.scopes.join(' '),
    response_mode: options.responseMode || config.responseMode,
  });

  // Add optional parameters
  if (options.state) {
    params.set('state', options.state);
  }

  if (options.nonce) {
    params.set('nonce', options.nonce);
  }

  if (options.extraScopes && options.extraScopes.length > 0) {
    const allScopes = [...config.scopes, ...options.extraScopes];
    params.set('scope', allScopes.join(' '));
  }

  return `${config.authEndpoint}?${params.toString()}`;
}

/**
 * Generates the Apple OAuth token exchange request body
 * @param code - The authorization code from Apple
 * @param redirectUri - The redirect URI used in the initial request
 * @param codeVerifier - PKCE code verifier (if using PKCE)
 * @param config - The Apple OAuth configuration (optional)
 * @returns The token exchange request body
 */
export function getAppleTokenExchangeBody(
  code: string,
  redirectUri?: string,
  codeVerifier?: string,
  config: AppleOAuthConfig = appleOAuthConfig
): Record<string, string> {
  const body: Record<string, string> = {
    client_id: config.clientId,
    code,
    grant_type: APPLE_GRANT_TYPE,
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
 * Extracts user information from Apple ID token
 * @param idToken - The ID token from Apple
 * @param nameData - The name data from the user info (if available)
 * @returns Extracted user information
 * @throws Error if the token is invalid
 */
export function extractAppleUserInfo(
  idToken: string,
  nameData?: Record<string, unknown>
): AppleUserInfo {
  // Parse the ID token (JWT)
  const parts = idToken.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid Apple ID token format');
  }

  // Decode the payload (middle part)
  const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));

  // Validate required fields
  if (typeof payload.sub !== 'string' || !payload.sub) {
    throw new Error('Apple user ID (sub) is required');
  }

  if (typeof payload.email !== 'string' || !payload.email) {
    throw new Error('Apple user email is required');
  }

  const userInfo: AppleUserInfo = {
    id: payload.sub as string,
    email: payload.email as string,
    emailVerified: payload.email_verified === 'true' || payload.email_verified === true,
    name: '',
    firstName: '',
    lastName: '',
  };

  // Extract name from nameData (Apple sends name in a separate request)
  if (nameData && typeof nameData === 'object') {
    const userData = nameData as Record<string, unknown>;

    if (userData.name && typeof userData.name === 'object') {
      const nameObj = userData.name as Record<string, string>;
      if (nameObj.firstName) {
        userInfo.firstName = nameObj.firstName;
      }
      if (nameObj.lastName) {
        userInfo.lastName = nameObj.lastName;
      }
      // Apple sometimes sends fullName directly
      if (nameObj.fullName) {
        userInfo.name = nameObj.fullName;
      }
    }
  }

  // If we still don't have a full name, construct it from first and last
  if (!userInfo.name) {
    if (userInfo.firstName && userInfo.lastName) {
      userInfo.name = `${userInfo.firstName} ${userInfo.lastName}`;
    } else if (userInfo.firstName) {
      userInfo.name = userInfo.firstName;
    } else if (userInfo.lastName) {
      userInfo.name = userInfo.lastName;
    }
  }

  // Store ID token for reference
  userInfo.idToken = idToken;

  return userInfo;
}

/**
 * Validates Apple OAuth token response
 * @param data - The token response data
 * @returns True if the token response is valid
 */
export function isValidAppleTokenResponse(data: unknown): data is {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
  id_token: string;
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

  if (typeof response.id_token !== 'string' || !response.id_token) {
    return false;
  }

  return true;
}

/**
 * Validates Apple ID token
 * @param idToken - The ID token to validate
 * @param clientId - The client ID to validate against
 * @param nonce - The nonce to validate against (optional)
 * @returns True if the ID token is valid
 */
export function validateAppleIDToken(idToken: string, clientId: string, nonce?: string): boolean {
  try {
    const parts = idToken.split('.');
    if (parts.length !== 3) {
      return false;
    }

    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));

    // Validate issuer
    if (payload.iss !== 'https://appleid.apple.com') {
      return false;
    }

    // Validate audience (client ID)
    if (payload.aud !== clientId) {
      return false;
    }

    // Validate expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return false;
    }

    // Validate nonce if provided
    if (nonce && payload.nonce !== nonce) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Extracts the client secret for Apple OAuth
 * This would typically be generated using the private key
 * @param config - The Apple OAuth configuration (optional)
 * @returns The client secret (to be generated in the service layer)
 */
export function getAppleClientSecret(config: AppleOAuthConfig = appleOAuthConfig): string {
  // In production, this would generate a JWT using the private key
  // The actual implementation should use `jsonwebtoken` to sign a JWT with ES256
  // This is a placeholder for the actual implementation
  if (!config.privateKey) {
    throw new Error('Apple private key is required to generate client secret');
  }

  // The client secret should be generated in the service layer
  // using the private key, team ID, client ID, and key ID
  return config.privateKey;
}

// ============================================================================
// Apple OAuth Error Handling
// ============================================================================

/**
 * Apple OAuth error codes
 */
export const APPLE_OAUTH_ERRORS = {
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
 * Apple OAuth error types
 */
export type AppleOAuthErrorType = (typeof APPLE_OAUTH_ERRORS)[keyof typeof APPLE_OAUTH_ERRORS];

/**
 * Apple OAuth error messages
 */
export const APPLE_OAUTH_ERROR_MESSAGES: Record<AppleOAuthErrorType, string> = {
  [APPLE_OAUTH_ERRORS.ACCESS_DENIED]: 'User denied access to their Apple account',
  [APPLE_OAUTH_ERRORS.INVALID_REQUEST]: 'Invalid OAuth request',
  [APPLE_OAUTH_ERRORS.UNAUTHORIZED_CLIENT]: 'Unauthorized OAuth client',
  [APPLE_OAUTH_ERRORS.UNSUPPORTED_RESPONSE_TYPE]: 'Unsupported OAuth response type',
  [APPLE_OAUTH_ERRORS.INVALID_SCOPE]: 'Invalid OAuth scope requested',
  [APPLE_OAUTH_ERRORS.SERVER_ERROR]: 'Apple OAuth server error',
  [APPLE_OAUTH_ERRORS.TEMPORARILY_UNAVAILABLE]: 'Apple OAuth temporarily unavailable',
  [APPLE_OAUTH_ERRORS.INVALID_GRANT]: 'Invalid OAuth grant',
  [APPLE_OAUTH_ERRORS.INVALID_TOKEN]: 'Invalid or expired OAuth token',
  [APPLE_OAUTH_ERRORS.INSUFFICIENT_SCOPE]: 'Insufficient OAuth scope',
};

/**
 * Gets a user-friendly error message for an Apple OAuth error
 * @param error - The error string from Apple
 * @returns A user-friendly error message
 */
export function getAppleOAuthErrorMessage(error: string): string {
  return (
    APPLE_OAUTH_ERROR_MESSAGES[error as AppleOAuthErrorType] ||
    'An unknown Apple OAuth error occurred'
  );
}

/**
 * Checks if an Apple OAuth error is a user denial
 * @param error - The error string from Apple
 * @returns True if the error is a user denial
 */
export function isAppleOAuthAccessDenied(error: string): boolean {
  return error === APPLE_OAUTH_ERRORS.ACCESS_DENIED;
}
