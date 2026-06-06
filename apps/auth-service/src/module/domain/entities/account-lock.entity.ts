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
 * 
 * Enterprise Enhancements Applied (v2.0):
 * 1. LOCK_CONFIG moved to shared-constants (Single Source of Truth)
 * 2. IP address tracking for distributed attack detection
 * 3. Multi-channel notification configuration
 * 4. Device fingerprint tracking
 * 5. Geographic location tracking (Bangladesh districts)
 * 6. Enhanced risk scoring with ML-ready factors
 */

import { BaseEntity, EntityValidationError, type IdGenerator } from './base.entity';

// ✅ ENTERPRISE ENHANCEMENT: Import from shared-constants
import { LOCK_CONFIG } from '@vubon/shared-constants';

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
  IP_BASED_ATTACK = 'IP_BASED_ATTACK',           // ✅ Enterprise: Distributed attack detection
  DEVICE_FINGERPRINT_MISMATCH = 'DEVICE_FINGERPRINT_MISMATCH', // ✅ Enterprise: Device theft detection
  UNUSUAL_LOCATION = 'UNUSUAL_LOCATION',         // ✅ Enterprise: Geographic anomaly
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
 * Risk severity levels (✅ Enterprise: Enhanced risk scoring)
 */
export enum RiskSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

/**
 * Notification channel types (✅ Enterprise: Multi-channel notification)
 */
export enum NotificationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  WHATSAPP = 'WHATSAPP',  // Bangladesh specific
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
  // ✅ Enterprise: Enhanced events
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
 * Progressive lock configuration
 */
export interface ProgressiveLockConfig {
  maxFailureCount: number;
  levels: LockDurationConfig[];
}

/**
 * ✅ Enterprise: IP tracking information
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
 * ✅ Enterprise: Device fingerprint tracking
 */
export interface DeviceTrackingInfo {
  deviceId: string;
  fingerprint: string;
  firstSeenAt: Date;
  lastSeenAt: Date;
  trustLevel: 'trusted' | 'unknown' | 'suspicious';
}

/**
 * ✅ Enterprise: Geographic location tracking (Bangladesh specific)
 */
export interface GeoLocationInfo {
  district?: string;
  upazila?: string;
  division?: string;
  isBangladesh: boolean;
  isSuspiciousLocation: boolean;
}

/**
 * ✅ Enterprise: Risk assessment result
 */
export interface RiskAssessment {
  severity: RiskSeverity;
  score: number;           // 0-100
  factors: string[];
  recommendedAction: 'allow' | 'warn' | 'challenge' | 'block';
  requiresAdminReview: boolean;
}

/**
 * ✅ Enterprise: Notification configuration for lock events
 */
export interface NotificationConfig {
  channels: NotificationChannel[];
  sendWarning: boolean;
  sendLockNotification: boolean;
  sendUnlockNotification: boolean;
  includeIpAddress: boolean;
  includeLocation: boolean;
}

// ==================== Constants (from shared-config) ====================

// Use configuration from shared-constants (Single Source of Truth)
const {
  MAX_FAILURE_COUNT,
  PROGRESSIVE_DURATIONS,
  WARNING_THRESHOLD,
  REASON_DURATIONS,
  IP_BLOCK_DURATION_HOURS,
  MAX_IP_ATTEMPTS_PER_HOUR,
  NOTIFICATION_CONFIG,
} = LOCK_CONFIG;

// ==================== Account Lock Entity ====================

