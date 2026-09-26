import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ScheduleEmailCampaignCommand extends BaseCommand {
  readonly type = 'marketing.email-marketing.schedule';

  constructor(
    public readonly campaignId: string,
    public readonly scheduledAt: string,
  ) {
    super();
  }
}
