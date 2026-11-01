import { BadRequestException } from '@nestjs/common';
import { InsuranceValidator as AppValidator } from '@application/validators/insurance/insurance.validator.js';

export class InsuranceHttpValidator {
  static validateCreate(body: unknown): void {
    try { AppValidator.validateCreate(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid create payload'); }
  }}
