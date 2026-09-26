import type { VendorApprovalEntity } from '../../../domain/entities/vendor-approval.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface VendorApprovalServiceInterface {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorApprovalEntity | null>;
  save(approval: VendorApprovalEntity): Promise<void>;
}
