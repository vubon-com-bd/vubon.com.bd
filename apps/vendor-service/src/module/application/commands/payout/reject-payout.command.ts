import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RejectPayoutRequestDTO } from '../../dtos/requests/payout/index.js';

export class RejectPayoutCommand extends BaseCommand {
  readonly type = 'vendor.payout.reject';
  constructor(
    public readonly dto: RejectPayoutRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
