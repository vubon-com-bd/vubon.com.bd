import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SendEmailCommand extends BaseCommand {
  readonly type = 'email.send';

  constructor(
    public readonly to: string | readonly string[],
    public readonly subject: string,
    public readonly html?: string,
    public readonly text?: string,
  ) {
    super();
  }
}
