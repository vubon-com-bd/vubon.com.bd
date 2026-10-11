import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PauseScheduleCommand } from './pause-schedule.command.js';
import { SCHEDULE_SERVICE, type IScheduleService } from '../../services/interfaces/schedule.service.interface.js';
import type { ScheduleResponseDTO } from '../../dtos/responses/schedule-response.dto.js';

@CommandHandler(PauseScheduleCommand)
export class PauseScheduleHandler
  implements ICommandHandler<PauseScheduleCommand, ScheduleResponseDTO>
{
  constructor(@Inject(SCHEDULE_SERVICE) private readonly service: IScheduleService) {}

  async execute(c: PauseScheduleCommand): Promise<ScheduleResponseDTO> {
    return this.service.pause(c.dto, c.actorId);
  }
}
