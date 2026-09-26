import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CheckoutSessionEntity } from '../entities/checkout-session.entity';
import { CheckoutIdVO } from '../value-objects/primitives/checkout-id.vo';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo';

export interface CheckoutSessionRepository
  extends BaseRepository<CheckoutSessionEntity, CheckoutIdVO> {
  findActiveByCustomer(customerId: CustomerIdVO): Promise<CheckoutSessionEntity | null>;
}
