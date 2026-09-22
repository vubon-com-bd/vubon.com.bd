import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorRatingEntity } from '../entities/vendor-rating.entity';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorRatingRepository
  extends BaseRepository<VendorRatingEntity, VendorIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorRatingEntity | null>;
}
