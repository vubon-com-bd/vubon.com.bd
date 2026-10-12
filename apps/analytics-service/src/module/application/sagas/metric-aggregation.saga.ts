/**
 * Metric Aggregation Saga
 * @module analytics-service/application/sagas
 */
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';

export interface MetricAggregationContext {
  metricId: string;
  seriesKey: string;
  values: readonly number[];
  aggregated: boolean;
  cached: boolean;
}

export class MetricAggregationSaga extends BaseSaga<MetricAggregationContext> {
  readonly name = 'metric-aggregation';

  async execute(input: {
    metricId: string;
    seriesKey: string;
    values: readonly number[];
  }): Promise<void> {
    this.setContext({
      metricId: input.metricId,
      seriesKey: input.seriesKey,
      values: input.values,
      aggregated: false,
      cached: false,
    });

    const ctx = this.getContext();
    // Step 1: Load metric entity
    // Step 2: Aggregate values
    // Step 3: Persist aggregation
    ctx.aggregated = true;
    // Step 4: Update cache
    ctx.cached = true;
  }

  async compensate(): Promise<void> {
    const ctx = this.getContext();
    if (!ctx) return;
    if (ctx.cached && !ctx.aggregated) {
      // await cache.del(`metric:${ctx.seriesKey}`);
    }
  }
}
