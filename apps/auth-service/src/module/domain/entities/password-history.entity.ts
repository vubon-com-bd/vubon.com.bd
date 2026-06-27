/**
 * Password History Entity - Pure Domain Core (Enterprise Enhanced)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/password-history.entity
 * 
 * @description
 * Represents a historical record of password changes for a user.
 * Used for password reuse prevention, security auditing, and password expiry policies.
 * 
 * Enterprise Rules (Applied):
 * ✅ Shared constants from @vubon/shared-constants
 * ✅ Immutable - History entries never change after creation
 * ✅ Self-validating - Validates password history rules
 * ✅ Framework-free - No external dependencies
 * ✅ Audit ready - Tracks when and how password was changed
 * ✅ Bangladesh specific - Compliance with Bangladesh Bank security guidelines
 * ✅ Password expiry warning threshold
 * ✅ Multi-reason change tracking
 * 
 * Enterprise Enhancements (v2.0):
 * 1. PASSWORD_HISTORY_CONFIG moved to shared-constants
 * 2. Password expiry warning threshold (7 days before expiry)
 * 3. Multi-reason password change tracking
 * 4. Enhanced breach detection with severity levels
 * 5. Password age categorization (new/recent/old/expired)
 * 6. Compliance reporting support
 * 
 * @example
 * const history = PasswordHistory.create(
 *   'user_123',
 *   'hashed_password_value',
 *   PasswordChangeContext.USER,
 *   { ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0...', deviceId: 'device_456' },
 *   idGenerator
 * );
 */

import { BaseEntity, EntityValidationResult, EntityValidationError, type IdGenerator } from './base.entity';

// ✅ ENTERPRISE ENHANCEMENT: Import from shared-constants (Single Source of Truth)
import { PASSWORD_HISTORY_CONFIG } from '@vubon/shared-constants';



// ==================== Enums ====================

/**
 * Password change context (who initiated the change)
 */
export enum PasswordChangeContext {
  USER = 'USER',           // User changed password while logged in
  RESET = 'RESET',         // User reset password via forgot password flow
  ADMIN = 'ADMIN',         // Admin forced password change
  SYSTEM = 'SYSTEM',       // System initiated (expiry policy)
  MIGRATION = 'MIGRATION', // Migrated from legacy system
  BREACH = 'BREACH',       // Password found in breach database
  EXPIRY = 'EXPIRY',       // Password expired by policy
}

/**
 * Password change event types
 */
export enum PasswordHistoryEventType {
  PASSWORD_CHANGED = 'password.changed',
  PASSWORD_EXPIRED = 'password.expired',
  PASSWORD_BREACH_DETECTED = 'password.breach_detected',
  PASSWORD_EXPIRY_WARNING = 'password.expiry_warning',  // ✅ Enterprise: Warning event
  PASSWORD_REUSE_ATTEMPT = 'password.reuse_attempt',    // ✅ Enterprise: Reuse attempt tracking
}

/**
 * ✅ Enterprise: Breach severity levels
 */
export enum BreachSeverity {
  CRITICAL = 'CRITICAL',    // Password found in active breach
  HIGH = 'HIGH',            // Password found in recent breach
  MEDIUM = 'MEDIUM',        // Password found in older breach
  LOW = 'LOW',              // Potential breach
}

/**
 * ✅ Enterprise: Password age category
 */
export enum PasswordAgeCategory {
  NEW = 'NEW',              // Less than 7 days old
  RECENT = 'RECENT',        // 7-30 days old
  MODERATE = 'MODERATE',    // 30-60 days old
  OLD = 'OLD',              // 60-90 days old
  EXPIRING = 'EXPIRING',    // 90+ days old (expired or about to expire)
}

// ==================== Types ====================

/**
 * Password change metadata interface
 */
export interface PasswordChangeMetadata {
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  sessionId?: string;
  adminId?: string;
  adminName?: string;
  reason?: string;
  breachSource?: string;      // If changed due to breach
  breachSeverity?: BreachSeverity;  // ✅ Enterprise: Breach severity level
  previousHash?: string;       // For audit trail
  multipleReasons?: PasswordChangeContext[];  // ✅ Enterprise: Multi-reason tracking
}

