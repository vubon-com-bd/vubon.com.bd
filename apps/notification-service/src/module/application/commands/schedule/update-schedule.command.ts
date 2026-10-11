import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateScheduleRequestDTO } from '../../dtos/requests/schedule/schedule.dto.js';

export class UpdateScheduleCommand extends BaseCommand {
  readonly type = 'schedule.update';
  constructor(public readonly dto: UpdateScheduleRequestDTO, public readonly actorId?: string) {
    super();
  }
}
