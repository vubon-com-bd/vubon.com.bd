import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { StartConversationCommand } from './start-conversation.command';
import type { ConversationServiceInterface } from '../../services/interfaces/conversation.service.interface';
import type { ConversationResponseDTO } from '../../dtos/responses/conversation-response.dto';

@CommandHandler(StartConversationCommand)
export class StartConversationHandler
  extends BaseCommandHandler<StartConversationCommand, ConversationResponseDTO>
  implements ICommandHandler<StartConversationCommand>
{
  readonly commandType = 'support.conversation.start';

  constructor(
    private readonly conversationService: ConversationServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: StartConversationCommand): Promise<ConversationResponseDTO> {
    void command.initialMessage;
    void this.eventBus;
    return this.conversationService.start({
      userId: command.userId,
      type: command.type_,
    });
  }
}
