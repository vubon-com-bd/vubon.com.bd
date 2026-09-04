/**
 * Flash Sale Analytics Types
 * ফ্ল্যাশ সেল অ্যানালিটিক্স সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface FlashSaleAnalytics extends BaseEntity {
  flashSaleId: string;
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
  inventoryTurnover: number;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly';
  date: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashSaleAnalyticsCreateInput {
  flashSaleId: string;
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
  inventoryTurnover?: number;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly';
  date: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleAnalyticsResponse {
  flashSaleAnalytics: FlashSaleAnalytics;
}

export interface FlashSaleAnalyticsSummary {
  totalViews: number;
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
  conversionRate: number;
  averageOrderValue: number;
}
