import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateBroadcastRequestDTO } from '../../dtos/requests/broadcast/broadcast.dto.js';

export class CreateBroadcastCommand extends BaseCommand {
  readonly type = 'broadcast.create';
  constructor(public readonly dto: CreateBroadcastRequestDTO, public readonly actorId?: string) {
    super();
  }
}
