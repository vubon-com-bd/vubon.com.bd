/**
 * ReturnHttpValidator
 * @module order-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { ReturnValidator as AppValidator } from '../../application/validators/return.validator.js';

export class ReturnHttpValidator {
  static validateRequestReturn(body: unknown): void {
    try {
      AppValidator.validateRequestReturn(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateRequestCancel(body: unknown): void {
    try {
      AppValidator.validateRequestCancel(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }
}
