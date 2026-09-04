/**
 * Deal Analytics Types
 * ডিল অ্যানালিটিক্স সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface DealAnalytics extends BaseEntity {
  dealId: string;
  views: number;
  uniqueViews: number;
  clicks: number;
  addToCarts: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
  averageOrderValue: number;
  bounceRate: number;
  averageTimeOnPage: number;
  clickThroughRate: number;
  sellThroughRate: number;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly';
  date: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface DealAnalyticsCreateInput {
  dealId: string;
  views?: number;
  uniqueViews?: number;
  clicks?: number;
  addToCarts?: number;
  conversions?: number;
  revenue?: number;
  conversionRate?: number;
  averageOrderValue?: number;
  bounceRate?: number;
  averageTimeOnPage?: number;
  clickThroughRate?: number;
  sellThroughRate?: number;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly';
  date: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface DealAnalyticsResponse {
  dealAnalytics: DealAnalytics;
}

export interface DealAnalyticsSummary {
  totalViews: number;
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
  conversionRate: number;
  averageOrderValue: number;
}
