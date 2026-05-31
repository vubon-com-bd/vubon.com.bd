/**
 * Account Lock Entity - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/account-lock.entity
 * 
 * @description
 * Represents account lock state with progressive locking based on failure count.
 * Used for brute force protection and security policy enforcement.
 * 
 * Enterprise Rules:
 * ✅ Progressive lock durations (15m -> 1h -> 24h -> permanent)
 * ✅ Auto-lock after configurable failure threshold
 * ✅ Domain events for audit trail
 * ✅ Framework-free, pure domain logic
 * ✅ Bangladesh specific - SIM swap detection support
 */

import { BaseEntity, EntityValidationError, type IdGenerator } from './base.entity';

// ==================== Enums ====================

/**
 * Account lock reasons
 */
export enum AccountLockReason {
  FAILED_LOGIN_ATTEMPTS = 'FAILED_LOGIN_ATTEMPTS',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  ADMIN_ACTION = 'ADMIN_ACTION',
  POLICY_VIOLATION = 'POLICY_VIOLATION',
  BRUTE_FORCE_DETECTED = 'BRUTE_FORCE_DETECTED',
  SIM_SWAP_DETECTED = 'SIM_SWAP_DETECTED',  // Bangladesh specific
  PAYMENT_FRAUD_SUSPECTED = 'PAYMENT_FRAUD_SUSPECTED',
  ACCOUNT_TAKEOVER_ATTEMPT = 'ACCOUNT_TAKEOVER_ATTEMPT',
}

/**
 * Lock level (progressive)
 */
export enum LockLevel {
  LEVEL_1 = 1,  // 15 minutes
  LEVEL_2 = 2,  // 1 hour
  LEVEL_3 = 3,  // 24 hours
  LEVEL_4 = 4,  // Permanent (admin unlock only)
}

/**
 * Domain event types for account lock
 */
export enum AccountLockEventType {
  ACCOUNT_LOCKED = 'account.locked',
  ACCOUNT_UNLOCKED = 'account.unlocked',
  ACCOUNT_LOCK_FAILURE = 'account.lock.failure',
  ACCOUNT_LOCK_PROGRESSIVE = 'account.lock.progressive',
  ACCOUNT_LOCK_WARNING = 'account.lock.warning',
}

// ==================== Types ====================

/**
 * Lock duration configuration
 */
export interface LockDurationConfig {
  level: LockLevel;
  durationMs: number | null;
  description: string;
}

/**
 * Progressive lock configuration
 */
export interface ProgressiveLockConfig {
  maxFailureCount: number;
  levels: LockDurationConfig[];
}

// ==================== Constants ====================

/**
 * Lock configuration constants
 */
const LOCK_CONFIG = {
  // Failure threshold
  MAX_FAILURE_COUNT: 5,
  
  // Progressive lock durations (milliseconds)
  PROGRESSIVE_DURATIONS: [
    15 * 60 * 1000,     // Level 1: 15 minutes
    60 * 60 * 1000,     // Level 2: 1 hour
    24 * 60 * 60 * 1000, // Level 3: 24 hours
    null,               // Level 4: Permanent (admin unlock only)
  ],
  
  // Lock durations by reason (for manual locks)
  REASON_DURATIONS: {
    [AccountLockReason.FAILED_LOGIN_ATTEMPTS]: 15 * 60 * 1000,
    [AccountLockReason.SUSPICIOUS_ACTIVITY]: 60 * 60 * 1000,
    [AccountLockReason.POLICY_VIOLATION]: 24 * 60 * 60 * 1000,
    [AccountLockReason.ADMIN_ACTION]: null,
    [AccountLockReason.BRUTE_FORCE_DETECTED]: 24 * 60 * 60 * 1000,
    [AccountLockReason.SIM_SWAP_DETECTED]: 48 * 60 * 60 * 1000, // 48 hours
    [AccountLockReason.PAYMENT_FRAUD_SUSPECTED]: 72 * 60 * 60 * 1000, // 72 hours
    [AccountLockReason.ACCOUNT_TAKEOVER_ATTEMPT]: 24 * 60 * 60 * 1000,
  },
  
  // Warning threshold (send warning when attempts reach this count)
  WARNING_THRESHOLD: 3,
} as const;

