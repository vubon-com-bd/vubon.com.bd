/**
 * Authentication Request Types
 * Request payload types for authentication endpoints
 */

import type { AuthMethod, AuthType } from '@vubon/shared-constants';

/**
 * Login Request Payload
 * Request body for login endpoint
 */
export interface LoginRequest {
  /** Email or phone number */
  identifier: string;
  /** User password */
  password: string;
  /** Remember me flag (extends session) */
  rememberMe?: boolean;
  /** Device information */
  device?: {
    deviceId?: string;
    deviceType?: string;
    platform?: string;
    browser?: string;
    model?: string;
  };
}

/**
 * Register Request Payload
 * Request body for registration endpoint
 */
export interface RegisterRequest {
  /** Full name */
  fullName: string;
  /** Email address */
  email: string;
  /** Phone number (optional) */
  phone?: string;
  /** Password */
  password: string;
  /** Confirm password */
  confirmPassword: string;
  /** Accept terms and conditions */
  acceptTerms: boolean;
  /** Accept privacy policy */
  acceptPrivacy: boolean;
  /** Device information */
  device?: {
    deviceId?: string;
    deviceType?: string;
    platform?: string;
    browser?: string;
    model?: string;
  };
}

/**
 * Logout Request Payload
 * Request body for logout endpoint
 */
export interface LogoutRequest {
  /** Session ID to logout (optional, defaults to current) */
  sessionId?: string;
  /** Logout from all devices */
  allDevices?: boolean;
}

/**
 * Refresh Token Request Payload
 * Request body for token refresh endpoint
 */
export interface RefreshTokenRequest {
  /** Refresh token */
  refreshToken: string;
  /** Optional device ID for new token */
  deviceId?: string;
}

/**
 * Forgot Password Request Payload
 * Request body for forgot password endpoint
 */
export interface ForgotPasswordRequest {
  /** Email address */
  email: string;
  /** Optional callback URL */
  callbackUrl?: string;
}

/**
 * Reset Password Request Payload
 * Request body for reset password endpoint
 */
export interface ResetPasswordRequest {
  /** Reset token received via email */
  token: string;
  /** New password */
  newPassword: string;
  /** Confirm new password */
  confirmPassword: string;
}

/**
 * Change Password Request Payload
 * Request body for change password endpoint (authenticated)
 */
export interface ChangePasswordRequest {
  /** Current password */
  currentPassword: string;
  /** New password */
  newPassword: string;
  /** Confirm new password */
  confirmPassword: string;
}

/**
 * Verify Email Request Payload
 * Request body for email verification endpoint
 */
export interface VerifyEmailRequest {
  /** Verification token */
  token: string;
  /** Alternative: verification code */
  code?: string;
}

/**
 * Resend Verification Request Payload
 * Request body for resend verification code
 */
export interface ResendVerificationRequest {
  /** Email address */
  email: string;
  /** Verification type (email, phone, etc.) */
  type?: string;
}

/**
 * Two-Factor Authentication Enable Request
 * Request to enable 2FA
 */
export interface TwoFAEnableRequest {
  /** Current password for confirmation */
  password: string;
  /** MFA method (totp, sms, email) */
  method: string;
  /** Phone number (if method is sms) */
  phone?: string;
  /** Email (if method is email) */
  email?: string;
}

/**
 * Two-Factor Authentication Verify Request
 * Request to verify 2FA code
 */
export interface TwoFAVerifyRequest {
  /** Verification code */
  code: string;
  /** Recovery code (alternative) */
  recoveryCode?: string;
  /** Trust this device */
  trustDevice?: boolean;
}

/**
 * Generic Authentication Request
 * Base interface for all auth requests
 */
export interface AuthRequest {
  /** Authentication method */
  method: AuthMethod;
  /** Authentication type */
  type: AuthType;
  /** Timestamp of request */
  timestamp?: Date;
  /** Request ID for tracking */
  requestId?: string;
}

/**
 * SSO Login Request
 * Single Sign-On login request
 */
export interface SSOLoginRequest {
  /** SSO provider */
  provider: string;
  /** SAML response or OIDC code */
  assertion: string;
  /** Relay state */
  relayState?: string;
}

/**
 * Magic Link Request
 * Request for magic link authentication
 */
export interface MagicLinkRequest {
  /** Email address */
  email: string;
  /** Redirect URL after authentication */
  redirectUrl?: string;
}

/**
 * Generic Auth Request with Password Validation
 * Request that includes password validation
 */
export interface PasswordAuthRequest {
  /** Password */
  password: string;
  /** Password configuration (min length, max length) */
  config?: {
    minLength: number;
    maxLength: number;
  };
}
