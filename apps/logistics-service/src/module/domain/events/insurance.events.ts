/**
 * Insurance domain events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { INSURANCE_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const INSURANCE_EVENT_TYPE = {
  ISSUED: 'insurance.issued',
  ACTIVATED: 'insurance.activated',
  EXPIRED: 'insurance.expired',
  CANCELLED: 'insurance.cancelled',
  CLAIM_SUBMITTED: 'insurance.claim_submitted',
  CLAIM_UNDER_REVIEW: 'insurance.claim_under_review',
  CLAIM_APPROVED: 'insurance.claim_approved',
  CLAIM_REJECTED: 'insurance.claim_rejected',
  CLAIM_PAID: 'insurance.claim_paid',
  CLAIM_APPEALED: 'insurance.claim_appealed',
} as const;

export interface InsuranceIssuedPayload {
  readonly insuranceId: string;
  readonly policyNumber: string;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly type: string;
  readonly declaredValue: number;
  readonly premium: number;
  readonly currency: string;
}

export interface InsuranceStatusChangedPayload {
  readonly insuranceId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
}

export interface InsuranceClaimStatusChangedPayload {
  readonly insuranceId: string;
  readonly claimId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly amount?: number;
  readonly reason?: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

function buildParams<TType extends string, TPayload>(type: TType, p: EventParams<TPayload>) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: INSURANCE_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class InsuranceIssuedEvent extends BaseDomainEvent<typeof INSURANCE_EVENT_TYPE.ISSUED, InsuranceIssuedPayload> {
  constructor(p: EventParams<InsuranceIssuedPayload>) { super(buildParams(INSURANCE_EVENT_TYPE.ISSUED, p)); }
}
export class InsuranceActivatedEvent extends BaseDomainEvent<typeof INSURANCE_EVENT_TYPE.ACTIVATED, InsuranceStatusChangedPayload> {
  constructor(p: EventParams<InsuranceStatusChangedPayload>) { super(buildParams(INSURANCE_EVENT_TYPE.ACTIVATED, p)); }
}
export class InsuranceExpiredEvent extends BaseDomainEvent<typeof INSURANCE_EVENT_TYPE.EXPIRED, InsuranceStatusChangedPayload> {
  constructor(p: EventParams<InsuranceStatusChangedPayload>) { super(buildParams(INSURANCE_EVENT_TYPE.EXPIRED, p)); }
}
export class InsuranceCancelledEvent extends BaseDomainEvent<typeof INSURANCE_EVENT_TYPE.CANCELLED, InsuranceStatusChangedPayload> {
  constructor(p: EventParams<InsuranceStatusChangedPayload>) { super(buildParams(INSURANCE_EVENT_TYPE.CANCELLED, p)); }
}
export class InsuranceClaimSubmittedEvent extends BaseDomainEvent<typeof INSURANCE_EVENT_TYPE.CLAIM_SUBMITTED, InsuranceClaimStatusChangedPayload> {
  constructor(p: EventParams<InsuranceClaimStatusChangedPayload>) { super(buildParams(INSURANCE_EVENT_TYPE.CLAIM_SUBMITTED, p)); }
}
export class InsuranceClaimUnderReviewEvent extends BaseDomainEvent<typeof INSURANCE_EVENT_TYPE.CLAIM_UNDER_REVIEW, InsuranceClaimStatusChangedPayload> {
  constructor(p: EventParams<InsuranceClaimStatusChangedPayload>) { super(buildParams(INSURANCE_EVENT_TYPE.CLAIM_UNDER_REVIEW, p)); }
}
export class InsuranceClaimApprovedEvent extends BaseDomainEvent<typeof INSURANCE_EVENT_TYPE.CLAIM_APPROVED, InsuranceClaimStatusChangedPayload> {
  constructor(p: EventParams<InsuranceClaimStatusChangedPayload>) { super(buildParams(INSURANCE_EVENT_TYPE.CLAIM_APPROVED, p)); }
}
export class InsuranceClaimRejectedEvent extends BaseDomainEvent<typeof INSURANCE_EVENT_TYPE.CLAIM_REJECTED, InsuranceClaimStatusChangedPayload> {
  constructor(p: EventParams<InsuranceClaimStatusChangedPayload>) { super(buildParams(INSURANCE_EVENT_TYPE.CLAIM_REJECTED, p)); }
}
export class InsuranceClaimPaidEvent extends BaseDomainEvent<typeof INSURANCE_EVENT_TYPE.CLAIM_PAID, InsuranceClaimStatusChangedPayload> {
  constructor(p: EventParams<InsuranceClaimStatusChangedPayload>) { super(buildParams(INSURANCE_EVENT_TYPE.CLAIM_PAID, p)); }
}
export class InsuranceClaimAppealedEvent extends BaseDomainEvent<typeof INSURANCE_EVENT_TYPE.CLAIM_APPEALED, InsuranceClaimStatusChangedPayload> {
  constructor(p: EventParams<InsuranceClaimStatusChangedPayload>) { super(buildParams(INSURANCE_EVENT_TYPE.CLAIM_APPEALED, p)); }
}
