import type { VendorFeatureEntity } from '../../../domain/entities/vendor-feature.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface VendorFeatureServiceInterface {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorFeatureEntity[]>;
  save(feature: VendorFeatureEntity): Promise<void>;
}
