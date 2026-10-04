/**
 * SEO Score Types
 * @module shared-types/platform/seo
 */

import type { SEO_SCORE_GRADE, SEO_SCORE_WEIGHT } from '@vubon/shared-constants/platform';

export type SeoScoreGradeValue = (typeof SEO_SCORE_GRADE)[keyof typeof SEO_SCORE_GRADE];

export type SeoScoreWeight = typeof SEO_SCORE_WEIGHT;

export interface SeoScore {
  readonly overall: number;
  readonly grade: SeoScoreGradeValue;
  readonly content: number;
  readonly technical: number;
  readonly performance: number;
  readonly mobile: number;
  readonly backlinks: number;
  readonly calculatedAt: string;
}

export interface SeoScoreBreakdown {
  readonly category: keyof SeoScoreWeight;
  readonly score: number;
  readonly weight: number;
  readonly weightedScore: number;
}
