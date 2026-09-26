import type { VendorBusinessEntity } from '../../../domain/entities/vendor-business.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface VendorBusinessServiceInterface {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorBusinessEntity | null>;
  save(business: VendorBusinessEntity): Promise<void>;
}
