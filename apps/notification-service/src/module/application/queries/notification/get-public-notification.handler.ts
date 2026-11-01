import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPublicNotificationQuery } from './get-public-notification.query.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';
import type { NotificationPublicResponseDTO } from '@application/dtos/responses/notification-response.dto.js';

@QueryHandler(GetPublicNotificationQuery)
export class GetPublicNotificationHandler
  implements IQueryHandler<GetPublicNotificationQuery, NotificationPublicResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(q: GetPublicNotificationQuery): Promise<NotificationPublicResponseDTO> {
    return this.service.getPublic(q.notificationId);
  }
}
