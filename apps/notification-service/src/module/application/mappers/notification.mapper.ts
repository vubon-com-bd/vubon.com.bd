/**
 * NotificationMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { NotificationEntity } from '../../domain/entities/notification.entity.js';
import type {
  NotificationResponseDTO,
  NotificationPublicResponseDTO,
  NotificationSummaryResponseDTO,
  NotificationListResponseDTO,
  NotificationDetailResponseDTO,
  NotificationActionDTO,
  NotificationDeliveryDTO,
  NotificationReadDTO,
  NotificationSendResponseDTO,
} from '../dtos/responses/notification-response.dto.js';
import type {
  NotificationTypeValue,
  NotificationCategoryValue,
  NotificationChannelValue,
  NotificationStatusValue,
  NotificationPriorityValue,
  NotificationDeliveryStatusValue,
  NotificationReadStatusValue,
} from '@vubon/shared-types/platform/notification';

export class NotificationMapper {
  static toResponse(entity: NotificationEntity): NotificationResponseDTO {
    return {
      id: entity.id,
      userId: entity.userId.value,
      type: entity.type.value as NotificationTypeValue,
      category: entity.category.value as NotificationCategoryValue,
      channel: entity.channel.value as NotificationChannelValue,
      status: entity.status.value as NotificationStatusValue,
      priority: entity.priority.value as NotificationPriorityValue,
      title: entity.content.title.value,
      body: entity.content.body.value,
      imageUrl: entity.imageUrl,
      iconUrl: entity.iconUrl,
      actions: entity.actions?.actions.map((a) => this.toActionDTO(a)),
      data: entity.data,
      delivery: this.toDeliveryDTO(entity),
      read: this.toReadDTO(entity),
      reference: entity.reference
        ? {
            type: entity.reference.type,
            id: entity.reference.id,
            url: entity.reference.url,
          }
        : undefined,
      scheduledAt: entity.scheduledAt,
      sentAt: entity.sentAt,
      deliveredAt: entity.deliveredAt,
      readAt: entity.readAt,
      expiresAt: entity.expiresAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: NotificationEntity): NotificationPublicResponseDTO {
    return {
      id: entity.id,
      type: entity.type.value as NotificationTypeValue,
      category: entity.category.value as NotificationCategoryValue,
      channel: entity.channel.value as NotificationChannelValue,
      priority: entity.priority.value as NotificationPriorityValue,
      status: entity.status.value as NotificationStatusValue,
      title: entity.content.title.value,
      body: entity.content.body.value,
      imageUrl: entity.imageUrl,
      actions: entity.actions?.actions.map((a) => this.toActionDTO(a)),
      read: this.toReadDTO(entity),
      createdAt: entity.createdAt,
    };
  }

  static toSummary(entity: NotificationEntity): NotificationSummaryResponseDTO {
    return {
      id: entity.id,
      title: entity.content.title.value,
      type: entity.type.value as NotificationTypeValue,
      channel: entity.channel.value as NotificationChannelValue,
      status: entity.status.value as NotificationStatusValue,
      isRead: entity.isRead(),
      createdAt: entity.createdAt,
    };
  }

  static toListResponse(
    entities: readonly NotificationEntity[],
    total: number,
    page: number,
    limit: number,
    unreadCount: number,
  ): NotificationListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      unreadCount,
    };
  }

  static toDetail(
    entity: NotificationEntity,
  ): NotificationDetailResponseDTO {
    return {
      notification: this.toResponse(entity),
      attempts: [],
    };
  }

  static toSendResponse(entity: NotificationEntity): NotificationSendResponseDTO {
    return {
      success: true,
      notificationId: entity.id,
      status: entity.status.value as NotificationStatusValue,
      channel: entity.channel.value as NotificationChannelValue,
      provider: entity.provider,
      providerMessageId: entity.providerMessageId,
      scheduledAt: entity.scheduledAt,
    };
  }

  private static toActionDTO(a: {
    action: { value: string };
    type: { value: string };
    label: string;
    url?: { value: string };
    payload?: Readonly<Record<string, unknown>>;
  }): NotificationActionDTO {
    return {
      action: a.action.value,
      type: a.type.value,
      label: a.label,
      url: a.url?.value,
      payload: a.payload,
    };
  }

  private static toDeliveryDTO(entity: NotificationEntity): NotificationDeliveryDTO {
    return {
      status: entity.deliveryStatus.value as NotificationDeliveryStatusValue,
      attemptCount: entity.deliveryAttempts,
      provider: entity.provider,
      providerMessageId: entity.providerMessageId,
      failureReason: entity.failureReason?.value,
      deliveredAt: entity.deliveredAt,
      sentAt: entity.sentAt,
    };
  }

  private static toReadDTO(entity: NotificationEntity): NotificationReadDTO {
    return {
      status: entity.readStatus.value as NotificationReadStatusValue,
      readAt: entity.readAt,
      archivedAt: entity.archivedAt,
    };
  }
}
