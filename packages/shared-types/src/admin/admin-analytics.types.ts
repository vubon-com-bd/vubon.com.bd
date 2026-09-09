import { BaseEntity } from '../common/base.types';
import { METRICS } from '@vubon/shared-constants/src/common/types.constants';
import { Admin } from './admin.types';

/**
 * Admin analytics interface
 */
export interface AdminAnalytics extends BaseEntity {
  analyticsId: string;
  adminId: string;
  admin: Admin;
  metric: keyof typeof METRICS;
  value: number;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  timestamp: Date;
  metadata: Record<string, unknown>;
}
