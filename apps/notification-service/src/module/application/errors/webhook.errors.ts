/**
 * Webhook Application Errors
 * @module notification-service/application/errors
 */
import {
  ApplicationNotFoundError,
  ApplicationValidationError,
  CommandError,
  QueryError,
} from '@vubon/shared-kernel/application/errors';

export class WebhookNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(webhookId: string) {
    super('Webhook', webhookId);
    this.name = 'WebhookNotFoundApplicationError';
  }
}

export class WebhookValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'WebhookValidationError';
  }
}

export class WebhookCreationError extends CommandError {
  constructor(reason: string) {
    super(`Webhook creation failed: ${reason}`, 'CreateWebhook');
    this.name = 'WebhookCreationError';
  }
}

export class WebhookUpdateError extends CommandError {
  constructor(webhookId: string, reason: string) {
    super(`Webhook "${webhookId}" update failed: ${reason}`, 'UpdateWebhook');
    this.name = 'WebhookUpdateError';
  }
}

export class WebhookTestError extends CommandError {
  constructor(webhookId: string, reason: string) {
    super(`Webhook "${webhookId}" test failed: ${reason}`, 'TestWebhook');
    this.name = 'WebhookTestError';
  }
}

export class WebhookQueryError extends QueryError {
  constructor(reason: string) {
    super(`Webhook query failed: ${reason}`, 'WebhookQuery');
    this.name = 'WebhookQueryError';
  }
}
