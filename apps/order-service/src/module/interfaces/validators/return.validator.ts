/**
 * ReturnValidator (HTTP layer)
 * @module order-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { ReturnValidator as AppValidator } from '../../application/validators/return.validator.js';

export class ReturnHttpValidator {
  static validateRequest(body: unknown): void {
    try {
      AppValidator.validateRequest(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateApprove(body: unknown): void {
    try {
      AppValidator.validateApprove(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateReject(body: unknown): void {
    try {
      AppValidator.validateReject(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateComplete(body: unknown): void {
    try {
      AppValidator.validateComplete(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }
}
