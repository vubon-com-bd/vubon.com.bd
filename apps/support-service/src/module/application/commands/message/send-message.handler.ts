import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendMessageCommand } from './send-message.command';
import type { TicketMessageServiceInterface } from '../../services/interfaces/ticket-message.service.interface';
import type { MessageResponseDTO } from '../../dtos/responses/message-response.dto';

@CommandHandler(SendMessageCommand)
export class SendMessageHandler
  extends BaseCommandHandler<SendMessageCommand, MessageResponseDTO>
  implements ICommandHandler<SendMessageCommand>
{
  readonly commandType = 'support.message.send';

  constructor(
    private readonly messageService: TicketMessageServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SendMessageCommand): Promise<MessageResponseDTO> {
    void this.eventBus;
    return this.messageService.send({
      conversationId: command.ticketId,
      senderId: command.senderId,
      content: command.content,
      type: command.type_,
      isInternal: command.isInternal,
    } as never);
  }
}
