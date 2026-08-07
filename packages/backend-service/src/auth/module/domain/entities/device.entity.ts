// packages/backend-service/src/auth/module/domain/entities/device.entity.ts

// ✅ Shared packages
import type { DeviceType, DeviceTrustLevel } from '@vubon/shared-types';
import { DEVICE_CONFIG } from '@vubon/shared-constants';

// ✅ Relative paths
import { BaseEntity } from './base.entity';
import type { UserId } from '../value-objects/user-id.vo';
import type { DeviceId } from '../value-objects/device-id.vo';
import type { IpAddress } from '../value-objects/ip-address.vo';
import type { UserAgent } from '../value-objects/user-agent.vo';

/**
 * Device Entity
 * Represents a device registered to a user
 * Tracks device information, trust level, and verification status
 */
export class Device extends BaseEntity {
  private _userId: UserId;
  private _deviceId: DeviceId;
  private _deviceType: DeviceType;
  private _deviceName: string | null;
  private _ipAddress: IpAddress;
  private _userAgent: UserAgent;
  private _trustLevel: DeviceTrustLevel;
  private _isVerified: boolean;
  private _isBlocked: boolean;
  private _lastUsedAt: Date;
  private _trustExpiresAt: Date | null;
  private _loginCount: number;
  private _failedAttempts: number;

  private constructor(
    id: string,
    userId: UserId,
    deviceId: DeviceId,
    deviceType: DeviceType,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    trustLevel: DeviceTrustLevel,
    isVerified: boolean,
    isBlocked: boolean,
    lastUsedAt: Date,
    deviceName: string | null = null,
    trustExpiresAt: Date | null = null,
    loginCount: number = 1,
    failedAttempts: number = 0,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._deviceId = deviceId;
    this._deviceType = deviceType;
    this._deviceName = deviceName;
    this._ipAddress = ipAddress;
    this._userAgent = userAgent;
    this._trustLevel = trustLevel;
    this._isVerified = isVerified;
    this._isBlocked = isBlocked;
    this._lastUsedAt = lastUsedAt;
    this._trustExpiresAt = trustExpiresAt;
    this._loginCount = loginCount;
    this._failedAttempts = failedAttempts;
  }

  /**
   * Create a new device
   */
  static create(
    id: string,
    userId: UserId,
    deviceId: DeviceId,
    deviceType: DeviceType,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    deviceName: string | null = null
  ): Device {
    const now = new Date();
    const trustDurationDays = DEVICE_CONFIG.TRUST_DURATION_DAYS || 30;
    const trustExpiresAt = new Date(now.getTime() + trustDurationDays * 24 * 60 * 60 * 1000);

    return new Device(
      id,
      userId,
      deviceId,
      deviceType,
      ipAddress,
      userAgent,
      'untrusted',
      false,
      false,
      now,
      deviceName,
      trustExpiresAt,
      1,
      0,
      now,
      now
    );
  }

