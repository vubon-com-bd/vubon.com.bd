import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorApprovalEntity } from '../entities/vendor-approval.entity';
import { ApprovalIdVO } from '../value-objects/primitives/approval-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorApprovalRepository
  extends BaseRepository<VendorApprovalEntity, ApprovalIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorApprovalEntity | null>;
  findPending(): Promise<readonly VendorApprovalEntity[]>;
}
