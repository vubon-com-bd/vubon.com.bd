import type { VendorSuspensionEntity } from '../../../domain/entities/vendor-suspension.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface VendorSuspensionServiceInterface {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorSuspensionEntity[]>;
  save(suspension: VendorSuspensionEntity): Promise<void>;
}
