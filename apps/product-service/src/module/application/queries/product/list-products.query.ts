import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ProductListOptionsDTO } from '../../services/interfaces/product.service.interface.js';

export class ListProductsQuery extends BaseQuery {
  readonly type = 'product.product.list';
  constructor(public readonly options: ProductListOptionsDTO) {
    super();
  }
}
