import { BaseEntity } from '../../common/base.types';
import { SEARCH_ANALYTICS } from '@vubon/shared-constants/src/platform/search/search-analytics.constants';

export interface PopularQuery {
  query: string;
  count: number;
  resultCount: number;
  clickRate: number;
}

export interface SearchAnalyticsSummary {
  totalSearches: number;
  uniqueSearches: number;
  zeroResults: number;
  clickThroughRate: number;
  conversionRate: number;
  averageClickPosition: number;
  averageSearchTime: number;
  popularQueries: PopularQuery[];
  fallbackQueries: string[];
}

export interface SearchAnalytics extends BaseEntity {
  analyticsId: string;
  type: keyof typeof SEARCH_ANALYTICS.TYPES | string;
  metric: keyof typeof SEARCH_ANALYTICS.METRICS | string;
  value: number;
  query?: string;
  userId?: string;
  sessionId?: string;
  ipAddress?: string;
  period: keyof typeof SEARCH_ANALYTICS.ANALYTICS_GRANULARITY | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
