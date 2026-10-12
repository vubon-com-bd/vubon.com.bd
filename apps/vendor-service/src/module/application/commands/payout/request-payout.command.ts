/**
 * RequestPayoutCommand
 * @module vendor-service/application/commands/payout
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RequestPayoutRequestDto } from '../../dtos/requests/request-payout.dto.js';

export class RequestPayoutCommand extends BaseCommand {
  readonly type = 'vendor.payout.request';
  constructor(
    public readonly dto: RequestPayoutRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
