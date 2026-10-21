/**
 * Verification Domain Events
 * @module payment-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PAYMENT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const VERIFICATION_EVENT_TYPE = {
  INITIATED: 'payment.verification.initiated',
  VERIFIED: 'payment.verification.verified',
  FAILED: 'payment.verification.failed',
  EXPIRED: 'payment.verification.expired',
} as const;

export interface VerificationInitiatedPayload {
  readonly verificationId: string;
  readonly paymentId: string;
  readonly method: string;
  readonly expiresAt: string;
  readonly initiatedAt: string;
}

export interface VerificationCompletedPayload {
  readonly verificationId: string;
  readonly paymentId: string;
  readonly method: string;
  readonly attempts: number;
  readonly completedAt: string;
}

export interface VerificationFailedPayload {
  readonly verificationId: string;
  readonly paymentId: string;
  readonly reason: string;
  readonly attempts: number;
  readonly failedAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

function buildParams<TType extends string, TPayload>(
  type: TType,
  p: EventParams<TPayload>,
) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: PAYMENT_AGGREGATE_TYPE.VERIFICATION,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class VerificationInitiatedEvent extends BaseDomainEvent<
  typeof VERIFICATION_EVENT_TYPE.INITIATED,
  VerificationInitiatedPayload
> {
  constructor(p: EventParams<VerificationInitiatedPayload>) {
    super(buildParams(VERIFICATION_EVENT_TYPE.INITIATED, p));
  }
}

export class VerificationVerifiedEvent extends BaseDomainEvent<
  typeof VERIFICATION_EVENT_TYPE.VERIFIED,
  VerificationCompletedPayload
> {
  constructor(p: EventParams<VerificationCompletedPayload>) {
    super(buildParams(VERIFICATION_EVENT_TYPE.VERIFIED, p));
  }
}

export class VerificationFailedEvent extends BaseDomainEvent<
  typeof VERIFICATION_EVENT_TYPE.FAILED,
  VerificationFailedPayload
> {
  constructor(p: EventParams<VerificationFailedPayload>) {
    super(buildParams(VERIFICATION_EVENT_TYPE.FAILED, p));
  }
}

export class VerificationExpiredEvent extends BaseDomainEvent<
  typeof VERIFICATION_EVENT_TYPE.EXPIRED,
  VerificationInitiatedPayload
> {
  constructor(p: EventParams<VerificationInitiatedPayload>) {
    super(buildParams(VERIFICATION_EVENT_TYPE.EXPIRED, p));
  }
}
