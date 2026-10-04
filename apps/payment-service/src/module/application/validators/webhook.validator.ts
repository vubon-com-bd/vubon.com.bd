/**
 * WebhookValidator — manual validation for webhook payloads
 * @module payment-service/application/validators
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import type { ProcessWebhookRequestDTO } from '../dtos/requests/webhook/webhook.dto.js';

export class WebhookValidator {
  static validate(input: unknown): ProcessWebhookRequestDTO {
    if (typeof input !== 'object' || input === null) {
      throw new ApplicationValidationError('Webhook payload must be an object');
    }
    const dto = input as Partial<ProcessWebhookRequestDTO>;

    if (!dto.gateway || typeof dto.gateway !== 'string') {
      throw new ApplicationValidationError('gateway is required', 'gateway');
    }
    if (!dto.gatewayEventId || typeof dto.gatewayEventId !== 'string') {
      throw new ApplicationValidationError('gatewayEventId is required', 'gatewayEventId');
    }
    if (!dto.eventType || typeof dto.eventType !== 'string') {
      throw new ApplicationValidationError('eventType is required', 'eventType');
    }
    if (typeof dto.payload !== 'object' || dto.payload === null) {
      throw new ApplicationValidationError('payload is required', 'payload');
    }

    return dto as ProcessWebhookRequestDTO;
  }
}
