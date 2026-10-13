/**
 * VariantHttpValidator — wraps App validator with HTTP errors
 * @module product-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { VariantValidator as AppValidator } from '../../application/validators/variant.validator.js';

export class VariantHttpValidator {
  static validateAdd(body: unknown): void {
    try {
      AppValidator.validateAdd(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid variant add payload';
      throw new BadRequestException(message);
    }
  }
}
