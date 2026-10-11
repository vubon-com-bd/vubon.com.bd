/**
 * Webhook Response DTOs (outbound)
 * @module notification-service/application/dtos/responses
 */
import type {
  WebhookMethodValue,
  WebhookStatusValue,
  WebhookDeliveryStatusValue,
  WebhookEventValue,
} from '@vubon/shared-types/platform/notification';

export interface WebhookResponseDTO {
  readonly id: string;
  readonly url: string;
  readonly method: WebhookMethodValue;
  readonly status: WebhookStatusValue;
  readonly events: readonly WebhookEventValue[];
  readonly hasSecret: boolean;
  readonly description?: string;
  readonly failureCount: number;
  readonly lastSuccessAt?: string;
  readonly lastFailureAt?: string;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface WebhookListResponseDTO {
  readonly items: readonly WebhookResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface WebhookDeliveryResponseDTO {
  readonly id: string;
  readonly webhookId: string;
  readonly event: WebhookEventValue;
  readonly status: WebhookDeliveryStatusValue;
  readonly responseStatus?: number;
  readonly durationMs?: number;
  readonly attemptCount: number;
  readonly nextRetryAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly error?: string;
  readonly createdAt: string;
}

export interface WebhookDeliveryListResponseDTO {
  readonly items: readonly WebhookDeliveryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface WebhookTestResponseDTO {
  readonly webhookId: string;
  readonly success: boolean;
  readonly responseStatus?: number;
  readonly durationMs?: number;
  readonly error?: string;
}
