/**
 * PaymentHttpValidator — wraps Application validator → BadRequestException
 * @module payment-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { PaymentValidator as AppPaymentValidator } from '@application/validators/payment.validator';

export class PaymentHttpValidator {
  static validateInitiate(body: unknown): void {
    try {
      AppPaymentValidator.validateInitiate(body);
    } catch (err) {
      throw toBadRequest(err, 'Invalid payment payload');
    }
  }

  static validateVerify(body: unknown): void {
    try {
      AppPaymentValidator.validateVerify(body);
    } catch (err) {
      throw toBadRequest(err, 'Invalid verify payload');
    }
  }
}

function toBadRequest(err: unknown, fallback: string): BadRequestException {
  const message = err instanceof Error ? err.message : fallback;
  return new BadRequestException(message);
}
