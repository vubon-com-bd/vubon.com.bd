import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RemoveShippingRateCommand extends BaseCommand {
  readonly type = 'vendor.shipping.remove_rate';
  constructor(
    public readonly vendorId: string,
    public readonly method: string,
    public readonly zone: string,
    public readonly actorId?: string,
  ) { super(); }
}
