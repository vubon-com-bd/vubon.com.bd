/**
 * CouponHttpValidator
 * @module cart-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { CouponValidator as AppValidator } from '../../application/validators/coupon.validator.js';

export class CouponHttpValidator {
  static validateApply(body: unknown): void {
    try {
      AppValidator.validateApply(body);
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

  static validateValidate(body: unknown): void {
    try {
      AppValidator.validateValidate(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }
}
