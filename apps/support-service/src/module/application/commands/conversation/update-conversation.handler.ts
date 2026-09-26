/**
 * UpdateConversationHandler
 * @module support-service/application/commands/conversation
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateConversationCommand } from './update-conversation.command';
import type { ConversationResponseDTO } from '../../dtos/responses/conversation-response.dto';
import type { ConversationServiceInterface } from '../../services/interfaces/conversation.service.interface';

export class UpdateConversationHandler extends BaseCommandHandler<
  UpdateConversationCommand,
  ConversationResponseDTO
> {
  readonly commandType = 'support.conversation.update';

  constructor(private readonly conversationService: ConversationServiceInterface) {
    super();
  }

  async execute(command: UpdateConversationCommand): Promise<ConversationResponseDTO> {
    return this.conversationService.update(command.conversationId, command.payload);
  }
}
