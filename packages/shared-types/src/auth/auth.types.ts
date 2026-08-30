/**
 * Authentication Types
 * Core authentication data types
 */

import type { AuthStatus, AuthType, AuthProvider } from '@vubon/shared-constants';

/**
 * Authenticated User
 * Complete user data after authentication
 */
export interface AuthUser {
  /** User unique identifier */
  id: string;
  /** User email address */
  email: string;
  /** User phone number (optional) */
  phone?: string;
  /** User full name */
  fullName: string;
  /** User authentication status */
  status: AuthStatus;
  /** User role (string-based, can be extended) */
  role: string;
  /** User permissions (string array, can be extended) */
  permissions: string[];
  /** Authentication type used */
  authType: AuthType;
  /** Authentication provider (for social/oauth) */
  provider?: AuthProvider;
  /** Avatar URL (optional) */
  avatar?: string;
  /** Last login timestamp */
  lastLoginAt?: Date;
  /** Account creation timestamp */
  createdAt: Date;
  /** Account last update timestamp */
  updatedAt: Date;
}

/**
 * Authenticated User with Session
 * User data with active session information
 */
export interface AuthUserWithSession extends AuthUser {
  /** Active session ID */
  sessionId: string;
  /** Session expiry timestamp */
  sessionExpiresAt: Date;
  /** Device information */
  device: AuthDeviceInfo;
}

/**
 * Authentication Device Information
 */
export interface AuthDeviceInfo {
  /** Device unique identifier */
  deviceId: string;
  /** Device type (mobile, desktop, tablet, etc.) */
  deviceType: string;
  /** Device platform (iOS, Android, Windows, etc.) */
  platform: string;
  /** Device browser */
  browser?: string;
  /** Device model */
  model?: string;
  /** IP address */
  ipAddress: string;
  /** User agent string */
  userAgent: string;
  /** Is device trusted */
  isTrusted: boolean;
  /** When device was first seen */
  firstSeenAt: Date;
  /** When device was last used */
  lastUsedAt: Date;
}

/**
 * Auth Context
 * Context available during authentication flow
 */
export interface AuthContext {
  /** Request ID for tracking */
  requestId: string;
  /** IP address of the request */
  ipAddress: string;
  /** User agent of the request */
  userAgent: string;
  /** Session ID if available */
  sessionId?: string;
  /** Device ID if available */
  deviceId?: string;
  /** Request timestamp */
  timestamp: Date;
}

/**
 * Authentication Credentials
 * User credentials for login
 */
export interface AuthCredentials {
  /** Email or phone number */
  identifier: string;
  /** Password */
  password: string;
  /** Remember me flag */
  rememberMe?: boolean;
  /** Device information */
  device?: Omit<AuthDeviceInfo, 'deviceId' | 'firstSeenAt' | 'lastUsedAt'>;
}

/**
 * Authentication Registration Data
 * User registration data
 */
export interface AuthRegistrationData {
  /** Email address */
  email: string;
  /** Phone number (optional) */
  phone?: string;
  /** Full name */
  fullName: string;
  /** Password */
  password: string;
  /** Confirm password */
  confirmPassword: string;
  /** Accept terms and conditions */
  acceptTerms: boolean;
  /** Accept privacy policy */
  acceptPrivacy: boolean;
}

/**
 * Authentication Status Check Result
 * Result of authentication status check
 */
export interface AuthStatusCheckResult {
  /** Is user authenticated */
  isAuthenticated: boolean;
  /** User data if authenticated */
  user?: AuthUser;
  /** Session data if authenticated */
  session?: {
    id: string;
    expiresAt: Date;
  };
  /** Status message */
  message: string;
}

/**
 * Authentication Session Data
 * Session-related authentication data
 */
export interface AuthSessionData {
  /** Session ID */
  sessionId: string;
  /** User ID */
  userId: string;
  /** Session expiry timestamp */
  expiresAt: Date;
  /** Session creation timestamp */
  createdAt: Date;
  /** Last activity timestamp */
  lastActivityAt: Date;
  /** Is session active */
  isActive: boolean;
}
