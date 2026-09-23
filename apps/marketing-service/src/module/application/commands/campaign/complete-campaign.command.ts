import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CompleteCampaignCommand extends BaseCommand {
  readonly type = 'marketing.campaign.complete';

  constructor(public readonly campaignId: string) {
    super();
  }
}
