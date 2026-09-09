import { BaseEntity } from '../../common/base.types';
import { SEO_ANALYTICS } from '@vubon/shared-constants/src/platform/seo/seo-analytics.constants';
import { SEOKeyword } from './seo-keyword.types';
import { SEORanking } from './seo-ranking.types';
import { SEOScore } from './seo-score.types';

export interface SEOAnalytics extends BaseEntity {
  analyticsId: string;
  type: keyof typeof SEO_ANALYTICS.TYPES | string;
  metric: keyof typeof SEO_ANALYTICS.METRICS | string;
  value: number;
  keyword: SEOKeyword;
  ranking: SEORanking;
  score: SEOScore;
  period: keyof typeof SEO_ANALYTICS.ANALYTICS_GRANULARITY | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
