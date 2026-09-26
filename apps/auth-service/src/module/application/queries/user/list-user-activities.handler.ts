import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUserActivitiesQuery } from './list-user-activities.query';
import type { UserActivityRepository } from '../../../domain/repositories/user-activity.repository.interface';
import type { UserActivityResponseDTO } from '../../dtos/responses/user-activity-response.dto';
import { USER_ACTIVITY_REPO } from '../../tokens';

@QueryHandler(ListUserActivitiesQuery)
export class ListUserActivitiesHandler
  extends BaseQueryHandler<ListUserActivitiesQuery, readonly UserActivityResponseDTO[]>
  implements IQueryHandler<ListUserActivitiesQuery> {
  readonly queryType = 'ListUserActivitiesQuery';
  constructor(
    @Inject(USER_ACTIVITY_REPO) private readonly repo: UserActivityRepository,
  ) { super(); }

  async execute(
    query: ListUserActivitiesQuery,
  ): Promise<readonly UserActivityResponseDTO[]> {
    const rows = await this.repo.findByUserId(query.userId, query.limit);
    return rows.map((a) => ({
      id: a.id,
      userId: a.userId,
      type: a.type,
      ipAddress: a.ipAddress,
      userAgent: a.userAgent,
      metadata: a.metadata,
      createdAt: a.createdAt,
    }));
  }
}
