import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class DispatchNotificationCommand extends BaseCommand {
  readonly type = 'saga.notification.dispatch';
  constructor(
    public readonly notificationId: string,
    public readonly channel: string,
    public readonly userId: string,
  ) {
    super();
  }
}
