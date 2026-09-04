/**
 * Vendor Report Types
 * ভেন্ডর রিপোর্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';
import { VENDOR_REPORT } from '@vubon/shared-constants';

export interface VendorReport extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  type: (typeof VENDOR_REPORT.TYPES)[keyof typeof VENDOR_REPORT.TYPES];
  name: string;
  nameBangla?: string;
  description?: string;
  periodStart: Date;
  periodEnd: Date;
  format: (typeof VENDOR_REPORT.FORMATS)[keyof typeof VENDOR_REPORT.FORMATS];
  data: Record<string, string | number | boolean | object>;
  generatedAt: Date;
  generatedBy: string;
  fileUrl?: string;
  status: (typeof VENDOR_REPORT.STATUS)[keyof typeof VENDOR_REPORT.STATUS];
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorReportCreateInput {
  vendorId: string;
  type: (typeof VENDOR_REPORT.TYPES)[keyof typeof VENDOR_REPORT.TYPES];
  name: string;
  nameBangla?: string;
  description?: string;
  periodStart: Date;
  periodEnd: Date;
  format?: (typeof VENDOR_REPORT.FORMATS)[keyof typeof VENDOR_REPORT.FORMATS];
  generatedBy: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorReportUpdateInput {
  status?: (typeof VENDOR_REPORT.STATUS)[keyof typeof VENDOR_REPORT.STATUS];
  fileUrl?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorReportResponse {
  vendorReport: VendorReport;
}
