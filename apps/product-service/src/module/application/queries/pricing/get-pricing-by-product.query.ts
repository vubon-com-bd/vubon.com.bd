import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetPricingByProductQuery extends BaseQuery {
  readonly type = 'pricing.getByProduct';
  constructor(public readonly productId: string) { super(); }
}
