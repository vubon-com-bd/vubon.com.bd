import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export interface BulkSmsRecipient {
  readonly to: string;
  readonly variables: Record<string, string | number | boolean>;
}

export class SendBulkSmsCommand extends BaseCommand {
  readonly type = 'sms.send-bulk';

  constructor(
    public readonly recipients: readonly BulkSmsRecipient[],
    public readonly templateName?: string,
    public readonly body?: string,
  ) {
    super();
  }
}
