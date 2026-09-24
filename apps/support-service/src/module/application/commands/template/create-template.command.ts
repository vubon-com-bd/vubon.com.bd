import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateTemplateCommand extends BaseCommand {
  readonly type = 'support.template.create';

  constructor(
    public readonly name: string,
    public readonly type_: string,
    public readonly content: string,
    public readonly variables: readonly string[] = [],
  ) {
    super();
  }
}
