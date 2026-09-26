import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AiForecast';

export class ForecastGeneratedEvent extends BaseDomainEvent<
  'ai.forecast.generated',
  { forecastId: string; target: string; horizonDays: number }
> {
  constructor(aggregateId: string, forecastId: string, target: string, horizonDays: number, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.forecast.generated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { forecastId, target, horizonDays },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
