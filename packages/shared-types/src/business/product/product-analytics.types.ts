/**
 * Product Analytics Types
 * প্রোডাক্ট অ্যানালিটিক্স সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface ProductAnalytics extends BaseEntity {
  productId: string;
  views: number;
  uniqueViews: number;
  addToCarts: number;
  wishlists: number;
  shares: number;
  orders: number;
  revenue: number;
  conversionRate: number;
  averageOrderValue: number;
  bounceRate: number;
  averageTimeOnPage: number;
  clickThroughRate: number;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductAnalyticsCreateInput {
  productId: string;
  views?: number;
  uniqueViews?: number;
  addToCarts?: number;
  wishlists?: number;
  shares?: number;
  orders?: number;
  revenue?: number;
  conversionRate?: number;
  averageOrderValue?: number;
  bounceRate?: number;
  averageTimeOnPage?: number;
  clickThroughRate?: number;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  date: Date;
}

export interface ProductAnalyticsResponse {
  analytics: ProductAnalytics;
}

export interface ProductAnalyticsSummary {
  productId: string;
  totalViews: number;
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
  reviewCount: number;
  wishlistCount: number;
  shareCount: number;
  conversionRate: number;
}
