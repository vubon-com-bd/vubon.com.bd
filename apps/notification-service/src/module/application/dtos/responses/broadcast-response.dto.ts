/**
 * Broadcast Response DTOs
 * @module notification-service/application/dtos/responses
 */
import type {
  NotificationBroadcastTypeValue,
  NotificationBroadcastStatusValue,
  NotificationBroadcastTargetValue,
} from '@vubon/shared-types/platform/notification';

export interface BroadcastResponseDTO {
  readonly id: string;
  readonly type: NotificationBroadcastTypeValue;
  readonly status: NotificationBroadcastStatusValue;
  readonly target: NotificationBroadcastTargetValue;
  readonly templateId: string;
  readonly estimatedRecipients?: number;
  readonly totalRecipients?: number;
  readonly processed: number;
  readonly succeeded: number;
  readonly failed: number;
  readonly progressPercent: number;
  readonly scheduledAt?: string;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly failureReasons?: readonly string[];
  readonly createdBy: string;
  readonly approvedBy?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface BroadcastListResponseDTO {
  readonly items: readonly BroadcastResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface BroadcastStatsResponseDTO {
  readonly broadcastId: string;
  readonly totalRecipients: number;
  readonly processed: number;
  readonly succeeded: number;
  readonly failed: number;
  readonly progressPercent: number;
  readonly deliveryRate: number;
  readonly failureRate: number;
}

export interface BroadcastProgressResponseDTO {
  readonly broadcastId: string;
  readonly processed: number;
  readonly total: number;
  readonly succeeded: number;
  readonly failed: number;
  readonly progressPercent: number;
}
