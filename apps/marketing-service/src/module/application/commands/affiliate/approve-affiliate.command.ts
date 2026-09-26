import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ApproveAffiliateCommand extends BaseCommand {
  readonly type = 'marketing.affiliate.approve';

  constructor(
    public readonly affiliateId: string,
    public readonly approvedBy: string,
  ) {
    super();
  }
}
