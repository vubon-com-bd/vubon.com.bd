import { Filter } from '../../common/filter.types';
import { ANALYTICS_FILTER } from '@vubon/shared-constants/src/platform/analytics/analytics-filter.constants';
import { Analytics } from './analytics.types';

export interface AnalyticsFilter extends Filter {
  filterId: string;
  analyticsId: string;
  analytics: Analytics;
  type: keyof typeof ANALYTICS_FILTER.TYPES | string;
  operator: keyof typeof ANALYTICS_FILTER.FILTER_OPERATORS | string;
  field: string;
  value: unknown;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
