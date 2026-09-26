import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateSettlementCommand extends BaseCommand {
  readonly type = 'vendor.settlement.create';

  constructor(
    public readonly vendorId: string,
    public readonly periodStart: string,
    public readonly periodEnd: string,
  ) {
    super();
  }
}
