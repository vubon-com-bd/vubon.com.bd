/**
 * Vendor Performance Calculator
 * ভেন্ডর পারফরম্যান্স ক্যালকুলেটর
 */

import { VENDOR_PERFORMANCE } from '@vubon/shared-constants';
import type { VendorPerformance } from '@vubon/shared-types';

export interface VendorPerformanceCalculation {
  totalSales: number;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
  customerSatisfaction: number;
  productRating: number;
  orderCompletion: number;
  shippingTime: number;
  responseTime: number;
  period: string;
  periodLabel: string;
  isValidPeriod: boolean;
}

export const calculateVendorPerformance = (
  performance: VendorPerformance
): VendorPerformanceCalculation => {
  const totalSales = performance.totalSales || 0;
  const totalOrders = performance.totalOrders || 0;
  const totalRevenue = performance.totalRevenue || 0;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const conversionRate = performance.conversionRate || 0;
  const customerSatisfaction = performance.customerSatisfaction || 0;
  const productRating = performance.productRating || 0;
  const orderCompletion = performance.orderCompletion || 0;
  const shippingTime = performance.shippingTime || 0;
  const responseTime = performance.responseTime || 0;

  // VENDOR_PERFORMANCE ব্যবহার করে টাইপ চেক এবং পিরিয়ড লেবেল তৈরি
  const performanceType = performance.period as keyof typeof VENDOR_PERFORMANCE.TYPES;
  const periodLabel = VENDOR_PERFORMANCE.TYPES[performanceType] || performance.period;
  const isValidPeriod = Object.keys(VENDOR_PERFORMANCE.TYPES).includes(performanceType as string);

  // isValidPeriod এবং periodLabel ব্যবহার করা
  const validPeriod = isValidPeriod ? periodLabel : 'Unknown Period';

  return {
    totalSales: Math.round(totalSales * 100) / 100,
    totalOrders: Math.round(totalOrders * 100) / 100,
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    averageOrderValue: Math.round(averageOrderValue * 100) / 100,
    conversionRate: Math.round(conversionRate * 100) / 100,
    customerSatisfaction: Math.round(customerSatisfaction * 100) / 100,
    productRating: Math.round(productRating * 100) / 100,
    orderCompletion: Math.round(orderCompletion * 100) / 100,
    shippingTime: Math.round(shippingTime * 100) / 100,
    responseTime: Math.round(responseTime * 100) / 100,
    period: performance.period,
    periodLabel: validPeriod,
    isValidPeriod,
  };
};

export const calculateVendorPerformanceScore = (
  performance: VendorPerformance
): {
  score: number;
  level: 'excellent' | 'good' | 'average' | 'poor';
} => {
  let score = 0;

  const revenue = performance.totalRevenue || 0;
  if (revenue > 100000) score += 20;
  else if (revenue > 50000) score += 15;
  else if (revenue > 10000) score += 10;
  else if (revenue > 5000) score += 5;
  else score += 2;

  const completion = performance.orderCompletion || 0;
  if (completion >= 95) score += 20;
  else if (completion >= 85) score += 15;
  else if (completion >= 75) score += 10;
  else score += 5;

  const rating = performance.productRating || 0;
  if (rating >= 4.5) score += 20;
  else if (rating >= 4.0) score += 15;
  else if (rating >= 3.5) score += 10;
  else score += 5;

  const satisfaction = performance.customerSatisfaction || 0;
  if (satisfaction >= 90) score += 20;
  else if (satisfaction >= 75) score += 15;
  else if (satisfaction >= 60) score += 10;
  else score += 5;

  const shippingTime = performance.shippingTime || 0;
  if (shippingTime <= 24) score += 20;
  else if (shippingTime <= 48) score += 15;
  else if (shippingTime <= 72) score += 10;
  else score += 5;

  let level: 'excellent' | 'good' | 'average' | 'poor' = 'average';
  if (score >= 80) level = 'excellent';
  else if (score >= 60) level = 'good';
  else if (score >= 40) level = 'average';
  else level = 'poor';

  return { score, level };
};

// VENDOR_PERFORMANCE থেকে হেল্পার ফাংশন
export const getVendorPerformanceTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    sales: 'Sales',
    orders: 'Orders',
    revenue: 'Revenue',
    profit: 'Profit',
    conversion: 'Conversion',
    customer: 'Customer',
    products: 'Products',
    ratings: 'Ratings',
    completion: 'Completion',
  };
  return labels[type] || type;
};

export const getVendorPerformanceMetricLabel = (metric: string): string => {
  const labels: Record<string, string> = {
    total_sales: 'Total Sales',
    total_orders: 'Total Orders',
    total_revenue: 'Total Revenue',
    average_order_value: 'Average Order Value',
    conversion_rate: 'Conversion Rate',
    customer_satisfaction: 'Customer Satisfaction',
    product_rating: 'Product Rating',
    order_completion: 'Order Completion',
    shipping_time: 'Shipping Time',
    response_time: 'Response Time',
  };
  return labels[metric] || metric;
};

export const getVendorPerformancePeriodLabel = (period: string): string => {
  const labels: Record<string, string> = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    yearly: 'Yearly',
  };
  return labels[period] || period;
};
