/**
 * ShipmentHttpValidator — wraps App validator with HTTP errors
 * @module logistics-service/interfaces/validators
 *
 * ⚠️ Wraps AppValidationError → BadRequestException (HTTP-safe)
 */
import { BadRequestException } from '@nestjs/common';
import { ShipmentValidator as AppValidator } from '@application/validators/shipment/shipment.validator.js';

export class ShipmentHttpValidator {
  static validateCreate(body: unknown): void {
    try {
      AppValidator.validateCreate(body as never);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid create payload';
      throw new BadRequestException(message);
    }
  }

  static validateUpdate(body: unknown): void {
    try {
      AppValidator.validateUpdate(body as never);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid update payload';
      throw new BadRequestException(message);
    }
  }

  static validateCancel(body: unknown): void {
    try {
      AppValidator.validateCancel(body as never);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid cancel payload';
      throw new BadRequestException(message);
    }
  }

  static validateDeliver(body: unknown): void {
    try {
      AppValidator.validateDeliver(body as never);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid deliver payload';
      throw new BadRequestException(message);
    }
  }

  static validateFail(body: unknown): void {
    try {
      AppValidator.validateFail(body as never);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid fail payload';
      throw new BadRequestException(message);
    }
  }

  static validatePickUp(body: unknown): void {
    try {
      AppValidator.validatePickUp(body as never);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid pick-up payload';
      throw new BadRequestException(message);
    }
  }
}
