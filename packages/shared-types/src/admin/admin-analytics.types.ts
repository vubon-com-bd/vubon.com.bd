import { BaseEntity } from '../common/base.types';
import { METRICS } from '@vubon/shared-constants/src/common/types.constants';
import { AdminPublic } from './admin.types';

/**
 * Metric name value
 */
export type AdminMetricName = (typeof METRICS)[keyof typeof METRICS];

/**
 * Analytics period
 */
export type AnalyticsPeriod = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';

/**
 * Admin analytics interface
 */
export interface AdminAnalytics extends BaseEntity {
  analyticsId: string;
  adminId: string;
  admin: AdminPublic;
  metric: AdminMetricName;
  value: number;
  period: AnalyticsPeriod;
  timestamp: Date;
}
