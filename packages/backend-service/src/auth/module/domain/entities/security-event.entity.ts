// packages/backend-service/src/auth/module/domain/entities/security-event.entity.ts

// ✅ Shared packages
import type { SecurityEventType } from '@vubon/shared-types';

// ✅ Relative paths
import { BaseEntity } from './base.entity';
import type { UserId } from '../value-objects/user-id.vo';
import type { IpAddress } from '../value-objects/ip-address.vo';
import type { UserAgent } from '../value-objects/user-agent.vo';

/**
 * Security Event Entity
 * Represents a security-related event in the system
 * Used for audit logging, security monitoring, and threat detection
 */
export class SecurityEvent extends BaseEntity {
  private _userId: UserId | null;
  private _eventType: SecurityEventType;
  private _severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  private _ipAddress: IpAddress;
  private _userAgent: UserAgent;
  private _timestamp: Date;
  private _details: Record<string, unknown>;
  private _sessionId: string | null;
  private _deviceId: string | null;
  private _source: 'api' | 'web' | 'cli' | 'system' | 'mobile';

  private constructor(
    id: string,
    userId: UserId | null,
    eventType: SecurityEventType,
    severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL',
    ipAddress: IpAddress,
    userAgent: UserAgent,
    timestamp: Date,
    details: Record<string, unknown> = {},
    sessionId: string | null = null,
    deviceId: string | null = null,
    source: 'api' | 'web' | 'cli' | 'system' | 'mobile' = 'web',
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._eventType = eventType;
    this._severity = severity;
    this._ipAddress = ipAddress;
    this._userAgent = userAgent;
    this._timestamp = timestamp;
    this._details = details;
    this._sessionId = sessionId;
    this._deviceId = deviceId;
    this._source = source;
  }

  /**
   * Create a new security event
   */
  static create(
    id: string,
    eventType: SecurityEventType,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL' = 'INFO',
    userId: UserId | null = null,
    details: Record<string, unknown> = {},
    sessionId: string | null = null,
    deviceId: string | null = null,
    source: 'api' | 'web' | 'cli' | 'system' | 'mobile' = 'web'
  ): SecurityEvent {
    const now = new Date();
    return new SecurityEvent(
      id,
      userId,
      eventType,
      severity,
      ipAddress,
      userAgent,
      now,
      details,
      sessionId,
      deviceId,
      source,
      now,
      now
    );
  }

  /**
   * Reconstruct a security event from persistence
   */
  static reconstruct(
    id: string,
    userId: UserId | null,
    eventType: SecurityEventType,
    severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL',
    ipAddress: IpAddress,
    userAgent: UserAgent,
    timestamp: Date,
    details: Record<string, unknown> = {},
    sessionId: string | null = null,
    deviceId: string | null = null,
    source: 'api' | 'web' | 'cli' | 'system' | 'mobile' = 'web',
    createdAt?: Date,
    updatedAt?: Date
  ): SecurityEvent {
    return new SecurityEvent(
      id,
      userId,
      eventType,
      severity,
      ipAddress,
      userAgent,
      timestamp,
      details,
      sessionId,
      deviceId,
      source,
      createdAt,
      updatedAt
    );
  }

  // ──────────────────────────────────────
  // Getters
  // ──────────────────────────────────────

  get userId(): UserId | null {
    return this._userId;
  }

  get eventType(): SecurityEventType {
    return this._eventType;
  }

