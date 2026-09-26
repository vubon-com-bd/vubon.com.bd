/**
 * UpdateConversationCommand
 * @module support-service/application/commands/conversation
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdateConversationRequestDTO } from '../../dtos/requests/conversation/update-conversation.dto';

export class UpdateConversationCommand extends BaseCommand {
  readonly type = 'support.conversation.update';

  constructor(
    public readonly conversationId: string,
    public readonly payload: UpdateConversationRequestDTO,
  ) {
    super();
  }
}
