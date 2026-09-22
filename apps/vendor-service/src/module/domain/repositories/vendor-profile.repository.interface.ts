import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorProfileEntity } from '../entities/vendor-profile.entity';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorProfileRepository
  extends BaseRepository<VendorProfileEntity, VendorIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorProfileEntity | null>;
}
