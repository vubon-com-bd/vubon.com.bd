import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { BrandListOptionsDTO } from '../../services/interfaces/brand.service.interface.js';

export class ListBrandsQuery extends BaseQuery {
  readonly type = 'product.brand.list';
  constructor(public readonly options: BrandListOptionsDTO) {
    super();
  }
}
