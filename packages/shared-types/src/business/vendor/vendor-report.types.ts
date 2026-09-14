/**
 * Vendor Report Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-report.constants থেকে।
 */

import type {
  VENDOR_REPORT_TYPE,
  VENDOR_REPORT_FORMAT,
  VENDOR_REPORT_PERIOD,
} from '@vubon/shared-constants/business';
import type { VendorId, Money } from '../../common/primitives';

export type VendorReportTypeValue = (typeof VENDOR_REPORT_TYPE)[keyof typeof VENDOR_REPORT_TYPE];

export type VendorReportFormatValue =
  (typeof VENDOR_REPORT_FORMAT)[keyof typeof VENDOR_REPORT_FORMAT];

export type VendorReportPeriodValue =
  (typeof VENDOR_REPORT_PERIOD)[keyof typeof VENDOR_REPORT_PERIOD];

export interface VendorReport {
  readonly id: string;
  readonly vendorId: VendorId;
  readonly type: VendorReportTypeValue;
  readonly format: VendorReportFormatValue;
  readonly period: VendorReportPeriodValue;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly fileUrl?: string;
  readonly fileSize?: number;
  readonly generatedAt: string;
  readonly expiresAt?: string;
  readonly generatedBy?: string;
}

export interface VendorReportRequest {
  readonly vendorId: VendorId;
  readonly type: VendorReportTypeValue;
  readonly format: VendorReportFormatValue;
  readonly period: VendorReportPeriodValue;
  readonly periodStart?: string;
  readonly periodEnd?: string;
}

export interface VendorReportSummary {
  readonly vendorId: VendorId;
  readonly period: VendorReportPeriodValue;
  readonly totalOrders: number;
  readonly totalRevenue: Money;
  readonly totalCommission: Money;
  readonly totalPayout: Money;
  readonly currency: string;
}
