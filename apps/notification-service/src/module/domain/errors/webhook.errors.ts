/**
 * Notification webhook domain errors
 * @module notification-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class WebhookNotFoundError extends NotFoundError {
  constructor(webhookId: string) {
    super('NotificationWebhook', webhookId);
    this.name = 'WebhookNotFoundError';
  }
}

export class InvalidWebhookMethodError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid webhook method "${value}". Allowed: ${allowed.join(', ')}`, 'method');
    this.name = 'InvalidWebhookMethodError';
  }
}

export class InvalidWebhookStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid webhook status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidWebhookStatusError';
  }
}

export class InvalidWebhookEventError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid webhook event "${value}". Allowed: ${allowed.join(', ')}`, 'event');
    this.name = 'InvalidWebhookEventError';
  }
}

export class WebhookUrlInvalidError extends ValidationError {
  constructor(url: string) {
    super(`Invalid webhook URL: ${url}`, 'url');
    this.name = 'WebhookUrlInvalidError';
  }
}

export class WebhookDeliveryFailedError extends BusinessRuleError {
  constructor(webhookId: string, attempts: number, reason: string) {
    super(
      `Webhook "${webhookId}" delivery failed after ${attempts} attempt(s): ${reason}`,
      'WEBHOOK_DELIVERY_FAILED',
      { webhookId, attempts, reason },
    );
    this.name = 'WebhookDeliveryFailedError';
  }
}

export class MaxActiveWebhooksReachedError extends BusinessRuleError {
  constructor(max: number) {
    super(
      `Maximum active webhooks reached (${max})`,
      'MAX_ACTIVE_WEBHOOKS_REACHED',
      { max },
    );
    this.name = 'MaxActiveWebhooksReachedError';
  }
}
