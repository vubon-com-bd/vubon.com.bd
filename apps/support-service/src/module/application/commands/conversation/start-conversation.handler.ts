/**
 * StartConversationHandler
 * @module support-service/application/commands/conversation
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { StartConversationCommand } from './start-conversation.command';
import type { ConversationResponseDTO } from '../../dtos/responses/conversation-response.dto';
import type { ConversationServiceInterface } from '../../services/interfaces/conversation.service.interface';

export class StartConversationHandler extends BaseCommandHandler<
  StartConversationCommand,
  ConversationResponseDTO
> {
  readonly commandType = 'support.conversation.start';

  constructor(private readonly conversationService: ConversationServiceInterface) {
    super();
  }

  async execute(command: StartConversationCommand): Promise<ConversationResponseDTO> {
    return this.conversationService.start(command.payload);
  }
}
