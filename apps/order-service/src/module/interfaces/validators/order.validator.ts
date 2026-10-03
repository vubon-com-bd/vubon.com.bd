/**
 * OrderValidator (HTTP layer) — thin wrapper
 * @module order-service/interfaces/validators
 *
 * Reuses the schema-based application validator; adds NestJS-friendly
 * BadRequestException on failure.
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

  static validateHold(body: unknown): void {
    try {
      AppValidator.validateHold(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateRelease(body: unknown): void {
    try {
      AppValidator.validateRelease(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }
}
