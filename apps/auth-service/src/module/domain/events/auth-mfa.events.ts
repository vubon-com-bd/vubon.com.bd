/**
 * Auth MFA Domain Events
 * @module auth-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { UserId, Timestamp } from '@vubon/shared-types/common';

type EventMeta = {
  correlationId?: string;
  causationId?: string;
  userId?: string;
  source?: string;
};

const AGG = 'AuthMfa';

export class MfaEnabledEvent extends BaseDomainEvent<
  'auth.mfa.enabled',
  { userId: UserId; type: string }
> {
  constructor(
    aggregateId: UserId,
    payload: { userId: UserId; type: string },
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-mfa-on-${Date.now()}`,
      type: 'auth.mfa.enabled',
      aggregateId,
      aggregateType: AGG,
      payload,
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class MfaDisabledEvent extends BaseDomainEvent<
  'auth.mfa.disabled',
  { userId: UserId }
> {
  constructor(
    aggregateId: UserId,
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-mfa-off-${Date.now()}`,
      type: 'auth.mfa.disabled',
      aggregateId,
      aggregateType: AGG,
      payload: { userId: aggregateId },
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class MfaVerifiedEvent extends BaseDomainEvent<
  'auth.mfa.verified',
  { userId: UserId; type: string; success: boolean }
> {
  constructor(
    aggregateId: UserId,
    payload: { userId: UserId; type: string; success: boolean },
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-mfa-v-${Date.now()}`,
      type: 'auth.mfa.verified',
      aggregateId,
      aggregateType: AGG,
      payload,
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export type AuthMfaDomainEvent =
  | MfaEnabledEvent
  | MfaDisabledEvent
  | MfaVerifiedEvent;
