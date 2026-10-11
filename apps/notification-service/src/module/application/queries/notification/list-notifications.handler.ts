import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListNotificationsQuery } from './list-notifications.query.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import type { NotificationListResponseDTO } from '../../dtos/responses/notification-response.dto.js';

@QueryHandler(ListNotificationsQuery)
export class ListNotificationsHandler
  implements IQueryHandler<ListNotificationsQuery, NotificationListResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(q: ListNotificationsQuery): Promise<NotificationListResponseDTO> {
    return this.service.list({ userId: q.userId, options: q.options });
  }
}
