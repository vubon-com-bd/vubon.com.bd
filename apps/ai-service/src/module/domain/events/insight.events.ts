import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AiInsight';

export class InsightGeneratedEvent extends BaseDomainEvent<
  'ai.insight.generated',
  { insightId: string; type: string; priority: string }
> {
  constructor(aggregateId: string, insightId: string, type: string, priority: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.insight.generated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { insightId, type, priority },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class AnomalyDetectedEvent extends BaseDomainEvent<
  'ai.anomaly.detected',
  { target: string; value: number; severity: string }
> {
  constructor(aggregateId: string, target: string, value: number, severity: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.anomaly.detected',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { target, value, severity },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
