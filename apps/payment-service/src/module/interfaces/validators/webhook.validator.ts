/**
 * WebhookHttpValidator
 * @module payment-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { WebhookValidator as AppValidator } from '../../application/validators/webhook.validator.js';

export class WebhookHttpValidator {
  static validate(body: unknown): void {
    try {
      AppValidator.validate(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid webhook payload';
      throw new BadRequestException(message);
    }
  }
}
