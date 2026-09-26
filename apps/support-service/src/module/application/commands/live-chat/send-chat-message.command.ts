/**
 * SendChatMessageCommand
 * @module support-service/application/commands/live-chat
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { SendChatMessageRequestDTO } from '../../dtos/requests/live-chat/send-chat-message.dto';

export class SendChatMessageCommand extends BaseCommand {
  readonly type = 'support.livechat.send_message';

  constructor(public readonly payload: SendChatMessageRequestDTO) {
    super();
  }
}
