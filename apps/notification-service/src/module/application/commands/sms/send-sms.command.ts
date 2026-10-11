import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendSmsRequestDTO } from '../../dtos/requests/sms/sms.dto.js';

export class SendSmsCommand extends BaseCommand {
  readonly type = 'sms.send';
  constructor(public readonly dto: SendSmsRequestDTO, public readonly actorId?: string) {
    super();
  }
}
