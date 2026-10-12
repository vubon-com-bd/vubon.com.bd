/**
 * Attribution Domain Events
 * @module analytics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base';
import type { Timestamp } from '@vubon/shared-types/common';

export class AttributionComputedEvent extends BaseDomainEvent<'analytics.attribution.computed', {
  readonly conversionId: string;
  readonly model: string;
  readonly touchpointCount: number;
  readonly conversionValue: number;
}> {
  constructor(
    conversionId: string,
    model: string,
    touchpointCount: number,
    conversionValue: number,
    occurredAt: string
  ) {
    super({
      id: `attribution-computed-${conversionId}-${Date.now()}`,
      type: 'analytics.attribution.computed',
      aggregateId: conversionId,
      aggregateType: 'Attribution',
      payload: { conversionId, model, touchpointCount, conversionValue },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 1,
    });
  }
}
