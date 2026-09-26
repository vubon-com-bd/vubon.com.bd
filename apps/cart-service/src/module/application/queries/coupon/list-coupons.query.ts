import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListCouponsQuery extends BaseQuery {
  readonly type = 'coupon.list';
  constructor(public readonly cartId?: string) { super(); }
}
