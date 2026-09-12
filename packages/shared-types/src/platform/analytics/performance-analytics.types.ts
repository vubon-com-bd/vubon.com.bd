import { BaseEntity } from '../../common/base.types';
import { PERFORMANCE_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/performance-analytics.constants';

export interface PerformanceAnalytics extends BaseEntity {
  analyticsId: string;
  type: keyof typeof PERFORMANCE_ANALYTICS.TYPES | string;
  metric: keyof typeof PERFORMANCE_ANALYTICS.METRICS | string;
  value: number;
  threshold: keyof typeof PERFORMANCE_ANALYTICS.PERFORMANCE_THRESHOLDS | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
