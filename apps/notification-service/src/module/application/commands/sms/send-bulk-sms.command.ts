import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendBulkSmsCommandDTO } from '@application/dtos/requests/sms/index.js';

export class SendBulkSmsCommand extends BaseCommand {
  readonly type = 'notification.sms.send_bulk';
  constructor(public readonly dto: SendBulkSmsCommandDTO, public readonly actorId?: string) { super(); }
}
