/**
 * PaymentHttpValidator — thin wrapper over application PaymentValidator
 * @module payment-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { PaymentValidator as AppValidator } from '../../application/validators/payment.validator.js';

export class PaymentHttpValidator {
  static validateInitiate(body: unknown): void {
    try {
      AppValidator.validateInitiate(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateVerify(body: unknown): void {
    try {
      AppValidator.validateVerify(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateRefund(body: unknown): void {
    try {
      AppValidator.validateRefund(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }
}
