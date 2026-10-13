import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { VariantListOptionsDTO } from '../../services/interfaces/product-variant.service.interface.js';

export class ListVariantsQuery extends BaseQuery {
  readonly type = 'product.variant.list';
  constructor(public readonly options: VariantListOptionsDTO) {
    super();
  }
}