  get severity(): 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL' {
    return this._severity;
  }

  get ipAddress(): IpAddress {
    return this._ipAddress;
  }

  get userAgent(): UserAgent {
    return this._userAgent;
  }

  get timestamp(): Date {
    return new Date(this._timestamp);
  }

  get details(): Record<string, unknown> {
    return { ...this._details };
  }

  get sessionId(): string | null {
    return this._sessionId;
  }

  get deviceId(): string | null {
    return this._deviceId;
  }

  get source(): 'api' | 'web' | 'cli' | 'system' | 'mobile' {
    return this._source;
  }

  /**
   * Get the event type label
   */
  getEventTypeLabel(): string {
    const typeLabels: Record<SecurityEventType, string> = {
      LOGIN_SUCCESS: 'Login Success',
      LOGIN_FAILURE: 'Login Failure',
      ACCOUNT_LOCKED: 'Account Locked',
      ACCOUNT_UNLOCKED: 'Account Unlocked',
      PASSWORD_CHANGED: 'Password Changed',
      PASSWORD_RESET_REQUESTED: 'Password Reset Requested',
      PASSWORD_RESET_COMPLETED: 'Password Reset Completed',
      EMAIL_CHANGED: 'Email Changed',
      MFA_ENABLED: 'MFA Enabled',
      MFA_DISABLED: 'MFA Disabled',
      MFA_VERIFIED: 'MFA Verified',
      MFA_FAILED: 'MFA Failed',
      SUSPICIOUS_ACTIVITY: 'Suspicious Activity',
      IP_BLOCKED: 'IP Blocked',
      IP_UNBLOCKED: 'IP Unblocked',
      DEVICE_TRUSTED: 'Device Trusted',
      DEVICE_UNTRUSTED: 'Device Untrusted',
      SESSION_REVOKED: 'Session Revoked',
      SESSION_TERMINATED: 'Session Terminated',
      ADMIN_ACTION: 'Admin Action',
    };
    return typeLabels[this._eventType] || this._eventType;
  }

  /**
   * Get the severity label
   */
  getSeverityLabel(): string {
    const severityLabels: Record<'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL', string> = {
      INFO: 'Information',
      WARNING: 'Warning',
      ERROR: 'Error',
      CRITICAL: 'Critical',
    };
    return severityLabels[this._severity] || this._severity;
  }

  /**
   * Get the source label
   */
  getSourceLabel(): string {
    const sourceLabels: Record<'api' | 'web' | 'cli' | 'system' | 'mobile', string> = {
      api: 'API',
      web: 'Web',
      cli: 'CLI',
      system: 'System',
      mobile: 'Mobile',
    };
    return sourceLabels[this._source] || this._source;
  }

  /**
   * Check if the event is a critical security event
   */
  isCritical(): boolean {
    return this._severity === 'CRITICAL';
  }

  /**
   * Check if the event is related to authentication
   */
  isAuthEvent(): boolean {
    const authEvents: SecurityEventType[] = [
      'LOGIN_SUCCESS',
      'LOGIN_FAILURE',
      'PASSWORD_CHANGED',
      'PASSWORD_RESET_REQUESTED',
      'PASSWORD_RESET_COMPLETED',
      'MFA_ENABLED',
      'MFA_DISABLED',
      'MFA_VERIFIED',
      'MFA_FAILED',
    ];
    return authEvents.includes(this._eventType);
  }

  /**
   * Check if the event is related to account management
   */
  isAccountEvent(): boolean {
    const accountEvents: SecurityEventType[] = [
      'ACCOUNT_LOCKED',
      'ACCOUNT_UNLOCKED',
      'EMAIL_CHANGED',
    ];
    return accountEvents.includes(this._eventType);
  }

  /**
   * Get a specific detail value
   */
  getDetail<T = unknown>(key: string): T | undefined {
    return this._details[key] as T;
  }

  /**
   * Get security event summary
   */
  getSummary(): {
    id: string;
    userId: string | null;
    eventType: SecurityEventType;
    eventTypeLabel: string;
    severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
    severityLabel: string;
    ipAddress: string;
    userAgent: string;
    timestamp: Date;
    source: 'api' | 'web' | 'cli' | 'system' | 'mobile';
    sourceLabel: string;
    sessionId: string | null;
    deviceId: string | null;
    isCritical: boolean;
    isAuthEvent: boolean;
    isAccountEvent: boolean;
    details: Record<string, unknown>;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      userId: this._userId ? this._userId.value : null,
      eventType: this._eventType,
      eventTypeLabel: this.getEventTypeLabel(),
      severity: this._severity,
      severityLabel: this.getSeverityLabel(),
      ipAddress: this._ipAddress.getValue(),
      userAgent: this._userAgent.getValue(),
      timestamp: this._timestamp,
      source: this._source,
      sourceLabel: this.getSourceLabel(),
      sessionId: this._sessionId,
      deviceId: this._deviceId,
      isCritical: this.isCritical(),
      isAuthEvent: this.isAuthEvent(),
      isAccountEvent: this.isAccountEvent(),
      details: this._details,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Compare two SecurityEvent entities
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
   * Get string representation
   */
  toString(): string {
    return `SecurityEvent(id=${this.id}, userId=${this._userId ? this._userId.value : 'null'}, eventType=${this._eventType}, timestamp=${this._timestamp.toISOString()})`;
  }
}
