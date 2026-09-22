import type { VendorVerificationEntity } from '../../../domain/entities/vendor-verification.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface VendorVerificationServiceInterface {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorVerificationEntity | null>;
  save(verification: VendorVerificationEntity): Promise<void>;
}
