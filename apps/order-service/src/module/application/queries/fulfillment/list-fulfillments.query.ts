import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListFulfillmentsQuery extends BaseQuery {
  readonly type = 'fulfillment.list';
  constructor(public readonly orderId: string) { super(); }
}
