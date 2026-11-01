import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { CollectionListOptionsDTO } from '../../services/interfaces/product-collection.service.interface.js';

export class ListCollectionsQuery extends BaseQuery {
  readonly type = 'product.collection.list';
  constructor(public readonly options: CollectionListOptionsDTO) {
    super();
  }
}
