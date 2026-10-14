import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ProcessPayoutRequestDTO } from '../../dtos/requests/payout/index.js';

export class ProcessPayoutCommand extends BaseCommand {
  readonly type = 'vendor.payout.process';
  constructor(
    public readonly dto: ProcessPayoutRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
