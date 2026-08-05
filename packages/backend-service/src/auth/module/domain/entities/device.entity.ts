// packages/backend-service/src/auth/module/domain/entities/device.entity.ts
import { randomUUID } from 'crypto';
import { BaseEntity } from './base.entity';
import { DeviceId, IpAddress, UserAgent } from '../value-objects';

/**
 * Device type types
 */
export type DeviceType = 'DESKTOP' | 'MOBILE' | 'TABLET' | 'BOT' | 'UNKNOWN';

/**
 * Device trust level types
 */
export type DeviceTrustLevel = 'UNTRUSTED' | 'STANDARD' | 'TRUSTED' | 'HIGH_TRUST';

/**
 * Device status types
 */
export type DeviceStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'BLOCKED';

/**
 * Device Entity
 * Represents a user's device with trust level tracking
 * Used for device fingerprinting, MFA bypass, and session management
 */
export class Device extends BaseEntity {
  private _userId: string;
  private _deviceId: DeviceId;
  private _deviceType: DeviceType;
  private _os: string;
  private _osVersion: string;
  private _browser: string;
  private _browserVersion: string;
  private _fingerprint: string;
  private _trustLevel: DeviceTrustLevel;
  private _status: DeviceStatus;
  private _lastUsedAt: Date;
  private _trustedAt?: Date;
  private _expiresAt?: Date;
  private _ipAddress: IpAddress;
  private _userAgent: UserAgent;
  private _failedAttempts: number;
  private _loginCount: number;
  private _isVerified: boolean;
  private _verifiedAt?: Date;
  private _blockedAt?: Date;
  private _blockReason?: string;

  private constructor(
    id: string,
    userId: string,
    deviceId: DeviceId,
    deviceType: DeviceType,
    os: string,
    osVersion: string,
    browser: string,
    browserVersion: string,
    fingerprint: string,
    trustLevel: DeviceTrustLevel,
    status: DeviceStatus,
    lastUsedAt: Date,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    failedAttempts: number,
    loginCount: number,
    isVerified: boolean,
    trustedAt?: Date,
    expiresAt?: Date,
    verifiedAt?: Date,
    blockedAt?: Date,
    blockReason?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._deviceId = deviceId;
    this._deviceType = deviceType;
    this._os = os;
    this._osVersion = osVersion;
    this._browser = browser;
    this._browserVersion = browserVersion;
    this._fingerprint = fingerprint;
    this._trustLevel = trustLevel;
    this._status = status;
    this._lastUsedAt = lastUsedAt;
    this._trustedAt = trustedAt;
    this._expiresAt = expiresAt;
    this._ipAddress = ipAddress;
    this._userAgent = userAgent;
    this._failedAttempts = failedAttempts;
    this._loginCount = loginCount;
    this._isVerified = isVerified;
    this._verifiedAt = verifiedAt;
    this._blockedAt = blockedAt;
    this._blockReason = blockReason;
  }

  /**
   * Static factory method to create a new device
   */
  static create(
    userId: string,
    deviceId: DeviceId,
    deviceType: DeviceType,
    os: string,
    osVersion: string,
    browser: string,
    browserVersion: string,
    fingerprint: string,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    trustLevel: DeviceTrustLevel = 'STANDARD',
    expiresInDays?: number
  ): Device {
    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID is required');
    }

    if (!deviceId || !(deviceId instanceof DeviceId)) {
      throw new Error('Valid device ID is required');
    }

    if (!deviceType || typeof deviceType !== 'string') {
      throw new Error('Device type is required');
    }

    if (!fingerprint || typeof fingerprint !== 'string') {
      throw new Error('Device fingerprint is required');
    }

    if (!ipAddress || !(ipAddress instanceof IpAddress)) {
      throw new Error('Valid IP address is required');
    }

    if (!userAgent || !(userAgent instanceof UserAgent)) {
      throw new Error('Valid user agent is required');
    }

    const now = new Date();
    let expiresAt: Date | undefined;
    if (expiresInDays) {
      expiresAt = new Date(now.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
    }

    return new Device(
      randomUUID(),
      userId,
      deviceId,
      deviceType,
      os,
      osVersion,
      browser,
      browserVersion,
      fingerprint,
      trustLevel,
      'ACTIVE',
      now,
      ipAddress,
      userAgent,
      0,
      0,
      false,
      undefined,
      expiresAt
    );
  }

  /**
   * Reconstruct a Device entity from persistence
   */
  static reconstitute(
    id: string,
    userId: string,
    deviceId: DeviceId,
    deviceType: DeviceType,
    os: string,
    osVersion: string,
    browser: string,
    browserVersion: string,
    fingerprint: string,
    trustLevel: DeviceTrustLevel,
    status: DeviceStatus,
    lastUsedAt: Date,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    failedAttempts: number,
    loginCount: number,
    isVerified: boolean,
    trustedAt?: Date,
    expiresAt?: Date,
    verifiedAt?: Date,
    blockedAt?: Date,
    blockReason?: string,
    createdAt?: Date,
    updatedAt?: Date
  ): Device {
    return new Device(
      id,
      userId,
      deviceId,
      deviceType,
      os,
      osVersion,
      browser,
      browserVersion,
      fingerprint,
      trustLevel,
      status,
      lastUsedAt,
      ipAddress,
      userAgent,
      failedAttempts,
      loginCount,
      isVerified,
      trustedAt,
      expiresAt,
      verifiedAt,
      blockedAt,
      blockReason,
      createdAt,
      updatedAt
    );
  }

