/**
 * Account Lock Entity - Pure Domain Core (Enterprise Enhanced)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/account-lock.entity
 * 
 * @description
 * Represents account lock state with progressive locking based on failure count.
 * Used for brute force protection and security policy enforcement.
 * 
 * Enterprise Features:
 * ✅ Shared configuration from @vubon/shared-constants
 * ✅ Progressive lock durations (15m -> 1h -> 24h -> permanent)
 * ✅ Auto-lock after configurable failure threshold
 * ✅ IP-based tracking for distributed attacks
 * ✅ Multi-channel notification support
 * ✅ Domain events for audit trail
 * ✅ Framework-free, pure domain logic
 * ✅ Bangladesh specific - SIM swap detection support
 */

import { BaseEntity, EntityValidationError, type IdGenerator, type EntityMetadata } from './base.entity';

// ✅ FIXED: Correct imports from shared-constants
import { 
  LOCK_CONFIG,
  REASON_DURATIONS,
  IP_BLOCKING_CONFIG,
  NOTIFICATION_CONFIG,
  type NotificationChannel,
} from '@vubon/shared-constants';

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
  SIM_SWAP_DETECTED = 'SIM_SWAP_DETECTED',
  PAYMENT_FRAUD_SUSPECTED = 'PAYMENT_FRAUD_SUSPECTED',
  ACCOUNT_TAKEOVER_ATTEMPT = 'ACCOUNT_TAKEOVER_ATTEMPT',
  IP_BASED_ATTACK = 'IP_BASED_ATTACK',
  DEVICE_FINGERPRINT_MISMATCH = 'DEVICE_FINGERPRINT_MISMATCH',
  UNUSUAL_LOCATION = 'UNUSUAL_LOCATION',
}

/**
 * Lock level (progressive)
 */
export enum LockLevel {
  LEVEL_1 = 1,
  LEVEL_2 = 2,
  LEVEL_3 = 3,
  LEVEL_4 = 4,
}

/**
 * Risk severity levels
 */
export enum RiskSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
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
  ACCOUNT_LOCK_IP_TRACKED = 'account.lock.ip_tracked',
  ACCOUNT_LOCK_DEVICE_TRACKED = 'account.lock.device_tracked',
  ACCOUNT_LOCK_GEO_TRACKED = 'account.lock.geo_tracked',
  ACCOUNT_LOCK_NOTIFICATION_SENT = 'account.lock.notification_sent',
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
 * IP tracking information
 */
export interface IPTrackingInfo {
  ipAddress: string;
  firstAttemptAt: Date;
  lastAttemptAt: Date;
  attemptCount: number;
  isBlocked: boolean;
  blockedAt?: Date;
}

/**
 * Device fingerprint tracking
 */
export interface DeviceTrackingInfo {
  deviceId: string;
  fingerprint: string;
  firstSeenAt: Date;
  lastSeenAt: Date;
  trustLevel: 'trusted' | 'unknown' | 'suspicious';
}

/**
 * Geographic location tracking (Bangladesh specific)
 */
export interface GeoLocationInfo {
  district: string;
  upazila?: string;
  division?: string;
  isBangladesh: boolean;
  isSuspiciousLocation: boolean;
}

/**
 * Risk assessment result
 */
export interface RiskAssessment {
  severity: RiskSeverity;
  score: number;
  factors: string[];
  recommendedAction: 'allow' | 'warn' | 'challenge' | 'block';
  requiresAdminReview: boolean;
}

/**
 * Notification configuration for lock events
 */
export interface NotificationConfig {
  channels: NotificationChannel[];
  sendWarning: boolean;
  sendLockNotification: boolean;
  sendUnlockNotification: boolean;
  includeIpAddress: boolean;
  includeLocation: boolean;
}

// ============================================================
// Helper Functions
// ============================================================

function generateLockId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `lock_${timestamp}_${random}`;
}

function generateEventId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  const counter = (generateEventId as any).counter = ((generateEventId as any).counter || 0) + 1;
  return `evt_${timestamp}_${random}_${counter}`;
}

