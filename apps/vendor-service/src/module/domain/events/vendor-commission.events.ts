import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'VendorCommission';

export class CommissionCalculatedEvent extends BaseDomainEvent<
  'vendor.commission.calculated',
  { commissionId: string; vendorId: string; orderId: string; amount: number }
> {
  constructor(
    aggregateId: string,
    commissionId: string,
    vendorId: string,
    orderId: string,
    amount: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.commission.calculated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { commissionId, vendorId, orderId, amount },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class CommissionPaidEvent extends BaseDomainEvent<
  'vendor.commission.paid',
  { commissionId: string; vendorId: string }
> {
  constructor(
    aggregateId: string,
    commissionId: string,
    vendorId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.commission.paid',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { commissionId, vendorId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