// ==================== Account Lock Entity ====================

/**
 * Account Lock Entity
 * 
 * Tracks account lock state with progressive duration based on lock count
 */
export class AccountLock extends BaseEntity {
  private _userId: string;
  private _reason: AccountLockReason;
  private _lockedAt: Date;
  private _unlockedAt: Date | undefined;
  private _failureCount: number;
  private _lockedUntil: Date | undefined;
  private _lockLevel: LockLevel;
  private _lockedBy: string | undefined;
  private _unlockedBy: string | undefined;
  private _unlockReason: string | undefined;
  private _metadata: Record<string, unknown> | undefined;

  private constructor(
    id: string,
    userId: string,
    reason: AccountLockReason,
    lockedAt: Date,
    unlockedAt: Date | undefined,
    failureCount: number,
    lockedUntil: Date | undefined,
    lockLevel: LockLevel,
    lockedBy: string | undefined,
    unlockedBy: string | undefined,
    unlockReason: string | undefined,
    metadata: Record<string, unknown> | undefined,
    createdAt: Date,
    updatedAt: Date,
    version: number
  ) {
    super({ id, createdAt, updatedAt, version });
    
    this._userId = userId;
    this._reason = reason;
    this._lockedAt = lockedAt;
    this._unlockedAt = unlockedAt;
    this._failureCount = failureCount;
    this._lockedUntil = lockedUntil;
    this._lockLevel = lockLevel;
    this._lockedBy = lockedBy;
    this._unlockedBy = unlockedBy;
    this._unlockReason = unlockReason;
    this._metadata = metadata;
    
    this.validate();
  }

