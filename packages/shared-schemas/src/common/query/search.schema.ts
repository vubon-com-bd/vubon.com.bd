/**
 * Search Schema
 * @module shared-schemas/common/query
 *
 * Values আসে shared-constants/common/search-params.constants থেকে।
 */

import { z } from 'zod';
import { SEARCH_PARAMS } from '@vubon/shared-constants/common';

export const SearchQuerySchema = z.object({
  q: z
    .string()
    .trim()
    .min(SEARCH_PARAMS.DEFAULT_QUERY_MIN_LENGTH, 'Search query is too short')
    .max(SEARCH_PARAMS.DEFAULT_QUERY_MAX_LENGTH, 'Search query is too long'),
});

export const AdvancedSearchQuerySchema = SearchQuerySchema.extend({
  fields: z.array(z.string().min(1).max(64)).max(20).optional(),
  fuzzy: z.boolean().optional().default(SEARCH_PARAMS.DEFAULT_FUZZY),
  highlight: z.boolean().optional().default(SEARCH_PARAMS.DEFAULT_HIGHLIGHT),
  suggestionLimit: z
    .number()
    .int()
    .min(1)
    .max(50)
    .optional()
    .default(SEARCH_PARAMS.DEFAULT_SUGGESTION_LIMIT),
});

export const OptionalSearchQuerySchema = z.object({
  q: z.string().trim().min(1).max(200).optional(),
});

export type SearchQuerySchemaType = z.infer<typeof SearchQuerySchema>;
export type AdvancedSearchQuerySchemaType = z.infer<typeof AdvancedSearchQuerySchema>;
export type OptionalSearchQuerySchemaType = z.infer<typeof OptionalSearchQuerySchema>;
