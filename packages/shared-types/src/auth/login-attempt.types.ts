/**
 * Login attempt-related type definitions for the monorepo
 * All login attempt types are centralized here for consistent usage across packages
 */

/**
 * Login attempt status types
 * Represents the outcome of a login attempt
 */
export type LoginAttemptStatus = 'SUCCESS' | 'FAILURE' | 'LOCKED' | 'RATE_LIMITED' | 'PENDING';

/**
 * Login failure reason types
 * Specific reasons for failed login attempts
 */
export type LoginFailureReason =
  | 'INVALID_CREDENTIALS'
  | 'ACCOUNT_LOCKED'
  | 'RATE_LIMITED'
  | 'ACCOUNT_SUSPENDED'
  | 'ACCOUNT_DEACTIVATED'
  | 'EMAIL_NOT_VERIFIED'
  | 'MFA_REQUIRED'
  | 'MFA_FAILED'
  | 'IP_BLOCKED'
  | 'DEVICE_UNTRUSTED'
  | 'PASSWORD_EXPIRED'
  | 'TOO_MANY_ATTEMPTS'
  | 'SESSION_LIMIT_EXCEEDED'
  | 'MAINTENANCE_MODE'
  | 'UNKNOWN_ERROR';

/**
 * Login attempt interface
 * Represents a single login attempt by a user
 */
export interface LoginAttempt {
  /** Unique identifier for the login attempt */
  id: string;
  /** User ID if the user exists (null for non-existent users) */
  userId: string | null;
  /** Email address used for the login attempt */
  email: string;
  /** IP address of the client */
  ipAddress: string;
  /** User agent string of the client */
  userAgent: string;
  /** Status of the login attempt */
  status: LoginAttemptStatus;
  /** Failure reason if the attempt failed */
  failureReason?: LoginFailureReason;
  /** Timestamp of the login attempt */
  timestamp: Date;
  /** Whether MFA was required for this attempt */
  mfaRequired?: boolean;
  /** Whether MFA was successfully verified */
  mfaVerified?: boolean;
  /** Session ID created if login was successful */
  sessionId?: string;
}

/**
 * Login attempt request interface
 * Used when a user attempts to login
 */
export interface LoginAttemptRequest {
  /** Email address of the user */
  email: string;
  /** Password of the user */
  password: string;
  /** IP address of the client */
  ipAddress: string;
  /** User agent string of the client */
  userAgent: string;
  /** Device fingerprint if available */
  deviceFingerprint?: string;
  /** Whether to remember the user */
  rememberMe?: boolean;
  /** MFA code if required */
  mfaCode?: string;
  /** MFA recovery code if used */
  mfaRecoveryCode?: string;
}

/**
 * Login attempt response interface
 * Response returned after a login attempt
 */
export interface LoginAttemptResponse {
  /** Whether the login was successful */
  success: boolean;
  /** Status of the login attempt */
  status: LoginAttemptStatus;
  /** Failure reason if the attempt failed */
  failureReason?: LoginFailureReason;
  /** Access token if login was successful */
  accessToken?: string;
  /** Refresh token if login was successful */
  refreshToken?: string;
  /** Token expiry in seconds */
  expiresIn?: number;
  /** User information if login was successful */
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  /** Whether MFA is required to complete login */
  mfaRequired?: boolean;
  /** Available MFA methods for the user */
  mfaMethods?: string[];
  /** Message for the user */
  message?: string;
  /** Number of remaining attempts before lockout */
  remainingAttempts?: number;
  /** Time until account unlock (in seconds) */
  lockDuration?: number;
}

/**
 * Login attempt statistics interface
 * Statistical data about login attempts
 */
