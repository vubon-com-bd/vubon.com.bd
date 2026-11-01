/**
 * Search Relevance Types
 * @module shared-types/platform/search
 */

import type { SEARCH_RELEVANCE_ALGORITHM } from '@vubon/shared-constants/platform';

export type SearchRelevanceAlgorithmValue =
  (typeof SEARCH_RELEVANCE_ALGORITHM)[keyof typeof SEARCH_RELEVANCE_ALGORITHM];

export interface SearchRelevance {
  readonly algorithm: SearchRelevanceAlgorithmValue;
  readonly score: number;
  readonly explanation?: Readonly<Record<string, number>>;
  readonly personalized: boolean;
  readonly diversityFactor?: number;
  readonly freshnessBoost?: boolean;
}

export interface SearchScoreBreakdown {
  readonly field: string;
  readonly score: number;
  readonly boost: number;
  readonly weightedScore: number;
}
