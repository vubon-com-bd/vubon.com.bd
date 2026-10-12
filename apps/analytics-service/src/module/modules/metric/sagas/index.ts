import type { Provider } from '@nestjs/common';
/**
 * Metric Sagas Barrel
 */
import { MetricAggregationSaga } from '../../../application/sagas/metric-aggregation.saga.js';

export const METRIC_SAGAS = [MetricAggregationSaga] as Provider[];

export { MetricAggregationSaga };
