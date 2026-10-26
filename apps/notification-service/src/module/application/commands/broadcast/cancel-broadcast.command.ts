import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelBroadcastCommandDTO } from '@application/dtos/requests/broadcast/index.js';

export class CancelBroadcastCommand extends BaseCommand {
  readonly type = 'notification.broadcast.cancel';
  constructor(public readonly dto: CancelBroadcastCommandDTO, public readonly actorId?: string) { super(); }
}
