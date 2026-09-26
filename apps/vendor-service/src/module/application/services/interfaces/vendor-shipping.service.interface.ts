import type { VendorShippingEntity } from '../../../domain/entities/vendor-shipping.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface VendorShippingServiceInterface {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorShippingEntity | null>;
  save(shipping: VendorShippingEntity): Promise<void>;
}
