import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ProcessPayoutCommand extends BaseCommand {
  readonly type = 'vendor.payout.process';

  constructor(
    public readonly payoutId: string,
    public readonly status: string,
    public readonly transactionRef?: string,
    public readonly failureReason?: string,
  ) {
    super();
  }
}
