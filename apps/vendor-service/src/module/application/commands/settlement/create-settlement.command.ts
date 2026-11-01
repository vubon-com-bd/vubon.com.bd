import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateSettlementRequestDTO } from '../../dtos/requests/settlement/index.js';

export class CreateSettlementCommand extends BaseCommand {
  readonly type = 'vendor.settlement.create';
  constructor(
    public readonly dto: CreateSettlementRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
