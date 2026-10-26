import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListDeliveriesQuery extends BaseQuery {
  readonly type = 'notification.delivery.list';
  constructor(public readonly status: string) { super(); }
}
