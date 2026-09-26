import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetNotificationQuery } from './get-notification.query';
import type { NotificationRepository } from '../../../domain/repositories/notification.repository.interface';
import { NotificationIdVO } from '../../../domain/value-objects/primitives/notification-id.vo';
import type { NotificationDetailResponseDTO } from '../../dtos/responses/notification-detail-response.dto';

@QueryHandler(GetNotificationQuery)
export class GetNotificationHandler
  extends BaseQueryHandler<GetNotificationQuery, NotificationDetailResponseDTO | null>
  implements IQueryHandler<GetNotificationQuery>
{
  readonly queryType = 'notification.get';

  constructor(private readonly notificationRepo: NotificationRepository) {
    super();
  }

  async execute(query: GetNotificationQuery): Promise<NotificationDetailResponseDTO | null> {
    const entity = await this.notificationRepo.findById(
      NotificationIdVO.create(query.notificationId),
    );
    if (!entity) return null;

    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      category: entity.category.value,
      channel: entity.channel.value,
      priority: entity.priority.value,
      status: entity.status.value,
      title: '',
      body: '',
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as NotificationDetailResponseDTO;
  }
}
