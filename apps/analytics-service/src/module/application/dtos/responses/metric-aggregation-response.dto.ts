import { z } from 'zod';
import type { MetricAggregationVO } from '../../../domain/value-objects/composites/metric-aggregation.vo';

export const MetricAggregationResponseSchema = z.object({
  aggregation: z.string(),
  value: z.number(),
  unit: z.string(),
  sampleSize: z.number().int().nonnegative(),
  confidenceLevel: z.enum(['low', 'medium', 'high']),
  isReliable: z.boolean(),
});

export type MetricAggregationResponseDTO = z.infer<
  typeof MetricAggregationResponseSchema
>;

/**
 * Business logic: also exposes computed reliability based on sample size.
 *
 * NOTE: prop is `aggregateValue` (not `value`) to avoid BaseVO.value collision.
 */
export function toMetricAggregationResponse(
  vo: MetricAggregationVO,
): MetricAggregationResponseDTO {
  return {
    aggregation: vo.aggregation,
    value: vo.aggregateValue.numeric,
    unit: vo.unit.value,
    sampleSize: vo.sampleSize,
    confidenceLevel: vo.confidenceLevel,
    isReliable: vo.isReliable(),
  };
}
