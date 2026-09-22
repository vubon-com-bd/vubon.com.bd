import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { BillingAddressEntity } from '../entities/billing-address.entity';
import { BillingAddressIdVO } from '../value-objects/primitives/billing-address-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';

export interface BillingAddressRepository
  extends BaseRepository<BillingAddressEntity, BillingAddressIdVO> {
  findByOrder(orderId: OrderIdVO): Promise<BillingAddressEntity | null>;
}
