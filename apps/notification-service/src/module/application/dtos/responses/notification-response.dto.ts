/**
 * Notification Response DTOs
 * @module notification-service/application/dtos/responses
 *
 * Multi-shape output:
 *  - Full: admin (all fields)
 *  - Public: customer-safe (no PII)
 *  - Summary: list views
 *  - List: paginated
 *  - Detail: with children
 *  - Stats: aggregated
 *  - Create: for POST actions
 */
import type {
  NotificationTypeValue,
  NotificationChannelValue,
  NotificationStatusValue,
  NotificationPriorityValue,
  NotificationCategoryValue,
} from '@vubon/shared-types/platform';

// ─── Full (admin) ─────────────────────────
export interface NotificationResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: NotificationTypeValue;
  readonly category: NotificationCategoryValue;
  readonly channel: NotificationChannelValue;
  readonly priority: NotificationPriorityValue;
  readonly status: NotificationStatusValue;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly actionUrl?: string;
  readonly actions?: readonly {
    readonly id: string;
    readonly label: string;
    readonly type: string;
    readonly url?: string;
    readonly payload?: Readonly<Record<string, unknown>>;
  }[];
  readonly data?: Readonly<Record<string, unknown>>;
  readonly delivery?: {
    readonly status: string;
    readonly providerName?: string;
    readonly providerMessageId?: string;
    readonly attemptCount: number;
    readonly deliveredAt?: string;
    readonly failureReason?: string;
  };
  readonly read?: {
    readonly status: string;
    readonly readAt?: string;
    readonly archivedAt?: string;
    readonly snoozedUntil?: string;
  };
  readonly scheduledAt?: string;
  readonly sentAt?: string;
  readonly deliveredAt?: string;
  readonly expiresAt?: string;
  readonly cancelledAt?: string;
  readonly cancelledBy?: string;
  readonly cancelledReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// ─── Public (customer-safe — NO internal PII) ───
export interface NotificationPublicResponseDTO {
  readonly id: string;
  readonly type: NotificationTypeValue;
  readonly category: NotificationCategoryValue;
  readonly priority: NotificationPriorityValue;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly actionUrl?: string;
  readonly actions?: readonly {
    readonly id: string;
    readonly label: string;
    readonly type: string;
    readonly url?: string;
  }[];
  readonly isRead: boolean;
  readonly readAt?: string;
  readonly createdAt: string;
}

// ─── Summary (list views) ─────────────────
export interface NotificationSummaryResponseDTO {
  readonly id: string;
  readonly title: string;
  readonly type: NotificationTypeValue;
  readonly channel: NotificationChannelValue;
  readonly status: NotificationStatusValue;
  readonly priority: NotificationPriorityValue;
  readonly isRead: boolean;
  readonly createdAt: string;
}

// ─── List (paginated) ─────────────────────
export interface NotificationListResponseDTO {
  readonly items: readonly NotificationSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly unreadCount?: number;
}

// ─── Stats (aggregated) ───────────────────
export interface NotificationStatsResponseDTO {
  readonly total: number;
  readonly unreadCount: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byChannel: Readonly<Record<string, number>>;
  readonly byPriority: Readonly<Record<string, number>>;
}

// ─── Send response (for POST actions) ─────
export interface NotificationSendResponseDTO {
  readonly success: true;
  readonly notificationIds: readonly string[];
  readonly status: NotificationStatusValue;
  readonly queuedCount: number;
  readonly failedCount: number;
}

// ─── Feed (user's notification list) ──────
export interface NotificationUserFeedResponseDTO {
  readonly userId: string;
  readonly unreadCount: number;
  readonly totalCount: number;
  readonly items: readonly NotificationPublicResponseDTO[];
}
