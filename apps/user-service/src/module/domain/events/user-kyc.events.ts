/**
 * UserKyc domain events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

interface EventParams<TPayload> {
  readonly id: string;
  readonly aggregateId: string;
  readonly payload: TPayload;
  readonly occurredAt: Timestamp;
  readonly version: number;
}

export interface KycSubmittedPayload {
  readonly userId: string;
  readonly kycId: string;
  readonly document: string;
}

export class KycSubmittedEvent extends BaseDomainEvent<'kyc.submitted', KycSubmittedPayload> {
  constructor(p: EventParams<KycSubmittedPayload>) {
    super({
      id: p.id,
      type: 'kyc.submitted',
      aggregateId: p.aggregateId,
      aggregateType: 'UserKyc',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

export interface KycVerifiedPayload {
  readonly userId: string;
  readonly kycId: string;
  readonly verifiedAt: string;
}

export class KycVerifiedEvent extends BaseDomainEvent<'kyc.verified', KycVerifiedPayload> {
  constructor(p: EventParams<KycVerifiedPayload>) {
    super({
      id: p.id,
      type: 'kyc.verified',
      aggregateId: p.aggregateId,
      aggregateType: 'UserKyc',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

export interface KycRejectedPayload {
  readonly userId: string;
  readonly kycId: string;
  readonly reason: string;
}

export class KycRejectedEvent extends BaseDomainEvent<'kyc.rejected', KycRejectedPayload> {
  constructor(p: EventParams<KycRejectedPayload>) {
    super({
      id: p.id,
      type: 'kyc.rejected',
      aggregateId: p.aggregateId,
      aggregateType: 'UserKyc',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

export interface KycReverifiedPayload {
  readonly userId: string;
  readonly kycId: string;
  readonly reverifiedAt: string;
}

export class KycReverifiedEvent extends BaseDomainEvent<
  'kyc.reverified',
  KycReverifiedPayload
> {
  constructor(p: EventParams<KycReverifiedPayload>) {
    super({
      id: p.id,
      type: 'kyc.reverified',
      aggregateId: p.aggregateId,
      aggregateType: 'UserKyc',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}
