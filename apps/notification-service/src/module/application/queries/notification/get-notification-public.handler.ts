import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetNotificationPublicQuery } from './get-notification-public.query.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import type { NotificationPublicResponseDTO } from '../../dtos/responses/notification-response.dto.js';

@QueryHandler(GetNotificationPublicQuery)
export class GetNotificationPublicHandler
  implements IQueryHandler<GetNotificationPublicQuery, NotificationPublicResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(q: GetNotificationPublicQuery): Promise<NotificationPublicResponseDTO> {
    return this.service.getPublic({ notificationId: q.notificationId });
  }
}