/**
 * Password history configuration (from shared-constants)
 */
export type PasswordHistoryConfigType = typeof PASSWORD_HISTORY_CONFIG;

/**
 * ✅ Enterprise: Password expiry warning result
 */
export interface ExpiryWarningResult {
  needsWarning: boolean;
  daysUntilExpiry: number;
  warningThresholdDays: number;
  severity: 'info' | 'warning' | 'critical';
}

// ==================== Constants from Shared Config ====================

// ✅ ENTERPRISE ENHANCEMENT: Use from shared-constants
const {
  PASSWORD_EXPIRY_DAYS,
  EXPIRY_WARNING_DAYS,
} = PASSWORD_HISTORY_CONFIG;

// ==================== Password History Entity ====================

/**
 * Password History Entity
 * 
 * Tracks password changes for security and compliance
 * ✅ Enterprise Enhanced: Warning thresholds, multi-reason tracking, breach severity
 */
export class PasswordHistory extends BaseEntity {
  private readonly _userId: string;
  private readonly _passwordHash: string;
  private readonly _changedAt: Date;
  private readonly _changedBy: PasswordChangeContext;
  private readonly _ipAddress: string | undefined;  // ✅ FIXED: Allow undefined
  private readonly _userAgent: string | undefined;  // ✅ FIXED: Allow undefined
  private readonly _deviceId: string | undefined;   // ✅ FIXED: Allow undefined
  private readonly _sessionId: string | undefined;  // ✅ FIXED: Allow undefined
  private readonly _adminId: string | undefined;    // ✅ FIXED: Allow undefined
  private readonly _adminName: string | undefined;  // ✅ FIXED: Allow undefined
  private readonly _reason: string | undefined;     // ✅ FIXED: Allow undefined
  private readonly _breachSource: string | undefined; // ✅ FIXED: Allow undefined
  private readonly _previousHash: string | undefined; // ✅ FIXED: Allow undefined
  
  // ✅ Enterprise: New fields with undefined allowed
  private readonly _breachSeverity: BreachSeverity | undefined;  // ✅ FIXED: Allow undefined
  private readonly _multipleReasons: PasswordChangeContext[] | undefined;  // ✅ FIXED: Allow undefined

  private constructor(
    id: string,
    userId: string,
    passwordHash: string,
    changedAt: Date,
    changedBy: PasswordChangeContext,
    metadata: PasswordChangeMetadata,
    createdAt: Date,
    updatedAt: Date,
    version: number
  ) {
    super({ id, createdAt, updatedAt, version });
    
    this._userId = userId;
    this._passwordHash = passwordHash;
    this._changedAt = changedAt;
    this._changedBy = changedBy;
    this._ipAddress = metadata.ipAddress;
    this._userAgent = metadata.userAgent;
    this._deviceId = metadata.deviceId;
    this._sessionId = metadata.sessionId;
    this._adminId = metadata.adminId;
    this._adminName = metadata.adminName;
    this._reason = metadata.reason;
    this._breachSource = metadata.breachSource;
    this._previousHash = metadata.previousHash;
    this._breachSeverity = metadata.breachSeverity;
    this._multipleReasons = metadata.multipleReasons;
    
    // ✅ FIXED: Call validate and handle the result
    const validationResult = this.validate();
    if (!validationResult.isValid) {
      throw new EntityValidationError(
        'Password history validation failed',
        validationResult.errors,
        this.constructor.name
      );
    }
  }

