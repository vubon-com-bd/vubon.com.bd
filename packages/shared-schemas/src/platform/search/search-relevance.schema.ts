/**
 * Search Relevance Schema
 * @module shared-schemas/platform/search
 *
 * Values আসে shared-constants/platform/search-relevance.constants থেকে।
 */

import { z } from 'zod';
import { SEARCH_RELEVANCE_ALGORITHM } from '@vubon/shared-constants/platform';

export const SearchRelevanceAlgorithmSchema = z.enum(
  Object.values(SEARCH_RELEVANCE_ALGORITHM) as [string, ...string[]]
);

export const SearchRelevanceSchema = z.object({
  algorithm: SearchRelevanceAlgorithmSchema,
  score: z.number(),
  explanation: z.record(z.string(), z.number()).optional(),
  personalized: z.boolean(),
  diversityFactor: z.number().min(0).max(1).optional(),
  freshnessBoost: z.boolean().optional(),
});

export const SearchScoreBreakdownSchema = z.object({
  field: z.string().min(1).max(100),
  score: z.number(),
  boost: z.number(),
  weightedScore: z.number(),
});

export type SearchRelevanceAlgorithmSchemaType = z.infer<typeof SearchRelevanceAlgorithmSchema>;
export type SearchRelevanceSchemaType = z.infer<typeof SearchRelevanceSchema>;
export type SearchScoreBreakdownSchemaType = z.infer<typeof SearchScoreBreakdownSchema>;
