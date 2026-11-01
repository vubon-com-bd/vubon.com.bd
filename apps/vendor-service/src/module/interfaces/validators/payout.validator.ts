/**
 * PayoutHttpValidator — wraps App validator with HTTP errors
 * @module vendor-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { PayoutValidator as AppValidator } from '../../application/validators/payout.validator.js';

export class PayoutHttpValidator {
  static validateRequest(body: unknown): void {
    try {
      AppValidator.validateRequest(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }
}
