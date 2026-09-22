import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CheckoutEntity } from '../entities/checkout.entity';
import { CheckoutIdVO } from '../value-objects/primitives/checkout-id.vo';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo';

export interface CheckoutRepository
  extends BaseRepository<CheckoutEntity, CheckoutIdVO> {
  findActiveByCustomer(customerId: CustomerIdVO): Promise<CheckoutEntity | null>;
  findByCustomer(customerId: CustomerIdVO): Promise<readonly CheckoutEntity[]>;
}
