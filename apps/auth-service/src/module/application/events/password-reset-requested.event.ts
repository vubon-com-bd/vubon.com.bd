/**
 * Password Reset Requested Event - Pure Domain/Application Event
 * 
 * @module application/events/password-reset-requested.event
 * 
 * @description
 * Event emitted when a user requests a password reset.
 * Used for audit logging, security monitoring, and analytics.
 * 
 * ENTERPRISE SECURITY NOTE:
 * ⚠️ NEVER include the actual reset token in events!
 * Events are logged, stored, and may be sent to external systems.
 * Only include token hash or reference ID.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Token hash only (no plain text tokens)
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
 * Password Reset Requested Event
 * 
 * Emitted when a user initiates password reset flow
 * 
 * @example
 * const event = new PasswordResetRequestedEvent(
 *   'usr_123',
 *   'user@example.com',
 *   'token_hash_abc123...',
 *   'corr_abc123',
 *   '192.168.1.100',
 *   'device_456',
 *   'Mozilla/5.0...',
 *   new Date(Date.now() + 3600000)
 * );
 */
export class PasswordResetRequestedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'password.reset_requested';
  public readonly occurredAt: Date;
  public readonly version: number = 1;
  
  // Core event data
  public readonly userId: string;
  public readonly email: string;
  
  // Security (hashed token reference, NOT the actual token!)
  public readonly resetTokenHash: string;
  public readonly resetRequestId: string;
  
  // Context
  public readonly correlationId ? : string;
  public readonly causationId ? : string;
  
  // Security context
  public readonly ipAddress ? : string;
  public readonly deviceId ? : string;
  public readonly userAgent ? : string;
  
  // Expiry
  public readonly expiresAt ? : Date;
  
  // Additional metadata
  public readonly metadata ? : Record < string, unknown > ;
  
  constructor(
    userId: string,
    email: string,
    resetTokenHash: string,
    resetRequestId: string,
    correlationId ? : string,
    causationId ? : string,
    ipAddress ? : string,
    deviceId ? : string,
    userAgent ? : string,
    expiresAt ? : Date,
    metadata ? : Record < string, unknown >
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.email = email;
    this.resetTokenHash = resetTokenHash;
    this.resetRequestId = resetRequestId;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.userAgent = userAgent;
    this.expiresAt = expiresAt;
    this.metadata = metadata;
  }
}

/**
 * Password Reset Completed Event
 */
export class PasswordResetCompletedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'password.reset_completed';
  public readonly occurredAt: Date;
  public readonly version: number = 1;
  
  public readonly userId: string;
  public readonly email: string;
  public readonly resetRequestId: string;
  public readonly correlationId ? : string;
  public readonly ipAddress ? : string;
  public readonly deviceId ? : string;
  
  constructor(
    userId: string,
    email: string,
    resetRequestId: string,
    correlationId ? : string,
    ipAddress ? : string,
    deviceId ? : string
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.email = email;
    this.resetRequestId = resetRequestId;
    this.correlationId = correlationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
  }
}

/**
 * Password Reset Failed Event
 */
export class PasswordResetFailedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'password.reset_failed';
  public readonly occurredAt: Date;
  public readonly version: number = 1;
  
  public readonly email: string;
  public readonly reason: string;
  public readonly resetRequestId ? : string;
  public readonly correlationId ? : string;
  public readonly ipAddress ? : string;
  
  constructor(
    email: string,
    reason: string,
    correlationId ? : string,
    resetRequestId ? : string,
    ipAddress ? : string
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.email = email;
    this.reason = reason;
    this.correlationId = correlationId;
    this.resetRequestId = resetRequestId;
    this.ipAddress = ipAddress;
  }
}
