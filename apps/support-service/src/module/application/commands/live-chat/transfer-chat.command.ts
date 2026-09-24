import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class TransferChatCommand extends BaseCommand {
  readonly type = 'support.chat.transfer';

  constructor(
    public readonly chatId: string,
    public readonly agentId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
