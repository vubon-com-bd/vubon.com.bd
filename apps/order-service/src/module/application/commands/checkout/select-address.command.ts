import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SelectAddressCommand extends BaseCommand {
  readonly type = 'checkout.address.select';

  constructor(
    public readonly checkoutId: string,
    public readonly addressId: string,
  ) {
    super();
  }
}
