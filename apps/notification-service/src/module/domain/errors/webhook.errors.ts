/* istanbul ignore file -- pure error declarations */
/**
 * Webhook Domain Errors
 * @module notification-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class WebhookNotFoundError extends NotFoundError {
  constructor(webhookId: string) {
    super('Webhook', webhookId);
    this.name = 'WebhookNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class WebhookUrlAlreadyExistsError extends ConflictError {
  constructor(url: string) {
    super(`Webhook URL "${url}" already exists`, 'url');
    this.name = 'WebhookUrlAlreadyExistsError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidWebhookStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid webhook status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidWebhookStatusError';
  }
}

export class InvalidWebhookTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid webhook type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidWebhookTypeError';
  }
}

export class InvalidWebhookUrlError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid webhook URL: ${reason}`, 'url');
    this.name = 'InvalidWebhookUrlError';
  }
}

export class InvalidWebhookSecretError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid webhook secret: ${reason}`, 'secret');
    this.name = 'InvalidWebhookSecretError';
  }
}

// ─── Business Rule (400) ───────────────────
export class WebhookInactiveError extends BusinessRuleError {
  constructor(webhookId: string) {
    super(`Webhook "${webhookId}" is inactive`, 'WEBHOOK_INACTIVE', { webhookId });
    this.name = 'WebhookInactiveError';
  }
}

export class WebhookDeliveryFailedError extends BusinessRuleError {
  constructor(webhookId: string, status: number, reason: string) {
    super(
      `Webhook "${webhookId}" delivery failed with status ${status}: ${reason}`,
      'WEBHOOK_DELIVERY_FAILED',
      { webhookId, status, reason },
    );
    this.name = 'WebhookDeliveryFailedError';
  }
}

export class WebhookPayloadTooLargeError extends BusinessRuleError {
  constructor(sizeKb: number, maxKb: number) {
    super(
      `Webhook payload size ${sizeKb}KB exceeds maximum ${maxKb}KB`,
      'WEBHOOK_PAYLOAD_TOO_LARGE',
      { sizeKb, maxKb },
    );
    this.name = 'WebhookPayloadTooLargeError';
  }
}
