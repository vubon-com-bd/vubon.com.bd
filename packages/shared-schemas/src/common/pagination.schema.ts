/**
 * Pagination Schema
 *
 * This module defines Zod schemas for pagination, filtering, sorting,
 * and related query parameters used across all API endpoints.
 *
 * @module PaginationSchema
 */

import { z } from 'zod';
import { dateSchema, uuidSchema } from './core-primitives.schema';

// ============================================================
// 1. Pagination Constants
// ============================================================

const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const;

const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

// ============================================================
// 2. Core Pagination Schemas
// ============================================================

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(PAGINATION.DEFAULT_PAGE),
  limit: z.coerce
    .number()
    .int()
    .min(PAGINATION.MIN_LIMIT)
    .max(PAGINATION.MAX_LIMIT)
    .default(PAGINATION.DEFAULT_LIMIT),
  sortBy: z.string().optional(),
  sortOrder: z.enum([SORT_ORDER.ASC, SORT_ORDER.DESC]).default(SORT_ORDER.ASC),
});

export const strictPaginationQuerySchema = <T extends string>(allowedSortFields: T[]) =>
  paginationQuerySchema.extend({
    sortBy: z
      .enum(allowedSortFields as [T, ...T[]])
      .optional()
      .default(allowedSortFields[0] as T),
  });

export const searchPaginationQuerySchema = paginationQuerySchema.extend({
  search: z.string().optional(),
  searchFields: z.array(z.string()).optional(),
  searchOperator: z.enum(['and', 'or']).default('and'),
});

export const filterPaginationQuerySchema = paginationQuerySchema.extend({
  filters: z.record(z.unknown()).optional(),
  status: z.string().optional(),
  fromDate: dateSchema.optional(),
  toDate: dateSchema.optional(),
});

export const fullPaginationQuerySchema = paginationQuerySchema
  .extend({
    search: z.string().optional(),
    searchFields: z.array(z.string()).optional(),
    searchOperator: z.enum(['and', 'or']).default('and'),
    filters: z.record(z.unknown()).optional(),
    status: z.string().optional(),
    fromDate: dateSchema.optional(),
    toDate: dateSchema.optional(),
  })
  .refine(
    (data: { fromDate?: Date | string; toDate?: Date | string }) => {
      if (data.fromDate && data.toDate) {
        return new Date(data.fromDate) <= new Date(data.toDate);
      }
      return true;
    },
    {
      message: 'fromDate must be before or equal to toDate',
      path: ['fromDate'],
    }
  );

// ============================================================
// 3. Cursor-based Pagination
// ============================================================

export const cursorPaginationQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce
    .number()
    .int()
    .min(PAGINATION.MIN_LIMIT)
    .max(PAGINATION.MAX_LIMIT)
    .default(PAGINATION.DEFAULT_LIMIT),
  sortOrder: z.enum([SORT_ORDER.ASC, SORT_ORDER.DESC]).default(SORT_ORDER.ASC),
});

export const searchCursorPaginationQuerySchema = cursorPaginationQuerySchema.extend({
  search: z.string().optional(),
  searchFields: z.array(z.string()).optional(),
});

// ============================================================
// 4. Sort Schemas
// ============================================================

export const sortSchema = z.object({
  field: z.string(),
  order: z.enum([SORT_ORDER.ASC, SORT_ORDER.DESC]).default(SORT_ORDER.ASC),
});

export const multiSortSchema = z.array(sortSchema).min(1);

export const sortQuerySchema = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum([SORT_ORDER.ASC, SORT_ORDER.DESC]).default(SORT_ORDER.ASC),
  sort: z
    .string()
    .optional()
    .transform((val: string | undefined) => {
      if (!val) return [];
      return val.split(',').map((item) => {
        const [field, order] = item.split(':');
        return {
          field,
          order: (order || SORT_ORDER.ASC) as 'asc' | 'desc',
        };
      });
    }),
});

// ============================================================
// 5. Filter Schemas
// ============================================================

export const filterSchema = z.object({
  field: z.string(),
  operator: z.enum([
    'eq',
    'neq',
    'gt',
    'gte',
    'lt',
    'lte',
    'like',
    'ilike',
    'in',
    'nin',
    'between',
    'isNull',
    'isNotNull',
  ]),
  value: z.unknown().optional(),
});

