import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export interface TemplateVariableInput {
  readonly name: string;
  readonly required: boolean;
  readonly defaultValue?: string;
}

export class CreateTemplateCommand extends BaseCommand {
  readonly type = 'template.create';

  constructor(
    public readonly name: string,
    public readonly slug: string,
    public readonly templateType: string,
    public readonly category: string,
    public readonly body: string,
    public readonly locale?: string,
    public readonly subject?: string,
    public readonly bodyHtml?: string,
    public readonly variables?: readonly TemplateVariableInput[],
  ) {
    super();
  }
}
