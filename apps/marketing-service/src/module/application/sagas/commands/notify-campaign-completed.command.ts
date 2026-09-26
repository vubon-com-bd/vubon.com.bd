import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyCampaignCompletedCommand extends BaseSagaCommand {
  readonly type = 'marketing.saga.notify-campaign-completed';

  constructor(public readonly campaignId: string) {
    super();
  }
}
