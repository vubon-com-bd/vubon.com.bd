import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateDigestRequestDTO } from '../../dtos/requests/digest/digest.dto.js';

export class CreateDigestCommand extends BaseCommand {
  readonly type = 'digest.create';
  constructor(public readonly dto: CreateDigestRequestDTO, public readonly actorId?: string) {
    super();
  }
}
