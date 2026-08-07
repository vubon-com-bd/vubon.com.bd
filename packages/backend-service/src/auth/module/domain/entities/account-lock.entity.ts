// packages/backend-service/src/auth/module/domain/entities/account-lock.entity.ts

// ✅ Shared packages
import type { LockLevel, LockReason } from '@vubon/shared-types';

// ✅ Relative paths
import { BaseEntity } from './base.entity';
import type { UserId } from '../value-objects/user-id.vo';
import type { IpAddress } from '../value-objects/ip-address.vo';

/**
 * Lock duration configuration (local fallback)
 * In production, these values should come from shared-constants
 */
const LOCK_DURATION_CONFIG = {
  LEVEL_1_DURATION_MINUTES: 5,
  LEVEL_2_DURATION_MINUTES: 15,
  LEVEL_3_DURATION_MINUTES: 60,
};

/**
 * Account Lock Entity
 * Represents an account lock record for security purposes
 * Tracks progressive lock levels, reasons, and expiration
 */
export class AccountLock extends BaseEntity {
  private _userId: UserId;
  private _reason: LockReason;
  private _lockLevel: LockLevel;
  private _lockedAt: Date;
  private _expiresAt: Date | null;
  private _unlockedAt: Date | null;
  private _ipAddress: IpAddress | null;
  private _failedAttempts: number;
  private _escalationHistory: LockLevel[];

  private constructor(
    id: string,
    userId: UserId,
    reason: LockReason,
    lockLevel: LockLevel,
    lockedAt: Date,
    expiresAt: Date | null = null,
    unlockedAt: Date | null = null,
    ipAddress: IpAddress | null = null,
    failedAttempts: number = 0,
    escalationHistory: LockLevel[] = [],
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
    this._ipAddress = ipAddress;
    this._failedAttempts = failedAttempts;
    this._escalationHistory = escalationHistory;
  }

  /**
   * Create a new account lock
   */
  static create(
    id: string,
    userId: UserId,
    reason: LockReason,
    lockLevel: LockLevel,
    expiresAt: Date | null = null,
    ipAddress: IpAddress | null = null,
    failedAttempts: number = 0
  ): AccountLock {
    const now = new Date();
    const escalationHistory: LockLevel[] = [lockLevel];
    return new AccountLock(
      id,
      userId,
      reason,
      lockLevel,
      now,
      expiresAt,
      null,
      ipAddress,
      failedAttempts,
      escalationHistory,
      now,
      now
    );
  }

