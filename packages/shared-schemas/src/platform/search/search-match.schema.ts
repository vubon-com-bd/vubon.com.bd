/**
 * Search Match Schema
 * @module shared-schemas/platform/search
 *
 * Values আসে shared-constants/platform/search-match.constants থেকে।
 */

import { z } from 'zod';
import { SEARCH_MATCH_TYPE, SEARCH_FUZZINESS } from '@vubon/shared-constants/platform';

export const SearchMatchTypeSchema = z.enum(
  Object.values(SEARCH_MATCH_TYPE) as [string, ...string[]]
);

export const SearchFuzzinessSchema = z.enum(
  Object.values(SEARCH_FUZZINESS) as [string, ...string[]]
);

export const SearchMatchSchema = z.object({
  type: SearchMatchTypeSchema,
  field: z.string().min(1).max(100),
  value: z.string().min(1).max(1000),
  fuzziness: SearchFuzzinessSchema.optional(),
  boost: z.number().min(0.1).max(10).optional(),
});

export type SearchMatchTypeSchemaType = z.infer<typeof SearchMatchTypeSchema>;
export type SearchFuzzinessSchemaType = z.infer<typeof SearchFuzzinessSchema>;
export type SearchMatchSchemaType = z.infer<typeof SearchMatchSchema>;
