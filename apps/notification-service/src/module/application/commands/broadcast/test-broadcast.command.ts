import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { TestBroadcastRequestDTO } from '../../dtos/requests/broadcast/broadcast.dto.js';

export class TestBroadcastCommand extends BaseCommand {
  readonly type = 'broadcast.test';
  constructor(public readonly dto: TestBroadcastRequestDTO, public readonly actorId?: string) {
    super();
  }
}
