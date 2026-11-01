import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUserActivitiesQuery } from './list-user-activities.query.js';
import type { UserActivityResponseDTO } from '../../dtos/responses/user-activity-response.dto.js';
import type { UserActivityServiceInterface } from '../../services/interfaces/user-activity.service.interface.js';
import { USER_ACTIVITY_SERVICE } from '../../services/interfaces/user-activity.service.interface.js';

@QueryHandler(ListUserActivitiesQuery)
export class ListUserActivitiesHandler
  extends BaseQueryHandler<ListUserActivitiesQuery, readonly UserActivityResponseDTO[]>
  implements IQueryHandler<ListUserActivitiesQuery>
{
  readonly queryType = 'user.list-activities';
  constructor(@Inject(USER_ACTIVITY_SERVICE) private readonly service: UserActivityServiceInterface) { super(); }
  async execute(q: ListUserActivitiesQuery): Promise<readonly UserActivityResponseDTO[]> { return this.service.listForUser(q.userId, q.limit); }
}
