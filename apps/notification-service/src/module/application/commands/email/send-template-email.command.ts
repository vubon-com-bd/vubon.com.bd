import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SendTemplateEmailCommand extends BaseCommand {
  readonly type = 'email.send-template';

  constructor(
    public readonly to: string | readonly string[],
    public readonly templateName: string,
    public readonly variables: Record<string, string | number | boolean>,
    public readonly locale?: string,
    public readonly scheduledAt?: string,
  ) {
    super();
  }
}
