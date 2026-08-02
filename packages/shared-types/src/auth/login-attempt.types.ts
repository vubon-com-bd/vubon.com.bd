/**
 * Login attempt and account lock type definitions for the monorepo
 * All login attempt and account lock types are centralized here for consistent usage across packages
 */

/**
 * Login attempt status types
 * Represents the status of a login attempt
 */
export type LoginAttemptStatus = 'SUCCESS' | 'FAILED' | 'BLOCKED' | 'PENDING';

/**
 * Lock level types
 * Represents the severity level of an account lock
 */
export type LockLevel = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'PERMANENT';

/**
 * Lock reason types
 * Represents the reason for an account lock
 */
export type LockReason =
  'TOO_MANY_ATTEMPTS' | 'SUSPICIOUS_ACTIVITY' | 'ADMIN_ACTION' | 'SECURITY_BREACH';

/**
 * Login attempt interface
 * Tracks individual login attempts for security monitoring
 */
export interface LoginAttempt {
  /** Unique identifier for the login attempt */
  id: string;
  /** User ID if known, null for unknown users */
  userId?: string;
  /** Email or username used for login */
  identifier: string;
  /** Status of the login attempt */
  status: LoginAttemptStatus;
  /** IP address of the client */
  ipAddress: string;
  /** User agent string from the client */
  userAgent: string;
  /** Timestamp of the login attempt */
  timestamp: Date;
  /** Failure reason if the attempt failed */
  failureReason?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Account lock interface
 * Represents a locked account state
 */
export interface AccountLock {
  /** Unique identifier for the lock */
  id: string;
  /** User ID associated with the lock */
  userId: string;
  /** Reason for the lock */
  reason: LockReason;
  /** Severity level of the lock */
  lockLevel: LockLevel;
  /** Timestamp when the account was locked */
  lockedAt: Date;
  /** Timestamp when the lock expires */
  expiresAt: Date;
  /** Timestamp when the account was unlocked (null if still locked) */
  unlockedAt?: Date;
  /** Additional details about the lock */
  details?: Record<string, unknown>;
}

/**
 * Security event interface
 * Tracks security-related events for auditing
 */
export interface SecurityEvent {
  /** Unique identifier for the event */
  id: string;
  /** User ID associated with the event */
  userId: string;
  /** Type of security event */
  eventType:
    | 'LOGIN_SUCCESS'
    | 'LOGIN_FAILURE'
    | 'ACCOUNT_LOCKED'
    | 'ACCOUNT_UNLOCKED'
    | 'PASSWORD_CHANGED'
    | 'PASSWORD_RESET'
    | 'MFA_VERIFIED'
    | 'MFA_FAILED'
    | 'SESSION_CREATED'
    | 'SESSION_REVOKED'
    | 'IP_BLOCKED'
    | 'SUSPICIOUS_ACTIVITY';
  /** IP address where the event originated */
  ipAddress: string;
  /** User agent string */
  userAgent: string;
  /** Timestamp of the event */
  timestamp: Date;
  /** Additional details about the event */
  details?: Record<string, unknown>;
}

/**
 * Login attempt filter interface
 * Used for filtering login attempts in lists
 */
export interface LoginAttemptFilter {
  /** Filter by user ID */
  userId?: string;
  /** Filter by identifier (email/username) */
  identifier?: string;
  /** Filter by status */
  status?: LoginAttemptStatus;
  /** Filter by IP address */
  ipAddress?: string;
  /** Filter by date range - from */
  fromDate?: Date;
  /** Filter by date range - to */
  toDate?: Date;
}

/**
 * Login attempt statistics interface
 * Statistical data about login attempts
 */
export interface LoginAttemptStatistics {
  /** Total number of login attempts */
  totalAttempts: number;
  /** Number of successful attempts */
  successfulAttempts: number;
  /** Number of failed attempts */
  failedAttempts: number;
  /** Number of blocked attempts */
  blockedAttempts: number;
  /** Success rate percentage */
  successRate: number;
  /** Failed attempts by IP address */
  attemptsByIp: Record<string, number>;
  /** Failed attempts by identifier (email/username) */
  attemptsByIdentifier: Record<string, number>;
  /** Timestamp when statistics were calculated */
  calculatedAt: Date;
}

/**
 * Account lock filter interface
 * Used for filtering account locks in lists
 */
export interface AccountLockFilter {
  /** Filter by user ID */
  userId?: string;
  /** Filter by lock reason */
  reason?: LockReason;
  /** Filter by lock level */
  lockLevel?: LockLevel;
  /** Filter by lock status (active/expired/unlocked) */
  status?: 'ACTIVE' | 'EXPIRED' | 'UNLOCKED';
  /** Filter by date range - from */
  fromDate?: Date;
  /** Filter by date range - to */
  toDate?: Date;
}

/**
 * Account unlock request interface
 * Used when unlocking an account
 */
export interface AccountUnlockRequest {
  /** User ID of the account to unlock */
  userId: string;
  /** Reason for unlocking */
  reason: string;
  /** Admin ID who is performing the unlock */
  adminId?: string;
  /** Additional notes */
  notes?: string;
}

/**
 * Account lock request interface
 * Used when manually locking an account
 */
export interface AccountLockRequest {
  /** User ID of the account to lock */
  userId: string;
  /** Reason for locking */
  reason: LockReason;
  /** Lock level */
  lockLevel: LockLevel;
  /** Duration of lock in minutes (null for permanent) */
  durationMinutes?: number;
  /** Admin ID who is performing the lock */
  adminId?: string;
  /** Additional notes */
  notes?: string;
}

/**
 * Security event filter interface
 * Used for filtering security events in lists
 */
export interface SecurityEventFilter {
  /** Filter by user ID */
  userId?: string;
  /** Filter by event type */
  eventType?: SecurityEvent['eventType'];
  /** Filter by IP address */
  ipAddress?: string;
  /** Filter by date range - from */
  fromDate?: Date;
  /** Filter by date range - to */
  toDate?: Date;
}

/**
 * Login attempt response interface
 * Response when querying login attempts
 */
export interface LoginAttemptResponse {
  /** List of login attempts */
  attempts: LoginAttempt[];
  /** Total number of attempts matching the query */
  total: number;
  /** Current page number */
  page: number;
  /** Number of attempts per page */
  limit: number;
}

/**
 * Account lock response interface
 * Response when querying account locks
 */
export interface AccountLockResponse {
  /** List of account locks */
  locks: AccountLock[];
  /** Total number of locks matching the query */
  total: number;
  /** Current page number */
  page: number;
  /** Number of locks per page */
  limit: number;
}

/**
 * Security event response interface
 * Response when querying security events
 */
export interface SecurityEventResponse {
  /** List of security events */
  events: SecurityEvent[];
  /** Total number of events matching the query */
  total: number;
  /** Current page number */
  page: number;
  /** Number of events per page */
  limit: number;
}

/**
 * Login attempt rate limit interface
 * Used for tracking rate limiting for login attempts
 */
export interface LoginRateLimit {
  /** User ID or identifier being rate limited */
  identifier: string;
  /** Number of attempts in the current window */
  attemptCount: number;
  /** Maximum allowed attempts in the window */
  maxAttempts: number;
  /** Window start timestamp */
  windowStart: Date;
  /** Window end timestamp */
  windowEnd: Date;
  /** Whether the identifier is currently blocked */
  isBlocked: boolean;
  /** Block expiry timestamp if blocked */
  blockExpiry?: Date;
}
