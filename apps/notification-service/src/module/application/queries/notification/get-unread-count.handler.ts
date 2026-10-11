import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUnreadCountQuery } from './get-unread-count.query.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import type { NotificationUnreadCountResponseDTO } from '../../dtos/responses/notification-response.dto.js';

@QueryHandler(GetUnreadCountQuery)
export class GetUnreadCountHandler
  implements IQueryHandler<GetUnreadCountQuery, NotificationUnreadCountResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(q: GetUnreadCountQuery): Promise<NotificationUnreadCountResponseDTO> {
    return this.service.getUnreadCount(q.userId);
  }
}
