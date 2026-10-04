import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class QuotePriceQuery extends BaseQuery {
  readonly type = 'pricing.quote';
  constructor(
    public readonly productId: string,
    public readonly quantity: number,
  ) { super(); }
}
