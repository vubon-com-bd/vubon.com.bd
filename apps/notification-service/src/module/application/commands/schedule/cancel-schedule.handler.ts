import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelScheduleCommand } from './cancel-schedule.command.js';
import { SCHEDULE_SERVICE, type IScheduleService } from '../../services/interfaces/schedule.service.interface.js';
import type { ScheduleResponseDTO } from '../../dtos/responses/schedule-response.dto.js';

@CommandHandler(CancelScheduleCommand)
export class CancelScheduleHandler
  implements ICommandHandler<CancelScheduleCommand, ScheduleResponseDTO>
{
  constructor(@Inject(SCHEDULE_SERVICE) private readonly service: IScheduleService) {}

  async execute(c: CancelScheduleCommand): Promise<ScheduleResponseDTO> {
    return this.service.cancel(c.dto, c.actorId);
  }
}
