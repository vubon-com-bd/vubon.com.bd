import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateShippingCommand extends BaseCommand {
  readonly type = 'vendor.shipping.update';

  constructor(
    public readonly vendorId: string,
    public readonly defaultShippingCost: number,
    public readonly freeShippingThreshold?: number,
    public readonly shipsInternationally?: boolean,
  ) {
    super();
  }
}
