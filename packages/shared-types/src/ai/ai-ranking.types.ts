/**
 * AI Ranking Types
 * @module shared-types/ai
 *
 * Values আসে shared-constants/ai/ai-ranking.constants থেকে।
 */

import type { AI_RANKING_ALGORITHM, AI_RANKING_FEATURE } from '@vubon/shared-constants/ai';

export type AiRankingAlgorithmValue =
  (typeof AI_RANKING_ALGORITHM)[keyof typeof AI_RANKING_ALGORITHM];

export type AiRankingFeatureValue = (typeof AI_RANKING_FEATURE)[keyof typeof AI_RANKING_FEATURE];

export interface AiRankingRequest {
  readonly sourceType: string;
  readonly candidateIds: readonly string[];
  readonly algorithm?: AiRankingAlgorithmValue;
  readonly features?: readonly AiRankingFeatureValue[];
  readonly topK?: number;
  readonly userId?: string;
}

export interface AiRankingResult {
  readonly ranked: readonly AiRankingItem[];
  readonly algorithm: AiRankingAlgorithmValue;
  readonly took: number;
}

export interface AiRankingItem {
  readonly id: string;
  readonly score: number;
  readonly rank: number;
  readonly features?: Readonly<Record<string, number>>;
}
