import type { VendorRatingEntity } from '../../../domain/entities/vendor-rating.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface VendorRatingServiceInterface {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorRatingEntity | null>;
  save(rating: VendorRatingEntity): Promise<void>;
}
