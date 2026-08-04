// packages/shared-config/src/oauth/github.config.ts
import type { EnvConfig } from '../env/env.schema';
import { env } from '../env/env.validation';

// ============================================================================
// GitHub OAuth Configuration
// ============================================================================

/**
 * GitHub OAuth configuration interface
 */
export interface GitHubOAuthConfig {
  /** GitHub OAuth client ID */
  clientId: string;
  /** GitHub OAuth client secret */
  clientSecret: string;
  /** GitHub OAuth callback URL */
  callbackUrl: string;
  /** Required OAuth scopes */
  scopes: string[];
  /** OAuth authorization endpoint */
  authEndpoint: string;
  /** OAuth token endpoint */
  tokenEndpoint: string;
  /** OAuth user info endpoint */
  userInfoEndpoint: string;
  /** OAuth user emails endpoint */
  userEmailsEndpoint: string;
  /** GitHub API version */
  apiVersion: string;
  /** Whether GitHub OAuth is enabled */
  enabled: boolean;
  /** Whether to allow user to choose account */
  allowSignup: boolean;
}

/**
 * GitHub OAuth login URL options
 */
export interface GitHubLoginUrlOptions {
  /** State parameter for CSRF protection */
  state?: string;
  /** Redirect URI (overrides default callback URL) */
  redirectUri?: string;
  /** Additional scopes to request */
  extraScopes?: string[];
  /** Whether to allow signup */
  allowSignup?: boolean;
}

/**
 * GitHub user info interface
 */
export interface GitHubUserInfo {
  /** GitHub user ID */
  id: number;
  /** GitHub username */
  login: string;
  /** User's email address */
  email: string | null;
  /** User's full name */
  name: string | null;
  /** User's avatar URL */
  avatarUrl: string;
  /** User's bio */
  bio?: string;
  /** User's company */
  company?: string;
  /** User's location */
  location?: string;
  /** User's blog/website URL */
  blog?: string;
  /** User's Twitter username */
  twitterUsername?: string;
  /** Number of public repositories */
  publicRepos?: number;
  /** Number of followers */
  followers?: number;
  /** Number of following */
  following?: number;
  /** Whether the user is a GitHub employee */
  hireable?: boolean;
  /** User's creation date */
  createdAt?: string;
  /** User's last update date */
  updatedAt?: string;
}

/**
 * GitHub email info interface
 */
export interface GitHubEmailInfo {
  /** Email address */
  email: string;
  /** Whether the email is verified */
  verified: boolean;
  /** Whether this is the primary email */
  primary: boolean;
  /** Email visibility */
  visibility: string | null;
}

// ============================================================================
// GitHub OAuth Constants
// ============================================================================

/**
 * GitHub API version
 */
export const GITHUB_API_VERSION = '2022-11-28';

/**
 * GitHub OAuth endpoints
 */
export const GITHUB_AUTH_ENDPOINT = 'https://github.com/login/oauth/authorize';
export const GITHUB_TOKEN_ENDPOINT = 'https://github.com/login/oauth/access_token';
export const GITHUB_USER_INFO_ENDPOINT = 'https://api.github.com/user';
export const GITHUB_USER_EMAILS_ENDPOINT = 'https://api.github.com/user/emails';

/**
 * Default GitHub OAuth scopes
 */
export const GITHUB_SCOPES = ['read:user', 'user:email'] as const;

/**
 * GitHub OAuth response types
 */
export const GITHUB_RESPONSE_TYPE = 'code';

/**
 * GitHub OAuth grant type
 */
export const GITHUB_GRANT_TYPE = 'authorization_code';

// ============================================================================
// GitHub OAuth Configuration Factory
// ============================================================================

/**
 * Creates GitHub OAuth configuration from environment variables
 * @param envConfig - The environment configuration
 * @returns GitHub OAuth configuration object
 * @throws Error if required environment variables are missing when OAuth is enabled
 */
