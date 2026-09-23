import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ClaimRewardCommand extends BaseCommand {
  readonly type = 'marketing.loyalty.claim-reward';

  constructor(
    public readonly userId: string,
    public readonly rewardId: string,
  ) {
    super();
  }
}
