import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SaveForLaterCommand extends BaseCommand {
  readonly type = 'cart.saved.save';

  constructor(
    public readonly cartId: string,
    public readonly itemId: string,
    public readonly userId: string,
  ) {
    super();
  }
}
