/**
 * CancelPayoutCommand
 * @module vendor-service/application/commands/payout
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelPayoutRequestDto } from '../../dtos/requests/cancel-payout.dto.js';

export class CancelPayoutCommand extends BaseCommand {
  readonly type = 'vendor.payout.cancel';
  constructor(
    public readonly dto: CancelPayoutRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
