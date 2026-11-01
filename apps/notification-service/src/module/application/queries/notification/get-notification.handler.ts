import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetNotificationQuery } from './get-notification.query.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';
import type { NotificationResponseDTO } from '@application/dtos/responses/notification-response.dto.js';

@QueryHandler(GetNotificationQuery)
export class GetNotificationHandler
  implements IQueryHandler<GetNotificationQuery, NotificationResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(q: GetNotificationQuery): Promise<NotificationResponseDTO> {
    return this.service.getById(q.notificationId);
  }
}
