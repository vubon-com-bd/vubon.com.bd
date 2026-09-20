import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUserActivitiesQuery } from './list-user-activities.query';
import type { UserActivityRepository } from '../../../domain/repositories/user-activity.repository.interface';
import type { UserActivityResponseDTO } from '../../dtos/responses/user-activity-response.dto';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@QueryHandler(ListUserActivitiesQuery)
export class ListUserActivitiesHandler
  extends BaseQueryHandler<ListUserActivitiesQuery, readonly UserActivityResponseDTO[]>
  implements IQueryHandler<ListUserActivitiesQuery>
{
  readonly queryType = 'user.list-activities';

  constructor(@Inject('UserActivityRepository') private readonly activityRepo: UserActivityRepository) {
    super();
  }

  async execute(query: ListUserActivitiesQuery): Promise<readonly UserActivityResponseDTO[]> {
    const entities = await this.activityRepo.findRecent(
      UserIdVO.create(query.userId),
      query.limit,
    );
    return entities.map((entity) => ({
      id: entity.id,
      userId: entity.userId.value,
      type: entity.type.value,
      category: entity.category,
      occurredAt: new Date(entity.timestamp.epochMs).toISOString(),
      userAgent: entity.userAgent ?? undefined,
      ipAddress: entity.ip ?? undefined,
      metadata: entity.metadata,
    }));
  }
}
