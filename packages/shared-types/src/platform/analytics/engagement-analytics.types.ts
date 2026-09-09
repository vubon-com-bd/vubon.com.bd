import { BaseEntity } from '../../common/base.types';
import { ENGAGEMENT_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/engagement-analytics.constants';

export interface EngagementAnalytics extends BaseEntity {
  analyticsId: string;
  type: keyof typeof ENGAGEMENT_ANALYTICS.TYPES | string;
  metric: keyof typeof ENGAGEMENT_ANALYTICS.METRICS | string;
  value: number;
  score: keyof typeof ENGAGEMENT_ANALYTICS.ENGAGEMENT_SCORES | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
