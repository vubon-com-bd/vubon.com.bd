import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendPushRequestDTO } from '../../dtos/requests/push/push.dto.js';

export class SendPushCommand extends BaseCommand {
  readonly type = 'push.send';
  constructor(public readonly dto: SendPushRequestDTO, public readonly actorId?: string) {
    super();
  }
}
