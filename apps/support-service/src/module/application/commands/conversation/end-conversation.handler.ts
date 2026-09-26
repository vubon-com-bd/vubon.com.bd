/**
 * EndConversationHandler
 * @module support-service/application/commands/conversation
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { EndConversationCommand } from './end-conversation.command';
import type { ConversationResponseDTO } from '../../dtos/responses/conversation-response.dto';
import type { ConversationServiceInterface } from '../../services/interfaces/conversation.service.interface';

export class EndConversationHandler extends BaseCommandHandler<
  EndConversationCommand,
  ConversationResponseDTO
> {
  readonly commandType = 'support.conversation.end';

  constructor(private readonly conversationService: ConversationServiceInterface) {
    super();
  }

  async execute(command: EndConversationCommand): Promise<ConversationResponseDTO> {
    return this.conversationService.end(command.payload);
  }
}
