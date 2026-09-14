/**
 * Search Filter Schema
 * @module shared-schemas/platform/search
 *
 * Values আসে shared-constants/platform/search-filter.constants থেকে।
 */

import { z } from 'zod';
import { SEARCH_FILTER_TYPE, SEARCH_FILTER_RANGE } from '@vubon/shared-constants/platform';

export const SearchFilterTypeSchema = z.enum(
  Object.values(SEARCH_FILTER_TYPE) as [string, ...string[]]
);

export const SearchFilterRangeSchema = z.enum(
  Object.values(SEARCH_FILTER_RANGE) as [string, ...string[]]
);

export const SearchFilterSchema = z.object({
  field: z.string().min(1).max(100),
  type: SearchFilterTypeSchema,
  value: z.unknown(),
});

export const SearchRangeFilterSchema = z.object({
  field: SearchFilterRangeSchema,
  min: z.number().optional(),
  max: z.number().optional(),
});

export const SearchTermsFilterSchema = z.object({
  field: z.string().min(1).max(100),
  values: z
    .array(z.union([z.string(), z.number(), z.boolean()]))
    .min(1)
    .max(1000),
});

export type SearchFilterTypeSchemaType = z.infer<typeof SearchFilterTypeSchema>;
export type SearchFilterRangeSchemaType = z.infer<typeof SearchFilterRangeSchema>;
export type SearchFilterSchemaType = z.infer<typeof SearchFilterSchema>;
export type SearchRangeFilterSchemaType = z.infer<typeof SearchRangeFilterSchema>;
export type SearchTermsFilterSchemaType = z.infer<typeof SearchTermsFilterSchema>;
