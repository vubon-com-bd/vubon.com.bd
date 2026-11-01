import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateBroadcastCommandDTO } from '@application/dtos/requests/broadcast/index.js';

export class CreateBroadcastCommand extends BaseCommand {
  readonly type = 'notification.broadcast.create';
  constructor(public readonly dto: CreateBroadcastCommandDTO, public readonly actorId?: string) { super(); }
}
