import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { PaymentEntity } from '../entities/payment.entity';

export class CanInitiatePaymentSpecification extends Specification<PaymentEntity> {
  isSatisfiedBy(candidate: PaymentEntity): boolean {
    if (candidate.isDeleted()) return false;
    return candidate.status.value === 'pending';
  }
}
