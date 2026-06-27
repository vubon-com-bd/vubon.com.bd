/**
 * Session Entity - Pure Domain Core (Enterprise Enhanced)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/session.entity
 * 
 * @description
 * Represents a user session for authentication and activity tracking.
 * Manages session lifecycle, expiry, idle timeout, and concurrent sessions.
 * 
 * Enterprise Features (Applied):
 * ✅ Shared configuration from @vubon/shared-constants (SESSION_CONFIG)
 * ✅ Absolute lifetime limit with validation
 * ✅ Idle timeout enforcement (mobile vs desktop)
 * ✅ Session extension with limits
 * ✅ Domain events for all state changes
 * ✅ Framework-free (no external dependencies)
 * ✅ Bangladesh specific - Network type tracking, mobile operator
 * ✅ Trust level tracking for device fingerprinting
 * ✅ Termination reason tracking for audit
 * 
 * Session Lifecycle:
 * CREATE -> ACTIVE -> (REVOKED/EXPIRED/IDLE_EXPIRED/SUSPENDED)
 * ACTIVE -> extend() -> ACTIVE (within limits)
 * ACTIVE -> recordActivity() -> ACTIVE (reset idle timer)
 */

import { BaseEntity, EntityValidationResult, EntityValidationError, type IdGenerator } from './base.entity';
import { IpAddress } from '../value-objects/ip-address.vo';
import { UserAgent } from '../value-objects/user-agent.vo';
import { DeviceId } from '../value-objects/device-id.vo';
import { Token } from '../value-objects/token.vo';

// ✅ FIXED: Import from shared-constants instead of local constants
import { SESSION_CONFIG } from '@vubon/shared-constants';

// ==================== Types ====================




// ==================== Enums ====================

/**
 * Session status enumeration
 */
export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  REVOKED = 'REVOKED',
  EXPIRED = 'EXPIRED',
  IDLE_EXPIRED = 'IDLE_EXPIRED',
  SUSPENDED = 'SUSPENDED',
}

/**
 * Session event types
 */
export enum SessionEventType {
  SESSION_CREATED = 'session.created',
  SESSION_REVOKED = 'session.revoked',
  SESSION_EXPIRED = 'session.expired',
  SESSION_IDLE_EXPIRED = 'session.idle_expired',
  SESSION_SUSPENDED = 'session.suspended',
  SESSION_EXTENDED = 'session.extended',
  SESSION_ACTIVITY_RECORDED = 'session.activity_recorded',
  SESSION_LOCATION_CHANGED = 'session.location_changed',
  SESSION_DEVICE_CHANGED = 'session.device_changed',
  SESSION_TRUST_LEVEL_CHANGED = 'session.trust_level_changed',
}

// ==================== Types ====================

/**
 * Session metadata (Bangladesh specific)
 */
export interface SessionMetadata {
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  district?: string;
  upazila?: string;
  dataSaverEnabled?: boolean;
  isFamilyShared?: boolean;
  familyMemberId?: string;
  trustLevel?: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
}

/**
 * Session termination reason tracking (for audit)
 */
export interface TerminationInfo {
  reason: string;
  terminatedAt: Date;
  terminatedBy?: 'user' | 'admin' | 'system';
  metadata?: Record<string, unknown>;
}

// ==================== Session Entity ====================

/**
 * Session Entity
 * 
 * Manages user session lifecycle and activity tracking
 */
export class Session extends BaseEntity {
  private _userId: string;
  private _token: Token;
  private _ipAddress: IpAddress;
  private _userAgent: UserAgent;
  private _deviceId: DeviceId;
  private _expiresAt: Date;
  private _idleTimeoutAt: Date;
  private _absoluteTimeoutAt: Date;
  private _status: SessionStatus;
  private _lastActivityAt: Date;
  private _lastActivityUrl: string | undefined;
  private _extensionCount: number;
  private _sessionName: string | undefined;
  private _location: string | undefined;
private _sessionMetadata: SessionMetadata;  private _isCurrent: boolean;
  private _terminationInfo: TerminationInfo | undefined;

