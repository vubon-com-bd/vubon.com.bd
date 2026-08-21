/**
 * Authentication Request Types Module
 * Request/Response DTOs for authentication API endpoints
 * All types follow REST API conventions and validation rules
 */

import {
  Email,
  Password,
  UserId,
  SessionId,
  Timestamp,
  Token,
  RefreshToken,
  UserRole,
  AuthProvider,
  MfaMethod,
  PaginationParams,
} from './core-primitives.types';

/**
 * Login Request DTO
 * API request payload for user login
 */
export interface LoginRequest {
  email: Email;
  password: Password;
  rememberMe?: boolean;
  deviceId?: string;
  deviceName?: string;
  deviceType?: 'desktop' | 'mobile' | 'tablet' | 'other';
  captchaToken?: string;
}

/**
 * Login Response DTO
 * API response payload for successful login
 */
export interface LoginResponse {
  success: boolean;
  data?: {
    user: LoginUserData;
    tokens: AuthTokenData;
    session: SessionData;
  };
  error?: string;
  requiresTwoFactor?: boolean;
  twoFactorMethod?: MfaMethod;
  message?: string;
  timestamp: Timestamp;
}

/**
 * Login User Data
 * User data returned in login response
 */
export interface LoginUserData {
  id: UserId;
  email: Email;
  firstName: string;
  lastName: string;
  fullName: string;
  roles: UserRole[];
  avatar?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
}

/**
 * Auth Token Data
 * Token data returned in auth responses
 */
export interface AuthTokenData {
  accessToken: Token;
  refreshToken: RefreshToken;
  expiresIn: number;
  tokenType: 'Bearer';
  refreshExpiresIn: number;
}

/**
 * Session Data
 * Session data returned in auth responses
 */
export interface SessionData {
  id: SessionId;
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  startedAt: Timestamp;
  expiresAt: Timestamp;
  isActive: boolean;
}

/**
 * Registration Request DTO
 * API request payload for user registration
 */
export interface RegistrationRequestDTO {
  email: Email;
  password: Password;
  confirmPassword: Password;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  acceptTerms: boolean;
  acceptMarketing?: boolean;
  referralCode?: string;
  captchaToken?: string;
}

/**
 * Registration Response DTO
 * API response payload for user registration
 */
