import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SendSmsCampaignCommand extends BaseCommand {
  readonly type = 'marketing.sms-marketing.send';
  constructor(
    public readonly campaignId: string,
    public readonly recipientIds?: readonly string[],
  ) { super(); }
}
