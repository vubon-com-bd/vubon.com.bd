import { Sort } from '../../common/sort.types';
import { ANALYTICS_SORT } from '@vubon/shared-constants/src/platform/analytics/analytics-sort.constants';
import { Analytics } from './analytics.types';

export interface AnalyticsSort extends Sort {
  sortId: string;
  analyticsId: string;
  analytics: Analytics;
  type: keyof typeof ANALYTICS_SORT.TYPES | string;
  field: string;
  direction: keyof typeof ANALYTICS_SORT.DEFAULT_SORT_DIRECTION | string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
