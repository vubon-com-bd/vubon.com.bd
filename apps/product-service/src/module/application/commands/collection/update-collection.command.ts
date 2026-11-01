import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateCollectionRequestDTO } from '../../dtos/requests/collection/index.js';

export class UpdateCollectionCommand extends BaseCommand {
  readonly type = 'product.collection.update';
  constructor(public readonly dto: UpdateCollectionRequestDTO) {
    super();
  }
}
