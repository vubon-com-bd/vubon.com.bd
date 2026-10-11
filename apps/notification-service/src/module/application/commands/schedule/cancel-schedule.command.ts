import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelScheduleRequestDTO } from '../../dtos/requests/schedule/schedule.dto.js';

export class CancelScheduleCommand extends BaseCommand {
  readonly type = 'schedule.cancel';
  constructor(public readonly dto: CancelScheduleRequestDTO, public readonly actorId?: string) {
    super();
  }
}
