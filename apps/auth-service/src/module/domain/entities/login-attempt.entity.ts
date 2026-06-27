/**
 * Login Attempt Entity - Pure Domain Core (Enterprise Enhanced)
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
 * ✅ Enterprise Enhanced: Shared constants for risk thresholds
 * ✅ MFA method tracking for audit trail
 * ✅ Risk score history for escalation detection
 * 
 * IMPORTANT: VPN/Proxy detection is infrastructure concern.
 * Risk score should be calculated by infrastructure services
 * (IP2Location, MaxMind, etc.) and passed to domain entity.
 */

import { BaseEntity, ValidationResult, EntityValidationError, type IdGenerator } from './base.entity';
import { Email } from '../value-objects/email.vo';
import { IpAddress } from '../value-objects/ip-address.vo';
import { UserAgent } from '../value-objects/user-agent.vo';
import { DeviceId } from '../value-objects/device-id.vo';

// ✅ ENTERPRISE ENHANCEMENT: Import from shared-constants (Single Source of Truth)
import { RISK_THRESHOLDS } from '@vubon/shared-constants';

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
 * MFA method types for tracking
 */
export type MFAMethod = 'totp' | 'sms' | 'email' | 'whatsapp' | 'imo' | 'bkash_pin' | 'nagad_pin' | 'rocket_pin' | 'voice_call' | 'none';

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
  RISK_ESCALATED = 'login_attempt.risk_escalated',
  MFA_VERIFIED = 'login_attempt.mfa_verified',
  MFA_FAILED_VERIFICATION = 'login_attempt.mfa_failed',
}

// ==================== Types ====================

/**
 * Login attempt metadata interface (Bangladesh specific)
 */
export interface LoginAttemptMetadata {
  location?: {
    country?: string;
    city?: string;
    district?: string;
    upazila?: string;
    latitude?: number;
    longitude?: number;
  };
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  isWeekend?: boolean;
  isNightTime?: boolean;
  attemptedViaMFS?: boolean;
  dataSaverEnabled?: boolean;
}

// ==================== Constants from Shared Config ====================

// Use configuration from shared-constants (Single Source of Truth)
const {
  HIGH_RISK_THRESHOLD,
  CRITICAL_RISK_THRESHOLD,
  MEDIUM_RISK_THRESHOLD,
  MAX_RISK_SCORE,
  MIN_RISK_SCORE,
} = RISK_THRESHOLDS;

const SUSPICIOUS_ACTIVITY_COOLDOWN_MINUTES = 5;
const MAX_RISK_ESCALATIONS_PER_HOUR = 3;

// ==================== Login Attempt Entity ====================

/**
 * Login Attempt Entity
 * 
 * Records login attempts with risk scoring for security monitoring
 * ✅ ENTERPRISE ENHANCED: Risk history tracking, MFA method tracking
 */
export class LoginAttempt extends BaseEntity {
  private _userId: string | undefined;  // ✅ undefined allowed
  private _email: Email;
  private _ipAddress: IpAddress;
  private _userAgent: UserAgent;
  private _deviceId: DeviceId;
  private _result: LoginResult;
  private _attemptedAt: Date;
  private _riskScore: number;
  private _riskLevel: RiskLevel;
  private _failureReason: string | undefined;  // ✅ undefined allowed
  private _attemptMetadata: LoginAttemptMetadata | undefined;
  private _isMfaVerified: boolean;
  private _sessionId: string | undefined;  // ✅ undefined allowed
  
  // ✅ ENTERPRISE ENHANCEMENT: Track MFA method used
  private _mfaMethodUsed: MFAMethod | undefined;  // ✅ undefined allowed
  
  // ✅ ENTERPRISE ENHANCEMENT: Track risk history for escalation detection
  private _riskHistory: Array<{
    score: number;
    level: RiskLevel;
    timestamp: Date;
  }> = [];
  
  // ✅ ENTERPRISE ENHANCEMENT: Track number of risk escalations
  private _riskEscalationCount: number = 0;
  
  // ✅ ENTERPRISE ENHANCEMENT: Track last suspicious activity
  private _lastSuspiciousActivityAt: Date | undefined;  // ✅ undefined allowed

  private constructor(
    id: string,
    userId: string | undefined,  // ✅ undefined allowed
    email: Email,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    deviceId: DeviceId,
    result: LoginResult,
    attemptedAt: Date,
    riskScore: number,
    riskLevel: RiskLevel,
    failureReason: string | undefined,  // ✅ undefined allowed
    metadata: LoginAttemptMetadata | undefined,  // ✅ undefined allowed
    isMfaVerified: boolean,
    sessionId: string | undefined,  // ✅ undefined allowed
    mfaMethodUsed: MFAMethod | undefined,  // ✅ undefined allowed
    riskHistory: Array<{ score: number; level: RiskLevel; timestamp: Date }>,
    riskEscalationCount: number,
    lastSuspiciousActivityAt: Date | undefined,  // ✅ undefined allowed
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
    this._attemptMetadata = metadata;
    this._isMfaVerified = isMfaVerified;
    this._sessionId = sessionId;
    this._mfaMethodUsed = mfaMethodUsed;
    this._riskHistory = riskHistory;
    this._riskEscalationCount = riskEscalationCount;
    this._lastSuspiciousActivityAt = lastSuspiciousActivityAt;
    
    // ✅ Call validate and handle the result
    const validationResult = this.validate();
    if (!validationResult.isValid) {
      throw new EntityValidationError(
        'Login attempt validation failed',
        validationResult.errors,
        this.constructor.name
      );
    }
  }

