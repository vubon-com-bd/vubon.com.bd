import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReverifyRequestDTO } from '../../dtos/requests/verification/index.js';

export class ReverifyCommand extends BaseCommand {
  readonly type = 'vendor.verification.reverify';
  constructor(
    public readonly dto: ReverifyRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
