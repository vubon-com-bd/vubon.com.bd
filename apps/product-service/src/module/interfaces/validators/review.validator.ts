/**
 * ReviewHttpValidator — wraps App validator with HTTP errors
 * @module product-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { ReviewValidator as AppValidator } from '../../application/validators/review.validator.js';

export class ReviewHttpValidator {
  static validateSubmit(body: unknown): void {
    try {
      AppValidator.validateSubmit(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid review submit payload';
      throw new BadRequestException(message);
    }
  }
}
