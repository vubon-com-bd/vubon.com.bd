import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AiAnalytics';

export class AiAnalyticsRecordedEvent extends BaseDomainEvent<
  'ai.analytics.recorded',
  { analyticsId: string; type: string }
> {
  constructor(aggregateId: string, analyticsId: string, type: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.analytics.recorded',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { analyticsId, type },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
