import { BadRequestException } from '@nestjs/common';
import { ReturnShipmentValidator as AppValidator } from '@application/validators/return-shipment/return-shipment.validator.js';

export class ReturnShipmentHttpValidator {
  static validateCreate(body: unknown): void {
    try { AppValidator.validateCreate(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid create payload'); }
  }
  static validateApprove(body: unknown): void {
    try { AppValidator.validateApprove?.(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid approve payload'); }
  }
}
