/**
 * Device Entity - Pure Domain Core
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
 */

import { BaseEntity, EntityValidationError, type IdGenerator } from './base.entity';
import { DeviceId, type DevicePlatform } from '../value-objects/device-id.vo';
import { UserAgent, DeviceType as UserAgentDeviceType } from '../value-objects/user-agent.vo';
import { IpAddress } from '../value-objects/ip-address.vo';

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
}

// ==================== Types ====================

/**
 * Device configuration interface
 */
export interface DeviceConfig {
  maxTrustedDevices: number;
  maxDevicesPerUser: number;
  staleDaysThreshold: number;
  fingerprintNormalization: boolean;
}

// ==================== Constants ====================

/**
 * Device configuration constants
 */
const DEVICE_CONFIG = {
  MAX_TRUSTED_DEVICES: 10,
  MAX_DEVICES_PER_USER: 20,
  STALE_DAYS_THRESHOLD: 90,
  FINGERPRINT_NORMALIZATION: true,
} as const;

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
  private _lastIpAddress?: IpAddress;
  private _trustExpiresAt?: Date;

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
    
    this.validate();
  }

  /**
   * Validate entity invariants
   */
  protected validate(): void {
    if (!this._userId) {
      throw new EntityValidationError('Device requires a user ID');
    }
    if (!this._deviceId) {
      throw new EntityValidationError('Device requires a device ID');
    }
    if (!this._userAgent) {
      throw new EntityValidationError('Device requires a user agent');
    }
    if (this._usageCount < 0) {
      throw new EntityValidationError('Usage count cannot be negative');
    }
    if (this._deviceType === DeviceType.UNKNOWN && this._userAgent.isBot()) {
      // Bot detection is handled, no error needed
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Register a new device (factory method)
   */
  public static register(
    userId: string,
    deviceId: DeviceId,
    userAgent: UserAgent,
    fingerprint: string | undefined,
    ipAddress: IpAddress | undefined,
    idGenerator: IdGenerator
  ): Device {
    const now = new Date();
    const deviceType = Device.mapUserAgentToDeviceType(userAgent);
    const devicePlatform = deviceId.getPlatform();
    const trustLevel = Device.determineInitialTrustLevel(userAgent, deviceId);
    
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
        isBot: userAgent.isBot(),
      },
    });
    
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
    // Bots get no trust
    if (userAgent.isBot()) {
      return DeviceTrustLevel.UNTRUSTED;
    }
    
    // Known trusted device types
    if (deviceId.isPersistent() && !userAgent.isHeadless() && !userAgent.isAutomation()) {
      return DeviceTrustLevel.STANDARD;
    }
    
    return DeviceTrustLevel.UNTRUSTED;
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
   */
  public trust(durationDays?: number): void {
    if (this._status === DeviceStatus.BLOCKED) {
      throw new EntityValidationError('Cannot trust a blocked device');
    }
    
    if (this._status === DeviceStatus.TRUSTED && this._trustLevel === DeviceTrustLevel.TRUSTED) {
      throw new EntityValidationError('Device already trusted');
    }
    
    this._status = DeviceStatus.TRUSTED;
    this._trustLevel = DeviceTrustLevel.TRUSTED;
    this._trustedAt = new Date();
    
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
      },
    });
  }

  /**
   * Revoke trust from this device
   */
  public revokeTrust(): void {
    if (this._status !== DeviceStatus.TRUSTED && this._trustLevel !== DeviceTrustLevel.TRUSTED) {
      throw new EntityValidationError('Device is not trusted');
    }
    
    this._status = DeviceStatus.ACTIVE;
    this._trustLevel = DeviceTrustLevel.STANDARD;
    this._trustedAt = undefined;
    this._trustExpiresAt = undefined;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: DeviceEventType.DEVICE_TRUST_REVOKED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        deviceId: this._deviceId.getValue(),
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
   */
  public recordUsage(ipAddress?: IpAddress): void {
    this._lastUsedAt = new Date();
    this._usageCount++;
    if (ipAddress) {
      this._lastIpAddress = ipAddress;
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
    
    const trustLevels = [
      DeviceTrustLevel.UNTRUSTED,
      DeviceTrustLevel.STANDARD,
      DeviceTrustLevel.TRUSTED,
      DeviceTrustLevel.HIGH_TRUST,
      DeviceTrustLevel.MAXIMUM_TRUST,
    ];
    
    const currentIndex = trustLevels.indexOf(this._trustLevel);
    if (currentIndex < trustLevels.length - 1) {
      this._trustLevel = trustLevels[currentIndex + 1];
      this.touch();
    }
  }

  // ============================================================
  // Status Check Methods
  // ============================================================

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
  public getTrustLevel(): DeviceTrustLevel { return this._trustLevel; }
  public getLastUsedAt(): Date { return new Date(this._lastUsedAt); }
  public getTrustedAt(): Date | undefined { return this._trustedAt ? new Date(this._trustedAt) : undefined; }
  public getFingerprint(): string | undefined { return this._fingerprint; }
  public getUsageCount(): number { return this._usageCount; }
  public getLastIpAddress(): IpAddress | undefined { return this._lastIpAddress; }
  public getTrustExpiresAt(): Date | undefined { return this._trustExpiresAt ? new Date(this._trustExpiresAt) : undefined; }

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
      deviceId: this._deviceId.getValue(),
      deviceType: this._deviceType,
      devicePlatform: this._devicePlatform,
      userAgent: this._userAgent.getValue(),
      status: this._status,
      trustLevel: this._trustLevel,
      lastUsedAt: this._lastUsedAt.toISOString(),
      trustedAt: this._trustedAt?.toISOString(),
      trustExpiresAt: this._trustExpiresAt?.toISOString(),
      trustRemainingDays: this.getTrustRemainingDays(),
      fingerprint: this._fingerprint ? '[REDACTED]' : undefined,
      usageCount: this._usageCount,
      isTrusted: this.isTrusted(),
      isActive: this.isActive(),
      isBot: this.isBot(),
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

// ============================================================
// Type Exports
// ============================================================

export type { DeviceConfig };
