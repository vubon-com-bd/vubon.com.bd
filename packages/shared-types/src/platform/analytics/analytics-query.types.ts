import { BaseEntity } from '../../common/base.types';
import { ANALYTICS_QUERY } from '@vubon/shared-constants/src/platform/analytics/analytics-query.constants';
import { Analytics } from './analytics.types';

export interface AnalyticsQuery extends BaseEntity {
  queryId: string;
  analyticsId: string;
  analytics: Analytics;
  type: keyof typeof ANALYTICS_QUERY.TYPES | string;
  metric: keyof typeof ANALYTICS_QUERY.QUERY_OPERATIONS | string;
  dimensions: string[];
  granularity: keyof typeof ANALYTICS_QUERY.TIME_GRANULARITY | string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
