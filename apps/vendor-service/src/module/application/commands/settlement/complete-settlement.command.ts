import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CompleteSettlementRequestDTO } from '../../dtos/requests/settlement/index.js';

export class CompleteSettlementCommand extends BaseCommand {
  readonly type = 'vendor.settlement.complete';
  constructor(
    public readonly dto: CompleteSettlementRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
