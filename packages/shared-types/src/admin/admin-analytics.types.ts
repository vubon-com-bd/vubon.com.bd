import { METRICS } from '@vubon/shared-constants';
import { Admin } from './admin.types';

export interface AdminAnalytics {
  analyticsId: string;
  adminId: string;
  admin: Admin;
  metric: keyof typeof METRICS;
  value: number;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  timestamp: Date;
  metadata: Record<string, unknown>;
}
