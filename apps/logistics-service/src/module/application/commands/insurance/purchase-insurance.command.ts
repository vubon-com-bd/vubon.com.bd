import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class PurchaseInsuranceCommand extends BaseCommand {
  readonly type = 'logistics.insurance.purchase';

  constructor(
    public readonly shipmentId: string,
    public readonly provider: string,
    public readonly coverage: string,
    public readonly declaredValue: number,
    public readonly currency: string = 'BDT',
  ) {
    super();
  }
}
