/**
 * MFA Entity - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/mfa.entity
 * 
 * @description
 * Represents Multi-Factor Authentication configuration for a user.
 * Manages MFA type, secret, backup codes, and verification status.
 * 
 * Enterprise Rules:
 * ✅ Domain stores MFA configuration but does NOT verify codes
 * ✅ TOTP verification is infrastructure concern (OTP libraries)
 * ✅ Backup codes generated in infrastructure (cryptographically secure)
 * ✅ Domain events for all MFA state changes
 * ✅ Framework-free (no crypto dependency)
 * ✅ Bangladesh specific - WhatsApp, Imo, bKash, Nagad, Rocket MFA support
 * 
 * IMPORTANT: MFA code verification (TOTP/SMS/Email) happens in
 * application/infrastructure layer. Domain only stores and validates
 * the configuration and backup codes.
 */

import { BaseEntity, EntityValidationError, type IdGenerator } from './base.entity';
import { Phone } from '../value-objects/phone.vo';
import { Email } from '../value-objects/email.vo';

// ==================== Enums ====================

/**
 * MFA type enumeration (Bangladesh specific)
 */
export enum MFAType {
  TOTP = 'TOTP',                      // Google Authenticator, Microsoft Authenticator
  SMS = 'SMS',                        // SMS OTP
  EMAIL = 'EMAIL',                    // Email OTP
  BACKUP_CODE = 'BACKUP_CODE',        // Recovery backup codes
  WEBAUTHN = 'WEBAUTHN',              // Biometric/Passkey
  PUSH = 'PUSH',                      // Push notification
  WHATSAPP = 'WHATSAPP',              // WhatsApp OTP (Bangladesh specific)
  IMO = 'IMO',                        // Imo OTP (Bangladesh specific)
  BKASH_PIN = 'BKASH_PIN',            // bKash PIN as MFA
  NAGAD_PIN = 'NAGAD_PIN',            // Nagad PIN as MFA
  ROCKET_PIN = 'ROCKET_PIN',          // Rocket PIN as MFA
  VOICE_CALL = 'VOICE_CALL',          // Voice call OTP (for feature phones)
}

/**
 * MFA status enumeration
 */
export enum MFAStatus {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  LOCKED = 'LOCKED',                  // Too many failed attempts
  RECOVERY_MODE = 'RECOVERY_MODE',    // Using backup codes
  BACKUP_ONLY = 'BACKUP_ONLY',        // Only backup codes available
}

/**
 * MFA event types
 */
export enum MFAEventType {
  MFA_ENABLED = 'mfa.enabled',
  MFA_DISABLED = 'mfa.disabled',
  MFA_VERIFIED = 'mfa.verified',
  MFA_VERIFICATION_FAILED = 'mfa.verification_failed',
  MFA_LOCKED = 'mfa.locked',
  MFA_UNLOCKED = 'mfa.unlocked',
  MFA_BACKUP_CODE_USED = 'mfa.backup_code_used',
  MFA_BACKUP_CODES_REGENERATED = 'mfa.backup_codes_regenerated',
  MFA_RECOVERY_MODE_ENTERED = 'mfa.recovery_mode_entered',
  MFA_METHOD_ADDED = 'mfa.method_added',
  MFA_METHOD_REMOVED = 'mfa.method_removed',
  MFA_PRIMARY_CHANGED = 'mfa.primary_changed',
}

// ==================== Types ====================

/**
 * MFA configuration constants
 */
const MFA_CONFIG = {
  MAX_VERIFICATION_ATTEMPTS: 3,
  BACKUP_CODE_COUNT: 10,
  BACKUP_CODE_LENGTH: 8,
  LOCKOUT_DURATION_MINUTES: 15,
  MAX_MFA_METHODS_PER_USER: 5,
} as const;

/**
 * MFA method priority for verification
 */
export const MFA_METHOD_PRIORITY: Record<MFAType, number> = {
  [MFAType.WEBAUTHN]: 1,      // Highest priority (biometric)
  [MFAType.TOTP]: 2,          // Google Authenticator
  [MFAType.PUSH]: 3,          // Push notification
  [MFAType.WHATSAPP]: 4,      // WhatsApp OTP (popular in BD)
  [MFAType.SMS]: 5,           // SMS OTP
  [MFAType.IMO]: 6,           // Imo OTP
  [MFAType.BKASH_PIN]: 7,     // bKash PIN
  [MFAType.NAGAD_PIN]: 7,     // Nagad PIN
  [MFAType.ROCKET_PIN]: 7,    // Rocket PIN
  [MFAType.EMAIL]: 8,         // Email OTP
  [MFAType.VOICE_CALL]: 9,    // Voice call (feature phones)
  [MFAType.BACKUP_CODE]: 10,  // Lowest priority (last resort)
};

