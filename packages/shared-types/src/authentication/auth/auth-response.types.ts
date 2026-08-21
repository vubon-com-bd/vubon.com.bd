/**
 * Authentication Response Types Module
 * Response DTOs and types for authentication API responses
 * Standardized response formats for all auth endpoints
 */

import {
  UserId,
  SessionId,
  Timestamp,
  Token,
  RefreshToken,
  UserRole,
  AuthStatus,
  AuthProvider,
  MfaMethod,
} from './core-primitives.types';
import { AuthenticatedUser, AuthTokens, SessionInfo, AuthErrorCode } from './auth.types';
import { LoginUserData, AuthTokenData, SessionData } from './auth-request.types';

/**
 * Base API Response
 * Generic response wrapper for all API responses
 */
export interface BaseAPIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
  statusCode?: number;
}

/**
 * API Error
 * Standardized error structure for API responses
 */
export interface APIError {
  code: string | AuthErrorCode;
  message: string;
  details?: Record<string, unknown>;
  validationErrors?: ValidationError[];
  timestamp: Timestamp;
  path?: string;
}

/**
 * Validation Error
 * Field-specific validation error
 */
export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: unknown;
  constraints?: Record<string, string>;
}

/**
 * Authentication Response
 * Base authentication response
 */
export interface AuthResponse {
  success: boolean;
  data?: AuthResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Authentication Response Data
 * Data payload for auth responses
 */
export interface AuthResponseData {
  user: AuthenticatedUser;
  tokens: AuthTokens;
  session: SessionInfo;
  requiresTwoFactor?: boolean;
  requiresVerification?: boolean;
  verificationMethod?: VerificationMethodType;
}

/**
 * Verification Method Type
 * Available verification methods
 */
export type VerificationMethodType = 'email' | 'sms' | 'authenticator' | 'backup-codes';

/**
 * Login Response
 * Response for login endpoint
 */
export interface LoginResponse {
  success: boolean;
  data?: LoginResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Login Response Data
 * Data payload for login response
 */
export interface LoginResponseData {
  user: LoginUserData;
  tokens: AuthTokenData;
  session: SessionData;
  requiresTwoFactor?: boolean;
  twoFactorMethod?: MfaMethod;
  twoFactorToken?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

/**
 * Registration Response
 * Response for registration endpoint
 */
export interface RegistrationResponse {
  success: boolean;
  data?: RegistrationResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Registration Response Data
 * Data payload for registration response
 */
export interface RegistrationResponseData {
  user: RegistrationUserData;
  requiresEmailVerification: boolean;
  requiresPhoneVerification: boolean;
  verificationMethod: VerificationMethodType[];
  verificationSent: boolean;
  message: string;
  userId: UserId;
}

/**
 * Registration User Data
 * User data returned in registration
 */
export interface RegistrationUserData {
  id: UserId;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  roles: UserRole[];
  createdAt: Timestamp;
  status: AuthStatus;
}

/**
 * Token Refresh Response
 * Response for token refresh endpoint
 */
export interface TokenRefreshResponse {
  success: boolean;
  data?: TokenRefreshResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Token Refresh Response Data
 * Data payload for token refresh response
 */
export interface TokenRefreshResponseData {
  accessToken: Token;
  expiresIn: number;
  refreshToken?: RefreshToken;
  refreshExpiresIn?: number;
  tokenType: 'Bearer';
}

/**
 * Password Reset Response
 * Response for password reset endpoints
 */
export interface PasswordResetResponse {
  success: boolean;
  data?: PasswordResetResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Password Reset Response Data
 * Data payload for password reset response
 */
export interface PasswordResetResponseData {
  resetToken?: string;
  expiresIn?: number;
  deliveryMethod: 'email' | 'sms';
  deliverySent: boolean;
  message: string;
}

/**
 * Password Reset Confirm Response
 * Response for password reset confirmation
 */
export interface PasswordResetConfirmResponse {
  success: boolean;
  data?: PasswordResetConfirmResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Password Reset Confirm Response Data
 * Data payload for password reset confirmation
 */
export interface PasswordResetConfirmResponseData {
  passwordChanged: boolean;
  passwordChangedAt: Timestamp;
  nextAction?: string;
}

/**
 * Email Verification Response
 * Response for email verification
 */
export interface EmailVerificationResponse {
  success: boolean;
  data?: EmailVerificationResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Email Verification Response Data
 * Data payload for email verification
 */
export interface EmailVerificationResponseData {
  email: string;
  verified: boolean;
  verifiedAt: Timestamp;
  emailVerified: boolean;
}

/**
 * Two Factor Setup Response
 * Response for 2FA setup
 */
export interface TwoFactorSetupResponse {
  success: boolean;
  data?: TwoFactorSetupResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Two Factor Setup Response Data
 * Data payload for 2FA setup
 */
export interface TwoFactorSetupResponseData {
  enabled: boolean;
  method: MfaMethod;
  secret?: string;
  qrCode?: string;
  backupCodes?: string[];
  setupCompleted: boolean;
  setupToken?: string;
  expiresAt?: Timestamp;
}

/**
 * Two Factor Verification Response
 * Response for 2FA verification
 */
export interface TwoFactorVerificationResponse {
  success: boolean;
  data?: TwoFactorVerificationResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Two Factor Verification Response Data
 * Data payload for 2FA verification
 */
export interface TwoFactorVerificationResponseData {
  verified: boolean;
  tokens?: AuthTokenData;
  session?: SessionData;
  user?: LoginUserData;
  verifiedAt: Timestamp;
  deviceRemembered: boolean;
}

/**
 * Session List Response
 * Response for session list
 */
export interface SessionListResponse {
  success: boolean;
  data?: SessionListResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Session List Response Data
 * Data payload for session list
 */
export interface SessionListResponseData {
  sessions: SessionData[];
  total: number;
  currentSessionId: SessionId;
  activeSessions: number;
  maxSessions: number;
}

/**
 * Session Terminate Response
 * Response for session termination
 */
export interface SessionTerminateResponse {
  success: boolean;
  data?: SessionTerminateResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Session Terminate Response Data
 * Data payload for session termination
 */
export interface SessionTerminateResponseData {
  terminatedCount: number;
  terminatedSessionIds: SessionId[];
  remainingSessions: number;
}

/**
 * Account Status Response
 * Response for account status check
 */
export interface AccountStatusResponse {
  success: boolean;
  data?: AccountStatusResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Account Status Response Data
 * Data payload for account status
 */
export interface AccountStatusResponseData {
  isLocked: boolean;
  isActive: boolean;
  isVerified: boolean;
  lockoutReason?: string;
  lockoutExpiresAt?: Timestamp;
  failedAttempts: number;
  maxAttempts: number;
  remainingAttempts: number;
  lastLoginAt?: Timestamp;
  lastLoginIp?: string;
}

/**
 * Social Login Response
 * Response for social login
 */
export interface SocialLoginResponse {
  success: boolean;
  data?: SocialLoginResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Social Login Response Data
 * Data payload for social login
 */
export interface SocialLoginResponseData {
  user: LoginUserData;
  tokens: AuthTokenData;
  session: SessionData;
  isNewUser: boolean;
  provider: AuthProvider;
  providerUserId: string;
  requiresTwoFactor?: boolean;
  requiresVerification?: boolean;
}

/**
 * Change Password Response
 * Response for password change
 */
export interface ChangePasswordResponse {
  success: boolean;
  data?: ChangePasswordResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Change Password Response Data
 * Data payload for password change
 */
export interface ChangePasswordResponseData {
  passwordChanged: boolean;
  passwordChangedAt: Timestamp;
  invalidateSessions?: boolean;
  invalidatedSessionsCount?: number;
}

/**
 * MFA Backup Codes Response
 * Response for MFA backup codes
 */
export interface MfaBackupCodesResponse {
  success: boolean;
  data?: MfaBackupCodesResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * MFA Backup Codes Response Data
 * Data payload for MFA backup codes
 */
export interface MfaBackupCodesResponseData {
  backupCodes: string[];
  generatedAt: Timestamp;
  regenerated: boolean;
  expiresAt?: Timestamp;
  usageCount: number;
}

/**
 * Auth Status Response
 * Response for authentication status check
 */
export interface AuthStatusResponse {
  success: boolean;
  data?: AuthStatusResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Auth Status Response Data
 * Data payload for auth status
 */
export interface AuthStatusResponseData {
  isAuthenticated: boolean;
  user?: LoginUserData;
  session?: SessionData;
  tokenValid: boolean;
  sessionValid: boolean;
  expiresIn?: number;
  requiresMFA?: boolean;
  requiresVerification?: boolean;
}

/**
 * Bulk Operation Response
 * Response for bulk operations
 */
export interface BulkOperationResponse {
  success: boolean;
  data?: BulkOperationResponseData;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Bulk Operation Response Data
 * Data payload for bulk operations
 */
export interface BulkOperationResponseData {
  total: number;
  succeeded: number;
  failed: number;
  skipped: number;
  details: BulkOperationDetail[];
}

/**
 * Bulk Operation Detail
 * Individual operation result
 */
export interface BulkOperationDetail {
  id?: string;
  success: boolean;
  error?: string;
  data?: unknown;
  timestamp: Timestamp;
}

/**
 * Health Check Response
 * Health status response
 */
export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  services: ServiceHealth[];
  timestamp: Timestamp;
  version: string;
}

/**
 * Service Health
 * Individual service health status
 */
export interface ServiceHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  message?: string;
  latency?: number;
  timestamp: Timestamp;
}

/**
 * Rate Limit Response
 * Rate limit information response
 */
export interface RateLimitResponse {
  limit: number;
  remaining: number;
  reset: Timestamp;
  retryAfter?: number;
  quota: {
    total: number;
    used: number;
    remaining: number;
  };
}

/**
 * Pagination Response Metadata
 * Metadata for paginated responses
 */
export interface PaginationResponseMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage?: number;
  prevPage?: number;
}

/**
 * Paginated Response
 * Generic paginated response wrapper
 */
export interface PaginatedResponse<T = unknown> {
  success: boolean;
  data: T[];
  pagination: PaginationResponseMeta;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Empty Response
 * Response with no data
 */
export interface EmptyResponse {
  success: boolean;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Response Status Codes
 * HTTP status codes used in auth responses
 */
export const RESPONSE_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * Response Message Types
 * Common response message types
 */
export const RESPONSE_MESSAGES = {
  SUCCESS: 'Operation successful',
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  LOGIN_SUCCESS: 'Login successful',
  LOGIN_FAILED: 'Login failed',
  LOGOUT_SUCCESS: 'Logout successful',
  REGISTRATION_SUCCESS: 'Registration successful',
  REGISTRATION_FAILED: 'Registration failed',
  VERIFICATION_SUCCESS: 'Verification successful',
  VERIFICATION_FAILED: 'Verification failed',
  RESET_SUCCESS: 'Password reset successful',
  RESET_FAILED: 'Password reset failed',
  TOKEN_REFRESHED: 'Token refreshed successfully',
  TOKEN_INVALID: 'Invalid or expired token',
  SESSION_EXPIRED: 'Session expired',
  SESSION_TERMINATED: 'Session terminated',
  TWO_FACTOR_REQUIRED: 'Two-factor authentication required',
  TWO_FACTOR_VERIFIED: 'Two-factor authentication verified',
  TWO_FACTOR_INVALID: 'Invalid two-factor code',
  ACCOUNT_LOCKED: 'Account is locked',
  ACCOUNT_DISABLED: 'Account is disabled',
  ACCOUNT_SUSPENDED: 'Account is suspended',
  EMAIL_NOT_VERIFIED: 'Email not verified',
  PHONE_NOT_VERIFIED: 'Phone not verified',
  INVALID_CREDENTIALS: 'Invalid email or password',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded',
  INTERNAL_ERROR: 'Internal server error',
} as const;

/**
 * Response Type Map
 * Mapping of response types for different auth operations
 */
export interface ResponseTypeMap {
  login: LoginResponse;
  register: RegistrationResponse;
  refresh: TokenRefreshResponse;
  logout: EmptyResponse;
  verifyEmail: EmailVerificationResponse;
  resetPassword: PasswordResetResponse;
  changePassword: ChangePasswordResponse;
  setup2FA: TwoFactorSetupResponse;
  verify2FA: TwoFactorVerificationResponse;
  sessions: SessionListResponse;
  terminateSession: SessionTerminateResponse;
  accountStatus: AccountStatusResponse;
  socialLogin: SocialLoginResponse;
  mfaBackupCodes: MfaBackupCodesResponse;
  authStatus: AuthStatusResponse;
}

/**
 * Response Status Map
 * Status string to status code mapping
 */
export type ResponseStatus = 'success' | 'error' | 'warning' | 'info';

/**
 * API Response Builder
 * Helper type for building API responses
 */
export interface APIResponseBuilder<T = unknown> {
  success(data: T, message?: string): BaseAPIResponse<T>;
  error(code: string, message: string, details?: Record<string, unknown>): BaseAPIResponse<never>;
  validationError(errors: ValidationError[]): BaseAPIResponse<never>;
  paginated(data: T[], pagination: PaginationResponseMeta): PaginatedResponse<T>;
}
