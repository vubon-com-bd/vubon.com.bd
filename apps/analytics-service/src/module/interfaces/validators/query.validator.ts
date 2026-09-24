import {
  CustomQuerySchema,
  TimeSeriesQuerySchema,
} from '../../application/dtos/requests/query';

export class QueryValidator {
  static validateCustom(input: unknown) {
    return CustomQuerySchema.parse(input);
  }

  static safeValidateCustom(input: unknown) {
    return CustomQuerySchema.safeParse(input);
  }

  static validateTimeSeries(input: unknown) {
    return TimeSeriesQuerySchema.parse(input);
  }
}
