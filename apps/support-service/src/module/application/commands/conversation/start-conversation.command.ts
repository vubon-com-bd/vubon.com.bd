/**
 * StartConversationCommand
 * @module support-service/application/commands/conversation
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { StartConversationRequestDTO } from '../../dtos/requests/conversation/start-conversation.dto';

export class StartConversationCommand extends BaseCommand {
  readonly type = 'support.conversation.start';

  constructor(public readonly payload: StartConversationRequestDTO) {
    super();
  }
}
