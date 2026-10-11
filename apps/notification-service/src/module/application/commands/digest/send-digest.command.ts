import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendDigestRequestDTO } from '../../dtos/requests/digest/digest.dto.js';

export class SendDigestCommand extends BaseCommand {
  readonly type = 'digest.send';
  constructor(public readonly dto: SendDigestRequestDTO, public readonly actorId?: string) {
    super();
  }
}
