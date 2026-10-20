/**
 * Billing Address Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { BillingAddressEntity } from '../entities/billing-address.entity.js';
import type { BillingAddressIdVO } from '../value-objects/primitives/billing-address-id.vo.js';

// ─── DI Token ──────────────────────────────
export const BILLING_ADDRESS_REPOSITORY = Symbol('BILLING_ADDRESS_REPOSITORY');

// ─── Main Interface ────────────────────────
export interface BillingAddressRepository
  extends BaseRepository<BillingAddressEntity, string> {
  findByIdVO(id: BillingAddressIdVO): Promise<BillingAddressEntity | null>;
  findByOrder(orderId: string): Promise<BillingAddressEntity | null>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
