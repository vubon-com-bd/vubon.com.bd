import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RedeemReferralRewardCommand extends BaseCommand {
  readonly type = 'marketing.referral.redeem';

  constructor(
    public readonly referralId: string,
    public readonly userId: string,
  ) {
    super();
  }
}
