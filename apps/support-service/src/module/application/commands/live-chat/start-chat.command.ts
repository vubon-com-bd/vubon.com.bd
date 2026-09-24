import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class StartChatCommand extends BaseCommand {
  readonly type = 'support.chat.start';

  constructor(
    public readonly userId: string,
    public readonly type_?: string,
    public readonly initialMessage?: string,
  ) {
    super();
  }
}
