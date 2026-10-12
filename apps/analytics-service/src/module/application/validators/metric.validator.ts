/**
 * Metric Validator
 */
import { QueryMetricSchema } from '../dtos/requests/metric/query-metric.dto.js';
import { AggregateMetricSchema } from '../dtos/requests/metric/aggregate-metric.dto.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';

export class MetricValidator {
  static validateQuery(input: unknown): void {
    const result = QueryMetricSchema.safeParse(input);
    if (!result.success) {
      throw new ApplicationValidationError(result.error.errors[0]?.message ?? 'Invalid query');
    }
  }

  static validateAggregate(input: unknown): void {
    const result = AggregateMetricSchema.safeParse(input);
    if (!result.success) {
      throw new ApplicationValidationError(result.error.errors[0]?.message ?? 'Invalid aggregate');
    }
  }
}
