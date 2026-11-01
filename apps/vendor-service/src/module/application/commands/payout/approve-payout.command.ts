import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApprovePayoutRequestDTO } from '../../dtos/requests/payout/index.js';

export class ApprovePayoutCommand extends BaseCommand {
  readonly type = 'vendor.payout.approve';
  constructor(
    public readonly dto: ApprovePayoutRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
