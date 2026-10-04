import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListTransactionsByPaymentQuery } from './list-transactions-by-payment.query.js';
import {
  TRANSACTION_SERVICE,
  type ITransactionService,
} from '../../services/interfaces/transaction.service.interface.js';
import type { TransactionResponseDTO } from '../../dtos/responses/transaction-response.dto.js';

@QueryHandler(ListTransactionsByPaymentQuery)
export class ListTransactionsByPaymentHandler
  implements IQueryHandler<
    ListTransactionsByPaymentQuery,
    readonly TransactionResponseDTO[]
  >
{
  constructor(@Inject(TRANSACTION_SERVICE) private readonly service: ITransactionService) {}

  async execute(
    q: ListTransactionsByPaymentQuery,
  ): Promise<readonly TransactionResponseDTO[]> {
    return this.service.listByPayment(q.paymentId);
  }
}
