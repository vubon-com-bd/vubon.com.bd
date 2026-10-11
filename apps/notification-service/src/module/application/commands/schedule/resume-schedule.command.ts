import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ResumeScheduleRequestDTO } from '../../dtos/requests/schedule/schedule.dto.js';

export class ResumeScheduleCommand extends BaseCommand {
  readonly type = 'schedule.resume';
  constructor(public readonly dto: ResumeScheduleRequestDTO, public readonly actorId?: string) {
    super();
  }
}
