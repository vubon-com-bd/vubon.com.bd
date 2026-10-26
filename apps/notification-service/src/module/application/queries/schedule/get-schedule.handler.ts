import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetScheduleQuery } from './get-schedule.query.js';
import {
  SCHEDULE_SERVICE,
  type IScheduleService,
} from '@application/services/interfaces/schedule.service.interface.js';
import type { ScheduleResponseDTO } from '@application/dtos/responses/schedule-response.dto.js';

@QueryHandler(GetScheduleQuery)
export class GetScheduleHandler
  implements IQueryHandler<GetScheduleQuery, ScheduleResponseDTO>
{
  constructor(@Inject(SCHEDULE_SERVICE) private readonly service: IScheduleService) {}

  async execute(q: GetScheduleQuery): Promise<ScheduleResponseDTO> {
    return this.service.getById(q.scheduleId);
  }
}
