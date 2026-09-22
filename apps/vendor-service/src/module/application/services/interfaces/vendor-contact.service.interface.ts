import type { VendorContactEntity } from '../../../domain/entities/vendor-contact.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface VendorContactServiceInterface {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorContactEntity[]>;
  save(contact: VendorContactEntity): Promise<void>;
}
