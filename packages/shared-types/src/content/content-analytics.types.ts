import { BaseEntity } from '../common/base.types';
import { CONTENT_ANALYTICS } from '@vubon/shared-constants/src/content/content-analytics.constants';
import { Content } from './content.types';

export interface ContentAnalyticsSummary {
  totalViews: number;
  uniqueViews: number;
  averageReadTime: number;
  bounceRate: number;
  shareCount: number;
  commentCount: number;
  reactionCount: number;
  conversionRate: number;
}

export interface ContentAnalytics extends BaseEntity {
  analyticsId: string;
  contentId: string;
  content: Content;
  type: keyof typeof CONTENT_ANALYTICS.TYPES | string;
  metric: keyof typeof CONTENT_ANALYTICS.METRICS | string;
  value: number;
  period: keyof typeof CONTENT_ANALYTICS.ANALYTICS_GRANULARITY | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
