import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class SetFreeShippingThresholdCommand extends BaseCommand {
  readonly type = 'vendor.shipping.set_free_threshold';
  constructor(
    public readonly vendorId: string,
    public readonly amount: number | undefined,
    public readonly actorId?: string,
  ) { super(); }
}
