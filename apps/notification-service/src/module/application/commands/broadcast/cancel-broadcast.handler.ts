import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelBroadcastCommand } from './cancel-broadcast.command.js';
import {
  BROADCAST_SERVICE,
  type IBroadcastService,
} from '@application/services/interfaces/broadcast.service.interface.js';
import type { BroadcastResponseDTO } from '@application/dtos/responses/broadcast-response.dto.js';

@CommandHandler(CancelBroadcastCommand)
export class CancelBroadcastHandler
  implements ICommandHandler<CancelBroadcastCommand, BroadcastResponseDTO>
{
  constructor(@Inject(BROADCAST_SERVICE) private readonly service: IBroadcastService) {}

  async execute(c: CancelBroadcastCommand): Promise<BroadcastResponseDTO> {
    return this.service.cancel(c.dto, c.actorId);
  }
}
