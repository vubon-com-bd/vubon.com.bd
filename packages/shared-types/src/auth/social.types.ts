/**
 * Social login-related type definitions for the monorepo
 * All social authentication types are centralized here for consistent usage across packages
 */

import type { User } from './user.types';

/**
 * Social provider types
 * Represents the supported social authentication providers
 */
export type SocialProvider =
  'google' | 'facebook' | 'github' | 'apple' | 'linkedin' | 'twitter' | 'microsoft' | 'discord';

/**
 * Social login request interface
 * Used when authenticating with a social provider
 */
export interface SocialLoginRequest {
  /** Social provider to authenticate with */
  provider: SocialProvider;
  /** Authorization code from the provider */
  code: string;
  /** Redirect URI for the OAuth flow */
  redirectUri?: string;
  /** State parameter for CSRF protection */
  state?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Social login response interface
 * Response after successful social authentication
 */
export interface SocialLoginResponse {
  /** User information */
  user: User;
  /** Access token for API authentication */
  accessToken: string;
  /** Refresh token for obtaining new tokens */
  refreshToken: string;
  /** Whether the user is new (just registered) */
  isNewUser: boolean;
  /** Token expiry in seconds */
  expiresIn: number;
  /** Social provider used for authentication */
  provider: SocialProvider;
}

/**
 * Social account interface
 * Represents a social account linked to a user
 */
export interface SocialAccount {
  /** Unique identifier for the social account */
  id: string;
  /** User ID associated with the social account */
  userId: string;
  /** Social provider */
  provider: SocialProvider;
  /** User ID from the social provider */
  providerUserId: string;
  /** Email from the social provider */
  email: string;
  /** Display name from the social provider */
  name: string;
  /** Avatar URL from the social provider */
  avatar?: string;
  /** Access token from the social provider */
  accessToken: string;
  /** Refresh token from the social provider */
  refreshToken?: string;
  /** Token expiry timestamp */
  expiresAt?: Date;
  /** Raw profile data from the provider */
  rawProfile?: Record<string, unknown>;
  /** Timestamp when the account was linked */
  linkedAt: Date;
  /** Timestamp when the account was last used */
  lastUsedAt?: Date;
  /** Whether the account is active */
  isActive: boolean;
  /** Whether the email is verified by the provider */
  emailVerified: boolean;
}

/**
 * Link social account request interface
 * Used when linking a social account to an existing user
 */
export interface LinkSocialAccountRequest {
  /** Social provider to link */
  provider: SocialProvider;
  /** Authorization code from the provider */
  code: string;
  /** Redirect URI for the OAuth flow */
  redirectUri?: string;
  /** State parameter for CSRF protection */
  state?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Link social account response interface
 * Response after linking a social account
 */
export interface LinkSocialAccountResponse {
  /** Whether linking was successful */
  success: boolean;
  /** Linked social account information */
  account?: SocialAccount;
  /** Response message */
  message: string;
  /** Error code if linking failed */
  errorCode?: string;
}

/**
 * Unlink social account request interface
 * Used when unlinking a social account from a user
 */
export interface UnlinkSocialAccountRequest {
  /** Social provider to unlink */
  provider: SocialProvider;
  /** Provider user ID (optional, for verification) */
  providerUserId?: string;
}

/**
 * Unlink social account response interface
 * Response after unlinking a social account
 */
export interface UnlinkSocialAccountResponse {
  /** Whether unlinking was successful */
  success: boolean;
  /** Response message */
  message: string;
  /** Error code if unlinking failed */
  errorCode?: string;
}

/**
 * Social account list response interface
 * List of social accounts for a user
 */
export interface SocialAccountListResponse {
  /** Array of social accounts */
  accounts: SocialAccount[];
  /** Total number of accounts */
  total: number;
}

/**
 * Social provider configuration interface
 * Configuration for a social provider
 */
export interface SocialProviderConfig {
  /** Provider identifier */
  provider: SocialProvider;
  /** Display name of the provider */
  name: string;
  /** Client ID for OAuth */
  clientId: string;
  /** Client Secret for OAuth */
  clientSecret: string;
  /** Authorization URL for OAuth */
  authUrl: string;
  /** Token URL for OAuth */
  tokenUrl: string;
  /** User info URL for OAuth */
  userInfoUrl: string;
  /** Callback URL for OAuth */
  callbackUrl: string;
  /** Required scopes */
  scopes: string[];
  /** Whether to use PKCE */
  usePKCE: boolean;
  /** Whether the provider is enabled */
  enabled: boolean;
  /** Icon for the provider button */
  icon: string;
  /** Color for the provider button */
  color: string;
}

/**
 * Social user profile interface
 * User profile data from a social provider
 */
export interface SocialUserProfile {
  /** User ID from the provider */
  id: string;
  /** Email from the provider */
  email: string;
  /** Display name */
  name: string;
  /** First name */
  firstName?: string;
  /** Last name */
  lastName?: string;
  /** Avatar URL */
  avatar?: string;
  /** Provider identifier */
  provider: SocialProvider;
  /** Whether email is verified */
  emailVerified: boolean;
  /** Locale/region */
  locale?: string;
  /** Gender */
  gender?: string;
  /** Birthday */
  birthday?: string;
  /** Phone number */
  phoneNumber?: string;
  /** Profile URL */
  profileUrl?: string;
  /** Website URL */
  website?: string;
  /** Country */
  country?: string;
  /** Raw profile data */
  raw: Record<string, unknown>;
}

/**
 * Social auth token response interface
 * Token response from a social provider
 */
export interface SocialAuthTokenResponse {
  /** Access token from the provider */
  accessToken: string;
  /** Token type (usually 'Bearer') */
  tokenType: string;
  /** Expiry time in seconds */
  expiresIn: number;
  /** Refresh token if provided */
  refreshToken?: string;
  /** ID token (for OpenID Connect) */
  idToken?: string;
  /** Scopes granted */
  scope?: string;
}

/**
 * Social auth state interface
 * State for OAuth flow
 */
export interface SocialAuthState {
  /** Random state string for CSRF protection */
  state: string;
  /** Redirect URI after authentication */
  redirectUri: string;
  /** Social provider */
  provider: SocialProvider;
  /** Timestamp when state was created */
  createdAt: Date;
  /** Whether this is a linking flow */
  isLinking: boolean;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Social login request interface (for provider-specific params)
 */
export interface SocialLoginParams {
  /** Provider to use */
  provider: SocialProvider;
  /** Redirect URI after authentication */
  redirectUri?: string;
  /** Additional OAuth parameters */
  params?: Record<string, string>;
}

/**
 * Social login URL response interface
 * Response with generated login URL
 */
export interface SocialLoginUrlResponse {
  /** Generated login URL */
  url: string;
  /** State parameter for the OAuth flow */
  state: string;
  /** Provider being used */
  provider: SocialProvider;
}

/**
 * Social account filter interface
 * Used for filtering social accounts in lists
 */
export interface SocialAccountFilter {
  /** Filter by user ID */
  userId?: string;
  /** Filter by provider */
  provider?: SocialProvider;
  /** Filter by email */
  email?: string;
  /** Filter by active status */
  isActive?: boolean;
}

/**
 * Social event interface
 * Used for social authentication events
 */
export interface SocialEvent {
  /** Type of social event */
  type: 'LOGIN' | 'REGISTER' | 'LINK' | 'UNLINK' | 'REFRESH' | 'FAILED';
  /** User ID */
  userId?: string;
  /** Social provider */
  provider: SocialProvider;
  /** Provider user ID if available */
  providerUserId?: string;
  /** Email address */
  email?: string;
  /** Additional data */
  data: {
    success: boolean;
    error?: string;
    isNewUser?: boolean;
    metadata?: Record<string, unknown>;
  };
  /** Timestamp of the event */
  timestamp: Date;
}

/**
 * Social error types
 * Specific error types for social authentication
 */
export type SocialErrorType =
  | 'PROVIDER_NOT_SUPPORTED'
  | 'PROVIDER_DISABLED'
  | 'AUTH_FAILED'
  | 'TOKEN_EXCHANGE_FAILED'
  | 'USER_INFO_FETCH_FAILED'
  | 'EMAIL_NOT_PROVIDED'
  | 'EMAIL_ALREADY_EXISTS'
  | 'ACCOUNT_LINKING_FAILED'
  | 'ACCOUNT_UNLINKING_FAILED'
  | 'INVALID_STATE'
  | 'EXPIRED_STATE'
  | 'INVALID_CODE'
  | 'ACCESS_DENIED'
  | 'SCOPE_MISMATCH'
  | 'RATE_LIMITED'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

/**
 * Social error response interface
 * Error response for social authentication
 */
export interface SocialErrorResponse {
  /** Error type */
  type: SocialErrorType;
  /** Error message */
  message: string;
  /** Error code for client-side handling */
  code: string;
  /** Additional details */
  details?: Record<string, unknown>;
}

/**
 * Social configuration interface
 * Overall social authentication configuration
 */
export interface SocialConfig {
  /** Whether social login is enabled */
  enabled: boolean;
  /** Whether account linking is allowed */
  allowAccountLinking: boolean;
  /** Whether registration via social providers is allowed */
  allowRegistration: boolean;
  /** Default redirect URI after social login */
  defaultRedirect: string;
  /** Session TTL for social login sessions in seconds */
  sessionTtlSeconds: number;
  /** Whether to verify email from social provider */
  verifyEmail: boolean;
  /** Whether to use state parameter for CSRF protection */
  useStateParameter: boolean;
  /** State parameter expiry in seconds */
  stateExpirySeconds: number;
  /** Provider configurations */
  providers: Record<SocialProvider, SocialProviderConfig>;
}
