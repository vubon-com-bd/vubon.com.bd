// packages/backend-service/src/auth/module/domain/entities/account-lock.entity.ts
import { randomUUID } from 'crypto';
import { BaseEntity } from './base.entity';

/**
 * Lock level types (progressive lockout)
 */
export type LockLevel = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'PERMANENT';

/**
 * Lock reason types
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
 * Account Lock Entity
 * Represents an account lock due to failed login attempts or security concerns
 * Manages progressive lockout levels and automatic unlocking
 */
export class AccountLock extends BaseEntity {
  private _userId: string;
  private _reason: LockReason;
  private _lockLevel: LockLevel;
  private _lockedAt: Date;
  private _expiresAt: Date | null;
  private _unlockedAt?: Date;
  private _unlockedBy?: string;
  private _unlockReason?: string;
  private _failedAttempts: number;
  private _appliedByAdminId?: string;
  private _removedByAdminId?: string;
  private _details?: Record<string, unknown>;

  private constructor(
    id: string,
    userId: string,
    reason: LockReason,
    lockLevel: LockLevel,
    lockedAt: Date,
    expiresAt: Date | null,
    failedAttempts: number,
    appliedByAdminId?: string,
    unlockedAt?: Date,
    unlockedBy?: string,
    unlockReason?: string,
    removedByAdminId?: string,
    details?: Record<string, unknown>,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._reason = reason;
    this._lockLevel = lockLevel;
    this._lockedAt = lockedAt;
    this._expiresAt = expiresAt;
    this._unlockedAt = unlockedAt;
    this._unlockedBy = unlockedBy;
    this._unlockReason = unlockReason;
    this._failedAttempts = failedAttempts;
    this._appliedByAdminId = appliedByAdminId;
    this._removedByAdminId = removedByAdminId;
    this._details = details;
  }

  /**
   * Static factory method to create a new account lock
   */
  static create(
    userId: string,
    reason: LockReason,
    lockLevel: LockLevel,
    failedAttempts: number,
    expiresAt: Date | null = null,
    appliedByAdminId?: string,
    details?: Record<string, unknown>
  ): AccountLock {
    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID is required');
    }

    if (!reason || typeof reason !== 'string') {
      throw new Error('Lock reason is required');
    }

    if (!lockLevel || typeof lockLevel !== 'string') {
      throw new Error('Lock level is required');
    }

    if (failedAttempts < 0) {
      throw new Error('Failed attempts must be a non-negative number');
    }

    const now = new Date();

    // If no expiry date provided, calculate based on lock level
    let finalExpiresAt = expiresAt;
    if (finalExpiresAt === null) {
      const durationMinutes = AccountLock.getLockDuration(lockLevel);
      if (durationMinutes > 0) {
        finalExpiresAt = new Date(now.getTime() + durationMinutes * 60 * 1000);
      }
    }

