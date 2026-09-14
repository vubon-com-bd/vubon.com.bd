/**
 * Pagination Schema
 * @module shared-schemas/common/base
 *
 * Values আসে shared-constants/common/pagination.constants থেকে।
 */

import { z } from 'zod';
import { PAGINATION } from '@vubon/shared-constants/common';

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(PAGINATION.DEFAULT_PAGE),
  limit: z.coerce
    .number()
    .int()
    .min(PAGINATION.MIN_LIMIT)
    .max(PAGINATION.MAX_LIMIT)
    .default(PAGINATION.DEFAULT_LIMIT),
});

export const CursorPaginationQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce
    .number()
    .int()
    .min(PAGINATION.MIN_LIMIT)
    .max(PAGINATION.MAX_LIMIT)
    .default(PAGINATION.DEFAULT_LIMIT),
});

export const PaginationMetaSchema = z.object({
  page: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});

export type PaginationQuerySchemaType = z.infer<typeof PaginationQuerySchema>;
export type CursorPaginationQuerySchemaType = z.infer<typeof CursorPaginationQuerySchema>;
export type PaginationMetaSchemaType = z.infer<typeof PaginationMetaSchema>;
