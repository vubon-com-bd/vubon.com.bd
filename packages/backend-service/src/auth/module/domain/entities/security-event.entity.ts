// packages/backend-service/src/auth/module/domain/entities/security-event.entity.ts
import { randomUUID } from 'crypto';
import { BaseEntity } from './base.entity';
import { IpAddress, UserAgent, DeviceId } from '../value-objects';

/**
 * Security event types
 */
export type SecurityEventType =
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILED'
  | 'ACCOUNT_LOCKED'
  | 'ACCOUNT_UNLOCKED'
  | 'ACCOUNT_SUSPENDED'
  | 'ACCOUNT_ACTIVATED'
  | 'ACCOUNT_DEACTIVATED'
  | 'PASSWORD_CHANGED'
  | 'PASSWORD_RESET_REQUESTED'
  | 'PASSWORD_RESET_COMPLETED'
  | 'EMAIL_CHANGED'
  | 'EMAIL_VERIFIED'
  | 'EMAIL_VERIFICATION_FAILED'
  | 'MFA_ENABLED'
  | 'MFA_DISABLED'
  | 'MFA_VERIFIED'
  | 'MFA_FAILED'
  | 'MFA_RECOVERED'
  | 'IP_BLOCKED'
  | 'IP_UNBLOCKED'
  | 'DEVICE_TRUSTED'
  | 'DEVICE_UNTRUSTED'
  | 'DEVICE_BLOCKED'
  | 'SESSION_REVOKED'
  | 'SESSION_EXPIRED'
  | 'SESSION_CREATED'
  | 'SUSPICIOUS_ACTIVITY_DETECTED'
  | 'BRUTE_FORCE_DETECTED'
  | 'RATE_LIMIT_EXCEEDED'
  | 'ADMIN_ACTION'
  | 'ROLE_CHANGED'
  | 'PERMISSION_CHANGED'
  | 'ACCOUNT_COMPROMISED'
  | 'SECURITY_BREACH'
  | 'TWO_FACTOR_ENABLED'
  | 'TWO_FACTOR_DISABLED'
  | 'API_KEY_CREATED'
  | 'API_KEY_REVOKED'
  | 'DATA_EXPORT'
  | 'DATA_IMPORT';

/**
 * Security severity levels
 */
export type SecuritySeverity = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

/**
 * Security Event Entity
 * Represents a security-related event in the system
 * Used for audit trails, real-time monitoring, compliance, and analytics
 */
export class SecurityEvent extends BaseEntity {
  private _userId?: string;
  private _email?: string;
  private _ipAddress?: IpAddress;
  private _userAgent?: UserAgent;
  private _deviceId?: DeviceId;
  private _eventType: SecurityEventType;
  private _severity: SecuritySeverity;
  private _details: string;
  private _metadata: Record<string, unknown>;
  private _occurredAt: Date;
  private _isResolved: boolean;
  private _resolvedAt?: Date;
  private _resolvedBy?: string;
  private _resolutionNote?: string;

  private constructor(
    id: string,
    eventType: SecurityEventType,
    severity: SecuritySeverity,
    details: string,
    occurredAt: Date,
    metadata: Record<string, unknown>,
    isResolved: boolean,
    userId?: string,
    email?: string,
    ipAddress?: IpAddress,
    userAgent?: UserAgent,
    deviceId?: DeviceId,
    resolvedAt?: Date,
    resolvedBy?: string,
    resolutionNote?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._email = email;
    this._ipAddress = ipAddress;
    this._userAgent = userAgent;
    this._deviceId = deviceId;
    this._eventType = eventType;
    this._severity = severity;
    this._details = details;
    this._metadata = metadata;
    this._occurredAt = occurredAt;
    this._isResolved = isResolved;
    this._resolvedAt = resolvedAt;
    this._resolvedBy = resolvedBy;
    this._resolutionNote = resolutionNote;
  }

  /**
   * Static factory method to create a new security event
   */
  static create(
    eventType: SecurityEventType,
    severity: SecuritySeverity,
    details: string,
    metadata: Record<string, unknown> = {},
    userId?: string,
    email?: string,
    ipAddress?: IpAddress,
    userAgent?: UserAgent,
    deviceId?: DeviceId
  ): SecurityEvent {
    if (!eventType || typeof eventType !== 'string') {
      throw new Error('Event type is required');
    }

    if (!severity || typeof severity !== 'string') {
      throw new Error('Severity level is required');
    }

    if (!details || typeof details !== 'string') {
      throw new Error('Event details are required');
    }

    if (details.length > 2000) {
      throw new Error('Event details cannot exceed 2000 characters');
    }

    const now = new Date();

    return new SecurityEvent(
      randomUUID(),
      eventType,
      severity,
      details,
      now,
      { ...metadata },
      false,
      userId,
      email,
      ipAddress,
      userAgent,
      deviceId
    );
  }

