/**
 * RefundHttpValidator — wraps Application validator → BadRequestException
 * @module payment-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { RefundValidator as AppRefundValidator } from '@application/validators/refund.validator';

export class RefundHttpValidator {
  static validateRequest(body: unknown): void {
    try {
      AppRefundValidator.validateRequest(body);
    } catch (err) {
      throw toBadRequest(err, 'Invalid refund payload');
    }
  }
}

function toBadRequest(err: unknown, fallback: string): BadRequestException {
  const message = err instanceof Error ? err.message : fallback;
  return new BadRequestException(message);
}
