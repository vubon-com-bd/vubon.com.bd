import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListDueSchedulesQuery } from './list-due-schedules.query';
import type { ScheduleRepository } from '../../../domain/repositories/schedule.repository.interface';
import type { ScheduleResponseDTO } from '../../dtos/responses/schedule-response.dto';

@QueryHandler(ListDueSchedulesQuery)
export class ListDueSchedulesHandler
  extends BaseQueryHandler<ListDueSchedulesQuery, readonly ScheduleResponseDTO[]>
  implements IQueryHandler<ListDueSchedulesQuery>
{
  readonly queryType = 'schedule.list-due';

  constructor(private readonly scheduleRepo: ScheduleRepository) {
    super();
  }

  async execute(query: ListDueSchedulesQuery): Promise<readonly ScheduleResponseDTO[]> {
    const entities = await this.scheduleRepo.findDue(new Date(), query.limit);
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
