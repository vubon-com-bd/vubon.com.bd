import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateCampaignCommand extends BaseCommand {
  readonly type = 'marketing.campaign.create';

  constructor(
    public readonly name: string,
    public readonly campaignType: string,
    public readonly channel: string,
    public readonly createdBy: string,
    public readonly startDate?: string,
    public readonly endDate?: string,
  ) {
    super();
  }
}
