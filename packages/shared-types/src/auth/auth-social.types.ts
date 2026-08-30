/**
 * Authentication Social Types
 * Social login, social media integration, and social authentication data types
 */

import type {
  SocialLoginStatus,
  SocialProviderConfig,
  SocialProviderType,
} from '@vubon/shared-constants';

import type { ID, Timestamp, Email, Url } from '../common/core-primitives.types';
import type { AuthUser, AuthDeviceInfo } from './auth.types';

/**
 * Social Login Data
 * Complete social login information
 */
export interface SocialLoginData {
  /** Unique identifier */
  id: ID;
  /** User ID (if linked to existing user) */
  userId?: ID;
  /** Social provider */
  provider: string;
  /** Provider user ID */
  providerUserId: string;
  /** Provider email */
  email: Email;
  /** Provider display name */
  displayName?: string;
  /** Provider profile picture URL */
  profilePicture?: Url;
  /** Provider profile URL */
  profileUrl?: Url;
  /** Social login status */
  status: SocialLoginStatus;
  /** When social login was initiated */
  initiatedAt: Timestamp;
  /** When social login was completed */
  completedAt?: Timestamp;
  /** Provider response data */
  providerData?: Record<string, unknown>;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Social Login Request
 * Request to initiate social login
 */
export interface SocialLoginRequest {
  /** Social provider */
  provider: string;
  /** Authorization code from provider */
  code: string;
  /** Redirect URI (optional) */
  redirectUri?: string;
  /** State parameter for CSRF */
  state?: string;
  /** Device information (optional) */
  device?: Partial<AuthDeviceInfo>;
  /** Additional provider-specific data */
  providerData?: Record<string, unknown>;
}

/**
 * Social Login Result
 * Result of social login
 */
export interface SocialLoginResult {
  /** Is login successful */
  success: boolean;
  /** Login status */
  status: SocialLoginStatus;
  /** User data (if successful) */
  user?: AuthUser;
  /** Access token (if successful) */
  accessToken?: string;
  /** Refresh token (if successful) */
  refreshToken?: string;
  /** Token expiry in seconds */
  expiresIn?: number;
  /** Is new account created */
  isNewAccount?: boolean;
  /** Account linking data (if requires linking) */
  linkingData?: {
    email: Email;
    provider: string;
    providerUserId: string;
    providerData: Record<string, unknown>;
  };
  /** Required info (if requires info) */
  requiredInfo?: {
    fields: string[];
    message: string;
  };
  /** Error message (if failed) */
  error?: string;
}

/**
 * Social Account Link Request
 * Request to link social account to existing user
 */
export interface SocialAccountLinkRequest {
  /** User ID */
  userId: ID;
  /** Social provider */
  provider: string;
  /** Authorization code from provider */
  code: string;
  /** Redirect URI (optional) */
  redirectUri?: string;
  /** State parameter for CSRF */
  state?: string;
}

/**
 * Social Account Unlink Request
 * Request to unlink social account from user
 */
export interface SocialAccountUnlinkRequest {
  /** User ID */
  userId: ID;
  /** Social provider to unlink */
  provider: string;
  /** Provider user ID (optional, for verification) */
  providerUserId?: string;
}

/**
 * Social Account Link Result
 * Result of social account linking
 */
export interface SocialAccountLinkResult {
  /** Is linking successful */
  success: boolean;
  /** User data */
  user?: AuthUser;
  /** Social provider that was linked */
  provider?: string;
  /** Message */
  message: string;
}

/**
 * Social Account Unlink Result
 * Result of social account unlinking
 */
export interface SocialAccountUnlinkResult {
  /** Is unlinking successful */
  success: boolean;
  /** Social provider that was unlinked */
  provider?: string;
  /** Message */
  message: string;
}

/**
 * Social Account List
 * List of social accounts linked to a user
 */
export interface SocialAccountList {
  /** User ID */
  userId: ID;
  /** List of linked social accounts */
  accounts: SocialAccountData[];
  /** Total count */
  total: number;
}

/**
 * Social Account Data
 * Social account information
 */
export interface SocialAccountData {
  /** Provider */
  provider: string;
  /** Provider user ID */
  providerUserId: string;
  /** Provider email */
  email: Email;
  /** Provider display name */
  displayName?: string;
  /** Profile picture URL */
  profilePicture?: Url;
  /** When account was linked */
  linkedAt: Timestamp;
  /** When account was last used */
  lastUsedAt?: Timestamp;
  /** Provider-specific data */
  providerData?: Record<string, unknown>;
}

/**
 * Social Provider Status
 * Status of social provider configuration
 */
export interface SocialProviderStatus {
  /** Provider name */
  provider: string;
  /** Is provider enabled */
  isEnabled: boolean;
  /** Is provider configured */
  isConfigured: boolean;
  /** Provider type */
  type: SocialProviderType;
  /** Provider label */
  label: string;
  /** Provider icon */
  icon: string;
  /** Provider color */
  color: string;
  /** Error message (if not configured) */
  error?: string;
}

/**
 * Social Login Statistics
 * Social login usage statistics
 */
export interface SocialLoginStatistics {
  /** Total social logins */
  totalLogins: number;
  /** Logins by provider */
  byProvider: Record<string, number>;
  /** Successful logins */
  successfulLogins: number;
  /** Failed logins */
  failedLogins: number;
  /** New accounts created */
  newAccounts: number;
  /** Account linking count */
  accountLinks: number;
  /** Success rate by provider */
  successRateByProvider: Record<string, number>;
  /** Average login time in seconds */
  averageLoginTime: number;
  /** Timestamp of statistics */
  timestamp: Timestamp;
}

/**
 * Social Login Config
 * Social login configuration for a provider
 */
export interface SocialLoginConfig {
  /** Provider */
  provider: string;
  /** Is enabled */
  enabled: boolean;
  /** Client ID */
  clientId: string;
  /** Client Secret (hidden in response) */
  clientSecret?: string;
  /** Redirect URI */
  redirectUri: string;
  /** Scopes */
  scopes: string[];
  /** Authorization URL */
  authorizationUrl: string;
  /** Token URL */
  tokenUrl: string;
  /** User Info URL */
  userInfoUrl: string;
  /** Additional configuration */
  config?: Record<string, unknown>;
}

/**
 * Social Provider Configuration Helper
 * Complete social provider configuration
 */
export interface SocialProviderConfiguration {
  /** Provider-specific configuration */
  config: SocialProviderConfig;
  /** Provider metadata */
  metadata: {
    label: string;
    icon: string;
    color: string;
    type: SocialProviderType;
  };
}
