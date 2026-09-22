import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetInventoryQuery extends BaseQuery {
  readonly type = 'product.inventory.get';

  constructor(public readonly productId: string) {
    super();
  }
}
