import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ScheduleBroadcastRequestDTO } from '../../dtos/requests/broadcast/broadcast.dto.js';

export class ScheduleBroadcastCommand extends BaseCommand {
  readonly type = 'broadcast.schedule';
  constructor(public readonly dto: ScheduleBroadcastRequestDTO, public readonly actorId?: string) {
    super();
  }
}
