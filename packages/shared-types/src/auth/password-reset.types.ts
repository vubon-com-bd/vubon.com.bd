/**
 * Password reset-related type definitions for the monorepo
 * All password reset types are centralized here for consistent usage across packages
 */

/**
 * Password reset status types
 * Represents the current status of a password reset request
 */
export type PasswordResetStatus = 'PENDING' | 'COMPLETED' | 'EXPIRED' | 'FAILED';

/**
 * Password reset interface
 * Represents a password reset record
 */
export interface PasswordReset {
  /** Unique identifier for the password reset record */
  id: string;
  /** User ID associated with the reset request */
  userId: string;
  /** Email address of the user requesting reset */
  email: string;
  /** Reset token */
  token: string;
  /** Current status of the reset request */
  status: PasswordResetStatus;
  /** Timestamp when the reset request expires */
  expiresAt: Date;
  /** Timestamp when the reset request was created */
  createdAt: Date;
  /** Timestamp when the password was successfully reset (null if not completed) */
  resetAt: Date | null;
  /** IP address where the reset was requested */
  requestIpAddress: string;
  /** IP address where the password was reset */
  resetIpAddress?: string;
  /** User agent string of the client requesting reset */
  requestUserAgent: string;
  /** User agent string of the client resetting password */
  resetUserAgent?: string;
  /** Number of reset attempts */
  attempts: number;
  /** Timestamp of the last reset attempt */
  lastAttemptAt?: Date;
  /** Error message if reset failed */
  errorMessage?: string;
}

/**
 * Forgot password request interface
 * Used when a user requests a password reset
 */
