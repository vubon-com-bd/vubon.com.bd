/**
 * MFA Disabled Event - Pure Domain/Application Event
 * 
 * @module application/events/mfa-disabled.event
 * 
 * @description
 * Event emitted when Multi-Factor Authentication is disabled for a user.
 * Used for security monitoring, audit logging, and compliance tracking.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ MFA type and reason tracking
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
  readonly correlationId?: string;
  readonly causationId?: string;
}

/**
 * MFA Type Enum
 */
export enum MFAType {
  TOTP = 'TOTP',
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  WEBAUTHN = 'WEBAUTHN',
}

/**
 * MFA Disable Reason Enum
 */
export enum MFADisableReason {
  USER_DISABLED = 'USER_DISABLED',
  ADMIN_DISABLED = 'ADMIN_DISABLED',
  SECURITY_INCIDENT = 'SECURITY_INCIDENT',
  ACCOUNT_RECOVERY = 'ACCOUNT_RECOVERY',
  DEVICE_LOST = 'DEVICE_LOST',
  PHONE_CHANGED = 'PHONE_CHANGED',
  EMAIL_CHANGED = 'EMAIL_CHANGED',
  SYSTEM_CLEANUP = 'SYSTEM_CLEANUP',
}

/**
 * MFA Disabled Event
 * 
 * Emitted when MFA is disabled for a user
 * 
 * @example
 * // User disables MFA
 * const event = new MfaDisabledEvent(
 *   'usr_123',
 *   MFAType.TOTP,
 *   MFADisableReason.USER_DISABLED,
 *   'req_abc123',
 *   undefined,
 *   undefined,
 *   { deviceId: 'device_123' }
 * );
 * 
 * @example
 * // Admin disables MFA for security incident
 * const event = new MfaDisabledEvent(
 *   'usr_123',
 *   MFAType.SMS,
 *   MFADisableReason.SECURITY_INCIDENT,
 *   'req_abc123',
 *   undefined,
 *   'admin_456',
 *   { reason: 'Suspicious activity detected' }
 * );
 */
export class MfaDisabledEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'user.mfa_disabled';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Event-specific properties
  public readonly userId: string;
  public readonly mfaType: MFAType;
  public readonly reason: MFADisableReason;
  public readonly disabledBy?: string; // userId or adminId
  public readonly disabledByType: 'user' | 'admin' | 'system';
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    mfaType: MFAType,
    reason: MFADisableReason,
    correlationId?: string,
    causationId?: string,
    disabledBy?: string,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.mfaType = mfaType;
    this.reason = reason;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.disabledBy = disabledBy;
    this.metadata = metadata;

    // Determine who disabled MFA
    if (disabledBy && disabledBy !== userId) {
      this.disabledByType = 'admin';
    } else if (disabledBy === userId) {
      this.disabledByType = 'user';
    } else {
      this.disabledByType = 'system';
    }
  }
}

/**
 * MFA Disabled Event Data Interface
 * For event serialization/deserialization
 */
export interface MfaDisabledEventData {
  userId: string;
  mfaType: MFAType;
  reason: MFADisableReason;
  disabledBy?: string;
  disabledByType: 'user' | 'admin' | 'system';
  correlationId?: string;
  causationId?: string;
  metadata?: Record<string, unknown>;
}
