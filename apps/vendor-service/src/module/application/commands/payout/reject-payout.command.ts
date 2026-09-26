import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RejectPayoutCommand extends BaseCommand {
  readonly type = 'vendor.payout.reject';

  constructor(
    public readonly payoutId: string,
    public readonly rejectedBy: string,
    public readonly reason: string,
  ) {
    super();
  }
}
