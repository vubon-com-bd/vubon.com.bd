import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateScheduleCommandDTO } from '@application/dtos/requests/schedule/index.js';

export class UpdateScheduleCommand extends BaseCommand {
  readonly type = 'notification.schedule.update';
  constructor(public readonly dto: UpdateScheduleCommandDTO, public readonly actorId?: string) { super(); }
}
