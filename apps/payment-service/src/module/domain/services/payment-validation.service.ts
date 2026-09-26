import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';
import { PaymentFailedError } from '../errors/payment.errors';

export class PaymentValidationService {
  validateAmount(amount: number): void {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new PaymentFailedError('amount must be positive');
    }
    if (amount < PAYMENT_LIMIT.MIN_AMOUNT) {
      throw new PaymentFailedError(`amount below minimum (${PAYMENT_LIMIT.MIN_AMOUNT})`);
    }
    if (amount > PAYMENT_LIMIT.MAX_AMOUNT) {
      throw new PaymentFailedError(`amount above maximum (${PAYMENT_LIMIT.MAX_AMOUNT})`);
    }
  }

  validateCurrency(currency: string): void {
    if (!/^[A-Z]{3}$/.test(currency)) {
      throw new PaymentFailedError(`invalid currency: ${currency}`);
    }
  }
}
