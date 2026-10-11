import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TestBroadcastCommand } from './test-broadcast.command.js';
import { BROADCAST_SERVICE, type IBroadcastService } from '../../services/interfaces/broadcast.service.interface.js';
import type { BroadcastResponseDTO } from '../../dtos/responses/broadcast-response.dto.js';

@CommandHandler(TestBroadcastCommand)
export class TestBroadcastHandler
  implements ICommandHandler<TestBroadcastCommand, BroadcastResponseDTO>
{
  constructor(@Inject(BROADCAST_SERVICE) private readonly service: IBroadcastService) {}

  async execute(c: TestBroadcastCommand): Promise<BroadcastResponseDTO> {
    return this.service.test(c.dto, c.actorId);
  }
}
