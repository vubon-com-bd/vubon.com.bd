import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PauseScheduleRequestDTO } from '../../dtos/requests/schedule/schedule.dto.js';

export class PauseScheduleCommand extends BaseCommand {
  readonly type = 'schedule.pause';
  constructor(public readonly dto: PauseScheduleRequestDTO, public readonly actorId?: string) {
    super();
  }
}
