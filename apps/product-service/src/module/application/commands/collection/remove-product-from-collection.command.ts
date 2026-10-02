/**
 * RemoveProductFromCollectionCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RemoveProductFromCollectionCommand extends BaseCommand {
  readonly type = 'collection.product.remove';
  constructor(
    public readonly collectionId: string,
    public readonly productId: string,
    public readonly actorId: string,
  ) { super(); }
}
