/**
 * ListActivitiesHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListActivitiesQuery } from './list-activities.query.js';
import { USER_ACTIVITY_REPOSITORY } from '@domain/repositories/user-activity.repository.interface';
import type { UserActivityRepository } from '@domain/repositories/user-activity.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ActivityTypeVO } from '@domain/value-objects/primitives/activity-type.vo';
import { UserActivityMapper } from '../../mappers/user-activity.mapper.js';
import type { ActivityResponseDTO } from '../../dtos/responses/activity-response.dto.js';

export interface ListActivitiesResult {
  readonly items: readonly ActivityResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

@QueryHandler(ListActivitiesQuery)
export class ListActivitiesHandler
  implements IQueryHandler<ListActivitiesQuery, ListActivitiesResult>
{
  constructor(
    @Inject(USER_ACTIVITY_REPOSITORY)
    private readonly activityRepo: UserActivityRepository
  ) {}

  async execute(query: ListActivitiesQuery): Promise<ListActivitiesResult> {
    const result = await this.activityRepo.findPaginated(
      UserIdVO.create(query.userId),
      {
        page: query.page,
        limit: query.limit,
        type: query.activityType
          ? ActivityTypeVO.create(query.activityType)
          : undefined,
      }
    );

    return {
      items: UserActivityMapper.toResponseList(result.items),
      total: result.total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(result.total / query.limit) || 0,
    };
  }
}
