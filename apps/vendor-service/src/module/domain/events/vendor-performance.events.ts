import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'VendorPerformance';

export class PerformanceUpdatedEvent extends BaseDomainEvent<
  'vendor.performance.updated',
  { performanceId: string; vendorId: string; score: number }
> {
  constructor(
    aggregateId: string,
    performanceId: string,
    vendorId: string,
    score: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.performance.updated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { performanceId, vendorId, score },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
