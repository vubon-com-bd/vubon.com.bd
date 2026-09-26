import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CalculateCommissionCommand extends BaseCommand {
  readonly type = 'vendor.commission.calculate';

  constructor(
    public readonly vendorId: string,
    public readonly orderId: string,
    public readonly orderAmount: number,
    public readonly currency: string,
  ) {
    super();
  }
}
