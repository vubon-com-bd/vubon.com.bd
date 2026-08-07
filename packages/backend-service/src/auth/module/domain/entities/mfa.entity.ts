import { MFAType, MFAStatus } from '@vubon/shared-types';
import { MFA_BACKUP_CODES, MFA_VERIFICATION } from '@vubon/shared-constants';
import { randomBytes } from 'crypto';
import { BaseEntity } from './base.entity';
import { UserId } from '../value-objects/user-id.vo';
import { OtpCode } from '../value-objects/otp-code.vo';

/**
 * MFA entity represents a user's multi-factor authentication configuration
 * Tracks TOTP secret, backup codes, and verification status
 */
export class Mfa extends BaseEntity {
  private _userId: UserId;
  private _type: MFAType;
  private _secret: string;
  private _status: MFAStatus;
  private _backupCodes: string[];
  private _verifiedAt: Date | null;
  private _failedAttempts: number;
  private _lastFailedAttemptAt: Date | null;
  private _lockedAt: Date | null;
  private _lockExpiresAt: Date | null;

  private constructor(
    id: string,
    userId: UserId,
    type: MFAType,
    secret: string,
    status: MFAStatus,
    backupCodes: string[],
    verifiedAt: Date | null = null,
    failedAttempts: number = 0,
    lastFailedAttemptAt: Date | null = null,
    lockedAt: Date | null = null,
    lockExpiresAt: Date | null = null,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._type = type;
    this._secret = secret;
    this._status = status;
    this._backupCodes = backupCodes;
    this._verifiedAt = verifiedAt;
    this._failedAttempts = failedAttempts;
    this._lastFailedAttemptAt = lastFailedAttemptAt;
    this._lockedAt = lockedAt;
    this._lockExpiresAt = lockExpiresAt;
  }

  /**
   * Create a new MFA configuration (TOTP)
   */
  static create(id: string, userId: UserId, secret: string, backupCodes: string[]): Mfa {
    return new Mfa(id, userId, 'TOTP', secret, 'PENDING', backupCodes);
  }

