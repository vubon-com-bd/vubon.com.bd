/**
 * AddProductToCollectionCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class AddProductToCollectionCommand extends BaseCommand {
  readonly type = 'collection.product.add';
  constructor(
    public readonly collectionId: string,
    public readonly productId: string,
    public readonly actorId: string,
  ) { super(); }
}
