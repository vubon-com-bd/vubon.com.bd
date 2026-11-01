/**
 * DispatchHttpValidator — wraps App validator
 * @module logistics-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { DispatchValidator as AppValidator } from '@application/validators/dispatch/dispatch.validator.js';

export class DispatchHttpValidator {
  static validateCreate(body: unknown): void {
    try { AppValidator.validateCreate(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid create payload'); }
  }

  static validateAssign(body: unknown): void {
    try { AppValidator.validateAssign?.(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid assign payload'); }
  }
}
