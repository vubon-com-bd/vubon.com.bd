import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetNotificationStatsQuery } from './get-notification-stats.query';
import type { NotificationRepository } from '../../../domain/repositories/notification.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { NotificationEntity } from '../../../domain/entities/notification.entity';

export interface NotificationStatsView {
  readonly total: number;
  readonly delivered: number;
  readonly failed: number;
  readonly read: number;
}

@QueryHandler(GetNotificationStatsQuery)
export class GetNotificationStatsHandler
  extends BaseQueryHandler<GetNotificationStatsQuery, NotificationStatsView>
  implements IQueryHandler<GetNotificationStatsQuery>
{
  readonly queryType = 'notification.stats';

  constructor(private readonly notificationRepo: NotificationRepository) {
    super();
  }

  async execute(query: GetNotificationStatsQuery): Promise<NotificationStatsView> {
    const userId = UserIdVO.create(query.userId);
    const entities = await this.notificationRepo.findByUser(userId, 10000);

    const stats = entities.reduce(
      (acc: { total: number; delivered: number; failed: number; read: number }, e: NotificationEntity) => {
        acc.total++;
        if (e.status.value === 'sent' || e.status.value === 'delivered') acc.delivered++;
        if (e.status.value === 'failed') acc.failed++;
        if (e.isRead) acc.read++;
        return acc;
      },
      { total: 0, delivered: 0, failed: 0, read: 0 },
    );

    return stats;
  }
}
