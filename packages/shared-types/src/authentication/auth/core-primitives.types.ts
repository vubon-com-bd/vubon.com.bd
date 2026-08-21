/**
 * Core primitives types for authentication module
 * These types define the fundamental data structures used across the authentication system
 * Based on shared constants from @vubon/shared-constants
 */

import { authentication } from '@vubon/shared-constants';

/**
 * Authentication status type
 * Represents the current state of a user's authentication
 * Values: 'ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED', 'DELETED'
 */
export type AuthStatus =
  (typeof authentication.AUTH_STATUS)[keyof typeof authentication.AUTH_STATUS];

/**
 * Authentication method type
 * Defines the supported authentication methods
 * Values: 'EMAIL_PASSWORD', 'PHONE_PASSWORD', 'OAUTH', 'MAGIC_LINK', 'OTP'
 */
export type AuthMethod =
  (typeof authentication.AUTH_METHOD)[keyof typeof authentication.AUTH_METHOD];

/**
 * Authentication provider type
 * Represents the identity provider for OAuth authentication
 * Values: 'GOOGLE', 'FACEBOOK', 'APPLE', 'GITHUB'
 */
export type AuthProvider =
  (typeof authentication.AUTH_PROVIDER)[keyof typeof authentication.AUTH_PROVIDER];

/**
 * Token type
 * Defines the different types of tokens used in authentication
 * Values: 'ACCESS_TOKEN', 'REFRESH_TOKEN', 'RESET_TOKEN', 'VERIFICATION_TOKEN'
 */
export type TokenType = (typeof authentication.TOKEN_TYPE)[keyof typeof authentication.TOKEN_TYPE];

/**
 * Authentication session status type
 * Represents the status of a user session
 */
export type SessionStatus = 'ACTIVE' | 'EXPIRED' | 'INVALID' | 'REVOKED';

/**
 * Authentication event type
 * Defines authentication-related events for logging and auditing
 */
export type AuthEvent =
  | 'LOGIN'
  | 'LOGOUT'
  | 'REGISTER'
  | 'PASSWORD_RESET'
  | 'EMAIL_VERIFICATION'
  | 'TWO_FACTOR_AUTH'
  | 'SESSION_REFRESH';

/**
 * Authentication level type
 * Represents the level of authentication assurance
 */
export type AuthLevel = 'NONE' | 'BASIC' | 'TWO_FACTOR' | 'PASSWORDLESS';

/**
 * Core authentication primitive
 * Base interface for authentication data
 */
export interface AuthPrimitive {
  /** Unique identifier for the authentication session */
  sessionId: string;

  /** User identifier */
  userId: string;

  /** Current authentication status */
  status: AuthStatus;

  /** Authentication method used */
  method: AuthMethod;

  /** Timestamp when the authentication was initiated */
  initiatedAt: Date;

  /** Timestamp when the authentication expires */
  expiresAt: Date;

  /** IP address from which authentication was requested */
  ipAddress?: string;

  /** User agent string of the client */
  userAgent?: string;
}

/**
 * Token primitive
 * Base interface for authentication tokens
 */
export interface TokenPrimitive {
  /** Token value */
  token: string;

  /** Type of the token */
  type: TokenType;

  /** User identifier associated with the token */
  userId: string;

  /** Timestamp when the token was created */
  createdAt: Date;

  /** Timestamp when the token expires */
  expiresAt: Date;

  /** Whether the token has been revoked */
  isRevoked: boolean;

  /** Optional metadata associated with the token */
  metadata?: Record<string, unknown>;
}

/**
 * Credential primitive
 * Base interface for user credentials
 */
export interface CredentialPrimitive {
  /** User identifier (email, phone, or username) */
  identifier: string;

  /** Hashed password or other credential data */
  credentialData: string;

  /** Authentication method associated with these credentials */
  method: AuthMethod;

  /** Timestamp when the credential was created */
  createdAt: Date;

  /** Timestamp when the credential was last updated */
  updatedAt: Date;

  /** Whether the credential is active */
  isActive: boolean;

  /** Additional authentication factors */
  factors?: AuthFactor[];
}

/**
 * Authentication factor primitive
 * Represents a single authentication factor
 */
export interface AuthFactor {
  /** Type of the factor */
  type: 'TOTP' | 'SMS' | 'EMAIL' | 'BACKUP_CODE' | 'BIOMETRIC';

  /** Whether the factor is verified */
  isVerified: boolean;

  /** Timestamp when the factor was added */
  addedAt: Date;

  /** Additional data specific to the factor type */
  data?: Record<string, unknown>;
}

/**
 * Session primitive
 * Represents an authenticated user session
 */
export interface SessionPrimitive {
  /** Session identifier */
  id: string;

  /** User identifier */
  userId: string;

  /** Current session status */
  status: SessionStatus;

  /** Authentication level of the session */
  authLevel: AuthLevel;

  /** Session creation timestamp */
  createdAt: Date;

  /** Last activity timestamp */
  lastActivityAt: Date;

  /** Session expiration timestamp */
  expiresAt: Date;

  /** Device information */
  deviceInfo?: DeviceInfo;
}

/**
 * Device information primitive
 * Represents device data associated with authentication
 */
export interface DeviceInfo {
  /** Device identifier */
  deviceId?: string;

  /** Device type */
  type: 'MOBILE' | 'DESKTOP' | 'TABLET' | 'OTHER';

  /** Device operating system */
  os?: string;

  /** Device browser */
  browser?: string;

  /** Device model */
  model?: string;
}

/**
 * Authentication result primitive
 * Represents the result of an authentication attempt
 */
export interface AuthResultPrimitive {
  /** Whether authentication was successful */
  success: boolean;

  /** Authentication status */
  status: AuthStatus;

  /** Authentication method used */
  method: AuthMethod;

  /** User identifier if authentication was successful */
  userId?: string;

  /** Session data if authentication was successful */
  session?: SessionPrimitive;

  /** Error information if authentication failed */
  error?: AuthError;

  /** Additional data from the authentication attempt */
  data?: Record<string, unknown>;
}

/**
 * Authentication error primitive
 * Represents authentication error details
 */
export interface AuthError {
  /** Error code */
  code: string;

  /** Human-readable error message */
  message: string;

  /** Additional error details */
  details?: Record<string, unknown>;

  /** Timestamp when the error occurred */
  timestamp: Date;
}

/**
 * Validation result primitive
 * Represents the result of validating authentication data
 */
export interface ValidationResult {
  /** Whether validation passed */
  isValid: boolean;

  /** Validation errors if any */
  errors?: string[];

  /** Validated data */
  data?: unknown;
}
