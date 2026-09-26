import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SendNotificationCommand extends BaseCommand {
  readonly type = 'notification.send';

  constructor(
    public readonly userId: string,
    public readonly notificationType: string,
    public readonly channel: string,
    public readonly category: string,
    public readonly title: string,
    public readonly body: string,
    public readonly priority?: string,
    public readonly data?: Record<string, unknown>,
    public readonly actionUrl?: string,
    public readonly scheduledAt?: string,
  ) {
    super();
  }
}
