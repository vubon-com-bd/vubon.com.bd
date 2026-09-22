import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListBrandsQuery extends BaseQuery {
  readonly type = 'product.brand.list';

  constructor() {
    super();
  }
}
