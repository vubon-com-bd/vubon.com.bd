import { z } from 'zod';
import { PAGINATION } from '@vubon/shared-constants/src/common/pagination.constants';

/**
 * Pagination schema — uses PAGINATION constants for min/max/default.
 */
export const PaginationSchema = z.object({
  page: z.number().int().min(PAGINATION.DEFAULT_PAGE).default(PAGINATION.DEFAULT_PAGE),
  limit: z
    .number()
    .int()
    .min(PAGINATION.MIN_LIMIT)
    .max(PAGINATION.MAX_LIMIT)
    .default(PAGINATION.DEFAULT_LIMIT),
});

export const PaginationMetaSchema = z.object({
  page: z.number().int().min(PAGINATION.DEFAULT_PAGE),
  limit: z.number().int().min(PAGINATION.MIN_LIMIT).max(PAGINATION.MAX_LIMIT),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
});

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: z.array(dataSchema),
    meta: PaginationMetaSchema,
  });
