/**
 * CourierHttpValidator — wraps App validator with HTTP errors
 * @module logistics-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { CourierValidator as AppValidator } from '@application/validators/courier/courier.validator.js';

export class CourierHttpValidator {
  static validateCreate(body: unknown): void {
    try {
      AppValidator.validateCreate(body as never);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid courier create payload';
      throw new BadRequestException(message);
    }
  }

  static validateUpdate(body: unknown): void {
    try {
      AppValidator.validateUpdate(body as never);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid courier update payload';
      throw new BadRequestException(message);
    }
  }

  static validateSuspend(body: unknown): void {
    try {
      AppValidator.validateSuspend?.(body as never);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid suspend payload';
      throw new BadRequestException(message);
    }
  }
}
