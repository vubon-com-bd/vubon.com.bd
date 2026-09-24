import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SendBulkCommand extends BaseCommand {
  readonly type = 'notification.send-bulk';

  constructor(
    public readonly userIds: readonly string[],
    public readonly notificationType: string,
    public readonly channel: string,
    public readonly category: string,
    public readonly title: string,
    public readonly body: string,
    public readonly data?: Record<string, unknown>,
  ) {
    super();
  }
}
