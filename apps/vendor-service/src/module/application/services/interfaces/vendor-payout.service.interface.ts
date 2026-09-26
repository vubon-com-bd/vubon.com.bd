import type { VendorPayoutEntity } from '../../../domain/entities/vendor-payout.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { PayoutIdVO } from '../../../domain/value-objects/primitives/payout-id.vo';

export interface VendorPayoutServiceInterface {
  findById(id: PayoutIdVO): Promise<VendorPayoutEntity | null>;
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorPayoutEntity[]>;
  save(payout: VendorPayoutEntity): Promise<void>;
}
