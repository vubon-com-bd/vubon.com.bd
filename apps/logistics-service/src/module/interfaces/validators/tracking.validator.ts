/**
 * TrackingHttpValidator — wraps App validator
 * @module logistics-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { TrackingValidator as AppValidator } from '@application/validators/tracking/tracking.validator.js';

export class TrackingHttpValidator {
  static validateCreate(body: unknown): void {
    try { AppValidator.validateCreate(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid create payload'); }
  }

  static validateAddEvent(body: unknown): void {
    try { AppValidator.validateAddEvent?.(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid add-event payload'); }
  }
}
