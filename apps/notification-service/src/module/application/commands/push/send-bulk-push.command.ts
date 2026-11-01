import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendBulkPushCommandDTO } from '@application/dtos/requests/push/index.js';

export class SendBulkPushCommand extends BaseCommand {
  readonly type = 'notification.push.send_bulk';
  constructor(public readonly dto: SendBulkPushCommandDTO, public readonly actorId?: string) { super(); }
}
