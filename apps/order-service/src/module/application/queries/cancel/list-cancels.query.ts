import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListCancelsQuery extends BaseQuery {
  readonly type = 'cancel.list';
  constructor(public readonly orderId: string) { super(); }
}
