import {
  QueryMetricSchema,
  AggregateMetricSchema,
} from '../../application/dtos/requests/metric';

export class MetricValidator {
  static validateQuery(input: unknown) {
    return QueryMetricSchema.parse(input);
  }

  static safeValidateQuery(input: unknown) {
    return QueryMetricSchema.safeParse(input);
  }

  static validateAggregate(input: unknown) {
    return AggregateMetricSchema.parse(input);
  }
}
