import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendSmsCommandDTO } from '@application/dtos/requests/sms/index.js';

export class SendSmsCommand extends BaseCommand {
  readonly type = 'notification.sms.send';
  constructor(public readonly dto: SendSmsCommandDTO, public readonly actorId?: string) { super(); }
}