  // ============================================================================
  // Getters
  // ============================================================================

  get userId(): string {
    return this._userId;
  }

  get deviceId(): DeviceId {
    return this._deviceId;
  }

  get deviceType(): DeviceType {
    return this._deviceType;
  }

  get os(): string {
    return this._os;
  }

  get osVersion(): string {
    return this._osVersion;
  }

  get browser(): string {
    return this._browser;
  }

  get browserVersion(): string {
    return this._browserVersion;
  }

  get fingerprint(): string {
    return this._fingerprint;
  }

  get trustLevel(): DeviceTrustLevel {
    return this._trustLevel;
  }

  get status(): DeviceStatus {
    return this._status;
  }

  get lastUsedAt(): Date {
    return new Date(this._lastUsedAt);
  }

  get trustedAt(): Date | undefined {
    return this._trustedAt ? new Date(this._trustedAt) : undefined;
  }

  get expiresAt(): Date | undefined {
    return this._expiresAt ? new Date(this._expiresAt) : undefined;
  }

  get ipAddress(): IpAddress {
    return this._ipAddress;
  }

  get userAgent(): UserAgent {
    return this._userAgent;
  }

  get failedAttempts(): number {
    return this._failedAttempts;
  }

  get loginCount(): number {
    return this._loginCount;
  }

  get isVerified(): boolean {
    return this._isVerified;
  }

  get verifiedAt(): Date | undefined {
    return this._verifiedAt ? new Date(this._verifiedAt) : undefined;
  }

  get blockedAt(): Date | undefined {
    return this._blockedAt ? new Date(this._blockedAt) : undefined;
  }

  get blockReason(): string | undefined {
    return this._blockReason;
  }

  get isActive(): boolean {
    return this._status === 'ACTIVE';
  }

  get isBlocked(): boolean {
    return this._status === 'BLOCKED';
  }

  get isSuspended(): boolean {
    return this._status === 'SUSPENDED';
  }

  get isTrusted(): boolean {
    return this._trustLevel === 'TRUSTED' || this._trustLevel === 'HIGH_TRUST';
  }

  get isHighTrust(): boolean {
    return this._trustLevel === 'HIGH_TRUST';
  }

  // ============================================================================
  // Business Logic Methods
  // ============================================================================

  /**
   * Check if the device trust has expired
   */
  isExpired(): boolean {
    if (!this._expiresAt) {
      return false;
    }

    return new Date() > this._expiresAt;
  }

  /**
   * Check if the device is valid (active and not expired)
   */
  isValid(): boolean {
    return this.isActive && !this.isExpired();
  }

  /**
   * Update the last used timestamp and increment login count
   * @param ipAddress - New IP address (optional)
   * @param userAgent - New user agent (optional)
   */
  updateLastUsed(ipAddress?: IpAddress, userAgent?: UserAgent): void {
    if (this._status === 'BLOCKED') {
      throw new Error('Cannot update a blocked device');
    }

    this._lastUsedAt = new Date();
    this._loginCount += 1;

    if (ipAddress) {
      this._ipAddress = ipAddress;
    }

    if (userAgent) {
      this._userAgent = userAgent;
    }

    this.touch();
  }

  /**
   * Increment failed attempts counter
   * If failed attempts exceed threshold, suspend the device
   * @param threshold - Number of failed attempts before suspension (default: 5)
   */
  incrementFailedAttempts(threshold: number = 5): void {
    if (this._status === 'BLOCKED') {
      return;
    }

    this._failedAttempts += 1;

    if (this._failedAttempts >= threshold) {
      this._status = 'SUSPENDED';
    }

    this.touch();
  }

  /**
   * Reset failed attempts counter
   */
  resetFailedAttempts(): void {
    this._failedAttempts = 0;

    if (this._status === 'SUSPENDED') {
      this._status = 'ACTIVE';
    }

    this.touch();
  }

  /**
   * Trust the device
   * @param trustLevel - Trust level to set (default: TRUSTED)
   * @param expiresInDays - Days until trust expires (optional)
   */
  trust(trustLevel: DeviceTrustLevel = 'TRUSTED', expiresInDays?: number): void {
    if (this._status === 'BLOCKED') {
      throw new Error('Cannot trust a blocked device');
    }

    this._trustLevel = trustLevel;
    this._trustedAt = new Date();

    if (expiresInDays) {
      this._expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);
    }

