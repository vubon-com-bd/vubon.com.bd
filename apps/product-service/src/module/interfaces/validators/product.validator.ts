/**
 * ProductHttpValidator — wraps App validator with HTTP errors
 * @module product-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { ProductValidator as AppValidator } from '../../application/validators/product.validator.js';

export class ProductHttpValidator {
  static validateCreate(body: unknown): void {
    try {
      AppValidator.validateCreate(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid product create payload';
      throw new BadRequestException(message);
    }
  }

  static validateUpdate(body: unknown): void {
    try {
      AppValidator.validateUpdate(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid product update payload';
      throw new BadRequestException(message);
    }
  }
}
