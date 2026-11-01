/**
 * Delivery Response DTOs
 * @module notification-service/application/dtos/responses
 */
import type { NotificationDeliveryStatusValue } from '@vubon/shared-types/platform';

export interface DeliveryResponseDTO {
  readonly id: string;
  readonly notificationId: string;
  readonly channel: string;
  readonly status: NotificationDeliveryStatusValue;
  readonly providerName?: string;
  readonly providerMessageId?: string;
  readonly attemptCount: number;
  readonly maxAttempts: number;
  readonly sentAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly failureReason?: string;
  readonly durationMs?: number;
}

export interface DeliveryAttemptResponseDTO {
  readonly attemptNumber: number;
  readonly succeeded: boolean;
  readonly attemptedAt: string;
  readonly providerMessageId?: string;
  readonly errorMessage?: string;
  readonly durationMs?: number;
}

export interface DeliveryListResponseDTO {
  readonly items: readonly DeliveryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface DeliveryStatsResponseDTO {
  readonly totalAttempts: number;
  readonly successful: number;
  readonly failed: number;
  readonly successRate: number;
  readonly avgDurationMs: number;
  readonly p95DurationMs: number;
  readonly byErrorCode: Readonly<Record<string, number>>;
  readonly byProvider: Readonly<Record<string, number>>;
}
