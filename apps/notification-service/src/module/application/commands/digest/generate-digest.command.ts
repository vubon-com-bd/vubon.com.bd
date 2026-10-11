import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { GenerateDigestRequestDTO } from '../../dtos/requests/digest/digest.dto.js';

export class GenerateDigestCommand extends BaseCommand {
  readonly type = 'digest.generate';
  constructor(public readonly dto: GenerateDigestRequestDTO, public readonly actorId?: string) {
    super();
  }
}
