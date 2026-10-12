/**
 * CompleteSettlementCommand
 * @module vendor-service/application/commands/payout
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CompleteSettlementRequestDto } from '../../dtos/requests/complete-settlement.dto.js';

export class CompleteSettlementCommand extends BaseCommand {
  readonly type = 'vendor.settlement.complete';
  constructor(
    public readonly dto: CompleteSettlementRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
