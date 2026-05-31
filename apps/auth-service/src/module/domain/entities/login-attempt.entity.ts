/**
 * Login Attempt Entity - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/login-attempt.entity
 * 
 * @description
 * Represents a login attempt for security monitoring and fraud detection.
 * Tracks IP, device, user agent, and risk score for each attempt.
 * 
 * Enterprise Rules:
 * ✅ Risk score is calculated in infrastructure and passed to domain
 * ✅ Domain only stores and categorizes risk levels
 * ✅ Domain events for suspicious activities
 * ✅ Framework-free (no crypto dependency)
 * ✅ Bangladesh specific - Mobile operator tracking
 * 
 * IMPORTANT: VPN/Proxy detection is infrastructure concern.
 * Risk score should be calculated by infrastructure services
 * (IP2Location, MaxMind, etc.) and passed to domain entity.
 */

import { BaseEntity, EntityValidationError, type IdGenerator } from './base.entity';
import { Email } from '../value-objects/email.vo';
import { IpAddress } from '../value-objects/ip-address.vo';
import { UserAgent } from '../value-objects/user-agent.vo';
import { DeviceId } from '../value-objects/device-id.vo';

// ==================== Enums ====================

/**
 * Login result enumeration
 */
export enum LoginResult {
  SUCCESS = 'SUCCESS',
  FAILED_PASSWORD = 'FAILED_PASSWORD',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  ACCOUNT_INACTIVE = 'ACCOUNT_INACTIVE',
  MFA_REQUIRED = 'MFA_REQUIRED',
  MFA_FAILED = 'MFA_FAILED',
  SUSPICIOUS = 'SUSPICIOUS',
  RATE_LIMITED = 'RATE_LIMITED',
  IP_BLOCKED = 'IP_BLOCKED',
  DEVICE_BLOCKED = 'DEVICE_BLOCKED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  ACCOUNT_NOT_FOUND = 'ACCOUNT_NOT_FOUND',
}

/**
 * Risk level enumeration
 */
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

/**
 * Login attempt event types
 */
export enum LoginAttemptEventType {
  LOGIN_ATTEMPT_RECORDED = 'login_attempt.recorded',
  HIGH_RISK_LOGIN_DETECTED = 'login_attempt.high_risk_detected',
  BRUTE_FORCE_PATTERN_DETECTED = 'login_attempt.brute_force_detected',
  SUSPICIOUS_PATTERN_DETECTED = 'login_attempt.suspicious_pattern_detected',
  SUCCESSFUL_LOGIN = 'login_attempt.successful',
  FAILED_LOGIN = 'login_attempt.failed',
}

// ==================== Types ====================

/**
 * Risk score thresholds
 */
const RISK_THRESHOLDS = {
  HIGH_RISK: 70,
  CRITICAL_RISK: 90,
  MEDIUM_RISK: 40,
} as const;

/**
 * Login attempt metadata interface
 */
export interface LoginAttemptMetadata {
  location?: {
    country?: string;
    city?: string;
    district?: string; // Bangladesh specific
    latitude?: number;
    longitude?: number;
  };
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  isWeekend?: boolean;
  isNightTime?: boolean;
  attemptedViaMFS?: boolean;
}

// ==================== Login Attempt Entity ====================

/**
 * Login Attempt Entity
 * 
 * Records login attempts with risk scoring for security monitoring
 */
export class LoginAttempt extends BaseEntity {
  private _userId: string | undefined;
  private _email: Email;
  private _ipAddress: IpAddress;
  private _userAgent: UserAgent;
  private _deviceId: DeviceId;
  private _result: LoginResult;
  private _attemptedAt: Date;
  private _riskScore: number;
  private _riskLevel: RiskLevel;
  private _failureReason?: string;
  private _metadata?: LoginAttemptMetadata;
  private _isMfaVerified: boolean;
  private _sessionId?: string;

  private constructor(
    id: string,
    userId: string | undefined,
    email: Email,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    deviceId: DeviceId,
    result: LoginResult,
    attemptedAt: Date,
    riskScore: number,
    riskLevel: RiskLevel,
    failureReason: string | undefined,
    metadata: LoginAttemptMetadata | undefined,
    isMfaVerified: boolean,
    sessionId: string | undefined,
    createdAt: Date,
    updatedAt: Date,
    version: number
  ) {
    super({ id, createdAt, updatedAt, version });
    
    this._userId = userId;
    this._email = email;
    this._ipAddress = ipAddress;
    this._userAgent = userAgent;
    this._deviceId = deviceId;
    this._result = result;
    this._attemptedAt = attemptedAt;
    this._riskScore = riskScore;
    this._riskLevel = riskLevel;
    this._failureReason = failureReason;
    this._metadata = metadata;
    this._isMfaVerified = isMfaVerified;
    this._sessionId = sessionId;
    
    this.validate();
  }

