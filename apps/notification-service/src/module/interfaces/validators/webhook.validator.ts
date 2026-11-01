/**
 * WebhookHttpValidator — wraps App validator
 * @module notification-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { WebhookValidator as AppValidator } from '@application/validators/webhook.validator.js';

export class WebhookHttpValidator {
  static validateCreate(body: unknown): void {
    try {
      AppValidator.validateCreate(body);
    } catch (err) {
      throw new BadRequestException(
        err instanceof Error ? err.message : 'Invalid webhook create',
      );
    }
  }

  static validateUpdate(body: unknown): void {
    try {
      AppValidator.validateUpdate(body);
    } catch (err) {
      throw new BadRequestException(
        err instanceof Error ? err.message : 'Invalid webhook update',
      );
    }
  }

  static validateTest(body: unknown): void {
    try {
      AppValidator.validateTest(body);
    } catch (err) {
      throw new BadRequestException(
        err instanceof Error ? err.message : 'Invalid webhook test',
      );
    }
  }
}
