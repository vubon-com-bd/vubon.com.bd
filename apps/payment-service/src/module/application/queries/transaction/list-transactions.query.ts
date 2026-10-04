import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ListTransactionsRequestDTO } from '../../dtos/requests/transaction/transaction.dto.js';

export class ListTransactionsQuery extends BaseQuery {
  readonly type = 'transaction.list';
  constructor(public readonly options: ListTransactionsRequestDTO) {
    super();
  }
}