  /**
   * ✅ FIXED: Validate entity invariants - returns ValidationResult
   */
  protected validate(): ValidationResult {
    const errors: string[] = [];
    
    if (!this._email) {
      errors.push('Login attempt requires an email');
    }
    if (!this._ipAddress) {
      errors.push('Login attempt requires an IP address');
    }
    if (!this._userAgent) {
      errors.push('Login attempt requires a user agent');
    }
    if (!this._deviceId) {
      errors.push('Login attempt requires a device ID');
    }
    if (this._riskScore < MIN_RISK_SCORE || this._riskScore > MAX_RISK_SCORE) {
      errors.push(`Risk score must be between ${MIN_RISK_SCORE} and ${MAX_RISK_SCORE}`);
    }
    if (this._riskEscalationCount < 0) {
      errors.push('Risk escalation count cannot be negative');
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
      undefined, // mfaMethodUsed
      [], // riskHistory (will add initial entry)
      0, // riskEscalationCount
      undefined, // lastSuspiciousActivityAt
      now,
      now,
      1
    );
    
    // Add initial risk history entry
    attempt._riskHistory.push({
      score: riskScore,
      level: riskLevel,
      timestamp: now,
    });
    
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
    mfaMethodUsed?: MFAMethod;
    riskHistory: Array<{ score: number; level: RiskLevel; timestamp: Date }>;
    riskEscalationCount: number;
    lastSuspiciousActivityAt?: Date;
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
      data.mfaMethodUsed,
      data.riskHistory,
      data.riskEscalationCount,
      data.lastSuspiciousActivityAt,
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
   * ✅ ENTERPRISE ENHANCEMENT: Uses shared constants
   */
  private static calculateRiskLevel(riskScore: number): RiskLevel {
    if (riskScore >= CRITICAL_RISK_THRESHOLD) return RiskLevel.CRITICAL;
    if (riskScore >= HIGH_RISK_THRESHOLD) return RiskLevel.HIGH;
    if (riskScore >= MEDIUM_RISK_THRESHOLD) return RiskLevel.MEDIUM;
    return RiskLevel.LOW;
  }

  /**
   * Check if this attempt is within cooldown period for notifications
   */
  private isWithinCooldown(): boolean {
    if (!this._lastSuspiciousActivityAt) return false;
    const cooldownMs = SUSPICIOUS_ACTIVITY_COOLDOWN_MINUTES * 60 * 1000;
    return (Date.now() - this._lastSuspiciousActivityAt.getTime()) < cooldownMs;
  }

  /**
   * Check if risk escalation rate limit is exceeded
   */
  private hasExceededEscalationRate(): boolean {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentEscalations = this._riskHistory.filter(h => 
      h.timestamp > oneHourAgo && h.level !== this._riskLevel
    ).length;
    return recentEscalations >= MAX_RISK_ESCALATIONS_PER_HOUR;
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
   * ✅ ENTERPRISE ENHANCEMENT: Track which MFA method was used
   */
  public markMfaVerified(method?: MFAMethod): void {
    if (this._isMfaVerified) {
      return;
    }
    this._isMfaVerified = true;
    if (method) {
      this._mfaMethodUsed = method;
    }
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: LoginAttemptEventType.MFA_VERIFIED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        method: method || 'unknown',
      },
    });
  }
  
  /**
   * Mark MFA verification failed
   */
  public markMfaFailed(reason: string): void {
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: LoginAttemptEventType.MFA_FAILED_VERIFICATION,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        reason,
        method: this._mfaMethodUsed,
      },
    });
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
   * Update risk score (for ongoing monitoring)
   * ✅ ENTERPRISE ENHANCEMENT: Track risk history and detect escalations
   */
  public updateRiskScore(newScore: number): void {
    if (newScore < MIN_RISK_SCORE || newScore > MAX_RISK_SCORE) {
      throw new EntityValidationError(`Risk score must be between ${MIN_RISK_SCORE} and ${MAX_RISK_SCORE}`);
    }
    
    const previousRiskLevel = this._riskLevel;
    const previousScore = this._riskScore;
    
    this._riskScore = newScore;
    this._riskLevel = LoginAttempt.calculateRiskLevel(newScore);
    
    // Add to risk history
    this._riskHistory.push({
      score: newScore,
      level: this._riskLevel,
      timestamp: new Date(),
    });
    
    // Trim history to last 100 entries
    if (this._riskHistory.length > 100) {
      this._riskHistory = this._riskHistory.slice(-100);
    }
    
    this.touch();
    
    // ✅ ENTERPRISE ENHANCEMENT: Detect risk escalation
    if (previousRiskLevel !== this._riskLevel && this._riskLevel !== RiskLevel.LOW) {
      this._riskEscalationCount++;
      
      // Check if we should emit risk escalation event
      if (!this.hasExceededEscalationRate()) {
        this.addDomainEvent({
          eventId: generateEventId(),
          eventType: LoginAttemptEventType.RISK_ESCALATED,
          aggregateId: this.id,
          occurredOn: new Date(),
          version: this.version,
          metadata: {
            userId: this._userId,
            previousScore: previousScore,
            newScore: newScore,
            previousLevel: previousRiskLevel,
            newLevel: this._riskLevel,
            escalationCount: this._riskEscalationCount,
            email: this._email.getValue(),
          },
        });
      }
    }
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
   * ✅ ENTERPRISE ENHANCEMENT: Cooldown to prevent notification spam
   */
  public markSuspiciousPattern(reason: string, force: boolean = false): void {
    // Don't emit if within cooldown and not forced
    if (!force && this.isWithinCooldown()) {
      return;
    }
    
    this._lastSuspiciousActivityAt = new Date();
    
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
        ipAddress: this._ipAddress.getValue(),
        deviceId: this._deviceId.getValue(),
        escalationCount: this._riskEscalationCount,
      },
    });
    
    this.touch();
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
  
  /**
   * Get the MFA method used (if any)
   */
  public getMfaMethodUsed(): MFAMethod | undefined {
    return this._mfaMethodUsed;
  }
  
  /**
   * Get risk history
   */
  public getRiskHistory(): ReadonlyArray<{ score: number; level: RiskLevel; timestamp: Date }> {
    return [...this._riskHistory];
  }
  
  /**
   * Get risk escalation count
   */
  public getRiskEscalationCount(): number {
    return this._riskEscalationCount;
  }
  
  /**
   * Check if this attempt had a risk escalation
   */
  public hadRiskEscalation(): boolean {
    return this._riskEscalationCount > 0;
  }
  
 /**
 * Get the highest risk level observed in history
 */
