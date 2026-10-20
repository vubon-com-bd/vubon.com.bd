/**
 * Shipping Address Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ShippingAddressEntity } from '../entities/shipping-address.entity.js';
import type { ShippingAddressIdVO } from '../value-objects/primitives/shipping-address-id.vo.js';

// ─── DI Token ──────────────────────────────
export const SHIPPING_ADDRESS_REPOSITORY = Symbol('SHIPPING_ADDRESS_REPOSITORY');

// ─── Main Interface ────────────────────────
export interface ShippingAddressRepository
  extends BaseRepository<ShippingAddressEntity, string> {
  findByIdVO(id: ShippingAddressIdVO): Promise<ShippingAddressEntity | null>;
  findByOrder(orderId: string): Promise<ShippingAddressEntity | null>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
