import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class EndChatCommand extends BaseCommand {
  readonly type = 'support.chat.end';

  constructor(
    public readonly chatId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
