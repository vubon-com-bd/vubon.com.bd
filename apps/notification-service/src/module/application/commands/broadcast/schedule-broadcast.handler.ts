import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ScheduleBroadcastCommand } from './schedule-broadcast.command.js';
import { BROADCAST_SERVICE, type IBroadcastService } from '../../services/interfaces/broadcast.service.interface.js';
import type { BroadcastResponseDTO } from '../../dtos/responses/broadcast-response.dto.js';

@CommandHandler(ScheduleBroadcastCommand)
export class ScheduleBroadcastHandler
  implements ICommandHandler<ScheduleBroadcastCommand, BroadcastResponseDTO>
{
  constructor(@Inject(BROADCAST_SERVICE) private readonly service: IBroadcastService) {}

  async execute(c: ScheduleBroadcastCommand): Promise<BroadcastResponseDTO> {
    return this.service.schedule(c.dto, c.actorId);
  }
}
