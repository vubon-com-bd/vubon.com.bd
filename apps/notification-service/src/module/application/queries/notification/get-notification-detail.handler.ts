import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetNotificationDetailQuery } from './get-notification-detail.query.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';
import type { NotificationDetailResponseDTO } from '@application/dtos/responses/notification-detail-response.dto.js';

@QueryHandler(GetNotificationDetailQuery)
export class GetNotificationDetailHandler
  implements IQueryHandler<GetNotificationDetailQuery, NotificationDetailResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(q: GetNotificationDetailQuery): Promise<NotificationDetailResponseDTO> {
    return this.service.getDetail(q.notificationId);
  }
}
