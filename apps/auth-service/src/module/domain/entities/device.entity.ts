/**
 * Device Entity - Pure Domain Core (Enterprise Enhanced)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/device.entity
 * 
 * @description
 * Represents a user's device for session management, MFA trust, and security tracking.
 * Used for device fingerprinting, trusted device management, and fraud detection.
 * 
 * Enterprise Rules:
 * ✅ Maximum trusted devices per user
 * ✅ Device fingerprinting with normalization
 * ✅ Device type detection via UserAgent VO
 * ✅ Domain events for device lifecycle
 * ✅ Framework-free (no crypto dependency)
 * ✅ Bangladesh specific - Feature phone detection
 * ✅ Mobile operator tracking for Bangladesh ISP detection
 * ✅ Device limit enforcement
 * ✅ Trust level expiration tracking
 */

import { BaseEntity, EntityValidationError, type IdGenerator } from './base.entity';
import { DeviceId, type DevicePlatform } from '../value-objects/device-id.vo';
import { UserAgent, DeviceType as UserAgentDeviceType } from '../value-objects/user-agent.vo';
import { IpAddress } from '../value-objects/ip-address.vo';

// ✅ ENTERPRISE ENHANCEMENT: Import from shared-constants (Single Source of Truth)
import { DEVICE_CONFIG } from '@vubon/shared-constants';

// ==================== Types ====================

/**
 * Validation result interface (matching base entity)
 */
export interface DeviceValidationResult {
  isValid: boolean;
  errors: readonly string[];
}

// ==================== Enums ====================

/**
 * Device type enum (domain-specific)
 */
export enum DeviceType {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  DESKTOP = 'DESKTOP',
  LAPTOP = 'LAPTOP',
  TV = 'TV',
  BOT = 'BOT',
  WEARABLE = 'WEARABLE',
  CONSOLE = 'CONSOLE',
  FEATURE_PHONE = 'FEATURE_PHONE',
  UNKNOWN = 'UNKNOWN',
}

/**
 * Device status
 */
export enum DeviceStatus {
  ACTIVE = 'ACTIVE',
  TRUSTED = 'TRUSTED',
  SUSPENDED = 'SUSPENDED',
  BLOCKED = 'BLOCKED',
  STALE = 'STALE',
}

/**
 * Device trust level
 */
export enum DeviceTrustLevel {
  UNTRUSTED = 'UNTRUSTED',
  STANDARD = 'STANDARD',
  TRUSTED = 'TRUSTED',
  HIGH_TRUST = 'HIGH_TRUST',
  MAXIMUM_TRUST = 'MAXIMUM_TRUST',
}

/**
 * Bangladesh mobile operator types
 */
export type BDMobileOperator = 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';

/**
 * Device event types
 */
export enum DeviceEventType {
  DEVICE_REGISTERED = 'device.registered',
  DEVICE_TRUSTED = 'device.trusted',
  DEVICE_TRUST_REVOKED = 'device.trust_revoked',
  DEVICE_FINGERPRINT_UPDATED = 'device.fingerprint_updated',
  DEVICE_BLOCKED = 'device.blocked',
  DEVICE_SUSPENDED = 'device.suspended',
  DEVICE_STATUS_CHANGED = 'device.status_changed',
  DEVICE_TYPE_CHANGED = 'device.type_changed',
  DEVICE_USAGE_RECORDED = 'device.usage_recorded',
  DEVICE_OPERATOR_DETECTED = 'device.operator_detected',
  DEVICE_LIMIT_WARNING = 'device.limit_warning',
}

// ==================== Types ====================

/**
 * Device configuration interface (now from shared-constants)
 */
export type { DeviceConfig } from '@vubon/shared-constants';

// ==================== Device Entity ====================

/**
 * Device Entity
 * 
 * Represents a user's device for authentication and security
 */
export class Device extends BaseEntity {
  private _userId: string;
  private _deviceId: DeviceId;
  private _deviceType: DeviceType;
  private _devicePlatform: DevicePlatform;
  private _userAgent: UserAgent;
  private _status: DeviceStatus;
  private _trustLevel: DeviceTrustLevel;
  private _lastUsedAt: Date;
  private _trustedAt: Date | undefined;
  private _fingerprint: string | undefined;
  private _usageCount: number;
  private _lastIpAddress: IpAddress | undefined;
  private _trustExpiresAt: Date | undefined;
  
