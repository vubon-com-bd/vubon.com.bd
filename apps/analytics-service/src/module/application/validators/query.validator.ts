/**
 * Query Validator
 */
import { CustomQuerySchema } from '../dtos/requests/query/custom-query.dto.js';
import { TimeSeriesQuerySchema } from '../dtos/requests/query/time-series-query.dto.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';

export class QueryValidator {
  static validateCustom(input: unknown): void {
    const result = CustomQuerySchema.safeParse(input);
    if (!result.success) {
      throw new ApplicationValidationError(result.error.errors[0]?.message ?? 'Invalid custom query');
    }
  }

  static validateTimeSeries(input: unknown): void {
    const result = TimeSeriesQuerySchema.safeParse(input);
    if (!result.success) {
      throw new ApplicationValidationError(result.error.errors[0]?.message ?? 'Invalid time-series');
    }
  }
}
