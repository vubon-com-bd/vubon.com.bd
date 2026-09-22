import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RequestPayoutCommand extends BaseCommand {
  readonly type = 'vendor.payout.request';

  constructor(
    public readonly vendorId: string,
    public readonly bankAccountId: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly notes?: string,
  ) {
    super();
  }
}
