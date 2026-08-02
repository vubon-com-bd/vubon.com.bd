/**
 * Account lock-related type definitions for the monorepo
 * All account lock types are centralized here for consistent usage across packages
 */

/**
 * Lock level types
 * Represents the severity level of an account lock
 */
export type LockLevel = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'PERMANENT';

/**
 * Lock reason types
 * Specific reasons why an account was locked
 */
export type LockReason =
  | 'TOO_MANY_ATTEMPTS'
  | 'SUSPICIOUS_ACTIVITY'
  | 'ADMIN_ACTION'
  | 'PASSWORD_EXPIRED'
  | 'MFA_FAILED'
  | 'IP_BLOCKED'
  | 'DEVICE_UNTRUSTED'
  | 'SECURITY_BREACH'
  | 'ACCOUNT_COMPROMISED';

/**
 * Account lock interface
 * Represents a locked account record
 */
export interface AccountLock {
  /** Unique identifier for the lock record */
  id: string;
  /** User ID of the locked account */
  userId: string;
  /** Reason for the lock */
  reason: LockReason;
  /** Lock level severity */
  lockLevel: LockLevel;
  /** Timestamp when the lock was applied */
  lockedAt: Date;
  /** Timestamp when the lock expires (null for permanent) */
  expiresAt: Date | null;
  /** Timestamp when the lock was removed (null if still locked) */
  unlockedAt: Date | null;
  /** Admin ID who applied the lock (if applicable) */
  appliedByAdminId?: string;
  /** Admin ID who removed the lock (if applicable) */
  removedByAdminId?: string;
  /** Additional details about the lock */
  details?: Record<string, unknown>;
  /** Number of failed attempts that triggered this lock */
  failedAttempts: number;
  /** Whether the lock is currently active */
  isActive: boolean;
}

/**
 * Account lock request interface
 * Used when locking an account
 */
export interface AccountLockRequest {
  /** User ID of the account to lock */
  userId: string;
  /** Reason for locking the account */
  reason: LockReason;
  /** Lock level severity */
  lockLevel?: LockLevel;
  /** Duration of the lock in minutes (null for permanent) */
  durationMinutes?: number | null;
  /** Admin ID who is applying the lock */
  adminId?: string;
  /** Additional details about the lock */
  details?: Record<string, unknown>;
}

/**
 * Account unlock request interface
 * Used when unlocking an account
 */
export interface AccountUnlockRequest {
  /** User ID of the account to unlock */
  userId: string;
  /** Reason for unlocking the account */
  reason?: string;
  /** Admin ID who is removing the lock */
  adminId?: string;
  /** Additional details about the unlock */
  details?: Record<string, unknown>;
}

/**
 * Account lock response interface
 * Response returned after locking an account
 */
export interface AccountLockResponse {
  /** Whether the lock was successful */
  success: boolean;
  /** Lock record if successful */
  lock?: AccountLock;
  /** Error message if failed */
  error?: string;
  /** Error code for client-side handling */
  errorCode?: string;
}

/**
 * Account lock status interface
 * Current lock status of an account
 */
export interface AccountLockStatus {
  /** User ID of the account */
  userId: string;
  /** Whether the account is locked */
  isLocked: boolean;
  /** Current lock reason if locked */
  reason?: LockReason;
  /** Current lock level if locked */
  lockLevel?: LockLevel;
  /** Lock expiry timestamp if temporary */
  expiresAt?: Date | null;
  /** Time remaining in seconds if temporary */
  remainingSeconds?: number;
  /** Number of failed attempts that caused the lock */
  failedAttempts: number;
  /** Whether the lock can be manually overridden */
  canBeOverridden: boolean;
}

/**
 * Security event types
 * Represents different types of security events
 */
export type SecurityEventType =
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILURE'
  | 'ACCOUNT_LOCKED'
  | 'ACCOUNT_UNLOCKED'
  | 'PASSWORD_CHANGED'
  | 'PASSWORD_RESET_REQUESTED'
  | 'PASSWORD_RESET_COMPLETED'
  | 'EMAIL_CHANGED'
  | 'MFA_ENABLED'
  | 'MFA_DISABLED'
  | 'MFA_VERIFIED'
  | 'MFA_FAILED'
  | 'SUSPICIOUS_ACTIVITY'
  | 'IP_BLOCKED'
  | 'IP_UNBLOCKED'
  | 'DEVICE_TRUSTED'
  | 'DEVICE_UNTRUSTED'
  | 'SESSION_REVOKED'
  | 'SESSION_TERMINATED'
  | 'ADMIN_ACTION';

