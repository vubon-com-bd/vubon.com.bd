import { BaseEntity } from '../../common/base.types';
import { RETENTION_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/retention-analytics.constants';

export interface RetentionAnalytics extends BaseEntity {
  analyticsId: string;
  type: keyof typeof RETENTION_ANALYTICS.TYPES | string;
  metric: keyof typeof RETENTION_ANALYTICS.METRICS | string;
  value: number;
  period: keyof typeof RETENTION_ANALYTICS.RETENTION_PERIODS | string;
  reason: keyof typeof RETENTION_ANALYTICS.CHURN_REASONS | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
