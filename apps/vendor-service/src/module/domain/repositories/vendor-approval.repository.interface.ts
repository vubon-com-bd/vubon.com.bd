/**
 * VendorApprovalRepository
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorApprovalEntity } from '../entities/vendor-approval.entity.js';
import { ApprovalStatusVO } from '../value-objects/primitives/approval-status.vo.js';

export const VENDOR_APPROVAL_REPOSITORY = Symbol('VENDOR_APPROVAL_REPOSITORY');

export interface ApprovalStats {
  readonly totalPending: number;
  readonly totalApproved: number;
  readonly totalRejected: number;
  readonly avgReviewHours: number;
  readonly slaBreachCount: number;
}

export interface VendorApprovalRepository extends BaseRepository<VendorApprovalEntity, string> {
  findByVendorId(vendorId: string): Promise<VendorApprovalEntity | null>;
  existsByVendorId(vendorId: string): Promise<boolean>;
  findByStatus(status: ApprovalStatusVO): Promise<readonly VendorApprovalEntity[]>;

  /** Approvals currently pending past review SLA. */
  findPendingPastSla(): Promise<readonly VendorApprovalEntity[]>;
  /** Approvals eligible for appeal (rejected within window). */
  findAppealable(): Promise<readonly VendorApprovalEntity[]>;

  countByStatus(status: ApprovalStatusVO): Promise<number>;
  getStats(): Promise<ApprovalStats>;
  upsert(entity: VendorApprovalEntity): Promise<VendorApprovalEntity>;
}
