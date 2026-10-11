import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetNotificationByIdQuery } from './get-notification-by-id.query.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import type { NotificationResponseDTO } from '../../dtos/responses/notification-response.dto.js';

@QueryHandler(GetNotificationByIdQuery)
export class GetNotificationByIdHandler
  implements IQueryHandler<GetNotificationByIdQuery, NotificationResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(q: GetNotificationByIdQuery): Promise<NotificationResponseDTO> {
    return this.service.getById({ notificationId: q.notificationId });
  }
}
