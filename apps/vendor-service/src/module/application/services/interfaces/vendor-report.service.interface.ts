/**
 * IVendorReportService
 * @module vendor-service/application/services/interfaces
 */
import type { VendorReportResponseDto } from '../../dtos/responses/vendor-report-response.dto.js';

export const VENDOR_REPORT_SERVICE = Symbol('VENDOR_REPORT_SERVICE');

export interface RequestReportInput {
  readonly vendorId: string;
  readonly type: string;
  readonly format: string;
  readonly period: string;
  readonly periodStart: string;
  readonly periodEnd: string;
}

export interface IVendorReportService {
  request(input: RequestReportInput, requestedBy: string, actorId?: string): Promise<VendorReportResponseDto>;
  startGenerating(reportId: string, actorId?: string): Promise<VendorReportResponseDto>;
  markReady(reportId: string, fileUrl: string, fileSize: number, actorId?: string): Promise<VendorReportResponseDto>;
  markFailed(reportId: string, reason: string, actorId?: string): Promise<VendorReportResponseDto>;
  getById(reportId: string): Promise<VendorReportResponseDto>;
  listByVendor(vendorId: string): Promise<readonly VendorReportResponseDto[]>;
  listDownloadableByVendor(vendorId: string): Promise<readonly VendorReportResponseDto[]>;
}
