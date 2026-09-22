import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorFeatureEntity } from '../entities/vendor-feature.entity';
import { FeatureIdVO } from '../value-objects/primitives/feature-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorFeatureRepository
  extends BaseRepository<VendorFeatureEntity, FeatureIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorFeatureEntity[]>;
  findActive(vendorId: VendorIdVO): Promise<readonly VendorFeatureEntity[]>;
}
