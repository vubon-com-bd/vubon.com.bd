import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export interface BulkEmailRecipient {
  readonly to: string;
  readonly variables: Record<string, string | number | boolean>;
}

export class SendBulkEmailCommand extends BaseCommand {
  readonly type = 'email.send-bulk';

  constructor(
    public readonly recipients: readonly BulkEmailRecipient[],
    public readonly templateName: string,
    public readonly locale?: string,
  ) {
    super();
  }
}
