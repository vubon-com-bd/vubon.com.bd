import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { TriggerScheduleRequestDTO } from '../../dtos/requests/schedule/schedule.dto.js';

export class TriggerScheduleCommand extends BaseCommand {
  readonly type = 'schedule.trigger';
  constructor(public readonly dto: TriggerScheduleRequestDTO, public readonly actorId?: string) {
    super();
  }
}
