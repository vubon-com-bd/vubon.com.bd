import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateCollectionRequestDTO } from '../../dtos/requests/collection/index.js';

export class CreateCollectionCommand extends BaseCommand {
  readonly type = 'product.collection.create';
  constructor(public readonly dto: CreateCollectionRequestDTO) {
    super();
  }
}
