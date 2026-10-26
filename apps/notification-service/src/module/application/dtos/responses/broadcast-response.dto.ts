/**
 * Broadcast Response DTOs
 * @module notification-service/application/dtos/responses
 */
import type {
  NotificationBroadcastTypeValue,
  NotificationBroadcastStatusValue,
  NotificationBroadcastTargetValue,
} from '@vubon/shared-types/platform';

export interface BroadcastResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly type: NotificationBroadcastTypeValue;
  readonly target: NotificationBroadcastTargetValue;
  readonly status: NotificationBroadcastStatusValue;
  readonly channels: readonly string[];
  readonly templateId?: string;
  readonly recipientCount: number;
  readonly sentCount: number;
  readonly failedCount: number;
  readonly scheduledAt?: string;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly createdBy: string;
  readonly approvedBy?: string;
  readonly createdAt: string;
}

export interface BroadcastSummaryResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly status: NotificationBroadcastStatusValue;
  readonly recipientCount: number;
  readonly sentCount: number;
  readonly failedCount: number;
  readonly createdAt: string;
}

export interface BroadcastListResponseDTO {
  readonly items: readonly BroadcastSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface BroadcastResultResponseDTO {
  readonly broadcastId: string;
  readonly recipientCount: number;
  readonly sentCount: number;
  readonly deliveredCount: number;
  readonly failedCount: number;
  readonly openCount: number;
  readonly clickCount: number;
  readonly unsubscribedCount: number;
  readonly deliveryRate: number;
  readonly openRate: number;
  readonly clickRate: number;
  readonly unsubscribeRate: number;
  readonly durationMs: number;
  readonly throughputPerSecond: number;
}
