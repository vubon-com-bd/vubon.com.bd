/**
 * DriverHttpValidator — wraps App validator
 * @module logistics-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { DriverValidator as AppValidator } from '@application/validators/driver/driver.validator.js';

export class DriverHttpValidator {
  static validateCreate(body: unknown): void {
    try { AppValidator.validateCreate(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid create payload'); }
  }

  static validateUpdate(body: unknown): void {
    try { AppValidator.validateUpdate(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid update payload'); }
  }
}
