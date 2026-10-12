/**
 * RejectPayoutCommand
 * @module vendor-service/application/commands/payout
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RejectPayoutRequestDto } from '../../dtos/requests/reject-payout.dto.js';

export class RejectPayoutCommand extends BaseCommand {
  readonly type = 'vendor.payout.reject';
  constructor(
    public readonly dto: RejectPayoutRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
