import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class SendScheduledNotificationCommand extends BaseCommand {
  readonly type = 'saga.schedule.send';
  constructor(
    public readonly scheduleId: string,
    public readonly templateId: string | undefined,
    public readonly userId: string | undefined,
    public readonly occurrence: number,
  ) {
    super();
  }
}
