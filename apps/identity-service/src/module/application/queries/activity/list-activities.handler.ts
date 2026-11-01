import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListActivitiesQuery } from './list-activities.query.js';
import type { UserActivityResponseDTO } from '../../dtos/responses/user-activity-response.dto.js';
import type { UserActivityServiceInterface } from '../../services/interfaces/user-activity.service.interface.js';
import { USER_ACTIVITY_SERVICE } from '../../services/interfaces/user-activity.service.interface.js';

@QueryHandler(ListActivitiesQuery)
export class ListActivitiesQueryHandler
  extends BaseQueryHandler<ListActivitiesQuery, readonly UserActivityResponseDTO[]>
  implements IQueryHandler<ListActivitiesQuery>
{
  readonly queryType = 'user.list-activities';
  constructor(@Inject(USER_ACTIVITY_SERVICE) private readonly service: UserActivityServiceInterface) { super(); }
  async execute(q: ListActivitiesQuery): Promise<readonly UserActivityResponseDTO[]> {
    return this.service.listForUser(q.userId, q.limit);
  }
}
