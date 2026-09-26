import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SelectShippingCommand extends BaseCommand {
  readonly type = 'checkout.shipping.select';

  constructor(
    public readonly checkoutId: string,
    public readonly methodId: string,
  ) {
    super();
  }
}
