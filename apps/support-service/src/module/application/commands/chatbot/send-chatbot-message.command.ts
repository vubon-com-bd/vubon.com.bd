import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SendChatbotMessageCommand extends BaseCommand {
  readonly type = 'support.chatbot.message.send';

  constructor(
    public readonly chatbotId: string,
    public readonly userId: string,
    public readonly message: string,
  ) {
    super();
  }
}
