import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDueSchedulesQuery } from './get-due-schedules.query.js';
import { SCHEDULE_SERVICE, type IScheduleService } from '../../services/interfaces/schedule.service.interface.js';
import type { ScheduleResponseDTO } from '../../dtos/responses/schedule-response.dto.js';

@QueryHandler(GetDueSchedulesQuery)
export class GetDueSchedulesHandler
  implements IQueryHandler<GetDueSchedulesQuery, readonly ScheduleResponseDTO[]>
{
  constructor(@Inject(SCHEDULE_SERVICE) private readonly service: IScheduleService) {}

  async execute(q: GetDueSchedulesQuery): Promise<readonly ScheduleResponseDTO[]> {
    const at = q.at ? new Date(q.at) : undefined;
    return this.service.getDue(at);
  }
}
