import type { VendorProfileEntity } from '../../../domain/entities/vendor-profile.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface VendorProfileServiceInterface {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorProfileEntity | null>;
  save(profile: VendorProfileEntity): Promise<void>;
}
