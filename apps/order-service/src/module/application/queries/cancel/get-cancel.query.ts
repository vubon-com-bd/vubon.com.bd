/**
 * GetCancelQuery
 * @module order-service/application/queries/cancel
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCancelQuery extends BaseQuery {
  readonly type = 'order.cancel.get';
  constructor(public readonly cancelId: string) {
    super();
  }
}
