/**
 * Checkout Session Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CheckoutSessionEntity } from '../entities/checkout-session.entity.js';
import { CheckoutIdVO } from '../value-objects/primitives/checkout-id.vo.js';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo.js';

export const CHECKOUT_SESSION_REPOSITORY = Symbol('CHECKOUT_SESSION_REPOSITORY');

export interface CheckoutSessionRepository
  extends BaseRepository<CheckoutSessionEntity, string> {
  findByCheckoutId(checkoutId: CheckoutIdVO): Promise<CheckoutSessionEntity | null>;
  findByToken(token: string): Promise<CheckoutSessionEntity | null>;
  findByCustomerId(customerId: CustomerIdVO): Promise<readonly CheckoutSessionEntity[]>;
  findExpired(before: string): Promise<readonly CheckoutSessionEntity[]>;
  deleteByCheckoutId(checkoutId: CheckoutIdVO): Promise<void>;
}
