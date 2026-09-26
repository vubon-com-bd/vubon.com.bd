import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

export class AttributionComputedEvent extends BaseDomainEvent<
  'analytics.attribution.computed',
  { conversionId: string; model: string; touchpointCount: number; value: number }
> {
  constructor(
    aggregateId: string,
    conversionId: string,
    model: string,
    touchpointCount: number,
    value: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.attribution.computed',
      aggregateId,
      aggregateType: 'Attribution',
      payload: { conversionId, model, touchpointCount, value },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