  /**
   * Validate entity invariants
   */
  protected validate(): void {
    if (!this._userId) {
      throw new EntityValidationError('Account lock requires a user ID');
    }
    if (this._failureCount < 0) {
      throw new EntityValidationError('Failure count cannot be negative');
    }
    if (this._lockLevel < LockLevel.LEVEL_1 || this._lockLevel > LockLevel.LEVEL_4) {
      throw new EntityValidationError('Invalid lock level');
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Factory method to create a new account lock
   */
  public static create(
    userId: string,
    reason: AccountLockReason,
    failureCount: number = 0,
    lockedBy?: string,
    metadata?: Record<string, unknown>,
    idGenerator?: IdGenerator
  ): AccountLock {
    const now = new Date();
    const lockLevel = LockLevel.LEVEL_1;
    const duration = LOCK_CONFIG.REASON_DURATIONS[reason];
    const lockedUntil = duration ? new Date(now.getTime() + duration) : undefined;
    const lockId = idGenerator ? idGenerator.generate() : generateLockId();
    
    const lock = new AccountLock(
      lockId,
      userId,
      reason,
      lockedUntil ? now : new Date(),
      undefined,
      failureCount,
      lockedUntil,
      lockLevel,
      lockedBy,
      undefined,
      undefined,
      metadata,
      now,
      now,
      1
    );
    
    lock.addDomainEvent({
      eventId: generateEventId(),
      eventType: AccountLockEventType.ACCOUNT_LOCKED,
      aggregateId: lock.id,
      occurredOn: now,
      version: 1,
      metadata: {
        userId: lock._userId,
        reason: lock._reason,
        lockLevel: lock._lockLevel,
        duration: duration,
        lockedBy,
      },
    });
    
    return lock;
  }

  /**
   * Reconstitute from persistence
   */
  public static reconstitute(data: {
    id: string;
    userId: string;
    reason: AccountLockReason;
    lockedAt: Date;
    unlockedAt?: Date;
    failureCount: number;
    lockedUntil?: Date;
    lockLevel: LockLevel;
    lockedBy?: string;
    unlockedBy?: string;
    unlockReason?: string;
    metadata?: Record<string, unknown>;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }): AccountLock {
    return new AccountLock(
      data.id,
      data.userId,
      data.reason,
      data.lockedAt,
      data.unlockedAt,
      data.failureCount,
      data.lockedUntil,
      data.lockLevel,
      data.lockedBy,
      data.unlockedBy,
      data.unlockReason,
      data.metadata,
      data.createdAt,
      data.updatedAt,
      data.version
    );
  }

  // ============================================================
  // Private Helpers
  // ============================================================

  /**
   * Get progressive lock duration based on lock level
   */
  private static getProgressiveDuration(lockLevel: LockLevel): number | null {
    const index = lockLevel - 1;
    if (index >= LOCK_CONFIG.PROGRESSIVE_DURATIONS.length) {
      return LOCK_CONFIG.PROGRESSIVE_DURATIONS[LOCK_CONFIG.PROGRESSIVE_DURATIONS.length - 1];
    }
    return LOCK_CONFIG.PROGRESSIVE_DURATIONS[index];
  }

  /**
   * Get next lock level based on current level
   */
  private getNextLockLevel(): LockLevel {
    if (this._lockLevel === LockLevel.LEVEL_4) {
      return LockLevel.LEVEL_4;
    }
    return this._lockLevel + 1;
  }

  /**
   * Check if warning should be sent
   */
  public shouldSendWarning(): boolean {
    return !this.isLocked() && 
           this._failureCount >= LOCK_CONFIG.WARNING_THRESHOLD &&
           this._failureCount < LOCK_CONFIG.MAX_FAILURE_COUNT;
  }

  // ============================================================
  // Business Methods
  // ============================================================

  /**
   * Increment failure count and auto-lock if threshold exceeded
   * 
   * @returns Current failure count
   * @throws {Error} If account is currently locked and not expired
   */
  public incrementFailure(): number {
    // If locked and not expired, cannot increment
    if (this.isLocked() && !this.isLockExpired()) {
      throw new EntityValidationError('Account is currently locked');
    }
    
    // If lock expired, reset state
    if (this.isLocked() && this.isLockExpired()) {
      this._lockedUntil = undefined;
      this._unlockedAt = undefined;
      // Don't reset failure count immediately - progressive locking
    }
    
    this._failureCount++;
    this.touch();
    
    // Send warning if threshold reached
    if (this.shouldSendWarning()) {
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: AccountLockEventType.ACCOUNT_LOCK_WARNING,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this._userId,
          currentAttempts: this._failureCount,
          remainingAttempts: this.getRemainingAttempts(),
          nextLockLevel: this.getNextLockLevel(),
        },
      });
    }
    
    // Auto-lock after threshold
    if (this._failureCount >= LOCK_CONFIG.MAX_FAILURE_COUNT && !this.isLocked()) {
      this.lockWithProgressiveDuration();
    }
    
