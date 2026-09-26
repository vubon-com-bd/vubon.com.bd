/**
 * SendMessageHandler
 * @module support-service/application/commands/message
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendMessageCommand } from './send-message.command';
import type { MessageResponseDTO } from '../../dtos/responses/message-response.dto';
import type { MessageServiceInterface } from '../../services/interfaces/message.service.interface';

export class SendMessageHandler extends BaseCommandHandler<
  SendMessageCommand,
  MessageResponseDTO
> {
  readonly commandType = 'support.message.send';

  constructor(private readonly messageService: MessageServiceInterface) {
    super();
  }

  async execute(command: SendMessageCommand): Promise<MessageResponseDTO> {
    return this.messageService.send(command.payload);
  }
}
