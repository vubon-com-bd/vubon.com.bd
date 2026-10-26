import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendPushCommandDTO } from '@application/dtos/requests/push/index.js';

export class SendPushCommand extends BaseCommand {
  readonly type = 'notification.push.send';
  constructor(public readonly dto: SendPushCommandDTO, public readonly actorId?: string) { super(); }
}
