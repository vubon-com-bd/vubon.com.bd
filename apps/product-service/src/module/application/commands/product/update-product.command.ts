import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateProductCommand extends BaseCommand {
  readonly type = 'product.update';

  constructor(
    public readonly productId: string,
    public readonly name?: string,
    public readonly categoryId?: string | null,
    public readonly brandId?: string | null,
  ) {
    super();
  }
}
