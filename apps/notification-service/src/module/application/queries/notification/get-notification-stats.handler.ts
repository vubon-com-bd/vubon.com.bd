import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetNotificationStatsQuery } from './get-notification-stats.query.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import type { NotificationStatsResponseDTO } from '../../dtos/responses/notification-response.dto.js';

@QueryHandler(GetNotificationStatsQuery)
export class GetNotificationStatsHandler
  implements IQueryHandler<GetNotificationStatsQuery, NotificationStatsResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(q: GetNotificationStatsQuery): Promise<NotificationStatsResponseDTO> {
    return this.service.getStats({ userId: q.userId, fromDate: q.fromDate, toDate: q.toDate });
  }
}
