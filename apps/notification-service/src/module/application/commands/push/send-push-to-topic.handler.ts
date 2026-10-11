import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendPushToTopicCommand } from './send-push-to-topic.command.js';
import { PUSH_SERVICE, type IPushService } from '../../services/interfaces/push.service.interface.js';
import type { PushSendResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@CommandHandler(SendPushToTopicCommand)
export class SendPushToTopicHandler
  implements ICommandHandler<SendPushToTopicCommand, PushSendResponseDTO>
{
  constructor(@Inject(PUSH_SERVICE) private readonly service: IPushService) {}

  async execute(c: SendPushToTopicCommand): Promise<PushSendResponseDTO> {
    return this.service.sendToTopic(c.dto, c.actorId);
  }
}
