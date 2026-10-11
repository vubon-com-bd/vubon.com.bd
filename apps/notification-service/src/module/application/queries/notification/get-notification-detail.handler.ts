import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetNotificationDetailQuery } from './get-notification-detail.query.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import type { NotificationDetailResponseDTO } from '../../dtos/responses/notification-response.dto.js';

@QueryHandler(GetNotificationDetailQuery)
export class GetNotificationDetailHandler
  implements IQueryHandler<GetNotificationDetailQuery, NotificationDetailResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(q: GetNotificationDetailQuery): Promise<NotificationDetailResponseDTO> {
    return this.service.getDetail({ notificationId: q.notificationId });
  }
}
