import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'VendorSuspension';

export class VendorSuspendedEvent extends BaseDomainEvent<
  'vendor.suspended',
  { suspensionId: string; vendorId: string; reason: string }
> {
  constructor(
    aggregateId: string,
    suspensionId: string,
    vendorId: string,
    reason: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.suspended',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { suspensionId, vendorId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class VendorReinstatedEvent extends BaseDomainEvent<
  'vendor.reinstated',
  { suspensionId: string; vendorId: string }
> {
  constructor(
    aggregateId: string,
    suspensionId: string,
    vendorId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.reinstated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { suspensionId, vendorId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
