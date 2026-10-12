/**
 * Query Validator (interface layer)
 */
import { BadRequestException, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';

export const CustomQuerySchema = z.object({
  metrics: z.array(z.string().min(1).max(100)).min(1).max(50),
  dimensions: z.array(z.string().min(1).max(100)).max(10).optional(),
  filters: z.array(z.record(z.string(), z.unknown())).max(20).optional(),
  filterLogic: z.enum(['and', 'or']).optional(),
  fromDate: z.string().datetime(),
  toDate: z.string().datetime(),
  limit: z.number().int().positive().max(100000).optional(),
  sortBy: z.string().max(64).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const TimeSeriesQuerySchema = z.object({
  metric: z.string().min(1).max(100),
  aggregation: z.enum(['sum', 'avg', 'min', 'max', 'count']).optional(),
  granularity: z.string().min(2).max(50),
  fromDate: z.string().datetime(),
  toDate: z.string().datetime(),
  dimensions: z.array(z.string().min(1).max(100)).max(5).optional(),
  filters: z.record(z.string(), z.unknown()).optional(),
  fillGaps: z.boolean().optional(),
  smooth: z.number().int().positive().max(30).optional(),
});

function throwValidationError(error: z.ZodError, defaultMsg: string): never {
  const first = error.errors[0];
  throw new BadRequestException({
    statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
    code: ERROR_CODE.VAL_REQUIRED,
    message: first?.message ?? defaultMsg,
    field: first?.path.join('.'),
  });
}

@Injectable()
export class QueryValidator {
  validateCustom(input: unknown): z.infer<typeof CustomQuerySchema> {
    const result = CustomQuerySchema.safeParse(input);
    if (!result.success) throwValidationError(result.error, 'Invalid custom query');
    return result.data;
  }

  validateTimeSeries(input: unknown): z.infer<typeof TimeSeriesQuerySchema> {
    const result = TimeSeriesQuerySchema.safeParse(input);
    if (!result.success) throwValidationError(result.error, 'Invalid time-series query');
    return result.data;
  }
}
