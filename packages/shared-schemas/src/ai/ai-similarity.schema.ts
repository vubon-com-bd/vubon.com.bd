/**
 * AI Similarity Schema
 * @module shared-schemas/ai
 *
 * Values আসে shared-constants/ai/ai-similarity.constants থেকে।
 *
 * ⚠️ Note: AI_SIMILARITY_THRESHOLD numeric — z.enum() string-only।
 */

import { z } from 'zod';
import { AI_SIMILARITY_METRIC, AI_SIMILARITY_THRESHOLD } from '@vubon/shared-constants/ai';

export const AiSimilarityMetricSchema = z.enum(
  Object.values(AI_SIMILARITY_METRIC) as [string, ...string[]]
);

const AI_SIMILARITY_THRESHOLD_VALUES = Object.values(AI_SIMILARITY_THRESHOLD) as number[];

export const AiSimilarityThresholdSchema = z
  .number()
  .min(0)
  .max(1)
  .refine((val) => AI_SIMILARITY_THRESHOLD_VALUES.includes(val), {
    message: 'Unsupported similarity threshold',
  });

export const AiSimilarityRequestSchema = z.object({
  sourceId: z.string().min(1),
  targetIds: z.array(z.string().min(1)).min(1).max(1000),
  metric: AiSimilarityMetricSchema.optional(),
  threshold: z.number().min(0).max(1).optional(),
});

export const AiSimilarityMatchSchema = z.object({
  id: z.string().min(1),
  score: z.number().min(0).max(1),
  rank: z.number().int().positive(),
});

export const AiSimilarityResultSchema = z.object({
  matches: z.array(AiSimilarityMatchSchema).max(1000),
  metric: AiSimilarityMetricSchema,
  took: z.number().nonnegative(),
});

export const AiSimilarityPairSchema = z.object({
  idA: z.string().min(1),
  idB: z.string().min(1),
  score: z.number().min(0).max(1),
});

export type AiSimilarityMetricSchemaType = z.infer<typeof AiSimilarityMetricSchema>;
export type AiSimilarityThresholdSchemaType = z.infer<typeof AiSimilarityThresholdSchema>;
export type AiSimilarityRequestSchemaType = z.infer<typeof AiSimilarityRequestSchema>;
export type AiSimilarityResultSchemaType = z.infer<typeof AiSimilarityResultSchema>;
export type AiSimilarityPairSchemaType = z.infer<typeof AiSimilarityPairSchema>;
