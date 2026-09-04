/**
 * Vendor Analytics Types
 * ভেন্ডর অ্যানালিটিক্স সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';

export interface VendorAnalytics extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  date: Date;
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
  metrics: Record<string, number>;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorAnalyticsCreateInput {
  vendorId: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  date: Date;
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
  metrics?: Record<string, number>;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorAnalyticsUpdateInput {
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
  metrics?: Record<string, number>;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorAnalyticsResponse {
  vendorAnalytics: VendorAnalytics;
}
