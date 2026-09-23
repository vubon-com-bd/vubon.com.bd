import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyReferralRewardCommand extends BaseSagaCommand {
  readonly type = 'marketing.saga.notify-referral-reward';

  constructor(
    public readonly referralId: string,
    public readonly userId: string,
  ) {
    super();
  }
}
