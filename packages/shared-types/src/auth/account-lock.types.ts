/**
 * Account Lock Types - Pure TypeScript type contracts for Account Locking
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/auth-types/auth/account-lock.types
 * 
 * RULES:
 * ✅ ONLY type declarations, interfaces, unions
 * ✅ NO lock enforcement logic, rate limiting implementation
 * ✅ NO functions, classes, enums
 * ✅ NO validation schemas (Zod)
 * ✅ NO framework imports
 */

import type {
  LOCKOUT_LEVELS,
  ACCOUNT_LOCKOUT,
} from '@vubon/auth-constants';

// ============================================================
// Lock Reason Types (Pure union types - NO enums)
// ============================================================
export type LockReason = 
  | 'too_many_failed_attempts'
  | 'suspicious_activity'
  | 'admin_action'
  | 'security_breach'
  | 'temporary_ban'
  | 'permanent_ban'
  | 'sim_swap_detected'          // Bangladesh specific
  | 'payment_fraud_suspected'
  | 'account_takeover_attempt'
  | 'brute_force_detected';

// ============================================================
// Lock Status Types
// ============================================================
export type LockStatus = 
  | 'active'
  | 'expired'
  | 'removed'
  | 'permanent';

// ============================================================
// Lock Level Types (Progressive lockout - Bangladesh specific)
// ============================================================
export type LockLevel = 
  | 'level_1'    // 5 min - First lockout
  | 'level_2'    // 15 min - Second lockout
  | 'level_3'    // 1 hour - Third lockout
  | 'level_4'    // 24 hours - Fourth lockout
  | 'permanent'; // Permanent ban

// Lock level configuration (based on constants)
export interface LockLevelConfig {
  readonly level: LockLevel;
  readonly maxAttempts: number;
  readonly durationSeconds: number;
}

// ============================================================
// Account Lock Entity (Core domain model)
// ============================================================
export interface AccountLock {
  readonly id: string;
  readonly userId: string;
  readonly reason: LockReason;
  readonly status: LockStatus;
  readonly lockLevel: LockLevel;
  readonly lockedAt: Date;
  readonly expiresAt: Date | null;
  readonly unlockedAt: Date | null;
  readonly unlockedBy: string | null;
  readonly unlockReason: string | null;
  readonly metadata: LockMetadata;
}

// ============================================================
// Lock Metadata
// ============================================================
export interface LockMetadata {
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly failedAttemptsCount: number;
  readonly totalFailedAttempts?: number;  // Lifetime failed attempts
  readonly lastFailedAttemptAt?: Date;
  readonly adminNotes?: string;
  readonly ticketId?: string;
  readonly escalationHistory?: ReadonlyArray<LockEscalationEvent>;
  
  // Bangladesh specific
  readonly mobileOperator?: string;  // GP, Robi, Banglalink, Teletalk
  readonly district?: string;
  readonly simSwapDetected?: boolean;
}

// ============================================================
// Lock Escalation Event (Progressive lockout tracking)
// ============================================================
export interface LockEscalationEvent {
  readonly escalatedAt: Date;
  readonly fromLevel: LockLevel;
  readonly toLevel: LockLevel;
  readonly reason: string;
  readonly attemptCount: number;
}

// ============================================================
// Account Lock Status Response (API Response DTO)
// ============================================================
export interface AccountLockStatusResponse {
  readonly isLocked: boolean;
  readonly lockLevel?: LockLevel;
  readonly lockReason?: LockReason;
  readonly lockedAt?: Date;
  readonly expiresAt?: Date | null;
  readonly isPermanent: boolean;
  readonly remainingLockTimeSeconds?: number;
  readonly nextLockLevel?: LockLevel;  // Warning: next lock will be stricter
}

// ============================================================
// Lock Account Request (API Request DTO)
// ============================================================
export interface LockAccountRequest {
  readonly userId: string;
  readonly reason: LockReason;
  readonly durationSeconds?: number;      // null or -1 = permanent
  readonly lockLevel?: LockLevel;         // Auto-calculated if not provided
  readonly adminNotes?: string;
  readonly adminId?: string;              // Who initiated the lock
  readonly notifyUser?: boolean;          // Send notification
  readonly notifyReason?: string;         // User-facing reason
}

// ============================================================
// Unlock Account Request (API Request DTO)
// ============================================================
export interface UnlockAccountRequest {
  readonly userId: string;
  readonly reason: string;
  readonly adminId: string;
  readonly notifyUser?: boolean;
  readonly resetAttemptCount?: boolean;   // Reset failed attempt counter
}

// ============================================================
// Account Lock History (User lock history DTO)
// ============================================================
export interface AccountLockHistoryResponse {
  readonly userId: string;
  readonly locks: ReadonlyArray<AccountLock>;
  readonly totalLocks: number;
  readonly permanentLocks: number;
  readonly temporaryLocks: number;
  readonly lastLockAt: Date | null;
  readonly lastUnlockAt: Date | null;
  readonly lockCountByReason: Partial<Record<LockReason, number>>;
  readonly currentLockLevel: LockLevel;
}

