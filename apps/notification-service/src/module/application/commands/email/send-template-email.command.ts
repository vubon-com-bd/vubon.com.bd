import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendTemplateEmailCommandDTO } from '@application/dtos/requests/email/index.js';

export class SendTemplateEmailCommand extends BaseCommand {
  readonly type = 'notification.email.send_template';
  constructor(
    public readonly dto: SendTemplateEmailCommandDTO,
    public readonly actorId?: string,
  ) { super(); }
}
