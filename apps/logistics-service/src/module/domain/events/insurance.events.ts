/**
 * Insurance Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const INSURANCE_EVENT_TYPE = {
  CREATED: 'logistics.insurance.created',
  ACTIVATED: 'logistics.insurance.activated',
  EXPIRED: 'logistics.insurance.expired',
  CANCELLED: 'logistics.insurance.cancelled',
  CLAIM_SUBMITTED: 'logistics.insurance.claim_submitted',
  CLAIM_REVIEWED: 'logistics.insurance.claim_reviewed',
  CLAIM_APPROVED: 'logistics.insurance.claim_approved',
  CLAIM_REJECTED: 'logistics.insurance.claim_rejected',
  CLAIM_PAID: 'logistics.insurance.claim_paid',
  STATUS_CHANGED: 'logistics.insurance.status_changed',
} as const;

export interface InsuranceCreatedPayload {
  readonly insuranceId: string;
  readonly policyNumber: string;
  readonly type: string;
  readonly declaredValue: number;
  readonly premium: number;
  readonly currency: string;
  readonly createdAt: string;
}
export interface InsuranceActivatedPayload {
  readonly insuranceId: string;
  readonly activatedAt: string;
}
export interface InsuranceExpiredPayload {
  readonly insuranceId: string;
  readonly expiredAt: string;
}
export interface InsuranceCancelledPayload {
  readonly insuranceId: string;
  readonly reason?: string;
  readonly cancelledAt: string;
}
export interface InsuranceClaimSubmittedPayload {
  readonly insuranceId: string;
  readonly claimId: string;
  readonly claimNumber: string;
  readonly amount: number;
  readonly currency: string;
  readonly submittedAt: string;
}
export interface InsuranceClaimReviewedPayload {
  readonly insuranceId: string;
  readonly claimId: string;
  readonly reviewedAt: string;
}
export interface InsuranceClaimApprovedPayload {
  readonly insuranceId: string;
  readonly claimId: string;
  readonly approvedAmount: number;
  readonly currency: string;
  readonly approvedAt: string;
}
export interface InsuranceClaimRejectedPayload {
  readonly insuranceId: string;
  readonly claimId: string;
  readonly reason: string;
  readonly rejectedAt: string;
}
export interface InsuranceClaimPaidPayload {
  readonly insuranceId: string;
  readonly claimId: string;
  readonly paidAmount: number;
  readonly currency: string;
  readonly paidAt: string;
}
export interface InsuranceStatusChangedPayload {
  readonly insuranceId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
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

function buildParams<TType extends string, TPayload>(
  type: TType,
  p: EventParams<TPayload>,
) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: LOGISTICS_AGGREGATE_TYPE.INSURANCE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class InsuranceCreatedEvent extends BaseDomainEvent<
  typeof INSURANCE_EVENT_TYPE.CREATED,
  InsuranceCreatedPayload
> {
  constructor(p: EventParams<InsuranceCreatedPayload>) {
    super(buildParams(INSURANCE_EVENT_TYPE.CREATED, p));
  }
}
export class InsuranceActivatedEvent extends BaseDomainEvent<
  typeof INSURANCE_EVENT_TYPE.ACTIVATED,
  InsuranceActivatedPayload
> {
  constructor(p: EventParams<InsuranceActivatedPayload>) {
    super(buildParams(INSURANCE_EVENT_TYPE.ACTIVATED, p));
  }
}
export class InsuranceExpiredEvent extends BaseDomainEvent<
  typeof INSURANCE_EVENT_TYPE.EXPIRED,
  InsuranceExpiredPayload
> {
  constructor(p: EventParams<InsuranceExpiredPayload>) {
    super(buildParams(INSURANCE_EVENT_TYPE.EXPIRED, p));
  }
}
export class InsuranceCancelledEvent extends BaseDomainEvent<
  typeof INSURANCE_EVENT_TYPE.CANCELLED,
  InsuranceCancelledPayload
> {
  constructor(p: EventParams<InsuranceCancelledPayload>) {
    super(buildParams(INSURANCE_EVENT_TYPE.CANCELLED, p));
  }
}
export class InsuranceClaimSubmittedEvent extends BaseDomainEvent<
  typeof INSURANCE_EVENT_TYPE.CLAIM_SUBMITTED,
  InsuranceClaimSubmittedPayload
> {
  constructor(p: EventParams<InsuranceClaimSubmittedPayload>) {
    super(buildParams(INSURANCE_EVENT_TYPE.CLAIM_SUBMITTED, p));
  }
}
export class InsuranceClaimReviewedEvent extends BaseDomainEvent<
  typeof INSURANCE_EVENT_TYPE.CLAIM_REVIEWED,
  InsuranceClaimReviewedPayload
> {
  constructor(p: EventParams<InsuranceClaimReviewedPayload>) {
    super(buildParams(INSURANCE_EVENT_TYPE.CLAIM_REVIEWED, p));
  }
}
export class InsuranceClaimApprovedEvent extends BaseDomainEvent<
  typeof INSURANCE_EVENT_TYPE.CLAIM_APPROVED,
  InsuranceClaimApprovedPayload
> {
  constructor(p: EventParams<InsuranceClaimApprovedPayload>) {
    super(buildParams(INSURANCE_EVENT_TYPE.CLAIM_APPROVED, p));
  }
}
export class InsuranceClaimRejectedEvent extends BaseDomainEvent<
  typeof INSURANCE_EVENT_TYPE.CLAIM_REJECTED,
  InsuranceClaimRejectedPayload
> {
  constructor(p: EventParams<InsuranceClaimRejectedPayload>) {
    super(buildParams(INSURANCE_EVENT_TYPE.CLAIM_REJECTED, p));
  }
}
export class InsuranceClaimPaidEvent extends BaseDomainEvent<
  typeof INSURANCE_EVENT_TYPE.CLAIM_PAID,
  InsuranceClaimPaidPayload
> {
  constructor(p: EventParams<InsuranceClaimPaidPayload>) {
    super(buildParams(INSURANCE_EVENT_TYPE.CLAIM_PAID, p));
  }
}
export class InsuranceStatusChangedEvent extends BaseDomainEvent<
  typeof INSURANCE_EVENT_TYPE.STATUS_CHANGED,
  InsuranceStatusChangedPayload
> {
  constructor(p: EventParams<InsuranceStatusChangedPayload>) {
    super(buildParams(INSURANCE_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
