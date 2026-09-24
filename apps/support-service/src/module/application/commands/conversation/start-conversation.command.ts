import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class StartConversationCommand extends BaseCommand {
  readonly type = 'support.conversation.start';

  constructor(
    public readonly userId: string,
    public readonly type_: string,
    public readonly initialMessage?: string,
  ) {
    super();
  }
}