  // ✅ ENTERPRISE ENHANCEMENT: Bangladesh mobile operator tracking
  private _mobileOperator: BDMobileOperator | undefined;
  
  // ✅ ENTERPRISE ENHANCEMENT: Device trust score (0-100)
  private _trustScore: number = 0;

  private constructor(
    id: string,
    userId: string,
    deviceId: DeviceId,
    deviceType: DeviceType,
    devicePlatform: DevicePlatform,
    userAgent: UserAgent,
    status: DeviceStatus,
    trustLevel: DeviceTrustLevel,
    lastUsedAt: Date,
    trustedAt: Date | undefined,
    fingerprint: string | undefined,
    usageCount: number,
    lastIpAddress: IpAddress | undefined,
    trustExpiresAt: Date | undefined,
    mobileOperator: BDMobileOperator | undefined,
    trustScore: number,
    createdAt: Date,
    updatedAt: Date,
    version: number
  ) {
    super({ id, createdAt, updatedAt, version });
    
    this._userId = userId;
    this._deviceId = deviceId;
    this._deviceType = deviceType;
    this._devicePlatform = devicePlatform;
    this._userAgent = userAgent;
    this._status = status;
    this._trustLevel = trustLevel;
    this._lastUsedAt = lastUsedAt;
    this._trustedAt = trustedAt;
    this._fingerprint = fingerprint;
    this._usageCount = usageCount;
    this._lastIpAddress = lastIpAddress;
    this._trustExpiresAt = trustExpiresAt;
    this._mobileOperator = mobileOperator;
    this._trustScore = trustScore;
    
    // ✅ FIXED: Call validate and handle the result
    const validationResult = this.validate();
    if (!validationResult.isValid) {
      throw new EntityValidationError(
        'Device validation failed',
        validationResult.errors,
        this.constructor.name
      );
    }
  }

