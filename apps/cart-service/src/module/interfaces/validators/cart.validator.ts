/**
 * CartHttpValidator — wraps App validator with HTTP errors
 * @module cart-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { CartValidator as AppValidator } from '../../application/validators/cart.validator.js';

export class CartHttpValidator {
  static validateCreate(body: unknown): void {
    try {
      AppValidator.validateCreate(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateUpdate(body: unknown): void {
    try {
      AppValidator.validateUpdate(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateClear(body: unknown): void {
    try {
      AppValidator.validateClear(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateDelete(body: unknown): void {
    try {
      AppValidator.validateDelete(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateRecover(body: unknown): void {
    try {
      AppValidator.validateRecover(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }
}
