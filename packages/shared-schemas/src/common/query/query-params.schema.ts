/**
 * Query Params Schema
 * @module shared-schemas/common/query
 *
 * Composite query params — pagination + sort + search + filter + date range।
 */

import { z } from 'zod';
import { PageBasedPaginationSchema } from './pagination.schema';
import { SortQuerySchema } from './sort.schema';
import { OptionalSearchQuerySchema } from './search.schema';
import { FilterListSchema } from './filter.schema';

export const DateRangeQuerySchema = z.object({
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
});

export const BaseQueryParamsSchema = PageBasedPaginationSchema.merge(SortQuerySchema)
  .merge(OptionalSearchQuerySchema)
  .merge(DateRangeQuerySchema);

export const FilteredQueryParamsSchema = BaseQueryParamsSchema.extend({
  filters: FilterListSchema.optional(),
});

export const IncludeQuerySchema = z.object({
  include: z
    .string()
    .transform((s) =>
      s
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
    )
    .optional(),
  select: z
    .string()
    .transform((s) =>
      s
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
    )
    .optional(),
  includeDeleted: z.coerce.boolean().optional().default(false),
});

export const FullQueryParamsSchema = FilteredQueryParamsSchema.merge(IncludeQuerySchema);

export type DateRangeQuerySchemaType = z.infer<typeof DateRangeQuerySchema>;
export type BaseQueryParamsSchemaType = z.infer<typeof BaseQueryParamsSchema>;
export type FilteredQueryParamsSchemaType = z.infer<typeof FilteredQueryParamsSchema>;
export type IncludeQuerySchemaType = z.infer<typeof IncludeQuerySchema>;
export type FullQueryParamsSchemaType = z.infer<typeof FullQueryParamsSchema>;
