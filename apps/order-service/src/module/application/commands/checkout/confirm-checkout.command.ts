import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ConfirmCheckoutCommand extends BaseCommand {
  readonly type = 'checkout.confirm';

  constructor(public readonly checkoutId: string) {
    super();
  }
}
