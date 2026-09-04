/**
 * Vendor Performance Types
 * ভেন্ডর পারফরম্যান্স সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';
import { VENDOR_PERFORMANCE } from '@vubon/shared-constants';

export interface VendorPerformance extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  period: (typeof VENDOR_PERFORMANCE.PERIODS)[keyof typeof VENDOR_PERFORMANCE.PERIODS];
  date: Date;
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
  metrics: Record<string, number>;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorPerformanceCreateInput {
  vendorId: string;
  period: (typeof VENDOR_PERFORMANCE.PERIODS)[keyof typeof VENDOR_PERFORMANCE.PERIODS];
  date: Date;
  totalSales?: number;
  totalOrders?: number;
  totalRevenue?: number;
  averageOrderValue?: number;
  conversionRate?: number;
  customerSatisfaction?: number;
  productRating?: number;
  orderCompletion?: number;
  shippingTime?: number;
  responseTime?: number;
  metrics?: Record<string, number>;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorPerformanceUpdateInput {
  totalSales?: number;
  totalOrders?: number;
  totalRevenue?: number;
  averageOrderValue?: number;
  conversionRate?: number;
  customerSatisfaction?: number;
  productRating?: number;
  orderCompletion?: number;
  shippingTime?: number;
  responseTime?: number;
  metrics?: Record<string, number>;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorPerformanceResponse {
  vendorPerformance: VendorPerformance;
}

export interface VendorPerformanceSummary {
  totalSales: number;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
  customerSatisfaction: number;
  productRating: number;
}
