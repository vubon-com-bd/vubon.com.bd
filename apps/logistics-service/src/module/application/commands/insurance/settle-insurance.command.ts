import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SettleInsuranceCommand extends BaseCommand {
  readonly type = 'logistics.insurance.settle';

  constructor(
    public readonly insuranceId: string,
    public readonly settlementAmount: number,
    public readonly notes?: string,
  ) {
    super();
  }
}
