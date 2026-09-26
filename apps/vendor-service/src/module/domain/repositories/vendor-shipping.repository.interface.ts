import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorShippingEntity } from '../entities/vendor-shipping.entity';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorShippingRepository
  extends BaseRepository<VendorShippingEntity, VendorIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorShippingEntity | null>;
}
