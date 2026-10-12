/**
 * MarkPayoutPaidCommand
 * @module vendor-service/application/commands/payout
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MarkPayoutPaidRequestDto } from '../../dtos/requests/mark-payout-paid.dto.js';

export class MarkPayoutPaidCommand extends BaseCommand {
  readonly type = 'vendor.payout.mark_paid';
  constructor(
    public readonly dto: MarkPayoutPaidRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
