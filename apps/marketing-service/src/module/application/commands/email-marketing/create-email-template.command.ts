import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateEmailTemplateCommand extends BaseCommand {
  readonly type = 'marketing.email-marketing.create-template';

  constructor(
    public readonly name: string,
    public readonly subject: string,
    public readonly html: string,
    public readonly language?: string,
  ) {
    super();
  }
}
