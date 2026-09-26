import type { VendorAddressEntity } from '../../../domain/entities/vendor-address.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface VendorAddressServiceInterface {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorAddressEntity[]>;
  save(address: VendorAddressEntity): Promise<void>;
}
