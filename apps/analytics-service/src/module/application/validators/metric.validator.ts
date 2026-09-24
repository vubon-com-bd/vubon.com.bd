import { QueryMetricSchema, AggregateMetricSchema } from '../dtos/requests/metric';

export class MetricValidator {
  static validateQuery(input: unknown) {
    return QueryMetricSchema.parse(input);
  }

  static validateAggregate(input: unknown) {
    return AggregateMetricSchema.parse(input);
  }
}
