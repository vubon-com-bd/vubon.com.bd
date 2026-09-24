import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateScheduleCommand extends BaseCommand {
  readonly type = 'schedule.create';

  constructor(
    public readonly userId: string,
    public readonly scheduleType: string,
    public readonly frequency: string,
    public readonly startAt: string,
    public readonly payload: Record<string, unknown>,
    public readonly interval?: number,
    public readonly endAt?: string,
  ) {
    super();
  }
}
