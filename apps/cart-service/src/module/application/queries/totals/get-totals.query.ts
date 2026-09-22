import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetTotalsQuery extends BaseQuery {
  readonly type = 'totals.get';
  constructor(public readonly cartId: string) { super(); }
}