  /**
   * Reconstruct a device from persistence
   */
  static reconstruct(
    id: string,
    userId: UserId,
    deviceId: DeviceId,
    deviceType: DeviceType,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    trustLevel: DeviceTrustLevel,
    isVerified: boolean,
    isBlocked: boolean,
    lastUsedAt: Date,
    deviceName: string | null = null,
    trustExpiresAt: Date | null = null,
    loginCount: number = 1,
    failedAttempts: number = 0,
    createdAt?: Date,
    updatedAt?: Date
  ): Device {
    return new Device(
      id,
      userId,
      deviceId,
      deviceType,
      ipAddress,
      userAgent,
      trustLevel,
      isVerified,
      isBlocked,
      lastUsedAt,
      deviceName,
      trustExpiresAt,
      loginCount,
      failedAttempts,
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

  get deviceId(): DeviceId {
    return this._deviceId;
  }

  get deviceType(): DeviceType {
    return this._deviceType;
  }

  get deviceName(): string | null {
    return this._deviceName;
  }

  get ipAddress(): IpAddress {
    return this._ipAddress;
  }

  get userAgent(): UserAgent {
    return this._userAgent;
  }

  get trustLevel(): DeviceTrustLevel {
    return this._trustLevel;
  }

  get isVerified(): boolean {
    return this._isVerified;
  }

  get isBlocked(): boolean {
    return this._isBlocked;
  }

  get lastUsedAt(): Date {
    return new Date(this._lastUsedAt);
  }

  get trustExpiresAt(): Date | null {
    return this._trustExpiresAt ? new Date(this._trustExpiresAt) : null;
  }

  get loginCount(): number {
    return this._loginCount;
  }

  get failedAttempts(): number {
    return this._failedAttempts;
  }

  get isTrusted(): boolean {
    return this._trustLevel === 'trusted' && !this.isTrustExpired();
  }

  get isSuspicious(): boolean {
    return this._trustLevel === 'suspicious';
  }

  get isActive(): boolean {
    return !this.isBlocked;
  }

  /**
   * Check if device trust has expired
   */
  isTrustExpired(): boolean {
    if (this._trustExpiresAt === null) {
      return false;
    }
    return this._trustExpiresAt < new Date();
  }

  /**
   * Verify the device
   */
  verify(): void {
    if (this._isVerified) {
      throw new Error('Device is already verified');
    }

    if (this._isBlocked) {
      throw new Error('Cannot verify a blocked device');
    }

    this._isVerified = true;
    this._trustLevel = 'trusted';
    this._failedAttempts = 0;
    this.touch();
  }

  /**
   * Block the device
   */
  block(): void {
    if (this._isBlocked) {
      throw new Error('Device is already blocked');
    }

    this._isBlocked = true;
    this._trustLevel = 'blocked';
    this.touch();
  }

  /**
   * Unblock the device
   */
  unblock(): void {
    if (!this._isBlocked) {
      throw new Error('Device is not blocked');
    }

    this._isBlocked = false;
    this._trustLevel = 'untrusted';
    this.touch();
  }

  /**
   * Update trust level
   */
  updateTrustLevel(newLevel: DeviceTrustLevel): void {
    if (this._isBlocked) {
      throw new Error('Cannot update trust level of a blocked device');
    }

    if (!newLevel || typeof newLevel !== 'string') {
      throw new Error('Trust level is required');
    }

    // Validate trust level
    const validLevels: DeviceTrustLevel[] = [
      'trusted',
      'suspicious',
      'blocked',
      'unknown',
      'untrusted',
      'verified',
      'compromised',
    ];

    if (!validLevels.includes(newLevel)) {
      throw new Error(`Invalid trust level: ${newLevel}`);
    }

    this._trustLevel = newLevel;

    // If trust level is trusted, set trust expiry
    if (newLevel === 'trusted') {
      const trustDurationDays = DEVICE_CONFIG.TRUST_DURATION_DAYS || 30;
      this._trustExpiresAt = new Date(Date.now() + trustDurationDays * 24 * 60 * 60 * 1000);
    } else {
      this._trustExpiresAt = null;
    }

    this.touch();
  }

  /**
   * Update last used timestamp and increment login count
   */
  recordUsage(): void {
    if (this._isBlocked) {
      throw new Error('Cannot record usage for a blocked device');
    }

    this._lastUsedAt = new Date();
    this._loginCount += 1;
    this.touch();
  }

  /**
   * Increment failed attempts
   */
  incrementFailedAttempts(): number {
    if (this._isBlocked) {
      throw new Error('Cannot increment failed attempts for a blocked device');
    }

    this._failedAttempts += 1;
    this.touch();

    // Auto-block if too many failed attempts
    const maxAttempts = DEVICE_CONFIG.SUSPICIOUS_ACTIVITY_THRESHOLD || 3;
    if (this._failedAttempts >= maxAttempts) {
      this._trustLevel = 'suspicious';
    }

    return this._failedAttempts;
  }

  /**
   * Reset failed attempts
   */
  resetFailedAttempts(): void {
    this._failedAttempts = 0;
    this.touch();
  }

  /**
   * Get device trust score
   */
  getTrustScore(): number {
    let score = 0;

    // Base score from device ID trust score
    score += this._deviceId.getTrustScore();

    // Add trust level bonus
    const trustBonus: Record<DeviceTrustLevel, number> = {
      trusted: 30,
      verified: 30,
      untrusted: 0,
      suspicious: -20,
      compromised: -50,
      blocked: -100,
      unknown: 0,
    };
    score += trustBonus[this._trustLevel] || 0;

    // Add verification bonus
    if (this._isVerified) {
      score += 20;
    }

    // Penalize failed attempts
    score -= Math.min(this._failedAttempts * 5, 25);

    // Penalize if trust is expired
    if (this.isTrustExpired()) {
      score -= 20;
    }

    // Ensure score is between 0 and 100
    return Math.min(100, Math.max(0, score));
  }

  /**
   * Get device summary
   */
  getSummary(): {
    id: string;
    userId: string;
    deviceId: string;
    deviceType: DeviceType;
    deviceName: string | null;
    trustLevel: DeviceTrustLevel;
    isVerified: boolean;
    isBlocked: boolean;
    isTrusted: boolean;
    isSuspicious: boolean;
    isActive: boolean;
    isTrustExpired: boolean;
    trustScore: number;
    trustExpiresAt: Date | null;
    lastUsedAt: Date;
    loginCount: number;
    failedAttempts: number;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      userId: this._userId.value,
      deviceId: this._deviceId.getValue(),
      deviceType: this._deviceType,
      deviceName: this._deviceName,
      trustLevel: this._trustLevel,
      isVerified: this._isVerified,
      isBlocked: this._isBlocked,
      isTrusted: this.isTrusted,
      isSuspicious: this.isSuspicious,
      isActive: this.isActive,
      isTrustExpired: this.isTrustExpired(),
      trustScore: this.getTrustScore(),
      trustExpiresAt: this._trustExpiresAt,
      lastUsedAt: this._lastUsedAt,
      loginCount: this._loginCount,
      failedAttempts: this._failedAttempts,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Compare two Device entities
   */
  equals(other: Device | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof Device)) {
      return false;
    }
    return this.id === other.id;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `Device(id=${this.id}, userId=${this._userId.value}, deviceId=${this._deviceId.getValue()}, trustLevel=${this._trustLevel})`;
  }
}
