/**
 * AI Similarity Types
 * @module shared-types/ai
 *
 * Values আসে shared-constants/ai/ai-similarity.constants থেকে।
 */

import type { AI_SIMILARITY_METRIC, AI_SIMILARITY_THRESHOLD } from '@vubon/shared-constants/ai';

export type AiSimilarityMetricValue =
  (typeof AI_SIMILARITY_METRIC)[keyof typeof AI_SIMILARITY_METRIC];

export type AiSimilarityThresholdValue =
  (typeof AI_SIMILARITY_THRESHOLD)[keyof typeof AI_SIMILARITY_THRESHOLD];

export interface AiSimilarityRequest {
  readonly sourceId: string;
  readonly targetIds: readonly string[];
  readonly metric?: AiSimilarityMetricValue;
  readonly threshold?: number;
}

export interface AiSimilarityResult {
  readonly matches: readonly AiSimilarityMatch[];
  readonly metric: AiSimilarityMetricValue;
  readonly took: number;
}

export interface AiSimilarityMatch {
  readonly id: string;
  readonly score: number;
  readonly rank: number;
}

export interface AiSimilarityPair {
  readonly idA: string;
  readonly idB: string;
  readonly score: number;
}
