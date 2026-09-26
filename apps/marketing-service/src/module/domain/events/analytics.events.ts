import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

export class MarketingAnalyticsRecordedEvent extends BaseDomainEvent<
  'marketing.analytics.recorded',
  { analyticsId: string; metric: string; value: number }
> {
  constructor(
    aggregateId: string,
    metric: string,
    value: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.analytics.recorded',
      aggregateId,
      aggregateType: 'MarketingAnalytics',
      payload: { analyticsId: aggregateId, metric, value },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
