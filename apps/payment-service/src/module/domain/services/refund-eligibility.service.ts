import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';
import type { PaymentEntity } from '../entities/payment.entity';

export class RefundEligibilityService {
  canRefund(payment: PaymentEntity, now: Date = new Date()): boolean {
    if (payment.status.value !== 'paid') return false;
    if (!payment.capturedAt) return false;
    const days = (now.getTime() - payment.capturedAt.getTime()) / 86_400_000;
    return days <= PAYMENT_LIMIT.REFUND_WINDOW_DAYS;
  }
}
