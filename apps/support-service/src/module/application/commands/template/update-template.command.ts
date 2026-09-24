import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateTemplateCommand extends BaseCommand {
  readonly type = 'support.template.update';

  constructor(
    public readonly templateId: string,
    public readonly name?: string,
    public readonly content?: string,
    public readonly isActive?: boolean,
  ) {
    super();
  }
}
