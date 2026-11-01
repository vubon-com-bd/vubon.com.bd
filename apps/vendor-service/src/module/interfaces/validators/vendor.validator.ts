/**
 * VendorHttpValidator — wraps App validator with HTTP errors
 * @module vendor-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { VendorValidator as AppValidator } from '../../application/validators/vendor.validator.js';

export class VendorHttpValidator {
  static validateRegister(body: unknown): void {
    try {
      AppValidator.validateRegister(body);
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
}
