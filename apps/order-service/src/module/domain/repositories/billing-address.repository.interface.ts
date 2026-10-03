/**
 * Billing Address Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { BillingAddressEntity } from '../entities/billing-address.entity.js';
import { BillingAddressIdVO } from '../value-objects/primitives/billing-address-id.vo.js';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo.js';

export const BILLING_ADDRESS_REPOSITORY = Symbol('BILLING_ADDRESS_REPOSITORY');

export interface BillingAddressRepository
  extends BaseRepository<BillingAddressEntity, string> {
  findByIdVO(id: BillingAddressIdVO): Promise<BillingAddressEntity | null>;
  findByOrderId(orderId: string): Promise<BillingAddressEntity | null>;
  findByCustomerId(
    customerId: CustomerIdVO,
  ): Promise<readonly BillingAddressEntity[]>;
  deleteByOrderId(orderId: string): Promise<void>;
}