// ==================== MFA Entity ====================

/**
 * MFA Entity
 * 
 * Manages user's MFA configuration
 */
export class MFA extends BaseEntity {
  private _userId: string;
  private _type: MFAType;
  private _identifier: string;           // Phone number, email, or account ID
  private _secret: string;               // Encrypted secret (domain stores, doesn't verify)
  private _status: MFAStatus;
  private _backupCodes: string[];        // Hashed backup codes
  private _verifiedAt: Date | undefined;
  private _lastUsedAt: Date | undefined;
  private _failedAttempts: number;
  private _lockedUntil: Date | undefined;
  private _isPrimary: boolean;
  private _priority: number;

  private constructor(
    id: string,
    userId: string,
    type: MFAType,
    identifier: string,
    secret: string,
    status: MFAStatus,
    backupCodes: string[],
    verifiedAt: Date | undefined,
    lastUsedAt: Date | undefined,
    failedAttempts: number,
    lockedUntil: Date | undefined,
    isPrimary: boolean,
    priority: number,
    createdAt: Date,
    updatedAt: Date,
    version: number
  ) {
    super({ id, createdAt, updatedAt, version });
    
    this._userId = userId;
    this._type = type;
    this._identifier = identifier;
    this._secret = secret;
    this._status = status;
    this._backupCodes = backupCodes;
    this._verifiedAt = verifiedAt;
    this._lastUsedAt = lastUsedAt;
    this._failedAttempts = failedAttempts;
    this._lockedUntil = lockedUntil;
    this._isPrimary = isPrimary;
    this._priority = priority;
    
    this.validate();
  }

