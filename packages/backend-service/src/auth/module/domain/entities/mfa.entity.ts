// packages/backend-service/src/auth/module/domain/entities/mfa.entity.ts
import { randomUUID } from 'crypto';
import { BaseEntity } from './base.entity';
import { generateBackupCodes } from '@vubon/shared-utils';

/**
 * MFA type types
 */
export type MFAType = 'TOTP' | 'SMS' | 'EMAIL';

/**
 * MFA status types
 */
export type MFAStatus = 'PENDING' | 'ENABLED' | 'DISABLED' | 'LOCKED';

/**
 * MFA Entity
 * Represents a user's Multi-Factor Authentication configuration
 */
export class MFA extends BaseEntity {
  private _userId: string;
  private _type: MFAType;
  private _secret: string;
  private _backupCodes: string[];
  private _status: MFAStatus;
  private _verifiedAt?: Date;
  private _failedAttempts: number;
  private _lockedUntil?: Date;
  private _maxFailedAttempts: number;
  private _lockoutDurationMinutes: number;

  private constructor(
    id: string,
    userId: string,
    type: MFAType,
    secret: string,
    backupCodes: string[],
    status: MFAStatus,
    failedAttempts: number,
    maxFailedAttempts: number,
    lockoutDurationMinutes: number,
    verifiedAt?: Date,
    lockedUntil?: Date,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._type = type;
    this._secret = secret;
    this._backupCodes = backupCodes;
    this._status = status;
    this._verifiedAt = verifiedAt;
    this._failedAttempts = failedAttempts;
    this._lockedUntil = lockedUntil;
    this._maxFailedAttempts = maxFailedAttempts;
    this._lockoutDurationMinutes = lockoutDurationMinutes;
  }

  static enable(
    userId: string,
    type: MFAType,
    secret: string,
    maxFailedAttempts: number = 5,
    lockoutDurationMinutes: number = 15
  ): MFA {
    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID is required');
    }

    if (!type || !['TOTP', 'SMS', 'EMAIL'].includes(type)) {
      throw new Error('Invalid MFA type. Must be TOTP, SMS, or EMAIL');
    }

    if (!secret || typeof secret !== 'string') {
      throw new Error('Secret is required');
    }

    if (maxFailedAttempts <= 0) {
      throw new Error('Max failed attempts must be greater than 0');
    }

    if (lockoutDurationMinutes <= 0) {
      throw new Error('Lockout duration must be greater than 0');
    }

