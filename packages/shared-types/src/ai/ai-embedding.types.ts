/**
 * AI Embedding Types
 * @module shared-types/ai
 *
 * Values আসে shared-constants/ai/ai-embedding.constants থেকে।
 */

import type { AI_EMBEDDING_TYPE, AI_EMBEDDING_DIMENSION } from '@vubon/shared-constants/ai';

export type AiEmbeddingTypeValue = (typeof AI_EMBEDDING_TYPE)[keyof typeof AI_EMBEDDING_TYPE];

export type AiEmbeddingDimensionValue =
  (typeof AI_EMBEDDING_DIMENSION)[keyof typeof AI_EMBEDDING_DIMENSION];

export interface AiEmbedding {
  readonly id: string;
  readonly type: AiEmbeddingTypeValue;
  readonly model: string;
  readonly dimension: AiEmbeddingDimensionValue;
  readonly vector: readonly number[];
  readonly sourceId?: string;
  readonly sourceType?: string;
  readonly content?: string;
  readonly tokens?: number;
  readonly normalized: boolean;
  readonly createdAt: string;
}

export interface AiEmbeddingRequest {
  readonly input: string | readonly string[];
  readonly type: AiEmbeddingTypeValue;
  readonly model?: string;
}

export interface AiEmbeddingResult {
  readonly embeddings: readonly (readonly number[])[];
  readonly dimension: number;
  readonly model: string;
  readonly tokens: number;
  readonly took: number;
}
