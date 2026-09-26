import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyTierUpgradedCommand extends BaseSagaCommand {
  readonly type = 'marketing.saga.notify-tier-upgraded';

  constructor(
    public readonly loyaltyId: string,
    public readonly newTier: string,
  ) {
    super();
  }
}
