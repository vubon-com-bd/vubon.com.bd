import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'VendorPayout';

export class PayoutRequestedEvent extends BaseDomainEvent<
  'vendor.payout.requested',
  { payoutId: string; vendorId: string; amount: number; currency: string }
> {
  constructor(
    aggregateId: string,
    payoutId: string,
    vendorId: string,
    amount: number,
    currency: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.payout.requested',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { payoutId, vendorId, amount, currency },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class PayoutProcessedEvent extends BaseDomainEvent<
  'vendor.payout.processed',
  { payoutId: string; vendorId: string; amount: number; currency: string }
> {
  constructor(
    aggregateId: string,
    payoutId: string,
    vendorId: string,
    amount: number,
    currency: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.payout.processed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { payoutId, vendorId, amount, currency },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class PayoutFailedEvent extends BaseDomainEvent<
  'vendor.payout.failed',
  { payoutId: string; vendorId: string; reason: string }
> {
  constructor(
    aggregateId: string,
    payoutId: string,
    vendorId: string,
    reason: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.payout.failed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { payoutId, vendorId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
