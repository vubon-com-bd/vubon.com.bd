import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserAnalyticsQuery } from './get-user-analytics.query';
import type { NotificationRepository } from '../../../domain/repositories/notification.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

export interface UserAnalyticsView {
  readonly userId: string;
  readonly totalNotifications: number;
  readonly unread: number;
  readonly preferredChannel: string | null;
}

@QueryHandler(GetUserAnalyticsQuery)
export class GetUserAnalyticsHandler
  extends BaseQueryHandler<GetUserAnalyticsQuery, UserAnalyticsView>
  implements IQueryHandler<GetUserAnalyticsQuery>
{
  readonly queryType = 'analytics.user';

  constructor(private readonly notificationRepo: NotificationRepository) {
    super();
  }

  async execute(query: GetUserAnalyticsQuery): Promise<UserAnalyticsView> {
    const userIdVO = UserIdVO.create(query.userId);
    const notifications = await this.notificationRepo.findByUser(userIdVO, 10000);
    const unread = await this.notificationRepo.countUnread(userIdVO);

    return {
      userId: query.userId,
      totalNotifications: notifications.length,
      unread,
      preferredChannel: notifications[0]?.channel.value ?? null,
    };
  }
}
