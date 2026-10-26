import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserFeedQuery } from './get-user-feed.query.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';
import type { NotificationUserFeedResponseDTO } from '@application/dtos/responses/notification-response.dto.js';

@QueryHandler(GetUserFeedQuery)
export class GetUserFeedHandler
  implements IQueryHandler<GetUserFeedQuery, NotificationUserFeedResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(q: GetUserFeedQuery): Promise<NotificationUserFeedResponseDTO> {
    return this.service.getUserFeed(q.userId, q.page, q.limit);
  }
}
