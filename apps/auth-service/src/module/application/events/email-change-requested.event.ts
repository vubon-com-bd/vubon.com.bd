/**
 * Email Change Requested Event
 * 
 * @module application/events/email-change-requested.event
 * 
 * @description
 * Event emitted when a user requests to change their email address.
 * Used for audit logging, security monitoring, and notification triggers.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Version for schema evolution
 */

import { randomUUID } from 'crypto';

// ============================================================
// Base Domain Event Interface
// ============================================================

export interface DomainEvent {
  readonly eventId: string;
  readonly eventName: string;
  readonly occurredAt: Date;
  readonly version: number;
  readonly correlationId ? : string;
  readonly causationId ? : string;
  readonly aggregateId ? : string;
}

// ============================================================
// Email Change Requested Event
// ============================================================

export class EmailChangeRequestedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'user.email_change_requested';
  public readonly occurredAt: Date;
  public readonly version: number = 1;
  
  // Event-specific properties
  public readonly userId: string;
  public readonly oldEmail: string;
  public readonly newEmail: string;
  public readonly oldEmailMasked: string;
  public readonly newEmailMasked: string;
  public readonly verificationToken: string;
  public readonly requestSource: EmailChangeRequestSource;
  public readonly status: EmailChangeRequestStatus;
  public readonly expiresAt: Date;
  public readonly expiresInHours: number;
  
  // Security context
  public readonly ipAddress ? : string;
  public readonly userAgent ? : string;
  public readonly deviceId ? : string;
  public readonly correlationId ? : string;
  public readonly causationId ? : string;
  
  // Metadata
  public readonly metadata ? : Record < string, unknown > ;
  
  constructor(
    userId: string,
    oldEmail: string,
    newEmail: string,
    verificationToken: string,
    requestSource: EmailChangeRequestSource,
    correlationId ? : string,
    causationId ? : string,
    ipAddress ? : string,
    deviceId ? : string,
    userAgent ? : string,
    expiresInHours: number = 24,
    metadata ? : Record < string, unknown > ,
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.oldEmail = oldEmail;
    this.newEmail = newEmail;
    this.oldEmailMasked = this.maskEmail(oldEmail);
    this.newEmailMasked = this.maskEmail(newEmail);
    this.verificationToken = verificationToken;
    this.requestSource = requestSource;
    this.status = EmailChangeRequestStatus.PENDING;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.userAgent = userAgent;
    this.expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);
    this.expiresInHours = expiresInHours;
    this.metadata = metadata;
  }
  
  /**
   * Mask email for privacy
   */
  private maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (!local || !domain) return email;
    const maskedLocal = local.length <= 2 ?
      local[0] + '***' :
      local[0] + '***' + local[local.length - 1];
    return `${maskedLocal}@${domain}`;
  }
  
  /**
   * Check if event has expired
   */
  public isExpired(): boolean {
    return new Date() > this.expiresAt;
  }
  
  /**
   * Get remaining time in seconds
   */
  public getRemainingTimeSeconds(): number {
    if (this.isExpired()) return 0;
    const remaining = this.expiresAt.getTime() - Date.now();
    return Math.max(0, Math.ceil(remaining / 1000));
  }
  
  /**
   * Get remaining time formatted
   */
  public getRemainingTimeFormatted(): string {
    const seconds = this.getRemainingTimeSeconds();
    if (seconds <= 0) return 'Expired';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }
}

// ============================================================
// Enums
// ============================================================

export enum EmailChangeRequestSource {
  USER = 'USER', // User initiated from profile
    ADMIN = 'ADMIN', // Admin initiated
    SECURITY = 'SECURITY', // Security prompted (suspicious activity)
    SUPPORT = 'SUPPORT', // Support team initiated
}

export enum EmailChangeRequestStatus {
  PENDING = 'PENDING', // Verification pending
    VERIFIED = 'VERIFIED', // Verified and changed
    EXPIRED = 'EXPIRED', // Verification expired
    CANCELLED = 'CANCELLED', // Cancelled by user
    REJECTED = 'REJECTED', // Rejected by security
}

// ============================================================
// Email Change Verified Event
// ============================================================

export class EmailChangeVerifiedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.email_change_verified';
  public readonly occurredAt: Date;
  public readonly version: number = 1;
  
  public readonly userId: string;
  public readonly oldEmail: string;
  public readonly newEmail: string;
  public readonly verificationTimeSeconds: number;
  public readonly correlationId ? : string;
  public readonly ipAddress ? : string;
  public readonly deviceId ? : string;
  
  constructor(
    userId: string,
    oldEmail: string,
    newEmail: string,
    verificationTimeSeconds: number,
    correlationId ? : string,
    ipAddress ? : string,
    deviceId ? : string,
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.oldEmail = oldEmail;
    this.newEmail = newEmail;
    this.verificationTimeSeconds = verificationTimeSeconds;
    this.correlationId = correlationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
  }
}

// ============================================================
// Email Change Cancelled Event
// ============================================================

export class EmailChangeCancelledEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.email_change_cancelled';
  public readonly occurredAt: Date;
  public readonly version: number = 1;
  
  public readonly userId: string;
  public readonly oldEmail: string;
  public readonly newEmail: string;
  public readonly reason ? : string;
  public readonly correlationId ? : string;
  
  constructor(
    userId: string,
    oldEmail: string,
    newEmail: string,
    reason ? : string,
    correlationId ? : string,
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.oldEmail = oldEmail;
    this.newEmail = newEmail;
    this.reason = reason;
    this.correlationId = correlationId;
  }
}
