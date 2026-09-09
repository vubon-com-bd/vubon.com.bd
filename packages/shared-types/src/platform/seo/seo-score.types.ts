import { BaseEntity } from '../../common/base.types';
import { SEO_SCORE } from '@vubon/shared-constants/src/platform/seo/seo-score.constants';
import { SEO } from './seo.types';

export interface SEOScore extends BaseEntity {
  scoreId: string;
  seoId: string;
  seo: SEO;
  type: keyof typeof SEO_SCORE.TYPES | string;
  value: number;
  range: keyof typeof SEO_SCORE.SCORE_RANGES | string;
  weight: keyof typeof SEO_SCORE.SCORE_WEIGHTS | string;
  isGood: boolean;
  isExcellent: boolean;
  isPoor: boolean;
  timestamp: Date;
  metadata: Record<string, unknown>;
}

export type SEOScoreKey = keyof typeof SEO_SCORE.TYPES;
