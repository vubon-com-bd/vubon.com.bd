/**
 * EndChatCommand
 * @module support-service/application/commands/live-chat
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { EndChatRequestDTO } from '../../dtos/requests/live-chat/end-chat.dto';

export class EndChatCommand extends BaseCommand {
  readonly type = 'support.livechat.end';

  constructor(public readonly payload: EndChatRequestDTO) {
    super();
  }
}
