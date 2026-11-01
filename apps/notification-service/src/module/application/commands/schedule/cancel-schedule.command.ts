import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelScheduleCommandDTO } from '@application/dtos/requests/schedule/index.js';

export class CancelScheduleCommand extends BaseCommand {
  readonly type = 'notification.schedule.cancel';
  constructor(public readonly dto: CancelScheduleCommandDTO, public readonly actorId?: string) { super(); }
}
