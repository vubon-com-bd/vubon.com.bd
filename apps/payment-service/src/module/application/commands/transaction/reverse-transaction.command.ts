import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ReverseTransactionCommand extends BaseCommand {
  readonly type = 'transaction.reverse';

  constructor(
    public readonly transactionId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