export function createGitHubOAuthConfig(envConfig: EnvConfig = env): GitHubOAuthConfig {
  const { oauth } = envConfig;

  // Check if OAuth is enabled and required variables are present
  const enabled = oauth.GITHUB_ENABLED;

  if (enabled && !oauth.GITHUB_CLIENT_ID) {
    throw new Error('GITHUB_CLIENT_ID is required when GITHUB_ENABLED is true');
  }

  if (enabled && !oauth.GITHUB_CLIENT_SECRET) {
    throw new Error('GITHUB_CLIENT_SECRET is required when GITHUB_ENABLED is true');
  }

  if (enabled && !oauth.GITHUB_CALLBACK_URL) {
    throw new Error('GITHUB_CALLBACK_URL is required when GITHUB_ENABLED is true');
  }

  return {
    clientId: oauth.GITHUB_CLIENT_ID || '',
    clientSecret: oauth.GITHUB_CLIENT_SECRET || '',
    callbackUrl: oauth.GITHUB_CALLBACK_URL || '',
    scopes: [...GITHUB_SCOPES] as string[],
    authEndpoint: GITHUB_AUTH_ENDPOINT,
    tokenEndpoint: GITHUB_TOKEN_ENDPOINT,
    userInfoEndpoint: GITHUB_USER_INFO_ENDPOINT,
    userEmailsEndpoint: GITHUB_USER_EMAILS_ENDPOINT,
    apiVersion: GITHUB_API_VERSION,
    enabled,
    allowSignup: true,
  };
}

// ============================================================================
// GitHub OAuth Configuration Instance
// ============================================================================

/**
 * GitHub OAuth configuration instance
 */
export const githubOAuthConfig: GitHubOAuthConfig = createGitHubOAuthConfig();

// ============================================================================
// GitHub OAuth Helper Functions
// ============================================================================

/**
 * Checks if GitHub OAuth is configured
 * @param config - The GitHub OAuth configuration (optional)
 * @returns True if GitHub OAuth is configured and enabled
 */
