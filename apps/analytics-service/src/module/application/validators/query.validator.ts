import {
  CustomQuerySchema,
  TimeSeriesQuerySchema,
} from '../dtos/requests/query';

export class QueryValidator {
  static validateCustom(input: unknown) {
    return CustomQuerySchema.parse(input);
  }

  static validateTimeSeries(input: unknown) {
    return TimeSeriesQuerySchema.parse(input);
  }
}
