import { BaseEntity } from '../../common/base.types';
import { ANALYTICS_RESULT } from '@vubon/shared-constants/src/platform/analytics/analytics-result.constants';
import { Analytics } from './analytics.types';
import { AnalyticsQuery } from './analytics-query.types';

export interface AnalyticsResult extends BaseEntity {
  resultId: string;
  analyticsId: string;
  analytics: Analytics;
  queryId: string;
  query: AnalyticsQuery;
  type: keyof typeof ANALYTICS_RESULT.TYPES | string;
  format: keyof typeof ANALYTICS_RESULT.RESULT_FORMATS | string;
  data: unknown;
  rowCount: number;
  isCached: boolean;
  cachedAt?: Date;
  metadata: Record<string, unknown>;
}
