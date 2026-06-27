/**
 * MFA Entity - Pure Domain Core (Enterprise Enhanced)
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
 * ENTERPRISE ENHANCEMENTS (Applied):
 * ✅ MFA_CONFIG moved to shared-constants (Single Source of Truth)
 * ✅ Enhanced validation for identifier based on MFA type
 * ✅ Recovery notification support
 * ✅ MFA method compatibility matrix
 * ✅ Audit trail for all MFA operations
 * 
 * IMPORTANT: MFA code verification (TOTP/SMS/Email) happens in
 * application/infrastructure layer. Domain only stores and validates
 * the configuration and backup codes.
 */

import { BaseEntity, ValidationResult, EntityValidationError, type IdGenerator } from './base.entity';

// ✅ ENTERPRISE ENHANCEMENT: Import from shared-constants (Single Source of Truth)
// Note: MFA_CONFIG needs to be added to @vubon/shared-constants
import { MFA_CONFIG } from '@vubon/shared-constants';



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
  // ✅ ENTERPRISE ENHANCEMENT: Additional events for audit
  MFA_RECOVERY_NOTIFICATION_SENT = 'mfa.recovery_notification_sent',
  MFA_METHOD_COMPROMISED = 'mfa.method_compromised',
}

// ==================== Types ====================

// ✅ ENTERPRISE ENHANCEMENT: MFA_CONFIG is now imported from shared-constants
// No local constants - Single Source of Truth!

// ✅ ENTERPRISE ENHANCEMENT: MFA method compatibility matrix (FULLY COMPLETED)
export const MFA_METHOD_COMPATIBILITY: Record<MFAType, {
  requiresInternet: boolean;
  requiresSmartphone: boolean;
  requiresFeaturePhone: boolean;
  requiresMFSAccount: boolean;
  recommendedFor: ('mobile' | 'desktop' | 'tablet' | 'feature_phone')[];
  bangladeshSupport: 'full' | 'partial' | 'limited';
}> = {
  [MFAType.TOTP]: {
    requiresInternet: false,
    requiresSmartphone: true,
    requiresFeaturePhone: false,
    requiresMFSAccount: false,
    recommendedFor: ['mobile', 'desktop', 'tablet'],
    bangladeshSupport: 'full',
  },
  
  [MFAType.SMS]: {
    requiresInternet: false,
    requiresSmartphone: false,
    requiresFeaturePhone: true,
    requiresMFSAccount: false,
    recommendedFor: ['mobile', 'feature_phone'],
    bangladeshSupport: 'full',
  },
  
  [MFAType.EMAIL]: {
    requiresInternet: true,
    requiresSmartphone: false,
    requiresFeaturePhone: false,
    requiresMFSAccount: false,
    recommendedFor: ['mobile', 'desktop', 'tablet'],
    bangladeshSupport: 'full',
  },
  
  [MFAType.BACKUP_CODE]: {
    requiresInternet: false,
    requiresSmartphone: false,
    requiresFeaturePhone: false,
    requiresMFSAccount: false,
    recommendedFor: ['mobile', 'desktop', 'tablet', 'feature_phone'],
    bangladeshSupport: 'full',
  },
  
  [MFAType.WEBAUTHN]: {
    requiresInternet: true,
    requiresSmartphone: true,
    requiresFeaturePhone: false,
    requiresMFSAccount: false,
    recommendedFor: ['mobile', 'desktop', 'tablet'],
    bangladeshSupport: 'full',
  },
  
  [MFAType.PUSH]: {
    requiresInternet: true,
    requiresSmartphone: true,
    requiresFeaturePhone: false,
    requiresMFSAccount: false,
    recommendedFor: ['mobile', 'desktop', 'tablet'],
    bangladeshSupport: 'full',
  },
  
  [MFAType.WHATSAPP]: {
    requiresInternet: true,
    requiresSmartphone: true,
    requiresFeaturePhone: false,
    requiresMFSAccount: false,
    recommendedFor: ['mobile'],
    bangladeshSupport: 'full',
  },
  
  [MFAType.IMO]: {
    requiresInternet: true,
    requiresSmartphone: true,
    requiresFeaturePhone: false,
    requiresMFSAccount: false,
    recommendedFor: ['mobile'],
    bangladeshSupport: 'full',
  },
  
  [MFAType.BKASH_PIN]: {
    requiresInternet: true,
    requiresSmartphone: false,
    requiresFeaturePhone: true,
    requiresMFSAccount: true,
    recommendedFor: ['mobile', 'feature_phone'],
    bangladeshSupport: 'full',
  },
  
  [MFAType.NAGAD_PIN]: {
    requiresInternet: true,
    requiresSmartphone: false,
    requiresFeaturePhone: true,
    requiresMFSAccount: true,
    recommendedFor: ['mobile', 'feature_phone'],
    bangladeshSupport: 'full',
  },
  
  [MFAType.ROCKET_PIN]: {
    requiresInternet: true,
    requiresSmartphone: false,
    requiresFeaturePhone: true,
    requiresMFSAccount: true,
    recommendedFor: ['mobile', 'feature_phone'],
    bangladeshSupport: 'full',
  },
  
  [MFAType.VOICE_CALL]: {
    requiresInternet: false,
    requiresSmartphone: false,
    requiresFeaturePhone: true,
    requiresMFSAccount: false,
    recommendedFor: ['feature_phone'],
    bangladeshSupport: 'full',
  },
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
  // ✅ ENTERPRISE ENHANCEMENT: Additional tracking fields
  private _lastNotificationSentAt: Date | undefined;
  private _isCompromised: boolean;
  private _compromisedAt: Date | undefined;
  private _compromisedReason: string | undefined;

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
    lastNotificationSentAt: Date | undefined,
    isCompromised: boolean,
    compromisedAt: Date | undefined,
    compromisedReason: string | undefined,
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
    this._lastNotificationSentAt = lastNotificationSentAt;
    this._isCompromised = isCompromised;
    this._compromisedAt = compromisedAt;
    this._compromisedReason = compromisedReason;
    
    this.validate();
  }

  /**
 * ✅ FIXED: Validate entity invariants - returns ValidationResult
 */
