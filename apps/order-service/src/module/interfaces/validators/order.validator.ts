/**
 * OrderHttpValidator — HTTP wrapper over App validator
 * @module order-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { OrderValidator as AppValidator } from '../../application/validators/order.validator.js';

export class OrderHttpValidator {
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

  static validateConfirm(body: unknown): void {
    try {
      AppValidator.validateConfirm(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateHold(body: unknown): void {
    try {
      AppValidator.validateHold(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }
}
