/**
 * SendChatbotMessageCommand
 * @module support-service/application/commands/chatbot
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { SendChatbotMessageRequestDTO } from '../../dtos/requests/chatbot/send-chatbot-message.dto';

export class SendChatbotMessageCommand extends BaseCommand {
  readonly type = 'support.chatbot.send_message';

  constructor(public readonly payload: SendChatbotMessageRequestDTO) {
    super();
  }
}
