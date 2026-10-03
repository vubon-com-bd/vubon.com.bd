/**
 * Query Pagination Schema
 * @module shared-schemas/common/query
 *
 * Values আসে shared-constants/common/pagination.constants থেকে।
 */

import { z } from 'zod';
import { PAGINATION } from '@vubon/shared-constants/common';

export const PageBasedPaginationSchema = z.object({
  page: z.coerce
    .number()
    .int('Page must be an integer')
    .min(1, 'Page must be at least 1')
    .default(PAGINATION.DEFAULT_PAGE),
  limit: z.coerce
    .number()
    .int('Limit must be an integer')
    .min(PAGINATION.MIN_LIMIT, `Limit must be at least ${PAGINATION.MIN_LIMIT}`)
    .max(PAGINATION.MAX_LIMIT, `Limit cannot exceed ${PAGINATION.MAX_LIMIT}`)
    .default(PAGINATION.DEFAULT_LIMIT),
});

export const OffsetBasedPaginationSchema = z.object({
  offset: z.coerce.number().int().min(0).default(0),
  limit: z.coerce
    .number()
    .int()
    .min(PAGINATION.MIN_LIMIT)
    .max(PAGINATION.MAX_LIMIT)
    .default(PAGINATION.DEFAULT_LIMIT),
});

export const CursorBasedPaginationSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce
    .number()
    .int()
    .min(PAGINATION.MIN_LIMIT)
    .max(PAGINATION.MAX_LIMIT)
    .default(PAGINATION.DEFAULT_LIMIT),
  direction: z.enum(['forward', 'backward']).optional().default('forward'),
});

export type PageBasedPaginationSchemaType = z.infer<typeof PageBasedPaginationSchema>;
export type OffsetBasedPaginationSchemaType = z.infer<typeof OffsetBasedPaginationSchema>;
export type CursorBasedPaginationSchemaType = z.infer<typeof CursorBasedPaginationSchema>;