export function isGitHubOAuthConfigured(config: GitHubOAuthConfig = githubOAuthConfig): boolean {
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
 * Generates the GitHub OAuth login URL
 * @param options - Login URL options
 * @param config - The GitHub OAuth configuration (optional)
 * @returns The complete login URL
 */
export function getGitHubLoginUrl(
  options: GitHubLoginUrlOptions = {},
  config: GitHubOAuthConfig = githubOAuthConfig
): string {
  if (!isGitHubOAuthConfigured(config)) {
    throw new Error('GitHub OAuth is not properly configured');
  }

  const redirectUri = options.redirectUri || config.callbackUrl;

  // Build base parameters
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: redirectUri,
    response_type: GITHUB_RESPONSE_TYPE,
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

  const allowSignup = options.allowSignup !== undefined ? options.allowSignup : config.allowSignup;
  params.set('allow_signup', allowSignup ? 'true' : 'false');

  return `${config.authEndpoint}?${params.toString()}`;
}

/**
 * Generates the GitHub OAuth token exchange request body
 * @param code - The authorization code from GitHub
 * @param redirectUri - The redirect URI used in the initial request
 * @param config - The GitHub OAuth configuration (optional)
 * @returns The token exchange request body
 */
export function getGitHubTokenExchangeBody(
  code: string,
  redirectUri?: string,
  config: GitHubOAuthConfig = githubOAuthConfig
): Record<string, string> {
  const body: Record<string, string> = {
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    grant_type: GITHUB_GRANT_TYPE,
  };

  if (redirectUri) {
    body.redirect_uri = redirectUri;
  }

  return body;
}

/**
 * Gets the GitHub user info URL with access token
 * @param accessToken - The access token
 * @param config - The GitHub OAuth configuration (optional)
 * @returns The user info URL with token parameter
 */
export function getGitHubUserInfoUrl(
  accessToken: string,
  config: GitHubOAuthConfig = githubOAuthConfig
): string {
  return `${config.userInfoEndpoint}?access_token=${encodeURIComponent(accessToken)}`;
}

/**
 * Gets the GitHub user emails URL with access token
 * @param accessToken - The access token
 * @param config - The GitHub OAuth configuration (optional)
 * @returns The user emails URL with token parameter
 */
export function getGitHubUserEmailsUrl(
  accessToken: string,
  config: GitHubOAuthConfig = githubOAuthConfig
): string {
  return `${config.userEmailsEndpoint}?access_token=${encodeURIComponent(accessToken)}`;
}

/**
 * Extracts user information from GitHub API response
 * @param data - The GitHub API response data
 * @returns Extracted user information
 * @throws Error if the response is invalid
 */
export function extractGitHubUserInfo(data: unknown): GitHubUserInfo {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid GitHub user info data');
  }

  const response = data as Record<string, unknown>;

  // Validate required fields
  if (typeof response.id !== 'number' || !response.id) {
    throw new Error('GitHub user ID is required');
  }

  if (typeof response.login !== 'string' || !response.login) {
    throw new Error('GitHub username is required');
  }

  const userInfo: GitHubUserInfo = {
    id: response.id as number,
    login: response.login as string,
    email: (response.email as string) || null,
    name: (response.name as string) || null,
    avatarUrl: (response.avatar_url as string) || '',
  };

  // Extract additional optional fields
  if (response.bio && typeof response.bio === 'string') {
    userInfo.bio = response.bio;
  }

  if (response.company && typeof response.company === 'string') {
    userInfo.company = response.company;
  }

  if (response.location && typeof response.location === 'string') {
    userInfo.location = response.location;
  }

  if (response.blog && typeof response.blog === 'string') {
    userInfo.blog = response.blog;
  }

  if (response.twitter_username && typeof response.twitter_username === 'string') {
    userInfo.twitterUsername = response.twitter_username;
  }

  if (response.public_repos && typeof response.public_repos === 'number') {
    userInfo.publicRepos = response.public_repos;
  }

  if (response.followers && typeof response.followers === 'number') {
    userInfo.followers = response.followers;
  }

  if (response.following && typeof response.following === 'number') {
    userInfo.following = response.following;
  }

  if (response.hireable && typeof response.hireable === 'boolean') {
    userInfo.hireable = response.hireable;
  }

  if (response.created_at && typeof response.created_at === 'string') {
    userInfo.createdAt = response.created_at;
  }

  if (response.updated_at && typeof response.updated_at === 'string') {
    userInfo.updatedAt = response.updated_at;
  }

  return userInfo;
}

/**
 * Extracts primary email from GitHub emails API response
 * @param data - The GitHub emails API response data
 * @returns The primary email address or null
 * @throws Error if the response is invalid
 */
export function extractGitHubPrimaryEmail(data: unknown): string | null {
  if (!Array.isArray(data)) {
    throw new Error('Invalid GitHub emails data');
  }

  const emails = data as GitHubEmailInfo[];

  // Find primary email that is verified
  const primaryEmail = emails.find((email) => email.primary && email.verified);

  if (primaryEmail) {
    return primaryEmail.email;
  }

  // If no primary email, try to find any verified email
  const verifiedEmail = emails.find((email) => email.verified);

  if (verifiedEmail) {
    return verifiedEmail.email;
  }

  // Return first email as fallback
  if (emails.length > 0) {
    return emails[0].email;
  }

  return null;
}

/**
 * Extracts all emails from GitHub emails API response
 * @param data - The GitHub emails API response data
 * @returns Array of email objects
 * @throws Error if the response is invalid
 */
