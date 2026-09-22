import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RejectRefundCommand extends BaseCommand {
  readonly type = 'refund.reject';

  constructor(
    public readonly refundId: string,
    public readonly reason: string,
  ) {
    super();
  }
}
