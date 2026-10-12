/**
 * ApprovePayoutCommand
 * @module vendor-service/application/commands/payout
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApprovePayoutRequestDto } from '../../dtos/requests/approve-payout.dto.js';

export class ApprovePayoutCommand extends BaseCommand {
  readonly type = 'vendor.payout.approve';
  constructor(
    public readonly dto: ApprovePayoutRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