export const filterGroupSchema = z.object({
  operator: z.enum(['and', 'or']).default('and'),
  filters: z.array(filterSchema),
});

export const advancedFilterQuerySchema = z.object({
  filters: z.array(filterGroupSchema).optional(),
  search: z.string().optional(),
  searchFields: z.array(z.string()).optional(),
});

// ============================================================
// 6. Pagination Response Schemas
// ============================================================

export const paginationMetaSchema = z.object({
  total: z.number().int().min(0),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  totalPages: z.number().int().min(0),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

export const paginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: paginationMetaSchema,
  });

export const cursorPaginationMetaSchema = z.object({
  nextCursor: z.string().optional(),
  previousCursor: z.string().optional(),
  hasMore: z.boolean(),
  total: z.number().int().min(0).optional(),
});

export const cursorPaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: cursorPaginationMetaSchema,
  });

// ============================================================
// 7. Utility Schemas
// ============================================================

export const offsetPaginationQuerySchema = z.object({
  offset: z.coerce.number().int().min(0).default(0),
  limit: z.coerce
    .number()
    .int()
    .min(PAGINATION.MIN_LIMIT)
    .max(PAGINATION.MAX_LIMIT)
    .default(PAGINATION.DEFAULT_LIMIT),
  sortBy: z.string().optional(),
  sortOrder: z.enum([SORT_ORDER.ASC, SORT_ORDER.DESC]).default(SORT_ORDER.ASC),
});

export const batchQuerySchema = z.object({
  ids: z.array(uuidSchema).min(1).max(100),
  fields: z.array(z.string()).optional(),
  include: z.array(z.string()).optional(),
});

export const rangeQuerySchema = z.object({
  from: z.union([z.string(), z.number(), dateSchema]).optional(),
  to: z.union([z.string(), z.number(), dateSchema]).optional(),
  inclusive: z.boolean().default(true),
});

// ============================================================
// 8. Type Inferences
// ============================================================

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
export type StrictPaginationQuery<T extends string> = z.infer<
  ReturnType<typeof strictPaginationQuerySchema<T>>
>;
export type SearchPaginationQuery = z.infer<typeof searchPaginationQuerySchema>;
export type FilterPaginationQuery = z.infer<typeof filterPaginationQuerySchema>;
export type FullPaginationQuery = z.infer<typeof fullPaginationQuerySchema>;

export type CursorPaginationQuery = z.infer<typeof cursorPaginationQuerySchema>;
export type SearchCursorPaginationQuery = z.infer<typeof searchCursorPaginationQuerySchema>;

export type Sort = z.infer<typeof sortSchema>;
export type MultiSort = z.infer<typeof multiSortSchema>;
export type SortQuery = z.infer<typeof sortQuerySchema>;

export type Filter = z.infer<typeof filterSchema>;
export type FilterGroup = z.infer<typeof filterGroupSchema>;
export type AdvancedFilterQuery = z.infer<typeof advancedFilterQuerySchema>;

export type PaginationMeta = z.infer<typeof paginationMetaSchema>;
export type PaginatedResponse<T = unknown> = z.infer<
  ReturnType<typeof paginatedResponseSchema<z.ZodTypeAny>>
>;
export type CursorPaginationMeta = z.infer<typeof cursorPaginationMetaSchema>;
export type CursorPaginatedResponse<T = unknown> = z.infer<
  ReturnType<typeof cursorPaginatedResponseSchema<z.ZodTypeAny>>
>;

export type OffsetPaginationQuery = z.infer<typeof offsetPaginationQuerySchema>;
export type BatchQuery = z.infer<typeof batchQuerySchema>;
export type RangeQuery = z.infer<typeof rangeQuerySchema>;

// ============================================================
// 9. Default Export
// ============================================================

export default {
  paginationQuerySchema,
  strictPaginationQuerySchema,
  searchPaginationQuerySchema,
  filterPaginationQuerySchema,
  fullPaginationQuerySchema,
  cursorPaginationQuerySchema,
  searchCursorPaginationQuerySchema,
  offsetPaginationQuerySchema,
  sortSchema,
  multiSortSchema,
  sortQuerySchema,
  filterSchema,
  filterGroupSchema,
  advancedFilterQuerySchema,
  paginationMetaSchema,
  paginatedResponseSchema,
  cursorPaginationMetaSchema,
  cursorPaginatedResponseSchema,
  batchQuerySchema,
  rangeQuerySchema,
};
