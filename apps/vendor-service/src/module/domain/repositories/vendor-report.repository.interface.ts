/**
 * VendorReportRepository
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorReportEntity } from '../entities/vendor-report.entity.js';
import { VendorReportStatusVO } from '../value-objects/primitives/vendor-report-status.vo.js';
import { VendorReportTypeVO } from '../value-objects/primitives/vendor-report-type.vo.js';

export const VENDOR_REPORT_REPOSITORY = Symbol('VENDOR_REPORT_REPOSITORY');

export interface VendorReportFilter {
  readonly vendorId?: string;
  readonly type?: string;
  readonly status?: string;
  readonly format?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface VendorReportRepository extends BaseRepository<VendorReportEntity, string> {
  findByVendorId(vendorId: string): Promise<readonly VendorReportEntity[]>;
  findByStatus(status: VendorReportStatusVO): Promise<readonly VendorReportEntity[]>;
  findByType(type: VendorReportTypeVO): Promise<readonly VendorReportEntity[]>;
  search(filter: VendorReportFilter): Promise<readonly VendorReportEntity[]>;

  /** Reports in pending/generating state. */
  findInProgress(): Promise<readonly VendorReportEntity[]>;
  /** Ready reports with expired TTL. */
  findExpiredReady(): Promise<readonly VendorReportEntity[]>;
  /** Downloadable reports for a vendor. */
  findDownloadableByVendorId(vendorId: string): Promise<readonly VendorReportEntity[]>;

  countByVendor(vendorId: string): Promise<number>;
  countByStatus(status: VendorReportStatusVO): Promise<number>;
  /** Count reports created in the last N hours (rate limiting). */
  countRecentByVendorId(vendorId: string, hours: number): Promise<number>;
  deleteByVendorId(vendorId: string): Promise<void>;
}