/**
 * Security event interface
 * Represents a security-related event in the system
 */
export interface SecurityEvent {
  /** Unique identifier for the security event */
  id: string;
  /** User ID associated with the event (null for system events) */
  userId: string | null;
  /** Type of security event */
  eventType: SecurityEventType;
  /** IP address where the event originated */
  ipAddress: string;
  /** User agent of the client */
  userAgent: string;
  /** Session ID if applicable */
  sessionId?: string;
  /** Device ID if applicable */
  deviceId?: string;
  /** Timestamp of the event */
  timestamp: Date;
  /** Additional details about the event */
  details?: Record<string, unknown>;
  /** Severity level of the event */
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
}

/**
 * Security event filter interface
 * Used for filtering security events in lists
 */
export interface SecurityEventFilter {
  /** Filter by user ID */
  userId?: string;
  /** Filter by event type */
  eventType?: SecurityEventType;
  /** Filter by IP address */
  ipAddress?: string;
  /** Filter by severity */
  severity?: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  /** Filter by date range - from */
  fromDate?: Date;
  /** Filter by date range - to */
  toDate?: Date;
  /** Filter by session ID */
  sessionId?: string;
  /** Search term for details */
  search?: string;
}

/**
 * Security event list response interface
 * Paginated list of security events
 */
export interface SecurityEventListResponse {
  /** Array of security events */
  events: SecurityEvent[];
  /** Total number of events */
  total: number;
  /** Current page number */
  page: number;
  /** Number of events per page */
  limit: number;
  /** Total number of pages */
  totalPages: number;
}

/**
 * Security event statistics interface
 * Statistical data about security events
 */
export interface SecurityEventStatistics {
  /** Total number of security events */
  totalEvents: number;
  /** Events by type */
  eventsByType: Record<SecurityEventType, number>;
  /** Events by severity */
  eventsBySeverity: Record<'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL', number>;
  /** Events by IP address (top 10) */
  topIpAddresses: Array<{
    ipAddress: string;
    count: number;
  }>;
  /** Events by user (top 10) */
  topUsers: Array<{
    userId: string;
    count: number;
  }>;
  /** Events in the last 24 hours */
  recentEvents: number;
  /** Events with critical severity in the last 7 days */
  criticalEvents: number;
  /** Timestamp when statistics were calculated */
  calculatedAt: Date;
}

/**
 * Account lock configuration interface
 * Configuration for account lock management
 */
export interface AccountLockConfig {
  /** Maximum failed attempts before lock */
  maxFailedAttempts: number;
  /** Time window for counting attempts in minutes */
  attemptWindowMinutes: number;
  /** Lock duration for LEVEL_1 in minutes */
  level1LockDurationMinutes: number;
  /** Lock duration for LEVEL_2 in minutes */
  level2LockDurationMinutes: number;
  /** Lock duration for LEVEL_3 in minutes */
  level3LockDurationMinutes: number;
  /** Whether permanent lock is allowed */
  allowPermanentLock: boolean;
  /** Whether admins can override locks */
  adminOverrideAllowed: boolean;
  /** Whether to notify users on account lock */
  notifyOnLock: boolean;
  /** Whether to notify users on account unlock */
  notifyOnUnlock: boolean;
  /** Whether to log all security events */
  logAllEvents: boolean;
}

/**
 * Account lock history interface
 * History of locks and unlocks for an account
 */
export interface AccountLockHistory {
  /** User ID of the account */
  userId: string;
  /** Array of lock records */
  locks: AccountLock[];
  /** Total number of locks */
  totalLocks: number;
  /** Number of active locks */
  activeLocks: number;
  /** First lock timestamp */
  firstLockAt?: Date;
  /** Last lock timestamp */
  lastLockAt?: Date;
  /** Last unlock timestamp */
  lastUnlockAt?: Date;
}

/**
 * Account lock audit interface
 * Audit trail for account lock operations
 */
export interface AccountLockAudit {
  /** Unique identifier for the audit record */
  id: string;
  /** User ID of the affected account */
  userId: string;
  /** Operation performed (LOCK, UNLOCK, OVERRIDE) */
  operation: 'LOCK' | 'UNLOCK' | 'OVERRIDE';
  /** Reason for the operation */
  reason: string;
  /** Admin ID who performed the operation */
  adminId?: string;
  /** Timestamp of the operation */
  performedAt: Date;
  /** IP address of the admin */
  ipAddress?: string;
  /** Additional details */
  details?: Record<string, unknown>;
}
