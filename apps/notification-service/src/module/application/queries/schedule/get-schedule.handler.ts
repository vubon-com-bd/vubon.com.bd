import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetScheduleQuery } from './get-schedule.query';
import type { ScheduleRepository } from '../../../domain/repositories/schedule.repository.interface';
import { ScheduleIdVO } from '../../../domain/value-objects/primitives/schedule-id.vo';
import type { ScheduleResponseDTO } from '../../dtos/responses/schedule-response.dto';

@QueryHandler(GetScheduleQuery)
export class GetScheduleHandler
  extends BaseQueryHandler<GetScheduleQuery, ScheduleResponseDTO | null>
  implements IQueryHandler<GetScheduleQuery>
{
  readonly queryType = 'schedule.get';

  constructor(private readonly scheduleRepo: ScheduleRepository) {
    super();
  }

  async execute(query: GetScheduleQuery): Promise<ScheduleResponseDTO | null> {
    const entity = await this.scheduleRepo.findById(ScheduleIdVO.create(query.scheduleId));
    if (!entity) return null;
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      frequency: entity.frequency.value,
      status: entity.status.value,
      nextRunAt: entity.nextRunAt.toISOString(),
      lastRunAt: entity.lastRunAt?.toISOString() ?? null,
      createdAt: entity.createdAt,
    };
  }
}