  /**
   * ✅ FIXED: Validate entity invariants - returns EntityValidationResult
   */
  protected validate(): EntityValidationResult {
    const errors: string[] = [];
    
    if (!this._userId) {
      errors.push('Password history requires a user ID');
    }
    if (!this._passwordHash || this._passwordHash.length === 0) {
      errors.push('Password history requires a password hash');
    }
    if (this._passwordHash.length < 32) {
      errors.push('Password hash is too short (min 32 characters)');
    }
    if (!this._changedAt) {
      errors.push('Password history requires a change timestamp');
    }
    if (this._changedAt > new Date()) {
      errors.push('Change timestamp cannot be in the future');
    }
    
    // ✅ Enterprise: Validate breach severity if present
    if (this._breachSource && !this._breachSeverity) {
      // Default to HIGH if not specified
      (this as any)._breachSeverity = BreachSeverity.HIGH;
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Create a new password history entry
   * ✅ Enterprise: Enhanced with metadata validation
   */
  public static create(
    userId: string,
    passwordHash: string,
    changedBy: PasswordChangeContext,
    metadata: PasswordChangeMetadata = {},
    idGenerator?: IdGenerator
  ): PasswordHistory {
    const now = new Date();
    const id = idGenerator?.generate() || generateSimpleId();
    
    // ✅ Enterprise: Validate breach severity if breach source is provided
    if (metadata.breachSource && !metadata.breachSeverity) {
      metadata.breachSeverity = BreachSeverity.HIGH;
    }
    
    const history = new PasswordHistory(
      id,
      userId,
      passwordHash,
      now,
      changedBy,
      metadata,
      now,
      now,
      1
    );
    
    const eventMetadata: Record<string, unknown> = {
      userId,
      changedBy,
      reason: metadata.reason,
      adminId: metadata.adminId,
    };
    
    // ✅ Enterprise: Add breach severity to event if applicable
    if (metadata.breachSeverity) {
      eventMetadata.breachSeverity = metadata.breachSeverity;
      eventMetadata.breachSource = metadata.breachSource;
    }
    
    // ✅ Enterprise: Add multiple reasons to event if applicable
    if (metadata.multipleReasons && metadata.multipleReasons.length > 0) {
      eventMetadata.multipleReasons = metadata.multipleReasons;
    }
    
    history.addDomainEvent({
      eventId: generateEventId(),
      eventType: PasswordHistoryEventType.PASSWORD_CHANGED,
      aggregateId: history.id,
      occurredOn: now,
      version: 1,
      metadata: eventMetadata,
    });
    
    return history;
  }

  /**
   * Create a password history entry for a breach detection
   * ✅ Enterprise: Enhanced with severity levels
   */
  public static createForBreach(
    userId: string,
    passwordHash: string,
    breachSource: string,
    severity: BreachSeverity = BreachSeverity.HIGH,
    reason?: string,
    idGenerator?: IdGenerator
  ): PasswordHistory {
    return PasswordHistory.create(
      userId,
      passwordHash,
      PasswordChangeContext.BREACH,
      {
        breachSource,
        breachSeverity: severity,
        reason: reason || `Password compromised in ${breachSource} breach (Severity: ${severity})`,
      },
      idGenerator
    );
  }

  /**
   * Create a password history entry for expiry
   */
  public static createForExpiry(
    userId: string,
    passwordHash: string,
    idGenerator?: IdGenerator
  ): PasswordHistory {
    return PasswordHistory.create(
      userId,
      passwordHash,
      PasswordChangeContext.EXPIRY,
      {
        reason: 'Password expired by security policy',
      },
      idGenerator
    );
  }

  /**
   * ✅ Enterprise: Create with multiple reasons
   */
  public static createWithMultipleReasons(
    userId: string,
    passwordHash: string,
    reasons: PasswordChangeContext[],
    metadata: PasswordChangeMetadata = {},
    idGenerator?: IdGenerator
  ): PasswordHistory {
    if (!reasons || reasons.length === 0) {
      throw new EntityValidationError('At least one reason is required for multi-reason change');
    }
    
    const primaryReason = reasons[0]!;
    const reasonString = `${reasons.join(', ')}${metadata.reason ? `: ${metadata.reason}` : ''}`;
    
    return PasswordHistory.create(
      userId,
      passwordHash,
      primaryReason,
      {
        ...metadata,
        reason: reasonString,
        multipleReasons: reasons,
      },
      idGenerator
    );
  }

  /**
   * ✅ Enterprise: Create for reuse attempt detection
   */
  public static createForReuseAttempt(
    userId: string,
    passwordHash: string,
    attemptedContext: PasswordChangeContext,
    idGenerator?: IdGenerator
  ): PasswordHistory {
    const history = PasswordHistory.create(
      userId,
      passwordHash,
      attemptedContext,
      {
        reason: 'Password reuse attempt detected and blocked',
      },
      idGenerator
    );
    
    history.addDomainEvent({
      eventId: generateEventId(),
      eventType: PasswordHistoryEventType.PASSWORD_REUSE_ATTEMPT,
      aggregateId: history.id,
      occurredOn: new Date(),
      version: history.version,
      metadata: {
        userId,
        attemptedContext,
      },
    });
    
    return history;
  }

  /**
 * Reconstitute from persistence
 */
public static reconstitute(data: {
  id: string;
  userId: string;
  passwordHash: string;
  changedAt: Date;
  changedBy: PasswordChangeContext;
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  sessionId?: string;
  adminId?: string;
  adminName?: string;
  reason?: string;
  breachSource?: string;
  previousHash?: string;
  breachSeverity?: BreachSeverity;
  multipleReasons?: PasswordChangeContext[];
  createdAt: Date;
  updatedAt: Date;
  version: number;
}): PasswordHistory {
  // ✅ FIXED: শুধুমাত্র defined প্রপার্টি সহ অবজেক্ট তৈরি করুন
  const metadata: PasswordChangeMetadata = {};
  
  // শুধুমাত্র defined প্রপার্টি যোগ করুন
  if (data.ipAddress !== undefined) metadata.ipAddress = data.ipAddress;
  if (data.userAgent !== undefined) metadata.userAgent = data.userAgent;
  if (data.deviceId !== undefined) metadata.deviceId = data.deviceId;
  if (data.sessionId !== undefined) metadata.sessionId = data.sessionId;
  if (data.adminId !== undefined) metadata.adminId = data.adminId;
  if (data.adminName !== undefined) metadata.adminName = data.adminName;
  if (data.reason !== undefined) metadata.reason = data.reason;
  if (data.breachSource !== undefined) metadata.breachSource = data.breachSource;
  if (data.previousHash !== undefined) metadata.previousHash = data.previousHash;
  if (data.breachSeverity !== undefined) metadata.breachSeverity = data.breachSeverity;
  if (data.multipleReasons !== undefined) metadata.multipleReasons = data.multipleReasons;
  
  return new PasswordHistory(
    data.id,
    data.userId,
    data.passwordHash,
    data.changedAt,
    data.changedBy,
    metadata,
    data.createdAt,
    data.updatedAt,
    data.version
  );
}
  // ============================================================
  // Getters
  // ============================================================

  public getUserId(): string { return this._userId; }
  public getPasswordHash(): string { return this._passwordHash; }
  public getChangedAt(): Date { return new Date(this._changedAt); }
  public getChangedBy(): PasswordChangeContext { return this._changedBy; }
  public getIpAddress(): string | undefined { return this._ipAddress; }
  public getUserAgent(): string | undefined { return this._userAgent; }
  public getDeviceId(): string | undefined { return this._deviceId; }
  public getSessionId(): string | undefined { return this._sessionId; }
  public getAdminId(): string | undefined { return this._adminId; }
  public getAdminName(): string | undefined { return this._adminName; }
  public getReason(): string | undefined { return this._reason; }
  public getBreachSource(): string | undefined { return this._breachSource; }
  public getPreviousHash(): string | undefined { return this._previousHash; }
  
  // ✅ Enterprise: New getters
  public getBreachSeverity(): BreachSeverity | undefined { return this._breachSeverity; }
  public getMultipleReasons(): readonly PasswordChangeContext[] | undefined { 
    return this._multipleReasons ? [...this._multipleReasons] : undefined; 
  }

  // ============================================================
  // Query Methods
  // ============================================================

  /**
   * Check if password was changed by the user
   */
  public isUserChange(): boolean {
    return this._changedBy === PasswordChangeContext.USER;
  }

  /**
   * Check if password was reset
   */
  public isResetChange(): boolean {
    return this._changedBy === PasswordChangeContext.RESET;
  }

  /**
   * Check if password was changed by admin
   */
  public isAdminChange(): boolean {
    return this._changedBy === PasswordChangeContext.ADMIN;
  }

  /**
   * Check if password was changed due to breach
   */
  public isBreachChange(): boolean {
    return this._changedBy === PasswordChangeContext.BREACH;
  }

  /**
   * Check if password expired
   */
  public isExpiryChange(): boolean {
    return this._changedBy === PasswordChangeContext.EXPIRY;
  }

  /**
   * Get the age of this password entry in days
   */
  public getAgeInDays(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this._changedAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Check if this entry is older than specified days
   */
  public isOlderThan(days: number): boolean {
    return this.getAgeInDays() > days;
  }

  /**
   * Check if this entry is within the last N days
   */
  public isWithinLast(days: number): boolean {
    return this.getAgeInDays() <= days;
  }

  /**
   * Check if password is expired by policy
   */
  public isExpired(expiryDays: number = PASSWORD_EXPIRY_DAYS): boolean {
    return this.getAgeInDays() >= expiryDays;
  }

  /**
   * ✅ Enterprise: Check if password needs expiry warning
   */
  public needsExpiryWarning(warningDays: number = EXPIRY_WARNING_DAYS): ExpiryWarningResult {
    const daysUntilExpiry = PASSWORD_EXPIRY_DAYS - this.getAgeInDays();
    const needsWarning = daysUntilExpiry <= warningDays && daysUntilExpiry > 0;
    
    let severity: 'info' | 'warning' | 'critical' = 'info';
    if (daysUntilExpiry <= 3 && daysUntilExpiry > 0) {
      severity = 'critical';
    } else if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
      severity = 'warning';
    } else if (daysUntilExpiry <= warningDays && daysUntilExpiry > 0) {
      severity = 'info';
    }
    
    return {
      needsWarning,
      daysUntilExpiry: Math.max(0, daysUntilExpiry),
      warningThresholdDays: warningDays,
      severity,
    };
  }

  /**
   * ✅ Enterprise: Get password age category
   */
  public getAgeCategory(): PasswordAgeCategory {
    const ageInDays = this.getAgeInDays();
    
    if (ageInDays < 7) return PasswordAgeCategory.NEW;
    if (ageInDays < 30) return PasswordAgeCategory.RECENT;
    if (ageInDays < 60) return PasswordAgeCategory.MODERATE;
    if (ageInDays < PASSWORD_EXPIRY_DAYS) return PasswordAgeCategory.OLD;
    return PasswordAgeCategory.EXPIRING;
  }

  /**
   * ✅ Enterprise: Check if this was a breach with critical severity
   */
  public isCriticalBreach(): boolean {
    return this.isBreachChange() && this._breachSeverity === BreachSeverity.CRITICAL;
  }

  /**
   * ✅ Enterprise: Check if password change had multiple reasons
   */
  public hasMultipleReasons(): boolean {
    return !!(this._multipleReasons && this._multipleReasons.length > 1);
  }

  // ============================================================
  // Compliance & Reporting
  // ============================================================

  /**
   * ✅ Enterprise: Get compliance report data
   */
  public getComplianceData(): Record<string, unknown> {
    return {
      userId: this._userId,
      changedAt: this._changedAt.toISOString(),
      changedBy: this._changedBy,
      ageInDays: this.getAgeInDays(),
      isExpired: this.isExpired(),
      ageCategory: this.getAgeCategory(),
      breachSeverity: this._breachSeverity,
      hasMultipleReasons: this.hasMultipleReasons(),
      deviceTracked: !!(this._deviceId || this._ipAddress),
    };
  }

  // ============================================================
  // Domain Events
  // ============================================================

  /**
   * Emit password expired event
   * ✅ Enterprise: Enhanced with age category
   */
  public emitExpiredEvent(): void {
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: PasswordHistoryEventType.PASSWORD_EXPIRED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        expiredAt: this._changedAt,
        ageInDays: this.getAgeInDays(),
        ageCategory: this.getAgeCategory(),
      },
    });
  }

  /**
   * Emit expiry warning event
   * ✅ Enterprise: New warning event
   */
  public emitExpiryWarningEvent(): void {
    const warning = this.needsExpiryWarning();
    if (!warning.needsWarning) return;
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: PasswordHistoryEventType.PASSWORD_EXPIRY_WARNING,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        daysUntilExpiry: warning.daysUntilExpiry,
        warningThresholdDays: warning.warningThresholdDays,
        severity: warning.severity,
        ageCategory: this.getAgeCategory(),
      },
    });
  }

  /**
   * Emit breach detected event
   * ✅ Enterprise: Enhanced with severity
   */
  public emitBreachDetectedEvent(breachSource: string, severity?: BreachSeverity): void {
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: PasswordHistoryEventType.PASSWORD_BREACH_DETECTED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        breachSource,
        severity: severity || this._breachSeverity || BreachSeverity.HIGH,
      },
    });
  }

  // ============================================================
  // JSON Serialization
  // ============================================================

  /**
   * Convert to JSON serializable object
   * ✅ Enterprise: Enhanced with new fields
   */
  public toJSON(): Record<string, unknown> {
    const warning = this.needsExpiryWarning();
    
    return {
      ...super.toJSON(),
      userId: this._userId,
      passwordHash: '[REDACTED]', // Don't expose password hash
      changedAt: this._changedAt.toISOString(),
      changedBy: this._changedBy,
      ipAddress: this._ipAddress,
      userAgent: this._userAgent,
      deviceId: this._deviceId,
      sessionId: this._sessionId,
      adminId: this._adminId,
      adminName: this._adminName,
      reason: this._reason,
      breachSource: this._breachSource,
      breachSeverity: this._breachSeverity,
      multipleReasons: this._multipleReasons,
      ageInDays: this.getAgeInDays(),
      ageCategory: this.getAgeCategory(),
      isExpired: this.isExpired(),
      isUserChange: this.isUserChange(),
      isAdminChange: this.isAdminChange(),
      isResetChange: this.isResetChange(),
      isBreachChange: this.isBreachChange(),
      isCriticalBreach: this.isCriticalBreach(),
      hasMultipleReasons: this.hasMultipleReasons(),
      needsExpiryWarning: warning.needsWarning,
      daysUntilExpiry: warning.daysUntilExpiry,
      expiryWarningSeverity: warning.severity,
    };
  }

  /**
   * String representation for debugging
   */
  public toString(): string {
    return `PasswordHistory(userId=${this._userId}, changedAt=${this._changedAt.toISOString()}, changedBy=${this._changedBy}, age=${this.getAgeInDays()}d, ageCategory=${this.getAgeCategory()})`;
  }
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * Generate simple ID (for testing/fallback)
 */
