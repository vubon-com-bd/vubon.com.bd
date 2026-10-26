/**
 * NotificationControllerMapper — HTTP DTO ↔ App DTO
 * @module notification-service/interfaces/mappers
 *
 * Translates between HTTP-layer DTOs (with class-validator + Swagger)
 * and Application-layer DTOs (from shared-schemas)।
 */
import type {
  SendNotificationHttpDTO,
  SendBulkNotificationHttpDTO,
  CancelNotificationHttpDTO,
  ResendNotificationHttpDTO,
  ListNotificationsHttpQueryDTO,
} from '@interfaces/dtos/requests/notification.request.dto.js';

import type {
  SendNotificationRequestDTO,
  SendBulkNotificationRequestDTO,
  CancelNotificationRequestDTO,
  ResendNotificationRequestDTO,
} from '@application/dtos/requests/notification/index.js';
import type { NotificationListOptionsDTO } from '@application/services/interfaces/notification.service.interface.js';

import type {
  NotificationResponseDTO,
  NotificationPublicResponseDTO,
  NotificationSummaryResponseDTO,
  NotificationListResponseDTO,
  NotificationStatsResponseDTO,
  NotificationSendResponseDTO,
} from '@application/dtos/responses/notification-response.dto.js';
import type { NotificationDetailResponseDTO } from '@application/dtos/responses/notification-detail-response.dto.js';

import {
  NotificationHttpResponseDTO,
  NotificationPublicHttpResponseDTO,
  NotificationSummaryHttpResponseDTO,
  NotificationListHttpResponseDTO,
  NotificationStatsHttpResponseDTO,
  NotificationSendHttpResponseDTO,
} from '@interfaces/dtos/responses/notification.response.dto.js';
import { NotificationDetailHttpResponseDTO } from '@interfaces/dtos/responses/notification-detail.response.dto.js';

export class NotificationControllerMapper {
  // ═══════════════ HTTP → App ═══════════════
  static toSendRequestDTO(dto: SendNotificationHttpDTO): SendNotificationRequestDTO {
    return {
      userId: dto.userId,
      type: dto.type as never,
      category: dto.category as never,
      channels: [...dto.channels],
      priority: dto.priority as never,
      subject: dto.subject,
      body: dto.body,
      imageUrl: dto.imageUrl,
      iconUrl: dto.iconUrl,
      actionUrl: dto.actionUrl,
      data: dto.data,
      scheduledAt: dto.scheduledAt,
      expiresAt: dto.expiresAt,
      email: dto.email,
      phone: dto.phone,
      deviceToken: dto.deviceToken,
      webhookUrl: dto.webhookUrl,
    };
  }

  static toSendBulkRequestDTO(dto: SendBulkNotificationHttpDTO): SendBulkNotificationRequestDTO {
    return {
      userIds: [...dto.userIds],
      type: dto.type as never,
      category: dto.category as never,
      channels: [...dto.channels],
      priority: dto.priority as never,
      subject: dto.subject,
      body: dto.body,
      data: dto.data,
      scheduledAt: dto.scheduledAt,
    };
  }

  static toCancelRequestDTO(
    notificationId: string,
    dto: CancelNotificationHttpDTO,
  ): CancelNotificationRequestDTO {
    return {
      notificationId,
      reason: dto.reason,
      cancelledBy: dto.cancelledBy,
    };
  }

  static toResendRequestDTO(
    notificationId: string,
    dto: ResendNotificationHttpDTO,
  ): ResendNotificationRequestDTO {
    return {
      notificationId,
      channels: dto.channels ? [...dto.channels] : undefined,
      forceResend: dto.forceResend,
      reason: dto.reason,
    };
  }

  static toListOptions(q: ListNotificationsHttpQueryDTO): NotificationListOptionsDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      filter: {
        type: q.type,
        category: q.category,
        channel: q.channel,
        status: q.status,
        isRead: q.isRead,
        fromDate: q.fromDate,
        toDate: q.toDate,
      },
    };
  }

  // ═══════════════ App → HTTP ═══════════════
  static toHttpResponse(app: NotificationResponseDTO): NotificationHttpResponseDTO {
    return {
      id: app.id,
      userId: app.userId,
      type: app.type,
      category: app.category,
      channel: app.channel,
      priority: app.priority,
      status: app.status,
      title: app.title,
      body: app.body,
      imageUrl: app.imageUrl,
      iconUrl: app.iconUrl,
      actionUrl: app.actionUrl,
      actions: app.actions?.map((a) => ({
        id: a.id,
        label: a.label,
        type: a.type,
        url: a.url,
        payload: a.payload,
      })),
      data: app.data,
      delivery: app.delivery
        ? {
            status: app.delivery.status,
            providerName: app.delivery.providerName,
            providerMessageId: app.delivery.providerMessageId,
            attemptCount: app.delivery.attemptCount,
            deliveredAt: app.delivery.deliveredAt,
            failureReason: app.delivery.failureReason,
          }
        : undefined,
      read: app.read
        ? {
            status: app.read.status,
            readAt: app.read.readAt,
            archivedAt: app.read.archivedAt,
            snoozedUntil: app.read.snoozedUntil,
          }
        : undefined,
      scheduledAt: app.scheduledAt,
      sentAt: app.sentAt,
      deliveredAt: app.deliveredAt,
      expiresAt: app.expiresAt,
      cancelledAt: app.cancelledAt,
      cancelledBy: app.cancelledBy,
      cancelledReason: app.cancelledReason,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
    };
  }

  static toPublicHttpResponse(
    app: NotificationPublicResponseDTO,
  ): NotificationPublicHttpResponseDTO {
    return app as unknown as NotificationPublicHttpResponseDTO;
  }

  static toSummaryHttp(
    app: NotificationSummaryResponseDTO,
  ): NotificationSummaryHttpResponseDTO {
    return app as unknown as NotificationSummaryHttpResponseDTO;
  }

  static toListHttp(app: NotificationListResponseDTO): NotificationListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
      unreadCount: app.unreadCount,
    };
  }

  static toStatsHttp(app: NotificationStatsResponseDTO): NotificationStatsHttpResponseDTO {
    return app as unknown as NotificationStatsHttpResponseDTO;
  }

  static toSendHttp(app: NotificationSendResponseDTO): NotificationSendHttpResponseDTO {
    return app as unknown as NotificationSendHttpResponseDTO;
  }

  static toDetailHttp(app: NotificationDetailResponseDTO): NotificationDetailHttpResponseDTO {
    return app as unknown as NotificationDetailHttpResponseDTO;
  }
}
