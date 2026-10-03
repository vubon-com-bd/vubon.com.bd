import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListReturnsQuery extends BaseQuery {
  readonly type = 'return.list';
  constructor(public readonly orderId: string) { super(); }
}
