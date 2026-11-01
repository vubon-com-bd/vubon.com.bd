import { BadRequestException } from '@nestjs/common';
import { ReturnReasonValidator as AppValidator } from '@application/validators/return-reason/return-reason.validator.js';

export class ReturnReasonHttpValidator {
  static validateCreate(body: unknown): void {
    try { AppValidator.validateCreate(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid create payload'); }
  }
  static validateUpdate(body: unknown): void {
    try { AppValidator.validateUpdate(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid update payload'); }
  }
}
