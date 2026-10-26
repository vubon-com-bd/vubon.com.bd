/**
 * NotificationMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 *
 * Multi-shape output:
 *  - toResponse: full (admin)
 *  - toPublicResponse: customer-safe
 *  - toSummary: list views
 *  - toListResponse: paginated
 *  - toDetail: with children
 *  - toStats: aggregated
 */
import type { NotificationEntity } from '@domain/entities/notification.entity.js';
import type { NotificationRecipientEntity } from '@domain/entities/notification-recipient.entity.js';
import type { NotificationAttemptEntity } from '@domain/entities/notification-attempt.entity.js';

import type {
  NotificationResponseDTO,
  NotificationPublicResponseDTO,
  NotificationSummaryResponseDTO,
  NotificationListResponseDTO,
  NotificationStatsResponseDTO,
} from '@application/dtos/responses/notification-response.dto.js';
import type {
  NotificationDetailResponseDTO,
  RecipientSummaryDTO,
  DeliveryAttemptSummaryDTO,
} from '@application/dtos/responses/notification-detail-response.dto.js';

export class NotificationMapper {
  // ─── Full (admin) ─────────────────────
  static toResponse(entity: NotificationEntity): NotificationResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      userId: vo.userId.value,
      type: vo.type.value as never,
      category: vo.category.value as never,
      channel: vo.channel.value as never,
      priority: vo.priority.value as never,
      status: vo.status.value as never,
      title: vo.subject.value,
      body: vo.body.value,
      imageUrl: entity.content.imageUrl?.value,
      iconUrl: entity.content.iconUrl?.value,
      actionUrl: entity.content.actionUrl?.value,
      actions: entity.actions.map((a) => ({
        id: a.id.value,
        label: a.label,
        type: a.type.value,
        url: a.url?.value,
        payload: a.payload,
      })),
      data: vo.data.value,
      delivery: entity.delivery
        ? {
            status: entity.delivery.status.value,
            providerName: entity.delivery.providerName?.value,
            providerMessageId: entity.delivery.providerMessageId?.value,
            attemptCount: entity.delivery.attemptCount,
            deliveredAt: entity.delivery.deliveredAt,
            failureReason: undefined,
          }
        : undefined,
      read: undefined,
      scheduledAt: entity.scheduledAt,
      sentAt: entity.sentAt,
      deliveredAt: entity.deliveredAt,
      expiresAt: entity.expiresAt,
      cancelledAt: entity.cancelledAt,
      cancelledBy: entity.cancelledBy,
      cancelledReason: entity.cancelledReason,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  // ─── Public (customer-safe) ───────────
  static toPublicResponse(entity: NotificationEntity): NotificationPublicResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      type: vo.type.value as never,
      category: vo.category.value as never,
      priority: vo.priority.value as never,
      title: vo.subject.value,
      body: vo.body.value,
      imageUrl: entity.content.imageUrl?.value,
      actionUrl: entity.content.actionUrl?.value,
      actions: entity.actions.map((a) => ({
        id: a.id.value,
        label: a.label,
        type: a.type.value,
        url: a.url?.value,
      })),
      isRead: false,
      readAt: undefined,
      createdAt: entity.createdAt,
    };
  }

  // ─── Summary (list) ───────────────────
  static toSummary(entity: NotificationEntity): NotificationSummaryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      title: vo.subject.value,
      type: vo.type.value as never,
      channel: vo.channel.value as never,
      status: vo.status.value as never,
      priority: vo.priority.value as never,
      isRead: false,
      createdAt: entity.createdAt,
    };
  }

  // ─── List (paginated) ─────────────────
  static toListResponse(
    entities: readonly NotificationEntity[],
    total: number,
    page: number,
    limit: number,
  ): NotificationListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ─── Detail (with children) ───────────
  static toDetail(entity: NotificationEntity): NotificationDetailResponseDTO {
    return {
      notification: this.toResponse(entity),
      recipients: [],
      attempts: [],
    };
  }

  // ─── Detail with children (full) ──────
  static toDetailWithChildren(
    entity: NotificationEntity,
    recipients: readonly NotificationRecipientEntity[],
    attempts: readonly NotificationAttemptEntity[],
  ): NotificationDetailResponseDTO {
    return {
      notification: this.toResponse(entity),
      recipients: recipients.map((r) => this.toRecipientSummary(r)),
      attempts: attempts.map((a) => this.toAttemptSummary(a)),
    };
  }

  // ─── Recipient summary ────────────────
  static toRecipientSummary(entity: NotificationRecipientEntity): RecipientSummaryDTO {
    return {
      id: entity.id,
      userId: entity.recipient.userId.value,
      channel: entity.recipient.channel.value,
      destination: entity.recipient.maskedDestination,
      deliveryStatus: entity.deliveryStatus.value,
      deliveredAt: entity.deliveredAt,
      readAt: entity.readAt,
    };
  }

  // ─── Attempt summary ──────────────────
  static toAttemptSummary(entity: NotificationAttemptEntity): DeliveryAttemptSummaryDTO {
    return {
      attemptNumber: entity.attempt.attempt.attemptNumber,
      succeeded: entity.attempt.succeeded,
      attemptedAt: entity.attempt.attempt.attemptedAt,
      providerMessageId: entity.attempt.attempt.providerMessageId,
      errorMessage: entity.attempt.error?.message,
    };
  }

  // ─── Stats ────────────────────────────
  static toStatsResponse(stats: {
    total: number;
    unreadCount: number;
    byStatus: Readonly<Record<string, number>>;
    byChannel: Readonly<Record<string, number>>;
    byPriority: Readonly<Record<string, number>>;
  }): NotificationStatsResponseDTO {
    return {
      total: stats.total,
      unreadCount: stats.unreadCount,
      byStatus: stats.byStatus,
      byChannel: stats.byChannel,
      byPriority: stats.byPriority,
    };
  }
}
