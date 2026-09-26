import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorReturnPolicyEntity } from '../entities/vendor-return-policy.entity';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorReturnPolicyRepository
  extends BaseRepository<VendorReturnPolicyEntity, VendorIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorReturnPolicyEntity | null>;
}
