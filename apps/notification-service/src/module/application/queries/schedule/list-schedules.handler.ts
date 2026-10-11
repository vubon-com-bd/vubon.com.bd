import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListSchedulesQuery } from './list-schedules.query.js';
import { SCHEDULE_SERVICE, type IScheduleService } from '../../services/interfaces/schedule.service.interface.js';
import type { ScheduleListResponseDTO } from '../../dtos/responses/schedule-response.dto.js';

@QueryHandler(ListSchedulesQuery)
export class ListSchedulesHandler
  implements IQueryHandler<ListSchedulesQuery, ScheduleListResponseDTO>
{
  constructor(@Inject(SCHEDULE_SERVICE) private readonly service: IScheduleService) {}

  async execute(q: ListSchedulesQuery): Promise<ScheduleListResponseDTO> {
    return this.service.list(q.options);
  }
}
