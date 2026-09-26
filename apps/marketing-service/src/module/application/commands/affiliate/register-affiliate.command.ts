import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RegisterAffiliateCommand extends BaseCommand {
  readonly type = 'marketing.affiliate.register';

  constructor(
    public readonly userId: string,
    public readonly commissionRate?: number,
  ) {
    super();
  }
}
