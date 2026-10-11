/**
 * Webhook (outbound) Request DTOs
 * @module notification-service/application/dtos/requests/webhook
 */
import type {
  WebhookMethodValue,
  WebhookEventValue,
} from '@vubon/shared-types/platform/notification';

export interface CreateWebhookRequestDTO {
  readonly url: string;
  readonly method: WebhookMethodValue;
  readonly events: readonly WebhookEventValue[];
  readonly secret?: string;
  readonly description?: string;
  readonly headers?: Readonly<Record<string, string>>;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface UpdateWebhookRequestDTO {
  readonly webhookId: string;
  readonly url?: string;
  readonly method?: WebhookMethodValue;
  readonly events?: readonly WebhookEventValue[];
  readonly secret?: string;
  readonly description?: string;
}

export interface GetWebhookRequestDTO {
  readonly webhookId: string;
}

export interface ListWebhooksRequestDTO {
  readonly filter?: {
    readonly status?: string;
    readonly event?: string;
    readonly search?: string;
  };
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'lastSuccessAt';
  readonly sortDir?: 'asc' | 'desc';
}

export interface ActivateWebhookRequestDTO {
  readonly webhookId: string;
}

export interface DeactivateWebhookRequestDTO {
  readonly webhookId: string;
  readonly reason?: string;
}

export interface DisableWebhookRequestDTO {
  readonly webhookId: string;
  readonly reason: string;
}

export interface TestWebhookRequestDTO {
  readonly webhookId: string;
  readonly event?: WebhookEventValue;
  readonly payload?: Readonly<Record<string, unknown>>;
}

export interface ListWebhookDeliveriesRequestDTO {
  readonly webhookId: string;
  readonly page: number;
  readonly limit: number;
  readonly filter?: {
    readonly status?: string;
    readonly event?: string;
    readonly fromDate?: string;
    readonly toDate?: string;
  };
}

export interface RetryWebhookDeliveryRequestDTO {
  readonly deliveryId: string;
}
