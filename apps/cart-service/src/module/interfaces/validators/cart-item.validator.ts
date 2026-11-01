/**
 * CartItemHttpValidator
 * @module cart-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { CartItemValidator as AppValidator } from '../../application/validators/cart-item.validator.js';

export class CartItemHttpValidator {
  static validateAdd(body: unknown): void {
    try {
      AppValidator.validateAdd(body);
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

  static validateRemove(body: unknown): void {
    try {
      AppValidator.validateRemove(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateQuantity(body: unknown): void {
    try {
      AppValidator.validateQuantity(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateSelect(body: unknown): void {
    try {
      AppValidator.validateSelect(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateMoveToSaved(body: unknown): void {
    try {
      AppValidator.validateMoveToSaved(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }
}