function generateSimpleId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `ph_${timestamp}_${random}`;
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
// Type Guards
// ============================================================

/**
 * Type guard to check if a value is a PasswordHistory
 */
export function isPasswordHistory(value: unknown): value is PasswordHistory {
  return value instanceof PasswordHistory;
}

/**
 * ✅ Enterprise: Type guard for breach severity
 */
export function isBreachSeverity(value: unknown): value is BreachSeverity {
  return typeof value === 'string' && Object.values(BreachSeverity).includes(value as BreachSeverity);
}

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// Enterprise Enhancements Applied in v2.0:
// 1. PASSWORD_HISTORY_CONFIG imported from @vubon/shared-constants
// 2. Password expiry warning threshold (7 days before expiry)
// 3. Multi-reason password change tracking
// 4. Breach severity levels (CRITICAL, HIGH, MEDIUM, LOW)
// 5. Password age categorization (NEW, RECENT, MODERATE, OLD, EXPIRING)
// 6. Compliance reporting support
// 7. Reuse attempt tracking events
// 8. Expiry warning events
// 9. Enhanced breach detection with severity
// 10. Bangladesh Bank security compliance (90 days expiry)
// 
// Bangladesh Specific:
// - 90-day password expiry per Bangladesh Bank guidelines
// - Comprehensive audit trail for regulatory compliance
// 
// ============================================================
