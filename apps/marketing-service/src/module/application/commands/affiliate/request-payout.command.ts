import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RequestPayoutCommand extends BaseCommand {
  readonly type = 'marketing.affiliate.request-payout';

  constructor(
    public readonly affiliateId: string,
    public readonly amount: number,
  ) {
    super();
  }
}
