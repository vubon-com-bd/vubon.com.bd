import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListNotificationsQuery } from './list-notifications.query';
import type { NotificationRepository } from '../../../domain/repositories/notification.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { NotificationEntity } from '../../../domain/entities/notification.entity';
import type {
  NotificationResponseDTO,
} from '../../dtos/responses/notification-response.dto';
import type { NotificationListResponseDTO } from '../../dtos/responses/notification-list-response.dto';

@QueryHandler(ListNotificationsQuery)
export class ListNotificationsHandler
  extends BaseQueryHandler<ListNotificationsQuery, NotificationListResponseDTO>
  implements IQueryHandler<ListNotificationsQuery>
{
  readonly queryType = 'notification.list';

  constructor(private readonly notificationRepo: NotificationRepository) {
    super();
  }

  async execute(query: ListNotificationsQuery): Promise<NotificationListResponseDTO> {
    const userId = UserIdVO.create(query.userId);

    const entities = query.onlyUnread
      ? await this.notificationRepo.findUnread(userId)
      : await this.notificationRepo.findByUser(userId, query.limit);

    const items = entities.map((e: NotificationEntity) => this.toDTO(e));

    return {
      items,
      total: items.length,
      page: 1,
      limit: query.limit,
      hasNext: items.length >= query.limit,
    };
  }

  private toDTO(entity: NotificationEntity): NotificationResponseDTO {
    return {
      id: entity.id.value,
      type: entity.type.value as NotificationResponseDTO['type'],
      category: entity.category.value as NotificationResponseDTO['category'],
      channel: entity.channel.value as NotificationResponseDTO['channel'],
      priority: entity.priority.value as NotificationResponseDTO['priority'],
      status: entity.status.value as NotificationResponseDTO['status'],
      title: '',
      body: '',
      createdAt: entity.createdAt,
      read: entity.isRead
        ? { status: 'read' as const }
        : { status: 'unread' as const },
    };
  }
}