  /**
   * ✅ FIXED: Validate entity invariants - returns ValidationResult
   */
  protected validate(): DeviceValidationResult {
    const errors: string[] = [];
    
    if (!this._userId) {
      errors.push('Device requires a user ID');
    }
    if (!this._deviceId) {
      errors.push('Device requires a device ID');
    }
    if (!this._userAgent) {
      errors.push('Device requires a user agent');
    }
    if (this._usageCount < 0) {
      errors.push('Usage count cannot be negative');
    }
    if (this._trustScore < 0 || this._trustScore > 100) {
      errors.push('Trust score must be between 0 and 100');
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
   * Register a new device (factory method)
   * ✅ ENTERPRISE ENHANCEMENT: Checks device limit before creation
   */
  public static register(
    userId: string,
    deviceId: DeviceId,
    userAgent: UserAgent,
    fingerprint: string | undefined,
    ipAddress: IpAddress | undefined,
    idGenerator: IdGenerator,
    currentDeviceCount: number = 0
  ): Device {
    // ✅ ENTERPRISE ENHANCEMENT: Check device limit
    if (currentDeviceCount >= DEVICE_CONFIG.MAX_DEVICES_PER_USER) {
      throw new EntityValidationError(
        `Maximum devices per user (${DEVICE_CONFIG.MAX_DEVICES_PER_USER}) reached. ` +
        `Current: ${currentDeviceCount}. Please remove an existing device first.`
      );
    }
    
    const now = new Date();
    const deviceType = Device.mapUserAgentToDeviceType(userAgent);
    const devicePlatform = deviceId.getPlatform();
    const trustLevel = Device.determineInitialTrustLevel(userAgent, deviceId);
    const trustScore = Device.calculateInitialTrustScore(userAgent, deviceId);
    
    // ✅ ENTERPRISE ENHANCEMENT: Detect mobile operator if IP is from Bangladesh
    let mobileOperator: BDMobileOperator | undefined;
    if (ipAddress && ipAddress.isBangladeshISP()) {
      mobileOperator = Device.detectMobileOperator(ipAddress);
    }
    
    const device = new Device(
      idGenerator.generate(),
      userId,
      deviceId,
      deviceType,
      devicePlatform,
      userAgent,
      DeviceStatus.ACTIVE,
      trustLevel,
      now,
      undefined,
      fingerprint,
      0,
      ipAddress,
      undefined,
      mobileOperator,
      trustScore,
      now,
      now,
      1
    );
    
    device.addDomainEvent({
      eventId: generateEventId(),
      eventType: DeviceEventType.DEVICE_REGISTERED,
      aggregateId: device.id,
      occurredOn: now,
      version: 1,
      metadata: {
        userId: device._userId,
        deviceId: device._deviceId.getValue(),
        deviceType: device._deviceType,
        devicePlatform: device._devicePlatform,
        trustLevel: device._trustLevel,
        trustScore: device._trustScore,
        isBot: userAgent.isBot(),
        mobileOperator,
        currentDeviceCount: currentDeviceCount + 1,
        maxDevices: DEVICE_CONFIG.MAX_DEVICES_PER_USER,
      },
    });
    
    // ✅ ENTERPRISE ENHANCEMENT: Warn if close to limit
    if (currentDeviceCount + 1 >= DEVICE_CONFIG.MAX_DEVICES_PER_USER - 1) {
      device.addDomainEvent({
        eventId: generateEventId(),
        eventType: DeviceEventType.DEVICE_LIMIT_WARNING,
        aggregateId: device.id,
        occurredOn: now,
        version: 1,
        metadata: {
          userId: device._userId,
          currentCount: currentDeviceCount + 1,
          maxLimit: DEVICE_CONFIG.MAX_DEVICES_PER_USER,
          message: `Device limit warning: ${currentDeviceCount + 1}/${DEVICE_CONFIG.MAX_DEVICES_PER_USER} devices used`,
        },
      });
    }
    
    return device;
  }

  /**
   * Reconstitute from persistence
   */
  public static reconstitute(data: {
    id: string;
    userId: string;
    deviceId: DeviceId;
    deviceType: DeviceType;
    devicePlatform: DevicePlatform;
    userAgent: UserAgent;
    status: DeviceStatus;
    trustLevel: DeviceTrustLevel;
    lastUsedAt: Date;
    trustedAt?: Date;
    fingerprint?: string;
    usageCount: number;
    lastIpAddress?: IpAddress;
    trustExpiresAt?: Date;
    mobileOperator?: BDMobileOperator;
    trustScore: number;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }): Device {
    return new Device(
      data.id,
      data.userId,
      data.deviceId,
      data.deviceType,
      data.devicePlatform,
      data.userAgent,
      data.status,
      data.trustLevel,
      data.lastUsedAt,
      data.trustedAt,
      data.fingerprint,
      data.usageCount,
      data.lastIpAddress,
      data.trustExpiresAt,
      data.mobileOperator,
      data.trustScore,
      data.createdAt,
      data.updatedAt,
      data.version
    );
  }

  // ============================================================
  // Private Helpers
  // ============================================================

  /**
   * Map UserAgent device type to Device entity type
   */
  private static mapUserAgentToDeviceType(userAgent: UserAgent): DeviceType {
    const uaDeviceType = userAgent.getDeviceType();
    
    switch (uaDeviceType) {
      case UserAgentDeviceType.MOBILE:
        if (userAgent.isFeaturePhone()) return DeviceType.FEATURE_PHONE;
        return DeviceType.MOBILE;
      case UserAgentDeviceType.TABLET:
        return DeviceType.TABLET;
      case UserAgentDeviceType.DESKTOP:
        return DeviceType.DESKTOP;
      case UserAgentDeviceType.LAPTOP:
        return DeviceType.LAPTOP;
      case UserAgentDeviceType.TV:
        return DeviceType.TV;
      case UserAgentDeviceType.CONSOLE:
        return DeviceType.CONSOLE;
      case UserAgentDeviceType.WEARABLE:
        return DeviceType.WEARABLE;
      default:
        if (userAgent.isBot()) return DeviceType.BOT;
        return DeviceType.UNKNOWN;
    }
  }

  /**
   * Determine initial trust level for a new device
   */
  private static determineInitialTrustLevel(userAgent: UserAgent, deviceId: DeviceId): DeviceTrustLevel {
    if (userAgent.isBot()) return DeviceTrustLevel.UNTRUSTED;
    if (deviceId.isPersistent() && !userAgent.isHeadless() && !userAgent.isAutomation()) {
      return DeviceTrustLevel.STANDARD;
    }
    return DeviceTrustLevel.UNTRUSTED;
  }
  
  /**
   * ✅ ENTERPRISE ENHANCEMENT: Calculate initial trust score (0-100)
   */
  private static calculateInitialTrustScore(userAgent: UserAgent, deviceId: DeviceId): number {
    let score = 0;
    
    // Base score for valid device
    if (deviceId.isPersistent()) score += 30;
    
    // Browser trust
    if (!userAgent.isBot()) score += 20;
    if (!userAgent.isHeadless()) score += 15;
    if (!userAgent.isAutomation()) score += 10;
    
    // Device type bonus
    const deviceType = Device.mapUserAgentToDeviceType(userAgent);
    if (deviceType === DeviceType.DESKTOP || deviceType === DeviceType.LAPTOP) score += 15;
    if (deviceType === DeviceType.MOBILE && !userAgent.isFeaturePhone()) score += 10;
    
    // Cap at 100
    return Math.min(100, score);
  }
  
  /**
   * ✅ ENTERPRISE ENHANCEMENT: Detect mobile operator from IP address
   */
  private static detectMobileOperator(ipAddress: IpAddress): BDMobileOperator | undefined {
    // This is a simplified detection - in production, use IP2Location or similar
    const ip = ipAddress.getValue();
    
    // GP (Grameenphone) ranges
    if (ip.startsWith('114.130.') && parseInt(ip.split('.')[2] || '0') < 32) return 'gp';
    // Robi ranges
    if (ip.startsWith('114.31.') && parseInt(ip.split('.')[2] || '0') < 16) return 'robi';
    // Banglalink ranges
    if (ip.startsWith('114.130.') && parseInt(ip.split('.')[2] || '0') >= 32) return 'banglalink';
    // Teletalk ranges
    if (ip.startsWith('114.130.') && parseInt(ip.split('.')[2] || '0') >= 48) return 'teletalk';
    
    return undefined;
  }

  /**
   * Normalize fingerprint for consistent comparison
   */
  private normalizeFingerprint(fingerprint: string): string {
    if (!DEVICE_CONFIG.FINGERPRINT_NORMALIZATION) {
      return fingerprint;
    }
    
    return fingerprint
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '');
  }

  // ============================================================
  // Business Methods
  // ============================================================

  /**
   * Trust this device (skip MFA for future logins)
   * ✅ ENTERPRISE ENHANCEMENT: Checks max trusted devices limit
   */
  public trust(durationDays?: number, currentTrustedCount: number = 0): void {
    if (this._status === DeviceStatus.BLOCKED) {
      throw new EntityValidationError('Cannot trust a blocked device');
    }
    
    // ✅ ENTERPRISE ENHANCEMENT: Check max trusted devices
    if (this._status !== DeviceStatus.TRUSTED && 
        currentTrustedCount >= DEVICE_CONFIG.MAX_TRUSTED_DEVICES) {
      throw new EntityValidationError(
        `Maximum trusted devices (${DEVICE_CONFIG.MAX_TRUSTED_DEVICES}) reached. ` +
        `Current: ${currentTrustedCount}. Please revoke trust from another device first.`
      );
    }
    
    if (this._status === DeviceStatus.TRUSTED && this._trustLevel === DeviceTrustLevel.TRUSTED) {
      throw new EntityValidationError('Device already trusted');
    }
    
    this._status = DeviceStatus.TRUSTED;
    this._trustLevel = DeviceTrustLevel.TRUSTED;
    this._trustedAt = new Date();
    this._trustScore = Math.min(100, this._trustScore + 20);
    
    if (durationDays) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + durationDays);
      this._trustExpiresAt = expiresAt;
    }
    
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: DeviceEventType.DEVICE_TRUSTED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        deviceId: this._deviceId.getValue(),
        trustedAt: this._trustedAt,
        durationDays,
        newTrustScore: this._trustScore,
        currentTrustedCount: currentTrustedCount + 1,
        maxTrustedDevices: DEVICE_CONFIG.MAX_TRUSTED_DEVICES,
      },
    });
  }

  /**
   * ✅ FIXED: Revoke trust from this device
   */
  public revokeTrust(): void {
    if (this._status !== DeviceStatus.TRUSTED && this._trustLevel !== DeviceTrustLevel.TRUSTED) {
      throw new EntityValidationError('Device is not trusted');
    }
    
    this._status = DeviceStatus.ACTIVE;
    this._trustLevel = DeviceTrustLevel.STANDARD;
    this._trustedAt = undefined;
    this._trustExpiresAt = undefined;
    this._trustScore = Math.max(0, this._trustScore - 10);
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: DeviceEventType.DEVICE_TRUST_REVOKED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        deviceId: this._deviceId.getValue(),
        newTrustScore: this._trustScore,
      },
    });
  }

  /**
   * Block this device (prevent all access)
   */
  public block(reason: string): void {
    if (this._status === DeviceStatus.BLOCKED) {
      throw new EntityValidationError('Device already blocked');
    }
    
    this._status = DeviceStatus.BLOCKED;
    this._trustLevel = DeviceTrustLevel.UNTRUSTED;
    this._trustScore = 0;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: DeviceEventType.DEVICE_BLOCKED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        deviceId: this._deviceId.getValue(),
        reason,
      },
    });
  }

  /**
   * Suspend this device (temporary restriction)
   */
  public suspend(reason: string): void {
    if (this._status === DeviceStatus.BLOCKED) {
      throw new EntityValidationError('Cannot suspend a blocked device');
    }
    
    this._status = DeviceStatus.SUSPENDED;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: DeviceEventType.DEVICE_SUSPENDED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        deviceId: this._deviceId.getValue(),
        reason,
      },
    });
  }

  /**
   * Activate a suspended device
   */
  public activate(): void {
    if (this._status !== DeviceStatus.SUSPENDED) {
      throw new EntityValidationError('Only suspended devices can be activated');
    }
    
    this._status = DeviceStatus.ACTIVE;
    this.touch();
  }

  /**
   * Mark device as stale (inactive for too long)
   */
  public markAsStale(): void {
    if (this._status === DeviceStatus.STALE) {
      return;
    }
    
    this._status = DeviceStatus.STALE;
    this.touch();
  }

  /**
   * Update device fingerprint
   */
  public updateFingerprint(newFingerprint: string): void {
    if (!newFingerprint || newFingerprint.trim().length === 0) {
      throw new EntityValidationError('Fingerprint cannot be empty');
    }
    
    const normalizedFingerprint = this.normalizeFingerprint(newFingerprint);
    
    if (this._fingerprint !== normalizedFingerprint) {
      const oldFingerprint = this._fingerprint;
      this._fingerprint = normalizedFingerprint;
      this.touch();
      
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: DeviceEventType.DEVICE_FINGERPRINT_UPDATED,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          deviceId: this._deviceId.getValue(),
          oldFingerprint,
          newFingerprint: this._fingerprint,
        },
      });
    }
  }

  /**
   * Record device usage
   * ✅ ENTERPRISE ENHANCEMENT: Updates trust score and mobile operator
   */
  public recordUsage(ipAddress?: IpAddress): void {
    this._lastUsedAt = new Date();
    this._usageCount++;
    
    // ✅ ENTERPRISE ENHANCEMENT: Update trust score based on usage
    if (this._trustScore < 100) {
      this._trustScore = Math.min(100, this._trustScore + 1);
    }
    
    if (ipAddress) {
      this._lastIpAddress = ipAddress;
      
      // ✅ ENTERPRISE ENHANCEMENT: Detect mobile operator if changed
      if (ipAddress.isBangladeshISP()) {
        const newOperator = Device.detectMobileOperator(ipAddress);
        if (newOperator && this._mobileOperator !== newOperator) {
          const oldOperator = this._mobileOperator;
          this._mobileOperator = newOperator;
          
          this.addDomainEvent({
            eventId: generateEventId(),
            eventType: DeviceEventType.DEVICE_OPERATOR_DETECTED,
            aggregateId: this.id,
            occurredOn: new Date(),
            version: this.version,
            metadata: {
              deviceId: this._deviceId.getValue(),
              oldOperator,
              newOperator,
            },
          });
        }
      }
    }
    
    this.touch();
    
    // Check if device should be marked stale
    if (this._status === DeviceStatus.STALE) {
      this._status = DeviceStatus.ACTIVE;
    }
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: DeviceEventType.DEVICE_USAGE_RECORDED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        deviceId: this._deviceId.getValue(),
        usageCount: this._usageCount,
        trustScore: this._trustScore,
      },
    });
  }

  /**
   * Upgrade trust level
   */
  public upgradeTrust(): void {
    if (this._trustLevel === DeviceTrustLevel.MAXIMUM_TRUST) {
      return;
    }
    
    
  
  const trustLevels: DeviceTrustLevel[] = [
    DeviceTrustLevel.UNTRUSTED,
    DeviceTrustLevel.STANDARD,
    DeviceTrustLevel.TRUSTED,
    DeviceTrustLevel.HIGH_TRUST,
    DeviceTrustLevel.MAXIMUM_TRUST,
  ];
  
  const currentIndex = trustLevels.indexOf(this._trustLevel);
  
  // ✅ টাইপ গার্ড ব্যবহার করে undefined চেক করুন
  if (currentIndex >= 0 && currentIndex < trustLevels.length - 1) {
    const nextLevel = trustLevels[currentIndex + 1];
    if (nextLevel) {  // ✅ undefined চেক
      this._trustLevel = nextLevel;
      this._trustScore = Math.min(100, this._trustScore + 15);
      this.touch();
    }
  }
}

  // ============================================================
  // Status Check Methods
  // ============================================================

  /**
   * Check if device can be added (limit check)
   * ✅ ENTERPRISE ENHANCEMENT: Static limit check method
   */
  public static canAddDevice(currentCount: number): { allowed: boolean; remaining: number; message?: string } {
    if (currentCount >= DEVICE_CONFIG.MAX_DEVICES_PER_USER) {
      return {
        allowed: false,
        remaining: 0,
        message: `Maximum devices (${DEVICE_CONFIG.MAX_DEVICES_PER_USER}) reached.`,
      };
    }
    return {
      allowed: true,
      remaining: DEVICE_CONFIG.MAX_DEVICES_PER_USER - currentCount,
    };
  }
  
  /**
   * Check if device can be trusted (limit check)
   * ✅ ENTERPRISE ENHANCEMENT: Static trust limit check method
   */
  public static canTrustDevice(currentTrustedCount: number): { allowed: boolean; remaining: number; message?: string } {
    if (currentTrustedCount >= DEVICE_CONFIG.MAX_TRUSTED_DEVICES) {
      return {
        allowed: false,
        remaining: 0,
        message: `Maximum trusted devices (${DEVICE_CONFIG.MAX_TRUSTED_DEVICES}) reached.`,
      };
    }
    return {
      allowed: true,
      remaining: DEVICE_CONFIG.MAX_TRUSTED_DEVICES - currentTrustedCount,
    };
  }

  /**
   * Check if device is trusted
   */
  public isTrusted(): boolean {
    if (this._status !== DeviceStatus.TRUSTED) return false;
    if (this._trustExpiresAt && this._trustExpiresAt < new Date()) {
      // Trust expired
      return false;
    }
    return this._trustLevel === DeviceTrustLevel.TRUSTED || 
           this._trustLevel === DeviceTrustLevel.HIGH_TRUST ||
           this._trustLevel === DeviceTrustLevel.MAXIMUM_TRUST;
  }

  /**
   * Check if device is blocked
   */
  public isBlocked(): boolean {
    return this._status === DeviceStatus.BLOCKED;
  }

  /**
   * Check if device is suspended
   */
  public isSuspended(): boolean {
    return this._status === DeviceStatus.SUSPENDED;
  }

  /**
   * Check if device is active
   */
  public isActive(): boolean {
    return this._status === DeviceStatus.ACTIVE || 
           this._status === DeviceStatus.TRUSTED;
  }

  /**
   * Check if device is stale (not used for threshold days)
   */
  public isStale(): boolean {
    if (this._status === DeviceStatus.STALE) return true;
    return this.getDaysSinceLastUsed() >= DEVICE_CONFIG.STALE_DAYS_THRESHOLD;
  }

  /**
   * Check if device matches fingerprint
   */
  public matchesFingerprint(fingerprint: string): boolean {
    if (!this._fingerprint || !fingerprint) {
      return false;
    }
    
    const normalizedInput = this.normalizeFingerprint(fingerprint);
    return this._fingerprint === normalizedInput;
  }

  /**
   * Check if device is from bot
   */
  public isBot(): boolean {
    return this._deviceType === DeviceType.BOT || this._userAgent.isBot();
  }
  
  /**
   * ✅ ENTERPRISE ENHANCEMENT: Check if device is from Bangladesh
   */
  public isFromBangladesh(): boolean {
    return !!this._mobileOperator;
  }

  // ============================================================
  // Time Methods
  // ============================================================

  /**
   * Get days since last used
   */
  public getDaysSinceLastUsed(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this._lastUsedAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Get trust remaining days
   */
  public getTrustRemainingDays(): number | null {
    if (!this._trustExpiresAt) return null;
    const remaining = this._trustExpiresAt.getTime() - new Date().getTime();
    if (remaining <= 0) return 0;
    return Math.ceil(remaining / (1000 * 60 * 60 * 24));
  }

  // ============================================================
  // Getters
  // ============================================================

  public getUserId(): string { return this._userId; }
  public getDeviceId(): DeviceId { return this._deviceId; }
  public getDeviceType(): DeviceType { return this._deviceType; }
  public getDevicePlatform(): DevicePlatform { return this._devicePlatform; }
  public getUserAgent(): UserAgent { return this._userAgent; }
  public getStatus(): DeviceStatus { return this._status; }
  
  /**
   * ✅ FIXED: Get trust level with default fallback
   */
  public getTrustLevel(): DeviceTrustLevel {
    return this._trustLevel ?? DeviceTrustLevel.UNTRUSTED;
  }
  
  public getLastUsedAt(): Date { return new Date(this._lastUsedAt); }
  public getTrustedAt(): Date | undefined { return this._trustedAt ? new Date(this._trustedAt) : undefined; }
  public getFingerprint(): string | undefined { return this._fingerprint; }
  public getUsageCount(): number { return this._usageCount; }
  public getLastIpAddress(): IpAddress | undefined { return this._lastIpAddress; }
  public getTrustExpiresAt(): Date | undefined { return this._trustExpiresAt ? new Date(this._trustExpiresAt) : undefined; }
  public getMobileOperator(): BDMobileOperator | undefined { return this._mobileOperator; }
  public getTrustScore(): number { return this._trustScore; }

  // ============================================================
  // JSON Serialization
  // ============================================================

  /**
   * ✅ FIXED: Convert to JSON serializable object with proper undefined handling
   */
  public toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      userId: this._userId,
      deviceId: this._deviceId.getValue(),
      deviceType: this._deviceType,
      devicePlatform: this._devicePlatform,
      userAgent: this._userAgent.getValue(),
      status: this._status,
      trustLevel: this._trustLevel,
      trustScore: this._trustScore,
      lastUsedAt: this._lastUsedAt.toISOString(),
      trustedAt: this._trustedAt ? this._trustedAt.toISOString() : undefined,
      trustExpiresAt: this._trustExpiresAt ? this._trustExpiresAt.toISOString() : undefined,
      trustRemainingDays: this.getTrustRemainingDays(),
      fingerprint: this._fingerprint ? '[REDACTED]' : undefined,
      usageCount: this._usageCount,
      mobileOperator: this._mobileOperator,
      isTrusted: this.isTrusted(),
      isActive: this.isActive(),
      isBot: this.isBot(),
      isFromBangladesh: this.isFromBangladesh(),
      daysSinceLastUsed: this.getDaysSinceLastUsed(),
      isStale: this.isStale(),
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
