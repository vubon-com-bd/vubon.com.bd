/**
 * StartChatCommand
 * @module support-service/application/commands/live-chat
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { StartChatRequestDTO } from '../../dtos/requests/live-chat/start-chat.dto';

export class StartChatCommand extends BaseCommand {
  readonly type = 'support.livechat.start';

  constructor(public readonly payload: StartChatRequestDTO) {
    super();
  }
}
