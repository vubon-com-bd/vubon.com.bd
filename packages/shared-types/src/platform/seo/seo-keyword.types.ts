/**
 * SEO Keyword Types
 * @module shared-types/platform/seo
 */

import type {
  SEO_KEYWORD_TYPE,
  SEO_KEYWORD_DIFFICULTY,
  SEO_KEYWORD_INTENT,
} from '@vubon/shared-constants/platform';

export type SeoKeywordTypeValue = (typeof SEO_KEYWORD_TYPE)[keyof typeof SEO_KEYWORD_TYPE];

export type SeoKeywordDifficultyValue =
  (typeof SEO_KEYWORD_DIFFICULTY)[keyof typeof SEO_KEYWORD_DIFFICULTY];

export type SeoKeywordIntentValue = (typeof SEO_KEYWORD_INTENT)[keyof typeof SEO_KEYWORD_INTENT];

export interface SeoKeyword {
  readonly id: string;
  readonly keyword: string;
  readonly type: SeoKeywordTypeValue;
  readonly difficulty: SeoKeywordDifficultyValue;
  readonly intent: SeoKeywordIntentValue;
  readonly searchVolume?: number;
  readonly competition?: number;
  readonly cpc?: number;
  readonly currentRank?: number;
  readonly targetRank?: number;
  readonly pageUrl?: string;
  readonly lastCheckedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface SeoKeywordPublic {
  readonly id: string;
  readonly keyword: string;
  readonly type: SeoKeywordTypeValue;
  readonly searchVolume?: number;
  readonly currentRank?: number;
}
