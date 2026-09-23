import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ScheduleSmsCampaignCommand extends BaseCommand {
  readonly type = 'marketing.sms-marketing.schedule';
  constructor(
    public readonly campaignId: string,
    public readonly scheduledAt: string,
  ) { super(); }
}
