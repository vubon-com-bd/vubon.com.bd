/**
 * Account Lock Types - Pure TypeScript type contracts for Account Locking
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-types/auth/account-lock.types
 *
 * RULES:
 * ✅ ONLY type declarations, interfaces, unions
 * ✅ NO lock enforcement logic, rate limiting implementation
 * ✅ NO functions, classes, enums
 * ✅ NO validation schemas (Zod)
 * ✅ NO framework imports
 */

import type { ACCOUNT_LOCKOUT } from '@vubon/shared-constants';

// ============================================================
// Lock Level Types (Progressive lockout - Bangladesh specific)
// ============================================================
export type LockLevel = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'LEVEL_4' | 'permanent';

// Lock level configuration interface
export interface LockLevelConfig {
  readonly level: LockLevel;
  readonly maxAttempts: number;
  readonly durationSeconds: number;
}

// LOCKOUT_LEVELS from constants (type-only)
export type LOCKOUT_LEVELS_TYPE = typeof ACCOUNT_LOCKOUT.LOCKOUT_LEVELS;
export type LockoutLevelKey = keyof LOCKOUT_LEVELS_TYPE;

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
// Lock Level Configuration (based on constants)
// ============================================================
export const LOCKOUT_LEVELS_CONFIG: Record<Exclude<LockLevel, 'permanent'>, LockLevelConfig> = {
  LEVEL_1: { level: 'LEVEL_1', maxAttempts: 5, durationSeconds: 300 },
  LEVEL_2: { level: 'LEVEL_2', maxAttempts: 10, durationSeconds: 900 },
  LEVEL_3: { level: 'LEVEL_3', maxAttempts: 15, durationSeconds: 3600 },
  LEVEL_4: { level: 'LEVEL_4', maxAttempts: 20, durationSeconds: 86400 },
};

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
  readonly totalFailedAttempts?: number;
  readonly lastFailedAttemptAt?: Date;
  readonly adminNotes?: string;
  readonly ticketId?: string;
  readonly escalationHistory?: ReadonlyArray<LockEscalationEvent>;

  // Bangladesh specific
  readonly mobileOperator?: string;
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
  readonly nextLockLevel?: LockLevel;
}

// ============================================================
// Lock Account Request (API Request DTO)
// ============================================================
export interface LockAccountRequest {
  readonly userId: string;
  readonly reason: LockReason;
  readonly durationSeconds?: number;
  readonly lockLevel?: LockLevel;
  readonly adminNotes?: string;
  readonly adminId?: string;
  readonly notifyUser?: boolean;
  readonly notifyReason?: string;
}

// ============================================================
// Unlock Account Request (API Request DTO)
// ============================================================
export interface UnlockAccountRequest {
  readonly userId: string;
  readonly reason: string;
  readonly adminId: string;
  readonly notifyUser?: boolean;
  readonly resetAttemptCount?: boolean;
}

// ============================================================
// Account Lock History Response (User lock history DTO)
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
  readonly permanentLockAfter: number;
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
  readonly isSuspiciousTime?: boolean;
  readonly isWeekend?: boolean;
  readonly locationChanged?: boolean;
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
  readonly performedBy: string;
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
  readonly mostLockedDistrict?: string;
  readonly topLockedIPs?: ReadonlyArray<{ ip: string; count: number }>;
  readonly recentLockEvents: ReadonlyArray<LockAuditLogEntry>;
  readonly updatedAt: Date;
}

// ============================================================
// Derived types from constants
// ============================================================
export type ProgressiveLockoutLevel = keyof typeof LOCKOUT_LEVELS_CONFIG;

export interface ProgressiveLockoutConfig {
  readonly attempts: number;
  readonly duration: number;
}

// ============================================================
// Smart Lock Detection (Bangladesh specific)
// ============================================================
export interface SmartLockDetectionResult {
  readonly shouldLock: boolean;
  readonly confidence: number;
  readonly reasons: ReadonlyArray<string>;
  readonly suggestedLockLevel?: LockLevel;
  readonly suggestedDurationSeconds?: number;
}

export interface UnusualPattern {
  readonly patternType: 'rapid_attempts' | 'multiple_ips' | 'multiple_devices' | 'unusual_hours' | 'unusual_location';
  readonly severity: 'low' | 'medium' | 'high' | 'critical';
  readonly details: Record<string, unknown>;
}
