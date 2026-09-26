import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateCartCommand extends BaseCommand {
  readonly type = 'cart.update';

  constructor(
    public readonly cartId: string,
    public readonly currency?: string,
  ) {
    super();
  }
}