    return new MFA(
      randomUUID(),
      userId,
      type,
      secret,
      [],
      'PENDING',
      0,
      maxFailedAttempts,
      lockoutDurationMinutes
    );
  }

  static reconstitute(
    id: string,
    userId: string,
    type: MFAType,
    secret: string,
    backupCodes: string[],
    status: MFAStatus,
    failedAttempts: number,
    maxFailedAttempts: number,
    lockoutDurationMinutes: number,
    verifiedAt?: Date,
    lockedUntil?: Date,
    createdAt?: Date,
    updatedAt?: Date
  ): MFA {
    return new MFA(
      id,
      userId,
      type,
      secret,
      backupCodes,
      status,
      failedAttempts,
      maxFailedAttempts,
      lockoutDurationMinutes,
      verifiedAt,
      lockedUntil,
      createdAt,
      updatedAt
    );
  }

  // Getters
  get userId(): string {
    return this._userId;
  }

  get type(): MFAType {
    return this._type;
  }

  get secret(): string {
    return this._secret;
  }

  get backupCodes(): string[] {
    return [...this._backupCodes];
  }

  get status(): MFAStatus {
    return this._status;
  }

  get verifiedAt(): Date | undefined {
    return this._verifiedAt ? new Date(this._verifiedAt) : undefined;
  }

  get failedAttempts(): number {
    return this._failedAttempts;
  }

  get lockedUntil(): Date | undefined {
    return this._lockedUntil ? new Date(this._lockedUntil) : undefined;
  }

  get isEnabled(): boolean {
    return this._status === 'ENABLED';
  }

  get isPending(): boolean {
    return this._status === 'PENDING';
  }

  get isDisabled(): boolean {
    return this._status === 'DISABLED';
  }

  isLocked(): boolean {
    if (this._status !== 'LOCKED') {
      return false;
    }

    if (!this._lockedUntil) {
      return true;
    }

    if (new Date() > this._lockedUntil) {
      return false;
    }

    return true;
  }

  // Business Logic Methods
  verify(code: string): boolean {
    if (this._status === 'DISABLED') {
      throw new Error('MFA is disabled');
    }

    if (this._status === 'LOCKED') {
      if (this.isLocked()) {
        throw new Error('MFA is locked due to too many failed attempts');
      } else {
        this._status = 'PENDING';
        this._lockedUntil = undefined;
        this._failedAttempts = 0;
        this.touch();
      }
    }

    if (this._backupCodes.length > 0) {
      const backupCodeIndex = this._backupCodes.indexOf(code);
      if (backupCodeIndex !== -1) {
        this._backupCodes.splice(backupCodeIndex, 1);
        this._status = 'ENABLED';
        this._verifiedAt = new Date();
        this._failedAttempts = 0;
        this.touch();
        return true;
      }
    }

    this.incrementFailedAttempts();
    return false;
  }

  markVerified(): void {
    if (this._status === 'ENABLED') {
      return;
    }

    if (this._status === 'DISABLED') {
      throw new Error('Cannot verify disabled MFA');
    }

    if (this._status === 'LOCKED') {
      throw new Error('Cannot verify locked MFA');
    }

    this._status = 'ENABLED';
    this._verifiedAt = new Date();
    this._failedAttempts = 0;
    this._lockedUntil = undefined;

    if (this._backupCodes.length === 0) {
      this.generateBackupCodes();
    }

    this.touch();
  }

  disable(): void {
    if (this._status === 'DISABLED') {
      throw new Error('MFA is already disabled');
    }

    this._status = 'DISABLED';
    this._backupCodes = [];
    this._failedAttempts = 0;
    this._lockedUntil = undefined;
    this._verifiedAt = undefined;

    this.touch();
  }

  generateBackupCodes(count: number = 10, length: number = 8): string[] {
    if (this._status !== 'ENABLED' && this._status !== 'PENDING') {
      throw new Error('Backup codes can only be generated for enabled or pending MFA');
    }

    const codes = generateBackupCodes(count, length);
    this._backupCodes = codes;

    this.touch();

    return codes;
  }

  incrementFailedAttempts(): void {
    if (this._status === 'LOCKED') {
      return;
    }

    this._failedAttempts += 1;

    if (this._failedAttempts >= this._maxFailedAttempts) {
      this._status = 'LOCKED';
      const lockDurationMs = this._lockoutDurationMinutes * 60 * 1000;
      this._lockedUntil = new Date(Date.now() + lockDurationMs);
    }

    this.touch();
  }

  resetFailedAttempts(): void {
    this._failedAttempts = 0;
    this._lockedUntil = undefined;

    if (this._status === 'LOCKED') {
      this._status = 'PENDING';
    }

    this.touch();
  }

  hasBackupCodes(): boolean {
    return this._backupCodes.length > 0;
  }

  getRemainingBackupCodesCount(): number {
    return this._backupCodes.length;
  }

  isBackupCodesLow(): boolean {
    return this._backupCodes.length <= 3;
  }

  getLockTimeRemainingSeconds(): number {
    if (!this.isLocked() || !this._lockedUntil) {
      return 0;
    }

    const now = Date.now();
    const lockTime = this._lockedUntil.getTime();
    const remaining = Math.floor((lockTime - now) / 1000);
    return Math.max(0, remaining);
  }

  isReadyForVerification(): boolean {
    if (this._status === 'DISABLED') {
      return false;
    }

    if (this._status === 'LOCKED' && this.isLocked()) {
      return false;
    }

    return true;
  }

  getSummary(): {
    id: string;
    userId: string;
    type: MFAType;
    status: MFAStatus;
    isEnabled: boolean;
    isPending: boolean;
    isLocked: boolean;
    verifiedAt?: Date;
    failedAttempts: number;
    remainingBackupCodes: number;
    isBackupCodesLow: boolean;
    lockTimeRemainingSeconds: number;
  } {
    return {
      id: this.id,
      userId: this._userId,
      type: this._type,
      status: this._status,
      isEnabled: this.isEnabled,
      isPending: this.isPending,
      isLocked: this.isLocked(),
      verifiedAt: this._verifiedAt,
      failedAttempts: this._failedAttempts,
      remainingBackupCodes: this.getRemainingBackupCodesCount(),
      isBackupCodesLow: this.isBackupCodesLow(),
      lockTimeRemainingSeconds: this.getLockTimeRemainingSeconds(),
    };
  }

  equals(other: MFA | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof MFA)) {
      return false;
    }

    return this.id === other.id;
  }

  clone(): MFA {
    return new MFA(
      this.id,
      this._userId,
      this._type,
      this._secret,
      [...this._backupCodes],
      this._status,
      this._failedAttempts,
      this._maxFailedAttempts,
      this._lockoutDurationMinutes,
      this._verifiedAt ? new Date(this._verifiedAt) : undefined,
      this._lockedUntil ? new Date(this._lockedUntil) : undefined,
      new Date(this.createdAt),
      new Date(this.updatedAt)
    );
  }
}
