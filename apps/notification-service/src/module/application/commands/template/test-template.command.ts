import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class TestTemplateCommand extends BaseCommand {
  readonly type = 'template.test';

  constructor(
    public readonly templateName: string,
    public readonly recipientEmail: string,
    public readonly variables: Record<string, string | number | boolean>,
  ) {
    super();
  }
}
