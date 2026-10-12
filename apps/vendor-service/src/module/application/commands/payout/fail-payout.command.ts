/**
 * FailPayoutCommand
 * @module vendor-service/application/commands/payout
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { FailPayoutRequestDto } from '../../dtos/requests/fail-payout.dto.js';

export class FailPayoutCommand extends BaseCommand {
  readonly type = 'vendor.payout.fail';
  constructor(
    public readonly dto: FailPayoutRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
