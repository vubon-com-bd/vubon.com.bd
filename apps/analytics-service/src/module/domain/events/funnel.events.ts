import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'Funnel';

export class FunnelCreatedEvent extends BaseDomainEvent<
  'analytics.funnel.created',
  { funnelId: string; name: string; stepCount: number }
> {
  constructor(
    aggregateId: string,
    funnelId: string,
    name: string,
    stepCount: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.funnel.created',
      aggregateId,
      aggregateType: AGG,
      payload: { funnelId, name, stepCount },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class FunnelAnalyzedEvent extends BaseDomainEvent<
  'analytics.funnel.analyzed',
  { funnelId: string; stepCount: number }
> {
  constructor(
    aggregateId: string,
    funnelId: string,
    stepCount: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.funnel.analyzed',
      aggregateId,
      aggregateType: AGG,
      payload: { funnelId, stepCount },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
