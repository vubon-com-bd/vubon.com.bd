/**
 * TemplateHttpValidator — wraps App validator
 * @module notification-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { TemplateValidator as AppValidator } from '@application/validators/template.validator.js';

export class TemplateHttpValidator {
  static validateCreate(body: unknown): void {
    try {
      console.log('[DEBUG] Template.validateCreate body:', JSON.stringify(body, null, 2));
      console.log('[DEBUG] body keys:', body && typeof body === 'object' ? Object.keys(body) : 'NOT-OBJECT');
      AppValidator.validateCreate(body);
    } catch (err) {
      throw new BadRequestException(
        err instanceof Error ? err.message : 'Invalid template create',
      );
    }
  }

  static validateUpdate(body: unknown): void {
    try {
      AppValidator.validateUpdate(body);
    } catch (err) {
      throw new BadRequestException(
        err instanceof Error ? err.message : 'Invalid template update',
      );
    }
  }

  static validateTest(body: unknown): void {
    try {
      AppValidator.validateTest(body);
    } catch (err) {
      throw new BadRequestException(
        err instanceof Error ? err.message : 'Invalid template test',
      );
    }
  }
}
