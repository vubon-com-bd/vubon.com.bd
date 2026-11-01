/**
 * AI Vector Types
 * @module shared-types/ai
 *
 * Values আসে shared-constants/ai/ai-vector.constants থেকে।
 */

import type {
  AI_VECTOR_DB,
  AI_VECTOR_INDEX_TYPE,
  AI_VECTOR_METRIC,
} from '@vubon/shared-constants/ai';

export type AiVectorDbValue = (typeof AI_VECTOR_DB)[keyof typeof AI_VECTOR_DB];

export type AiVectorIndexTypeValue =
  (typeof AI_VECTOR_INDEX_TYPE)[keyof typeof AI_VECTOR_INDEX_TYPE];

export type AiVectorMetricValue = (typeof AI_VECTOR_METRIC)[keyof typeof AI_VECTOR_METRIC];

export interface AiVector {
  readonly id: string;
  readonly vector: readonly number[];
  readonly dimension: number;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly namespace?: string;
  readonly createdAt: string;
}

export interface AiVectorIndex {
  readonly name: string;
  readonly db: AiVectorDbValue;
  readonly indexType: AiVectorIndexTypeValue;
  readonly metric: AiVectorMetricValue;
  readonly dimension: number;
  readonly vectorCount: number;
  readonly isReady: boolean;
}

export interface AiVectorSearchInput {
  readonly vector: readonly number[];
  readonly topK: number;
  readonly metric?: AiVectorMetricValue;
  readonly filter?: Readonly<Record<string, unknown>>;
}

export interface AiVectorSearchResult {
  readonly matches: readonly AiVectorMatch[];
  readonly took: number;
}

export interface AiVectorMatch {
  readonly id: string;
  readonly score: number;
  readonly metadata?: Readonly<Record<string, unknown>>;
}
