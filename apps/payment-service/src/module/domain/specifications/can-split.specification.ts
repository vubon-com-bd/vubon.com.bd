import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { PaymentEntity } from '../entities/payment.entity';

export class CanSplitSpecification extends Specification<PaymentEntity> {
  isSatisfiedBy(candidate: PaymentEntity): boolean {
    return candidate.status.value === 'paid' || candidate.status.value === 'captured';
  }
}