  private constructor(
    id: string,
    userId: string,
    token: Token,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    deviceId: DeviceId,
    expiresAt: Date,
    idleTimeoutAt: Date,
    absoluteTimeoutAt: Date,
    status: SessionStatus,
    lastActivityAt: Date,
    lastActivityUrl: string | undefined,
    extensionCount: number,
    sessionName: string | undefined,
    location: string | undefined,
    metadata: SessionMetadata,
    isCurrent: boolean,
    terminationInfo: TerminationInfo | undefined,
    createdAt: Date,
    updatedAt: Date,
    version: number
  ) {
    super({ id, createdAt, updatedAt, version });
    
    this._userId = userId;
    this._token = token;
    this._ipAddress = ipAddress;
    this._userAgent = userAgent;
    this._deviceId = deviceId;
    this._expiresAt = expiresAt;
    this._idleTimeoutAt = idleTimeoutAt;
    this._absoluteTimeoutAt = absoluteTimeoutAt;
    this._status = status;
    this._lastActivityAt = lastActivityAt;
    this._lastActivityUrl = lastActivityUrl;
    this._extensionCount = extensionCount;
    this._sessionName = sessionName;
    this._location = location;
    this._sessionMetadata = metadata;
    this._isCurrent = isCurrent;
    this._terminationInfo = terminationInfo;
    
    // ✅ FIXED: Call validate and handle the result
    const validationResult = this.validate();
    if (!validationResult.isValid) {
      throw new EntityValidationError(
        'Session validation failed',
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
      errors.push('Session requires a user ID');
    }
    if (!this._token) {
      errors.push('Session requires a token');
    }
    if (!this._ipAddress) {
      errors.push('Session requires an IP address');
    }
    if (!this._userAgent) {
      errors.push('Session requires a user agent');
    }
    if (!this._deviceId) {
      errors.push('Session requires a device ID');
    }
    if (this._extensionCount < 0) {
      errors.push('Extension count cannot be negative');
    }
    if (this._extensionCount > SESSION_CONFIG.MAX_EXTENSIONS) {
      errors.push(`Extension count exceeds maximum of ${SESSION_CONFIG.MAX_EXTENSIONS}`);
    }
    if (this._expiresAt < this.createdAt) {
      errors.push('ExpiresAt cannot be before CreatedAt');
    }
    if (this._idleTimeoutAt < this._lastActivityAt) {
      errors.push('IdleTimeoutAt cannot be before LastActivityAt');
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
   * Create a new session (factory method)
   */
  public static create(
    userId: string,
    token: Token,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    deviceId: DeviceId,
    idGenerator: IdGenerator,
    metadata?: Partial<SessionMetadata>,
    sessionName?: string,
    location?: string,
    lifetimeMinutes?: number
  ): Session {
    const now = new Date();
    const lifetimeMs = (lifetimeMinutes || SESSION_CONFIG.DEFAULT_LIFETIME_HOURS * 60) * 60 * 1000;
    const expiresAt = new Date(now.getTime() + lifetimeMs);
    const absoluteTimeoutAt = new Date(now.getTime() + SESSION_CONFIG.MAX_ABSOLUTE_LIFETIME_MS);
    
    // Use mobile idle timeout for mobile devices
    const isMobile = userAgent.isMobile();
    const idleTimeoutMinutes = isMobile 
      ? SESSION_CONFIG.MOBILE_IDLE_TIMEOUT_MINUTES 
      : SESSION_CONFIG.IDLE_TIMEOUT_MINUTES;
    const idleTimeoutAt = new Date(now.getTime() + idleTimeoutMinutes * 60 * 1000);
    
    const defaultMetadata: SessionMetadata = {
      networkType: 'unknown',
      mobileOperator: 'unknown',
      dataSaverEnabled: false,
      isFamilyShared: false,
      trustLevel: 'standard',
    };
    
    const session = new Session(
      idGenerator.generate(),
      userId,
      token,
      ipAddress,
      userAgent,
      deviceId,
      expiresAt,
      idleTimeoutAt,
      absoluteTimeoutAt,
      SessionStatus.ACTIVE,
      now,
      undefined,
      0,
      sessionName,
      location,
      { ...defaultMetadata, ...metadata },
      true,
      undefined,
      now,
      now,
      1
    );
    
    session.addDomainEvent({
      eventId: generateEventId(),
      eventType: SessionEventType.SESSION_CREATED,
      aggregateId: session.id,
      occurredOn: now,
      version: 1,
      metadata: {
        userId,
        deviceId: deviceId.getValue(),
        deviceType: userAgent.getDeviceType(),
        isMobile: userAgent.isMobile(),
        expiresAt: expiresAt.toISOString(),
        lifetimeMinutes: lifetimeMinutes || SESSION_CONFIG.DEFAULT_LIFETIME_HOURS * 60,
        idleTimeoutMinutes,
      },
    });
    
    return session;
  }

  /**
   * Reconstitute from persistence
   */
  public static reconstitute(data: {
    id: string;
    userId: string;
    token: Token;
    ipAddress: IpAddress;
    userAgent: UserAgent;
    deviceId: DeviceId;
    expiresAt: Date;
    idleTimeoutAt: Date;
    absoluteTimeoutAt: Date;
    status: SessionStatus;
    lastActivityAt: Date;
    lastActivityUrl?: string;
    extensionCount: number;
    sessionName?: string;
    location?: string;
    metadata: SessionMetadata;
    isCurrent: boolean;
    terminationInfo?: TerminationInfo;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }): Session {
    return new Session(
      data.id,
      data.userId,
      data.token,
      data.ipAddress,
      data.userAgent,
      data.deviceId,
      data.expiresAt,
      data.idleTimeoutAt,
      data.absoluteTimeoutAt,
      data.status,
      data.lastActivityAt,
      data.lastActivityUrl,
      data.extensionCount,
      data.sessionName,
      data.location,
      data.metadata,
      data.isCurrent,
      data.terminationInfo,
      data.createdAt,
      data.updatedAt,
      data.version
    );
  }

  // ============================================================
  // Business Methods
  // ============================================================

  /**
   * Revoke session (logout)
   */
  public revoke(reason?: string, terminatedBy: 'user' | 'admin' | 'system' = 'user'): void {
    if (this._status === SessionStatus.REVOKED) {
      throw new EntityValidationError('Session already revoked');
    }
    
    this._status = SessionStatus.REVOKED;
    this._isCurrent = false;
    this._terminationInfo = {
      reason: reason || 'User initiated logout',
      terminatedAt: new Date(),
      terminatedBy,
    };
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: SessionEventType.SESSION_REVOKED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        deviceId: this._deviceId.getValue(),
        reason,
        terminatedBy,
      },
    });
  }

