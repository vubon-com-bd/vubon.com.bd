import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AddProductToCollectionCommand extends BaseCommand {
  readonly type = 'product.collection.add-product';

  constructor(
    public readonly collectionId: string,
    public readonly productId: string,
  ) {
    super();
  }
}
