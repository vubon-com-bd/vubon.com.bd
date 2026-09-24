import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUnreadCountQuery } from './get-unread-count.query';
import type { NotificationRepository } from '../../../domain/repositories/notification.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@QueryHandler(GetUnreadCountQuery)
export class GetUnreadCountHandler
  extends BaseQueryHandler<GetUnreadCountQuery, { count: number }>
  implements IQueryHandler<GetUnreadCountQuery>
{
  readonly queryType = 'notification.unread-count';

  constructor(private readonly notificationRepo: NotificationRepository) {
    super();
  }

  async execute(query: GetUnreadCountQuery): Promise<{ count: number }> {
    const count = await this.notificationRepo.countUnread(
      UserIdVO.create(query.userId),
    );
    return { count };
  }
}