export function extractGitHubAllEmails(data: unknown): GitHubEmailInfo[] {
  if (!Array.isArray(data)) {
    throw new Error('Invalid GitHub emails data');
  }

  return data.map((item: unknown) => {
    if (typeof item !== 'object' || item === null) {
      throw new Error('Invalid email data');
    }

    const email = item as Record<string, unknown>;

    if (typeof email.email !== 'string') {
      throw new Error('Email address is required');
    }

    return {
      email: email.email as string,
      verified: (email.verified as boolean) || false,
      primary: (email.primary as boolean) || false,
      visibility: (email.visibility as string) || null,
    };
  });
}

/**
 * Validates GitHub OAuth token response
 * @param data - The token response data
 * @returns True if the token response is valid
 */
export function isValidGitHubTokenResponse(data: unknown): data is {
  access_token: string;
  token_type: string;
  scope: string;
  error?: string;
  error_description?: string;
} {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const response = data as Record<string, unknown>;

  // Check for error
  if (response.error && typeof response.error === 'string') {
    return false;
  }

  if (typeof response.access_token !== 'string' || !response.access_token) {
    return false;
  }

  if (typeof response.token_type !== 'string' || !response.token_type) {
    return false;
  }

  return true;
}

// ============================================================================
// GitHub OAuth Error Handling
// ============================================================================

/**
 * GitHub OAuth error codes
 */
export const GITHUB_OAUTH_ERRORS = {
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
  BAD_VERIFICATION_CODE: 'bad_verification_code',
  INCORRECT_CLIENT_CREDENTIALS: 'incorrect_client_credentials',
} as const;

/**
 * GitHub OAuth error types
 */
export type GitHubOAuthErrorType = (typeof GITHUB_OAUTH_ERRORS)[keyof typeof GITHUB_OAUTH_ERRORS];

/**
 * GitHub OAuth error messages
 */
export const GITHUB_OAUTH_ERROR_MESSAGES: Record<GitHubOAuthErrorType, string> = {
  [GITHUB_OAUTH_ERRORS.ACCESS_DENIED]: 'User denied access to their GitHub account',
  [GITHUB_OAUTH_ERRORS.INVALID_REQUEST]: 'Invalid OAuth request',
  [GITHUB_OAUTH_ERRORS.UNAUTHORIZED_CLIENT]: 'Unauthorized OAuth client',
  [GITHUB_OAUTH_ERRORS.UNSUPPORTED_RESPONSE_TYPE]: 'Unsupported OAuth response type',
  [GITHUB_OAUTH_ERRORS.INVALID_SCOPE]: 'Invalid OAuth scope requested',
  [GITHUB_OAUTH_ERRORS.SERVER_ERROR]: 'GitHub OAuth server error',
  [GITHUB_OAUTH_ERRORS.TEMPORARILY_UNAVAILABLE]: 'GitHub OAuth temporarily unavailable',
  [GITHUB_OAUTH_ERRORS.INVALID_GRANT]: 'Invalid OAuth grant',
  [GITHUB_OAUTH_ERRORS.INVALID_TOKEN]: 'Invalid or expired OAuth token',
  [GITHUB_OAUTH_ERRORS.INSUFFICIENT_SCOPE]: 'Insufficient OAuth scope',
  [GITHUB_OAUTH_ERRORS.BAD_VERIFICATION_CODE]: 'Bad verification code',
  [GITHUB_OAUTH_ERRORS.INCORRECT_CLIENT_CREDENTIALS]: 'Incorrect client credentials',
};

/**
 * Gets a user-friendly error message for a GitHub OAuth error
 * @param error - The error string from GitHub
 * @returns A user-friendly error message
 */
export function getGitHubOAuthErrorMessage(error: string): string {
  return (
    GITHUB_OAUTH_ERROR_MESSAGES[error as GitHubOAuthErrorType] ||
    'An unknown GitHub OAuth error occurred'
  );
}

/**
 * Checks if a GitHub OAuth error is a user denial
 * @param error - The error string from GitHub
 * @returns True if the error is a user denial
 */
export function isGitHubOAuthAccessDenied(error: string): boolean {
  return error === GITHUB_OAUTH_ERRORS.ACCESS_DENIED;
}
