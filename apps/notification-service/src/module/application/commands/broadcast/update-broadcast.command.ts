import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateBroadcastRequestDTO } from '../../dtos/requests/broadcast/broadcast.dto.js';

export class UpdateBroadcastCommand extends BaseCommand {
  readonly type = 'broadcast.update';
  constructor(public readonly dto: UpdateBroadcastRequestDTO, public readonly actorId?: string) {
    super();
  }
}