  /**
   * Reconstruct MFA from persistence
   */
  static reconstruct(
    id: string,
    userId: UserId,
    type: MFAType,
    secret: string,
    status: MFAStatus,
    backupCodes: string[],
    verifiedAt: Date | null = null,
    failedAttempts: number = 0,
    lastFailedAttemptAt: Date | null = null,
    lockedAt: Date | null = null,
    lockExpiresAt: Date | null = null,
    createdAt?: Date,
    updatedAt?: Date
  ): Mfa {
    return new Mfa(
      id,
      userId,
      type,
      secret,
      status,
      backupCodes,
      verifiedAt,
      failedAttempts,
      lastFailedAttemptAt,
      lockedAt,
      lockExpiresAt,
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

  get type(): MFAType {
    return this._type;
  }

  get secret(): string {
    return this._secret;
  }

  get status(): MFAStatus {
    return this._status;
  }

  get backupCodes(): string[] {
    return [...this._backupCodes];
  }

  get verifiedAt(): Date | null {
    return this._verifiedAt ? new Date(this._verifiedAt) : null;
  }

  get failedAttempts(): number {
    return this._failedAttempts;
  }

  get lastFailedAttemptAt(): Date | null {
    return this._lastFailedAttemptAt ? new Date(this._lastFailedAttemptAt) : null;
  }

  get lockedAt(): Date | null {
    return this._lockedAt ? new Date(this._lockedAt) : null;
  }

  get lockExpiresAt(): Date | null {
    return this._lockExpiresAt ? new Date(this._lockExpiresAt) : null;
  }

  get isEnabled(): boolean {
    return this._status === 'ENABLED';
  }

  get isPending(): boolean {
    return this._status === 'PENDING';
  }

  get isLocked(): boolean {
    if (this._status !== 'LOCKED') {
      return false;
    }
    // Check if lock has expired
    if (this._lockExpiresAt && this._lockExpiresAt < new Date()) {
      return false;
    }
    return true;
  }

  get isDisabled(): boolean {
    return this._status === 'DISABLED';
  }

  get isVerified(): boolean {
    return this._verifiedAt !== null;
  }

  get remainingBackupCodes(): number {
    return this._backupCodes.length;
  }

  // ──────────────────────────────────────
  // Domain Methods
  // ──────────────────────────────────────

  /**
   * Enable MFA after verification
   */
  enable(): void {
    if (this.isEnabled) {
      throw new Error('MFA is already enabled');
    }

    if (this.isLocked) {
      throw new Error('MFA is locked. Cannot enable.');
    }

    if (this._status === 'DISABLED') {
      throw new Error('Cannot enable disabled MFA. Please setup again.');
    }

    if (this.isPending && !this.isVerified) {
      throw new Error('Cannot enable MFA without verification');
    }

    this._status = 'ENABLED';
    this._verifiedAt = new Date();
    this._failedAttempts = 0;
    this._lastFailedAttemptAt = null;
    this._lockedAt = null;
    this._lockExpiresAt = null;
    this.touch();
  }

  /**
   * Disable MFA
   */
  disable(): void {
    if (this.isDisabled) {
      throw new Error('MFA is already disabled');
    }

    this._status = 'DISABLED';
    this._verifiedAt = null;
    this._failedAttempts = 0;
    this._lastFailedAttemptAt = null;
    this._lockedAt = null;
    this._lockExpiresAt = null;
    this.touch();
  }

  /**
   * Verify an OTP code against the stored secret
   * @param otp - OTP code to verify
   * @returns true if verification is successful
   */
  verify(otp: OtpCode): boolean {
    if (this.isDisabled) {
      throw new Error('MFA is disabled');
    }

    if (this.isLocked) {
      throw new Error('MFA is locked. Please try again later.');
    }

    if (otp.isExpired()) {
      throw new Error('OTP code has expired');
    }

    const isValid = this.validateOtp(otp);

    if (isValid) {
      // Reset attempts on success
      this._failedAttempts = 0;
      this._lastFailedAttemptAt = null;
      this._lockedAt = null;
      this._lockExpiresAt = null;

      if (this.isPending) {
        this.enable();
      } else {
        this.touch();
      }

      return true;
    } else {
      this.incrementAttempts();
      return false;
    }
  }

  /**
   * Validate an OTP against the stored secret
   * @param otp - OTP code to validate
   * @returns true if the OTP is valid
   */
  private validateOtp(otp: OtpCode): boolean {
    // In production, this would use a TOTP library
    // to validate against the stored secret with time window
    // For now, we simulate validation using the OTP value
    const otpValue = otp.getValue();
    // This is a placeholder - actual implementation would use TOTP verification
    // For example: const isValid = totp.verify({ secret: this._secret, token: otpValue });
    return otpValue.length === 6 && /^\d{6}$/.test(otpValue);
  }

  /**
   * Verify using a backup code
   * @param code - Backup code to verify
   * @returns true if the backup code is valid
   */
  verifyBackupCode(code: string): boolean {
    if (this.isDisabled) {
      throw new Error('MFA is disabled');
    }

    if (this.isLocked) {
      throw new Error('MFA is locked. Please try again later.');
    }

    if (!code || typeof code !== 'string') {
      throw new Error('Backup code is required');
    }

    // Find and remove the used backup code
    const index = this._backupCodes.indexOf(code);
    if (index === -1) {
      throw new Error('Invalid backup code');
    }

    // Remove the used backup code
    this._backupCodes.splice(index, 1);

    // Reset attempts on success
    this._failedAttempts = 0;
    this._lastFailedAttemptAt = null;
    this._lockedAt = null;
    this._lockExpiresAt = null;

    if (this.isPending) {
      this.enable();
    } else {
      this.touch();
    }

    return true;
  }

  /**
   * Increment failed verification attempts
   * Locks MFA if max attempts exceeded
   */
  incrementAttempts(): void {
    if (this.isLocked) {
      return;
    }

    this._failedAttempts += 1;
    this._lastFailedAttemptAt = new Date();

    const maxAttempts = MFA_VERIFICATION.MAX_ATTEMPTS;
    if (this._failedAttempts >= maxAttempts) {
      const lockDurationMinutes = MFA_VERIFICATION.LOCKOUT_DURATION_MINUTES;
      const lockDurationMs = lockDurationMinutes * 60 * 1000;
      this._lockedAt = new Date();
      this._lockExpiresAt = new Date(Date.now() + lockDurationMs);
      this._status = 'LOCKED';
    }

    this.touch();
  }

  /**
   * Reset failed attempts count
   */
  resetAttempts(): void {
    this._failedAttempts = 0;
    this._lastFailedAttemptAt = null;
    this._lockedAt = null;
    this._lockExpiresAt = null;
    this.touch();
  }

  /**
   * Generate new backup codes
   * @param count - Number of backup codes to generate
   * @param hasher - Function to hash backup codes before storing
   * @returns Array of raw backup codes (should be shown to user once)
   */
  regenerateBackupCodes(
    count: number = MFA_BACKUP_CODES.COUNT,
    hasher?: (code: string) => string
  ): string[] {
    if (count < 1 || count > 50) {
      throw new Error('Backup code count must be between 1 and 50');
    }

    // Generate new backup codes
    const rawCodes: string[] = [];
    const charset = MFA_BACKUP_CODES.CHARSET || 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const codeLength = MFA_BACKUP_CODES.LENGTH || 8;

    for (let i = 0; i < count; i++) {
      let code = '';
      const bytes = randomBytes(codeLength);
      for (let j = 0; j < codeLength; j++) {
        const index = bytes[j] % charset.length;
        code += charset[index];
      }
      rawCodes.push(code);
    }

    // Store hashed codes if hasher is provided
    if (hasher) {
      this._backupCodes = rawCodes.map((code) => hasher(code));
    } else {
      this._backupCodes = rawCodes;
    }

    this.touch();
    return rawCodes;
  }

  /**
   * Check if a backup code is valid (for verification)
   * Note: This doesn't consume the code
   */
  hasBackupCode(code: string): boolean {
    return this._backupCodes.includes(code);
  }

  /**
   * Get MFA summary
   */
  getSummary(): {
    id: string;
    userId: string;
    type: MFAType;
    status: MFAStatus;
    isEnabled: boolean;
    isLocked: boolean;
    isVerified: boolean;
    verifiedAt: Date | null;
    remainingBackupCodes: number;
    failedAttempts: number;
    lockedAt: Date | null;
    lockExpiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      userId: this._userId.value,
      type: this._type,
      status: this._status,
      isEnabled: this.isEnabled,
      isLocked: this.isLocked,
      isVerified: this.isVerified,
      verifiedAt: this._verifiedAt,
      remainingBackupCodes: this.remainingBackupCodes,
      failedAttempts: this._failedAttempts,
      lockedAt: this._lockedAt,
      lockExpiresAt: this._lockExpiresAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Compare two Mfa entities
   */
  equals(other: Mfa | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof Mfa)) {
      return false;
    }
    return this.id === other.id;
  }
}
