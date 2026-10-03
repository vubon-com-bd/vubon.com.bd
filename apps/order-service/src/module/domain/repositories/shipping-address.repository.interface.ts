/**
 * Shipping Address Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ShippingAddressEntity } from '../entities/shipping-address.entity.js';
import { ShippingAddressIdVO } from '../value-objects/primitives/shipping-address-id.vo.js';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo.js';

export const SHIPPING_ADDRESS_REPOSITORY = Symbol('SHIPPING_ADDRESS_REPOSITORY');

export interface ShippingAddressRepository
  extends BaseRepository<ShippingAddressEntity, string> {
  findByIdVO(id: ShippingAddressIdVO): Promise<ShippingAddressEntity | null>;
  findByOrderId(orderId: string): Promise<ShippingAddressEntity | null>;
  findByCustomerId(
    customerId: CustomerIdVO,
  ): Promise<readonly ShippingAddressEntity[]>;
  deleteByOrderId(orderId: string): Promise<void>;
}
