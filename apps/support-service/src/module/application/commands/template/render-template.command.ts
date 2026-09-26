/**
 * RenderTemplateCommand
 * @module support-service/application/commands/template
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RenderTemplateCommand extends BaseCommand {
  readonly type = 'support.template.render';

  constructor(
    public readonly templateId: string,
    public readonly values: Readonly<Record<string, string | number>>,
  ) {
    super();
  }
}
