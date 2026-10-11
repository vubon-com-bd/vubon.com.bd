/**
 * NotificationControllerMapper — HTTP DTO ↔ Application DTO
 * @module notification-service/interfaces/mappers
 */
import type {
  SendNotificationHttpDTO,
  SendNotificationToManyHttpDTO,
  NotificationActionInputHttpDTO,
} from '../dtos/requests/notification/send-notification.http-dto.js';
import type { ListNotificationsHttpQueryDTO } from '../dtos/requests/notification/list-notifications.http-dto.js';
import type {
  SendNotificationRequestDTO,
  SendNotificationToManyRequestDTO,
  NotificationActionInputDTO,
} from '../../application/dtos/requests/notification/send-notification.dto.js';
import type { NotificationListOptionsDTO } from '../../application/dtos/requests/notification/list-notifications.dto.js';

export class NotificationControllerMapper {
  static toSendAppDto(dto: SendNotificationHttpDTO): SendNotificationRequestDTO {
    return {
      userId: dto.userId,
      type: dto.type as never,
      category: dto.category as never,
      channels: dto.channels as never,
      priority: dto.priority as never,
      title: dto.title,
      body: dto.body,
      imageUrl: dto.imageUrl,
      iconUrl: dto.iconUrl,
      actions: dto.actions?.map((a) => this.toActionAppDto(a)),
      data: dto.data,
      scheduledAt: dto.scheduledAt,
      expiresAt: dto.expiresAt,
      reference: dto.reference,
    };
  }

  static toSendManyAppDto(dto: SendNotificationToManyHttpDTO): SendNotificationToManyRequestDTO {
    return {
      userIds: dto.userIds,
      type: dto.type as never,
      category: dto.category as never,
      channels: dto.channels as never,
      priority: dto.priority as never,
      title: dto.title,
      body: dto.body,
      imageUrl: dto.imageUrl,
      iconUrl: dto.iconUrl,
      data: dto.data,
      scheduledAt: dto.scheduledAt,
    };
  }

  static toListOptions(q: ListNotificationsHttpQueryDTO): NotificationListOptionsDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      sortBy: q.sortBy as never,
      sortDir: q.sortDir,
      filter: {
        type: q.type as never,
        category: q.category as never,
        channel: q.channel as never,
        status: q.status as never,
        priority: q.priority as never,
        isRead: q.isRead === undefined ? undefined : q.isRead === 'true',
        fromDate: q.fromDate,
        toDate: q.toDate,
        referenceType: q.referenceType,
        referenceId: q.referenceId,
        search: q.search,
      },
    };
  }

  private static toActionAppDto(a: NotificationActionInputHttpDTO): NotificationActionInputDTO {
    return {
      action: a.action,
      type: a.type,
      label: a.label,
      url: a.url,
      payload: a.payload,
    };
  }
}
