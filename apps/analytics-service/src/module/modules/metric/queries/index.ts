import type { Provider } from '@nestjs/common';
/**
 * Metric Query Handlers Barrel
 */
import { GetMetricHandler } from '../../../application/queries/metric/get-metric.handler.js';
import { AggregateMetricHandler } from '../../../application/queries/metric/aggregate-metric.handler.js';
import { TimeSeriesHandler } from '../../../application/queries/metric/time-series.handler.js';

export const METRIC_QUERY_HANDLERS = [
  GetMetricHandler,
  AggregateMetricHandler,
  TimeSeriesHandler,
] as Provider[];

export { GetMetricHandler, AggregateMetricHandler, TimeSeriesHandler };
