import { BaseEntity } from '../common/base.types';
import { METRICS } from '@vubon/shared-constants/src/common/types.constants';
import { AnalyticsPeriod } from '@vubon/shared-constants/src/admin/admin-analytics.constants';

/**
 * Metric name value — from METRICS
 */
export type AdminMetricName = (typeof METRICS)[keyof typeof METRICS];

/**
 * Re-export AnalyticsPeriod for convenience.
 * Source of truth: shared-constants/admin/admin-analytics.constants
 */
export type { AnalyticsPeriod };

/**
 * Admin analytics interface
 *
 * Design notes:
 * - `adminId` only — no Admin summary embed (analytics rows are numerous).
 * - `metric` + `value` + `period` + `timestamp` fully describe a data point.
 */
export interface AdminAnalytics extends BaseEntity {
  analyticsId: string;
  adminId: string;
  metric: AdminMetricName;
  value: number;
  period: AnalyticsPeriod;
  timestamp: Date;
}
