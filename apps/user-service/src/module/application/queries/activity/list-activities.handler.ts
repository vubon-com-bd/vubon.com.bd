import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListActivitiesQuery } from './list-activities.query';
import type { UserActivityServiceInterface } from '../../services/interfaces/user-activity.service.interface';
import type { ActivityResponseDTO } from '../../dtos/responses/activity-response.dto';

@QueryHandler(ListActivitiesQuery)
export class ListActivitiesHandler
  extends BaseQueryHandler<ListActivitiesQuery, readonly ActivityResponseDTO[]>
  implements IQueryHandler<ListActivitiesQuery>
{
  readonly queryType = 'user.activity.list';

  constructor(private readonly activityService: UserActivityServiceInterface) {
    super();
  }

  async execute(query: ListActivitiesQuery): Promise<readonly ActivityResponseDTO[]> {
    return this.activityService.listByUser(query.userId, query.limit);
  }
}
