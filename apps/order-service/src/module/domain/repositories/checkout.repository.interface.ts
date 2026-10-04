/**
 * Checkout Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CheckoutEntity } from '../entities/checkout.entity.js';
import { CheckoutIdVO } from '../value-objects/primitives/checkout-id.vo.js';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo.js';
import { CheckoutStatusVO } from '../value-objects/primitives/checkout-status.vo.js';

export const CHECKOUT_REPOSITORY = Symbol('CHECKOUT_REPOSITORY');

export interface CheckoutRepository extends BaseRepository<CheckoutEntity, string> {
  findByIdVO(id: CheckoutIdVO): Promise<CheckoutEntity | null>;
  findByCustomerId(customerId: CustomerIdVO): Promise<readonly CheckoutEntity[]>;
  findActiveByCustomer(customerId: CustomerIdVO): Promise<CheckoutEntity | null>;
  findByCartId(cartId: string): Promise<CheckoutEntity | null>;
  findByStatus(status: CheckoutStatusVO): Promise<readonly CheckoutEntity[]>;
  findByOrderId(orderId: string): Promise<CheckoutEntity | null>;
  findExpired(before: string): Promise<readonly CheckoutEntity[]>;
  softDelete(id: string): Promise<void>;
}
