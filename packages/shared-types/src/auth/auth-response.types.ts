/**
 * Authentication Response Types
 * Response payload types for authentication endpoints
 */

import type { AuthStatus, AuthType, AuthProvider, AuthMethod } from '@vubon/shared-constants';

import type { AuthUser, AuthDeviceInfo, AuthSessionData } from './auth.types';
import type { ApiResponse, ApiError } from '../common/api.types';

/**
 * Login Response
 * Response after successful login
 */
export interface LoginResponse {
  /** User data */
  user: AuthUser;
  /** Access token */
  accessToken: string;
  /** Refresh token */
  refreshToken: string;
  /** Token type (Bearer) */
  tokenType: string;
  /** Access token expiry in seconds */
  expiresIn: number;
  /** Session data */
  session: AuthSessionData;
  /** Device information */
  device?: AuthDeviceInfo;
}

/**
 * Register Response
 * Response after successful registration
 */
export interface RegisterResponse {
  /** User data */
  user: AuthUser;
  /** Access token */
  accessToken: string;
  /** Refresh token */
  refreshToken: string;
  /** Token type (Bearer) */
  tokenType: string;
  /** Access token expiry in seconds */
  expiresIn: number;
  /** Session data */
  session: AuthSessionData;
  /** Verification required flag */
  requiresVerification: boolean;
  /** Verification message */
  verificationMessage?: string;
}

/**
 * Refresh Token Response
 * Response after token refresh
 */
export interface RefreshTokenResponse {
  /** New access token */
  accessToken: string;
  /** Token type (Bearer) */
  tokenType: string;
  /** Access token expiry in seconds */
  expiresIn: number;
  /** New refresh token (optional, if rotation enabled) */
  refreshToken?: string;
}

/**
 * Logout Response
 * Response after logout
 */
export interface LogoutResponse {
  /** Success message */
  message: string;
  /** Session ID that was logged out */
  sessionId?: string;
  /** Logged out from all devices */
  allDevices?: boolean;
}

/**
 * Forgot Password Response
 * Response after requesting password reset
 */
export interface ForgotPasswordResponse {
  /** Success message */
  message: string;
  /** Reset token (if sent via response) */
  resetToken?: string;
  /** Reset link (if sent via response) */
  resetLink?: string;
  /** Email sent flag */
  emailSent: boolean;
  /** Time to wait before next request in seconds */
  retryAfter?: number;
}

/**
 * Reset Password Response
 * Response after resetting password
 */
export interface ResetPasswordResponse {
  /** Success message */
  message: string;
  /** Redirect URL (optional) */
  redirectUrl?: string;
}

/**
 * Change Password Response
 * Response after changing password
 */
export interface ChangePasswordResponse {
  /** Success message */
  message: string;
  /** Force logout from all devices */
  forcedLogout?: boolean;
}

/**
 * Verify Email Response
 * Response after email verification
 */
export interface VerifyEmailResponse {
  /** Success message */
  message: string;
  /** Email verified flag */
  verified: boolean;
}

/**
 * Resend Verification Response
 * Response after resending verification
 */
export interface ResendVerificationResponse {
  /** Success message */
  message: string;
  /** Time to wait before next request in seconds */
  retryAfter?: number;
}

/**
 * Social Login Response
 * Response after social login
 */
export interface SocialLoginResponse {
  /** Authentication result */
  result: 'success' | 'requires_linking' | 'requires_info';
  /** User data (if success) */
  user?: AuthUser;
  /** Access token (if success) */
  accessToken?: string;
  /** Refresh token (if success) */
  refreshToken?: string;
  /** Token expiry in seconds */
  expiresIn?: number;
  /** Session data (if success) */
  session?: AuthSessionData;
  /** Account linking data (if requires_linking) */
  linkingData?: {
    email: string;
    provider: string;
    providerUserId: string;
    providerData: Record<string, unknown>;
  };
  /** Additional info required (if requires_info) */
  requiredInfo?: {
    fields: string[];
    message: string;
  };
}

/**
 * Two-Factor Authentication Responses
 */
export interface TwoFASetupResponse {
  /** Setup status */
  status: 'pending' | 'completed';
  /** QR code URL (for TOTP) */
  qrCode?: string;
  /** Secret key (for TOTP) */
  secret?: string;
  /** Backup codes */
  backupCodes?: string[];
  /** Method used */
  method: string;
  /** Message */
  message: string;
}

export interface TwoFAVerifyResponse {
  /** Verification status */
  verified: boolean;
  /** Access token (if verification completed) */
  accessToken?: string;
  /** Refresh token (if verification completed) */
  refreshToken?: string;
  /** Token expiry in seconds */
  expiresIn?: number;
  /** Session data (if verification completed) */
  session?: AuthSessionData;
  /** Trust device flag */
  deviceTrusted?: boolean;
}

export interface TwoFADisableResponse {
  /** Success message */
  message: string;
  /** Disabled flag */
  disabled: boolean;
}

/**
 * Device Registration Response
 * Response after device registration
 */
export interface DeviceRegistrationResponse {
  /** Device ID */
  deviceId: string;
  /** Device name */
  deviceName: string;
  /** Device type */
  deviceType: string;
  /** Device status */
  status: string;
  /** Trust level */
  trustLevel: number;
  /** Registration timestamp */
  registeredAt: Date;
}

/**
 * SSO Login Response
 * Response after SSO login
 */
export interface SSOLoginResponse {
  /** User data */
  user: AuthUser;
  /** Access token */
  accessToken: string;
  /** Refresh token */
  refreshToken: string;
  /** Token expiry in seconds */
  expiresIn: number;
  /** Session data */
  session: AuthSessionData;
  /** SSO session ID */
  ssoSessionId: string;
}

/**
 * Magic Link Response
 * Response after magic link request
 */
export interface MagicLinkResponse {
  /** Success message */
  message: string;
  /** Email sent flag */
  emailSent: boolean;
  /** Time to wait before next request in seconds */
  retryAfter?: number;
}

/**
 * Authentication Status Response
 * Response for checking authentication status
 */
export interface AuthStatusResponse {
  /** Is authenticated */
  isAuthenticated: boolean;
  /** User data (if authenticated) */
  user?: AuthUser;
  /** Session data (if authenticated) */
  session?: AuthSessionData;
  /** Status message */
  message: string;
  /** Status code */
  status: AuthStatus;
}

/**
 * Login Attempt List Response
 * Response for listing login attempts
 */
export interface LoginAttemptListResponse {
  /** Login attempts */
  attempts: Array<{
    id: string;
    userId: string;
    ipAddress: string;
    userAgent: string;
    status: string;
    createdAt: Date;
  }>;
  /** Pagination metadata */
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/**
 * Generic Auth Response
 * Base response for all auth operations (extends ApiResponse)
 */
export interface AuthResponse<T = unknown> extends ApiResponse<T> {
  /** Authentication method used */
  method?: AuthMethod;
  /** Authentication type used */
  type?: AuthType;
  /** Provider used (for social/oauth) */
  provider?: AuthProvider;
}

/**
 * Auth Error Response
 * Error response for auth operations (extends ApiError)
 */
export interface AuthErrorResponse extends ApiResponse<null> {
  /** Authentication error code */
  errorCode: string;
  /** Authentication errors */
  errors: ApiError[];
  /** Authentication method used (if available) */
  method?: AuthMethod;
  /** Authentication type used (if available) */
  type?: AuthType;
}
