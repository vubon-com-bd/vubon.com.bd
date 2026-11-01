import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartBroadcastCommandDTO } from '@application/dtos/requests/broadcast/index.js';

export class StartBroadcastCommand extends BaseCommand {
  readonly type = 'notification.broadcast.start';
  constructor(public readonly dto: StartBroadcastCommandDTO, public readonly actorId?: string) { super(); }
}
