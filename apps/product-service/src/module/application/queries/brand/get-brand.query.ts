import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetBrandQuery extends BaseQuery {
  readonly type = 'product.brand.get';
  constructor(public readonly brandId: string) {
    super();
  }
}
