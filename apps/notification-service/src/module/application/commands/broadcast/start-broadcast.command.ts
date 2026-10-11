import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartBroadcastRequestDTO } from '../../dtos/requests/broadcast/broadcast.dto.js';

export class StartBroadcastCommand extends BaseCommand {
  readonly type = 'broadcast.start';
  constructor(public readonly dto: StartBroadcastRequestDTO, public readonly actorId?: string) {
    super();
  }
}
