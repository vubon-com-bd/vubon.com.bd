import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SendBulkPushCommand extends BaseCommand {
  readonly type = 'push.send-bulk';

  constructor(
    public readonly userIds: readonly string[],
    public readonly title: string,
    public readonly body: string,
    public readonly data?: Record<string, string>,
  ) {
    super();
  }
}
