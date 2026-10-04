import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListTransactionsByOrderQuery } from './list-transactions-by-order.query.js';
import {
  TRANSACTION_SERVICE,
  type ITransactionService,
} from '../../services/interfaces/transaction.service.interface.js';
import type { TransactionResponseDTO } from '../../dtos/responses/transaction-response.dto.js';

@QueryHandler(ListTransactionsByOrderQuery)
export class ListTransactionsByOrderHandler
  implements IQueryHandler<
    ListTransactionsByOrderQuery,
    readonly TransactionResponseDTO[]
  >
{
  constructor(@Inject(TRANSACTION_SERVICE) private readonly service: ITransactionService) {}

  async execute(
    q: ListTransactionsByOrderQuery,
  ): Promise<readonly TransactionResponseDTO[]> {
    return this.service.listByOrder(q.orderId);
  }
}
