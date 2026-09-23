import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateSmsCampaignCommand extends BaseCommand {
  readonly type = 'marketing.sms-marketing.create';
  constructor(
    public readonly name: string,
    public readonly content: string,
  ) { super(); }
}
