import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateDigestRequestDTO } from '../../dtos/requests/digest/digest.dto.js';

export class UpdateDigestCommand extends BaseCommand {
  readonly type = 'digest.update';
  constructor(public readonly dto: UpdateDigestRequestDTO, public readonly actorId?: string) {
    super();
  }
}
