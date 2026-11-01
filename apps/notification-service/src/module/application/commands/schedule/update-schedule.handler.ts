import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateScheduleCommand } from './update-schedule.command.js';
import {
  SCHEDULE_SERVICE,
  type IScheduleService,
} from '@application/services/interfaces/schedule.service.interface.js';
import type { ScheduleResponseDTO } from '@application/dtos/responses/schedule-response.dto.js';

@CommandHandler(UpdateScheduleCommand)
export class UpdateScheduleHandler
  implements ICommandHandler<UpdateScheduleCommand, ScheduleResponseDTO>
{
  constructor(@Inject(SCHEDULE_SERVICE) private readonly service: IScheduleService) {}

  async execute(c: UpdateScheduleCommand): Promise<ScheduleResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
