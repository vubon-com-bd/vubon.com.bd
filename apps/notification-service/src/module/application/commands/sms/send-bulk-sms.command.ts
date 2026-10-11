import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendBulkSmsRequestDTO } from '../../dtos/requests/sms/sms.dto.js';

export class SendBulkSmsCommand extends BaseCommand {
  readonly type = 'sms.send_bulk';
  constructor(public readonly dto: SendBulkSmsRequestDTO, public readonly actorId?: string) {
    super();
  }
}
