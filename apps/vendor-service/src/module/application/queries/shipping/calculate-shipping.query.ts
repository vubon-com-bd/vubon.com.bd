import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class CalculateShippingQuery extends BaseQuery {
  readonly type = 'vendor.shipping.calculate';
  constructor(
    public readonly vendorId: string,
    public readonly zone: string,
    public readonly orderTotal: number,
    public readonly method?: string,
  ) { super(); }
}
