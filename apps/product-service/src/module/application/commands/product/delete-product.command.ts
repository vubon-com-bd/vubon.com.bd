import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeleteProductCommand extends BaseCommand {
  readonly type = 'product.delete';

  constructor(public readonly productId: string) {
    super();
  }
}