/**
 * Account Lock Entity
 * 
 * Tracks account lock state with progressive duration based on lock count
 * ✅ Enterprise Enhanced: IP tracking, device tracking, geo location, risk scoring
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
  
  // ✅ Enterprise: IP tracking for distributed attack detection
  private _ipTrackingInfo: IPTrackingInfo | undefined;
  
  // ✅ Enterprise: Device fingerprint tracking
  private _deviceTrackingInfo: DeviceTrackingInfo | undefined;
  
  // ✅ Enterprise: Geographic location tracking
  private _geoLocationInfo: GeoLocationInfo | undefined;
  
  // ✅ Enterprise: Last notification sent tracking
  private _lastNotificationSentAt: Map<NotificationChannel, Date> = new Map();

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
    this._metadata = metadata;
    this._ipTrackingInfo = ipTrackingInfo;
    this._deviceTrackingInfo = deviceTrackingInfo;
    this._geoLocationInfo = geoLocationInfo;
    
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
    
    // ✅ Enterprise: Validate IP tracking if present
    if (this._ipTrackingInfo && this._ipTrackingInfo.attemptCount < 0) {
      throw new EntityValidationError('IP attempt count cannot be negative');
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
    idGenerator?: IdGenerator,
    ipAddress?: string,
    deviceId?: string,
    geoLocation?: GeoLocationInfo
  ): AccountLock {
    const now = new Date();
    const lockLevel = LockLevel.LEVEL_1;
    const duration = REASON_DURATIONS[reason as keyof typeof REASON_DURATIONS] || PROGRESSIVE_DURATIONS[0];
    const lockedUntil = duration ? new Date(now.getTime() + duration) : undefined;
    const lockId = idGenerator ? idGenerator.generate() : generateLockId();
    
    // ✅ Enterprise: Initialize IP tracking if IP provided
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
    
    // ✅ Enterprise: Initialize device tracking if device ID provided
    let deviceTrackingInfo: DeviceTrackingInfo | undefined;
    if (deviceId) {
      deviceTrackingInfo = {
        deviceId,
        fingerprint: metadata?.fingerprint as string || 'unknown',
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
    
    // ✅ Enterprise: Send notification after lock
    lock.sendLockNotification();
    
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
    const index = lockLevel - 1;
    if (index >= PROGRESSIVE_DURATIONS.length) {
      return PROGRESSIVE_DURATIONS[PROGRESSIVE_DURATIONS.length - 1];
    }
    return PROGRESSIVE_DURATIONS[index];
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
           this._failureCount >= WARNING_THRESHOLD &&
           this._failureCount < MAX_FAILURE_COUNT;
  }

  /**
   * ✅ Enterprise: Check if IP is blocked
   */
  public isIPBlocked(): boolean {
    if (!this._ipTrackingInfo) return false;
    if (!this._ipTrackingInfo.isBlocked) return false;
    
    // Check if IP block has expired
    if (this._ipTrackingInfo.blockedAt) {
      const blockExpiry = new Date(this._ipTrackingInfo.blockedAt.getTime() + IP_BLOCK_DURATION_HOURS * 60 * 60 * 1000);
      if (new Date() > blockExpiry) {
        this._ipTrackingInfo.isBlocked = false;
        return false;
      }
    }
    
    return true;
  }

  /**
   * ✅ Enterprise: Check if IP has exceeded rate limit
   */
  public hasIPExceededRateLimit(): boolean {
    if (!this._ipTrackingInfo) return false;
    
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    // Reset count if last attempt was over an hour ago
    if (this._ipTrackingInfo.lastAttemptAt < oneHourAgo) {
      this._ipTrackingInfo.attemptCount = 0;
      return false;
    }
    
    return this._ipTrackingInfo.attemptCount >= MAX_IP_ATTEMPTS_PER_HOUR;
  }

  /**
   * ✅ Enterprise: Get notification configuration
   */
  private getNotificationConfig(): NotificationConfig {
    const config = NOTIFICATION_CONFIG[this._lockLevel as keyof typeof NOTIFICATION_CONFIG];
    return config || NOTIFICATION_CONFIG.LEVEL_1;
  }

  /**
   * ✅ Enterprise: Send lock notification
   */
  private sendLockNotification(): void {
    const config = this.getNotificationConfig();
    
    for (const channel of config.channels) {
      const lastSent = this._lastNotificationSentAt.get(channel);
      const cooldownMinutes = 5; // Don't spam
      
      if (!lastSent || (Date.now() - lastSent.getTime()) > cooldownMinutes * 60 * 1000) {
        this._lastNotificationSentAt.set(channel, new Date());
        
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
   * ✅ Enterprise: Enhanced with IP and device tracking
   * 
   * @param ipAddress - Optional IP address for tracking
   * @param deviceId - Optional device ID for tracking
   * @returns Current failure count
   * @throws {Error} If account is currently locked and not expired
   */
  public incrementFailure(ipAddress?: string, deviceId?: string): number {
    // If locked and not expired, cannot increment
    if (this.isLocked() && !this.isLockExpired()) {
      throw new EntityValidationError('Account is currently locked');
    }
    
    // ✅ Enterprise: Update IP tracking
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
        // IP changed - could be distributed attack
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
    
    // ✅ Enterprise: Update device tracking
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
    if (this._failureCount >= MAX_FAILURE_COUNT && !this.isLocked()) {
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
    
    // ✅ Enterprise: Send notification
    this.sendLockNotification();
  }

  /**
   * Lock account manually (admin or security)
   * ✅ Enterprise: Enhanced with IP and device tracking
   */
  public lock(
    reason: AccountLockReason, 
    duration?: number, 
    lockedBy?: string, 
    metadata?: Record<string, unknown>,
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
    this._metadata = metadata;
    
    // ✅ Enterprise: Update tracking info
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
    
    // ✅ Enterprise: Send notification
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

  /**
   * ✅ Enterprise: Assess account risk level
   */
  public assessRisk(): RiskAssessment {
    const factors: string[] = [];
    let score = 0;
    
    // Factor 1: Failure count
    if (this._failureCount >= MAX_FAILURE_COUNT) {
      score += 40;
      factors.push('Maximum failure attempts reached');
    } else if (this._failureCount >= WARNING_THRESHOLD) {
      score += 20;
      factors.push('Multiple failed attempts');
    }
    
    // Factor 2: Lock level
    switch (this._lockLevel) {
      case LockLevel.LEVEL_4:
        score += 30;
        factors.push('Permanent lock status');
        break;
      case LockLevel.LEVEL_3:
        score += 20;
        factors.push('Extended lock duration (24h+)');
        break;
      case LockLevel.LEVEL_2:
        score += 10;
        factors.push('Medium lock duration');
        break;
    }
    
    // Factor 3: IP-based attack detection
    if (this._ipTrackingInfo) {
      if (this._ipTrackingInfo.attemptCount >= MAX_IP_ATTEMPTS_PER_HOUR) {
        score += 15;
        factors.push(`High failure rate from IP: ${this._ipTrackingInfo.ipAddress}`);
      }
      if (this._ipTrackingInfo.isBlocked) {
        score += 10;
        factors.push('IP address is blocked');
      }
    }
    
    // Factor 4: Device trust level
    if (this._deviceTrackingInfo) {
      if (this._deviceTrackingInfo.trustLevel === 'suspicious') {
        score += 10;
        factors.push('Suspicious device fingerprint');
      }
    }
    
    // Factor 5: Geographic anomaly
    if (this._geoLocationInfo?.isSuspiciousLocation) {
      score += 15;
      factors.push(`Unusual location: ${this._geoLocationInfo.district || 'unknown'}`);
    }
    
    // Determine severity and recommended action
    let severity: RiskSeverity;
    let recommendedAction: 'allow' | 'warn' | 'challenge' | 'block';
    let requiresAdminReview = false;
    
    if (score >= 70) {
      severity = RiskSeverity.CRITICAL;
      recommendedAction = 'block';
      requiresAdminReview = true;
    } else if (score >= 50) {
      severity = RiskSeverity.HIGH;
      recommendedAction = 'challenge';
      requiresAdminReview = true;
    } else if (score >= 30) {
      severity = RiskSeverity.MEDIUM;
      recommendedAction = 'warn';
    } else {
      severity = RiskSeverity.LOW;
      recommendedAction = 'allow';
    }
    
    return {
      severity,
      score,
      factors,
      recommendedAction,
      requiresAdminReview,
    };
  }

  /**
   * ✅ Enterprise: Get notification channels for this lock
   */
  public getNotificationChannels(): NotificationChannel[] {
    const config = this.getNotificationConfig();
    return config.channels;
  }

  /**
   * ✅ Enterprise: Update geographic location
   */
  public updateGeoLocation(district?: string, upazila?: string, division?: string): void {
    const oldLocation = this._geoLocationInfo?.district;
    
    this._geoLocationInfo = {
      district,
      upazila,
      division,
      isBangladesh: !!district, // Assuming district means Bangladesh
      isSuspiciousLocation: oldLocation !== undefined && oldLocation !== district,
    };
    
    if (this._geoLocationInfo.isSuspiciousLocation) {
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: AccountLockEventType.ACCOUNT_LOCK_GEO_TRACKED,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this._userId,
          oldLocation,
          newLocation: district,
          isSuspicious: true,
        },
      });
    }
    
    this.touch();
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
    return Math.max(0, MAX_FAILURE_COUNT - this._failureCount);
  }

  /**
   * Check if account is at risk (close to lock)
   */
  public isAtRisk(): boolean {
    return !this.isLocked() && this._failureCount >= MAX_FAILURE_COUNT - 2;
  }

  /**
   * ✅ Enterprise: Get IP tracking information
   */
  public getIPTrackingInfo(): IPTrackingInfo | undefined {
    return this._ipTrackingInfo ? { ...this._ipTrackingInfo } : undefined;
  }

  /**
   * ✅ Enterprise: Get device tracking information
   */
  public getDeviceTrackingInfo(): DeviceTrackingInfo | undefined {
    return this._deviceTrackingInfo ? { ...this._deviceTrackingInfo } : undefined;
  }

  /**
   * ✅ Enterprise: Get geographic location information
   */
  public getGeoLocationInfo(): GeoLocationInfo | undefined {
    return this._geoLocationInfo ? { ...this._geoLocationInfo } : undefined;
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
    const riskAssessment = this.assessRisk();
    
    return {
      ...super
