import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { PaymentEntity } from '../entities/payment.entity';

export class CanRetryPaymentSpecification extends Specification<PaymentEntity> {
  isSatisfiedBy(candidate: PaymentEntity): boolean {
    return candidate.status.value === 'failed' || candidate.status.value === 'declined';
  }
}
