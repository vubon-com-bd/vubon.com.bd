import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendEmailRequestDTO } from '../../dtos/requests/email/email.dto.js';

export class SendEmailCommand extends BaseCommand {
  readonly type = 'email.send';
  constructor(
    public readonly dto: SendEmailRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
