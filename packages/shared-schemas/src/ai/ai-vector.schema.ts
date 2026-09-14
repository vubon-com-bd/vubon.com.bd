/**
 * AI Vector Schema
 * @module shared-schemas/ai
 *
 * Values আসে shared-constants/ai/ai-vector.constants থেকে।
 */

import { z } from 'zod';
import { AI_VECTOR_DB, AI_VECTOR_INDEX_TYPE, AI_VECTOR_METRIC } from '@vubon/shared-constants/ai';

export const AiVectorDbSchema = z.enum(Object.values(AI_VECTOR_DB) as [string, ...string[]]);

export const AiVectorIndexTypeSchema = z.enum(
  Object.values(AI_VECTOR_INDEX_TYPE) as [string, ...string[]]
);

export const AiVectorMetricSchema = z.enum(
  Object.values(AI_VECTOR_METRIC) as [string, ...string[]]
);

export const AiVectorSchema = z.object({
  id: z.string().min(1),
  vector: z.array(z.number()).min(1).max(10000),
  dimension: z.number().int().positive().max(10000),
  metadata: z.record(z.string(), z.unknown()).optional(),
  namespace: z.string().max(100).optional(),
  createdAt: z.string().datetime(),
});

export const AiVectorIndexSchema = z.object({
  name: z.string().min(1).max(100),
  db: AiVectorDbSchema,
  indexType: AiVectorIndexTypeSchema,
  metric: AiVectorMetricSchema,
  dimension: z.number().int().positive().max(10000),
  vectorCount: z.number().int().nonnegative(),
  isReady: z.boolean(),
});

export const AiVectorSearchInputSchema = z.object({
  vector: z.array(z.number()).min(1).max(10000),
  topK: z.number().int().min(1).max(1000),
  metric: AiVectorMetricSchema.optional(),
  filter: z.record(z.string(), z.unknown()).optional(),
});

export const AiVectorMatchSchema = z.object({
  id: z.string().min(1),
  score: z.number(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const AiVectorSearchResultSchema = z.object({
  matches: z.array(AiVectorMatchSchema).max(1000),
  took: z.number().nonnegative(),
});

export type AiVectorDbSchemaType = z.infer<typeof AiVectorDbSchema>;
export type AiVectorIndexTypeSchemaType = z.infer<typeof AiVectorIndexTypeSchema>;
export type AiVectorMetricSchemaType = z.infer<typeof AiVectorMetricSchema>;
export type AiVectorSchemaType = z.infer<typeof AiVectorSchema>;
export type AiVectorSearchResultSchemaType = z.infer<typeof AiVectorSearchResultSchema>;
