/**
 * DeliveryHttpValidator — wraps App validator
 * @module logistics-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { DeliveryValidator as AppValidator } from '@application/validators/delivery/delivery.validator.js';

export class DeliveryHttpValidator {
  static validateCreate(body: unknown): void {
    try { AppValidator.validateCreate(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid create payload'); }
  }

  static validateSchedule(body: unknown): void {
    try { AppValidator.validateSchedule(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid schedule payload'); }
  }

  static validateAssign(body: unknown): void {
    try { AppValidator.validateAssign(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid assign payload'); }
  }

  static validateComplete(body: unknown): void {
    try { AppValidator.validateComplete(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid complete payload'); }
  }

  static validateFail(body: unknown): void {
    try { AppValidator.validateFail(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid fail payload'); }
  }

  static validateRefuse(body: unknown): void {
    try { AppValidator.validateRefuse(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid refuse payload'); }
  }

  static validateReschedule(body: unknown): void {
    try { AppValidator.validateReschedule(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid reschedule payload'); }
  }
}
