/**
 * Search Synonym Schema
 * @module shared-schemas/platform/search
 *
 * Values আসে shared-constants/platform/search-synonym.constants থেকে।
 */

import { z } from 'zod';
import { SEARCH_SYNONYM_TYPE } from '@vubon/shared-constants/platform';

export const SearchSynonymTypeSchema = z.enum(
  Object.values(SEARCH_SYNONYM_TYPE) as [string, ...string[]]
);

export const SearchSynonymSchema = z.object({
  id: z.string().min(1),
  term: z.string().min(1).max(100),
  synonyms: z.array(z.string().min(1).max(100)).min(1).max(50),
  type: SearchSynonymTypeSchema,
  language: z.string().min(2).max(10),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type SearchSynonymTypeSchemaType = z.infer<typeof SearchSynonymTypeSchema>;
export type SearchSynonymSchemaType = z.infer<typeof SearchSynonymSchema>;
