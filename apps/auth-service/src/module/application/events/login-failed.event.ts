/**
 * Login Failed Event - Pure Domain/Application Event
 * 
 * @module application/events/login-failed.event
 * 
 * @description
 * Event emitted when a user login attempt fails.
 * Used for security monitoring, audit logging, and account lockout.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Version for schema evolution
 */

import { randomUUID } from 'crypto';

/**
 * Base Domain Event Interface
 */
export interface DomainEvent {
  readonly eventId: string;
  readonly eventName: string;
  readonly occurredAt: Date;
  readonly version: number;
  readonly correlationId ? : string;
  readonly causationId ? : string;
}

/**
 * Login Failed Event
 * 
 * Emitted when a login attempt fails due to:
 * - Invalid credentials
 * - Account locked
 * - Account suspended
 * - Rate limit exceeded
 * - Suspicious activity detected
 * 
 * @example
 * const event = new LoginFailedEvent(
 *   'user@example.com',
 *   '192.168.1.100',
 *   'INVALID_PASSWORD',
 *   'req_abc123',
 *   { deviceId: 'device_123', userAgent: 'Mozilla/5.0' }
 * );
 */
export class LoginFailedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'user.login_failed';
  public readonly occurredAt: Date;
  public readonly version: number = 1;
  
  // Event-specific properties
  public readonly email: string;
  public readonly ipAddress: string;
  public readonly reason: LoginFailureReason;
  public readonly userId ? : string;
  public readonly correlationId ? : string;
  public readonly causationId ? : string;
  public readonly metadata ? : Record < string, unknown > ;
  
  constructor(
    email: string,
    ipAddress: string,
    reason: LoginFailureReason,
    correlationId ? : string,
    causationId ? : string,
    userId ? : string,
    metadata ? : Record < string, unknown >
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.email = email;
    this.ipAddress = ipAddress;
    this.reason = reason;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.userId = userId;
    this.metadata = metadata;
  }
}

/**
 * Login Failure Reason Enum
 * Standardized failure reasons for better analytics
 */
export enum LoginFailureReason {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
    ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED',
    ACCOUNT_INACTIVE = 'ACCOUNT_INACTIVE',
    RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
    SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
    IP_BLOCKED = 'IP_BLOCKED',
    MFA_REQUIRED = 'MFA_REQUIRED',
    MFA_FAILED = 'MFA_FAILED',
    PASSWORD_EXPIRED = 'PASSWORD_EXPIRED',
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',
    TOKEN_INVALID = 'TOKEN_INVALID',
}
