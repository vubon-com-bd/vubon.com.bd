/**
 * Checkout Session Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { CheckoutSessionEntity } from '../entities/checkout-session.entity.js';

// ─── DI Token ──────────────────────────────
export const CHECKOUT_SESSION_REPOSITORY = Symbol('CHECKOUT_SESSION_REPOSITORY');

// ─── Main Interface ────────────────────────
export interface CheckoutSessionRepository
  extends BaseRepository<CheckoutSessionEntity, string> {
  findByCheckout(checkoutId: string): Promise<readonly CheckoutSessionEntity[]>;
  findLatestByCheckout(checkoutId: string): Promise<CheckoutSessionEntity | null>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
