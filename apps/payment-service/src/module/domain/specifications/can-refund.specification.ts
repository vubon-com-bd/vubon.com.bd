import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';
import type { PaymentEntity } from '../entities/payment.entity';

export class CanRefundSpecification extends Specification<PaymentEntity> {
  constructor(private readonly now: Date = new Date()) {
    super();
  }

  isSatisfiedBy(candidate: PaymentEntity): boolean {
    if (candidate.status.value !== 'paid') return false;
    if (!candidate.capturedAt) return false;
    const days = (this.now.getTime() - candidate.capturedAt.getTime()) / 86_400_000;
    return days <= PAYMENT_LIMIT.REFUND_WINDOW_DAYS;
  }
}
