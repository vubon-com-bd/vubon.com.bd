import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SendEmailCampaignCommand extends BaseCommand {
  readonly type = 'marketing.email-marketing.send';

  constructor(
    public readonly campaignId: string,
    public readonly recipientIds?: readonly string[],
  ) {
    super();
  }
}
