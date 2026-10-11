import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendEmailWithTemplateRequestDTO } from '../../dtos/requests/email/email.dto.js';

export class SendEmailWithTemplateCommand extends BaseCommand {
  readonly type = 'email.send_with_template';
  constructor(
    public readonly dto: SendEmailWithTemplateRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
