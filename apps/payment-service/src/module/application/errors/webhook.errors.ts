/**
 * Webhook Application Errors
 * @module payment-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class WebhookValidationError extends CommandError {
  constructor(provider: string, reason: string) {
    super(`Webhook validation failed for "${provider}": ${reason}`, 'HandleWebhook');
    this.name = 'WebhookValidationError';
  }
}

export class WebhookSignatureInvalidError extends ApplicationError {
  readonly code = ERROR_CODE.AUTH_UNAUTHORIZED;
  readonly httpStatus = 401;

  constructor(provider: string) {
    super(`Webhook signature invalid for provider "${provider}"`, { provider });
    this.name = 'WebhookSignatureInvalidError';
  }
}

export class WebhookProcessingError extends CommandError {
  constructor(provider: string, reason: string) {
    super(`Webhook processing failed for "${provider}": ${reason}`, 'HandleWebhook');
    this.name = 'WebhookProcessingError';
  }
}

export class WebhookPayloadInvalidError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 422;

  constructor(provider: string, field?: string) {
    super(`Invalid webhook payload from "${provider}"`, { provider, field });
    this.name = 'WebhookPayloadInvalidError';
  }
}

export class WebhookProviderUnsupportedError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 400;

  constructor(provider: string) {
    super(`Unsupported webhook provider "${provider}"`, { provider });
    this.name = 'WebhookProviderUnsupportedError';
  }
}
