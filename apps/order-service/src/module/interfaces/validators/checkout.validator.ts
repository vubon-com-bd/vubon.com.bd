/**
 * CheckoutHttpValidator
 * @module order-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { CheckoutValidator as AppValidator } from '../../application/validators/checkout.validator.js';

export class CheckoutHttpValidator {
  static validateStart(body: unknown): void {
    try {
      AppValidator.validateStart(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateSelectAddress(body: unknown): void {
    try {
      AppValidator.validateSelectAddress(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateConfirm(body: unknown): void {
    try {
      AppValidator.validateConfirm(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }
}