  /**
   * Validate entity invariants
   */
  protected validate(): void {
    if (!this._userId) {
      throw new EntityValidationError('MFA requires a user ID');
    }
    if (!this._type) {
      throw new EntityValidationError('MFA requires a type');
    }
    if (!this._identifier && this._type !== MFAType.TOTP && this._type !== MFAType.BACKUP_CODE) {
      throw new EntityValidationError(`MFA type ${this._type} requires an identifier`);
    }
    if (this._status === MFAStatus.ENABLED && !this._verifiedAt) {
      throw new EntityValidationError('Enabled MFA must have verification timestamp');
    }
    if (this._failedAttempts < 0) {
      throw new EntityValidationError('Failed attempts cannot be negative');
    }
    if (this._priority < 1 || this._priority > 10) {
      throw new EntityValidationError('Priority must be between 1 and 10');
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Enable MFA (pending verification)
   */
  public static enable(
    userId: string,
    type: MFAType,
    identifier: string,
    secret: string,
    backupCodes: string[],
    isPrimary: boolean,
    priority: number,
    idGenerator: IdGenerator
  ): MFA {
    const now = new Date();
    
    const mfa = new MFA(
      idGenerator.generate(),
      userId,
      type,
      identifier,
      secret,
      MFAStatus.PENDING_VERIFICATION,
      backupCodes,
      undefined,
      undefined,
      0,
      undefined,
      isPrimary,
      priority,
      now,
      now,
      1
    );
    
    mfa.addDomainEvent({
      eventId: generateEventId(),
      eventType: MFAEventType.MFA_ENABLED,
      aggregateId: mfa.id,
      occurredOn: now,
      version: 1,
      metadata: {
        userId,
        type,
        identifier,
        isPrimary,
      },
    });
    
    return mfa;
  }

  /**
   * Reconstitute from persistence
   */
  public static reconstitute(data: {
    id: string;
    userId: string;
    type: MFAType;
    identifier: string;
    secret: string;
    status: MFAStatus;
    backupCodes: string[];
    verifiedAt?: Date;
    lastUsedAt?: Date;
    failedAttempts: number;
    lockedUntil?: Date;
    isPrimary: boolean;
    priority: number;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }): MFA {
    return new MFA(
      data.id,
      data.userId,
      data.type,
      data.identifier,
      data.secret,
      data.status,
      data.backupCodes,
      data.verifiedAt,
      data.lastUsedAt,
      data.failedAttempts,
      data.lockedUntil,
      data.isPrimary,
      data.priority,
      data.createdAt,
      data.updatedAt,
      data.version
    );
  }

  // ============================================================
  // Business Methods
  // ============================================================

  /**
   * Mark MFA as verified (after successful code verification)
   * Called by application layer after verification succeeds
   */
  public markAsVerified(): void {
    if (this._status !== MFAStatus.PENDING_VERIFICATION) {
      throw new EntityValidationError(
        `Cannot verify MFA: current status is ${this._status}`
      );
    }
    
    this._status = MFAStatus.ENABLED;
    this._verifiedAt = new Date();
    this._failedAttempts = 0;
    this._lockedUntil = undefined;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: MFAEventType.MFA_VERIFIED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        type: this._type,
        identifier: this._identifier,
      },
    });
  }

  /**
   * Record verification failure (for tracking attempts)
   * Called by application layer when verification fails
   */
  public recordVerificationFailure(): void {
    if (this._status === MFAStatus.LOCKED) {
      if (this.isLocked() && !this.isLockExpired()) {
        throw new EntityValidationError('MFA is currently locked');
      }
      if (this.isLockExpired()) {
        this.unlock();
      }
    }
    
    this._failedAttempts++;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: MFAEventType.MFA_VERIFICATION_FAILED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        type: this._type,
        failedAttempts: this._failedAttempts,
      },
    });
    
    // Lock after max attempts
    if (this._failedAttempts >= MFA_CONFIG.MAX_VERIFICATION_ATTEMPTS) {
      this.lock();
    }
  }

  /**
   * Record successful verification (for tracking)
   */
  public recordSuccessfulVerification(): void {
    this._lastUsedAt = new Date();
    this._failedAttempts = 0;
    this._lockedUntil = undefined;
    this.touch();
  }

  /**
   * Lock MFA (too many failed attempts)
   */
  private lock(): void {
    if (this._status === MFAStatus.LOCKED) {
      return;
    }
    
    this._status = MFAStatus.LOCKED;
    this._lockedUntil = new Date(
      Date.now() + MFA_CONFIG.LOCKOUT_DURATION_MINUTES * 60 * 1000
    );
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: MFAEventType.MFA_LOCKED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        type: this._type,
        reason: 'Too many failed verification attempts',
        failedAttempts: this._failedAttempts,
      },
    });
  }

  /**
   * Unlock MFA
   */
  public unlock(): void {
    if (this._status !== MFAStatus.LOCKED) {
      throw new EntityValidationError('MFA is not locked');
    }
    
    this._status = this._verifiedAt ? MFAStatus.ENABLED : MFAStatus.PENDING_VERIFICATION;
    this._failedAttempts = 0;
    this._lockedUntil = undefined;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: MFAEventType.MFA_UNLOCKED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        type: this._type,
      },
    });
  }

  /**
   * Check if MFA is locked
   */
  public isLocked(): boolean {
    if (this._status !== MFAStatus.LOCKED) return false;
    if (this.isLockExpired()) return false;
    return true;
  }

  /**
   * Check if lock has expired
   */
  public isLockExpired(): boolean {
    if (!this._lockedUntil) return true;
    return new Date() > this._lockedUntil;
  }

  /**
   * Use a backup code (mark as used)
   * 
   * @param codeHash - Hashed backup code (infrastructure compares)
   * @returns True if backup code was valid and used
   */
  public useBackupCode(codeHash: string): boolean {
    const index = this._backupCodes.indexOf(codeHash);
    if (index === -1) {
      return false;
    }
    
    this._backupCodes.splice(index, 1);
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: MFAEventType.MFA_BACKUP_CODE_USED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        remainingCodes: this._backupCodes.length,
      },
    });
    
    // Enter recovery mode when using backup codes
    if (this._status !== MFAStatus.RECOVERY_MODE) {
      this._status = MFAStatus.RECOVERY_MODE;
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: MFAEventType.MFA_RECOVERY_MODE_ENTERED,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this._userId,
        },
      });
    }
    
    return true;
  }

  /**
   * Regenerate backup codes
   */
  public regenerateBackupCodes(newBackupCodes: string[]): void {
    if (newBackupCodes.length !== MFA_CONFIG.BACKUP_CODE_COUNT) {
      throw new EntityValidationError(
        `Backup codes must contain exactly ${MFA_CONFIG.BACKUP_CODE_COUNT} codes`
      );
    }
    
    this._backupCodes = newBackupCodes;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: MFAEventType.MFA_BACKUP_CODES_REGENERATED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
      },
    });
  }

  /**
   * Disable MFA
   */
  public disable(): void {
    if (this._status === MFAStatus.DISABLED) {
      throw new EntityValidationError('MFA is already disabled');
    }
    
    this._status = MFAStatus.DISABLED;
    this._backupCodes = [];
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: MFAEventType.MFA_DISABLED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        type: this._type,
      },
    });
  }

  /**
   * Set as primary MFA method
   */
  public setPrimary(isPrimary: boolean): void {
    if (this._isPrimary === isPrimary) {
      return;
    }
    
    this._isPrimary = isPrimary;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: MFAEventType.MFA_PRIMARY_CHANGED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        type: this._type,
        isPrimary,
      },
    });
  }

  /**
   * Update priority
   */
  public updatePriority(newPriority: number): void {
    if (newPriority < 1 || newPriority > 10) {
      throw new EntityValidationError('Priority must be between 1 and 10');
    }
    
    this._priority = newPriority;
    this.touch();
  }

  /**
   * Exit recovery mode (after successful MFA verification)
   */
  public exitRecoveryMode(): void {
    if (this._status !== MFAStatus.RECOVERY_MODE) {
      throw new EntityValidationError('MFA is not in recovery mode');
    }
    
    this._status = MFAStatus.ENABLED;
    this.touch();
  }

  // ============================================================
  // Query Methods
  // ============================================================

  /**
   * Check if MFA is enabled
   */
  public isEnabled(): boolean {
    return this._status === MFAStatus.ENABLED;
  }

  /**
   * Check if MFA is pending verification
   */
  public isPending(): boolean {
    return this._status === MFAStatus.PENDING_VERIFICATION;
  }

  /**
   * Check if MFA is in recovery mode
   */
  public isRecoveryMode(): boolean {
    return this._status === MFAStatus.RECOVERY_MODE;
  }

  /**
   * Get remaining backup codes count
   */
  public getRemainingBackupCodesCount(): number {
    return this._backupCodes.length;
  }

  /**
   * Check if backup codes are low (need regeneration)
   */
  public areBackupCodesLow(): boolean {
    return this._backupCodes.length <= 3;
  }

  /**
   * Get remaining lock time in minutes
   */
  public getRemainingLockTimeMinutes(): number {
    if (!this._lockedUntil) return 0;
    if (this.isLockExpired()) return 0;
    
    const remainingMs = this._lockedUntil.getTime() - Date.now();
    return Math.ceil(remainingMs / (60 * 1000));
  }

  /**
   * Get remaining verification attempts
   */
  public getRemainingAttempts(): number {
    if (this.isLocked()) return 0;
    return Math.max(0, MFA_CONFIG.MAX_VERIFICATION_ATTEMPTS - this._failedAttempts);
  }

  // ============================================================
  // Getters
  // ============================================================

  public getUserId(): string { return this._userId; }
  public getType(): MFAType { return this._type; }
  public getIdentifier(): string { return this._identifier; }
  public getSecret(): string { return this._secret; }
  public getStatus(): MFAStatus { return this._status; }
  public getBackupCodes(): readonly string[] { return [...this._backupCodes]; }
  public getVerifiedAt(): Date | undefined { return this._verifiedAt ? new Date(this._verifiedAt) : undefined; }
  public getLastUsedAt(): Date | undefined { return this._lastUsedAt ? new Date(this._lastUsedAt) : undefined; }
  public getFailedAttempts(): number { return this._failedAttempts; }
  public getLockedUntil(): Date | undefined { return this._lockedUntil ? new Date(this._lockedUntil) : undefined; }
  public isPrimary(): boolean { return this._isPrimary; }
  public getPriority(): number { return this._priority; }

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
      type: this._type,
      identifier: this._identifier,
      status: this._status,
      verifiedAt: this._verifiedAt?.toISOString(),
      lastUsedAt: this._lastUsedAt?.toISOString(),
      isEnabled: this.isEnabled(),
      isPending: this.isPending(),
      isLocked: this.isLocked(),
      isRecoveryMode: this.isRecoveryMode(),
      isPrimary: this._isPrimary,
      priority: this._priority,
      remainingBackupCodes: this.getRemainingBackupCodesCount(),
      areBackupCodesLow: this.areBackupCodesLow(),
      remainingAttempts: this.getRemainingAttempts(),
      remainingLockTimeMinutes: this.getRemainingLockTimeMinutes(),
      // ⚠️ Secret is intentionally excluded from JSON
    };
  }
}

// ============================================================
// Helper Functions
// ============================================================

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

export type { MFAConfig };
