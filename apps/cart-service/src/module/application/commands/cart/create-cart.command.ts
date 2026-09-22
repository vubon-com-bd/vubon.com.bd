import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateCartCommand extends BaseCommand {
  readonly type = 'cart.create';

  constructor(
    public readonly type2: string,
    public readonly currency: string,
    public readonly userId?: string,
  ) {
    super();
  }
}
