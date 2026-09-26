/**
 * Search Suggestion Schema
 * @module shared-schemas/platform/search
 *
 * Values আসে shared-constants/platform/search-suggestion.constants থেকে।
 */

import { z } from 'zod';
import { SEARCH_SUGGESTION_TYPE } from '@vubon/shared-constants/platform';

export const SearchSuggestionTypeSchema = z.enum(
  Object.values(SEARCH_SUGGESTION_TYPE) as [string, ...string[]]
);

export const SearchSuggestionSchema = z.object({
  text: z.string().min(1).max(200),
  type: SearchSuggestionTypeSchema,
  score: z.number().nonnegative(),
  highlight: z.string().max(200).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const SearchSuggestionResultSchema = z.object({
  query: z.string().min(1).max(200),
  suggestions: z.array(SearchSuggestionSchema).max(10),
  took: z.number().nonnegative(),
});

export type SearchSuggestionTypeSchemaType = z.infer<typeof SearchSuggestionTypeSchema>;
export type SearchSuggestionSchemaType = z.infer<typeof SearchSuggestionSchema>;
export type SearchSuggestionResultSchemaType = z.infer<typeof SearchSuggestionResultSchema>;
