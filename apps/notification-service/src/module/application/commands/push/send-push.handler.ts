import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendPushCommand } from './send-push.command.js';
import { PUSH_SERVICE, type IPushService } from '../../services/interfaces/push.service.interface.js';
import type { PushSendResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@CommandHandler(SendPushCommand)
export class SendPushHandler implements ICommandHandler<SendPushCommand, PushSendResponseDTO> {
  constructor(@Inject(PUSH_SERVICE) private readonly service: IPushService) {}

  async execute(c: SendPushCommand): Promise<PushSendResponseDTO> {
    return this.service.send(c.dto, c.actorId);
  }
}
