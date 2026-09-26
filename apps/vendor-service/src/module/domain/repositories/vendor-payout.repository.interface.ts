import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorPayoutEntity } from '../entities/vendor-payout.entity';
import { PayoutIdVO } from '../value-objects/primitives/payout-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorPayoutRepository
  extends BaseRepository<VendorPayoutEntity, PayoutIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorPayoutEntity[]>;
  findPending(): Promise<readonly VendorPayoutEntity[]>;
}
