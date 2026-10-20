/**
 * ListReturnsQuery
 * @module order-service/application/queries/return
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ReturnListOptionsDTO } from '../../services/interfaces/order-return.service.interface.js';

export class ListReturnsQuery extends BaseQuery {
  readonly type = 'order.return.list';
  constructor(public readonly options: ReturnListOptionsDTO) {
    super();
  }
}
