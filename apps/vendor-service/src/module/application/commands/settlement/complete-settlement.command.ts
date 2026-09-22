import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CompleteSettlementCommand extends BaseCommand {
  readonly type = 'vendor.settlement.complete';

  constructor(
    public readonly settlementId: string,
    public readonly notes?: string,
  ) {
    super();
  }
}
