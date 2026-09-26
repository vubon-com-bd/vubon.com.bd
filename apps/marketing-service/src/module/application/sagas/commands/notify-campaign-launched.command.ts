import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyCampaignLaunchedCommand extends BaseSagaCommand {
  readonly type = 'marketing.saga.notify-campaign-launched';

  constructor(public readonly campaignId: string) {
    super();
  }
}
