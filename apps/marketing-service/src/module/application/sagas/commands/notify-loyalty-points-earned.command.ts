import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyLoyaltyPointsEarnedCommand extends BaseSagaCommand {
  readonly type = 'marketing.saga.notify-loyalty-points-earned';

  constructor(
    public readonly loyaltyId: string,
    public readonly points: number,
  ) {
    super();
  }
}
