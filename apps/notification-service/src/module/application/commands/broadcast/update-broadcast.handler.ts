import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateBroadcastCommand } from './update-broadcast.command.js';
import { BROADCAST_SERVICE, type IBroadcastService } from '../../services/interfaces/broadcast.service.interface.js';
import type { BroadcastResponseDTO } from '../../dtos/responses/broadcast-response.dto.js';

@CommandHandler(UpdateBroadcastCommand)
export class UpdateBroadcastHandler
  implements ICommandHandler<UpdateBroadcastCommand, BroadcastResponseDTO>
{
  constructor(@Inject(BROADCAST_SERVICE) private readonly service: IBroadcastService) {}

  async execute(c: UpdateBroadcastCommand): Promise<BroadcastResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