export interface RegistrationResponseDTO {
  success: boolean;
  data?: {
    user: RegistrationUserData;
    requiresEmailVerification: boolean;
    requiresPhoneVerification: boolean;
    verificationMethod: 'email' | 'sms' | 'both';
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Registration User Data
 * User data returned in registration response
 */
export interface RegistrationUserData {
  id: UserId;
  email: Email;
  firstName: string;
  lastName: string;
  fullName: string;
  createdAt: Timestamp;
}

/**
 * Logout Request DTO
 * API request payload for logout
 */
export interface LogoutRequest {
  sessionId?: SessionId;
  allDevices?: boolean;
  deviceId?: string;
}

/**
 * Logout Response DTO
 * API response payload for logout
 */
export interface LogoutResponse {
  success: boolean;
  message: string;
  timestamp: Timestamp;
}

/**
 * Refresh Token Request DTO
 * API request payload for token refresh
 */
export interface RefreshTokenRequest {
  refreshToken: RefreshToken;
  deviceId?: string;
}

/**
 * Refresh Token Response DTO
 * API response payload for token refresh
 */
export interface RefreshTokenResponse {
  success: boolean;
  data?: {
    accessToken: Token;
    expiresIn: number;
    refreshToken?: RefreshToken;
    refreshExpiresIn?: number;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Password Reset Request DTO
 * API request payload for password reset initiation
 */
export interface PasswordResetRequestDTO {
  email: Email;
  resetMethod: 'email' | 'sms';
  captchaToken?: string;
}

/**
 * Password Reset Response DTO
 * API response payload for password reset initiation
 */
export interface PasswordResetResponseDTO {
  success: boolean;
  message: string;
  resetToken?: string;
  expiresIn?: number;
  deliveryMethod: 'email' | 'sms';
  timestamp: Timestamp;
}

/**
 * Password Reset Confirm Request DTO
 * API request payload for password reset confirmation
 */
export interface PasswordResetConfirmRequestDTO {
  token: string;
  newPassword: Password;
  confirmPassword: Password;
}

/**
 * Password Reset Confirm Response DTO
 * API response payload for password reset confirmation
 */
export interface PasswordResetConfirmResponseDTO {
  success: boolean;
  message: string;
  timestamp: Timestamp;
}

/**
 * Email Verification Request DTO
 * API request payload for email verification
 */
export interface EmailVerificationRequestDTO {
  email: Email;
  token?: string;
  resend?: boolean;
}

/**
 * Email Verification Response DTO
 * API response payload for email verification
 */
export interface EmailVerificationResponseDTO {
  success: boolean;
  message: string;
  emailVerified: boolean;
  timestamp: Timestamp;
}

/**
 * Two-Factor Setup Request DTO
 * API request payload for 2FA setup
 */
export interface TwoFactorSetupRequestDTO {
  method: MfaMethod;
  enable: boolean;
  phoneNumber?: string;
  email?: Email;
}

/**
 * Two-Factor Setup Response DTO
 * API response payload for 2FA setup
 */
export interface TwoFactorSetupResponseDTO {
  success: boolean;
  data?: {
    enabled: boolean;
    method: MfaMethod;
    secret?: string;
    qrCode?: string;
    backupCodes?: string[];
    setupCompleted: boolean;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Two-Factor Verify Request DTO
 * API request payload for 2FA verification
 */
export interface TwoFactorVerifyRequestDTO {
  userId: UserId;
  code: string;
  method: MfaMethod;
  backupCode?: string;
  rememberDevice?: boolean;
  deviceId?: string;
}

/**
 * Two-Factor Verify Response DTO
 * API response payload for 2FA verification
 */
export interface TwoFactorVerifyResponseDTO {
  success: boolean;
  data?: {
    verified: boolean;
    tokens?: AuthTokenData;
    session?: SessionData;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Session List Request DTO
 * API request payload for listing sessions
 */
export interface SessionListRequest {
  userId: UserId;
  includeInactive?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * Session List Response DTO
 * API response payload for session list
 */
export interface SessionListResponseDTO {
  success: boolean;
  data?: {
    sessions: SessionData[];
    total: number;
    currentSessionId: SessionId;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Session Terminate Request DTO
 * API request payload for terminating sessions
 */
export interface SessionTerminateRequest {
  sessionId?: SessionId;
  userId?: UserId;
  allDevices?: boolean;
  deviceId?: string;
  reason?: string;
}

/**
 * Session Terminate Response DTO
 * API response payload for session termination
 */
export interface SessionTerminateResponseDTO {
  success: boolean;
  message: string;
  terminatedSessions: number;
  timestamp: Timestamp;
}

/**
 * Account Lock Status Request DTO
 * API request payload for checking account lock status
 */
export interface AccountLockStatusRequest {
  email: Email;
}

/**
 * Account Lock Status Response DTO
 * API response payload for account lock status
 */
export interface AccountLockStatusResponseDTO {
  success: boolean;
  data?: {
    isLocked: boolean;
    lockoutReason?: string;
    lockoutExpiresAt?: Timestamp;
    failedAttempts: number;
    maxAttempts: number;
    remainingAttempts: number;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Social Login Request DTO
 * API request payload for social login
 */
export interface SocialLoginRequest {
  provider: AuthProvider;
  accessToken: Token;
  providerUserId?: string;
  email?: Email;
  name?: string;
  avatar?: string;
  deviceId?: string;
  deviceName?: string;
}

/**
 * Social Login Response DTO
 * API response payload for social login
 */
export interface SocialLoginResponseDTO {
  success: boolean;
  data?: {
    user: LoginUserData;
    tokens: AuthTokenData;
    session: SessionData;
    isNewUser: boolean;
  };
  error?: string;
  requiresTwoFactor?: boolean;
  timestamp: Timestamp;
}

/**
 * Change Password Request DTO
 * API request payload for password change
 */
export interface ChangePasswordRequest {
  currentPassword: Password;
  newPassword: Password;
  confirmPassword: Password;
}

/**
 * Change Password Response DTO
 * API response payload for password change
 */
export interface ChangePasswordResponseDTO {
  success: boolean;
  message: string;
  timestamp: Timestamp;
}

/**
 * MFA Backup Codes Request DTO
 * API request payload for MFA backup codes
 */
export interface MfaBackupCodesRequest {
  userId: UserId;
  regenerate?: boolean;
}

/**
 * MFA Backup Codes Response DTO
 * API response payload for MFA backup codes
 */
export interface MfaBackupCodesResponseDTO {
  success: boolean;
  data?: {
    backupCodes: string[];
    regeneratedAt: Timestamp;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Auth Check Request DTO
 * API request payload for auth status check
 */
export interface AuthCheckRequest {
  token?: Token;
  sessionId?: SessionId;
}

/**
 * Auth Check Response DTO
 * API response payload for auth status check
 */
export interface AuthCheckResponseDTO {
  success: boolean;
  data?: {
    isAuthenticated: boolean;
    user?: LoginUserData;
    session?: SessionData;
    tokenValid: boolean;
    sessionValid: boolean;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * API Error Response
 * Standardized API error response
 */
export interface APIErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * API Success Response
 * Standardized API success response
 */
export interface APISuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * API Paginated Request
 * Paginated API request parameters
 */
export interface APIPaginatedRequest extends PaginationParams {
  search?: string;
  filters?: Record<string, unknown>;
}

/**
 * Auth API Endpoints
 * Authentication API endpoint paths
 */
export const AUTH_API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  REFRESH_TOKEN: '/api/auth/refresh',
  VERIFY_EMAIL: '/api/auth/verify-email',
  RESEND_VERIFICATION: '/api/auth/resend-verification',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
  CHANGE_PASSWORD: '/api/auth/change-password',
  TWO_FACTOR_SETUP: '/api/auth/2fa/setup',
  TWO_FACTOR_VERIFY: '/api/auth/2fa/verify',
  TWO_FACTOR_DISABLE: '/api/auth/2fa/disable',
  SESSIONS: '/api/auth/sessions',
  SESSION_TERMINATE: '/api/auth/sessions/terminate',
  ACCOUNT_STATUS: '/api/auth/account/status',
  SOCIAL_LOGIN: '/api/auth/social/login',
  SOCIAL_CALLBACK: '/api/auth/social/callback',
  MFA_BACKUP_CODES: '/api/auth/2fa/backup-codes',
  AUTH_CHECK: '/api/auth/check',
} as const;

/**
 * Auth API Methods
 * HTTP methods for auth endpoints
 */
export type AuthAPIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Auth API Headers
 * Standard auth API headers
 */
export interface AuthAPIHeaders {
  'Content-Type': 'application/json';
  Authorization?: string;
  'X-Device-ID'?: string;
  'X-Session-ID'?: string;
  'X-Request-ID'?: string;
  'Accept-Language'?: string;
}

/**
 * Auth API Config
 * API configuration for auth requests
 */
export interface AuthAPIConfig {
  baseURL: string;
  timeout: number;
  headers: AuthAPIHeaders;
  withCredentials: boolean;
}

/**
 * API Rate Limit Info
 * Rate limit information from API
 */
export interface APIRateLimitInfo {
  limit: number;
  remaining: number;
  reset: Timestamp;
  retryAfter?: number;
}

/**
 * API Request Metadata
 * Additional metadata for API requests
 */
export interface APIRequestMetadata {
  requestId: string;
  timestamp: Timestamp;
  clientIp?: string;
  userAgent?: string;
  deviceId?: string;
  sessionId?: string;
}
