import { BaseEntity } from '../../common/base.types';
import { METRICS } from '@vubon/shared-constants/src/common/types.constants';
import { Vendor } from './vendor.types';

export interface BusinessVendorAnalytics extends BaseEntity {
  analyticsId: string;
  vendorId: string;
  vendor: Vendor;
  metric: keyof typeof METRICS | string;
  value: number;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  timestamp: Date;
  metadata: Record<string, unknown>;
}

export interface VendorAnalyticsSummary {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: number;
  bounceRate: number;
  averageSessionDuration: number;
  conversionRate: number;
  averageOrderValue: number;
  totalRevenue: number;
  totalOrders: number;
  totalCommission: number;
}
