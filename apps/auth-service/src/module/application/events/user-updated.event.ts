/**
 * User Updated Event
 * 
 * @module application/events/user-updated.event
 * 
 * @description
 * Event emitted when a user's profile is updated.
 * Used for audit logging, cache invalidation, and downstream services.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Tracks which fields changed
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
}

// ============================================================
// Change Detail Interface
// ============================================================

export interface ChangeDetail {
  field: string;
  oldValue: any;
  newValue: any;
}

// ============================================================
// User Updated Event
// ============================================================

export class UserUpdatedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.updated';
  public readonly occurredAt: Date;
  public readonly version: number = 1;
  
  public readonly userId: string;
  public readonly changedFields: string[];
  public readonly changes ? : ChangeDetail[];
  public readonly deviceId ? : string;
  public readonly ipAddress ? : string;
  public readonly userAgent ? : string;
  public readonly correlationId ? : string;
  public readonly causationId ? : string;
  public readonly metadata ? : Record < string, unknown > ;
  
  constructor(
    userId: string,
    changedFields: string[],
    correlationId ? : string,
    causationId ? : string,
    deviceId ? : string,
    ipAddress ? : string,
    userAgent ? : string,
    changes ? : ChangeDetail[],
    metadata ? : Record < string, unknown > ,
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.changedFields = changedFields;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.deviceId = deviceId;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.changes = changes;
    this.metadata = metadata;
  }
  
  /**
   * Check if a specific field was updated
   */
  public hasFieldChanged(field: string): boolean {
    return this.changedFields.includes(field);
  }
  
  /**
   * Get the old value for a changed field (if changes provided)
   */
  public getOldValue(field: string): any {
    const change = this.changes?.find(c => c.field === field);
    return change?.oldValue;
  }
  
  /**
   * Get the new value for a changed field (if changes provided)
   */
  public getNewValue(field: string): any {
    const change = this.changes?.find(c => c.field === field);
    return change?.newValue;
  }
  
  /**
   * Get number of fields changed
   */
  public getChangeCount(): number {
    return this.changedFields.length;
  }
}

// ============================================================
// User Profile Updated Event (Specific use case)
// ============================================================

export class UserProfileUpdatedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.profile_updated';
  public readonly occurredAt: Date;
  public readonly version: number = 1;
  
  public readonly userId: string;
  public readonly updatedFields: string[];
  public readonly correlationId ? : string;
  
  constructor(
    userId: string,
    updatedFields: string[],
    correlationId ? : string,
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.updatedFields = updatedFields;
    this.correlationId = correlationId;
  }
}

// ============================================================
// User Avatar Updated Event
// ============================================================

export class UserAvatarUpdatedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.avatar_updated';
  public readonly occurredAt: Date;
  public readonly version: number = 1;
  
  public readonly userId: string;
  public readonly newAvatarUrl: string;
  public readonly oldAvatarUrl ? : string;
  public readonly correlationId ? : string;
  
  constructor(
    userId: string,
    newAvatarUrl: string,
    oldAvatarUrl ? : string,
    correlationId ? : string,
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.newAvatarUrl = newAvatarUrl;
    this.oldAvatarUrl = oldAvatarUrl;
    this.correlationId = correlationId;
  }
}

// ============================================================
// User Preferences Updated Event
// ============================================================

export class UserPreferencesUpdatedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.preferences_updated';
  public readonly occurredAt: Date;
  public readonly version: number = 1;
  
  public readonly userId: string;
  public readonly timezone ? : string;
  public readonly language ? : string;
  public readonly correlationId ? : string;
  
  constructor(
    userId: string,
    correlationId ? : string,
    timezone ? : string,
    language ? : string,
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.correlationId = correlationId;
    this.timezone = timezone;
    this.language = language;
  }
}
