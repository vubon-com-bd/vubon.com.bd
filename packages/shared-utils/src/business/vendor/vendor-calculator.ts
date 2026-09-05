/**
 * Vendor Calculator
 * ভেন্ডর ক্যালকুলেটর
 */

import type { Vendor } from '@vubon/shared-types';

export interface VendorMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  customerSatisfaction: number;
  productRating: number;
  orderCompletion: number;
  shippingTime: number;
  responseTime: number;
}

export const calculateVendorMetrics = (vendor: Vendor): VendorMetrics => {
  const revenue = vendor.revenue || 0;
  const orders = vendor.orderCount || 0;
  const rating = vendor.rating || 0;

  const averageOrderValue = orders > 0 ? revenue / orders : 0;
  const conversionRate = orders > 0 ? (orders / (vendor.productCount || 1)) * 100 : 0;

  return {
    totalRevenue: Math.round(revenue * 100) / 100,
    totalOrders: orders,
    averageOrderValue: Math.round(averageOrderValue * 100) / 100,
    conversionRate: Math.round(conversionRate * 100) / 100,
    customerSatisfaction: rating * 20,
    productRating: rating,
    orderCompletion: Math.min(100, Math.round((orders / (vendor.productCount || 1)) * 100)),
    shippingTime: 3,
    responseTime: 2,
  };
};

export const calculateVendorGrowth = (
  current: VendorMetrics,
  previous: VendorMetrics
): {
  revenueGrowth: number;
  ordersGrowth: number;
  ratingGrowth: number;
} => {
  const revenueGrowth =
    previous.totalRevenue > 0
      ? ((current.totalRevenue - previous.totalRevenue) / previous.totalRevenue) * 100
      : 0;
  const ordersGrowth =
    previous.totalOrders > 0
      ? ((current.totalOrders - previous.totalOrders) / previous.totalOrders) * 100
      : 0;
  const ratingGrowth =
    previous.productRating > 0
      ? ((current.productRating - previous.productRating) / previous.productRating) * 100
      : 0;

  return {
    revenueGrowth: Math.round(revenueGrowth * 100) / 100,
    ordersGrowth: Math.round(ordersGrowth * 100) / 100,
    ratingGrowth: Math.round(ratingGrowth * 100) / 100,
  };
};

export const calculateVendorHealthScore = (
  vendor: Vendor
): {
  score: number;
  level: 'excellent' | 'good' | 'average' | 'poor';
} => {
  let score = 0;

  const revenue = vendor.revenue || 0;
  if (revenue > 100000) score += 25;
  else if (revenue > 50000) score += 20;
  else if (revenue > 10000) score += 15;
  else if (revenue > 5000) score += 10;
  else score += 5;

  const orders = vendor.orderCount || 0;
  if (orders > 1000) score += 25;
  else if (orders > 500) score += 20;
  else if (orders > 100) score += 15;
  else if (orders > 50) score += 10;
  else score += 5;

  const rating = vendor.rating || 0;
  if (rating >= 4.5) score += 25;
  else if (rating >= 4.0) score += 20;
  else if (rating >= 3.5) score += 15;
  else if (rating >= 3.0) score += 10;
  else score += 5;

  if (vendor.isVerified && vendor.isApproved) score += 25;
  else if (vendor.isVerified) score += 15;
  else if (vendor.isApproved) score += 15;
  else score += 5;

  let level: 'excellent' | 'good' | 'average' | 'poor' = 'average';
  if (score >= 80) level = 'excellent';
  else if (score >= 60) level = 'good';
  else if (score >= 40) level = 'average';
  else level = 'poor';

  return { score, level };
};