public getHighestRiskLevel(): RiskLevel {
  // ✅ সরাসরি RiskLevel.CRITICAL চেক করুন
  for (const entry of this._riskHistory) {
    if (entry.level === RiskLevel.CRITICAL) {
      return RiskLevel.CRITICAL;
    }
  }
  
  // ✅ HIGH চেক করুন
  for (const entry of this._riskHistory) {
    if (entry.level === RiskLevel.HIGH) {
      return RiskLevel.HIGH;
    }
  }
  
  // ✅ MEDIUM চেক করুন
  for (const entry of this._riskHistory) {
    if (entry.level === RiskLevel.MEDIUM) {
      return RiskLevel.MEDIUM;
    }
  }
  
  // ✅ কোনো HIGH/CRITICAL/MEDIUM না পেলে LOW
  return RiskLevel.LOW;
}
  
  /**
   * Get the risk score trend (increasing/decreasing/stable)
   */
  public getRiskTrend(): 'increasing' | 'decreasing' | 'stable' {
    if (this._riskHistory.length < 2) return 'stable';
    
    const firstScore = this._riskHistory[0]?.score ?? 0;
    const lastScore = this._riskHistory[this._riskHistory.length - 1]?.score ?? 0;
    const threshold = 10; // 10 point difference to consider a trend
    
    if (lastScore > firstScore + threshold) return 'increasing';
    if (lastScore < firstScore - threshold) return 'decreasing';
    return 'stable';
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
  public getMetadata(): Readonly<LoginAttemptMetadata> | undefined { return this._attemptMetadata; }
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
      metadata: this._attemptMetadata,
      isMfaVerified: this._isMfaVerified,
      sessionId: this._sessionId,
      mfaMethodUsed: this._mfaMethodUsed,
      isSuspicious: this.isSuspicious(),
      isHighRisk: this.isHighRisk(),
      isCriticalRisk: this.isCriticalRisk(),
      wasSuccessful: this.wasSuccessful(),
      minutesSinceAttempt: this.getMinutesSinceAttempt(),
      riskEscalationCount: this._riskEscalationCount,
      hadRiskEscalation: this.hadRiskEscalation(),
      highestRiskLevel: this.getHighestRiskLevel(),
      riskTrend: this.getRiskTrend(),
      // Risk history is included for debugging but truncated for performance
      riskHistoryLength: this._riskHistory.length,
      lastSuspiciousActivityAt: this._lastSuspiciousActivityAt?.toISOString(),
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
