import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendBulkEmailCommandDTO } from '@application/dtos/requests/email/index.js';

export class SendBulkEmailCommand extends BaseCommand {
  readonly type = 'notification.email.send_bulk';
  constructor(
    public readonly dto: SendBulkEmailCommandDTO,
    public readonly actorId?: string,
  ) { super(); }
}
