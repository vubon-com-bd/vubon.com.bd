/**
 * Paginated Response Schema
 * @module shared-schemas/common/api
 */

import { z } from 'zod';
import { PaginationMetaSchema } from '../base/pagination.schema';

export function createPaginatedResponseSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    success: z.literal(true),
    data: z.array(itemSchema),
    meta: PaginationMetaSchema,
    timestamp: z.string().datetime(),
  });
}

export function createCursorPaginatedResponseSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    success: z.literal(true),
    data: z.array(itemSchema),
    nextCursor: z.string().nullable(),
    prevCursor: z.string().nullable(),
    hasMore: z.boolean(),
    timestamp: z.string().datetime(),
  });
}
