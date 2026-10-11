import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RetryNotificationSagaCommand extends BaseCommand {
  readonly type = 'saga.notification.retry';
  constructor(
    public readonly notificationId: string,
    public readonly attempt: number,
    public readonly delayMs: number,
  ) {
    super();
  }
}
