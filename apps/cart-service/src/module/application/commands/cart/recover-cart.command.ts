import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RecoverCartCommand extends BaseCommand {
  readonly type = 'cart.recover';

  constructor(
    public readonly abandonedId: string,
    public readonly userId: string,
  ) {
    super();
  }
}
