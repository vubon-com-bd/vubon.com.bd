import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class StartCheckoutCommand extends BaseCommand {
  readonly type = 'checkout.start';

  constructor(
    public readonly customerId: string,
    public readonly cartId?: string,
  ) {
    super();
  }
}
