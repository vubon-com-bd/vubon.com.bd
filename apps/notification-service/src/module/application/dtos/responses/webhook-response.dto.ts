/**
 * Webhook Response DTOs
 * @module notification-service/application/dtos/responses
 */
import type {
  WebhookStatusValue,
  WebhookDeliveryStatusValue,
} from '@vubon/shared-types/platform';

export interface WebhookResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly status: WebhookStatusValue;
  readonly url: string;
  readonly events: readonly string[];
  readonly headers?: Readonly<Record<string, string>>;
  readonly hasSecret: boolean;
  readonly lastTriggeredAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface WebhookSummaryResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly status: WebhookStatusValue;
  readonly url: string;
  readonly eventCount: number;
  readonly lastTriggeredAt?: string;
}

export interface WebhookListResponseDTO {
  readonly items: readonly WebhookSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface WebhookDeliveryResponseDTO {
  readonly id: string;
  readonly webhookId: string;
  readonly event: string;
  readonly status: WebhookDeliveryStatusValue;
  readonly responseStatus?: number;
  readonly durationMs?: number;
  readonly attemptCount: number;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly error?: string;
  readonly createdAt: string;
}