  /**
   * Reconstruct a SecurityEvent entity from persistence
   */
  static reconstitute(
    id: string,
    eventType: SecurityEventType,
    severity: SecuritySeverity,
    details: string,
    occurredAt: Date,
    metadata: Record<string, unknown>,
    isResolved: boolean,
    userId?: string,
    email?: string,
    ipAddress?: IpAddress,
    userAgent?: UserAgent,
    deviceId?: DeviceId,
    resolvedAt?: Date,
    resolvedBy?: string,
    resolutionNote?: string,
    createdAt?: Date,
    updatedAt?: Date
  ): SecurityEvent {
    return new SecurityEvent(
      id,
      eventType,
      severity,
      details,
      occurredAt,
      metadata,
      isResolved,
      userId,
      email,
      ipAddress,
      userAgent,
      deviceId,
      resolvedAt,
      resolvedBy,
      resolutionNote,
      createdAt,
      updatedAt
    );
  }

  // ============================================================================
  // Getters
  // ============================================================================

  get userId(): string | undefined {
    return this._userId;
  }

  get email(): string | undefined {
    return this._email;
  }

  get ipAddress(): IpAddress | undefined {
    return this._ipAddress;
  }

  get userAgent(): UserAgent | undefined {
    return this._userAgent;
  }

  get deviceId(): DeviceId | undefined {
    return this._deviceId;
  }

  get eventType(): SecurityEventType {
    return this._eventType;
  }

  get severity(): SecuritySeverity {
    return this._severity;
  }

  get details(): string {
    return this._details;
  }

  get metadata(): Record<string, unknown> {
    return { ...this._metadata };
  }

  get occurredAt(): Date {
    return new Date(this._occurredAt);
  }

  get isResolved(): boolean {
    return this._isResolved;
  }

  get resolvedAt(): Date | undefined {
    return this._resolvedAt ? new Date(this._resolvedAt) : undefined;
  }

  get resolvedBy(): string | undefined {
    return this._resolvedBy;
  }

  get resolutionNote(): string | undefined {
    return this._resolutionNote;
  }

  // ============================================================================
  // Business Logic Methods
  // ============================================================================

  /**
   * Get a human-readable description of the event
   */
  getDescription(): string {
    const descriptions: Record<SecurityEventType, string> = {
      LOGIN_SUCCESS: 'User successfully logged in',
      LOGIN_FAILED: 'User failed to log in',
      ACCOUNT_LOCKED: 'User account was locked',
      ACCOUNT_UNLOCKED: 'User account was unlocked',
      ACCOUNT_SUSPENDED: 'User account was suspended',
      ACCOUNT_ACTIVATED: 'User account was activated',
      ACCOUNT_DEACTIVATED: 'User account was deactivated',
      PASSWORD_CHANGED: 'User changed their password',
      PASSWORD_RESET_REQUESTED: 'Password reset was requested',
      PASSWORD_RESET_COMPLETED: 'Password reset was completed',
      EMAIL_CHANGED: 'User changed their email address',
      EMAIL_VERIFIED: 'Email address was verified',
      EMAIL_VERIFICATION_FAILED: 'Email verification failed',
      MFA_ENABLED: 'Multi-factor authentication was enabled',
      MFA_DISABLED: 'Multi-factor authentication was disabled',
      MFA_VERIFIED: 'Multi-factor authentication was verified',
      MFA_FAILED: 'Multi-factor authentication failed',
      MFA_RECOVERED: 'Multi-factor authentication was recovered',
      IP_BLOCKED: 'IP address was blocked',
      IP_UNBLOCKED: 'IP address was unblocked',
      DEVICE_TRUSTED: 'Device was marked as trusted',
      DEVICE_UNTRUSTED: 'Device was marked as untrusted',
      DEVICE_BLOCKED: 'Device was blocked',
      SESSION_REVOKED: 'Session was revoked',
      SESSION_EXPIRED: 'Session expired',
      SESSION_CREATED: 'New session was created',
      SUSPICIOUS_ACTIVITY_DETECTED: 'Suspicious activity was detected',
      BRUTE_FORCE_DETECTED: 'Brute force attack was detected',
      RATE_LIMIT_EXCEEDED: 'Rate limit was exceeded',
      ADMIN_ACTION: 'Administrator performed an action',
      ROLE_CHANGED: 'User role was changed',
      PERMISSION_CHANGED: 'User permissions were changed',
      ACCOUNT_COMPROMISED: 'Account is potentially compromised',
      SECURITY_BREACH: 'Security breach detected',
      TWO_FACTOR_ENABLED: 'Two-factor authentication was enabled',
      TWO_FACTOR_DISABLED: 'Two-factor authentication was disabled',
      API_KEY_CREATED: 'API key was created',
      API_KEY_REVOKED: 'API key was revoked',
      DATA_EXPORT: 'Data was exported',
      DATA_IMPORT: 'Data was imported',
    };

    return descriptions[this._eventType] || `Security event: ${this._eventType}`;
  }

