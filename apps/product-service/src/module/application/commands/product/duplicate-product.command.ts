import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DuplicateProductCommand extends BaseCommand {
  readonly type = 'product.duplicate';

  constructor(
    public readonly productId: string,
    public readonly newName: string,
  ) {
    super();
  }
}
