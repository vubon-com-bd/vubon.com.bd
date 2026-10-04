/**
 * Webhook domain errors
 * @module payment-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class WebhookEventNotFoundError extends NotFoundError {
  constructor(eventId: string) {
    super('WebhookEvent', eventId);
    this.name = 'WebhookEventNotFoundError';
  }
}

export class WebhookSignatureInvalidError extends ValidationError {
  constructor(gateway: string, reason?: string) {
    super(
      `Invalid webhook signature from "${gateway}"${reason ? ` — ${reason}` : ''}`,
      'signature',
    );
    this.name = 'WebhookSignatureInvalidError';
  }
}

export class WebhookAlreadyProcessedError extends BusinessRuleError {
  constructor(gatewayEventId: string) {
    super(
      `Webhook event "${gatewayEventId}" already processed`,
      'WEBHOOK_ALREADY_PROCESSED',
      { gatewayEventId },
    );
    this.name = 'WebhookAlreadyProcessedError';
  }
}

export class WebhookProcessingFailedError extends BusinessRuleError {
  constructor(gatewayEventId: string, attempts: number, reason: string) {
    super(
      `Webhook "${gatewayEventId}" processing failed after ${attempts} attempt(s): ${reason}`,
      'WEBHOOK_PROCESSING_FAILED',
      { gatewayEventId, attempts, reason },
    );
    this.name = 'WebhookProcessingFailedError';
  }
}
