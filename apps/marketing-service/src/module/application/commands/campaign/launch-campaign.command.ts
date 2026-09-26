import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class LaunchCampaignCommand extends BaseCommand {
  readonly type = 'marketing.campaign.launch';

  constructor(
    public readonly campaignId: string,
    public readonly userId?: string,
  ) {
    super();
  }
}
