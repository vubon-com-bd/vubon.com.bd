/**
 * SEO Ranking Types
 * @module shared-types/platform/seo
 */

import type { SEO_RANKING_TYPE } from '@vubon/shared-constants/platform';

export type SeoRankingTypeValue = (typeof SEO_RANKING_TYPE)[keyof typeof SEO_RANKING_TYPE];

export interface SeoRanking {
  readonly id: string;
  readonly keywordId: string;
  readonly keyword: string;
  readonly type: SeoRankingTypeValue;
  readonly position: number;
  readonly previousPosition?: number;
  readonly change?: number;
  readonly url?: string;
  readonly searchEngine: string;
  readonly location?: string;
  readonly device?: string;
  readonly checkedAt: string;
}

export interface SeoRankingHistory {
  readonly keywordId: string;
  readonly entries: readonly {
    readonly position: number;
    readonly checkedAt: string;
  }[];
}
