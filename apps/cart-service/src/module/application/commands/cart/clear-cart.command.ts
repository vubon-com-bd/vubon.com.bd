import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ClearCartCommand extends BaseCommand {
  readonly type = 'cart.clear';

  constructor(public readonly cartId: string) {
    super();
  }
}
