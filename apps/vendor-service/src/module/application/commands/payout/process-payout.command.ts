/**
 * ProcessPayoutCommand
 * @module vendor-service/application/commands/payout
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ProcessPayoutRequestDto } from '../../dtos/requests/process-payout.dto.js';

export class ProcessPayoutCommand extends BaseCommand {
  readonly type = 'vendor.payout.process';
  constructor(
    public readonly dto: ProcessPayoutRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
