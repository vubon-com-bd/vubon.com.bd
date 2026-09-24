import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CancelScheduleCommand extends BaseCommand {
  readonly type = 'schedule.cancel';

  constructor(
    public readonly scheduleId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
