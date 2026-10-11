import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateScheduleCommand } from './create-schedule.command.js';
import { SCHEDULE_SERVICE, type IScheduleService } from '../../services/interfaces/schedule.service.interface.js';
import type { ScheduleResponseDTO } from '../../dtos/responses/schedule-response.dto.js';

@CommandHandler(CreateScheduleCommand)
export class CreateScheduleHandler
  implements ICommandHandler<CreateScheduleCommand, ScheduleResponseDTO>
{
  constructor(@Inject(SCHEDULE_SERVICE) private readonly service: IScheduleService) {}

  async execute(c: CreateScheduleCommand): Promise<ScheduleResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