  /**
   * Check if the event is critical
   */
  isCritical(): boolean {
    return this._severity === 'CRITICAL';
  }

  /**
   * Check if the event is suspicious
   */
  isSuspicious(): boolean {
    const suspiciousEvents: SecurityEventType[] = [
      'LOGIN_FAILED',
      'ACCOUNT_LOCKED',
      'ACCOUNT_SUSPENDED',
      'BRUTE_FORCE_DETECTED',
      'SUSPICIOUS_ACTIVITY_DETECTED',
      'RATE_LIMIT_EXCEEDED',
      'ACCOUNT_COMPROMISED',
      'SECURITY_BREACH',
      'MFA_FAILED',
      'IP_BLOCKED',
      'DEVICE_BLOCKED',
    ];

    return suspiciousEvents.includes(this._eventType);
  }

  /**
   * Check if the event requires immediate attention
   */
  requiresImmediateAttention(): boolean {
    return this.isCritical() || this.isSuspicious();
  }

  /**
   * Resolve the security event
   * @param resolvedBy - Who resolved the event
   * @param resolutionNote - Note about the resolution
   */
  resolve(resolvedBy: string, resolutionNote?: string): void {
    if (this._isResolved) {
      throw new Error('Security event is already resolved');
    }

    this._isResolved = true;
    this._resolvedAt = new Date();
    this._resolvedBy = resolvedBy;
    this._resolutionNote = resolutionNote || 'Event resolved';

    this.touch();
  }

  /**
   * Unresolve the security event (mark as unresolved)
   */
  unresolve(): void {
    if (!this._isResolved) {
      throw new Error('Security event is not resolved');
    }

    this._isResolved = false;
    this._resolvedAt = undefined;
    this._resolvedBy = undefined;
    this._resolutionNote = undefined;

    this.touch();
  }

  /**
   * Update event metadata
   * @param metadata - New metadata to merge
   */
  updateMetadata(metadata: Record<string, unknown>): void {
    this._metadata = { ...this._metadata, ...metadata };
    this.touch();
  }

  /**
   * Get the severity level as a numeric value for sorting
   */
  getSeverityValue(): number {
    const values: Record<SecuritySeverity, number> = {
      INFO: 1,
      WARNING: 2,
      ERROR: 3,
      CRITICAL: 4,
    };

    return values[this._severity] || 0;
  }

  /**
   * Get a summary of the security event
   */
  getSummary(): {
    id: string;
    userId?: string;
    email?: string;
    eventType: SecurityEventType;
    severity: SecuritySeverity;
    severityValue: number;
    details: string;
    occurredAt: Date;
    isCritical: boolean;
    isSuspicious: boolean;
    isResolved: boolean;
    description: string;
    requiresImmediateAttention: boolean;
    ipAddress?: string;
    userAgent?: {
      browser: string;
      os: string;
      deviceType: string;
      isBot: boolean;
    };
    deviceId?: string;
    metadata: Record<string, unknown>;
    resolvedAt?: Date;
    resolvedBy?: string;
    resolutionNote?: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      userId: this._userId,
      email: this._email,
      eventType: this._eventType,
      severity: this._severity,
      severityValue: this.getSeverityValue(),
      details: this._details,
      occurredAt: this._occurredAt,
      isCritical: this.isCritical(),
      isSuspicious: this.isSuspicious(),
      isResolved: this._isResolved,
      description: this.getDescription(),
      requiresImmediateAttention: this.requiresImmediateAttention(),
      ipAddress: this._ipAddress?.getValue(),
      userAgent: this._userAgent
        ? {
            browser: this._userAgent.getBrowser(),
            os: this._userAgent.getOS(),
            deviceType: this._userAgent.getDeviceType(),
            isBot: this._userAgent.isBot(),
          }
        : undefined,
      deviceId: this._deviceId?.getValue(),
      metadata: this._metadata,
      resolvedAt: this._resolvedAt,
      resolvedBy: this._resolvedBy,
      resolutionNote: this._resolutionNote,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Check if two SecurityEvent entities are equal (compare by id)
   */
  equals(other: SecurityEvent | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof SecurityEvent)) {
      return false;
    }

    return this.id === other.id;
  }

  /**
   * Create a deep clone of the SecurityEvent entity
   */
  clone(): SecurityEvent {
    return new SecurityEvent(
      this.id,
      this._eventType,
      this._severity,
      this._details,
      new Date(this._occurredAt),
      { ...this._metadata },
      this._isResolved,
      this._userId,
      this._email,
      this._ipAddress,
      this._userAgent,
      this._deviceId,
      this._resolvedAt ? new Date(this._resolvedAt) : undefined,
      this._resolvedBy,
      this._resolutionNote,
      new Date(this.createdAt),
      new Date(this.updatedAt)
    );
  }
}
