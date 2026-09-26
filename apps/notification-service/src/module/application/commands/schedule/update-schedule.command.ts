import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateScheduleCommand extends BaseCommand {
  readonly type = 'schedule.update';

  constructor(
    public readonly scheduleId: string,
    public readonly frequency?: string,
    public readonly interval?: number,
    public readonly startAt?: string,
    public readonly endAt?: string,
    public readonly payload?: Record<string, unknown>,
  ) {
    super();
  }
}
