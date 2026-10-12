/**
 * Funnel Domain Events
 * @module analytics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base';
import type { Timestamp } from '@vubon/shared-types/common';

export class FunnelCreatedEvent extends BaseDomainEvent<'analytics.funnel.created', {
  readonly funnelId: string;
  readonly funnelName: string;
  readonly stepCount: number;
}> {
  constructor(
    funnelId: string,
    funnelName: string,
    stepCount: number,
    occurredAt: string
  ) {
    super({
      id: `funnel-created-${funnelId}-${Date.now()}`,
      type: 'analytics.funnel.created',
      aggregateId: funnelId,
      aggregateType: 'Funnel',
      payload: { funnelId, funnelName, stepCount },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 1,
    });
  }
}

export class FunnelAnalyzedEvent extends BaseDomainEvent<'analytics.funnel.analyzed', {
  readonly funnelId: string;
  readonly entryCount: number;
  readonly conversionRate: number;
}> {
  constructor(
    funnelId: string,
    entryCount: number,
    conversionRate: number,
    occurredAt: string
  ) {
    super({
      id: `funnel-analyzed-${funnelId}-${Date.now()}`,
      type: 'analytics.funnel.analyzed',
      aggregateId: funnelId,
      aggregateType: 'Funnel',
      payload: { funnelId, entryCount, conversionRate },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 2,
    });
  }
}
