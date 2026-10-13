import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddProductToCollectionRequestDTO } from '../../dtos/requests/collection/index.js';

export class AddProductToCollectionCommand extends BaseCommand {
  readonly type = 'product.collection.add_product';
  constructor(
    public readonly dto: AddProductToCollectionRequestDTO,
    public readonly mode: 'add' | 'remove' = 'add',
  ) {
    super();
  }
}
