import { BaseEntity } from '../../common/base.types';
import { VENDOR_REPORT } from '@vubon/shared-constants/src/business/vendor/vendor-report.constants';
import { Vendor } from './vendor.types';
import { VendorPerformance } from './vendor-performance.types';
import { VendorActivity } from './vendor-activity.types';

export interface VendorReportSummary {
  totalSales: number;
  totalRevenue: number;
  totalOrders: number;
  averageRating: number;
  reviewCount: number;
  fulfillmentRate: number;
  customerSatisfaction: number;
}

export interface VendorReportInsight {
  type: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'success' | 'error';
}

export interface VendorReport extends BaseEntity {
  reportId: string;
  vendorId: string;
  vendor: Vendor;
  type: keyof typeof VENDOR_REPORT.TYPES | string;
  format: keyof typeof VENDOR_REPORT.REPORT_FORMATS | string;
  performance: VendorPerformance;
  activities: VendorActivity[];
  summary: VendorReportSummary;
  insights: VendorReportInsight[];
  recommendations: string[];
  generatedAt: Date;
  metadata: Record<string, unknown>;
}
