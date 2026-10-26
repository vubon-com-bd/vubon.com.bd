/**
 * Notification Detail Response DTO
 * @module notification-service/application/dtos/responses
 */
import type { NotificationResponseDTO } from '@application/dtos/responses/notification-response.dto.js';

export interface RecipientSummaryDTO {
  readonly id: string;
  readonly userId: string;
  readonly channel: string;
  readonly destination: string;
  readonly deliveryStatus: string;
  readonly deliveredAt?: string;
  readonly readAt?: string;
}

export interface DeliveryAttemptSummaryDTO {
  readonly attemptNumber: number;
  readonly succeeded: boolean;
  readonly attemptedAt: string;
  readonly providerMessageId?: string;
  readonly errorMessage?: string;
}

export interface NotificationDetailResponseDTO {
  readonly notification: NotificationResponseDTO;
  readonly recipients: readonly RecipientSummaryDTO[];
  readonly attempts: readonly DeliveryAttemptSummaryDTO[];
}
