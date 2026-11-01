/**
 * VehicleHttpValidator — wraps App validator
 * @module logistics-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { VehicleValidator as AppValidator } from '@application/validators/vehicle/vehicle.validator.js';

export class VehicleHttpValidator {
  static validateCreate(body: unknown): void {
    try { AppValidator.validateCreate(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid create payload'); }
  }

  static validateUpdate(body: unknown): void {
    try { AppValidator.validateUpdate(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid update payload'); }
  }
}
