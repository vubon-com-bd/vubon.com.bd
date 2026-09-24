import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SendChatMessageCommand extends BaseCommand {
  readonly type = 'support.chat.message.send';

  constructor(
    public readonly chatId: string,
    public readonly content: string,
    public readonly type_?: string,
  ) {
    super();
  }
}
