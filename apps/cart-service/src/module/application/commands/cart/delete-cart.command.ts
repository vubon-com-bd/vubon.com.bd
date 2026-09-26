import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeleteCartCommand extends BaseCommand {
  readonly type = 'cart.delete';

  constructor(public readonly cartId: string) {
    super();
  }
}
