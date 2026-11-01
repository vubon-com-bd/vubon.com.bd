import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendEmailCommandDTO } from '@application/dtos/requests/email/index.js';

export class SendEmailCommand extends BaseCommand {
  readonly type = 'notification.email.send';
  constructor(
    public readonly dto: SendEmailCommandDTO,
    public readonly actorId?: string,
  ) { super(); }
}
