import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SendSmsCommand extends BaseCommand {
  readonly type = 'sms.send';

  constructor(
    public readonly to: string | readonly string[],
    public readonly body: string,
    public readonly from?: string,
  ) {
    super();
  }
}
