/**
 * GetReturnQuery
 * @module order-service/application/queries/return
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetReturnQuery extends BaseQuery {
  readonly type = 'order.return.get';
  constructor(public readonly returnId: string) {
    super();
  }
}
