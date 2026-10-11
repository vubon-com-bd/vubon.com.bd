import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateScheduleRequestDTO } from '../../dtos/requests/schedule/schedule.dto.js';

export class CreateScheduleCommand extends BaseCommand {
  readonly type = 'schedule.create';
  constructor(public readonly dto: CreateScheduleRequestDTO, public readonly actorId?: string) {
    super();
  }
}
