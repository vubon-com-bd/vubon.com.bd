/**
 * Webhook / Delivery / Analytics Application Errors
 * @module notification-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

// ═══ Webhook (outbound) ═══
export class WebhookNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(webhookId: string) {
    super('NotificationWebhook', webhookId);
    this.name = 'WebhookNotFoundApplicationError';
  }
}

export class WebhookDeliveryFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 502;
  constructor(webhookId: string, attempt: number, reason: string) {
    super(`Webhook "${webhookId}" delivery failed on attempt ${attempt}: ${reason}`, {
      webhookId,
      attempt,
      reason,
    });
    this.name = 'WebhookDeliveryFailedError';
  }
}

export class MaxActiveWebhooksReachedError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;
  constructor(max: number) {
    super(`Maximum active webhooks reached (${max})`, { max });
    this.name = 'MaxActiveWebhooksReachedError';
  }
}

export class WebhookValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'WebhookValidationError';
  }
}

// ═══ Delivery ═══
export class DeliveryNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(deliveryId: string) {
    super('NotificationDelivery', deliveryId);
    this.name = 'DeliveryNotFoundApplicationError';
  }
}

export class DeliveryRetryNotAllowedError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;
  constructor(notificationId: string, reason: string) {
    super(`Retry not allowed for notification "${notificationId}": ${reason}`, {
      notificationId,
      reason,
    });
    this.name = 'DeliveryRetryNotAllowedError';
  }
}

// ═══ Analytics ═══
export class AnalyticsQueryError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;
  constructor(message: string) {
    super(`Analytics query failed: ${message}`);
    this.name = 'AnalyticsQueryError';
  }
}