  /**
   * Validate entity invariants
   */
  protected validate(): void {
    if (!this._email) {
      throw new EntityValidationError('Login attempt requires an email');
    }
    if (!this._ipAddress) {
      throw new EntityValidationError('Login attempt requires an IP address');
    }
    if (!this._userAgent) {
      throw new EntityValidationError('Login attempt requires a user agent');
    }
    if (!this._deviceId) {
      throw new EntityValidationError('Login attempt requires a device ID');
    }
    if (this._riskScore < 0 || this._riskScore > 100) {
      throw new EntityValidationError('Risk score must be between 0 and 100');
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Record a login attempt (factory method)
   */
  public static record(
    email: Email,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    deviceId: DeviceId,
    result: LoginResult,
    riskScore: number,
    idGenerator: IdGenerator,
    userId?: string,
    failureReason?: string,
    metadata?: LoginAttemptMetadata,
    sessionId?: string
  ): LoginAttempt {
    const now = new Date();
    const riskLevel = LoginAttempt.calculateRiskLevel(riskScore);
    
    const attempt = new LoginAttempt(
      idGenerator.generate(),
      userId,
      email,
      ipAddress,
      userAgent,
      deviceId,
      result,
      now,
      riskScore,
      riskLevel,
      failureReason,
      metadata,
      false,
      sessionId,
      now,
      now,
      1
    );
    
    const eventType = result === LoginResult.SUCCESS 
      ? LoginAttemptEventType.SUCCESSFUL_LOGIN 
      : LoginAttemptEventType.FAILED_LOGIN;
    
    attempt.addDomainEvent({
      eventId: generateEventId(),
      eventType,
      aggregateId: attempt.id,
      occurredOn: now,
      version: 1,
      metadata: {
        email: email.getValue(),
        result: result,
        riskScore: riskScore,
        riskLevel: riskLevel,
        ipAddress: ipAddress.getValue(),
        deviceId: deviceId.getValue(),
        userId: userId,
      },
    });
    
    // Emit high risk event if applicable
    if (attempt.isHighRisk()) {
      attempt.addDomainEvent({
        eventId: generateEventId(),
        eventType: LoginAttemptEventType.HIGH_RISK_LOGIN_DETECTED,
        aggregateId: attempt.id,
        occurredOn: now,
        version: 1,
        metadata: {
          email: email.getValue(),
          riskScore: riskScore,
          riskLevel: riskLevel,
          ipAddress: ipAddress.getValue(),
          deviceId: deviceId.getValue(),
        },
      });
    }
    
    return attempt;
  }

  /**
   * Reconstitute from persistence
   */
  public static reconstitute(data: {
    id: string;
    userId?: string;
    email: Email;
    ipAddress: IpAddress;
    userAgent: UserAgent;
    deviceId: DeviceId;
    result: LoginResult;
    attemptedAt: Date;
    riskScore: number;
    riskLevel: RiskLevel;
    failureReason?: string;
    metadata?: LoginAttemptMetadata;
    isMfaVerified: boolean;
    sessionId?: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }): LoginAttempt {
    return new LoginAttempt(
      data.id,
      data.userId,
      data.email,
      data.ipAddress,
      data.userAgent,
      data.deviceId,
      data.result,
      data.attemptedAt,
      data.riskScore,
      data.riskLevel,
      data.failureReason,
      data.metadata,
      data.isMfaVerified,
      data.sessionId,
      data.createdAt,
      data.updatedAt,
      data.version
    );
  }

  // ============================================================
  // Private Helpers
  // ============================================================

  /**
   * Calculate risk level from risk score
   */
  private static calculateRiskLevel(riskScore: number): RiskLevel {
    if (riskScore >= RISK_THRESHOLDS.CRITICAL_RISK) return RiskLevel.CRITICAL;
    if (riskScore >= RISK_THRESHOLDS.HIGH_RISK) return RiskLevel.HIGH;
    if (riskScore >= RISK_THRESHOLDS.MEDIUM_RISK) return RiskLevel.MEDIUM;
    return RiskLevel.LOW;
  }

  // ============================================================
  // Query Methods
  // ============================================================

  /**
   * Check if login attempt is suspicious
   */
  public isSuspicious(): boolean {
    return this._riskLevel === RiskLevel.HIGH || this._riskLevel === RiskLevel.CRITICAL;
  }

  /**
   * Check if login attempt is high risk
   */
  public isHighRisk(): boolean {
    return this._riskLevel === RiskLevel.HIGH;
  }

  /**
   * Check if login attempt is critical risk
   */
  public isCriticalRisk(): boolean {
    return this._riskLevel === RiskLevel.CRITICAL;
  }

  /**
   * Get risk level
   */
  public getRiskLevel(): RiskLevel {
    return this._riskLevel;
  }

  /**
   * Check if login was successful
   */
  public wasSuccessful(): boolean {
    return this._result === LoginResult.SUCCESS;
  }

  /**
   * Check if MFA is required after this attempt
   */
  public requiresMFA(): boolean {
    return this._result === LoginResult.MFA_REQUIRED;
  }

  /**
   * Check if MFA was verified
   */
  public isMfaVerified(): boolean {
    return this._isMfaVerified;
  }

  /**
   * Check if account is locked
   */
  public isAccountLocked(): boolean {
    return this._result === LoginResult.ACCOUNT_LOCKED;
  }

  /**
   * Check if login was rate limited
   */
  public wasRateLimited(): boolean {
    return this._result === LoginResult.RATE_LIMITED;
  }

  /**
   * Check if IP is blocked
   */
  public isIPBlocked(): boolean {
    return this._result === LoginResult.IP_BLOCKED;
  }

  /**
   * Check if device is blocked
   */
  public isDeviceBlocked(): boolean {
    return this._result === LoginResult.DEVICE_BLOCKED;
  }

  /**
   * Check if credentials were invalid
   */
  public wereCredentialsInvalid(): boolean {
    return this._result === LoginResult.FAILED_PASSWORD || 
           this._result === LoginResult.INVALID_CREDENTIALS;
  }

  /**
   * Get time since attempt (minutes)
   */
  public getMinutesSinceAttempt(): number {
    const now = new Date();
    const diffMinutes = (now.getTime() - this._attemptedAt.getTime()) / (1000 * 60);
    return Math.floor(diffMinutes);
  }

  /**
   * Check if attempt is recent (within last X minutes)
   */
  public isRecent(minutes: number = 5): boolean {
    return this.getMinutesSinceAttempt() <= minutes;
  }

  /**
   * Get risk score for this attempt
   */
  public getRiskScore(): number {
    return this._riskScore;
  }

  // ============================================================
  // Business Methods
  // ============================================================

  /**
   * Link attempt to a known user (after successful identification)
   */
  public linkToUser(userId: string): void {
    if (this._userId) {
      throw new EntityValidationError('Login attempt already linked to a user');
    }
    if (!userId) {
      throw new EntityValidationError('User ID is required');
    }
    
    this._userId = userId;
    this.touch();
  }

  /**
   * Mark MFA as verified for this attempt
   */
  public markMfaVerified(): void {
    if (this._isMfaVerified) {
      return;
    }
    this._isMfaVerified = true;
    this.touch();
  }

  /**
   * Set session ID for this attempt
   */
  public setSessionId(sessionId: string): void {
    this._sessionId = sessionId;
    this.touch();
  }

  /**
   * Record brute force pattern detected
   */
  public markBruteForcePattern(pattern: string): void {
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: LoginAttemptEventType.BRUTE_FORCE_PATTERN_DETECTED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        email: this._email.getValue(),
        ipAddress: this._ipAddress.getValue(),
        deviceId: this._deviceId.getValue(),
        pattern,
        attemptCount: this._riskScore,
      },
    });
  }

  /**
   * Record suspicious pattern detected
   */
  public markSuspiciousPattern(reason: string): void {
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: LoginAttemptEventType.SUSPICIOUS_PATTERN_DETECTED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        email: this._email.getValue(),
        reason,
        riskScore: this._riskScore,
        riskLevel: this._riskLevel,
      },
    });
  }

  // ============================================================
  // Getters
  // ============================================================

  public getUserId(): string | undefined { return this._userId; }
  public getEmail(): Email { return this._email; }
  public getIpAddress(): IpAddress { return this._ipAddress; }
  public getUserAgent(): UserAgent { return this._userAgent; }
  public getDeviceId(): DeviceId { return this._deviceId; }
  public getResult(): LoginResult { return this._result; }
  public getAttemptedAt(): Date { return new Date(this._attemptedAt); }
  public getFailureReason(): string | undefined { return this._failureReason; }
  public getMetadata(): Readonly<LoginAttemptMetadata> | undefined { return this._metadata; }
  public getSessionId(): string | undefined { return this._sessionId; }
  public getRiskScoreNumber(): number { return this._riskScore; }

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
      email: this._email.getValue(),
      ipAddress: this._ipAddress.getValue(),
      userAgent: this._userAgent.getValue(),
      deviceId: this._deviceId.getValue(),
      result: this._result,
      attemptedAt: this._attemptedAt.toISOString(),
      riskScore: this._riskScore,
      riskLevel: this._riskLevel,
      failureReason: this._failureReason,
      metadata: this._metadata,
      isMfaVerified: this._isMfaVerified,
      sessionId: this._sessionId,
      isSuspicious: this.isSuspicious(),
      isHighRisk: this.isHighRisk(),
      isCriticalRisk: this.isCriticalRisk(),
      wasSuccessful: this.wasSuccessful(),
      minutesSinceAttempt: this.getMinutesSinceAttempt(),
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

export type { LoginAttemptMetadata };
