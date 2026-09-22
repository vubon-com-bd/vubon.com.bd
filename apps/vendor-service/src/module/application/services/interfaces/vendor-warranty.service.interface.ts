import type { VendorWarrantyEntity } from '../../../domain/entities/vendor-warranty.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface VendorWarrantyServiceInterface {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorWarrantyEntity | null>;
  save(warranty: VendorWarrantyEntity): Promise<void>;
}
