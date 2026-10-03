/**
 * Search Sort Schema
 * @module shared-schemas/platform/search
 *
 * Values আসে shared-constants/platform/search-sort.constants থেকে।
 */

import { z } from 'zod';
import { SEARCH_SORT, SEARCH_SORT_ORDER } from '@vubon/shared-constants/platform';

export const SearchSortValueSchema = z.enum(Object.values(SEARCH_SORT) as [string, ...string[]]);

export const SearchSortOrderSchema = z.enum(
  Object.values(SEARCH_SORT_ORDER) as [string, ...string[]]
);

export const SearchSortSchema = z.object({
  field: z.string().min(1).max(64),
  order: SearchSortOrderSchema,
});

export type SearchSortValueSchemaType = z.infer<typeof SearchSortValueSchema>;
export type SearchSortOrderSchemaType = z.infer<typeof SearchSortOrderSchema>;
export type SearchSortSchemaType = z.infer<typeof SearchSortSchema>;
