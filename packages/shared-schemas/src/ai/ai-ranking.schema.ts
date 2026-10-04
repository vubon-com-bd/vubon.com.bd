/**
 * AI Ranking Schema
 * @module shared-schemas/ai
 *
 * Values আসে shared-constants/ai/ai-ranking.constants থেকে।
 */

import { z } from 'zod';
import { AI_RANKING_ALGORITHM, AI_RANKING_FEATURE } from '@vubon/shared-constants/ai';

export const AiRankingAlgorithmSchema = z.enum(
  Object.values(AI_RANKING_ALGORITHM) as [string, ...string[]]
);

export const AiRankingFeatureSchema = z.enum(
  Object.values(AI_RANKING_FEATURE) as [string, ...string[]]
);

export const AiRankingRequestSchema = z.object({
  sourceType: z.string().min(1).max(50),
  candidateIds: z.array(z.string().min(1)).min(1).max(1000),
  algorithm: AiRankingAlgorithmSchema.optional(),
  features: z.array(AiRankingFeatureSchema).max(20).optional(),
  topK: z.number().int().min(1).max(1000).optional(),
  userId: z.string().optional(),
});

export const AiRankingItemSchema = z.object({
  id: z.string().min(1),
  score: z.number().min(0).max(1),
  rank: z.number().int().positive(),
  features: z.record(z.string(), z.number()).optional(),
});

export const AiRankingResultSchema = z.object({
  ranked: z.array(AiRankingItemSchema).max(1000),
  algorithm: AiRankingAlgorithmSchema,
  took: z.number().nonnegative(),
});

export type AiRankingAlgorithmSchemaType = z.infer<typeof AiRankingAlgorithmSchema>;
export type AiRankingFeatureSchemaType = z.infer<typeof AiRankingFeatureSchema>;
export type AiRankingRequestSchemaType = z.infer<typeof AiRankingRequestSchema>;
export type AiRankingResultSchemaType = z.infer<typeof AiRankingResultSchema>;
