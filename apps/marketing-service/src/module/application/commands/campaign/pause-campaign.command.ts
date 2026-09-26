import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class PauseCampaignCommand extends BaseCommand {
  readonly type = 'marketing.campaign.pause';

  constructor(
    public readonly campaignId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
