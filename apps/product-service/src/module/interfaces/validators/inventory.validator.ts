/**
 * InventoryHttpValidator — wraps App validator with HTTP errors
 * @module product-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { InventoryValidator as AppValidator } from '../../application/validators/inventory.validator.js';

export class InventoryHttpValidator {
  static validateUpdate(body: unknown): void {
    try {
      AppValidator.validateUpdate(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid inventory update payload';
      throw new BadRequestException(message);
    }
  }

  static validateSet(body: unknown): void {
    try {
      AppValidator.validateSet(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid inventory set payload';
      throw new BadRequestException(message);
    }
  }
}
