/**
 * EndConversationCommand
 * @module support-service/application/commands/conversation
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { EndConversationRequestDTO } from '../../dtos/requests/conversation/end-conversation.dto';

export class EndConversationCommand extends BaseCommand {
  readonly type = 'support.conversation.end';

  constructor(public readonly payload: EndConversationRequestDTO) {
    super();
  }
}
