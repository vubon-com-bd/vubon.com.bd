import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeleteCollectionRequestDTO } from '../../dtos/requests/collection/index.js';

export class DeleteCollectionCommand extends BaseCommand {
  readonly type = 'product.collection.delete';
  constructor(public readonly dto: DeleteCollectionRequestDTO) {
    super();
  }
}
