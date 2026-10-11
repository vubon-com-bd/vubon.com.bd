import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ActivateScheduleCommand extends BaseCommand {
  readonly type = 'schedule.activate';
  constructor(public readonly scheduleId: string, public readonly actorId?: string) {
    super();
  }
}
