import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorWarrantyEntity } from '../entities/vendor-warranty.entity';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorWarrantyRepository
  extends BaseRepository<VendorWarrantyEntity, VendorIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorWarrantyEntity | null>;
}
