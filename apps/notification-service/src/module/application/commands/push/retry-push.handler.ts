import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RetryPushCommand } from './retry-push.command.js';
import { PUSH_SERVICE, type IPushService } from '../../services/interfaces/push.service.interface.js';
import type { PushSendResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@CommandHandler(RetryPushCommand)
export class RetryPushHandler implements ICommandHandler<RetryPushCommand, PushSendResponseDTO> {
  constructor(@Inject(PUSH_SERVICE) private readonly service: IPushService) {}

  async execute(c: RetryPushCommand): Promise<PushSendResponseDTO> {
    return this.service.retry(c.pushId, c.actorId);
  }
}
