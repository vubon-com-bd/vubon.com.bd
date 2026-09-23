import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateEmailCampaignCommand extends BaseCommand {
  readonly type = 'marketing.email-marketing.create-campaign';

  constructor(
    public readonly name: string,
    public readonly subject: string,
    public readonly content: string,
    public readonly templateId?: string,
  ) {
    super();
  }
}
