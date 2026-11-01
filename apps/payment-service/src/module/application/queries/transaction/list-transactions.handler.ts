/**
 * ListTransactionsHandler
 * @module payment-service/application/queries/transaction
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListTransactionsQuery } from './list-transactions.query.js';
import {
  TRANSACTION_SERVICE,
  type ITransactionService,
} from '@application/services/interfaces/transaction.service.interface.js';
import type { TransactionListResponseDTO } from '@application/dtos/responses/transaction-response.dto.js';

@QueryHandler(ListTransactionsQuery)
export class ListTransactionsHandler
  implements IQueryHandler<ListTransactionsQuery, TransactionListResponseDTO>
{
  constructor(
    @Inject(TRANSACTION_SERVICE)
    private readonly service: ITransactionService,
  ) {}
  async execute(q: ListTransactionsQuery): Promise<TransactionListResponseDTO> {
    return this.service.list({
      page: q.page,
      limit: q.limit,
      filter: q.filter,
      sortBy: q.sortBy,
      sortDir: q.sortDir,
    });
  }
}
