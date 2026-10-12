/**
 * Metric Validator (interface layer)
 */
import { BadRequestException, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';

export const QueryMetricSchema = z.object({
  metric: z.string().min(2).max(100),
  period: z.string().min(2).max(50),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  dimensions: z.array(z.string().min(1).max(50)).max(10).optional(),
});

export const AggregateMetricSchema = z.object({
  metric: z.string().min(2).max(100),
  aggregation: z.enum(['sum', 'avg', 'min', 'max', 'count']),
  period: z.string().min(2).max(50),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  dimensions: z.array(z.string().min(1).max(50)).max(10).optional(),
  filters: z.record(z.string(), z.unknown()).optional(),
});

@Injectable()
export class MetricValidator {
  validateQuery(input: unknown): z.infer<typeof QueryMetricSchema> {
    const result = QueryMetricSchema.safeParse(input);
    if (!result.success) {
      const first = result.error.errors[0];
      throw new BadRequestException({
        statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        code: ERROR_CODE.VAL_REQUIRED,
        message: first?.message ?? 'Invalid query',
        field: first?.path.join('.'),
      });
    }
    return result.data;
  }

  validateAggregate(input: unknown): z.infer<typeof AggregateMetricSchema> {
    const result = AggregateMetricSchema.safeParse(input);
    if (!result.success) {
      const first = result.error.errors[0];
      throw new BadRequestException({
        statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        code: ERROR_CODE.VAL_REQUIRED,
        message: first?.message ?? 'Invalid aggregate payload',
        field: first?.path.join('.'),
      });
    }
    return result.data;
  }
}
