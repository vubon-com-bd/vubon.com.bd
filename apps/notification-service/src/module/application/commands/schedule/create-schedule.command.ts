import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateScheduleCommandDTO } from '@application/dtos/requests/schedule/index.js';

export class CreateScheduleCommand extends BaseCommand {
  readonly type = 'notification.schedule.create';
  constructor(public readonly dto: CreateScheduleCommandDTO, public readonly actorId?: string) { super(); }
}
