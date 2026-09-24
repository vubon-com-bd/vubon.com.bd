import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class EndConversationCommand extends BaseCommand {
  readonly type = 'support.conversation.end';

  constructor(
    public readonly conversationId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
