import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVariantQuery extends BaseQuery {
  readonly type = 'product.variant.get';
  constructor(public readonly variantId: string) {
    super();
  }
}
