import type { VendorReturnPolicyEntity } from '../../../domain/entities/vendor-return-policy.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface VendorReturnPolicyServiceInterface {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorReturnPolicyEntity | null>;
  save(policy: VendorReturnPolicyEntity): Promise<void>;
}
