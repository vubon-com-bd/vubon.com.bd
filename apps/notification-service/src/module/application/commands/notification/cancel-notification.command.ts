import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CancelNotificationCommand extends BaseCommand {
  readonly type = 'notification.cancel';

  constructor(
    public readonly notificationId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
