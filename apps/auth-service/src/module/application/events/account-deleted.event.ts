/**
 * Account Deleted Event
 * 
 * @module application/events/account-deleted.event
 * 
 * @description
 * Event emitted when a user account is deleted (soft delete).
 * Used for audit logging, compliance, and post-deletion workflows.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ GDPR compliance tracking
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
  readonly correlationId?: string;
  readonly causationId?: string;
}

// ============================================================
// Account Deleted Event
// ============================================================

export class AccountDeletedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.account_deleted';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Core event data
  public readonly userId: string;
  public readonly email: string;
  public readonly deletedAt: Date;
  
  // Deletion context
  public readonly reason?: string;
  public readonly deletedBy?: string;  // Admin ID if deleted by admin
  public readonly deletedByType: 'user' | 'admin' | 'system';
  
  // Security context
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  
  // GDPR compliance
  public readonly dataRetentionDays: number;
  public readonly cancellationWindowDays: number;
  public readonly anonymizedAt?: Date;
  
  // Additional metadata
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    email: string,
    correlationId?: string,
    causationId?: string,
    reason?: string,
    deletedBy?: string,
    ipAddress?: string,
    deviceId?: string,
    userAgent?: string,
    dataRetentionDays: number = 30,
    cancellationWindowDays: number = 7,
    metadata?: Record<string, unknown>,
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.deletedAt = new Date();
    this.userId = userId;
    this.email = email;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.reason = reason;
    this.deletedBy = deletedBy;
    this.deletedByType = deletedBy ? (deletedBy === userId ? 'user' : 'admin') : 'user';
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.userAgent = userAgent;
    this.dataRetentionDays = dataRetentionDays;
    this.cancellationWindowDays = cancellationWindowDays;
    this.metadata = metadata;
  }

  /**
   * Check if deletion can be cancelled (within cancellation window)
   */
  public canCancel(): boolean {
    const daysSinceDeletion = (Date.now() - this.deletedAt.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceDeletion < this.cancellationWindowDays;
  }

  /**
   * Get remaining days to cancel deletion
   */
  public getRemainingCancellationDays(): number {
    if (!this.canCancel()) return 0;
    const daysSinceDeletion = (Date.now() - this.deletedAt.getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.ceil(this.cancellationWindowDays - daysSinceDeletion));
  }

  /**
   * Get days until permanent deletion
   */
  public getDaysUntilPermanentDeletion(): number {
    const daysSinceDeletion = (Date.now() - this.deletedAt.getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.ceil(this.dataRetentionDays - daysSinceDeletion));
  }

  /**
   * Check if deletion is permanent (data already purged)
   */
  public isPermanent(): boolean {
    const daysSinceDeletion = (Date.now() - this.deletedAt.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceDeletion >= this.dataRetentionDays;
  }
}

// ============================================================
// Account Deleted Event Data Interface
// ============================================================

export interface AccountDeletedEventData {
  userId: string;
  email: string;
  deletedAt: string;
  reason?: string;
  deletedBy?: string;
  deletedByType: 'user' | 'admin' | 'system';
  ipAddress?: string;
  deviceId?: string;
  userAgent?: string;
  correlationId?: string;
  causationId?: string;
  dataRetentionDays: number;
  cancellationWindowDays: number;
  canCancel: boolean;
  remainingCancellationDays: number;
  daysUntilPermanentDeletion: number;
  isPermanent: boolean;
  metadata?: Record<string, unknown>;
}

// ============================================================
// Account Restored Event (for account recovery)
// ============================================================

export class AccountRestoredEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.account_restored';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly email: string;
  public readonly restoredAt: Date;
  public readonly restoredBy?: string;
  public readonly restoredByType: 'user' | 'admin';
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly correlationId?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    email: string,
    correlationId?: string,
    restoredBy?: string,
    ipAddress?: string,
    deviceId?: string,
    userAgent?: string,
    metadata?: Record<string, unknown>,
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.restoredAt = new Date();
    this.userId = userId;
    this.email = email;
    this.correlationId = correlationId;
    this.restoredBy = restoredBy;
    this.restoredByType = restoredBy === userId ? 'user' : 'admin';
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.userAgent = userAgent;
    this.metadata = metadata;
  }
}

// ============================================================
// Account PermanentlyDeleted Event
// ============================================================

export class AccountPermanentlyDeletedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.account_permanently_deleted';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly email: string;
  public readonly deletedAt: Date;
  public readonly retentionDays: number;
  public readonly deletedBy?: string;
  public readonly correlationId?: string;

  constructor(
    userId: string,
    email: string,
    retentionDays: number,
    correlationId?: string,
    deletedBy?: string,
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.deletedAt = new Date();
    this.userId = userId;
    this.email = email;
    this.retentionDays = retentionDays;
    this.correlationId = correlationId;
    this.deletedBy = deletedBy;
  }
}
