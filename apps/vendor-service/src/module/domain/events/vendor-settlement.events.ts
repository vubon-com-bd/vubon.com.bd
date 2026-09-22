import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'VendorSettlement';

export class SettlementCreatedEvent extends BaseDomainEvent<
  'vendor.settlement.created',
  { settlementId: string; vendorId: string; amount: number; currency: string }
> {
  constructor(
    aggregateId: string,
    settlementId: string,
    vendorId: string,
    amount: number,
    currency: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.settlement.created',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { settlementId, vendorId, amount, currency },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class SettlementCompletedEvent extends BaseDomainEvent<
  'vendor.settlement.completed',
  { settlementId: string; vendorId: string; amount: number; currency: string }
> {
  constructor(
    aggregateId: string,
    settlementId: string,
    vendorId: string,
    amount: number,
    currency: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.settlement.completed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { settlementId, vendorId, amount, currency },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
