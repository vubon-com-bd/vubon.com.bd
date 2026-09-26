import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ShippingAddressEntity } from '../entities/shipping-address.entity';
import { ShippingAddressIdVO } from '../value-objects/primitives/shipping-address-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';

export interface ShippingAddressRepository
  extends BaseRepository<ShippingAddressEntity, ShippingAddressIdVO> {
  findByOrder(orderId: OrderIdVO): Promise<ShippingAddressEntity | null>;
}
