import type { WebhookRequestDto } from '../dtos/requests/webhook.request.dto';

export class WebhookValidator {
  static validate(input: WebhookRequestDto): void {
    if (!input.rawBody || input.rawBody.length === 0) {
      throw new Error('Webhook raw body is required');
    }
    if (!input.signature || input.signature.length === 0) {
      throw new Error('Webhook signature is required');
    }
  }
}
