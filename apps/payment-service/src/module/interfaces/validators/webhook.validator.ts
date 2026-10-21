/**
 * WebhookHttpValidator — validates webhook payloads
 * @module payment-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { WebhookValidator as AppWebhookValidator } from '@application/validators/webhook.validator';

export class WebhookHttpValidator {
  static validateProvider(provider: string): string {
    try {
      return AppWebhookValidator.validateProvider(provider);
    } catch (err) {
      throw toBadRequest(err, `Unsupported webhook provider "${provider}"`);
    }
  }

  static validatePayload(provider: string, payload: unknown): void {
    try {
      switch (provider) {
        case 'bkash':
          AppWebhookValidator.validateBkash(payload);
          break;
        case 'nagad':
          AppWebhookValidator.validateNagad(payload);
          break;
        case 'stripe':
          AppWebhookValidator.validateStripe(payload);
          break;
        case 'sslcommerz':
          AppWebhookValidator.validateSslcommerz(payload);
          break;
        default:
          // Unknown provider — accept (handled in controller)
          break;
      }
    } catch (err) {
      throw toBadRequest(err, 'Invalid webhook payload');
    }
  }
}

function toBadRequest(err: unknown, fallback: string): BadRequestException {
  const message = err instanceof Error ? err.message : fallback;
  return new BadRequestException(message);
}