  /**
   * Expire session (due to absolute lifetime)
   */
  public expire(): void {
    if (this._status === SessionStatus.EXPIRED) {
      return;
    }
    
    this._status = SessionStatus.EXPIRED;
    this._isCurrent = false;
    this._terminationInfo = {
      reason: 'Session expired due to absolute lifetime limit',
      terminatedAt: new Date(),
      terminatedBy: 'system',
    };
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: SessionEventType.SESSION_EXPIRED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        expiresAt: this._expiresAt.toISOString(),
      },
    });
  }

  /**
   * Expire session due to idle timeout
   */
  public expireIdle(): void {
    if (this._status !== SessionStatus.ACTIVE) {
      return;
    }
    
    this._status = SessionStatus.IDLE_EXPIRED;
    this._isCurrent = false;
    this._terminationInfo = {
      reason: `Session expired due to idle timeout (${this.getIdleTimeMinutes()} minutes inactive)`,
      terminatedAt: new Date(),
      terminatedBy: 'system',
    };
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: SessionEventType.SESSION_IDLE_EXPIRED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        lastActivityAt: this._lastActivityAt.toISOString(),
        idleMinutes: this.getIdleTimeMinutes(),
      },
    });
  }

  /**
   * Suspend session (temporary)
   */
  public suspend(reason: string): void {
    if (this._status !== SessionStatus.ACTIVE) {
      throw new EntityValidationError(`Cannot suspend session with status: ${this._status}`);
    }
    
    this._status = SessionStatus.SUSPENDED;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: SessionEventType.SESSION_SUSPENDED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        reason,
      },
    });
  }

  /**
   * Reactivate suspended session
   */
  public reactivate(): void {
    if (this._status !== SessionStatus.SUSPENDED) {
      throw new EntityValidationError(`Cannot reactivate session with status: ${this._status}`);
    }
    
    this._status = SessionStatus.ACTIVE;
    this.touch();
  }

  /**
   * Extend session expiration
   */
  public extend(minutes: number): Date {
    if (this._status !== SessionStatus.ACTIVE) {
      throw new EntityValidationError(`Cannot extend inactive session (status: ${this._status})`);
    }
    
    if (this.isExpired()) {
      throw new EntityValidationError('Cannot extend expired session');
    }
    
    if (minutes <= 0) {
      throw new EntityValidationError('Extension minutes must be positive');
    }
    
    if (minutes > SESSION_CONFIG.MAX_EXTENSION_MINUTES) {
      throw new EntityValidationError(
        `Cannot extend by more than ${SESSION_CONFIG.MAX_EXTENSION_MINUTES} minutes`
      );
    }
    
    if (this._extensionCount >= SESSION_CONFIG.MAX_EXTENSIONS) {
      throw new EntityValidationError(
        `Maximum extensions (${SESSION_CONFIG.MAX_EXTENSIONS}) reached`
      );
    }
    
    // Check absolute lifetime limit
    const newExpiry = new Date(this._expiresAt.getTime() + minutes * 60 * 1000);
    if (newExpiry > this._absoluteTimeoutAt) {
      throw new EntityValidationError(
        'Extension would exceed maximum absolute session lifetime'
      );
    }
    
    const oldExpiry = this._expiresAt;
    this._expiresAt = newExpiry;
    this._extensionCount++;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: SessionEventType.SESSION_EXTENDED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        minutesExtended: minutes,
        oldExpiry: oldExpiry.toISOString(),
        newExpiry: this._expiresAt.toISOString(),
        extensionCount: this._extensionCount,
      },
    });
    
    return this._expiresAt;
  }

  /**
   * Record user activity (reset idle timer)
   */
  public recordActivity(url?: string): void {
    if (this._status !== SessionStatus.ACTIVE) {
      throw new EntityValidationError(
        `Cannot record activity for inactive session (status: ${this._status})`
      );
    }
    
    if (this.isExpired()) {
      this.expire();
      throw new EntityValidationError('Cannot record activity for expired session');
    }
    
    const oldLastActivity = this._lastActivityAt;
    this._lastActivityAt = new Date();
    this._lastActivityUrl = url;
    
    // Reset idle timeout
    const isMobile = this._userAgent.isMobile();
    const idleTimeoutMinutes = isMobile 
      ? SESSION_CONFIG.MOBILE_IDLE_TIMEOUT_MINUTES 
      : SESSION_CONFIG.IDLE_TIMEOUT_MINUTES;
    this._idleTimeoutAt = new Date(this._lastActivityAt.getTime() + idleTimeoutMinutes * 60 * 1000);
    
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: SessionEventType.SESSION_ACTIVITY_RECORDED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        previousActivity: oldLastActivity.toISOString(),
        url,
      },
    });
  }

  /**
   * Update IP address (for location change detection)
   */
  public updateIpAddress(newIp: IpAddress, location?: string): void {
    if (this._ipAddress.equals(newIp)) {
      return;
    }
    
    const oldIp = this._ipAddress;
    this._ipAddress = newIp;
    if (location) {
      this._location = location;
    }
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: SessionEventType.SESSION_LOCATION_CHANGED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        oldIp: oldIp.getValue(),
        newIp: newIp.getValue(),
        oldIpCategory: oldIp.getCategory(),
        newIpCategory: newIp.getCategory(),
      },
    });
  }

  /**
   * Update trust level (for device fingerprinting)
   */
  public updateTrustLevel(trustLevel: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust'): void {
    const oldTrustLevel = this._sessionMetadata.trustLevel;
    if (oldTrustLevel === trustLevel) {
      return;
    }
    
    this._sessionMetadata.trustLevel = trustLevel;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: SessionEventType.SESSION_TRUST_LEVEL_CHANGED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        oldTrustLevel,
        newTrustLevel: trustLevel,
        deviceId: this._deviceId.getValue(),
      },
    });
  }

  /**
 * Update session-specific metadata
 * ✅ FIXED: Renamed to avoid conflict with base entity method
 */
