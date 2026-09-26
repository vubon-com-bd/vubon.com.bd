import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PaymentMethodEntity } from '../entities/payment-method.entity';
import { PaymentMethodIdVO } from '../value-objects/primitives/payment-method-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface PaymentMethodRepository extends BaseRepository<PaymentMethodEntity, PaymentMethodIdVO> {
  findByUserId(userId: UserIdVO): Promise<readonly PaymentMethodEntity[]>;
  findDefault(userId: UserIdVO): Promise<PaymentMethodEntity | null>;
}
