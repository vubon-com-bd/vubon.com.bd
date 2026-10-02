import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ProductCatalogListOptions } from '../../services/interfaces/product-catalog.service.interface.js';

export class ListProductsQuery extends BaseQuery {
  readonly type = 'product.list';
  constructor(public readonly options: ProductCatalogListOptions) { super(); }
}
