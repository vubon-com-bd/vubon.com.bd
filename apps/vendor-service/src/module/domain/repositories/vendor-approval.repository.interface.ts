/**
 * Vendor Approval Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorApprovalEntity } from '../entities/vendor-approval.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { ApprovalIdVO } from '../value-objects/primitives/approval-id.vo.js';

export const VENDOR_APPROVAL_REPOSITORY = Symbol('VENDOR_APPROVAL_REPOSITORY');

export interface VendorApprovalListFilter {
  readonly vendorId?: string;
  readonly status?: string | readonly string[];
  readonly reason?: string | readonly string[];
  readonly isOverdue?: boolean;
  readonly hasAppealDeadline?: boolean;
  readonly minResubmissionCount?: number;
  readonly minScore?: number;
  readonly maxScore?: number;
}

export interface VendorApprovalListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'requestedAt' | 'decidedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorApprovalListFilter;
}

export interface VendorApprovalPaginationResult {
  readonly items: readonly VendorApprovalEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorApprovalRepository
  extends BaseRepository<VendorApprovalEntity, string> {
  findByIdVO(id: ApprovalIdVO): Promise<VendorApprovalEntity | null>;
  findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorApprovalEntity[]>;
  findLatestByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<VendorApprovalEntity | null>;
  findPending(limit?: number): Promise<readonly VendorApprovalEntity[]>;
  findUnderAppeal(limit?: number): Promise<readonly VendorApprovalEntity[]>;
  findApprovedByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<VendorApprovalEntity | null>;
  findRejectedByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorApprovalEntity[]>;
  findOverdue(): Promise<readonly VendorApprovalEntity[]>;
  findEligibleForAutoApproval(
    threshold: number,
  ): Promise<readonly VendorApprovalEntity[]>;
  findWithExpiredAppealWindow(): Promise<readonly VendorApprovalEntity[]>;
  findPaginated(
    options: VendorApprovalListOptions,
  ): Promise<VendorApprovalPaginationResult>;
  countByVendor(vendorId: VendorIdVO | string): Promise<number>;
  getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly byStatus: Readonly<Record<string, number>>;
    readonly byReason: Readonly<Record<string, number>>;
    readonly overdue: number;
    readonly averageScore: number;
  }>;
}
