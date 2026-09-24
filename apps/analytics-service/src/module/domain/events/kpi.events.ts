import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'Kpi';

export class KpiThresholdReachedEvent extends BaseDomainEvent<
  'analytics.kpi.threshold_reached',
  { kpiId: string; name: string; actual: number }
> {
  constructor(
    aggregateId: string,
    kpiId: string,
    name: string,
    actual: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.kpi.threshold_reached',
      aggregateId,
      aggregateType: AGG,
      payload: { kpiId, name, actual },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class KpiBreachEvent extends BaseDomainEvent<
  'analytics.kpi.breach',
  { kpiId: string; name: string; actual: number; target: number }
> {
  constructor(
    aggregateId: string,
    kpiId: string,
    name: string,
    actual: number,
    target: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.kpi.breach',
      aggregateId,
      aggregateType: AGG,
      payload: { kpiId, name, actual, target },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class KpiExceededEvent extends BaseDomainEvent<
  'analytics.kpi.exceeded',
  {
    kpiId: string;
    name: string;
    actual: number;
    target: number;
    achievementPercent: number;
  }
> {
  constructor(
    aggregateId: string,
    kpiId: string,
    name: string,
    actual: number,
    target: number,
    achievementPercent: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.kpi.exceeded',
      aggregateId,
      aggregateType: AGG,
      payload: { kpiId, name, actual, target, achievementPercent },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
