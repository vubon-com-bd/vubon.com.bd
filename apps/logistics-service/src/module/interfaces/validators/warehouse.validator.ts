/**
 * WarehouseHttpValidator — wraps App validator
 * @module logistics-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { WarehouseValidator as AppValidator } from '@application/validators/warehouse/warehouse.validator.js';

export class WarehouseHttpValidator {
  static validateCreate(body: unknown): void {
    try { AppValidator.validateCreate(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid create payload'); }
  }

  static validateUpdate(body: unknown): void {
    try { AppValidator.validateUpdate(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid update payload'); }
  }

  static validateCapacity(body: unknown): void {
    try { AppValidator.validateCapacity?.(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid capacity payload'); }
  }
}
