/**
 * AI Embedding Schema
 * @module shared-schemas/ai
 *
 * Values আসে shared-constants/ai/ai-embedding.constants থেকে।
 *
 * ⚠️ Note: AI_EMBEDDING_DIMENSION numeric — z.enum() string-only,
 * তাই z.number().refine() দিয়ে validate করা হয়েছে।
 */

import { z } from 'zod';
import { AI_EMBEDDING_TYPE, AI_EMBEDDING_DIMENSION } from '@vubon/shared-constants/ai';

export const AiEmbeddingTypeSchema = z.enum(
  Object.values(AI_EMBEDDING_TYPE) as [string, ...string[]]
);

const AI_EMBEDDING_DIMENSION_VALUES = Object.values(AI_EMBEDDING_DIMENSION) as number[];

export const AiEmbeddingDimensionSchema = z
  .number()
  .int()
  .positive()
  .refine((val) => AI_EMBEDDING_DIMENSION_VALUES.includes(val), {
    message: 'Unsupported embedding dimension',
  });

export const AiEmbeddingSchema = z.object({
  id: z.string().min(1),
  type: AiEmbeddingTypeSchema,
  model: z.string().min(1).max(100),
  dimension: z.number().int().positive().max(10000),
  vector: z.array(z.number()).max(10000),
  sourceId: z.string().max(100).optional(),
  sourceType: z.string().max(50).optional(),
  content: z.string().max(50000).optional(),
  tokens: z.number().int().nonnegative().optional(),
  normalized: z.boolean(),
  createdAt: z.string().datetime(),
});

export const AiEmbeddingRequestSchema = z.object({
  input: z.union([z.string().min(1).max(50000), z.array(z.string().min(1).max(50000)).max(2048)]),
  type: AiEmbeddingTypeSchema,
  model: z.string().max(100).optional(),
});

export const AiEmbeddingResultSchema = z.object({
  embeddings: z.array(z.array(z.number())).max(2048),
  dimension: z.number().int().positive(),
  model: z.string().min(1),
  tokens: z.number().int().nonnegative(),
  took: z.number().nonnegative(),
});

export type AiEmbeddingTypeSchemaType = z.infer<typeof AiEmbeddingTypeSchema>;
export type AiEmbeddingDimensionSchemaType = z.infer<typeof AiEmbeddingDimensionSchema>;
export type AiEmbeddingSchemaType = z.infer<typeof AiEmbeddingSchema>;
export type AiEmbeddingRequestSchemaType = z.infer<typeof AiEmbeddingRequestSchema>;
export type AiEmbeddingResultSchemaType = z.infer<typeof AiEmbeddingResultSchema>;
