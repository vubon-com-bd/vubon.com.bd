import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CountUnreadQuery } from './count-unread.query.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';

@QueryHandler(CountUnreadQuery)
export class CountUnreadHandler
  implements IQueryHandler<CountUnreadQuery, { readonly count: number }>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(q: CountUnreadQuery): Promise<{ readonly count: number }> {
    const count = await this.service.countUnread(q.userId);
    return { count };
  }
}
