import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ApprovePayoutCommand extends BaseCommand {
  readonly type = 'vendor.payout.approve';

  constructor(
    public readonly payoutId: string,
    public readonly approvedBy: string,
    public readonly notes?: string,
  ) {
    super();
  }
}