export interface ForgotPasswordRequest {
  /** Email address of the user */
  email: string;
  /** Phone number of the user (alternative contact) */
  phone?: string;
  /** Base URL for reset links */
  baseUrl?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Reset password request interface
 * Used when resetting a password with a token
 */
export interface ResetPasswordRequest {
  /** Reset token */
  token: string;
  /** New password */
  newPassword: string;
  /** Confirm new password */
  confirmPassword: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Reset password response interface
 * Response after password reset attempt
 */
export interface ResetPasswordResponse {
  /** Whether the reset was successful */
  success: boolean;
  /** Response message */
  message: string;
  /** Error code if reset failed */
  errorCode?: string;
  /** Whether the token has expired */
  tokenExpired?: boolean;
  /** Whether the password has already been reset */
  alreadyReset?: boolean;
}

/**
 * Validate reset token request interface
 * Used when validating a reset token before showing reset form
 */
export interface ValidateResetTokenRequest {
  /** Reset token to validate */
  token: string;
}

/**
 * Validate reset token response interface
 * Response after validating a reset token
 */
export interface ValidateResetTokenResponse {
  /** Whether the token is valid */
  isValid: boolean;
  /** Email address associated with the token if valid */
  email?: string;
  /** User ID associated with the token if valid */
  userId?: string;
  /** Error message if invalid */
  error?: string;
  /** Error code for client-side handling */
  errorCode?: string;
  /** Whether the token has expired */
  isExpired?: boolean;
  /** Whether the password has already been reset */
  alreadyReset?: boolean;
}

/**
 * Resend reset email request interface
 * Used when requesting to resend a password reset email
 */
export interface ResendResetEmailRequest {
  /** Email address to resend reset email to */
  email: string;
  /** Base URL for reset links */
  baseUrl?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Resend reset email response interface
 * Response after requesting to resend reset email
 */
export interface ResendResetEmailResponse {
  /** Whether the resend was successful */
  success: boolean;
  /** Response message */
  message: string;
  /** Time when the next resend is allowed (in seconds) */
  cooldownSeconds?: number;
  /** Whether the request was already processed */
  alreadyProcessed?: boolean;
}

/**
 * Password reset status response interface
 * Current status of a password reset request
 */
export interface PasswordResetStatusResponse {
  /** Email address */
  email: string;
  /** Whether the password has been reset */
  isReset: boolean;
  /** Current reset status */
  status: PasswordResetStatus;
  /** When the password was reset (if applicable) */
  resetAt?: Date;
  /** When the reset expires (if applicable) */
  expiresAt?: Date;
  /** Whether a reset email was sent recently */
  recentEmailSent?: boolean;
  /** Time until next reset email can be sent (in seconds) */
  nextResendAvailableIn?: number;
}

/**
 * Password reset configuration interface
 * Configuration for password reset system
 */
export interface PasswordResetConfig {
  /** Reset token expiry in minutes */
  tokenExpiryMinutes: number;
  /** Maximum number of reset attempts */
  maxAttempts: number;
  /** Maximum number of resend requests per day */
  maxResendRequestsPerDay: number;
  /** Cooldown period between resends in seconds */
  resendCooldownSeconds: number;
  /** Whether to require current password for password change */
  requireCurrentPassword: boolean;
  /** Whether to log all reset attempts */
  logAllAttempts: boolean;
  /** Whether to notify on password reset success */
  notifyOnSuccess: boolean;
  /** Whether to notify on password reset failure */
  notifyOnFailure: boolean;
  /** Whether to expire all sessions on password reset */
  expireSessionsOnReset: boolean;
}

/**
 * Password reset statistics interface
 * Statistical data about password resets
 */
export interface PasswordResetStatistics {
  /** Total number of reset requests */
  totalRequests: number;
  /** Number of successful resets */
  successfulResets: number;
  /** Number of failed resets */
  failedResets: number;
  /** Number of expired resets */
  expiredResets: number;
  /** Success rate as a percentage */
  successRate: number;
  /** Average time to complete reset in seconds */
  averageResetTime: number;
  /** Reset attempts by status */
  attemptsByStatus: Record<PasswordResetStatus, number>;
  /** Recent resets (last 24 hours) */
  recentResets: {
    total: number;
    success: number;
    failure: number;
  };
  /** Reset requests by IP address (top 10) */
  topIpAddresses: Array<{
    ipAddress: string;
    count: number;
  }>;
  /** Timestamp when statistics were calculated */
  calculatedAt: Date;
}

/**
 * Password reset filter interface
 * Used for filtering reset records in lists
 */
export interface PasswordResetFilter {
  /** Filter by user ID */
  userId?: string;
  /** Filter by email address */
  email?: string;
  /** Filter by status */
  status?: PasswordResetStatus;
  /** Filter by date range - from */
  fromDate?: Date;
  /** Filter by date range - to */
  toDate?: Date;
  /** Filter by reset attempts */
  minAttempts?: number;
  maxAttempts?: number;
  /** Search term for email or token */
  search?: string;
}

/**
 * Password reset list response interface
 * Paginated list of password reset records
 */
export interface PasswordResetListResponse {
  /** Array of reset records */
  resets: PasswordReset[];
  /** Total number of records */
  total: number;
  /** Current page number */
  page: number;
  /** Number of records per page */
  limit: number;
  /** Total number of pages */
  totalPages: number;
}

/**
 * Password reset event interface
 * Used for reset-related events
 */
export interface PasswordResetEvent {
  /** Type of reset event */
  type: 'REQUESTED' | 'RESENT' | 'RESET' | 'EXPIRED' | 'FAILED';
  /** User ID */
  userId?: string;
  /** Email address */
  email: string;
  /** Reset status */
  status: PasswordResetStatus;
  /** Timestamp of the event */
  timestamp: Date;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Password reset webhook payload interface
 * Used for sending reset events to webhooks
 */
export interface PasswordResetWebhookPayload {
  /** Event type */
  event: 'password.reset.requested' | 'password.reset.completed' | 'password.reset.expired';
  /** User ID */
  userId?: string;
  /** Email address */
  email: string;
  /** Reset status */
  status: PasswordResetStatus;
  /** Timestamp of the event */
  timestamp: string;
  /** Additional data */
  data: {
    token?: string;
    attempts?: number;
    resetAt?: string;
    expiresAt?: string;
    metadata?: Record<string, unknown>;
  };
}

/**
 * Password reset token generation interface
 * Used for generating reset tokens
 */
export interface PasswordResetTokenGeneration {
  /** User ID for the token */
  userId: string;
  /** Email address for reset */
  email: string;
  /** Token expiry in minutes (optional) */
  expiryMinutes?: number;
  /** Additional claims to include */
  additionalClaims?: Record<string, unknown>;
}

/**
 * Password reset validation result interface
 * Result of validating a reset token
 */
export interface PasswordResetValidationResult {
  /** Whether the token is valid */
  isValid: boolean;
  /** User ID if token is valid */
  userId?: string;
  /** Email address if token is valid */
  email?: string;
  /** Error message if invalid */
  error?: string;
  /** Error code for client-side handling */
  errorCode?: string;
  /** Whether the token is expired */
  isExpired?: boolean;
  /** Whether the password has already been reset */
  alreadyReset?: boolean;
}

/**
 * Password reset security check interface
 * Security checks before allowing password reset
 */
export interface PasswordResetSecurityCheck {
  /** Whether the user has recently requested a reset */
  recentRequestExists: boolean;
  /** Time until next allowed request (in seconds) */
  cooldownSeconds: number;
  /** Number of requests in the last 24 hours */
  recentRequestCount: number;
  /** Whether the user is allowed to request reset */
  isAllowed: boolean;
  /** Reasons why reset is not allowed (if applicable) */
  blockReasons: string[];
}

/**
 * Change password request interface
 * Used when a user wants to change their password while logged in
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
 * Change password response interface
 * Response after changing password
 */
export interface ChangePasswordResponse {
  /** Whether the change was successful */
  success: boolean;
  /** Response message */
  message: string;
  /** Error code if change failed */
  errorCode?: string;
  /** Whether the user needs to log in again */
  sessionExpired?: boolean;
}
