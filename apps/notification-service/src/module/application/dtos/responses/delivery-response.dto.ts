/**
 * Delivery Response DTOs
 * @module notification-service/application/dtos/responses
 */
import type { NotificationDeliveryStatusValue } from '@vubon/shared-types/platform/notification';

export interface DeliveryAttemptResponseDTO {
  readonly id: string;
  readonly notificationId: string;
  readonly channel: string;
  readonly provider: string;
  readonly attempt: number;
  readonly status: NotificationDeliveryStatusValue;
  readonly startedAt: string;
  readonly completedAt?: string;
  readonly durationMs?: number;
  readonly providerMessageId?: string;
  readonly failureReason?: string;
  readonly failureCode?: string;
  readonly retryable: boolean;
}

export interface DeliveryResponseDTO {
  readonly notificationId: string;
  readonly status: NotificationDeliveryStatusValue;
  readonly attemptCount: number;
  readonly lastAttemptAt?: string;
  readonly deliveredAt?: string;
  readonly sentAt?: string;
  readonly failureReason?: string;
  readonly attempts: readonly DeliveryAttemptResponseDTO[];
}

export interface DeliveryListResponseDTO {
  readonly items: readonly DeliveryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface DeliveryRetryResponseDTO {
  readonly notificationId: string;
  readonly scheduled: boolean;
  readonly attempt: number;
  readonly nextAttemptAt?: string;
  readonly delayMs?: number;
  readonly reason?: string;
}
