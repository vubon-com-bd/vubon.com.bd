/**
 * Webhook Application Errors
 * @module logistics-service/application/errors
 *
 * Errors specific to courier webhook processing.
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class WebhookSignatureInvalidError extends ApplicationError {
  readonly code = ERROR_CODE.WEBHOOK_SIGNATURE_INVALID;
  readonly httpStatus = 401;
  constructor(provider: string) {
    super(`Webhook signature invalid for provider "${provider}"`, { provider });
    this.name = 'WebhookSignatureInvalidError';
  }
}

export class WebhookTimestampExpiredError extends ApplicationError {
  readonly code = ERROR_CODE.WEBHOOK_PROCESSING_FAILED;
  readonly httpStatus = 400;
  constructor(provider: string, timestamp: string, maxAgeSec = 300) {
    super(
      `Webhook timestamp expired for provider "${provider}" (${timestamp}, max ${maxAgeSec}s)`,
      { provider, timestamp, maxAgeSec },
    );
    this.name = 'WebhookTimestampExpiredError';
  }
}

export class WebhookPayloadInvalidError extends ApplicationValidationError {
  constructor(provider: string, reason: string) {
    super(`[Webhook.${provider}] ${reason}`, 'body');
    this.name = 'WebhookPayloadInvalidError';
  }
}

export class UnknownWebhookProviderError extends ApplicationValidationError {
  constructor(provider: string) {
    super(`Unknown webhook provider "${provider}"`, 'provider');
    this.name = 'UnknownWebhookProviderError';
  }
}

export class WebhookProcessingError extends ApplicationError {
  readonly code = ERROR_CODE.WEBHOOK_PROCESSING_FAILED;
  readonly httpStatus = 500;
  constructor(provider: string, cause: string) {
    super(`Webhook.${provider} processing failed: ${cause}`, { provider });
    this.name = 'WebhookProcessingError';
  }
}

export class WebhookDuplicateDeliveryError extends ApplicationError {
  readonly code = ERROR_CODE.DUPLICATE_REQUEST;
  readonly httpStatus = 409;
  constructor(provider: string, deliveryId: string) {
    super(`Duplicate webhook delivery for ${provider} (${deliveryId})`, {
      provider,
      deliveryId,
    });
    this.name = 'WebhookDuplicateDeliveryError';
  }
}

export class WebhookTrackNumberNotFoundError extends ApplicationError {
  readonly code = ERROR_CODE.TRACKING_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(provider: string, trackingNumber: string) {
    super(
      `Tracking "${trackingNumber}" not found for webhook from "${provider}"`,
      { provider, trackingNumber },
    );
    this.name = 'WebhookTrackNumberNotFoundError';
  }
}
