import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorCommissionEntity } from '../entities/vendor-commission.entity';
import { CommissionIdVO } from '../value-objects/primitives/commission-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';

export interface VendorCommissionRepository
  extends BaseRepository<VendorCommissionEntity, CommissionIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorCommissionEntity[]>;
  findByOrderId(orderId: OrderIdVO): Promise<VendorCommissionEntity | null>;
  findUnsettled(vendorId: VendorIdVO): Promise<readonly VendorCommissionEntity[]>;
}
