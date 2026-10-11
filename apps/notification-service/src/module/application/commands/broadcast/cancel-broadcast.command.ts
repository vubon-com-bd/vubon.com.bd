import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelBroadcastRequestDTO } from '../../dtos/requests/broadcast/broadcast.dto.js';

export class CancelBroadcastCommand extends BaseCommand {
  readonly type = 'broadcast.cancel';
  constructor(public readonly dto: CancelBroadcastRequestDTO, public readonly actorId?: string) {
    super();
  }
}