    // Add failure event
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: AccountLockEventType.ACCOUNT_LOCK_FAILURE,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        failureCount: this._failureCount,
        remainingAttempts: this.getRemainingAttempts(),
      },
    });
    
    return this._failureCount;
  }

  /**
   * Lock account with progressive duration
   */
  private lockWithProgressiveDuration(): void {
    const newLockLevel = this.getNextLockLevel();
    const duration = AccountLock.getProgressiveDuration(newLockLevel);
    
    this._lockedUntil = duration ? new Date(Date.now() + duration) : undefined;
    this._reason = AccountLockReason.FAILED_LOGIN_ATTEMPTS;
    this._lockedAt = new Date();
    this._unlockedAt = undefined;
    this._lockLevel = newLockLevel;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: AccountLockEventType.ACCOUNT_LOCKED,
      aggregateId: this.id,
      occurredOn: this._lockedAt,
      version: this.version,
      metadata: {
        userId: this._userId,
        reason: this._reason,
        lockLevel: this._lockLevel,
        duration: duration,
      },
    });
    
    if (this._lockLevel > LockLevel.LEVEL_1) {
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: AccountLockEventType.ACCOUNT_LOCK_PROGRESSIVE,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this._userId,
          lockLevel: this._lockLevel,
          previousFailureCount: this._failureCount,
        },
      });
    }
  }

  /**
   * Lock account manually (admin or security)
   */
  public lock(reason: AccountLockReason, duration?: number, lockedBy?: string, metadata?: Record<string, unknown>): void {
    if (this.isLocked() && !this.isLockExpired()) {
      throw new EntityValidationError('Account already locked');
    }
    
    const lockDuration = duration ?? LOCK_CONFIG.REASON_DURATIONS[reason];
    this._lockedUntil = lockDuration ? new Date(Date.now() + lockDuration) : undefined;
    this._reason = reason;
    this._lockedAt = new Date();
    this._unlockedAt = undefined;
    this._lockedBy = lockedBy;
    this._metadata = metadata;
    
    // Set lock level based on duration
    if (this._lockedUntil === null || this._lockedUntil === undefined) {
      this._lockLevel = LockLevel.LEVEL_4;
    } else {
      const durationMs = this._lockedUntil.getTime() - this._lockedAt.getTime();
      if (durationMs >= 24 * 60 * 60 * 1000) {
        this._lockLevel = LockLevel.LEVEL_3;
      } else if (durationMs >= 60 * 60 * 1000) {
        this._lockLevel = LockLevel.LEVEL_2;
      } else {
        this._lockLevel = LockLevel.LEVEL_1;
      }
    }
    
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: AccountLockEventType.ACCOUNT_LOCKED,
      aggregateId: this.id,
      occurredOn: this._lockedAt,
      version: this.version,
      metadata: {
        userId: this._userId,
        reason: this._reason,
        lockLevel: this._lockLevel,
        lockedBy,
        isManual: true,
        duration,
      },
    });
  }

  /**
   * Unlock account
   */
  public unlock(unlockedBy?: string, reason?: string): void {
    if (!this.isLocked()) {
      throw new EntityValidationError('Account is not locked');
    }
    
    this._unlockedAt = new Date();
    this._lockedUntil = undefined;
    this._unlockedBy = unlockedBy;
    this._unlockReason = reason;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: AccountLockEventType.ACCOUNT_UNLOCKED,
      aggregateId: this.id,
      occurredOn: this._unlockedAt,
      version: this.version,
      metadata: {
        userId: this._userId,
        unlockedBy,
        reason,
        wasLockedFor: this._lockedAt.getTime(),
        lockLevel: this._lockLevel,
      },
    });
  }

  /**
   * Reset failure count (after successful login)
   */
  public resetFailureCount(): void {
    if (this.isLocked()) {
      throw new EntityValidationError('Cannot reset failure count while account is locked');
    }
    
    const previousCount = this._failureCount;
    this._failureCount = 0;
    this.touch();
    
    if (previousCount > 0) {
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: AccountLockEventType.ACCOUNT_LOCK_FAILURE,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this._userId,
          previousFailureCount: previousCount,
          action: 'reset',
        },
      });
    }
  }

  // ============================================================
  // Query Methods
  // ============================================================

  /**
   * Get remaining lock time in milliseconds
   */
  public getRemainingLockTime(): number {
    if (!this._lockedUntil) return 0;
    if (this._unlockedAt) return 0;
    const remaining = this._lockedUntil.getTime() - Date.now();
    return remaining > 0 ? remaining : 0;
  }

  /**
   * Get remaining lock time in human-readable format
   */
  public getRemainingLockTimeFormatted(): string {
    const ms = this.getRemainingLockTime();
    if (ms <= 0) return '0 minutes';
    
    const minutes = Math.ceil(ms / (60 * 1000));
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) return `${hours} hour${hours !== 1 ? 's' : ''}`;
    
    return `${hours} hour${hours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
  }

  /**
   * Check if account is locked
   */
  public isLocked(): boolean {
    return this._lockedUntil !== undefined && !this._unlockedAt;
  }

  /**
   * Check if lock has expired
   */
  public isLockExpired(): boolean {
    if (!this._lockedUntil) return false;
    if (this._unlockedAt) return true;
    return Date.now() > this._lockedUntil.getTime();
  }

  /**
   * Check if lock is permanent (admin action)
   */
  public isPermanentLock(): boolean {
    return this.isLocked() && this._lockedUntil === null;
  }

  /**
   * Get lock severity level (1-4)
   */
  public getLockSeverity(): number {
    if (!this.isLocked()) return 0;
    if (this.isPermanentLock()) return 4;
    const remainingHours = this.getRemainingLockTime() / (60 * 60 * 1000);
    if (remainingHours >= 24) return 3;
    if (remainingHours >= 1) return 2;
    return 1;
  }

  /**
   * Get remaining attempts before lock
   */
  public getRemainingAttempts(): number {
    if (this.isLocked()) return 0;
    return Math.max(0, LOCK_CONFIG.MAX_FAILURE_COUNT - this._failureCount);
  }

  /**
   * Check if account is at risk (close to lock)
   */
  public isAtRisk(): boolean {
    return !this.isLocked() && this._failureCount >= LOCK_CONFIG.MAX_FAILURE_COUNT - 2;
  }

  // ============================================================
  // Getters
  // ============================================================

  public getUserId(): string { return this._userId; }
  public getReason(): AccountLockReason { return this._reason; }
  public getLockedAt(): Date { return new Date(this._lockedAt); }
  public getUnlockedAt(): Date | undefined { return this._unlockedAt ? new Date(this._unlockedAt) : undefined; }
  public getFailureCount(): number { return this._failureCount; }
  public getLockedUntil(): Date | undefined { return this._lockedUntil ? new Date(this._lockedUntil) : undefined; }
  public getLockLevel(): LockLevel { return this._lockLevel; }
  public getLockedBy(): string | undefined { return this._lockedBy; }
  public getUnlockedBy(): string | undefined { return this._unlockedBy; }
  public getUnlockReason(): string | undefined { return this._unlockReason; }
  public getMetadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  // ============================================================
  // JSON Serialization
  // ============================================================

  /**
   * Convert to JSON serializable object
   */
  public toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      userId: this._userId,
      reason: this._reason,
      lockedAt: this._lockedAt.toISOString(),
      unlockedAt: this._unlockedAt?.toISOString(),
      failureCount: this._failureCount,
      lockedUntil: this._lockedUntil?.toISOString(),
      lockLevel: this._lockLevel,
      lockedBy: this._lockedBy,
      unlockedBy: this._unlockedBy,
      unlockReason: this._unlockReason,
      isLocked: this.isLocked(),
      isLockExpired: this.isLockExpired(),
      isPermanent: this.isPermanentLock(),
      remainingLockTime: this.getRemainingLockTime(),
      remainingLockTimeFormatted: this.getRemainingLockTimeFormatted(),
      remainingAttempts: this.getRemainingAttempts(),
      isAtRisk: this.isAtRisk(),
      lockSeverity: this.getLockSeverity(),
    };
  }
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * Generate lock ID (pure domain function)
 */
function generateLockId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 11);
  return `lock_${timestamp}_${random}`;
}

/**
 * Generate event ID (pure domain function)
 */
function generateEventId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  const counter = (generateEventId.counter = (generateEventId.counter || 0) + 1);
  return `evt_${timestamp}_${random}_${counter}`;
}

namespace generateEventId {
  export let counter = 0;
}

// ============================================================
// Type Exports
// ============================================================

export type { LockDurationConfig, ProgressiveLockConfig };
