import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateBroadcastCommand } from './create-broadcast.command.js';
import {
  BROADCAST_SERVICE,
  type IBroadcastService,
} from '@application/services/interfaces/broadcast.service.interface.js';
import type { BroadcastResponseDTO } from '@application/dtos/responses/broadcast-response.dto.js';

@CommandHandler(CreateBroadcastCommand)
export class CreateBroadcastHandler
  implements ICommandHandler<CreateBroadcastCommand, BroadcastResponseDTO>
{
  constructor(@Inject(BROADCAST_SERVICE) private readonly service: IBroadcastService) {}

  async execute(c: CreateBroadcastCommand): Promise<BroadcastResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