public updateSessionMetadata(metadata: Partial<SessionMetadata>): void {
  this._sessionMetadata = { ...this._sessionMetadata, ...metadata };
  this.touch();
}
  /**
   * Mark session as current (for current device)
   */
  public markAsCurrent(): void {
    this._isCurrent = true;
    this.touch();
  }

  /**
   * Mark session as not current
   */
  public markAsNotCurrent(): void {
    this._isCurrent = false;
    this.touch();
  }

  /**
   * Get termination information (for audit)
   */
  public getTerminationInfo(): TerminationInfo | undefined {
    return this._terminationInfo ? { ...this._terminationInfo } : undefined;
  }

  // ============================================================
  // Query Methods
  // ============================================================

  /**
   * Validate session ownership
   */
  public validateOwnership(userId: string): boolean {
    return this._userId === userId;
  }

  /**
   * Check if session is expired (absolute expiry)
   */
  public isExpired(): boolean {
    if (this._status === SessionStatus.EXPIRED) return true;
    if (this._status !== SessionStatus.ACTIVE) return false;
    return new Date() > this._expiresAt;
  }

  /**
   * Check if absolute lifetime has expired
   */
  public isAbsoluteExpired(): boolean {
    return new Date() > this._absoluteTimeoutAt;
  }

  /**
   * Check if session is idle (inactive for too long)
   */
  public isIdle(): boolean {
    if (this._status !== SessionStatus.ACTIVE) return false;
    return new Date() > this._idleTimeoutAt;
  }

  /**
   * Check if session should be expired due to idle timeout
   */
  public shouldExpireIdle(): boolean {
    return this.isActive() && this.isIdle();
  }

  /**
   * Check if session is active
   */
  public isActive(): boolean {
    return this._status === SessionStatus.ACTIVE && 
           !this.isExpired() && 
           !this.isAbsoluteExpired() && 
           !this.isIdle();
  }

  /**
   * Check if session is revoked
   */
  public isRevoked(): boolean {
    return this._status === SessionStatus.REVOKED;
  }

  /**
   * Check if session is suspended
   */
  public isSuspended(): boolean {
    return this._status === SessionStatus.SUSPENDED;
  }

  /**
   * Check if this is the current session
   */
  public isCurrent(): boolean {
    return this._isCurrent && this.isActive();
  }

  /**
   * Get remaining session time in milliseconds
   */
  public getRemainingTimeMs(): number {
    if (this.isExpired()) return 0;
    if (this._status !== SessionStatus.ACTIVE) return 0;
    
    const remaining = this._expiresAt.getTime() - new Date().getTime();
    return remaining > 0 ? remaining : 0;
  }

  /**
   * Get remaining session time in minutes
   */
  public getRemainingTimeMinutes(): number {
    return Math.ceil(this.getRemainingTimeMs() / (60 * 1000));
  }

  /**
   * Get remaining idle time before timeout
   */
  public getRemainingIdleTimeMinutes(): number {
    if (this._status !== SessionStatus.ACTIVE) return 0;
    
    const remaining = this._idleTimeoutAt.getTime() - new Date().getTime();
    return remaining > 0 ? Math.ceil(remaining / (60 * 1000)) : 0;
  }

  /**
   * Get idle time in minutes
   */
  public getIdleTimeMinutes(): number {
    const idleTime = new Date().getTime() - this._lastActivityAt.getTime();
    return Math.floor(idleTime / (60 * 1000));
  }

  /**
   * Check if session can be extended
   */
  public canExtend(): boolean {
    if (this._status !== SessionStatus.ACTIVE) return false;
    if (this.isExpired()) return false;
    if (this._extensionCount >= SESSION_CONFIG.MAX_EXTENSIONS) return false;
    
    // Check absolute lifetime
    const maxExtensionExpiry = new Date(this._absoluteTimeoutAt.getTime());
    return this._expiresAt < maxExtensionExpiry;
  }

  // ============================================================
  // Getters
  // ============================================================

  public getUserId(): string { return this._userId; }
  public getToken(): Token { return this._token; }
  public getIpAddress(): IpAddress { return this._ipAddress; }
  public getUserAgent(): UserAgent { return this._userAgent; }
  public getDeviceId(): DeviceId { return this._deviceId; }
  public getExpiresAt(): Date { return new Date(this._expiresAt); }
  public getIdleTimeoutAt(): Date { return new Date(this._idleTimeoutAt); }
  public getAbsoluteTimeoutAt(): Date { return new Date(this._absoluteTimeoutAt); }
  public getStatus(): SessionStatus { return this._status; }
  public getLastActivityAt(): Date { return new Date(this._lastActivityAt); }
  public getLastActivityUrl(): string | undefined { return this._lastActivityUrl; }
  public getExtensionCount(): number { return this._extensionCount; }
  public getSessionName(): string | undefined { return this._sessionName; }
  public getLocation(): string | undefined { return this._location; }
  public getMetadata(): Readonly<SessionMetadata> { return { ...this._sessionMetadata }; }
  public getTrustLevel(): 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust' {
    return this._sessionMetadata.trustLevel || 'standard';
  }

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
      ipAddress: this._ipAddress.getValue(),
      ipCategory: this._ipAddress.getCategory(),
      userAgent: this._userAgent.getValue(),
      deviceType: this._userAgent.getDeviceType(),
      deviceId: this._deviceId.getValue(),
      expiresAt: this._expiresAt.toISOString(),
      idleTimeoutAt: this._idleTimeoutAt.toISOString(),
      absoluteTimeoutAt: this._absoluteTimeoutAt.toISOString(),
      status: this._status,
      lastActivityAt: this._lastActivityAt.toISOString(),
      lastActivityUrl: this._lastActivityUrl,
      extensionCount: this._extensionCount,
      sessionName: this._sessionName,
      location: this._location,
      metadata: this._sessionMetadata,
      trustLevel: this.getTrustLevel(),
      isActive: this.isActive(),
      isExpired: this.isExpired(),
      isRevoked: this.isRevoked(),
      isSuspended: this.isSuspended(),
      isCurrent: this._isCurrent,
      isIdle: this.isIdle(),
      remainingTimeMinutes: this.getRemainingTimeMinutes(),
      remainingIdleTimeMinutes: this.getRemainingIdleTimeMinutes(),
      idleTimeMinutes: this.getIdleTimeMinutes(),
      canExtend: this.canExtend(),
      terminationInfo: this._terminationInfo,
      // ⚠️ Token value is intentionally excluded for security
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
