/**
 * CreateSettlementCommand
 * @module vendor-service/application/commands/payout
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateSettlementRequestDto } from '../../dtos/requests/create-settlement.dto.js';

export class CreateSettlementCommand extends BaseCommand {
  readonly type = 'vendor.settlement.create';
  constructor(
    public readonly dto: CreateSettlementRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