export interface LoginAttemptStatistics {
  /** Total number of login attempts */
  totalAttempts: number;
  /** Number of successful login attempts */
  successfulAttempts: number;
  /** Number of failed login attempts */
  failedAttempts: number;
  /** Success rate as a percentage */
  successRate: number;
  /** Recent attempts (last 24 hours) */
  recentAttempts: {
    total: number;
    success: number;
    failure: number;
  };
  /** Attempts by IP address (top 10) */
  topIpAddresses: Array<{
    ipAddress: string;
    attempts: number;
    successRate: number;
  }>;
  /** Attempts by failure reason */
  failuresByReason: Record<LoginFailureReason, number>;
  /** Timestamp when statistics were calculated */
  calculatedAt: Date;
}

/**
 * Login attempt filter interface
 * Used for filtering login attempts in lists
 */
export interface LoginAttemptFilter {
  /** Filter by email address */
  email?: string;
  /** Filter by user ID */
  userId?: string;
  /** Filter by status */
  status?: LoginAttemptStatus;
  /** Filter by failure reason */
  failureReason?: LoginFailureReason;
  /** Filter by IP address */
  ipAddress?: string;
  /** Filter by date range - from */
  fromDate?: Date;
  /** Filter by date range - to */
  toDate?: Date;
  /** Filter by MFA requirement */
  mfaRequired?: boolean;
  /** Filter by MFA verification status */
  mfaVerified?: boolean;
}

/**
 * Login attempt list response interface
 * Paginated list of login attempts
 */
export interface LoginAttemptListResponse {
  /** Array of login attempts */
  attempts: LoginAttempt[];
  /** Total number of attempts */
  total: number;
  /** Current page number */
  page: number;
  /** Number of attempts per page */
  limit: number;
  /** Total number of pages */
  totalPages: number;
}

/**
 * Login attempt summary interface
 * Summary of login attempts for a user
 */
export interface LoginAttemptSummary {
  /** User ID */
  userId: string;
  /** Email address */
  email: string;
  /** Total attempts */
  totalAttempts: number;
  /** Successful attempts */
  successfulAttempts: number;
  /** Failed attempts */
  failedAttempts: number;
  /** Last attempt timestamp */
  lastAttemptAt?: Date;
  /** Last successful attempt timestamp */
  lastSuccessAt?: Date;
  /** Last failed attempt timestamp */
  lastFailureAt?: Date;
  /** Current consecutive failures */
  consecutiveFailures: number;
  /** Whether the account is currently locked */
  isLocked: boolean;
  /** Account lock expiry timestamp */
  lockExpiresAt?: Date;
  /** Whether the account is rate limited */
  isRateLimited: boolean;
  /** Rate limit expiry timestamp */
  rateLimitExpiresAt?: Date;
}

/**
 * Login attempt configuration interface
 * Configuration for login attempt management
 */
export interface LoginAttemptConfig {
  /** Maximum login attempts before lockout */
  maxAttempts: number;
  /** Lockout duration in minutes */
  lockoutDurationMinutes: number;
  /** Rate limit window in minutes */
  rateLimitWindowMinutes: number;
  /** Maximum attempts in rate limit window */
  maxAttemptsInWindow: number;
  /** Time window for resetting attempts in minutes */
  resetAttemptsAfterMinutes: number;
  /** Whether to enable IP-based blocking */
  enableIpBlocking: boolean;
  /** Maximum attempts from an IP before blocking */
  maxAttemptsFromIp: number;
  /** IP block duration in minutes */
  ipBlockDurationMinutes: number;
  /** Whether to enable device fingerprint tracking */
  enableDeviceFingerprinting: boolean;
  /** Whether to log all attempts */
  logAllAttempts: boolean;
  /** Whether to notify on suspicious activity */
  notifyOnSuspiciousActivity: boolean;
}

/**
 * Account lock status interface
 * Represents the lock status of a user account
 */
export interface AccountLockStatus {
  /** Whether the account is locked */
  isLocked: boolean;
  /** Reason for the lock */
  reason: LoginFailureReason;
  /** Lock expiry timestamp */
  expiresAt?: Date;
  /** Time remaining in seconds */
  remainingSeconds?: number;
  /** Number of failed attempts that caused the lock */
  failedAttempts: number;
  /** Whether the lock can be manually overridden */
  canBeOverridden: boolean;
}