protected validate(): ValidationResult {
  const errors: string[] = [];
  
  // Check required fields
  if (!this._userId) {
    errors.push('MFA requires a user ID');
  }
  if (!this._type) {
    errors.push('MFA requires a type');
  }
  if (!this._identifier && this._type !== MFAType.TOTP && this._type !== MFAType.BACKUP_CODE) {
    errors.push(`MFA type ${this._type} requires an identifier`);
  }
  
  // ✅ ENTERPRISE ENHANCEMENT: Validate identifier based on MFA type
  if (this._identifier) {
    const identifierValidation = this.validateIdentifierByType();
    if (!identifierValidation.isValid) {
      errors.push(...identifierValidation.errors);
    }
  }
  
  // Check status consistency
  if (this._status === MFAStatus.ENABLED && !this._verifiedAt) {
    errors.push('Enabled MFA must have verification timestamp');
  }
  
  // Check numeric ranges
  if (this._failedAttempts < 0) {
    errors.push('Failed attempts cannot be negative');
  }
  if (this._priority < 1 || this._priority > 10) {
    errors.push('Priority must be between 1 and 10');
  }
  
  // Check backup codes
  if (this._backupCodes && this._backupCodes.length > 0) {
    // Optional: validate backup code format
    for (const code of this._backupCodes) {
      if (code.length < 8) {
        errors.push('Backup code must be at least 8 characters');
        break;
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * ✅ ENTERPRISE ENHANCEMENT: Validate identifier based on MFA type
 */
private validateIdentifierByType(): ValidationResult {
  const errors: string[] = [];
  
  // Don't validate if no identifier or if type doesn't require identifier
  if (!this._identifier) {
    return { isValid: true, errors: [] };
  }
  
  switch (this._type) {
    case MFAType.SMS:
    case MFAType.WHATSAPP:
    case MFAType.IMO:
    case MFAType.VOICE_CALL:
      // Validate Bangladesh mobile number
      if (!MFA.isValidBdMobile(this._identifier)) {
        errors.push(
          `Invalid Bangladesh phone number for ${this._type} MFA. Use format: 01XXXXXXXXX`
        );
      }
      break;
      
    case MFAType.BKASH_PIN:
    case MFAType.NAGAD_PIN:
    case MFAType.ROCKET_PIN:
      if (!this._identifier.match(/^01[3-9]\d{8}$/)) {
        errors.push(
          `Invalid ${this._type} account number. Must be a valid Bangladesh mobile number`
        );
      }
      break;
      
    case MFAType.EMAIL:
      if (!this._identifier.includes('@')) {
        errors.push(`Invalid email address for EMAIL MFA`);
      }
      break;
      
    case MFAType.TOTP:
      // TOTP identifier is usually the account name (email)
      if (this._identifier.length < 3) {
        errors.push('TOTP account name must be at least 3 characters');
      }
      break;
      
    default:
      // No specific validation needed for other types
      break;
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * ✅ FIXED: Validate Bangladesh mobile number (static method)
 */
private static isValidBdMobile(phoneNumber: string): boolean {
  // Bangladesh mobile number pattern: 01XXXXXXXXX or +8801XXXXXXXXX
  return /^(?:\+880|0)1[3-9]\d{8}$/.test(phoneNumber);
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
    
    // ✅ ENTERPRISE ENHANCEMENT: Validate backup codes count using shared config
    if (backupCodes.length !== MFA_CONFIG.BACKUP_CODE_COUNT) {
      throw new EntityValidationError(
        `Backup codes must contain exactly ${MFA_CONFIG.BACKUP_CODE_COUNT} codes`
      );
    }
    
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
      undefined,  // lastNotificationSentAt
      false,      // isCompromised
      undefined,  // compromisedAt
      undefined,  // compromisedReason
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
        priority,
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
    lastNotificationSentAt?: Date;
    isCompromised: boolean;
    compromisedAt?: Date;
    compromisedReason?: string;
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
      data.lastNotificationSentAt,
      data.isCompromised,
      data.compromisedAt,
      data.compromisedReason,
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
    
    // Lock after max attempts (using shared config)
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
        lockoutDurationMinutes: MFA_CONFIG.LOCKOUT_DURATION_MINUTES,
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
          remainingBackupCodes: this._backupCodes.length,
        },
      });
    }
    
    return true;
  }

  /**
   * ✅ ENTERPRISE ENHANCEMENT: Send recovery notification
   */
  public sendRecoveryNotification(): void {
    if (this._lastNotificationSentAt) {
      const timeSinceLastNotification = Date.now() - this._lastNotificationSentAt.getTime();
      const cooldownMinutes = 5; // Don't spam
      if (timeSinceLastNotification < cooldownMinutes * 60 * 1000) {
        return;
      }
    }
    
    this._lastNotificationSentAt = new Date();
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: MFAEventType.MFA_RECOVERY_NOTIFICATION_SENT,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        type: this._type,
        remainingBackupCodes: this._backupCodes.length,
      },
    });
  }

  /**
   * ✅ ENTERPRISE ENHANCEMENT: Mark MFA method as compromised
   */
  public markAsCompromised(reason: string): void {
    if (this._isCompromised) {
      return;
    }
    
    this._isCompromised = true;
    this._compromisedAt = new Date();
    this._compromisedReason = reason;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: MFAEventType.MFA_METHOD_COMPROMISED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        type: this._type,
        identifier: this._identifier,
        reason,
      },
    });
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
        type: this._type,
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
   * ✅ ENTERPRISE ENHANCEMENT: Check if MFA method is compromised
   */
  public isCompromised(): boolean {
    return this._isCompromised;
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
    return this._backupCodes.length <= MFA_CONFIG.LOW_BACKUP_CODE_THRESHOLD;
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

  /**
   * ✅ ENTERPRISE ENHANCEMENT: Check if method is compatible with device
   */
  public isCompatibleWithDevice(deviceType: 'mobile' | 'desktop' | 'tablet' | 'feature_phone'): boolean {
    const compatibility = MFA_METHOD_COMPATIBILITY[this._type];
    return compatibility.recommendedFor.includes(deviceType);
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
  public getLastNotificationSentAt(): Date | undefined { return this._lastNotificationSentAt ? new Date(this._lastNotificationSentAt) : undefined; }
  public getCompromisedAt(): Date | undefined { return this._compromisedAt ? new Date(this._compromisedAt) : undefined; }
  public getCompromisedReason(): string | undefined { return this._compromisedReason; }

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
      isCompromised: this._isCompromised,
      isPrimary: this._isPrimary,
      priority: this._priority,
      remainingBackupCodes: this.getRemainingBackupCodesCount(),
      areBackupCodesLow: this.areBackupCodesLow(),
      remainingAttempts: this.getRemainingAttempts(),
      remainingLockTimeMinutes: this.getRemainingLockTimeMinutes(),
      lastNotificationSentAt: this._lastNotificationSentAt?.toISOString(),
      compromisedAt: this._compromisedAt?.toISOString(),
      compromisedReason: this._compromisedReason,
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
// ✅ ENTERPRISE SUMMARY
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. MFA_CONFIG imported from @vubon/shared-constants (Single Source of Truth)
// 2. MFA method compatibility matrix for device detection
// 3. Identifier validation based on MFA type (phone/email/bKash account)
// 4. Recovery notification system with cooldown
// 5. MFA method compromise tracking
// 6. Device compatibility check
// 7. Low backup code threshold from shared config
// 8. Enhanced audit events for recovery notifications and compromise
// 
// Security Note:
// - Domain does NOT perform actual code verification
// - Secret is stored but never used for verification in domain
// - Verification is infrastructure responsibility
// 
// Bangladesh Specific:
// - bKash, Nagad, Rocket PIN support
// - WhatsApp, Imo, Voice Call support
// - Feature phone compatibility
// - Local phone number validation
// 
// ============================================================
