/**
 * Broadcast Request DTOs
 * @module notification-service/application/dtos/requests/broadcast
 */
import type {
  NotificationBroadcastTypeValue,
  NotificationBroadcastTargetValue,
} from '@vubon/shared-types/platform/notification';

export interface CreateBroadcastRequestDTO {
  readonly type: NotificationBroadcastTypeValue;
  readonly target: NotificationBroadcastTargetValue;
  readonly templateId: string;
  readonly channels: readonly string[];
  readonly estimatedRecipients?: number;
  readonly scheduledAt?: string;
  readonly segmentFilter?: Readonly<Record<string, unknown>>;
  readonly customRecipientIds?: readonly string[];
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface UpdateBroadcastRequestDTO {
  readonly broadcastId: string;
  readonly templateId?: string;
  readonly channels?: readonly string[];
  readonly estimatedRecipients?: number;
  readonly scheduledAt?: string;
  readonly segmentFilter?: Readonly<Record<string, unknown>>;
}

export interface GetBroadcastRequestDTO {
  readonly broadcastId: string;
}

export interface ListBroadcastsRequestDTO {
  readonly filter?: {
    readonly type?: string;
    readonly status?: string;
    readonly templateId?: string;
    readonly createdBy?: string;
    readonly fromDate?: string;
    readonly toDate?: string;
  };
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'scheduledAt' | 'completedAt';
  readonly sortDir?: 'asc' | 'desc';
}

export interface ScheduleBroadcastRequestDTO {
  readonly broadcastId: string;
  readonly scheduledAt: string;
}

export interface StartBroadcastRequestDTO {
  readonly broadcastId: string;
  readonly totalRecipients: number;
  readonly approvedBy?: string;
}

export interface CancelBroadcastRequestDTO {
  readonly broadcastId: string;
  readonly reason?: string;
}

export interface BroadcastStatsRequestDTO {
  readonly broadcastId: string;
}

export interface TestBroadcastRequestDTO {
  readonly broadcastId: string;
  readonly recipientIds: readonly string[];
}
