import { BaseEntity } from '../../common/base.types';
import { VENDOR_PERFORMANCE } from '@vubon/shared-constants/src/business/vendor/vendor-performance.constants';
import { Vendor } from './vendor.types';

export interface VendorPerformanceMetrics {
  totalOrders: number;
  totalRevenue: number;
  totalCommission: number;
  averageRating: number;
  reviewCount: number;
  fulfillmentRate: number;
  onTimeDelivery: number;
  customerSatisfaction: number;
}

export interface VendorPerformance extends BaseEntity {
  performanceId: string;
  vendorId: string;
  vendor: Vendor;
  type: keyof typeof VENDOR_PERFORMANCE.TYPES | string;
  score: number;
  metrics: VendorPerformanceMetrics;
  rating: number;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
