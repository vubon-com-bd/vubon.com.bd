import { BaseEntity } from '../../common/base.types';
import { ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/analytics.constants';
import { AnalyticsQuery } from './analytics-query.types';
import { AnalyticsResult } from './analytics-result.types';
import { AnalyticsFilter } from './analytics-filter.types';
import { AnalyticsGroup } from './analytics-group.types';
import { AnalyticsSort } from './analytics-sort.types';
import { AnalyticsPagination } from './analytics-pagination.types';

export interface AnalyticsMetadata {
  timezone: string;
  locale: string;
  cacheKey?: string;
  cacheTtl: number;
  queryTime: number;
  resultCount: number;
}

export interface Analytics extends BaseEntity {
  analyticsId: string;
  type: keyof typeof ANALYTICS.ANALYTICS_TYPES | string;
  queries: AnalyticsQuery[];
  results: AnalyticsResult[];
  filters: AnalyticsFilter[];
  groups: AnalyticsGroup[];
  sorts: AnalyticsSort[];
  pagination: AnalyticsPagination;
  status: keyof typeof ANALYTICS.STATUS | string;
  isActive: boolean;
  metadata: AnalyticsMetadata;
}