// ============================================================
// Lock Threshold Configuration (Runtime config shape)
// ============================================================
export interface LockThresholdConfig {
  readonly maxFailedAttempts: number;
  readonly lockDurationSeconds: number;
  readonly permanentLockAfter: number;        // Number of locks before permanent
  readonly suspiciousActivityThreshold: number;
  readonly progressiveLockoutEnabled: boolean;
  readonly lockLevels: ReadonlyArray<LockLevelConfig>;
}

// ============================================================
// Failed Attempt Event (Audit & tracking)
// ============================================================
export interface FailedAttemptEvent {
  readonly userId: string;
  readonly timestamp: Date;
  readonly ipAddress: string;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly reason: string;
  readonly attemptNumber: number;
  readonly totalAttemptsToday: number;
  readonly remainingAttemptsBeforeLock: number;
  readonly lockLevel: LockLevel;
  
  // Bangladesh specific
  readonly isSuspiciousTime?: boolean;     // Night time (10 PM - 6 AM)
  readonly isWeekend?: boolean;             // Friday/Saturday
  readonly locationChanged?: boolean;       // Different district/city
}

// ============================================================
// Lock Notification Types (Communication contracts)
// ============================================================
export type LockNotificationType = 
  | 'account_locked'
  | 'account_unlocked'
  | 'suspicious_attempt'
  | 'lock_warning'
  | 'lock_level_escalated'
  | 'permanent_lock_warning';

// Lock notification payload
export interface LockNotificationPayload {
  readonly userId: string;
  readonly type: LockNotificationType;
  readonly reason: string;
  readonly lockLevel?: LockLevel;
  readonly durationSeconds?: number;
  readonly remainingAttempts?: number;
  readonly unlockInstruction?: string;
  readonly supportContact?: string;
}

// ============================================================
// Lock Audit Log Entry (For compliance)
// ============================================================
export interface LockAuditLogEntry {
  readonly id: string;
  readonly userId: string;
  readonly action: 'lock' | 'unlock' | 'escalate' | 'warning_sent';
  readonly reason: LockReason | string;
  readonly lockLevel: LockLevel;
  readonly performedBy: string;        // system | admin_id | user_id
  readonly performedAt: Date;
  readonly ipAddress: string;
  readonly metadata: Record<string, unknown>;
}

// ============================================================
// Bulk Lock/Unlock Operations (Admin features)
// ============================================================
export interface BulkLockRequest {
  readonly userIds: ReadonlyArray<string>;
  readonly reason: LockReason;
  readonly durationSeconds?: number;
  readonly adminNotes?: string;
  readonly adminId: string;
}

export interface BulkUnlockRequest {
  readonly userIds: ReadonlyArray<string>;
  readonly reason: string;
  readonly adminId: string;
}

export interface BulkLockResult {
  readonly totalRequested: number;
  readonly successful: number;
  readonly failed: number;
  readonly failedIds: ReadonlyArray<{ id: string; reason: string }>;
  readonly processedAt: Date;
}

// ============================================================
// Auto-Unlock Schedule (For temporary locks)
// ============================================================
export interface AutoUnlockSchedule {
  readonly lockId: string;
  readonly userId: string;
  readonly scheduledUnlockAt: Date;
  readonly lockLevel: LockLevel;
  readonly status: 'pending' | 'processed' | 'cancelled';
}

// ============================================================
// Lock Dashboard Stats (For admin panel)
// ============================================================
export interface LockDashboardStats {
  readonly totalActiveLocks: number;
  readonly locksByLevel: Record<LockLevel, number>;
  readonly locksByReason: Partial<Record<LockReason, number>>;
  readonly averageLockDurationSeconds: number;
  readonly mostLockedDistrict?: string;      // Bangladesh specific
  readonly topLockedIPs?: ReadonlyArray<{ ip: string; count: number }>;
  readonly recentLockEvents: ReadonlyArray<LockAuditLogEntry>;
  readonly updatedAt: Date;
}

// ============================================================
// Lock Policy Rules (From constants - type only import)
// ============================================================
// Using constants from shared-constants for type safety
export type AccountLockoutConstants = typeof ACCOUNT_LOCKOUT;
export type LockoutLevels = typeof LOCKOUT_LEVELS;

// Derived types from constants
export type ProgressiveLockoutLevel = keyof LockoutLevels;

export interface ProgressiveLockoutConfig {
  readonly attempts: number;
  readonly duration: number;
}

// ============================================================
// Smart Lock Detection (Bangladesh specific)
// ============================================================
export interface SmartLockDetectionResult {
  readonly shouldLock: boolean;
  readonly confidence: number;           // 0-100
  readonly reasons: ReadonlyArray<string>;
  readonly suggestedLockLevel?: LockLevel;
  readonly suggestedDurationSeconds?: number;
}

export interface UnusualPattern {
  readonly patternType: 'rapid_attempts' | 'multiple_ips' | 'multiple_devices' | 'unusual_hours' | 'unusual_location';
  readonly severity: 'low' | 'medium' | 'high' | 'critical';
  readonly details: Record<string, unknown>;
}
