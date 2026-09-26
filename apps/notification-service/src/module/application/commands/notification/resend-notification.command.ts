import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ResendNotificationCommand extends BaseCommand {
  readonly type = 'notification.resend';

  constructor(
    public readonly notificationId: string,
    public readonly channel?: string,
  ) {
    super();
  }
}
