/**
 * VendorReportResponseDto
 * @module vendor-service/application/dtos/responses
 */
import type {
  VENDOR_REPORT_TYPE,
  VENDOR_REPORT_FORMAT,
  VENDOR_REPORT_PERIOD,
} from '@vubon/shared-constants/business';

export type VendorReportStatusValue = 'pending' | 'generating' | 'ready' | 'failed' | 'expired';

export interface VendorReportResponseDto {
  readonly id: string;
  readonly vendorId: string;
  readonly type: (typeof VENDOR_REPORT_TYPE)[keyof typeof VENDOR_REPORT_TYPE];
  readonly format: (typeof VENDOR_REPORT_FORMAT)[keyof typeof VENDOR_REPORT_FORMAT];
  readonly period: (typeof VENDOR_REPORT_PERIOD)[keyof typeof VENDOR_REPORT_PERIOD];
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly status: VendorReportStatusValue;
  readonly fileUrl?: string;
  readonly fileSize?: number;
  readonly generatedAt?: string;
  readonly expiresAt?: string;
  readonly generatedBy?: string;
  readonly failureReason?: string;
  readonly canDownload: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface VendorReportSummaryDto {
  readonly vendorId: string;
  readonly period: (typeof VENDOR_REPORT_PERIOD)[keyof typeof VENDOR_REPORT_PERIOD];
  readonly totalOrders: number;
  readonly totalRevenue: number;
  readonly totalCommission: number;
  readonly totalPayout: number;
  readonly currency: string;
}