// ============================================================
// Account Lock Entity
// ============================================================

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
  // ✅ FIXED: private _metadata সরিয়ে ফেলুন, BaseEntity এর metadata ব্যবহার করুন
  private _ipTrackingInfo: IPTrackingInfo | undefined;
  private _deviceTrackingInfo: DeviceTrackingInfo | undefined;
  private _geoLocationInfo: GeoLocationInfo | undefined;
  private _lastNotificationSentAt: Map<string, Date> = new Map();

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
    metadata: EntityMetadata | undefined,
    ipTrackingInfo: IPTrackingInfo | undefined,
    deviceTrackingInfo: DeviceTrackingInfo | undefined,
    geoLocationInfo: GeoLocationInfo | undefined,
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
    
    // ✅ FIXED: super এর metadata ব্যবহার করুন (BaseEntity এর protected _metadata)
    (this as any)._metadata = metadata;
    
    this._ipTrackingInfo = ipTrackingInfo;
    this._deviceTrackingInfo = deviceTrackingInfo;
    this._geoLocationInfo = geoLocationInfo;
    
    this.validate();
  }

  /**
   * ✅ FIXED: validate() মেথড ঠিক করুন
   */
  protected validate(): ValidationResult {
    const errors: string[] = [];
    
    if (!this._userId) {
      errors.push('Account lock requires a user ID');
    }
    if (this._failureCount < 0) {
      errors.push('Failure count cannot be negative');
    }
    if (this._lockLevel < LockLevel.LEVEL_1 || this._lockLevel > LockLevel.LEVEL_4) {
      errors.push('Invalid lock level');
    }
    if (this._ipTrackingInfo && this._ipTrackingInfo.attemptCount < 0) {
      errors.push('IP attempt count cannot be negative');
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
   * Factory method to create a new account lock
   */
  public static create(
    userId: string,
    reason: AccountLockReason,
    failureCount: number = 0,
    lockedBy?: string,
    metadata?: EntityMetadata,
    idGenerator?: IdGenerator,
    ipAddress?: string,
    deviceId?: string,
    geoLocation?: GeoLocationInfo
  ): AccountLock {
    const now = new Date();
    const lockLevel = LockLevel.LEVEL_1;
    
    const duration = REASON_DURATIONS[reason as keyof typeof REASON_DURATIONS];
    const lockedUntil = duration ? new Date(now.getTime() + duration) : undefined;
    const lockId = idGenerator ? idGenerator.generate() : generateLockId();
    
    let ipTrackingInfo: IPTrackingInfo | undefined;
    if (ipAddress) {
      ipTrackingInfo = {
        ipAddress,
        firstAttemptAt: now,
        lastAttemptAt: now,
        attemptCount: failureCount,
        isBlocked: false,
      };
    }
    
    let deviceTrackingInfo: DeviceTrackingInfo | undefined;
    if (deviceId) {
      deviceTrackingInfo = {
        deviceId,
        fingerprint: (metadata?.custom?.fingerprint as string) || 'unknown',
        firstSeenAt: now,
        lastSeenAt: now,
        trustLevel: 'unknown',
      };
    }
    
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
      ipTrackingInfo,
      deviceTrackingInfo,
      geoLocation,
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
        ipAddress: ipTrackingInfo?.ipAddress,
        deviceId,
        geoLocation: geoLocation?.district,
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
    metadata?: EntityMetadata;
    ipTrackingInfo?: IPTrackingInfo;
    deviceTrackingInfo?: DeviceTrackingInfo;
    geoLocationInfo?: GeoLocationInfo;
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
      data.ipTrackingInfo,
      data.deviceTrackingInfo,
      data.geoLocationInfo,
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
    const durations = LOCK_CONFIG.PROGRESSIVE_DURATIONS;
    switch (lockLevel) {
      case LockLevel.LEVEL_1: return durations.LEVEL_1;
      case LockLevel.LEVEL_2: return durations.LEVEL_2;
      case LockLevel.LEVEL_3: return durations.LEVEL_3;
      case LockLevel.LEVEL_4: return durations.LEVEL_4;
      default: return durations.LEVEL_1;
    }
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

  /**
   * Check if IP is blocked
   */
  public isIPBlocked(): boolean {
    if (!this._ipTrackingInfo) return false;
    if (!this._ipTrackingInfo.isBlocked) return false;
    
    if (this._ipTrackingInfo.blockedAt) {
      const blockExpiry = new Date(
        this._ipTrackingInfo.blockedAt.getTime() + 
        IP_BLOCKING_CONFIG.BLOCK_DURATION_HOURS * 60 * 60 * 1000
      );
      if (new Date() > blockExpiry) {
        this._ipTrackingInfo.isBlocked = false;
        return false;
      }
    }
    
    return true;
  }

  /**
   * Check if IP has exceeded rate limit
   */
  public hasIPExceededRateLimit(): boolean {
    if (!this._ipTrackingInfo) return false;
    
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    if (this._ipTrackingInfo.lastAttemptAt < oneHourAgo) {
      this._ipTrackingInfo.attemptCount = 0;
      return false;
    }
    
    return this._ipTrackingInfo.attemptCount >= IP_BLOCKING_CONFIG.MAX_ATTEMPTS_PER_HOUR;
  }

  /**
   * Get notification configuration
   */
  private getNotificationConfig(): NotificationConfig {
    const levelKey = `LEVEL_${this._lockLevel}` as keyof typeof NOTIFICATION_CONFIG.BY_LEVEL;
    const config = NOTIFICATION_CONFIG.BY_LEVEL[levelKey];
    return config as unknown as NotificationConfig;
  }

  /**
   * Send lock notification
   */
  private sendLockNotification(): void {
    const config = this.getNotificationConfig();
    
    for (const channel of config.channels) {
      const channelKey = String(channel);
      const lastSent = this._lastNotificationSentAt.get(channelKey);
      const cooldownMinutes = NOTIFICATION_CONFIG.NOTIFICATION_COOLDOWN_MINUTES;
      
      if (!lastSent || (Date.now() - lastSent.getTime()) > cooldownMinutes * 60 * 1000) {
        this._lastNotificationSentAt.set(channelKey, new Date());
        
        this.addDomainEvent({
          eventId: generateEventId(),
          eventType: AccountLockEventType.ACCOUNT_LOCK_NOTIFICATION_SENT,
          aggregateId: this.id,
          occurredOn: new Date(),
          version: this.version,
          metadata: {
            userId: this._userId,
            channel,
            lockLevel: this._lockLevel,
            reason: this._reason,
            includeIpAddress: config.includeIpAddress,
            includeLocation: config.includeLocation,
            ipAddress: config.includeIpAddress ? this._ipTrackingInfo?.ipAddress : undefined,
            location: config.includeLocation ? this._geoLocationInfo?.district : undefined,
          },
        });
      }
    }
  }

  // ============================================================
  // Business Methods
  // ============================================================

  /**
   * Increment failure count and auto-lock if threshold exceeded
   */
  public incrementFailure(ipAddress?: string, deviceId?: string): number {
    // If locked and not expired, cannot increment
    if (this.isLocked() && !this.isLockExpired()) {
      throw new EntityValidationError('Account is currently locked');
    }
    
    // Update IP tracking
    if (ipAddress) {
      if (!this._ipTrackingInfo) {
        this._ipTrackingInfo = {
          ipAddress,
          firstAttemptAt: new Date(),
          lastAttemptAt: new Date(),
          attemptCount: 0,
          isBlocked: false,
        };
      } else if (this._ipTrackingInfo.ipAddress !== ipAddress) {
        this.addDomainEvent({
          eventId: generateEventId(),
          eventType: AccountLockEventType.ACCOUNT_LOCK_IP_TRACKED,
          aggregateId: this.id,
          occurredOn: new Date(),
          version: this.version,
          metadata: {
            userId: this._userId,
            oldIp: this._ipTrackingInfo.ipAddress,
            newIp: ipAddress,
            isDistributedAttack: true,
          },
        });
        this._ipTrackingInfo.ipAddress = ipAddress;
      }
      
      this._ipTrackingInfo.lastAttemptAt = new Date();
      this._ipTrackingInfo.attemptCount++;
      
      // Block IP if rate limit exceeded
      if (this.hasIPExceededRateLimit() && !this._ipTrackingInfo.isBlocked) {
        this._ipTrackingInfo.isBlocked = true;
        this._ipTrackingInfo.blockedAt = new Date();
      }
    }
    
    // Update device tracking
    if (deviceId) {
      if (!this._deviceTrackingInfo) {
        this._deviceTrackingInfo = {
          deviceId,
          fingerprint: 'unknown',
          firstSeenAt: new Date(),
          lastSeenAt: new Date(),
          trustLevel: 'unknown',
        };
      } else if (this._deviceTrackingInfo.deviceId !== deviceId) {
        this.addDomainEvent({
          eventId: generateEventId(),
          eventType: AccountLockEventType.ACCOUNT_LOCK_DEVICE_TRACKED,
          aggregateId: this.id,
          occurredOn: new Date(),
          version: this.version,
          metadata: {
            userId: this._userId,
            oldDeviceId: this._deviceTrackingInfo.deviceId,
            newDeviceId: deviceId,
          },
        });
        this._deviceTrackingInfo.deviceId = deviceId;
        this._deviceTrackingInfo.trustLevel = 'suspicious';
      }
      this._deviceTrackingInfo.lastSeenAt = new Date();
    }
    
    // If lock expired, reset state
    if (this.isLocked() && this.isLockExpired()) {
      this._lockedUntil = undefined;
      this._unlockedAt = undefined;
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
          ipAddress: this._ipTrackingInfo?.ipAddress,
          deviceId: this._deviceTrackingInfo?.deviceId,
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
        ipAddress,
        deviceId,
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
        ipAddress: this._ipTrackingInfo?.ipAddress,
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
    
    // Send notification
    this.sendLockNotification();
  }

  /**
   * Lock account manually (admin or security)
   */
  public lock(
    reason: AccountLockReason, 
    duration?: number, 
    lockedBy?: string, 
    metadata?: EntityMetadata,
    ipAddress?: string,
    deviceId?: string
  ): void {
    if (this.isLocked() && !this.isLockExpired()) {
      throw new EntityValidationError('Account already locked');
    }
    
    const lockDuration = duration ?? REASON_DURATIONS[reason as keyof typeof REASON_DURATIONS];
    this._lockedUntil = lockDuration ? new Date(Date.now() + lockDuration) : undefined;
    this._reason = reason;
    this._lockedAt = new Date();
    this._unlockedAt = undefined;
    this._lockedBy = lockedBy;
    
    // ✅ FIXED: super এর metadata ব্যবহার করুন
    (this as any)._metadata = metadata;
    
    // Update tracking info
    if (ipAddress && !this._ipTrackingInfo) {
      this._ipTrackingInfo = {
        ipAddress,
        firstAttemptAt: this._lockedAt,
        lastAttemptAt: this._lockedAt,
        attemptCount: 0,
        isBlocked: true,
        blockedAt: this._lockedAt,
      };
    }
    
    if (deviceId && !this._deviceTrackingInfo) {
      this._deviceTrackingInfo = {
        deviceId,
        fingerprint: 'unknown',
        firstSeenAt: this._lockedAt,
        lastSeenAt: this._lockedAt,
        trustLevel: 'suspicious',
      };
    }
    
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
        ipAddress,
        deviceId,
      },
    });
    
    // Send notification
    this.sendLockNotification();
  }

  /**
   * Unlock account
   */
  public unlock(unlockedBy?: string, reason?: string): void {
    if (!this.isLocked()) {
      throw new EntityValidationError('Account is not locked');
    }
    
    this._unlockedAt = new Date();
    this._unlockedBy = unlockedBy;
    this._unlockReason = reason;
    this._lockedUntil = undefined;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: AccountLockEventType.ACCOUNT_UNLOCKED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        unlockedBy,
        reason,
        wasPermanent: this._lockLevel === LockLevel.LEVEL_4,
        lockDurationMs: this._unlockedAt.getTime() - this._lockedAt.getTime(),
      },
    });
  }

  // ============================================================
  // Query Methods
  // ============================================================

  /**
   * Check if account is currently locked
   */
  public isLocked(): boolean {
    if (this._lockedUntil === null) return true;
    if (!this._lockedUntil) return false;
    return new Date() < this._lockedUntil;
  }

  /**
   * Check if lock has expired
   */
  public isLockExpired(): boolean {
    if (!this._lockedUntil) return true;
    return new Date() > this._lockedUntil;
  }

  /**
   * Get remaining lock time in milliseconds
   */
  public getRemainingLockTimeMs(): number {
    if (!this.isLocked()) return 0;
    if (!this._lockedUntil) return 0;
    return Math.max(0, this._lockedUntil.getTime() - new Date().getTime());
  }

  /**
   * Get remaining lock time in minutes
   */
  public getRemainingLockTimeMinutes(): number {
    return Math.ceil(this.getRemainingLockTimeMs() / (60 * 1000));
  }

  /**
   * Get remaining attempts before lock
   */
  public getRemainingAttempts(): number {
    return Math.max(0, LOCK_CONFIG.MAX_FAILURE_COUNT - this._failureCount);
  }

  /**
   * Check if account is at risk (close to lock threshold)
   */
  public isAtRisk(): boolean {
    return this._failureCount >= LOCK_CONFIG.WARNING_THRESHOLD;
  }

  /**
   * Get lock level display name
   */
  public getLockLevelName(): string {
    const levelKey = `LEVEL_${this._lockLevel}` as keyof typeof LOCK_CONFIG.LOCK_LEVEL_NAMES;
    return LOCK_CONFIG.LOCK_LEVEL_NAMES[levelKey];
  }

  /**
   * Get lock severity score (0-100)
   */
  public getSeverityScore(): number {
    const levelKey = `LEVEL_${this._lockLevel}` as keyof typeof LOCK_CONFIG.LOCK_LEVEL_SEVERITY;
    return LOCK_CONFIG.LOCK_LEVEL_SEVERITY[levelKey];
  }

  /**
   * Check if admin review is required
   */
  public requiresAdminReview(): boolean {
    const levelKey = `LEVEL_${this._lockLevel}` as keyof typeof LOCK_CONFIG.LOCK_LEVEL_REQUIRES_ADMIN;
    return LOCK_CONFIG.LOCK_LEVEL_REQUIRES_ADMIN[levelKey];
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
  
  // ✅ FIXED: metadata getter
  public getMetadata(): EntityMetadata | undefined {
    return (this as any)._metadata;
  }
  
  public getIPTrackingInfo(): IPTrackingInfo | undefined { return this._ipTrackingInfo; }
  public getDeviceTrackingInfo(): DeviceTrackingInfo | undefined { return this._deviceTrackingInfo; }
  public getGeoLocationInfo(): GeoLocationInfo | undefined { return this._geoLocationInfo; }

  // ============================================================
  // JSON Serialization
  // ============================================================

  /**
   * Convert to JSON serializable object
   */
  public override toJSON(): Record<string, unknown> {
    const metadata = (this as any)._metadata;
    
    return {
      ...super.toJSON(),
      userId: this._userId,
      reason: this._reason,
      lockedAt: this._lockedAt.toISOString(),
      unlockedAt: this._unlockedAt?.toISOString(),
      failureCount: this._failureCount,
      lockedUntil: this._lockedUntil?.toISOString(),
      lockLevel: this._lockLevel,
      lockLevelName: this.getLockLevelName(),
      severityScore: this.getSeverityScore(),
      lockedBy: this._lockedBy,
      unlockedBy: this._unlockedBy,
      unlockReason: this._unlockReason,
      metadata: metadata ? { ...metadata } : undefined,
      ipTrackingInfo: this._ipTrackingInfo,
      deviceTrackingInfo: this._deviceTrackingInfo,
      geoLocationInfo: this._geoLocationInfo,
      isLocked: this.isLocked(),
      isLockExpired: this.isLockExpired(),
      remainingLockTimeMinutes: this.getRemainingLockTimeMinutes(),
      remainingAttempts: this.getRemainingAttempts(),
      isAtRisk: this.isAtRisk(),
      requiresAdminReview: this.requiresAdminReview(),
    };
  }

  /**
   * String representation for debugging
   */
  public override toString(): string {
    return `AccountLock(userId=${this._userId}, level=${this._lockLevel}, locked=${this.isLocked()}, remaining=${this.getRemainingLockTimeMinutes()}m)`;
  }
}

// ============================================================
// ValidationResult টাইপ (BaseEntity থেকে ইমপোর্ট করা উচিত)
// ============================================================

import type { ValidationResult } from './base.entity';
