import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartBroadcastCommand } from './start-broadcast.command.js';
import {
  BROADCAST_SERVICE,
  type IBroadcastService,
} from '@application/services/interfaces/broadcast.service.interface.js';
import type { BroadcastResponseDTO } from '@application/dtos/responses/broadcast-response.dto.js';

@CommandHandler(StartBroadcastCommand)
export class StartBroadcastHandler
  implements ICommandHandler<StartBroadcastCommand, BroadcastResponseDTO>
{
  constructor(@Inject(BROADCAST_SERVICE) private readonly service: IBroadcastService) {}

  async execute(c: StartBroadcastCommand): Promise<BroadcastResponseDTO> {
    return this.service.start(c.dto, c.actorId);
  }
}
