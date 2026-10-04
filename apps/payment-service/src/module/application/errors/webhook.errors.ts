/**
 * Webhook Application Errors
 * @module payment-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class WebhookNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(webhookId: string) {
    super('WebhookEvent', webhookId);
    this.name = 'WebhookNotFoundApplicationError';
  }
}

export class WebhookProcessingError extends CommandError {
  constructor(gateway: string, reason: string) {
    super(`Webhook processing failed: ${reason}`, 'WebhookProcessing', undefined);
    void gateway;
    this.name = 'WebhookProcessingError';
  }
}

export class WebhookSignatureInvalidApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 401;
  constructor(gateway: string, reason?: string) {
    super(`Invalid webhook signature from "${gateway}"${reason ? `: ${reason}` : ''}`, {
      gateway,
      reason,
    });
    this.name = 'WebhookSignatureInvalidApplicationError';
  }
}

export class WebhookDuplicateApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(gateway: string, gatewayEventId: string) {
    super(`Webhook "${gatewayEventId}" from "${gateway}" already processed`, {
      gateway,
      gatewayEventId,
    });
    this.name = 'WebhookDuplicateApplicationError';
  }
}
