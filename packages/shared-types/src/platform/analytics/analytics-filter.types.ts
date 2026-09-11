import { Filter } from '../../common/filter.types';
import { ANALYTICS_FILTER } from '@vubon/shared-constants/src/platform/analytics/analytics-filter.constants';
import { Analytics } from './analytics.types';

/**
 * Analytics filter type — derived from ANALYTICS_FILTER.TYPES values
 */
export type AnalyticsFilterType =
  (typeof ANALYTICS_FILTER.TYPES)[keyof typeof ANALYTICS_FILTER.TYPES];

/**
 * Analytics filter operator — derived from ANALYTICS_FILTER.FILTER_OPERATORS values
 */
export type AnalyticsFilterOperator =
  (typeof ANALYTICS_FILTER.FILTER_OPERATORS)[keyof typeof ANALYTICS_FILTER.FILTER_OPERATORS];

/**
 * Analytics filter interface
 * Uses Omit<Filter, 'operator'> because `operator` is a more specific union here.
 */
export interface AnalyticsFilter extends Omit<Filter, 'operator'> {
  filterId: string;
  analyticsId: string;
  analytics: Analytics;
  type: AnalyticsFilterType;
  operator: AnalyticsFilterOperator;
  field: string;
  value: unknown;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
