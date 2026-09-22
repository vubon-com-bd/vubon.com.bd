import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AbandonCheckoutCommand extends BaseCommand {
  readonly type = 'checkout.abandon';

  constructor(
    public readonly checkoutId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