  /**
   * Reconstruct an account lock from persistence
   */
  static reconstruct(
    id: string,
    userId: UserId,
    reason: LockReason,
    lockLevel: LockLevel,
    lockedAt: Date,
    expiresAt: Date | null = null,
    unlockedAt: Date | null = null,
    ipAddress: IpAddress | null = null,
    failedAttempts: number = 0,
    escalationHistory: LockLevel[] = [],
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
      unlockedAt,
      ipAddress,
      failedAttempts,
      escalationHistory,
      createdAt,
      updatedAt
    );
  }

  // ──────────────────────────────────────
  // Getters
  // ──────────────────────────────────────

  get userId(): UserId {
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

  get unlockedAt(): Date | null {
    return this._unlockedAt ? new Date(this._unlockedAt) : null;
  }

  get ipAddress(): IpAddress | null {
    return this._ipAddress;
  }

  get failedAttempts(): number {
    return this._failedAttempts;
  }

  get escalationHistory(): LockLevel[] {
    return [...this._escalationHistory];
  }

  /**
   * Check if the lock is currently active
   */
  isActive(): boolean {
    // Lock is active if:
    // 1. It hasn't been unlocked
    // 2. It hasn't expired (if temporary)
    // 3. It's not a permanent lock that has been unlocked
    if (this._unlockedAt !== null) {
      return false;
    }

    if (this._expiresAt === null) {
      // Permanent lock - always active until unlocked
      return true;
    }

    // Temporary lock - active until expiry
    return this._expiresAt > new Date();
  }

  /**
   * Check if the lock is permanent (never expires)
   */
  isPermanent(): boolean {
    return this._expiresAt === null;
  }

  /**
   * Check if the lock has expired
   */
  isExpired(): boolean {
    if (this._expiresAt === null) {
      return false;
    }
    return this._expiresAt < new Date();
  }

  /**
   * Check if the lock has been unlocked
   */
  isUnlocked(): boolean {
    return this._unlockedAt !== null;
  }

  /**
   * Get the lock level label
   */
  getLockLevelLabel(): string {
    const levelLabels: Record<LockLevel, string> = {
      LEVEL_1: 'Level 1 - Basic Lock',
      LEVEL_2: 'Level 2 - Moderate Lock',
      LEVEL_3: 'Level 3 - Severe Lock',
      PERMANENT: 'Permanent Lock',
    };
    return levelLabels[this._lockLevel] || this._lockLevel;
  }

  /**
   * Get the lock reason label
   */
  getReasonLabel(): string {
    const reasonLabels: Record<LockReason, string> = {
      TOO_MANY_ATTEMPTS: 'Too many failed login attempts',
      SUSPICIOUS_ACTIVITY: 'Suspicious activity detected',
      ADMIN_ACTION: 'Admin action',
      PASSWORD_EXPIRED: 'Password expired',
      MFA_FAILED: 'MFA verification failed',
      IP_BLOCKED: 'IP address blocked',
      DEVICE_UNTRUSTED: 'Untrusted device',
      SECURITY_BREACH: 'Security breach detected',
      ACCOUNT_COMPROMISED: 'Account compromised',
    };
    return reasonLabels[this._reason] || this._reason;
  }

  /**
   * Unlock the account
   */
  unlock(): void {
    if (this.isUnlocked()) {
      throw new Error('Account lock is already unlocked');
    }

    if (!this.isActive()) {
      throw new Error('Cannot unlock an inactive lock');
    }

    this._unlockedAt = new Date();
    this.touch();
  }

  /**
   * Escalate the lock level (progressive lockout)
   */
  escalate(newLevel: LockLevel): AccountLock {
    if (this.isUnlocked()) {
      throw new Error('Cannot escalate an unlocked lock');
    }

    if (!this.isActive()) {
      throw new Error('Cannot escalate an inactive lock');
    }

    // Check if escalation is valid (must be higher level)
    const currentLevelIndex = this.getLockLevelIndex(this._lockLevel);
    const newLevelIndex = this.getLockLevelIndex(newLevel);

    if (newLevelIndex <= currentLevelIndex) {
      throw new Error(
        `Cannot escalate from ${this._lockLevel} to ${newLevel}. New level must be higher.`
      );
    }

    // Get duration for new level
    const durationMinutes = this.getLockDurationForLevel(newLevel);

    // Calculate new expiry
    let newExpiresAt: Date | null = null;
    if (durationMinutes !== null) {
      newExpiresAt = new Date(Date.now() + durationMinutes * 60 * 1000);
    }

    // Update current lock
    this._lockLevel = newLevel;
    this._expiresAt = newExpiresAt;
    this._escalationHistory.push(newLevel);
    this.touch();

    return this;
  }

  /**
   * Get the lock duration for a specific level
   */
  private getLockDurationForLevel(level: LockLevel): number | null {
    const durationMap: Record<LockLevel, number | null> = {
      LEVEL_1: LOCK_DURATION_CONFIG.LEVEL_1_DURATION_MINUTES,
      LEVEL_2: LOCK_DURATION_CONFIG.LEVEL_2_DURATION_MINUTES,
      LEVEL_3: LOCK_DURATION_CONFIG.LEVEL_3_DURATION_MINUTES,
      PERMANENT: null,
    };
    return durationMap[level] ?? null;
  }

  /**
   * Get the index of a lock level
   */
  private getLockLevelIndex(level: LockLevel): number {
    const levelOrder: LockLevel[] = ['LEVEL_1', 'LEVEL_2', 'LEVEL_3', 'PERMANENT'];
    const index = levelOrder.indexOf(level);
    return index !== -1 ? index : 0;
  }

  /**
   * Get the next escalation level
   */
  getNextEscalationLevel(): LockLevel | null {
    const levelOrder: LockLevel[] = ['LEVEL_1', 'LEVEL_2', 'LEVEL_3', 'PERMANENT'];
    const currentIndex = this.getLockLevelIndex(this._lockLevel);

    if (currentIndex >= levelOrder.length - 1) {
      return null;
    }

    return levelOrder[currentIndex + 1];
  }

  /**
   * Check if escalation is possible
   */
  canEscalate(): boolean {
    if (this.isUnlocked()) {
      return false;
    }

    if (!this.isActive()) {
      return false;
    }

    return this.getNextEscalationLevel() !== null;
  }

  /**
   * Get time remaining until unlock (in seconds)
   */
  getTimeRemainingSeconds(): number {
    if (!this.isActive()) {
      return 0;
    }

    if (this.isPermanent()) {
      return -1; // Permanent lock - never expires
    }

    if (this._expiresAt === null) {
      return 0;
    }

    const now = Date.now();
    const expiry = this._expiresAt.getTime();
    const remaining = Math.floor((expiry - now) / 1000);
    return Math.max(0, remaining);
  }

  /**
   * Get time remaining in human-readable format
   */
  getTimeRemainingHuman(): string {
    const seconds = this.getTimeRemainingSeconds();

    if (seconds === -1) {
      return 'Permanent';
    }

    if (seconds <= 0) {
      return 'Expired';
    }

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (remainingSeconds === 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }

    return `${minutes}m ${remainingSeconds}s`;
  }

  /**
   * Get lock summary
   */
  getSummary(): {
    id: string;
    userId: string;
    reason: LockReason;
    lockLevel: LockLevel;
    lockLevelLabel: string;
    reasonLabel: string;
    lockedAt: Date;
    expiresAt: Date | null;
    unlockedAt: Date | null;
    isActive: boolean;
    isPermanent: boolean;
    isExpired: boolean;
    isUnlocked: boolean;
    timeRemainingSeconds: number;
    timeRemainingHuman: string;
    failedAttempts: number;
    escalationHistory: LockLevel[];
    canEscalate: boolean;
    nextEscalationLevel: LockLevel | null;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      userId: this._userId.value,
      reason: this._reason,
      lockLevel: this._lockLevel,
      lockLevelLabel: this.getLockLevelLabel(),
      reasonLabel: this.getReasonLabel(),
      lockedAt: this._lockedAt,
      expiresAt: this._expiresAt,
      unlockedAt: this._unlockedAt,
      isActive: this.isActive(),
      isPermanent: this.isPermanent(),
      isExpired: this.isExpired(),
      isUnlocked: this.isUnlocked(),
      timeRemainingSeconds: this.getTimeRemainingSeconds(),
      timeRemainingHuman: this.getTimeRemainingHuman(),
      failedAttempts: this._failedAttempts,
      escalationHistory: this._escalationHistory,
      canEscalate: this.canEscalate(),
      nextEscalationLevel: this.getNextEscalationLevel(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Compare two AccountLock entities
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
   * Get string representation
   */
  toString(): string {
    return `AccountLock(id=${this.id}, userId=${this._userId.value}, level=${this._lockLevel}, active=${this.isActive()})`;
  }
}