    return new AccountLock(
      randomUUID(),
      userId,
      reason,
      lockLevel,
      now,
      finalExpiresAt,
      failedAttempts,
      appliedByAdminId,
      undefined,
      undefined,
      undefined,
      undefined,
      details
    );
  }

  /**
   * Get lock duration in minutes for a given lock level
   */
  private static getLockDuration(lockLevel: LockLevel): number {
    switch (lockLevel) {
      case 'LEVEL_1':
        return 15; // 15 minutes
      case 'LEVEL_2':
        return 60; // 1 hour
      case 'LEVEL_3':
        return 1440; // 24 hours
      case 'PERMANENT':
        return 0; // Never expires
      default:
        return 15;
    }
  }

  /**
   * Get the next escalation level
   */
  private static getNextLevel(currentLevel: LockLevel): LockLevel {
    switch (currentLevel) {
      case 'LEVEL_1':
        return 'LEVEL_2';
      case 'LEVEL_2':
        return 'LEVEL_3';
      case 'LEVEL_3':
        return 'LEVEL_3';
      case 'PERMANENT':
        return 'PERMANENT';
      default:
        return 'LEVEL_1';
    }
  }

  /**
   * Reconstruct an AccountLock entity from persistence
   */
  static reconstitute(
    id: string,
    userId: string,
    reason: LockReason,
    lockLevel: LockLevel,
    lockedAt: Date,
    expiresAt: Date | null,
    failedAttempts: number,
    appliedByAdminId?: string,
    unlockedAt?: Date,
    unlockedBy?: string,
    unlockReason?: string,
    removedByAdminId?: string,
    details?: Record<string, unknown>,
    createdAt?: Date,
    updatedAt?: Date
  ): AccountLock {
    return new AccountLock(
      id,
      userId,
      reason,
      lockLevel,
      lockedAt,
      expiresAt,
      failedAttempts,
      appliedByAdminId,
      unlockedAt,
      unlockedBy,
      unlockReason,
      removedByAdminId,
      details,
      createdAt,
      updatedAt
    );
  }

  // ============================================================================
  // Getters
  // ============================================================================

  get userId(): string {
    return this._userId;
  }

  get reason(): LockReason {
    return this._reason;
  }

  get lockLevel(): LockLevel {
    return this._lockLevel;
  }

  get lockedAt(): Date {
    return new Date(this._lockedAt);
  }

  get expiresAt(): Date | null {
    return this._expiresAt ? new Date(this._expiresAt) : null;
  }

  get unlockedAt(): Date | undefined {
    return this._unlockedAt ? new Date(this._unlockedAt) : undefined;
  }

  get unlockedBy(): string | undefined {
    return this._unlockedBy;
  }

  get unlockReason(): string | undefined {
    return this._unlockReason;
  }

  get failedAttempts(): number {
    return this._failedAttempts;
  }

  get appliedByAdminId(): string | undefined {
    return this._appliedByAdminId;
  }

  get removedByAdminId(): string | undefined {
    return this._removedByAdminId;
  }

  get details(): Record<string, unknown> | undefined {
    return this._details ? { ...this._details } : undefined;
  }

  get isPermanent(): boolean {
    return this._lockLevel === 'PERMANENT';
  }

  // ============================================================================
  // Business Logic Methods
  // ============================================================================

  /**
   * Check if the lock is currently active
   */
  isActive(): boolean {
    // If already unlocked, not active
    if (this._unlockedAt) {
      return false;
    }

    // If permanent, always active
    if (this.isPermanent) {
      return true;
    }

    // If no expiry, not active
    if (!this._expiresAt) {
      return false;
    }

    // Check if expired
    return new Date() <= this._expiresAt;
  }

  /**
   * Check if the lock is expired
   */
  isExpired(): boolean {
    if (this._unlockedAt) {
      return true;
    }

    if (this.isPermanent) {
      return false;
    }

    if (!this._expiresAt) {
      return true;
    }

    return new Date() > this._expiresAt;
  }

  /**
   * Escalate the lock to the next level
   */
  escalate(reason?: string, details?: Record<string, unknown>): LockLevel {
    if (this._unlockedAt) {
      throw new Error('Cannot escalate an unlocked lock');
    }

    if (this.isPermanent) {
      throw new Error('Cannot escalate a permanent lock');
    }

    const nextLevel = AccountLock.getNextLevel(this._lockLevel);

    if (nextLevel === this._lockLevel) {
      throw new Error('Lock is already at the highest level');
    }

    this._lockLevel = nextLevel;

    const durationMinutes = AccountLock.getLockDuration(nextLevel);
    if (durationMinutes > 0) {
      const now = new Date();
      this._expiresAt = new Date(now.getTime() + durationMinutes * 60 * 1000);
    } else {
      this._expiresAt = null;
    }

    if (reason || details) {
      this._details = {
        ...this._details,
        escalationReason: reason,
        escalatedAt: new Date(),
        ...details,
      };
    }

    this.touch();

    return this._lockLevel;
  }

  /**
   * Unlock the account
   */
  unlock(unlockedBy: string, unlockReason?: string, removedByAdminId?: string): void {
    if (this._unlockedAt) {
      throw new Error('Account lock is already unlocked');
    }

    this._unlockedAt = new Date();
    this._unlockedBy = unlockedBy;
    this._unlockReason = unlockReason || 'Manual unlock';
    this._removedByAdminId = removedByAdminId;

    this.touch();
  }

  /**
   * Get the time remaining until the lock expires in seconds
   */
  getTimeRemainingSeconds(): number {
    if (!this.isActive()) {
      return 0;
    }

    if (this.isPermanent) {
      return -1;
    }

    if (!this._expiresAt) {
      return 0;
    }

    const now = Date.now();
    const expiryTime = this._expiresAt.getTime();
    const remaining = Math.floor((expiryTime - now) / 1000);

    return Math.max(0, remaining);
  }

  /**
   * Get the lock duration in minutes
   */
  getDurationMinutes(): number {
    if (this.isPermanent) {
      return 0;
    }

    return AccountLock.getLockDuration(this._lockLevel);
  }

  /**
   * Get a summary of the account lock
   */
  getSummary(): {
    id: string;
    userId: string;
    reason: LockReason;
    lockLevel: LockLevel;
    isActive: boolean;
    isExpired: boolean;
    isPermanent: boolean;
    lockedAt: Date;
    expiresAt: Date | null;
    unlockedAt?: Date;
    unlockedBy?: string;
    unlockReason?: string;
    failedAttempts: number;
    appliedByAdminId?: string;
    removedByAdminId?: string;
    timeRemainingSeconds: number;
    durationMinutes: number;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      userId: this._userId,
      reason: this._reason,
      lockLevel: this._lockLevel,
      isActive: this.isActive(),
      isExpired: this.isExpired(),
      isPermanent: this.isPermanent,
      lockedAt: this._lockedAt,
      expiresAt: this._expiresAt,
      unlockedAt: this._unlockedAt,
      unlockedBy: this._unlockedBy,
      unlockReason: this._unlockReason,
      failedAttempts: this._failedAttempts,
      appliedByAdminId: this._appliedByAdminId,
      removedByAdminId: this._removedByAdminId,
      timeRemainingSeconds: this.getTimeRemainingSeconds(),
      durationMinutes: this.getDurationMinutes(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Check if two AccountLock entities are equal (compare by id)
   */
  equals(other: AccountLock | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof AccountLock)) {
      return false;
    }

    return this.id === other.id;
  }

  /**
   * Create a deep clone of the AccountLock entity
   */
  clone(): AccountLock {
    return new AccountLock(
      this.id,
      this._userId,
      this._reason,
      this._lockLevel,
      new Date(this._lockedAt),
      this._expiresAt ? new Date(this._expiresAt) : null,
      this._failedAttempts,
      this._appliedByAdminId,
      this._unlockedAt ? new Date(this._unlockedAt) : undefined,
      this._unlockedBy,
      this._unlockReason,
      this._removedByAdminId,
      this._details ? { ...this._details } : undefined,
      new Date(this.createdAt),
      new Date(this.updatedAt)
    );
  }
}
