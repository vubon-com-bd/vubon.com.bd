import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TriggerScheduleCommand } from './trigger-schedule.command.js';
import { SCHEDULE_SERVICE, type IScheduleService } from '../../services/interfaces/schedule.service.interface.js';
import type { ScheduleTriggerResponseDTO } from '../../dtos/responses/schedule-response.dto.js';

@CommandHandler(TriggerScheduleCommand)
export class TriggerScheduleHandler
  implements ICommandHandler<TriggerScheduleCommand, ScheduleTriggerResponseDTO>
{
  constructor(@Inject(SCHEDULE_SERVICE) private readonly service: IScheduleService) {}

  async execute(c: TriggerScheduleCommand): Promise<ScheduleTriggerResponseDTO> {
    return this.service.trigger(c.dto, c.actorId);
  }
}
