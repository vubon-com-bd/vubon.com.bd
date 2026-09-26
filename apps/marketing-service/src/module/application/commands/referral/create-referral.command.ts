import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateReferralCommand extends BaseCommand {
  readonly type = 'marketing.referral.create';

  constructor(
    public readonly referrerId: string,
    public readonly code?: string,
  ) {
    super();
  }
}
