import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListSchedulesQuery } from './list-schedules.query';
import type { ScheduleRepository } from '../../../domain/repositories/schedule.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { ScheduleResponseDTO } from '../../dtos/responses/schedule-response.dto';

@QueryHandler(ListSchedulesQuery)
export class ListSchedulesHandler
  extends BaseQueryHandler<ListSchedulesQuery, readonly ScheduleResponseDTO[]>
  implements IQueryHandler<ListSchedulesQuery>
{
  readonly queryType = 'schedule.list';

  constructor(private readonly scheduleRepo: ScheduleRepository) {
    super();
  }

  async execute(query: ListSchedulesQuery): Promise<readonly ScheduleResponseDTO[]> {
    const entities = await this.scheduleRepo.findByUser(UserIdVO.create(query.userId));
    return entities.map((e) => ({
      id: e.id.value,
      userId: e.userId.value,
      type: e.type.value,
      frequency: e.frequency.value,
      status: e.status.value,
      nextRunAt: e.nextRunAt.toISOString(),
      lastRunAt: e.lastRunAt?.toISOString() ?? null,
      createdAt: e.createdAt,
    }));
  }
}
