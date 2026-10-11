import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateScheduleCommand } from './activate-schedule.command.js';
import { SCHEDULE_SERVICE, type IScheduleService } from '../../services/interfaces/schedule.service.interface.js';
import type { ScheduleResponseDTO } from '../../dtos/responses/schedule-response.dto.js';

@CommandHandler(ActivateScheduleCommand)
export class ActivateScheduleHandler
  implements ICommandHandler<ActivateScheduleCommand, ScheduleResponseDTO>
{
  constructor(@Inject(SCHEDULE_SERVICE) private readonly service: IScheduleService) {}

  async execute(c: ActivateScheduleCommand): Promise<ScheduleResponseDTO> {
    return this.service.activate(c.scheduleId, c.actorId);
  }
}
