import { BaseEntity } from '../../common/base.types';
import { SEO_RANKING } from '@vubon/shared-constants/src/platform/seo/seo-ranking.constants';
import { SEOKeyword } from './seo-keyword.types';
import { SEOScore } from './seo-score.types';

export interface SEORanking extends BaseEntity {
  rankingId: string;
  keywordId: string;
  keyword: SEOKeyword;
  type: keyof typeof SEO_RANKING.TYPES | string;
  position: number;
  previousPosition?: number;
  change: number;
  url: string;
  score: SEOScore;
  isTop3: boolean;
  isTop10: boolean;
  isTop20: boolean;
  isTop50: boolean;
  isTop100: boolean;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
