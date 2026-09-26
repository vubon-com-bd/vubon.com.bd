/**
 * Autocomplete Schema
 * @module shared-schemas/platform/search
 *
 * Values আসে shared-constants/platform/autocomplete.constants থেকে।
 */

import { z } from 'zod';
import { AUTOCOMPLETE_TYPE } from '@vubon/shared-constants/platform';

export const AutocompleteTypeSchema = z.enum(
  Object.values(AUTOCOMPLETE_TYPE) as [string, ...string[]]
);

export const AutocompleteSuggestionSchema = z.object({
  text: z.string().min(1).max(200),
  type: AutocompleteTypeSchema,
  score: z.number().nonnegative(),
  highlightedText: z.string().max(200).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const AutocompleteRequestSchema = z.object({
  query: z.string().min(2).max(100),
  types: z.array(AutocompleteTypeSchema).max(10).optional(),
  limit: z.number().int().min(1).max(50).optional(),
  fuzzy: z.boolean().optional(),
});

export const AutocompleteResponseSchema = z.object({
  query: z.string().min(1).max(200),
  suggestions: z.array(AutocompleteSuggestionSchema).max(10),
  took: z.number().nonnegative(),
  cached: z.boolean(),
});

export type AutocompleteTypeSchemaType = z.infer<typeof AutocompleteTypeSchema>;
export type AutocompleteSuggestionSchemaType = z.infer<typeof AutocompleteSuggestionSchema>;
export type AutocompleteResponseSchemaType = z.infer<typeof AutocompleteResponseSchema>;
