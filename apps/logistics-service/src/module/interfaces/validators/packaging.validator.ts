import { BadRequestException } from '@nestjs/common';
import { PackagingValidator as AppValidator } from '@application/validators/packaging/packaging.validator.js';

export class PackagingHttpValidator {
  static validateCreate(body: unknown): void {
    try { AppValidator.validateCreate(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid create payload'); }
  }
  static validateUpdate(body: unknown): void {
    try { AppValidator.validateUpdate(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid update payload'); }
  }
}
