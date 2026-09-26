import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateTemplateCommand extends BaseCommand {
  readonly type = 'template.update';

  constructor(
    public readonly templateId: string,
    public readonly subject?: string,
    public readonly body?: string,
    public readonly bodyHtml?: string,
    public readonly status?: string,
  ) {
    super();
  }
}