    this.touch();
  }

  /**
   * Revoke trust from the device (downgrade to STANDARD)
   */
  revokeTrust(): void {
    this._trustLevel = 'STANDARD';
    this._trustedAt = undefined;
    this._expiresAt = undefined;

    this.touch();
  }

  /**
   * Verify the device
   */
  verify(): void {
    if (this._isVerified) {
      return;
    }

    this._isVerified = true;
    this._verifiedAt = new Date();

    this.touch();
  }

  /**
   * Block the device
   * @param reason - Reason for blocking (optional)
   */
  block(reason?: string): void {
    if (this._status === 'BLOCKED') {
      throw new Error('Device is already blocked');
    }

    this._status = 'BLOCKED';
    this._blockedAt = new Date();
    this._blockReason = reason || 'Device blocked';

    this.touch();
  }

  /**
   * Unblock the device
   */
  unblock(): void {
    if (this._status !== 'BLOCKED') {
      throw new Error('Device is not blocked');
    }

    this._status = 'ACTIVE';
    this._blockedAt = undefined;
    this._blockReason = undefined;
    this._failedAttempts = 0;

    this.touch();
  }

  /**
   * Upgrade trust level
   * @param newLevel - New trust level
   */
  upgradeTrust(newLevel: DeviceTrustLevel): void {
    const levels: DeviceTrustLevel[] = ['UNTRUSTED', 'STANDARD', 'TRUSTED', 'HIGH_TRUST'];
    const currentIndex = levels.indexOf(this._trustLevel);
    const newIndex = levels.indexOf(newLevel);

    if (newIndex < 0) {
      throw new Error('Invalid trust level');
    }

    if (newIndex <= currentIndex) {
      throw new Error('Cannot downgrade trust level using upgrade method');
    }

    this._trustLevel = newLevel;
    this._trustedAt = new Date();

    this.touch();
  }

  /**
   * Get trust score (0-100)
   */
  getTrustScore(): number {
    let score = 0;

    // Base trust level score
    switch (this._trustLevel) {
      case 'HIGH_TRUST':
        score += 80;
        break;
      case 'TRUSTED':
        score += 60;
        break;
      case 'STANDARD':
        score += 40;
        break;
      case 'UNTRUSTED':
        score += 10;
        break;
    }

    // Bonus for verified devices
    if (this._isVerified) {
      score += 15;
    }

    // Bonus for active status
    if (this.isActive) {
      score += 5;
    }

    // Penalty for blocked or suspended
    if (this._status === 'BLOCKED') {
      score = 0;
    } else if (this._status === 'SUSPENDED') {
      score -= 20;
    }

    // Penalty for failed attempts
    if (this._failedAttempts > 0) {
      score -= Math.min(this._failedAttempts * 5, 20);
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Get the time remaining until trust expires in seconds
   * @returns Seconds remaining or -1 if no expiry
   */
  getTrustTimeRemainingSeconds(): number {
    if (!this._expiresAt) {
      return -1;
    }

    const now = Date.now();
    const expiryTime = this._expiresAt.getTime();
    const remaining = Math.floor((expiryTime - now) / 1000);

    return Math.max(0, remaining);
  }

  /**
   * Get a summary of the device
   */
  getSummary(): {
    id: string;
    userId: string;
    deviceId: string;
    deviceType: DeviceType;
    os: string;
    osVersion: string;
    browser: string;
    browserVersion: string;
    trustLevel: DeviceTrustLevel;
    status: DeviceStatus;
    isTrusted: boolean;
    isActive: boolean;
    isBlocked: boolean;
    isVerified: boolean;
    trustScore: number;
    lastUsedAt: Date;
    trustedAt?: Date;
    expiresAt?: Date;
    failedAttempts: number;
    loginCount: number;
    trustTimeRemainingSeconds: number;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      userId: this._userId,
      deviceId: this._deviceId.getValue(),
      deviceType: this._deviceType,
      os: this._os,
      osVersion: this._osVersion,
      browser: this._browser,
      browserVersion: this._browserVersion,
      trustLevel: this._trustLevel,
      status: this._status,
      isTrusted: this.isTrusted,
      isActive: this.isActive,
      isBlocked: this.isBlocked,
      isVerified: this._isVerified,
      trustScore: this.getTrustScore(),
      lastUsedAt: this._lastUsedAt,
      trustedAt: this._trustedAt,
      expiresAt: this._expiresAt,
      failedAttempts: this._failedAttempts,
      loginCount: this._loginCount,
      trustTimeRemainingSeconds: this.getTrustTimeRemainingSeconds(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Check if two Device entities are equal (compare by id)
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
   * Create a deep clone of the Device entity
   */
  clone(): Device {
    return new Device(
      this.id,
      this._userId,
      this._deviceId,
      this._deviceType,
      this._os,
      this._osVersion,
      this._browser,
      this._browserVersion,
      this._fingerprint,
      this._trustLevel,
      this._status,
      new Date(this._lastUsedAt),
      this._ipAddress,
      this._userAgent,
      this._failedAttempts,
      this._loginCount,
      this._isVerified,
      this._trustedAt ? new Date(this._trustedAt) : undefined,
      this._expiresAt ? new Date(this._expiresAt) : undefined,
      this._verifiedAt ? new Date(this._verifiedAt) : undefined,
      this._blockedAt ? new Date(this._blockedAt) : undefined,
      this._blockReason,
      new Date(this.createdAt),
      new Date(this.updatedAt)
    );
  }
}
