import type { VendorCommissionEntity } from '../../../domain/entities/vendor-commission.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { CommissionIdVO } from '../../../domain/value-objects/primitives/commission-id.vo';

export interface VendorCommissionServiceInterface {
  findById(id: CommissionIdVO): Promise<VendorCommissionEntity | null>;
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorCommissionEntity[]>;
  save(commission: VendorCommissionEntity): Promise<void>;
}
