import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ApproveRefundCommand extends BaseCommand {
  readonly type = 'refund.approve';

  constructor(
    public readonly refundId: string,
    public readonly amount?: number,
    public readonly note?: string,
  ) {
    super();
  }
}
