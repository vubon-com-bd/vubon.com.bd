import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Insurance';

export class InsurancePurchasedEvent extends BaseDomainEvent<
  'logistics.insurance.purchased',
  { insuranceId: string; shipmentId: string; premium: number }
> {
  constructor(aggregateId: string, insuranceId: string, shipmentId: string, premium: number, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.insurance.purchased',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { insuranceId, shipmentId, premium },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class InsuranceClaimedEvent extends BaseDomainEvent<
  'logistics.insurance.claimed',
  { insuranceId: string; shipmentId: string; amount: number }
> {
  constructor(aggregateId: string, insuranceId: string, shipmentId: string, amount: number, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.insurance.claimed',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { insuranceId, shipmentId, amount },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
