import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ResumeScheduleCommand } from './resume-schedule.command.js';
import { SCHEDULE_SERVICE, type IScheduleService } from '../../services/interfaces/schedule.service.interface.js';
import type { ScheduleResponseDTO } from '../../dtos/responses/schedule-response.dto.js';

@CommandHandler(ResumeScheduleCommand)
export class ResumeScheduleHandler
  implements ICommandHandler<ResumeScheduleCommand, ScheduleResponseDTO>
{
  constructor(@Inject(SCHEDULE_SERVICE) private readonly service: IScheduleService) {}

  async execute(c: ResumeScheduleCommand): Promise<ScheduleResponseDTO> {
    return this.service.resume(c.dto, c.actorId);
  }
}
